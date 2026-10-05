import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import Breadcrumbs from "../ui/Breadcrumbs";
import ServiceAreaMap from "../ui/ServiceAreaMap";
import { siteConfig } from "../../lib/site-config";
import type { ServiceArea } from "../../lib/types";

export default function ServiceAreaHero({ area, hasProjects }: { area: ServiceArea; hasProjects: boolean }) {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-36 pb-20 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 90% 0%, rgba(204,183,138,0.22), transparent 60%)" }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Service Areas", href: "/service-areas" },
                { label: area.name },
              ]}
            />

            <Eyebrow className="mt-7 mb-5">Service Area</Eyebrow>

            <h1 className="max-w-2xl font-display text-4xl text-concrete sm:text-5xl md:text-6xl">
              {area.localCopy?.headline ?? `Serving ${area.name}${area.state ? `, ${area.state}` : ""}`}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete/75 md:text-lg">
              {area.localCopy?.intro ?? area.shortDescription}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="primary">
                Get a Free Inspection
              </Button>
              {hasProjects ? (
                <Button href="#area-projects" variant="secondary" icon={false}>
                  See Our Work in {area.name}
                </Button>
              ) : (
                <Button href={siteConfig.phoneHref} variant="secondary" icon={false}>
                  Call {siteConfig.phone}
                </Button>
              )}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <ServiceAreaMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
