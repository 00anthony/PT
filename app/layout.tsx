import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "../lib/site-config";
import { businessJsonLd, jsonLdScript } from "../lib/structured-data";
import StickyMobileCTA from "../components/ui/StickyMobileCTA";
import MetaPixelPageView from "../components/MetaPixelPageView";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// PT's brand face. The file is the bold cut, so it's declared as 700 —
// heavier Tailwind weights map to it instead of the browser faking bold.
const copperplate = localFont({
  src: "../public/fonts/copperplatecc-bold-webfont.woff2",
  variable: "--font-copperplate",
  weight: "700",
  display: "swap",
});

const defaultTitle = `${siteConfig.name} | Austin Roofing Contractor`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Family-owned roofing and renovation contractor in South Austin. Roof repair and replacement, free roof inspections, James Hardie siding, painting, patios, windows, and interiors across Greater Austin.",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: defaultTitle,
    description:
      "Roof repair and replacement, free roof inspections, siding, painting, and renovations across Greater Austin.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: "Roofing and renovations across Greater Austin. Free roof inspections.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const { ga4Id, adsId, leadConversion, metaPixelId } = siteConfig.analytics;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${copperplate.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(businessJsonLd())} />
        {/* gtag.js (~190KB) loads once the page is idle so it doesn't compete with the first paint.
            The inline snippet below runs early: anything sent before gtag.js arrives — page view,
            phone/email clicks, form conversions — waits in dataLayer and is sent once it loads. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="lazyOnload" />
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}');
            gtag('config', '${adsId}');

            // Lead tracking for phone and email link clicks, site-wide:
            // Google Ads conversion + Meta standard "Contact" event.
            document.addEventListener('click', function (e) {
              var link = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
              if (link) {
                gtag('event', 'conversion', { 'send_to': '${leadConversion}' });
                if (window.fbq) window.fbq('track', 'Contact');
              }
            });
          `}
        </Script>
        {/* Meta Pixel — the snippet defines fbq() right away (events queue until fbevents.js
            loads asynchronously). Later route changes are tracked by <MetaPixelPageView />. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="antialiased bg-ink text-concrete">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <MetaPixelPageView />
        {children}
        <StickyMobileCTA />
      </body>
    </html>
  );
}
