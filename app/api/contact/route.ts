import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "../../../lib/rate-limit";
import { clientNotificationEmail, userConfirmationEmail } from "../../../lib/email-templates";
import { siteConfig } from "../../../lib/site-config";

export const runtime = "nodejs";

// Vercel caps request bodies at 4.5MB, so photos are resized in the browser
// before upload (see ContactForm) and these limits keep the total under it.
const MAX_PHOTOS = 4;
const MAX_PHOTO_SIZE_BYTES = 1.5 * 1024 * 1024;

// Requests per IP within the window — generous enough for a real
// visitor who fixes a typo and resubmits, tight enough to stop bots.
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  // ---- Rate limiting -----------------------------------------------
  const ip = getClientIp(req.headers);
  const { success, resetAt } = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS);

  if (!success) {
    const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  // ---- Parse & validate ---------------------------------------------
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
  }

  const field = (key: string) => String(formData.get(key) || "").trim();

  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const address = field("address");
  const city = field("city");
  const zip = field("zip");
  const service = field("service");
  const message = field("message");
  const contactMethod = field("contactMethod");
  const contactTime = field("contactTime");

  // Optional context — present when the form is embedded on a service,
  // service-area, or project page. Absent on the homepage form.
  const sourcePage = field("sourcePage");
  const location = field("location");
  const sourcePageLabels: Record<string, string> = {
    service: "Service Page",
    "service-area": "Service Area Page",
    project: "Project Page",
  };
  const source = sourcePage
    ? [sourcePageLabels[sourcePage] ?? sourcePage, location].filter(Boolean).join(" — ")
    : undefined;

  if (!name || !phone || !email || !service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const photoEntries = formData.getAll("photos").filter((v): v is File => v instanceof File && v.size > 0);

  if (photoEntries.length > MAX_PHOTOS) {
    return NextResponse.json({ error: `You can attach up to ${MAX_PHOTOS} photos` }, { status: 400 });
  }
  for (const file of photoEntries) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are supported" }, { status: 400 });
    }
    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      return NextResponse.json({ error: "Photo is too large" }, { status: 400 });
    }
  }

  const lead = {
    name,
    phone,
    email,
    address,
    city,
    zip,
    service,
    message,
    contactMethod,
    contactTime,
    photoCount: photoEntries.length,
    source,
  };

  // ---- Build email attachments ---------------------------------------
  const attachments = await Promise.all(
    photoEntries.map(async (file) => ({
      filename: file.name || "photo.jpg",
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    }))
  );

  // ---- Send emails (Resend) ------------------------------------------
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL || siteConfig.mail.from;
  const clientNotifyAddress = process.env.CLIENT_NOTIFICATION_EMAIL || siteConfig.email;

  let emailSent = false;

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const clientEmail = clientNotificationEmail(lead);
    const userEmail = userConfirmationEmail(lead);

    const [clientResult, userResult] = await Promise.allSettled([
      resend.emails.send({
        from: fromAddress,
        to: clientNotifyAddress,
        replyTo: email,
        subject: clientEmail.subject,
        html: clientEmail.html,
        text: clientEmail.text,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
      resend.emails.send({
        from: fromAddress,
        to: email,
        subject: userEmail.subject,
        html: userEmail.html,
        text: userEmail.text,
      }),
    ]);

    // Resend reports API errors in the resolved value, not by rejecting.
    emailSent = clientResult.status === "fulfilled" && !clientResult.value.error;

    if (!emailSent) {
      console.error(
        "Failed to send client notification email:",
        clientResult.status === "rejected" ? clientResult.reason : clientResult.value.error
      );
    }
    if (userResult.status === "rejected" || userResult.value.error) {
      console.error(
        "Failed to send user confirmation email:",
        userResult.status === "rejected" ? userResult.reason : userResult.value.error
      );
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping email send. Lead:", lead);
  }

  // ---- Log to Google Sheets (optional, best-effort, never blocks the response) --
  if (process.env.GOOGLE_SHEET_ID) {
    try {
      const { appendLeadToSheet } = await import("../../../lib/google-sheets");
      await appendLeadToSheet({ timestamp: new Date().toISOString(), ...lead });
    } catch (err) {
      console.error("Failed to append lead to Google Sheet:", err);
    }
  }

  // The form should only show an error if the business notification email
  // itself failed — a Sheets hiccup shouldn't block a real lead.
  if (resendApiKey && !emailSent) {
    return NextResponse.json(
      { error: "We couldn't send your request. Please call or text us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
