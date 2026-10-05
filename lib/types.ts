export type FAQ = { question: string; answer: string };

export type ServiceOffering = {
  /** Anchor id on the service page, e.g. /services/roofing#metal-roofing */
  id: string;
  name: string;
  description: string;
  points?: string[];
};

export type ServiceContent = {
  name: string;
  short: string;
  description: string;
  /** Longer body copy for the dedicated service page. Falls back to `description` when absent. */
  longDescription?: string;
  bullets: string[];
  /** Background photo for the service card / hero. */
  image?: string;
  /** Distinct offerings within the service, each rendered as its own section on the service page. */
  offerings?: ServiceOffering[];
  /** Service-specific questions — rendered on the service page and emitted as FAQPage structured data. */
  faqs?: FAQ[];
  seo?: {
    title?: string;
    description?: string;
  };
};

export type Service = {
  slug: string;
  /** Surfaces this service in the homepage "Featured" set. */
  featured?: boolean;
  content: {
    default: ServiceContent;
  };
};

export type ProjectCategory = "Roofing" | "Siding" | "Painting" | "Patios" | "Windows" | "Interior";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  service: string;
  /** Slug of the main Service this project belongs to — the source of truth for service/project relationships. */
  serviceSlug?: string;
  /** Other services performed on the same job, so the project also shows on those service pages. */
  alsoServices?: string[];
  /** Slug of the ServiceArea this project was completed in/near, when known. */
  serviceAreaSlug?: string;
  timeline?: string;
  completed?: string;
  description: string;
  /** Only real, attributable reviews. `source: "google"` shows the Google badge. */
  review?: { quote: string; author: string; source?: "google" };
  tags: string[];
  beforeLabel: string;
  afterLabel: string;
  beforeSrc?: string;
  afterSrc?: string;
  /** Surfaces this project in the "Featured" project filter. Independent of `category`. */
  featured?: boolean;
};

export type ServiceArea = {
  slug: string;
  name: string;
  state?: string;
  /**
   * "draft" pages render for preview but are noindexed and left out of the
   * sitemap, footer and area grid until they have real local content
   * (a project, a local review, or specifics from the client).
   */
  status: "ready" | "draft";
  shortDescription: string;
  description: string;
  seo?: {
    title?: string;
    description?: string;
  };
  /** Slugs of services most relevant to this area. */
  relatedServices?: string[];
  localCopy?: {
    headline?: string;
    intro?: string;
    notes?: string[];
  };
  /** Neighborhoods / communities actually worked in — only what the client confirms. */
  neighborhoods?: string[];
  /** Questions specific to this area (permits, HOAs, historic districts, etc.). */
  faqs?: FAQ[];
  /** Slugs of neighboring service areas to cross-link. */
  nearby?: string[];
};

export type Testimonial = {
  author: string;
  date: string;
  quote: string;
  rating: number;
  /** When known, lets the review appear on that city's page. */
  serviceAreaSlug?: string;
  serviceSlug?: string;
};
