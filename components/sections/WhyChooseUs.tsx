import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import { whyChooseUs } from "../../lib/data";

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 md:py-32">
      <Container className="relative">
        <Reveal>
          <Eyebrow>Why PT</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-4xl text-concrete sm:text-5xl">
            What our customers
            <br />
            keep mentioning
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          {whyChooseUs.map((item, i) => (
            <div key={item.title} className="flex gap-6">
              <span className="font-display text-3xl text-oxblood">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl text-concrete">{item.title}</h3>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-concrete/65">{item.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
