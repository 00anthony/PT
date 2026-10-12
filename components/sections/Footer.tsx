import Image from "next/image";
import Link from "next/link";
import Container from "../../components/ui/Container";
import { siteConfig } from "../../lib/site-config";
import { media } from "../../lib/media";
import { services, publishedServiceAreas } from "../../lib/data";
import { getServiceContent } from "../../lib/audience";

const year = new Date().getFullYear();

const headingClass = "text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase";
const linkClass = "text-sm text-white/70 hover:text-oxblood";

export default function Footer() {
  const { address } = siteConfig;

  return (
    <footer className="relative bg-concrete pt-20 pb-28 text-white md:pb-14">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white">
                <Image src={media.logo.icon} alt="" width={44} height={48} className="h-11 w-auto" />
              </span>
              <span className="font-display text-lg leading-5">PT Roofing &amp; Renovations</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Family-owned roofing and renovation contractor serving {siteConfig.serviceArea}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                aria-label="PT Roofing & Renovations on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/70 hover:border-oxblood hover:text-oxblood"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M13.5 21v-8.15h2.73l.41-3.17h-3.14V7.67c0-.92.25-1.54 1.57-1.54h1.68V3.3A22.6 22.6 0 0 0 14.4 3.2c-2.35 0-3.96 1.43-3.96 4.07v2.41H7.7v3.17h2.74V21h3.06Z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                aria-label="PT Roofing & Renovations on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/70 hover:border-oxblood hover:text-oxblood"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className={headingClass}>Services</h4>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {getServiceContent(s).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Service Areas</h4>
            <ul className="mt-5 space-y-2.5">
              {publishedServiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link href={`/service-areas/${area.slug}`} className={linkClass}>
                    {area.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas" className={linkClass}>
                  All Service Areas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Company</h4>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/about" className={linkClass}>About</Link>
              </li>
              <li>
                <Link href="/projects" className={linkClass}>Projects</Link>
              </li>
              <li>
                <Link href="/#testimonials" className={linkClass}>Reviews</Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Contact</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-white/70">
              <li>
                <a href={siteConfig.phoneHref} className="hover:text-oxblood">{siteConfig.phone}</a>
              </li>
              <li className="break-all">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-oxblood">{siteConfig.email}</a>
              </li>
              <li>
                <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-oxblood">
                  {address.street}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                </a>
              </li>
              <li className="pt-1 text-white/60">
                {siteConfig.hours.map((h) => (
                  <span key={h.label} className="block">
                    {h.label}: {h.time}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs text-white/50">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
