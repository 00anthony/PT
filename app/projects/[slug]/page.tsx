import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../../components/sections/Nav";
import Contact from "../../../components/sections/Contact";
import Footer from "../../../components/sections/Footer";
import RelatedProjects from "../../../components/service/RelatedProjects";
import ProjectHero from "../../../components/project/ProjectHero";
import { projects, getProjectBySlug, getRelatedProjects } from "../../../lib/data";
import { breadcrumbJsonLd, jsonLdScript } from "../../../lib/structured-data";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} in ${project.location}`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug}`,
      images: project.afterSrc ? [{ url: project.afterSrc }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project, 2);
  const path = `/projects/${project.slug}`;
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <Nav />
      <main>
        <ProjectHero project={project} />
        <RelatedProjects projects={related} heading="More projects" eyebrow="Keep Looking" />
        <Contact
          defaultService={project.serviceSlug}
          context={{ sourcePage: "project", location: project.location }}
        />
      </main>
      <Footer />
    </>
  );
}
