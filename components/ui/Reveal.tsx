"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";

/**
 * Fades content up as it scrolls into view. The animation is plain CSS
 * (`.reveal` in globals.css) — this component only adds `is-visible`, so
 * there's no animation library in the bundle. Don't wrap above-the-fold
 * content in it; that should paint immediately.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  /** Seconds */
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("reveal", className)}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
