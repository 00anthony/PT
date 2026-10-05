import { siteConfig } from "./site-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * A form submission succeeded — reports it to Google Ads ("Website lead"
 * conversion) and Meta (standard "Lead" event). No form fields are sent.
 */
export function reportLeadConversion() {
  window.gtag?.("event", "conversion", { send_to: siteConfig.analytics.leadConversion });
  window.fbq?.("track", "Lead");
}
