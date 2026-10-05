import type { ProjectCategory } from "./types";

// Plain module (no "use client") so server components can read these values.

export type FilterValue = "All" | "Featured" | ProjectCategory;

/** Maps a service slug to the project category its "See Recent Projects" CTA should open. */
export const serviceToCategory: Record<string, FilterValue> = {
  roofing: "Roofing",
  siding: "Siding",
  painting: "Painting",
  patios: "Patios",
  windows: "Windows",
  interior: "Interior",
};
