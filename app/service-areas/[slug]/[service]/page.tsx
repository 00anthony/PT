import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../../components/sections/Nav";
import Contact from "../../../../components/sections/Contact";
import Footer from "../../../../components/sections/Footer";
import ServiceHero from "../../../../components/service/ServiceHero";
import ServiceOverview from "../../../../components/service/ServiceOverview";
import RelatedProjects from "../../../../components/service/RelatedProjects";
import { serviceAreas, services, projects } from "../../../../lib/data";
import { getServiceContent } from "../../../../lib/audience";
import { siteConfig } from "../../../../lib/site-config";
import { breadcrumbJsonLd, serviceJsonLd, jsonLdScript } from "../../../../lib/structured-data";

type Params = { slug: string; service: string };

// Only exact matches from generateStaticParams render — no thin, blanket
// city×service combinations get generated. Off via siteConfig.features
// until each area has real per-service project content.
export const dynamicParams = false;

function resolve(areaSlug: string, serviceSlug: string) {
  const area = serviceAreas.find((a) => a.slug === areaSlug && a.status === "ready");
  const service = services.find((s) => s.slug === serviceSlug);
  if (!area || !service || !area.relatedServices?.includes(serviceSlug)) return null;
  return { area, service };
}

export function generateStaticParams() {
  if (!siteConfig.features.locationServicePages) return [];
  return serviceAreas.flatMap((area) =>
    (area.relatedServices ?? [])
      .filter((serviceSlug) => resolve(area.slug, serviceSlug))
      .map((serviceSlug) => ({ slug: area.slug, service: serviceSlug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (!siteConfig.features.locationServicePages) return {};
  const { slug, service: serviceSlug } = await params;
  const resolved = resolve(slug, serviceSlug);
  if (!resolved) return {};

  const { area, service } = resolved;
  const content = getServiceContent(service);
  const locationLabel = `${area.name}${area.state ? `, ${area.state}` : ""}`;

  return {
    title: `${content.name} in ${locationLabel}`,
    description: `${content.short} Serving ${locationLabel} and the surrounding area.`,
    alternates: { canonical: `/service-areas/${area.slug}/${service.slug}` },
  };
}

export default async function LocationServicePage({ params }: { params: Promise<Params> }) {
  if (!siteConfig.features.locationServicePages) notFound();

  const { slug, service: serviceSlug } = await params;
  const resolved = resolve(slug, serviceSlug);
  if (!resolved) notFound();
  const { area, service } = resolved;

  const content = getServiceContent(service);
  const locationLabel = `${area.name}${area.state ? `, ${area.state}` : ""}`;

  // Only projects that genuinely match both this service AND this area.
  const relatedProjects = projects.filter(
    (p) => (p.serviceSlug === service.slug || p.alsoServices?.includes(service.slug)) && p.serviceAreaSlug === area.slug
  );

  const path = `/service-areas/${area.slug}/${service.slug}`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: area.name, path: `/service-areas/${area.slug}` },
      { name: content.name, path },
    ]),
    serviceJsonLd(content, path, [area.name]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <Nav />
      <main>
        <ServiceHero
          content={content}
          title={`${content.name} in ${locationLabel}`}
          hasRelatedProjects={relatedProjects.length > 0}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: area.name, href: `/service-areas/${area.slug}` },
            { label: content.name },
          ]}
        />
        <ServiceOverview content={content} />
        <RelatedProjects projects={relatedProjects} heading={`${content.name} in ${area.name}`} />
        <Contact defaultService={service.slug} context={{ sourcePage: "service-area", location: area.name }} />
      </main>
      <Footer />
    </>
  );
}
