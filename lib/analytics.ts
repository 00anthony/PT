import { siteConfig } from "./site-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Google Ads "Website lead" conversion — call after a form submission succeeds. */
export function reportLeadConversion() {
  window.gtag?.("event", "conversion", { send_to: siteConfig.analytics.leadConversion });
}
