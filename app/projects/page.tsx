import type { Metadata } from "next";
import Nav from "../../components/sections/Nav";
import PageHero from "../../components/ui/PageHero";
import ProjectsDirectory from "../../components/sections/ProjectsDirectory";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/sections/Footer";
import { breadcrumbJsonLd, jsonLdScript } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "Roofing & Renovation Projects — Before & After",
  description:
    "Before and after photos of real roofing, siding, deck, and patio projects by PT Roofing & Renovations across Greater Austin.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ])
        )}
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Our Work"
          title="Before & after"
          description="Real PT projects from around Greater Austin — drag the slider on any photo to compare."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />
        <div className="pt-16 md:pt-20">
          <ProjectsDirectory />
        </div>
        <Contact context={{ sourcePage: "project" }} />
      </main>
      <Footer />
    </>
  );
}
