import { Phone, Mail, MapPin, Check } from "lucide-react";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Reveal from "../../components/ui/Reveal";
import SectionBackdrop from "../../components/ui/SectionBackdrop";
import ServiceAreaMap from "../../components/ui/ServiceAreaMap";
import ContactForm, { ContactFormContext } from "./ContactForm";
import { siteConfig } from "../../lib/site-config";
import { services } from "../../lib/data";
import { getServiceContent } from "../../lib/audience";

const serviceOptions = services.map((s) => getServiceContent(s).name);

export default function Contact({
  defaultService,
  context,
  heading,
}: {
  defaultService?: string;
  context?: ContactFormContext;
  heading?: string;
} = {}) {
  const { address } = siteConfig;
  const defaultServiceMatch = defaultService ? services.find((s) => s.slug === defaultService) : undefined;

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-charcoal py-24 md:py-32">
      <SectionBackdrop />

      <Container className="relative">
        <Reveal>
          <Eyebrow>Free Estimates</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-4xl text-concrete sm:text-5xl">
            {heading ?? "Let’s take a look at your project"}
          </h2>
          <p className="mt-5 max-w-md text-concrete/70">
            {siteConfig.responsePromise} Tell us what&rsquo;s going on, or call and talk to us directly.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Form first on mobile — it's the point of the section */}
          <div className="lg:order-2 lg:col-span-7">
            <ContactForm
              serviceOptions={serviceOptions}
              defaultServiceName={defaultServiceMatch ? getServiceContent(defaultServiceMatch).name : undefined}
              context={context}
            />
          </div>

          <div className="space-y-5 lg:order-1 lg:col-span-5">
            <ContactRow icon={<Phone className="h-4 w-4 text-oxblood-light" />} label="Call or Text">
              <a href={siteConfig.phoneHref} className="text-lg font-semibold text-concrete hover:text-oxblood-light">
                {siteConfig.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="h-4 w-4 text-oxblood-light" />} label="Email">
              <a href={`mailto:${siteConfig.email}`} className="break-all text-concrete hover:text-oxblood-light">
                {siteConfig.email}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="h-4 w-4 text-oxblood-light" />} label="Office">
              <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-concrete hover:text-oxblood-light">
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </a>
            </ContactRow>

            <div className="rounded-xl border border-charcoal-2 bg-ink p-5">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">What Happens Next</div>
              <ol className="mt-4 space-y-3">
                {[
                  "We get back to you within 24 hours",
                  "We schedule a free inspection or estimate visit",
                  "You get a clear price and our honest recommendation",
                ].map((step) => (
                  <li key={step} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-oxblood-light" strokeWidth={2.5} />
                    <span className="text-sm leading-relaxed text-concrete/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <ServiceAreaMap />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-charcoal-2 bg-ink">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold tracking-[0.14em] text-steel uppercase">{label}</span>
        {children}
      </span>
    </div>
  );
}
