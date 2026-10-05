export type { Service, ProjectCategory, Project, ServiceArea, Testimonial, FAQ } from "../types";

export { services } from "./services";
export {
  projects,
  getProjectsByService,
  getProjectsByServiceArea,
  getProjectBySlug,
  getRelatedProjects,
} from "./projects";
export { serviceAreas, publishedServiceAreas } from "./service-areas";
export { processSteps, whyChooseUs } from "./process";
export {
  testimonials,
  featuredTestimonials,
  getTestimonialsByService,
  getTestimonialsByServiceArea,
} from "./testimonials";
export { faqs } from "./faqs";
