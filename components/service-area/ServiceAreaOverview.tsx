import Link from "next/link";
import { Check, ArrowRight, MapPin } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import SectionBackdrop from "../ui/SectionBackdrop";
import { getServiceContent } from "../../lib/audience";
import type { Service, ServiceArea } from "../../lib/types";

export default function ServiceAreaOverview({
  area,
  relatedServices,
  nearbyAreas,
}: {
  area: ServiceArea;
  relatedServices: Service[];
  nearbyAreas: ServiceArea[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <SectionBackdrop glow={false} />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>About {area.name}</Eyebrow>
              <h2 className="mt-5 max-w-lg font-display text-3xl text-concrete sm:text-4xl">
                Roofing and renovations for {area.name} homes
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-concrete/75">{area.description}</p>
            </Reveal>

            {area.localCopy?.notes && area.localCopy.notes.length > 0 && (
              <Reveal delay={0.08} className="mt-10 rounded-xl border border-charcoal-2 bg-charcoal p-6 md:p-7">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">
                  Why {area.name} Homeowners Call Us
                </div>
                <ul className="mt-4 space-y-3.5">
                  {area.localCopy.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-oxblood-light" strokeWidth={2.5} />
                      <span className="text-sm leading-relaxed text-concrete/85">{note}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {area.neighborhoods && area.neighborhoods.length > 0 && (
              <Reveal delay={0.1} className="mt-8">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">
                  Neighborhoods We&rsquo;ve Worked In
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {area.neighborhoods.map((n) => (
                    <li key={n} className="rounded-full border border-charcoal-2 px-3 py-1 text-sm text-concrete/80">
                      {n}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <div className="space-y-6 lg:col-span-5">
            {relatedServices.length > 0 && (
              <Reveal delay={0.12} className="rounded-xl border border-charcoal-2 bg-charcoal p-6 md:p-7">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">
                  Services in {area.name}
                </div>
                <ul className="mt-3">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-center justify-between border-b border-charcoal-2 py-3 text-sm text-concrete/85 transition-colors last:border-0 hover:text-oxblood-light"
                      >
                        {getServiceContent(service).name}
                        <ArrowRight className="h-4 w-4 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {nearbyAreas.length > 0 && (
              <Reveal delay={0.16} className="rounded-xl border border-charcoal-2 p-6 md:p-7">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">Nearby Areas</div>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                  {nearbyAreas.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/service-areas/${a.slug}`} className="flex items-center gap-1.5 text-sm text-concrete/80 hover:text-oxblood-light">
                        <MapPin className="h-3.5 w-3.5 text-oxblood-light" />
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
