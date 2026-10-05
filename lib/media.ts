export const media = {
  logo: {
    icon: "/logo/logo-no-words.svg",
  },
  hero: {
    // Real PT job — new metal roof, siding, and paint.
    image: "/images/portfolio/siding-roof-after.webp",
  },
  about: {
    image: "/images/about/advert.webp",
  },
  certifications: [
    // TODO(client): confirm each certification is current before launch — manufacturer
    // programs (GAF Master Elite especially) are trademarked and verifiable.
    { name: "GAF Master Elite Contractor", logo: "/certifications/gaf-master-elite.webp" },
    { name: "CertainTeed SELECT ShingleMaster", logo: "/certifications/certainteed-select-shingle-master.webp" },
    { name: "Owens Corning Preferred Contractor", logo: "/certifications/owens-corning.png" },
    { name: "OSHA Safety Certified", logo: "/certifications/osha-logo.webp" },
  ],
} as const;
