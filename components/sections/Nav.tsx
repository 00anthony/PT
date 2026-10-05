"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Phone, Menu, X } from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { siteConfig } from "../../lib/site-config";
import { media } from "../../lib/media";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 bg-ink transition-shadow duration-300",
        scrolled || open ? "shadow-md" : "shadow-sm"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <Image src={media.logo.icon} alt="" width={52} height={57} priority className="h-14 w-auto" />
          <span className="w-44 font-display text-xl leading-5 text-concrete sm:w-52 sm:text-2xl sm:leading-6">
            PT Roofing &amp; Renovations
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-concrete/80 transition-colors hover:text-oxblood-light"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-concrete hover:text-oxblood-light">
            <Phone className="h-4 w-4 text-oxblood-light" />
            {siteConfig.phone}
          </a>
          <Button href="#contact" icon={false} className="!px-5 !py-3">
            Free Estimate
          </Button>
        </div>

        <button
          className="p-2 text-concrete lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-charcoal-2 bg-ink lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-concrete/85"
              >
                {l.label}
              </Link>
            ))}
            <a href={siteConfig.phoneHref} className="mt-2 flex items-center gap-2 py-2 font-semibold text-concrete">
              <Phone className="h-4 w-4 text-oxblood-light" />
              {siteConfig.phone}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
