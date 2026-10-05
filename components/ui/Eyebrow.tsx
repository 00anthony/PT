import clsx from "clsx";

export default function Eyebrow({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.28em] uppercase",
        light ? "text-concrete/70" : "text-oxblood-light",
        className
      )}
    >
      <span className="h-[3px] w-[3px] bg-current" aria-hidden />
      {children}
    </div>
  );
}
