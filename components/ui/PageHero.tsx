import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Button from "./Button";
import Breadcrumbs, { Crumb } from "./Breadcrumbs";
import { siteConfig } from "../../lib/site-config";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  ctaLabel = "Get a Free Estimate",
  ctaHref = "#contact",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-36 pb-16 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 90% 0%, rgba(204,183,138,0.22), transparent 60%)" }}
      />

      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} />

        <Eyebrow className="mt-7 mb-5">{eyebrow}</Eyebrow>

        <h1 className="max-w-3xl font-display text-4xl text-concrete sm:text-5xl md:text-6xl">{title}</h1>

        {description && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete/75 md:text-lg">{description}</p>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
          <Button href={siteConfig.phoneHref} variant="secondary" icon={false}>
            Call {siteConfig.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
