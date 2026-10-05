import Image from "next/image";
import Link from "next/link";
import { Square, ArrowRight } from "lucide-react";
import SeeProjectsButton from "./SeeProjectsButton";
import { serviceIcons } from "../../lib/service-icons";
import type { FilterValue } from "../../lib/project-filters";

// Server component — only the card's text is sent, not the whole services data set.
export default function ServiceCard({
  name,
  short,
  image,
  href,
  slug,
  projectsCategory,
}: {
  name: string;
  short: string;
  image?: string;
  href: string;
  /** Service slug — resolves the icon from the shared service-icons map. */
  slug: string;
  /** When set, shows "See Recent Projects" (homepage only — needs ProjectsFilterProvider). */
  projectsCategory?: FilterValue;
}) {
  const Icon = serviceIcons[slug] ?? Square;

  return (
      <article className="group relative isolate flex h-full min-h-[400px] flex-col justify-end overflow-hidden rounded-xl bg-concrete shadow-lg md:min-h-[420px]">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
            className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />

        <div className="p-7 md:p-8">
          <Icon className="h-8 w-8 text-oxblood" strokeWidth={1.5} />

          <h3 className="mt-5 font-display text-2xl text-white">
            {/* Stretched link: the whole card is clickable without nesting the button inside the link */}
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {name}
            </Link>
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-white/80">{short}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-oxblood uppercase">
              Learn More
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            {projectsCategory && <SeeProjectsButton category={projectsCategory} />}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-oxblood transition-transform duration-300 group-hover:scale-x-100" />
      </article>
  );
}
