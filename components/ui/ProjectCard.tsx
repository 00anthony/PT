import Link from "next/link";
import { MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { GoogleIcon } from "./GoogleIcon";
import type { Project } from "../../lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <>
      <BeforeAfterSlider
        beforeLabel={project.beforeLabel}
        afterLabel={project.afterLabel}
        beforeSrc={project.beforeSrc}
        afterSrc={project.afterSrc}
      />

      <div className="p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium tracking-[0.08em] text-steel uppercase">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {project.location}
          </span>
          {project.completed && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {project.completed}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-2xl text-concrete">
          <Link href={`/projects/${project.slug}`} className="hover:text-oxblood-light">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-oxblood-light">
          {project.service}
          {project.timeline && ` · ${project.timeline}`}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-concrete/70">{project.description}</p>

        {project.review && (
          <figure className="mt-5 border-l-2 border-oxblood pl-4">
            <div className="mb-1 flex items-center gap-0.5">
              {project.review.source === "google" && <GoogleIcon className="mr-2 h-3 w-3 shrink-0" />}
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" />
              ))}
            </div>
            <blockquote className="text-sm italic text-concrete/75">&ldquo;{project.review.quote}&rdquo;</blockquote>
            <figcaption className="mt-1 text-[11px] font-medium tracking-[0.1em] text-steel uppercase">
              — {project.review.author}
            </figcaption>
          </figure>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-oxblood/15 px-3 py-1 text-[11px] font-medium text-oxblood-light">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-oxblood-light uppercase transition-colors hover:text-concrete"
        >
          View Full Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </>
  );
}
