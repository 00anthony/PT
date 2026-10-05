import type { Metadata } from "next";
import Nav from "../../components/sections/Nav";
import PageHero from "../../components/ui/PageHero";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/sections/Footer";
import { siteConfig } from "../../lib/site-config";
import { breadcrumbJsonLd, jsonLdScript } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Us — Free Roof Inspections & Estimates",
  description: `Request a free roof inspection or estimate from ${siteConfig.name}. Call ${siteConfig.phone}. ${siteConfig.responsePromise}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title="Let’s talk about your project"
          description={siteConfig.responsePromise}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
