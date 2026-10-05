import type { Service, ServiceContent } from "./types";

/**
 * Resolves the content set a service renders. PT serves homeowners only, so
 * there's a single `default` set; the indirection is kept so audience-specific
 * variants can be added back without touching the pages that call this.
 */
export function getServiceContent(service: Service): ServiceContent {
  return service.content.default;
}
