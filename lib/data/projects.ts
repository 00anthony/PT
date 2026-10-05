import type { Project } from "../types";

// TODO(client): confirm completion dates, durations, and whether any of these
// jobs match a real Google review — then add `completed`, `timeline`, and
// `review` (with source: "google") back. Never add a review that isn't real.
export const projects: Project[] = [
  {
    slug: "austin-siding-and-roof-remodel",
    title: "Siding & Roof Remodel",
    location: "Austin, TX",
    category: "Roofing",
    service: "Metal Roofing, Siding & Paint",
    serviceSlug: "roofing",
    alsoServices: ["siding", "painting"],
    serviceAreaSlug: "austin",
    description:
      "A full exterior makeover: new metal roofing, new siding, and fresh paint, completed together so the whole house was finished as one project instead of three.",
    tags: ["Metal Roofing", "Siding", "Painting"],
    featured: true,
    beforeLabel: "Original roof and siding",
    afterLabel: "New metal roof, siding, and paint",
    beforeSrc: "/images/portfolio/siding-roof-before.webp",
    afterSrc: "/images/portfolio/siding-roof-after.webp",
  },
  {
    slug: "round-rock-siding-replacement",
    title: "Full Siding Replacement",
    location: "Round Rock, TX",
    category: "Siding",
    service: "Siding, Trim & Fascia",
    serviceSlug: "siding",
    serviceAreaSlug: "round-rock",
    description:
      "Whole-house siding replacement with new trim and fascia, and a moisture barrier installed behind the new siding before it went up.",
    tags: ["Siding", "Trim & Fascia", "Moisture Barrier"],
    featured: true,
    beforeLabel: "Worn original siding",
    afterLabel: "New siding, trim, and fascia",
    beforeSrc: "/images/portfolio/siding2-before.webp",
    afterSrc: "/images/portfolio/siding2-after.webp",
  },
  {
    slug: "west-lake-hills-cedar-deck",
    title: "Cedar Deck Rebuild",
    location: "West Lake Hills, TX",
    category: "Patios",
    service: "Deck Construction",
    serviceSlug: "patios",
    serviceAreaSlug: "austin",
    description:
      "A tired backyard deck rebuilt in cedar, with new railings, then stained and sealed to hold up to full Texas sun.",
    tags: ["Cedar", "Staining & Sealing", "Railings"],
    featured: true,
    beforeLabel: "Original deck",
    afterLabel: "Rebuilt cedar deck",
    beforeSrc: "/images/portfolio/deck-before.webp",
    afterSrc: "/images/portfolio/deck-after.webp",
  },
  {
    slug: "pflugerville-stamped-concrete-patio",
    title: "Stamped Concrete Patio",
    location: "Pflugerville, TX",
    category: "Patios",
    service: "Stamped Concrete Patio",
    serviceSlug: "patios",
    serviceAreaSlug: "pflugerville",
    description:
      "A new backyard patio poured, stamped, and colored, then finished with a sealant coat to protect the color and surface.",
    tags: ["Stamped Concrete", "Coloring", "Sealant"],
    beforeLabel: "Bare backyard",
    afterLabel: "Stamped, colored, sealed patio",
    beforeSrc: "/images/portfolio/back-patio-before.webp",
    afterSrc: "/images/portfolio/back-patio-after.webp",
  },
];

/** A project shows on its main service page and on any service listed in `alsoServices`. */
export function getProjectsByService(serviceSlug: string): Project[] {
  return projects.filter((p) => p.serviceSlug === serviceSlug || p.alsoServices?.includes(serviceSlug));
}

/** `project.serviceAreaSlug` is the single source of truth for the service-area↔project relationship. */
export function getProjectsByServiceArea(serviceAreaSlug: string): Project[] {
  return projects.filter((p) => p.serviceAreaSlug === serviceAreaSlug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Other projects sharing this project's service, then its area, up to `limit` — no duplicates, excludes itself. */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const related: Project[] = [];
  const seen = new Set([project.slug]);

  const addAll = (candidates: Project[]) => {
    for (const p of candidates) {
      if (related.length >= limit) break;
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      related.push(p);
    }
  };

  if (project.serviceSlug) addAll(getProjectsByService(project.serviceSlug));
  if (related.length < limit && project.serviceAreaSlug) addAll(getProjectsByServiceArea(project.serviceAreaSlug));
  if (related.length < limit) addAll(projects);

  return related;
}
