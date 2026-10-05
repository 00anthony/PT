import Nav from "../components/sections/Nav";
import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Services from "../components/sections/Services";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Testimonials from "../components/sections/Testimonials";
import Process from "../components/sections/Process";
import About from "../components/sections/About";
import ServiceAreasGrid from "../components/sections/ServiceAreasGrid";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import { ProjectsFilterProvider } from "../lib/projects-filter-context";
import { faqs } from "../lib/data";
import { faqJsonLd, jsonLdScript } from "../lib/structured-data";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqs))} />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <ProjectsFilterProvider>
          <Services />
          <FeaturedProjects />
        </ProjectsFilterProvider>
        <Testimonials />
        <Process />
        <About />
        <ServiceAreasGrid />
        <FAQ faqs={faqs} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
