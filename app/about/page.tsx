import type { Metadata } from "next";
import Nav from "../../components/sections/Nav";
import PageHero from "../../components/ui/PageHero";
import About from "../../components/sections/About";
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import Testimonials from "../../components/sections/Testimonials";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/sections/Footer";
import { siteConfig } from "../../lib/site-config";
import { breadcrumbJsonLd, jsonLdScript } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "About Us — Family-Owned Roofing in South Austin",
  description: `${siteConfig.name} is a family-owned roofing and renovation company based in South Austin, serving ${siteConfig.serviceArea}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])
        )}
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="About Us"
          title="Family owned. South Austin based."
          description="We treat every home as if it were our own — from the first call to the final nail sweep."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
