import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { serviceAreas, publishedServiceAreas, getProjectsByServiceArea } from "../../lib/data";

export default function ServiceAreasGrid() {
  // Draft areas are listed by name only — no link to a page that isn't ready to be indexed.
  const alsoServing = serviceAreas.filter((a) => a.status === "draft").map((a) => a.name);

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <Container className="relative">
        <Reveal>
          <Eyebrow>Where We Work</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-3xl text-concrete sm:text-4xl">Greater Austin service areas</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedServiceAreas.map((area) => {
            const projectCount = getProjectsByServiceArea(area.slug).length;
            return (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group rounded-xl border border-charcoal-2 bg-charcoal p-7 transition-colors hover:border-oxblood"
              >
                <MapPin className="h-6 w-6 text-oxblood-light" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl text-concrete">{area.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete/70">{area.shortDescription}</p>
                {projectCount > 0 && (
                  <p className="mt-3 text-xs font-medium text-steel">
                    {projectCount} completed project{projectCount > 1 ? "s" : ""} here
                  </p>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-oxblood-light uppercase">
                  View Area
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        {alsoServing.length > 0 && (
          <Reveal delay={0.1} className="mt-10 rounded-xl border border-dashed border-charcoal-2 p-6 text-center">
            <p className="text-sm text-concrete/75">
              <span className="font-semibold text-concrete">We also serve:</span> {alsoServing.join(" · ")}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
