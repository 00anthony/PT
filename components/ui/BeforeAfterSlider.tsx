"use client";

import { useRef, useState, useCallback, KeyboardEvent, PointerEvent } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

/**
 * Drag (or arrow-key) to compare before/after photos. `touch-pan-y` keeps
 * vertical page scrolling working when a phone user swipes over the photo;
 * only horizontal drags move the divider.
 */
export default function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  beforeSrc,
  afterSrc,
  sizes = "(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  beforeLabel: string;
  afterLabel: string;
  beforeSrc?: string;
  afterSrc?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 5));
  }

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="group relative aspect-[4/3] w-full cursor-col-resize touch-pan-y overflow-hidden bg-charcoal-2 select-none"
    >
      {/* AFTER (base layer) */}
      <div className="absolute inset-0">
        {afterSrc && (
          <Image src={afterSrc} alt={afterLabel} fill sizes={sizes} priority={priority} draggable={false} className="object-cover" />
        )}
        <span className="absolute right-3 bottom-3 rounded bg-black/65 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
          After
        </span>
      </div>

      {/* BEFORE (clipped top layer) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {beforeSrc && (
          <Image src={beforeSrc} alt={beforeLabel} fill sizes={sizes} priority={priority} draggable={false} className="object-cover" />
        )}
        <span className="absolute bottom-3 left-3 rounded bg-black/65 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
          Before
        </span>
      </div>

      {/* Handle */}
      <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-oxblood/50">
          <MoveHorizontal className="h-4 w-4 text-concrete" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
