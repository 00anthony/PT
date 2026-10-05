import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "../lib/site-config";
import { businessJsonLd, jsonLdScript } from "../lib/structured-data";
import StickyMobileCTA from "../components/ui/StickyMobileCTA";

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

const { ga4Id, adsId, leadConversion } = siteConfig.analytics;

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

            // Google Ads lead conversion: phone and email link clicks, site-wide
            document.addEventListener('click', function (e) {
              var link = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
              if (link) {
                gtag('event', 'conversion', { 'send_to': '${leadConversion}' });
              }
            });
          `}
        </Script>
      </head>
      <body className="antialiased bg-ink text-concrete">
        {children}
        <StickyMobileCTA />
      </body>
    </html>
  );
}
