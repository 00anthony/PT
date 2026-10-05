"use client";

import { useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import type { FAQ as FAQItem } from "../../lib/types";

/**
 * Accordion of questions. Answers stay in the DOM when collapsed (hidden with
 * a CSS grid-rows transition), so they're readable by search engines and match
 * the FAQPage structured data on the page. The page passes `faqs` in, so only
 * that page's questions are sent to the browser.
 */
export default function FAQ({
  faqs,
  heading = "Frequently asked questions",
  eyebrow = "Questions",
}: {
  faqs: FAQItem[];
  heading?: string;
  eyebrow?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <Container className="relative max-w-4xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl text-concrete sm:text-5xl">{heading}</h2>
        </Reveal>

        <div className="mt-12 divide-y divide-charcoal-2 border-y border-charcoal-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-concrete sm:text-xl">{faq.question}</span>
                  <Plus
                    className={clsx(
                      "h-5 w-5 shrink-0 text-oxblood-light transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 leading-relaxed text-concrete/70">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
