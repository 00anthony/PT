import Link from "next/link";
import { MapPin, Calendar, Star } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Breadcrumbs from "../ui/Breadcrumbs";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";
import { GoogleIcon } from "../ui/GoogleIcon";
import { serviceAreas, services } from "../../lib/data";
import { getServiceContent } from "../../lib/audience";
import type { Project } from "../../lib/types";

export default function ProjectHero({ project }: { project: Project }) {
  const area = serviceAreas.find((a) => a.slug === project.serviceAreaSlug && a.status === "ready");
  const serviceSlugs = [project.serviceSlug, ...(project.alsoServices ?? [])].filter(Boolean);
  const projectServices = services.filter((s) => serviceSlugs.includes(s.slug));

  return (
    <section className="relative overflow-hidden bg-ink pt-36 pb-20 md:pb-28">
      <Container className="relative">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        <Eyebrow className="mt-7 mb-5">{project.category}</Eyebrow>

        <h1 className="max-w-3xl font-display text-4xl text-concrete sm:text-5xl md:text-6xl">
          {project.title} in {project.location.replace(/, TX$/, "")}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium tracking-[0.1em] text-steel uppercase">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {project.location}
          </span>
          {project.completed && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {project.completed}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-semibold text-oxblood-light">
          {project.service}
          {project.timeline && ` · ${project.timeline}`}
        </p>

        <div className="mt-10 overflow-hidden rounded-xl shadow-lg">
          <BeforeAfterSlider
            beforeLabel={project.beforeLabel}
            afterLabel={project.afterLabel}
            beforeSrc={project.beforeSrc}
            afterSrc={project.afterSrc}
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-concrete/80">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-oxblood/15 px-3 py-1 text-xs font-medium text-oxblood-light">
                  {tag}
                </span>
              ))}
            </div>

            {(projectServices.length > 0 || area) && (
              <p className="mt-8 text-sm text-concrete/75">
                {projectServices.length > 0 && (
                  <>
                    Services on this job:{" "}
                    {projectServices.map((s, i) => (
                      <span key={s.slug}>
                        {i > 0 && ", "}
                        <Link href={`/services/${s.slug}`} className="font-semibold text-oxblood-light hover:text-concrete">
                          {getServiceContent(s).name}
                        </Link>
                      </span>
                    ))}
                    .{" "}
                  </>
                )}
                {area && (
                  <>
                    More about our work in{" "}
                    <Link href={`/service-areas/${area.slug}`} className="font-semibold text-oxblood-light hover:text-concrete">
                      {area.name}
                    </Link>
                    .
                  </>
                )}
              </p>
            )}
          </div>

          {project.review && (
            <figure className="lg:col-span-4">
              <div className="rounded-r-xl border-l-2 border-oxblood bg-charcoal p-6">
                <div className="mb-2 flex items-center gap-0.5">
                  {project.review.source === "google" && <GoogleIcon className="mr-2 h-3.5 w-3.5 shrink-0" />}
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-concrete/85 italic">
                  &ldquo;{project.review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-[11px] font-medium tracking-[0.1em] text-steel uppercase">
                  — {project.review.author}
                </figcaption>
              </div>
            </figure>
          )}
        </div>
      </Container>
    </section>
  );
}
