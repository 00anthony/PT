export const siteConfig = {
  name: "PT Roofing & Renovations",
  legalName: "PT Roofing And Renovations LLC",
  shortName: "PT Roofing",
  tagline: "Your Home, Our Craft.",
  description:
    "PT Roofing & Renovations is a family-owned roofing and home renovation contractor in South Austin — roof repair and replacement, free roof inspections, James Hardie® siding, painting, patios, windows, and interior remodeling across Greater Austin.",
  url: "https://www.ptroofingandrenovations.com",
  phone: "(512) 999-4366",
  phoneHref: "tel:+15129994366",
  email: "ptroofingandrenovations.info@gmail.com",
  // Must match the Google Business Profile exactly (name, address, phone).
  address: {
    street: "2500 W William Cannon Dr, Suite 607 B",
    city: "Austin",
    region: "TX",
    postalCode: "78745",
    mapsUrl: "https://www.google.com/maps/place/2500+W+William+Cannon+Dr,+Suite+607,+Austin,+TX+78745",
  },
  serviceArea: "Greater Austin",
  // Keep in sync with the service area set on the Google Business Profile.
  serviceAreaCities: [
    "Austin",
    "Round Rock",
    "Pflugerville",
    "Georgetown",
    "Cedar Park",
    "Leander",
    "Kyle",
    "Buda",
    "San Marcos",
  ],
  responsePromise: "We get back to every request within 24 hours.",
  // TODO(client): confirm business hours — not published anywhere yet, so
  // they're left out of the structured data until confirmed.
  hours: null as string | null,
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
  },
  google: {
    gmbUrl: "https://g.page/r/CQQlxnIwxulYEAI",
    reviewUrl: "https://g.page/r/CQQlxnIwxulYEAI/review",
    rating: "5.0",
    reviewCount: 5,
  },
  analytics: {
    ga4Id: "G-HFWG093JH2",
    adsId: "AW-18490098103",
    // One "Website lead" conversion — fired for form submits, phone clicks and email clicks.
    leadConversion: "AW-18490098103/pFj8COXrmI4dELeD4vBE",
  },
  mail: {
    // Overridable with RESEND_FROM_EMAIL / CLIENT_NOTIFICATION_EMAIL env vars.
    from: "PT Roofing <quotes@mail.ptroofingandrenovations.com>",
  },
  features: {
    serviceAreaPages: true,
    // Combined /service-areas/[slug]/[service] pages — only generates a page where
    // ServiceArea.relatedServices actually includes that service. Off until each
    // city has enough real project content to back its own service pages.
    locationServicePages: false,
  },
} as const;
