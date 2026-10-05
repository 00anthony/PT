import Image from "next/image";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import SectionBackdrop from "../../components/ui/SectionBackdrop";
import { media } from "../../lib/media";
import { siteConfig } from "../../lib/site-config";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <SectionBackdrop />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>About PT</Eyebrow>
              <h2 className="mt-5 font-display text-4xl text-concrete sm:text-5xl">
                Building trust,
                <br />
                one project at a time
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5 text-concrete/75">
              <Reveal delay={0.05}>
                <p className="text-lg leading-relaxed text-concrete/90">
                  {siteConfig.name} is a family-owned company based in South Austin. We&rsquo;re not just
                  contractors — we&rsquo;re your partners in protecting and improving your most valuable asset.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="leading-relaxed">
                  Our approach is simple: treat every home as if it were our own. That means showing up when we
                  say we will, keeping you updated throughout the job, cleaning up every day, and not calling a
                  project finished until you&rsquo;re happy with it.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="leading-relaxed">
                  Roofing is the core of what we do — repairs, full replacements, and free inspections — and the
                  same crew handles siding, painting, outdoor living, windows, and interiors across{" "}
                  {siteConfig.serviceArea}.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/images/portfolio/deck-after.webp"
                alt="Cedar deck rebuilt by PT Roofing & Renovations"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="text-center text-[11px] font-medium tracking-[0.2em] text-steel uppercase">
            Certifications &amp; Affiliations
          </h3>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {media.certifications.map((cert) => (
              <li key={cert.name} className="flex flex-col items-center gap-3 text-center">
                <Image src={cert.logo} alt={cert.name} width={96} height={96} className="h-20 w-auto object-contain" />
                <span className="text-xs text-concrete/70">{cert.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
