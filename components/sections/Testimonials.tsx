import { Star } from "lucide-react";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import ReviewQuote from "../../components/ui/ReviewQuote";
import { GoogleIcon } from "../ui/GoogleIcon";
import { featuredTestimonials } from "../../lib/data";
import { siteConfig } from "../../lib/site-config";
import type { Testimonial } from "../../lib/types";

const outlineButton =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 text-concrete border border-concrete/25 hover:border-concrete";

export default function Testimonials({
  items = featuredTestimonials,
  heading,
}: {
  items?: Testimonial[];
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <Container className="relative">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <Eyebrow>Client Reviews</Eyebrow>
              <h2 className="mt-5 max-w-xl font-display text-4xl text-concrete sm:text-5xl md:text-6xl">
                {heading ?? (
                  <>
                    What Central Texas
                    <br />
                    says about the work
                  </>
                )}
              </h2>
            </div>

            {/* Google rating summary */}
            <div className="flex w-full items-center justify-between gap-4 rounded-md border border-charcoal-2 bg-charcoal px-3 py-5 md:w-auto md:px-6">
              <GoogleIcon className="h-8 w-8 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-concrete">{siteConfig.google.rating}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />
                    ))}
                  </div>
                </div>
                <p className="mt-0.5 text-[10px] tracking-[0.1em] text-steel uppercase">
                  {siteConfig.google.reviewCount} Google Reviews
                </p>
              </div>
              <a href={siteConfig.google.gmbUrl} target="_blank" rel="noopener noreferrer" className={`${outlineButton} px-3`}>
                <GoogleIcon className="hidden h-4 w-4 md:block" />
                More Reviews
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
              <figure key={t.author} className="h-full rounded-md border border-charcoal-2 bg-charcoal p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-oxblood/25 text-sm font-semibold text-concrete">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <figcaption>
                      <p className="text-sm font-medium text-concrete">{t.author}</p>
                      <p className="text-[10px] tracking-[0.06em] text-steel uppercase">Google Review · {t.date}</p>
                    </figcaption>
                  </div>
                  <a href={siteConfig.google.gmbUrl} target="_blank" rel="noopener noreferrer" aria-label="View on Google">
                    <GoogleIcon className="h-4 w-4 shrink-0 opacity-70" />
                  </a>
                </div>

                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />
                  ))}
                </div>
                <ReviewQuote quote={t.quote} />
              </figure>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-sm text-steel">
            Had a good experience with {siteConfig.name}? A review helps other Central Texas homeowners find us.
          </p>
          <a href={siteConfig.google.reviewUrl} target="_blank" rel="noopener noreferrer" className={`${outlineButton} px-7`}>
            <GoogleIcon className="h-4 w-4" />
            Write a Review
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
