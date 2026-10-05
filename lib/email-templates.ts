import { siteConfig } from "../lib/site-config";

export type LeadDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  service: string;
  message: string;
  contactMethod: string;
  contactTime: string;
  photoCount: number;
  /** Where the form was submitted from, e.g. "Service Area Page — Round Rock". Internal-use only. */
  source?: string;
};

/** Email sent to the business with the full lead details. */
export function clientNotificationEmail(lead: LeadDetails) {
  const fullAddress = [lead.address, lead.city, lead.zip].filter(Boolean).join(", ");
  const subject = `New quote request — ${lead.name} (${lead.service})`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px; color: #806a3f;">New Quote Request</h2>
      <p style="color: #666; margin-top: 0;">Submitted via the ${siteConfig.name} website.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tbody>
          ${row("Name", esc(lead.name))}
          ${row("Phone", `<a href="tel:${esc(lead.phone)}">${esc(lead.phone)}</a>`)}
          ${row("Email", `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>`)}
          ${row("Address", esc(fullAddress) || "—")}
          ${row("Service Needed", esc(lead.service))}
          ${row("Preferred Contact", [lead.contactMethod, lead.contactTime].filter(Boolean).map(esc).join(" · ") || "—")}
          ${row("Project Details", esc(lead.message) || "—")}
          ${row("Photos Attached", String(lead.photoCount))}
          ${lead.source ? row("Submitted From", esc(lead.source)) : ""}
        </tbody>
      </table>

      <p style="margin-top: 24px; color: #666; font-size: 12px;">
        Reply directly to this email to reach the customer at ${esc(lead.email)}.
      </p>
    </div>
  `;

  const text = [
    `New quote request via ${siteConfig.name}`,
    ``,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Address: ${fullAddress || "—"}`,
    `Service Needed: ${lead.service}`,
    `Preferred Contact: ${[lead.contactMethod, lead.contactTime].filter(Boolean).join(" · ") || "—"}`,
    `Project Details: ${lead.message || "—"}`,
    `Photos Attached: ${lead.photoCount}`,
    ...(lead.source ? [`Submitted From: ${lead.source}`] : []),
  ].join("\n");

  return { subject, html, text };
}

/** Confirmation email sent back to the person who submitted the form. */
export function userConfirmationEmail(lead: LeadDetails) {
  const subject = `We've got your request — ${siteConfig.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px; color: #806a3f;">Thanks, ${esc(firstName(lead.name))}.</h2>
      <p style="color: #333;">
        We received your request for <strong>${esc(lead.service)}</strong> and
        we'll get back to you within 24 hours${lead.contactMethod ? ` by <strong>${esc(lead.contactMethod)}</strong>` : ""}.
      </p>

      <p style="color: #333;">Here's what you submitted, for your records:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
        <tbody>
          ${row("Service Needed", esc(lead.service))}
          ${row("Project Details", esc(lead.message) || "—")}
        </tbody>
      </table>

      <p style="margin-top: 24px; color: #333;">
        Questions in the meantime? Call or text us at
        <a href="${siteConfig.phoneHref}">${siteConfig.phone}</a>.
      </p>

      <p style="margin-top: 24px; color: #666; font-size: 12px;">
        ${siteConfig.name} · ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}
      </p>
    </div>
  `;

  const text = [
    `Thanks, ${firstName(lead.name)}.`,
    ``,
    `We received your request for ${lead.service} and we'll get back to you within 24 hours.`,
    ``,
    `Service Needed: ${lead.service}`,
    `Project Details: ${lead.message || "—"}`,
    ``,
    `Questions in the meantime? Call or text us at ${siteConfig.phone}.`,
    ``,
    `${siteConfig.name} · ${siteConfig.address.city}, ${siteConfig.address.region}`,
  ].join("\n");

  return { subject, html, text };
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 6px 12px 6px 0; color: #666; font-size: 13px; vertical-align: top; white-space: nowrap;">${label}</td>
      <td style="padding: 6px 0; font-size: 14px; white-space: pre-wrap;">${value}</td>
    </tr>
  `;
}

/** Escapes user input before it goes into email HTML. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}
