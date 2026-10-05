import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Breadcrumbs from "../ui/Breadcrumbs";
import { siteConfig } from "../../lib/site-config";
import type { ServiceContent } from "../../lib/types";

export default function ServiceHero({
  content,
  hasRelatedProjects,
  breadcrumbs,
  title,
}: {
  content: ServiceContent;
  hasRelatedProjects: boolean;
  breadcrumbs: { label: string; href?: string }[];
  /** Overrides the H1 (defaults to the service name). */
  title?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 md:pb-28">
      {content.image && (
        <Image src={content.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />

      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} onDark />

        <p className="mt-7 mb-5 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.28em] text-oxblood uppercase">
          <span className="h-[3px] w-[3px] bg-current" aria-hidden />
          {siteConfig.name}
        </p>

        <h1 className="max-w-3xl font-display text-5xl text-white sm:text-6xl md:text-7xl">{title ?? content.name}</h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{content.description}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="#contact" variant="primary">
            Get a Free Estimate
          </Button>
          {hasRelatedProjects ? (
            <Button href="#related-projects" variant="light" icon={false}>
              See Our Work
            </Button>
          ) : (
            <Button href={siteConfig.phoneHref} variant="light" icon={false}>
              Call {siteConfig.phone}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
