import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site-config";
import { services, projects, publishedServiceAreas } from "../lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  const entries: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: service.slug === "roofing" ? 0.9 : 0.8,
    })),
    { url: url("/projects"), lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...projects.map((project) => ({
      url: url(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: url("/about"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contact"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/privacy-policy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  if (siteConfig.features.serviceAreaPages) {
    entries.push(
      { url: url("/service-areas"), lastModified, changeFrequency: "monthly", priority: 0.7 },
      // Draft areas are noindexed and deliberately left out.
      ...publishedServiceAreas.map((area) => ({
        url: url(`/service-areas/${area.slug}`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );

    if (siteConfig.features.locationServicePages) {
      for (const area of publishedServiceAreas) {
        for (const serviceSlug of area.relatedServices ?? []) {
          if (!services.some((s) => s.slug === serviceSlug)) continue;
          entries.push({
            url: url(`/service-areas/${area.slug}/${serviceSlug}`),
            lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  }

  return entries;
}
