import Link from "next/link";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        "flex flex-wrap items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] uppercase",
        onDark ? "text-white/60" : "text-steel"
      )}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className={onDark ? "hover:text-white" : "hover:text-concrete"}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? (onDark ? "text-white/90" : "text-concrete/80") : undefined}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />}
          </span>
        );
      })}
    </nav>
  );
}
