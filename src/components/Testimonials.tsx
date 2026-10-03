import React from 'react';
import { Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import StaggeredAnimation from './StaggeredAnimation';
import GoogleIcon from './GoogleIcon';
import ReviewQuote from './ReviewQuote';

interface Testimonial {
  author: string;
  date: string;
  quote: string;
  rating: number;
}

const google = {
  profileUrl: 'https://g.page/r/CQQlxnIwxulYEAI',
  reviewUrl: 'https://g.page/r/CQQlxnIwxulYEAI/review',
  rating: '5.0',
  reviewCount: 5,
};

// Real reviews from the Google Business Profile, quoted as written
const testimonials: Testimonial[] = [
  {
    author: 'Janie Cavazos',
    date: 'Aug 2026',
    quote:
      'We are I so incredibly happy with the work PT Roofing & Renovations did on our home! Our new Metal roof, Hardy Board siding and the beautiful paint and rock work made our house look brand new! Everything turned out even better than we imagined. The team was professional, kind, dependable, and truly went above and beyond to make sure we were happy every step of the way. The attention to detail in their work is very evident. We couldn’t be more grateful. Now, when we drive up to our home we feel like we have a new house and am so proud of how it looks. We highly recommend PT Roofing & Renovations! It’s a wonderful company that truly cares about their customers!',
    rating: 5,
  },
  {
    author: 'Dana Hooper',
    date: 'Sep 2026',
    quote:
      'We used PT roofing to repair damaged siding and trim on the exterior of our home. As well as new paint. They did a great job. The communication was consistent and clear. The crew cleaned up their materials each day which was very important to me since I have two small kids. The job was completed very fast without compromising the quality of work. We’re very pleased with the outcome and we’d love to use and refer Pt roofing for more home projects in the future.',
    rating: 5,
  },
  {
    author: 'Jack Lewis',
    date: 'Sep 2026',
    quote:
      'Arrived on time. Great service. Extra carefull about cleaning up loose nails with several sweeps of magnetic tool. Roof looks great and will last a long time. Pricing was good too. Definitely would recommend this company.',
    rating: 5,
  },
];

const outlineButton =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 text-gray-900 border border-gray-300 hover:border-gray-900';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.28em] uppercase text-[#ccb78a]">
                <span className="h-[3px] w-[3px] bg-current" aria-hidden />
                Client Reviews
              </div>
              <h2 className="mt-5 max-w-xl text-4xl font-bold uppercase tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                What Central Texas
                <br />
                says about the work
              </h2>
            </div>

            {/* Google rating summary */}
            <div className="w-full md:w-auto flex items-center justify-between gap-4 border border-gray-200 bg-gray-50 px-3 md:px-6 py-5">
              <GoogleIcon className="h-8 w-8 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{google.rating}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />
                    ))}
                  </div>
                </div>
                <p className="mt-0.5 text-[10px] tracking-[0.1em] text-gray-500 uppercase">
                  {google.reviewCount} Google Reviews
                </p>
              </div>
              <a
                href={google.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${outlineButton} px-3`}
              >
                <GoogleIcon className="h-4 w-4 hidden md:block" />
                More Reviews
              </a>
            </div>
          </div>
        </AnimatedSection>

        <StaggeredAnimation
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={80}
          animation="fade-up"
        >
          {testimonials.map((t) => (
            <div key={t.author} className="border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ccb78a]/20 text-sm font-semibold text-gray-900">
                    {t.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.author}</p>
                    <p className="text-[10px] tracking-[0.06em] text-gray-500 uppercase">
                      Google Review · {t.date}
                    </p>
                  </div>
                </div>
                <a href={google.profileUrl} target="_blank" rel="noopener noreferrer" aria-label="View on Google">
                  <GoogleIcon className="h-4 w-4 shrink-0 opacity-70" />
                </a>
              </div>

              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />
                ))}
              </div>
              <ReviewQuote quote={t.quote} />
            </div>
          ))}
        </StaggeredAnimation>

        <AnimatedSection className="mt-14 flex flex-col items-center gap-4 text-center" animation="fade-up" delay={150}>
          <p className="max-w-md text-sm text-gray-500">
            Had a good experience with PT Roofing &amp; Renovations? A review helps other Central Texas
            homeowners find us.
          </p>
          <a href={google.reviewUrl} target="_blank" rel="noopener noreferrer" className={`${outlineButton} px-7`}>
            <GoogleIcon className="h-4 w-4" />
            Write a Review
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
