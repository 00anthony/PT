import { siteConfig } from "./site-config";
import type { FAQ, ServiceContent } from "./types";

export const businessId = `${siteConfig.url}/#business`;

/** Site-wide business entity — rendered once in the root layout. */
export function businessJsonLd() {
  const sameAs = [siteConfig.google.gmbUrl, siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["RoofingContractor", "HomeAndConstructionBusiness"],
        "@id": businessId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo/logo-no-words.svg`,
        image: `${siteConfig.url}/opengraph-image`,
        telephone: siteConfig.phoneHref.replace("tel:", ""),
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: "US",
        },
        areaServed: siteConfig.serviceAreaCities.map((city) => ({ "@type": "City", name: `${city}, TX` })),
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd(content: ServiceContent, path: string, areaServed?: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.name,
    serviceType: content.name,
    description: content.seo?.description ?? content.short,
    provider: { "@id": businessId },
    areaServed: (areaServed ?? siteConfig.serviceAreaCities).map((city) => ({ "@type": "City", name: `${city}, TX` })),
    url: `${siteConfig.url}${path}`,
  };
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Renders one or more JSON-LD objects; `<` is escaped so content can't close the script tag. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
