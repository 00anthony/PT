import type { Service } from "../types";

// Ordered by how often customers ask for each service (per the client).
export const services: Service[] = [
  {
    slug: "roofing",
    featured: true,
    content: {
      default: {
        name: "Roofing",
        short: "Roof repair, full replacement, and free roof inspections — metal and shingle.",
        description:
          "Roof repair and replacement for Greater Austin homes, in architectural shingle or standing-seam metal. Not sure what your roof needs? Every job starts with a free inspection.",
        longDescription:
          "A Central Texas roof takes a beating: summer heat that bakes shingles brittle, UV that breaks down sealants, and spring storms that can bring hail and wind-driven rain in the same afternoon. We start every roofing job with a free inspection so you know exactly what you're dealing with — whether that's a handful of lifted shingles and a flashing repair, or a roof that's reached the end of its life. When replacement is the right call, we'll walk you through shingle and metal options side by side so the choice fits your home and your budget.",
        bullets: [
          "Free roof inspections with photos of what we find",
          "Repairs for leaks, flashing, and storm damage",
          "Full tear-off and replacement",
          "Architectural shingle and metal roofing systems",
          "Job-site cleanup, including magnetic nail sweeps",
        ],
        image: "/images/services/roofing.avif",
        offerings: [
          {
            id: "roof-inspections",
            name: "Free Roof Inspections",
            description:
              "We get on the roof, check shingles, flashing, vents, and decking, and show you photos of anything that needs attention — no cost and no obligation. It's the right first step after a storm, before buying or selling a home, or when a roof is getting up in years.",
            points: ["No cost, no obligation", "Photos of any problem areas", "Straight answer on repair vs. replace"],
          },
          {
            id: "roof-repair",
            name: "Roof Repair",
            description:
              "Not every problem needs a new roof. We fix leaks, replace damaged or missing shingles, reseal and replace flashing around chimneys, vents, and skylights, and repair storm damage before it turns into water damage inside.",
            points: ["Leak tracing and repair", "Shingle and flashing replacement", "Storm and wind damage repair"],
          },
          {
            id: "roof-replacement",
            name: "Roof Replacement",
            description:
              "When a roof is past repairing, we tear off down to the decking, replace any soft or damaged boards, and install a complete new system — underlayment, flashing, ventilation, and the finish roofing you choose.",
            points: ["Full tear-off to the decking", "Damaged decking replaced", "Ventilation checked and corrected"],
          },
          {
            id: "metal-roofing",
            name: "Metal Roofing",
            description:
              "Metal roofs reflect a large share of the sun's heat, shed water fast, and typically outlast shingle roofs by decades — a strong fit for Texas summers. They cost more up front, which is why we price metal and shingle side by side during your estimate.",
            points: ["Reflects summer heat", "Long service life", "Priced side by side with shingle"],
          },
          {
            id: "shingle-roofing",
            name: "Shingle Roofing",
            description:
              "Architectural asphalt shingles are the most common roof in Greater Austin for good reason: a wide range of colors and profiles, solid wind ratings, and a lower up-front cost than metal.",
            points: ["Architectural shingle profiles", "Wide range of colors", "Lower up-front cost"],
          },
        ],
        faqs: [
          {
            question: "Is the roof inspection really free?",
            answer:
              "Yes. We'll inspect your roof, show you photos of anything we find, and give you our honest recommendation — at no cost and with no obligation to hire us.",
          },
          {
            question: "Should I repair my roof or replace it?",
            answer:
              "It depends on the roof's age, how widespread the damage is, and whether the decking underneath is still sound. Isolated problems on a younger roof are usually worth repairing; widespread wear or repeated leaks usually mean replacement is the better long-term value. The free inspection is how we tell the difference.",
          },
          {
            question: "Metal or shingle — which is better in Central Texas?",
            answer:
              "Both work well here. Metal reflects more heat and lasts longer; architectural shingles cost less up front and come in more styles. We'll price both for your home so you can compare.",
          },
          {
            question: "How long does a roof replacement take?",
            answer:
              "Most single-family roof replacements are finished in a few days, depending on the size and pitch of the roof, the material, and the weather. We'll give you a timeline with your estimate.",
          },
        ],
        seo: {
          title: "Austin Roofing Repair & Replacement",
          description:
            "Roof repair and replacement in Austin and surrounding cities. Metal and shingle roofing, plus free roof inspections. Call PT Roofing & Renovations at (512) 999-4366.",
        },
      },
    },
  },
  {
    slug: "siding",
    featured: true,
    content: {
      default: {
        name: "Siding",
        short: "James Hardie® fiber cement siding, trim, and siding repair.",
        description:
          "New siding and siding repair, specializing in James Hardie® fiber cement — the look of painted wood without the rot, pests, or constant upkeep.",
        longDescription:
          "Siding is your home's first line of defense against sun, rain, and pests, and it's most of what people see from the street. We install James Hardie® fiber cement siding, which holds up to Texas heat and humidity, resists termites and rot, and won't burn. We also repair damaged siding and trim, replacing rotted boards and sealing the gaps where water gets in, then finish with paint so the repair disappears into the wall.",
        bullets: [
          "James Hardie® fiber cement siding",
          "Trim, fascia, and soffit replacement",
          "Siding repair and rotted-board replacement",
          "Moisture barrier installed under new siding",
          "Painting to finish the job",
        ],
        image: "/images/services/siding.jpg",
        offerings: [
          {
            id: "james-hardie-siding",
            name: "James Hardie® Siding",
            description:
              "Fiber cement lap, panel, and shingle siding in a range of profiles. It's non-combustible, doesn't rot, isn't food for termites, and holds paint far longer than wood.",
          },
          {
            id: "siding-repair",
            name: "Siding & Trim Repair",
            description:
              "We replace damaged, warped, or rotted siding boards and trim, track down where the water came from, and paint the repair to match.",
          },
        ],
        faqs: [
          {
            question: "Why James Hardie® fiber cement instead of vinyl or wood?",
            answer:
              "Fiber cement doesn't rot, warp, or melt, it's non-combustible, and termites can't eat it. It looks like painted wood and holds paint much longer — a good fit for Central Texas sun and humidity.",
          },
          {
            question: "Can you repair just part of my siding?",
            answer:
              "Yes. We regularly replace damaged sections and trim, then paint so the repair blends in with the rest of the house.",
          },
        ],
        seo: {
          title: "James Hardie Siding in Austin, TX",
          description:
            "James Hardie fiber cement siding installation, siding repair, and trim replacement for Greater Austin homes. Free estimates from PT Roofing & Renovations.",
        },
      },
    },
  },
  {
    slug: "painting",
    featured: true,
    content: {
      default: {
        name: "Painting",
        short: "Interior and exterior painting with the prep work that makes it last.",
        description:
          "Interior and exterior painting with careful prep — the scraping, patching, caulking, and priming that keep a paint job from peeling in a few summers.",
        longDescription:
          "Most paint failures in Central Texas come down to prep. Sun and heat find every gap and every spot that wasn't primed, and that's where peeling starts. We take the time to scrape, patch, caulk, and prime before any finish coat goes on, then use quality paints suited to the surface — so the job looks good on day one and keeps looking good.",
        bullets: [
          "Exterior painting — siding, trim, and fascia",
          "Interior walls, ceilings, and trim",
          "Scraping, patching, caulking, and priming",
          "Pairs with siding and trim repair",
        ],
        image: "/images/services/painting.jpg",
        seo: {
          title: "House Painting in Austin, TX",
          description:
            "Interior and exterior house painting with thorough prep, from PT Roofing & Renovations. Serving Greater Austin. Free estimates.",
        },
      },
    },
  },
  {
    slug: "patios",
    featured: true,
    content: {
      default: {
        name: "Patios & Decks",
        short: "Decks, patios, and pergolas built for Texas backyards.",
        description:
          "Custom decks, patios, and pergolas that turn a backyard into somewhere you actually want to spend an evening.",
        longDescription:
          "We build outdoor spaces sized and finished for how you'll use them: cedar decks stained and sealed against the sun, stamped and colored concrete patios, and pergolas that add shade where you need it most. Every build starts with a conversation about drainage and sun exposure, because those are what decide how an outdoor space holds up here.",
        bullets: [
          "Cedar decks, stained and sealed",
          "Stamped and colored concrete patios",
          "Pergolas and shade structures",
          "Railing installation",
        ],
        image: "/images/services/patio.avif",
        seo: {
          title: "Decks & Patios in Austin, TX",
          description:
            "Custom decks, stamped concrete patios, and pergolas across Greater Austin from PT Roofing & Renovations. Free estimates.",
        },
      },
    },
  },
  {
    slug: "windows",
    content: {
      default: {
        name: "Windows",
        short: "Energy-efficient replacement windows, custom-fitted.",
        description:
          "Energy-efficient double- and triple-pane replacement windows that cut heat gain and outside noise, custom-fitted to your home's openings.",
        longDescription:
          "Old single-pane and failing double-pane windows are one of the biggest sources of summer heat gain in a Texas home. We replace them with energy-efficient double- and triple-pane units, measured and fitted to each opening, then seal and trim them out so they look like they were always there.",
        bullets: [
          "Double- and triple-pane options",
          "Custom-measured for each opening",
          "Sealed and trimmed out cleanly",
          "Reduces heat gain and outside noise",
        ],
        image: "/images/services/windows.jpg",
        seo: {
          title: "Window Replacement in Austin, TX",
          description:
            "Energy-efficient replacement windows for Greater Austin homes from PT Roofing & Renovations. Free estimates.",
        },
      },
    },
  },
  {
    slug: "interior",
    content: {
      default: {
        name: "Interior Remodeling",
        short: "Kitchens, bathrooms, flooring, and trim.",
        description:
          "Kitchen and bathroom remodels, new flooring, and trim work — handled start to finish by one crew.",
        longDescription:
          "From a full kitchen or bathroom remodel down to new flooring and trim in a single room, we handle interior projects with the same attention to detail as our exterior work: clean job sites, clear communication, and a finished space you'll be proud of.",
        bullets: [
          "Kitchen and bathroom remodeling",
          "Flooring installation",
          "Baseboards and trim",
          "Clean, protected job sites",
        ],
        image: "/images/services/interior.avif",
        seo: {
          title: "Interior Remodeling in Austin, TX",
          description:
            "Kitchen and bathroom remodels, flooring, and trim work for Greater Austin homes from PT Roofing & Renovations. Free estimates.",
        },
      },
    },
  },
];
