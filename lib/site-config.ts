export const siteConfig = {
  name: "PT Roofing & Renovations",
  legalName: "PT Roofing And Renovations LLC",
  shortName: "PT Roofing",
  tagline: "Your Home, Our Craft.",
  description:
    "PT Roofing & Renovations is a family-owned roofing and home renovation contractor in South Austin — roof repair and replacement, free roof inspections, James Hardie® siding, painting, patios, windows, foundation repair, and interior remodeling from Georgetown to San Antonio.",
  url: "https://www.ptroofingandrenovations.com",
  phone: "(737) 770-2607",
  phoneHref: "tel:+17377702607",
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
    "San Antonio",
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
    // Meta (Facebook/Instagram) Pixel — PageView on every route, Lead on form submit,
    // Contact on phone/email clicks.
    metaPixelId: "2200568067511210",
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
