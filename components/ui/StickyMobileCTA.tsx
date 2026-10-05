import { Phone } from "lucide-react";
import { siteConfig } from "../../lib/site-config";

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-charcoal-2 bg-ink shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-charcoal-2 py-3.5 text-sm font-semibold text-concrete"
      >
        <Phone className="h-4 w-4 text-oxblood-light" strokeWidth={2} />
        Call Now
      </a>
      <a
        href="#contact"
        className="flex flex-1 items-center justify-center bg-oxblood py-3.5 text-sm font-semibold text-concrete"
      >
        Free Inspection
      </a>
    </div>
  );
}
