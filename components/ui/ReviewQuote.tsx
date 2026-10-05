"use client";

import { useState } from "react";

// Reviews longer than this get clamped with a Read more toggle
const MAX_CHARS = 220;

export default function ReviewQuote({ quote }: { quote: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.length > MAX_CHARS;

  return (
    <div className="mt-3">
      <p className={`text-sm leading-relaxed text-concrete/75 ${isLong && !expanded ? "line-clamp-5" : ""}`}>
        &ldquo;{quote}&rdquo;
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-2 text-sm font-semibold text-oxblood-light transition hover:text-concrete"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
