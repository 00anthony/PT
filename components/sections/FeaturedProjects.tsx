"use client";

import clsx from "clsx";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import Button from "../../components/ui/Button";
import ProjectCard from "../../components/ui/ProjectCard";
import SectionBackdrop from "../../components/ui/SectionBackdrop";
import { projects } from "../../lib/data/projects";
import { useProjectsFilter, FilterValue } from "../../lib/projects-filter-context";

const VISIBLE_COUNT = 4;

// Only offer filters that actually have projects behind them.
const filters: FilterValue[] = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

function pickVisible(active: FilterValue) {
  const pool =
    active === "All"
      ? projects
      : active === "Featured"
        ? projects.filter((p) => p.featured)
        : projects.filter((p) => p.category === active);
  return pool.slice(0, VISIBLE_COUNT);
}

export default function FeaturedProjects() {
  const { activeFilter, setActiveFilter } = useProjectsFilter();
  const visible = pickVisible(activeFilter);

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-hidden bg-charcoal py-24 md:py-32">
      <SectionBackdrop glow={false} />

      <Container className="relative">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow>Recent Projects</Eyebrow>
              <h2 className="mt-5 max-w-xl font-display text-4xl text-concrete sm:text-5xl">
                Real homes.
                <br />
                Real before &amp; afters.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-concrete/65">
              Every project here is a real PT job. Drag the slider on any photo to compare before and after.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={clsx(
                "rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-200",
                activeFilter === f
                  ? "border-oxblood bg-oxblood text-concrete"
                  : "border-charcoal-2 bg-ink text-concrete/60 hover:border-oxblood hover:text-concrete"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visible.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-xl bg-ink shadow-md">
              <ProjectCard project={project} />
            </article>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Button href="/projects" variant="secondary">
            View All Projects
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
