import type { Metadata } from "next";
import Nav from "../../components/sections/Nav";
import PageHero from "../../components/ui/PageHero";
import ServiceAreasGrid from "../../components/sections/ServiceAreasGrid";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/sections/Footer";
import { siteConfig } from "../../lib/site-config";
import { breadcrumbJsonLd, jsonLdScript } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "Service Areas — Roofing Across Greater Austin",
  description: `${siteConfig.name} serves ${siteConfig.serviceAreaCities.join(", ")} — roofing, siding, and renovations from our South Austin office.`,
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
          ])
        )}
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Service Areas"
          title="Where we work"
          description="From our office in South Austin, we cover Greater Austin — north to Georgetown and south to San Marcos."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
        />
        <ServiceAreasGrid />
        <Contact context={{ sourcePage: "service-area" }} />
      </main>
      <Footer />
    </>
  );
}
