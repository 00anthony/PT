"use client";

import { useState } from "react";
import clsx from "clsx";
import Container from "../ui/Container";
import Button from "../ui/Button";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../lib/data/projects";
import type { FilterValue } from "../../lib/projects-filter-context";

const FILTERS: FilterValue[] = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const BATCH_SIZE = 6;

export default function ProjectsDirectory() {
  const [filter, setFilter] = useState<FilterValue>("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleFilterChange(f: FilterValue) {
    setFilter(f);
    setVisibleCount(BATCH_SIZE);
  }

  return (
    <section className="relative overflow-hidden bg-ink pb-20 md:pb-28">
      <Container className="relative">
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              aria-pressed={filter === f}
              className={clsx(
                "rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-200",
                filter === f
                  ? "border-oxblood bg-oxblood text-concrete"
                  : "border-charcoal-2 text-concrete/60 hover:border-oxblood hover:text-concrete"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visible.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-xl border border-charcoal-2 bg-ink shadow-sm">
              <ProjectCard project={project} />
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="mt-14 flex justify-center">
            <Button type="button" onClick={() => setVisibleCount((c) => c + BATCH_SIZE)} variant="secondary" icon={false}>
              Load More Projects
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
