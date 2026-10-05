import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/sections/Nav";
import Contact from "../../../components/sections/Contact";
import Footer from "../../../components/sections/Footer";
import FAQ from "../../../components/sections/FAQ";
import Testimonials from "../../../components/sections/Testimonials";
import ServiceAreaHero from "../../../components/service-area/ServiceAreaHero";
import ServiceAreaOverview from "../../../components/service-area/ServiceAreaOverview";
import RelatedProjects from "../../../components/service/RelatedProjects";
import {
  serviceAreas,
  services,
  getProjectsByServiceArea,
  getTestimonialsByServiceArea,
} from "../../../lib/data";
import { siteConfig } from "../../../lib/site-config";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "../../../lib/structured-data";

type Params = { slug: string };

export const dynamicParams = false;

// Draft areas are generated too, so they can be previewed — they're noindexed below.
export function generateStaticParams() {
  if (!siteConfig.features.serviceAreaPages) return [];
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area || !siteConfig.features.serviceAreaPages) return {};

  const title = area.seo?.title ?? `Roofing Contractor in ${area.name}${area.state ? `, ${area.state}` : ""}`;
  const description = area.seo?.description ?? area.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: { title, description, url: `/service-areas/${area.slug}` },
    ...(area.status === "draft" && { robots: { index: false, follow: true } }),
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<Params> }) {
  if (!siteConfig.features.serviceAreaPages) notFound();

  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const relatedServices = services.filter((s) => area.relatedServices?.includes(s.slug));
  const nearbyAreas = serviceAreas.filter((a) => area.nearby?.includes(a.slug) && a.status === "ready");
  const areaProjects = getProjectsByServiceArea(area.slug);
  const areaReviews = getTestimonialsByServiceArea(area.slug);
  const path = `/service-areas/${area.slug}`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: area.name, path },
    ]),
    ...(area.faqs?.length ? [faqJsonLd(area.faqs)] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <Nav />
      <main>
        <ServiceAreaHero area={area} hasProjects={areaProjects.length > 0} />
        <ServiceAreaOverview area={area} relatedServices={relatedServices} nearbyAreas={nearbyAreas} />
        <RelatedProjects
          id="area-projects"
          projects={areaProjects}
          heading={`Our work in ${area.name}`}
        />
        {areaReviews.length > 0 && <Testimonials items={areaReviews} heading={`What ${area.name} customers say`} />}
        {area.faqs && area.faqs.length > 0 && <FAQ faqs={area.faqs} heading={`${area.name} questions`} />}
        <Contact
          context={{ sourcePage: "service-area", location: area.name }}
          heading={`Free roof inspections in ${area.name}`}
        />
      </main>
      <Footer />
    </>
  );
}
