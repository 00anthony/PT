import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/sections/Nav";
import Contact from "../../../components/sections/Contact";
import Footer from "../../../components/sections/Footer";
import FAQ from "../../../components/sections/FAQ";
import Testimonials from "../../../components/sections/Testimonials";
import ServiceHero from "../../../components/service/ServiceHero";
import ServiceOverview from "../../../components/service/ServiceOverview";
import RelatedProjects from "../../../components/service/RelatedProjects";
import { services, getProjectsByService, getTestimonialsByService } from "../../../lib/data";
import { getServiceContent } from "../../../lib/audience";
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd, jsonLdScript } from "../../../lib/structured-data";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const content = getServiceContent(service);
  const title = content.seo?.title ?? `${content.name} in Austin, TX`;
  const description = content.seo?.description ?? content.short;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      images: content.image ? [{ url: content.image }] : undefined,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const content = getServiceContent(service);
  const relatedProjects = getProjectsByService(service.slug);
  const reviews = getTestimonialsByService(service.slug);
  const path = `/services/${service.slug}`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: content.name, path },
    ]),
    serviceJsonLd(content, path),
    ...(content.faqs?.length ? [faqJsonLd(content.faqs)] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <Nav />
      <main>
        <ServiceHero
          content={content}
          hasRelatedProjects={relatedProjects.length > 0}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: content.name },
          ]}
        />
        <ServiceOverview content={content} />
        <RelatedProjects projects={relatedProjects} heading={`${content.name} projects`} />
        {reviews.length > 0 && <Testimonials items={reviews} heading={`What customers say about our ${content.name.toLowerCase()}`} />}
        {content.faqs && content.faqs.length > 0 && (
          <FAQ faqs={content.faqs} heading={`${content.name} questions`} />
        )}
        <Contact defaultService={service.slug} context={{ sourcePage: "service", service: service.slug }} />
      </main>
      <Footer />
    </>
  );
}
