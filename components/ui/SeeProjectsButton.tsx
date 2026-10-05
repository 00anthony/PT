"use client";

import { useProjectsFilter, FilterValue } from "../../lib/projects-filter-context";

/** Jumps to the homepage project grid with a category pre-selected. Needs ProjectsFilterProvider. */
export default function SeeProjectsButton({ category }: { category: FilterValue }) {
  const { goToProjects } = useProjectsFilter();

  return (
    <button
      type="button"
      onClick={() => goToProjects(category)}
      className="relative z-10 border-b border-white/40 text-xs font-semibold tracking-[0.14em] text-white/85 uppercase transition-colors hover:border-white hover:text-white"
    >
      See Recent Projects
    </button>
  );
}
