import { ReactNode } from "react";
import Image from "next/image";
import { ShieldCheck, Clock, Home } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { siteConfig } from "../../lib/site-config";
import { media } from "../../lib/media";
import { GoogleIcon } from "../ui/GoogleIcon";

type HeroStat = { icon: ReactNode; value: string; label: string };

const heroStats: HeroStat[] = [
  {
    icon: <GoogleIcon className="h-4 w-4" />,
    value: `${siteConfig.google.rating} ★`,
    label: "Google Rating",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-oxblood" />,
    value: "Free",
    label: "Roof Inspections",
  },
  {
    icon: <Clock className="h-4 w-4 text-oxblood" />,
    value: "24hr",
    label: "Response Time",
  },
  {
    icon: <Home className="h-4 w-4 text-oxblood" />,
    value: "Family",
    label: "Owned & Local",
  },
];

// Rendered on the server with no entrance animation so the headline and the
// photo paint immediately — this is the ad landing page.
export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh w-full items-end overflow-hidden pt-28">
      <Image
        src={media.hero.image}
        alt="Austin home with a new metal roof, siding, and paint by PT Roofing & Renovations"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />

      <Container className="relative z-10 pb-24 md:pb-28">
        <p className="mb-5 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.28em] text-oxblood uppercase">
          <span className="h-[3px] w-[3px] bg-current" aria-hidden />
          Roofing &amp; Renovations · {siteConfig.serviceArea}
        </p>

        <h1 className="max-w-3xl font-display text-[13vw] leading-[0.95] text-white text-balance sm:text-[9vw] md:text-[6.4vw] lg:text-[5.4rem]">
          Your Home,
          <br />
          Our <span className="text-oxblood">Craft.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Roof repair and replacement, James Hardie® siding, painting, and renovations from a
          family-owned crew in South Austin. Every roofing job starts with a free inspection.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="#contact" variant="primary">
            Get a Free Inspection
          </Button>
          <Button href={siteConfig.phoneHref} variant="light" icon={false}>
            Call {siteConfig.phone}
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-16 md:flex md:flex-wrap md:gap-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-md border border-white/15 bg-black/55 px-5 py-4 md:px-7 md:py-5">
              <div className="flex items-center gap-2">
                <span className="shrink-0">{stat.icon}</span>
                <span className="font-display text-2xl text-white md:text-3xl">{stat.value}</span>
              </div>
              <div className="mt-1 text-[10px] tracking-[0.18em] text-white/70 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
