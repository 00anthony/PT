import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import ServiceCard from "../ui/ServiceCard";
import { services } from "../../lib/data";
import { getServiceContent } from "../../lib/audience";

export default function ServicesDirectory() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 md:pb-28">
      <Container className="relative">
        <Reveal>
          <Eyebrow>Full Directory</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-3xl text-concrete sm:text-4xl">Every service we offer</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const content = getServiceContent(service);
            return (
              <ServiceCard
                key={service.slug}
                name={content.name}
                short={content.short}
                image={content.image}
                href={`/services/${service.slug}`}
                slug={service.slug}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
