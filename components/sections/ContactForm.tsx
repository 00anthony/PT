"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import clsx from "clsx";
import { UploadCloud, X, ImageIcon, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import Button from "../../components/ui/Button";
import { reportLeadConversion } from "../../lib/analytics";
import { siteConfig } from "../../lib/site-config";

const MAX_PHOTOS = 4;
// Photos are resized in the browser before upload: Vercel rejects request
// bodies over 4.5MB, and phone photos are often 3–8MB each.
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.8;

type Status = "idle" | "submitting" | "success" | "error";

export type ContactFormContext = {
  sourcePage: "service" | "service-area" | "project";
  service?: string;
  location?: string;
};

type Fields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
};

const emptyFields: Fields = { name: "", email: "", phone: "", address: "", city: "", zip: "" };

export default function ContactForm({
  serviceOptions,
  defaultServiceName = "",
  context,
}: {
  /** Service names for the dropdown — passed in so the full services data stays on the server. */
  serviceOptions: string[];
  /** Service to preselect, e.g. on a service page. */
  defaultServiceName?: string;
  context?: ContactFormContext;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [stepError, setStepError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [processingPhotos, setProcessingPhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    let next = value;
    if (name === "phone") next = value.replace(/\D/g, "").slice(0, 10);
    if (name === "zip") next = value.replace(/\D/g, "").slice(0, 5);
    setFields((f) => ({ ...f, [name]: next }));
  }

  function goToStep2() {
    if (!fields.name || !fields.email || !fields.phone || !fields.address || !fields.city || !fields.zip) {
      return setStepError("Please fill in all the fields.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return setStepError("Please enter a valid email address.");
    if (fields.phone.length !== 10) return setStepError("Please enter a 10-digit phone number.");
    if (fields.zip.length !== 5) return setStepError("Please enter a 5-digit ZIP code.");
    setStepError(null);
    setStep(2);
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setPhotoError(null);

    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      setPhotoError(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const images = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (images.length < fileList.length) setPhotoError("Only photos can be attached.");

    setProcessingPhotos(true);
    const resized: File[] = [];
    for (const file of images.slice(0, room)) {
      try {
        resized.push(await resizeImage(file));
      } catch {
        setPhotoError(`Couldn't read ${file.name}. Try a JPG or PNG.`);
      }
    }
    setProcessingPhotos(false);
    if (resized.length > 0) setPhotos((prev) => [...prev, ...resized]);

    // reset input so selecting the same file again still fires onChange
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Enter in a step-1 field submits the form — treat it as "Next" instead.
    if (step === 1) return goToStep2();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    Object.entries(fields).forEach(([key, value]) => formData.set(key, value));
    photos.forEach((file) => formData.append("photos", file));

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      reportLeadConversion();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-charcoal-2 bg-ink p-10 text-center shadow-lg">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" strokeWidth={1.5} />
        <h3 className="mt-5 font-display text-2xl text-concrete">Request received</h3>
        <p className="mt-3 max-w-sm text-sm text-concrete/70">
          Thanks, {fields.name.split(" ")[0]}! We&rsquo;ll get back to you within 24 hours. A confirmation is on its way to{" "}
          {fields.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-charcoal-2 bg-ink p-7 shadow-lg md:p-9">
      <StepIndicator step={step} onBack={() => setStep(1)} />

      {/* Step 1 — contact info. Kept mounted (hidden) so values survive going back. */}
      <div className={clsx(step !== 1 && "hidden")}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full Name" name="name" value={fields.name} onChange={update} autoComplete="name" className="sm:col-span-2" />
          <Field label="Phone" name="phone" type="tel" value={formatPhone(fields.phone)} onChange={update} autoComplete="tel" placeholder="(512) 555-0123" />
          <Field label="Email" name="email" type="email" value={fields.email} onChange={update} autoComplete="email" placeholder="you@example.com" />
          <Field label="Street Address" name="address" value={fields.address} onChange={update} autoComplete="street-address" className="sm:col-span-2" />
          <Field label="City" name="city" value={fields.city} onChange={update} autoComplete="address-level2" />
          <Field label="ZIP Code" name="zip" value={fields.zip} onChange={update} autoComplete="postal-code" inputMode="numeric" />
        </div>

        {stepError && <p className="mt-4 text-sm text-red-700" role="alert">{stepError}</p>}

        <Button type="button" onClick={goToStep2} icon={false} className="mt-7 w-full">
          Next: Project Details <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Step 2 — project details */}
      <div className={clsx(step !== 2 && "hidden")}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="service">Service Needed</Label>
            <select id="service" name="service" required={step === 2} defaultValue={defaultServiceName} className={inputClass}>
              <option value="">Select a service</option>
              <option value="Free Roof Inspection">Free Roof Inspection</option>
              {serviceOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="message">Project Details</Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What's going on, roughly how big is the job, and when would you like it done?"
              className={clsx(inputClass, "resize-none")}
            />
          </div>

          <div>
            <Label htmlFor="contactMethod">Best Way to Reach You</Label>
            <select id="contactMethod" name="contactMethod" defaultValue="" className={inputClass}>
              <option value="">No preference</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div>
            <Label htmlFor="contactTime">Best Time</Label>
            <select id="contactTime" name="contactTime" defaultValue="" className={inputClass}>
              <option value="">Any time</option>
              <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
              <option value="Afternoon (12pm–5pm)">Afternoon (12pm–5pm)</option>
              <option value="Evening (5pm–8pm)">Evening (5pm–8pm)</option>
            </select>
          </div>

          {/* Photo upload */}
          <div className="sm:col-span-2">
            <Label>
              Photos <span className="font-normal text-steel">(optional, up to {MAX_PHOTOS})</span>
            </Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {photos.length < MAX_PHOTOS && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={processingPhotos}
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-charcoal-2 bg-charcoal px-6 py-7 text-center transition-colors hover:border-oxblood"
              >
                <UploadCloud className="h-5 w-5 text-oxblood-light" strokeWidth={2} />
                <span className="text-sm text-concrete/80">
                  {processingPhotos ? "Preparing photos…" : "Tap to add photos of the roof or project"}
                </span>
              </button>
            )}

            {photoError && <p className="mt-2 text-xs text-red-700">{photoError}</p>}

            {photos.length > 0 && (
              <ul className="mt-3 space-y-2">
                {photos.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 rounded-md border border-charcoal-2 px-3 py-2.5">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <ImageIcon className="h-4 w-4 shrink-0 text-oxblood-light" />
                      <span className="truncate text-xs text-concrete/85">{file.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={`Remove ${file.name}`}
                      className="shrink-0 p-1 text-steel hover:text-concrete"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 sm:col-span-2">
            <input type="checkbox" required={step === 2} className="mt-1 h-4 w-4 shrink-0 accent-[#806a3f]" />
            <span className="text-sm text-concrete/75">
              I agree to be contacted about my project. See our{" "}
              <Link href="/privacy-policy" className="text-oxblood-light underline underline-offset-2">
                privacy policy
              </Link>
              .
            </span>
          </label>
        </div>

        {context?.sourcePage && <input type="hidden" name="sourcePage" value={context.sourcePage} />}
        {context?.location && <input type="hidden" name="location" value={context.location} />}

        <div className="mt-7 flex gap-3">
          <Button type="button" variant="secondary" icon={false} onClick={() => setStep(1)}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button type="submit" icon={false} disabled={status === "submitting" || processingPhotos} className="flex-1">
            {status === "submitting" ? "Sending…" : "Get My Free Estimate"}
          </Button>
        </div>

        {status === "error" && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            Something went wrong sending that — please call or text us at{" "}
            <a href={siteConfig.phoneHref} className="font-semibold underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        )}
      </div>

      <p className="mt-5 text-center text-[11px] tracking-[0.08em] text-steel uppercase">
        No spam. No obligation. Response within 24 hours.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-charcoal-2 bg-ink px-4 py-3 text-sm text-concrete placeholder:text-steel/70 focus:border-oxblood-light";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold tracking-[0.06em] text-concrete/80 uppercase">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  className,
  ...input
}: {
  label: string;
  name: keyof Fields;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} className={inputClass} {...input} />
    </div>
  );
}

function StepIndicator({ step, onBack }: { step: 1 | 2; onBack: () => void }) {
  const dot = (n: 1 | 2, label: string) => (
    <span className="flex items-center gap-2">
      <span
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
          step >= n ? "bg-oxblood text-concrete" : "bg-charcoal-2 text-steel"
        )}
      >
        {n}
      </span>
      <span className={clsx("hidden text-sm sm:inline", step === n ? "font-semibold text-concrete" : "text-steel")}>
        {label}
      </span>
    </span>
  );

  return (
    <div className="mb-7 flex items-center">
      <button type="button" onClick={onBack} disabled={step === 1} className="disabled:cursor-default">
        {dot(1, "Contact Info")}
      </button>
      <div className="mx-3 h-1 flex-1 rounded bg-charcoal-2">
        <div className={clsx("h-full rounded bg-oxblood transition-all duration-300", step === 2 ? "w-full" : "w-0")} />
      </div>
      {dot(2, "Project Details")}
    </div>
  );
}

function formatPhone(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Scales a photo down to MAX_DIMENSION on its long edge and re-encodes it as JPEG. */
async function resizeImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), "image/jpeg", JPEG_QUALITY)
  );
  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}
