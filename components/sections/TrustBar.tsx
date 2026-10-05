import { ShieldCheck, Star, Home, Layers, Sparkles } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../lib/site-config";

const items = [
  { icon: ShieldCheck, label: "Free Roof Inspections" },
  { icon: Layers, label: "Metal & Shingle Roofing" },
  { icon: Home, label: "James Hardie® Siding" },
  { icon: Star, label: `${siteConfig.google.rating}★ on Google` },
  { icon: Sparkles, label: "Daily Job-Site Cleanup" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-charcoal-2 bg-charcoal py-5">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 whitespace-nowrap">
            <item.icon className="h-4 w-4 shrink-0 text-oxblood-light" strokeWidth={2} />
            <span className="text-xs font-medium tracking-[0.08em] text-concrete/75 uppercase">{item.label}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}
