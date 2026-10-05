import type { Testimonial } from "../types";

// Real reviews from the Google Business Profile, quoted as written.
// TODO(client): add serviceAreaSlug when you know which city each customer is in,
// so the review also appears on that city's page.
export const testimonials: Testimonial[] = [
  {
    author: "Janie Cavazos",
    date: "Aug 2026",
    quote:
      "We are I so incredibly happy with the work PT Roofing & Renovations did on our home! Our new Metal roof, Hardy Board siding and the beautiful paint and rock work made our house look brand new! Everything turned out even better than we imagined. The team was professional, kind, dependable, and truly went above and beyond to make sure we were happy every step of the way. The attention to detail in their work is very evident. We couldn’t be more grateful. Now, when we drive up to our home we feel like we have a new house and am so proud of how it looks. We highly recommend PT Roofing & Renovations! It’s a wonderful company that truly cares about their customers!",
    rating: 5,
    serviceSlug: "roofing",
  },
  {
    author: "Dana Hooper",
    date: "Sep 2026",
    quote:
      "We used PT roofing to repair damaged siding and trim on the exterior of our home. As well as new paint. They did a great job. The communication was consistent and clear. The crew cleaned up their materials each day which was very important to me since I have two small kids. The job was completed very fast without compromising the quality of work. We’re very pleased with the outcome and we’d love to use and refer Pt roofing for more home projects in the future.",
    rating: 5,
    serviceSlug: "siding",
  },
  {
    author: "Jack Lewis",
    date: "Sep 2026",
    quote:
      "Arrived on time. Great service. Extra carefull about cleaning up loose nails with several sweeps of magnetic tool. Roof looks great and will last a long time. Pricing was good too. Definitely would recommend this company.",
    rating: 5,
    serviceSlug: "roofing",
  },
  {
    author: "Misty Lewis",
    date: "Sep 2026",
    quote:
      "The whole crew was efficient and friendly and did a great job with the installation and cleanup. Communication and followup from the owner was excellent. Would definitely recommend to others!",
    rating: 5,
  },
  {
    author: "Reyna Peeples",
    date: "Aug 2026",
    quote:
      "I was very pleased with PT Roofing and Renovations. They installed new flooring for an enclosed porch. I thought it would take about a couple of days but they installed the flooring and trim in one day. I was extremely pleased with the work and and price.",
    rating: 5,
    serviceSlug: "interior",
  },
];

/** The three shown on the homepage. */
export const featuredTestimonials = testimonials.slice(0, 3);

export function getTestimonialsByService(serviceSlug: string) {
  return testimonials.filter((t) => t.serviceSlug === serviceSlug);
}

export function getTestimonialsByServiceArea(serviceAreaSlug: string) {
  return testimonials.filter((t) => t.serviceAreaSlug === serviceAreaSlug);
}
