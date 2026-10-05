import type { FAQ } from "../types";

// General questions for the homepage. Service- and city-specific questions
// live on the service and service-area data so each page's FAQ is its own.
export const faqs: FAQ[] = [
  {
    question: "Do you really offer free roof inspections?",
    answer:
      "Yes. We'll inspect your roof and give you an honest recommendation — repair, replace, or leave it alone — at no cost and with no obligation.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in South Austin and serve the Greater Austin area, from Georgetown in the north down to San Marcos — including Round Rock, Pflugerville, Cedar Park, Leander, Kyle, and Buda.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Roof repair and replacement (metal and shingle), James Hardie® siding, interior and exterior painting, decks and patios, replacement windows, and interior remodeling including flooring and trim.",
  },
  {
    question: "How quickly will you get back to me?",
    answer:
      "We get back to every request within 24 hours. For the fastest response, call or text us at (512) 999-4366.",
  },
  {
    question: "Can you handle roofing and siding on the same project?",
    answer:
      "Yes. When a home needs a new roof, siding, and paint, we can do all of it as one project with one crew, so the work is coordinated and finished together.",
  },
  {
    question: "Do you clean up after the job?",
    answer:
      "Yes. We clean up materials every day, and on roofing jobs we sweep the property with magnetic tools to pick up loose nails.",
  },
];
