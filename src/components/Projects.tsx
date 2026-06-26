"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";

// ─── Types ───────────────────────────────────────────────────────────────────

type FilterCategory = "All" | "Roofing" | "Siding" | "Painting" | "Windows" | "Interior" | "Patio" | "Other";

interface ProjectCard {
  id: number;
  title: string;
  location: string;
  category: FilterCategory;
  services: string[];
  timeline: string;
  review?: {
    text: string;
    author: string;
  };
  before: string; // image URL
  after: string;  // image URL
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "Cedar Deck Rebuild",
    location: "Westlake Hills, TX",
    category: "Patio",
    services: ["Deck Construction", "Staining & Sealing", "Railing Installation"],
    timeline: "April 2024 · 9 days",
    review: {
      text: "Completely transformed our backyard. The crew was meticulous and the cedar looks incredible. Worth every penny.",
      author: "Marcus T.",
    },
    before: "/images/portfolio/deck-before.webp",
    after: "/images/portfolio/deck-after.webp",
  },
  {
    id: 2,
    title: "Full Siding Replacement",
    location: "Round Rock, TX",
    category: "Siding",
    services: ["Vinyl Siding", "Trim & Fascia", "Moisture Barrier"],
    timeline: "February 2024 · 6 days",
    review: {
      text: "Our house looks brand new. The team worked fast and kept the site spotless every single day.",
      author: "Linda & Ray K.",
    },
    before: "/images/portfolio/siding2-before.webp",
    after: "/images/portfolio/siding2-after.webp",
  },
  {
    id: 3,
    title: "Stamped Concrete Patio",
    location: "Pflugerville, TX",
    category: "Patio",
    services: ["Concrete Pour", "Stamping & Coloring", "Sealant Coat"],
    timeline: "March 2024 · 5 days",
    before: "/images/portfolio/back-patio-before.webp",
    after: "/images/portfolio/back-patio-after.webp",
  },
  {
    id: 4,
    title: "Siding & Roof Remodel",
    location: "Austin, TX",
    category: "Siding",
    services: ["Vinyl Siding", "Metal Roofing", "Painting"],
    timeline: "January 2024 · 10 days",
    review: {
      text: "PT made my house looking completely brand new. I can't thank them enough for their elite level of craftmanship.",
      author: "Donna P.",
    },
    before: "/images/portfolio/siding-roof-before.webp",
    after: "/images/portfolio/siding-roof-after.webp",
  },
];

// ─── Before/After Slider ─────────────────────────────────────────────────────

function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl select-none cursor-col-resize group"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* AFTER (base layer) */}
      <img
        src={after}
        alt={`${title} after`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={`${title} before`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${10000 / position}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        style={{ left: `${position}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-0.5 ring-2 ring-stone-300/40">
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none"
            className="mt-1"
          >
            <path d="M4 7L1 4M1 4L4 1M1 4H13M10 7L13 4M13 4L10 1M13 4H1" stroke="#1C2331" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-black/60 text-white/80 px-2 py-0.5 rounded">
          Before
        </span>
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-black/60 text-white/80 px-2 py-0.5 rounded">
          After
        </span>
      </div>

      {/* Hover hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white/60 text-xs tracking-widest uppercase font-semibold bg-black/40 px-3 py-1 rounded-full">
          Drag to compare
        </p>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCardItem({ project }: { project: ProjectCard }) {
  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/30 border border-white/5 hover:border-stone-400/20 transition-colors duration-300">
      {/* Slider */}
      <div className="p-4 pb-0">
        <BeforeAfterSlider
          before={project.before}
          after={project.after}
          title={project.title}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#C4A882]/70 mb-1">
            {project.location}
          </p>
          <h3 className="text-xl font-extrabold tracking-tight text-[#F7F4EF] leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Services */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8A9BB0] mb-2">
            Services Provided
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.services.map((s) => (
              <span
                key={s}
                className="text-[11px] font-semibold tracking-wide text-[#C4A882] bg-[#C4A882]/10 border border-[#C4A882]/20 rounded-md px-2.5 py-1"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Timeline */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C4A882]/10 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-[#C4A882]" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="11" rx="1.5" />
              <path d="M5 1.5V4M11 1.5V4M2 6.5H14" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[#8A9BB0] text-sm font-medium">{project.timeline}</span>
        </div>

        {/* Review */}
        {project.review && (
          <div className="mt-auto bg-[#1C2331]/60 border border-white/5 rounded-xl p-4">
            <div className="flex gap-0.5 mb-2.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-[#C4A882]" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 1l1.39 2.82 3.11.45-2.25 2.19.53 3.09L6 8.1 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z" />
                </svg>
              ))}
            </div>
            <p className="text-[#F7F4EF]/80 text-sm leading-relaxed italic mb-2.5">
              &ldquo;{project.review.text}&rdquo;
            </p>
            <p className="text-[#8A9BB0] text-[11px] font-semibold tracking-wide">
              — {project.review.author}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────

const FILTERS: FilterCategory[] = ["All", "Roofing", "Siding", "Painting", "Windows", "Interior", "Patio", "Other"];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RenovationPortfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <AnimatedSection className='text-center mb-20' animation='fade-up'>
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#ccb78a]/10 border border-[#ccb78a]/20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ccb78a]">Our Portfolio</span>
        </div>
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Make Your Neighbor <span className="text-[#ccb78a]">Jealous</span>
        </h2>
        <div className="w-24 h-1.5 bg-[#ccb78a] mx-auto rounded-full mb-8"></div>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
          Every project, documented from day one to the final walkthrough. Drag each image to see the transformation.        
        </p>
      </AnimatedSection>

      {/* Filter Pills */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={[
                  "px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-200",
                  isActive
                    ? "bg-[#C4A882] text-[#1C2331] shadow-lg shadow-[#C4A882]/20"
                    : "bg-white/5 text-[#8A9BB0] border border-[#ccb78a]/40 hover:border-[#C4A882]/30 hover:text-[#C4A882] hover:bg-[#C4A882]/5",
                ].join(" ")}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCardItem key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-24 text-center">
          <p className="text-[#8A9BB0] text-lg font-semibold mb-2">No projects in this category yet.</p>
          <p className="text-[#8A9BB0]/50 text-sm">Check back soon or browse all projects.</p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-6 text-[11px] font-bold tracking-[0.14em] uppercase text-[#C4A882] border border-[#C4A882]/30 rounded-full px-5 py-2 hover:bg-[#C4A882]/10 transition-colors"
          >
            View All
          </button>
        </div>
      )}

      {/* Footer: note + See More */}
      <div className="max-w-7xl mx-auto mt-14 flex flex-col px-4 sm:px-6 lg:px-8 items-center justify-between gap-4">
        <p className="text-[#8A9BB0]/50 text-xs tracking-widest uppercase">
          All photos taken by our team on-site
        </p>
        <AnimatedSection className="mt-4 text-center" animation="fade-up" delay={500}>
          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 shadow">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">See something you like?</h4>
            <p className="text-gray-600 mb-6">request a free quote on your own project today.</p>
            <a 
              href="#contact"
              className="bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-black cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-normal text-center inline-block">
              Contact for custom project
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}