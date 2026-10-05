"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { FilterValue } from "./project-filters";

export type { FilterValue } from "./project-filters";

type FilterContextType = {
  activeFilter: FilterValue;
  setActiveFilter: (value: FilterValue) => void;
  goToProjects: (value: FilterValue) => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export function ProjectsFilterProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const goToProjects = (value: FilterValue) => {
    setActiveFilter(value);
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <FilterContext.Provider value={{ activeFilter, setActiveFilter, goToProjects }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useProjectsFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useProjectsFilter must be used within ProjectsFilterProvider");
  }
  return ctx;
}
