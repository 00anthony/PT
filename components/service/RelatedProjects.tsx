import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import ProjectCard from "../ui/ProjectCard";
import type { Project } from "../../lib/types";

export default function RelatedProjects({
  projects,
  heading,
  eyebrow = "Recent Work",
  id = "related-projects",
}: {
  projects: Project[];
  heading: string;
  eyebrow?: string;
  id?: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section id={id} className="relative scroll-mt-20 overflow-hidden bg-charcoal py-20 md:py-28">
      <Container className="relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-3xl text-concrete sm:text-4xl">{heading}</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-xl bg-ink shadow-md">
              <ProjectCard project={project} />
            </article>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Button href="/projects" variant="secondary" icon={false}>
            View All Projects
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
