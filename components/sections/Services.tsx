import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import Button from "../../components/ui/Button";
import SectionBackdrop from "../../components/ui/SectionBackdrop";
import ServiceCard from "../../components/ui/ServiceCard";
import { services, projects } from "../../lib/data";
import { getServiceContent } from "../../lib/audience";
import { serviceToCategory } from "../../lib/project-filters";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <SectionBackdrop />

      <Container className="relative">
        <Reveal>
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-4xl text-concrete sm:text-5xl">
            Roofing first.
            <br />
            The rest of the house, too.
          </h2>
          <p className="mt-5 max-w-lg text-concrete/70">
            Roofing is most of what we do, but the same crew handles siding, paint, outdoor
            living, windows, and interiors — so bigger projects get done as one job.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const content = getServiceContent(service);
            const category = serviceToCategory[service.slug];
            const hasProjects = projects.some((p) => p.category === category);
            return (
              <ServiceCard
                key={service.slug}
                name={content.name}
                short={content.short}
                image={content.image}
                href={`/services/${service.slug}`}
                slug={service.slug}
                projectsCategory={hasProjects ? category : undefined}
              />
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-16 flex flex-col items-center rounded-xl border border-charcoal-2 bg-charcoal px-8 py-12 text-center md:py-14">
          <p className="text-[11px] font-medium tracking-[0.2em] text-steel uppercase">Not sure what you need?</p>
          <h3 className="mt-4 max-w-xl font-display text-3xl text-concrete sm:text-4xl">Start with a free roof inspection</h3>
          <p className="mt-4 max-w-md text-sm text-concrete/65">
            We&rsquo;ll tell you honestly whether you need a repair, a replacement, or nothing at all.
          </p>
          <Button href="#contact" variant="primary" className="mt-8">
            Schedule a Free Inspection
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
