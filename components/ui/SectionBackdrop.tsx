import clsx from "clsx";

/** Soft warm glow + hairline at the top of a section. */
export default function SectionBackdrop({
  glow = true,
  className,
}: {
  glow?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 -z-10", className)}>
      {glow && (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 85% 0%, rgba(204,183,138,0.14), transparent 60%)",
          }}
        />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-charcoal-2 to-transparent" />
    </div>
  );
}
