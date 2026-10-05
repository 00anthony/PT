import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import SectionBackdrop from "../ui/SectionBackdrop";
import { publishedServiceAreas } from "../../lib/data";
import { siteConfig } from "../../lib/site-config";
import type { ServiceContent } from "../../lib/types";

export default function ServiceOverview({ content }: { content: ServiceContent }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <SectionBackdrop glow={false} />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <h2 className="mt-5 max-w-lg font-display text-3xl text-concrete sm:text-4xl">
                {content.name} for {siteConfig.serviceArea} homes
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-concrete/75">
                {content.longDescription ?? content.description}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10 rounded-xl border border-charcoal-2 bg-charcoal p-5">
              <div className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">Where We Work</div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {publishedServiceAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/service-areas/${area.slug}`}
                    className="flex items-center gap-1.5 text-sm text-concrete/80 hover:text-oxblood-light"
                  >
                    <MapPin className="h-3.5 w-3.5 text-oxblood-light" />
                    {area.name}
                  </Link>
                ))}
                <Link href="/service-areas" className="text-sm font-semibold text-oxblood-light hover:text-concrete">
                  + more
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12} className="rounded-xl border border-charcoal-2 bg-charcoal p-6 md:p-7">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">What&rsquo;s Included</div>
              <ul className="mt-4 space-y-3.5">
                {content.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-oxblood-light" strokeWidth={2.5} />
                    <span className="text-sm leading-relaxed text-concrete/85">{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {content.offerings && content.offerings.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="font-display text-3xl text-concrete sm:text-4xl">Our {content.name.toLowerCase()} services</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Not animated: these are link targets (/services/roofing#metal-roofing) and should be visible on arrival */}
              {content.offerings.map((offering) => (
                  <article key={offering.id} id={offering.id} className="h-full scroll-mt-24 rounded-xl border border-charcoal-2 p-7">
                    <h3 className="font-display text-2xl text-concrete">{offering.name}</h3>
                    <p className="mt-3 leading-relaxed text-concrete/75">{offering.description}</p>
                    {offering.points && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {offering.points.map((p) => (
                          <li key={p} className="rounded-full bg-oxblood/15 px-3 py-1 text-xs font-medium text-oxblood-light">
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
