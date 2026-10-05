import type { ServiceArea } from "../types";

/**
 * Every area page needs content that is genuinely about that city — a real
 * project, a local review, or specifics from the client. Pages without that
 * stay `status: "draft"` (noindex, out of the sitemap) so Google never sees
 * a set of near-identical, city-name-swapped pages.
 *
 * TODO(client): for each draft area, collect the neighborhoods worked in,
 * any jobs completed there (photos + details), and any reviews from
 * customers in that city.
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    status: "ready",
    shortDescription: "Our home base — roofing, siding, and renovation work across Austin, from our office in South Austin.",
    description:
      "Austin is where we're based, so it's where we do the most work and can get to you fastest. The city's housing runs the full range — older central neighborhoods with decades-old roofs and wood trim, newer subdivisions on their first roof replacement, and Hill Country homes out toward West Lake Hills with steep pitches and big decks. Our recent Austin-area work includes a full metal roof, siding, and paint remodel in Austin and a cedar deck rebuild in West Lake Hills.",
    seo: {
      title: "Austin Roofing Contractor — Repair, Replacement & Free Inspections",
      description:
        "Locally owned roofing and renovation contractor based in South Austin. Roof repair and replacement, free inspections, James Hardie siding, painting, and more.",
    },
    relatedServices: ["roofing", "siding", "painting", "patios", "windows", "interior"],
    localCopy: {
      headline: "Roofing & renovations in Austin, Texas",
      intro:
        "We're an Austin company with our office on W William Cannon Dr in South Austin — so when you call, you're talking to a local crew that can usually get eyes on your roof quickly.",
      notes: [
        "Office in South Austin, on W William Cannon Dr",
        "Recent work from central Austin out to West Lake Hills",
        "Free roof inspections anywhere in the city",
        "Every service we offer is available in Austin",
      ],
    },
    faqs: [
      {
        question: "Where is PT Roofing & Renovations located?",
        answer:
          "Our office is at 2500 W William Cannon Dr, Suite 607 B, in South Austin (78745). We work throughout Austin and the surrounding cities.",
      },
      {
        question: "Do you work outside Austin city limits?",
        answer:
          "Yes — we regularly work in Round Rock, Pflugerville, and other cities around Austin. See our service areas page for the full list.",
      },
    ],
    nearby: ["round-rock", "pflugerville", "kyle-buda", "cedar-park"],
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    state: "TX",
    status: "ready",
    shortDescription: "Siding replacement, roofing, and exterior work for Round Rock homes.",
    description:
      "Much of Round Rock was built out in the 1990s and 2000s, which means a lot of homes here are now due for their next roof, and original siding and trim from that era is often showing its age. That's exactly the kind of work we did on a recent Round Rock home: a full siding replacement with new trim and fascia, with a moisture barrier installed behind the new siding so water stays out of the walls.",
    seo: {
      title: "Round Rock Roofing & Siding Contractor",
      description:
        "Roof repair, roof replacement, and siding replacement for Round Rock homes. Free roof inspections. PT Roofing & Renovations — (512) 999-4366.",
    },
    relatedServices: ["roofing", "siding", "painting", "windows"],
    localCopy: {
      headline: "Roofing & siding contractor serving Round Rock",
      intro:
        "From aging roofs on '90s-era homes to full siding replacements, we handle the exterior work Round Rock homes need as they hit the 20- and 30-year mark.",
      notes: [
        "Completed a full siding, trim, and fascia replacement in Round Rock",
        "Moisture barrier installed behind every new siding job",
        "Roof and siding work coordinated as one project when both are due",
      ],
    },
    nearby: ["pflugerville", "georgetown", "cedar-park", "austin"],
  },
  {
    slug: "pflugerville",
    name: "Pflugerville",
    state: "TX",
    status: "ready",
    shortDescription: "Roofing, patios, and outdoor living for Pflugerville homes.",
    description:
      "Pflugerville is mostly newer subdivisions, and many of them have HOAs that sign off on exterior changes like roof color, siding, and patio additions. We can provide the product details and color information your HOA asks for, so approval doesn't hold up your project. Our recent Pflugerville work includes a stamped and colored concrete patio, sealed to protect the finish from sun and weather.",
    seo: {
      title: "Pflugerville Roofing, Patio & Renovation Contractor",
      description:
        "Roofing, stamped concrete patios, decks, and renovations for Pflugerville homes. Free roof inspections from PT Roofing & Renovations.",
    },
    relatedServices: ["roofing", "patios", "siding", "painting"],
    localCopy: {
      headline: "Roofing, patios & renovations in Pflugerville",
      intro:
        "Whether it's a roof that took a beating in the last storm or a backyard that needs a patio, we build to what Pflugerville neighborhoods — and their HOAs — expect.",
      notes: [
        "Built a stamped, colored concrete patio in Pflugerville",
        "Product and color details provided for HOA approval",
        "Roofing and outdoor projects handled by one crew",
      ],
    },
    nearby: ["round-rock", "austin", "georgetown"],
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    state: "TX",
    // Draft until the client confirms local jobs (e.g. Sun City or the historic district).
    status: "draft",
    shortDescription: "Roofing and exterior renovation for Georgetown homes, from the historic district to newer neighborhoods.",
    description:
      "Georgetown is the northern edge of our service area and one of its most varied: homes around the historic downtown square, large active-adult communities like Sun City, and newer neighborhoods spreading out from I-35. Homes in Georgetown's historic overlay districts may need design review before exterior changes like new siding or roofing — worth checking with the city before any work is scheduled.",
    seo: {
      title: "Georgetown, TX Roofing & Siding Contractor",
      description:
        "Roof repair and replacement, siding, and exterior renovations for Georgetown homes. Free roof inspections from PT Roofing & Renovations.",
    },
    relatedServices: ["roofing", "siding", "painting", "windows"],
    localCopy: {
      headline: "Roofing & exterior renovation in Georgetown",
      intro:
        "From the historic district to Sun City and the newer neighborhoods off I-35, Georgetown homes need a roofer who checks the details before the tear-off starts.",
    },
    faqs: [
      {
        question: "My home is in a Georgetown historic district — can I replace my roof or siding?",
        answer:
          "Usually, yes, but homes in Georgetown's historic overlay districts may need design approval from the city before exterior changes. Check with the City of Georgetown's planning department before scheduling work.",
      },
    ],
    nearby: ["round-rock", "cedar-park", "pflugerville"],
  },
  {
    slug: "cedar-park",
    name: "Cedar Park & Leander",
    state: "TX",
    // Draft until the client confirms local jobs and neighborhoods.
    status: "draft",
    shortDescription: "Roof replacement, siding, and renovations for Cedar Park and Leander homes.",
    description:
      "Cedar Park and Leander have grown fast, and a lot of homes here were built in large master-planned neighborhoods over the last couple of decades. Those homes are now reaching the age where the original roof needs serious attention — and on the Hill Country side, steeper pitches and exposure to spring storms make a proper inspection worth doing before small problems become leaks.",
    seo: {
      title: "Cedar Park & Leander Roofing Contractor",
      description:
        "Roof repair, replacement, and free roof inspections for Cedar Park and Leander homes, plus siding and renovations. PT Roofing & Renovations.",
    },
    relatedServices: ["roofing", "siding", "windows", "interior"],
    localCopy: {
      headline: "Roofing contractor for Cedar Park & Leander",
      intro:
        "Many Cedar Park and Leander homes are hitting the age where the original roof needs replacing. A free inspection tells you whether yours is one of them.",
    },
    nearby: ["round-rock", "georgetown", "austin"],
  },
  {
    slug: "kyle-buda",
    name: "Kyle & Buda",
    state: "TX",
    // Draft until the client confirms local jobs and neighborhoods.
    status: "draft",
    shortDescription: "Roofing and home renovation for Kyle and Buda — just down I-35 from our South Austin office.",
    description:
      "Kyle and Buda are the closest cities to our South Austin office, a short drive down I-35. Both have grown quickly, with many neighborhoods built within the last twenty years — so a lot of homes are approaching their first roof replacement, and HOA approval for exterior changes is common.",
    seo: {
      title: "Kyle & Buda Roofing Contractor",
      description:
        "Roof repair and replacement, free roof inspections, siding, and renovations for Kyle and Buda homes from PT Roofing & Renovations in South Austin.",
    },
    relatedServices: ["roofing", "siding", "patios", "painting"],
    localCopy: {
      headline: "Roofing & renovations in Kyle and Buda",
      intro:
        "Our office is in South Austin, just up I-35 from Kyle and Buda — close enough to get out for a free inspection quickly.",
    },
    nearby: ["san-marcos", "austin"],
  },
  {
    slug: "san-marcos",
    name: "San Marcos",
    state: "TX",
    // Draft until the client confirms local jobs and neighborhoods.
    status: "draft",
    shortDescription: "Roofing, siding, and repair work for San Marcos homes and rental properties.",
    description:
      "San Marcos is the southern end of our regular service area. Alongside its newer subdivisions, the city has a large stock of older homes and rental properties near downtown and Texas State University — where roof repairs, siding repair, and fresh exterior paint often matter more than a full remodel.",
    seo: {
      title: "San Marcos Roofing & Siding Contractor",
      description:
        "Roof repair and replacement, siding repair, and painting for San Marcos homes and rental properties. Free roof inspections from PT Roofing & Renovations.",
    },
    relatedServices: ["roofing", "siding", "painting"],
    localCopy: {
      headline: "Roofing & exterior repair in San Marcos",
      intro:
        "From older homes near downtown to newer subdivisions, we handle the roof and siding repairs that keep San Marcos homes and rentals in good shape.",
    },
    nearby: ["kyle-buda", "austin"],
  },
];

export const publishedServiceAreas = serviceAreas.filter((a) => a.status === "ready");
