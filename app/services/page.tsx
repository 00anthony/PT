import type { Metadata } from "next";
import Nav from "../../components/sections/Nav";
import PageHero from "../../components/ui/PageHero";
import ServicesDirectory from "../../components/sections/ServicesDirectory";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/sections/Footer";
import { breadcrumbJsonLd, jsonLdScript } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "Roofing, Siding & Renovation Services in Austin, TX",
  description:
    "Roof repair and replacement, free roof inspections, James Hardie siding, painting, decks and patios, windows, and interior remodeling across Greater Austin.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Our Services"
          title="Roofing, siding & renovations"
          description="Roofing is the core of what we do — and the same crew handles siding, paint, outdoor living, windows, and interiors across Greater Austin."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />
        <div className="pt-20 md:pt-24">
          <ServicesDirectory />
        </div>
        <Contact context={{ sourcePage: "service" }} />
      </main>
      <Footer />
    </>
  );
}
