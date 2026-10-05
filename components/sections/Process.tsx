import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import { processSteps } from "../../lib/data";

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-concrete py-24 md:py-32">
      <Container className="relative">
        <Reveal>
          <Eyebrow className="!text-oxblood">How It Works</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-4xl text-white sm:text-5xl">
            From first call
            <br />
            to final walkthrough
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-7">
                <span aria-hidden className="absolute top-5 right-6 font-display text-5xl text-white/10">
                  {step.step}
                </span>
                <step.icon className="h-8 w-8 text-oxblood" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-xl text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
