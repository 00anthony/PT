import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PT Roofing And Renovations',
  description: 'How PT Roofing And Renovations collects, uses, and protects your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: October 2, 2026</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <p>
              PT Roofing And Renovations LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
              This policy explains what information we collect through this website, how we use it,
              and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Information you provide to us</h3>
            <p className="mb-3">
              When you submit our contact / quote request form, we collect the information you enter,
              which may include your name, email address, phone number, property address, city, ZIP code,
              the service you&apos;re interested in, your project details, preferred contact method and time,
              and any photos or videos you choose to upload.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Information collected automatically</h3>
            <p>
              Like most websites, we use Google Analytics to understand how visitors use our site. This
              automatically collects information such as your approximate location (city/country level,
              derived from IP address), device and browser type, pages viewed, time spent on the site, and
              the site that referred you to us. Google Analytics uses cookies and similar technologies to
              do this.
            </p>
            <p className="mt-3">
              We also use Google Ads conversion tracking to measure how well our advertising works. When
              you arrive on our site from one of our Google ads, Google Ads may set a cookie so that when
              you submit our contact form, or click our phone number or email address, Google can
              report that action back to us as a lead. This tells us which ads lead to inquiries, but it
              does not give us personal information about you beyond what you choose to submit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your quote requests and contact you about your project</li>
              <li>To operate, maintain, and improve our website</li>
              <li>To understand how visitors find and use our site (via Google Analytics)</li>
              <li>To measure the effectiveness of our advertising (via Google Ads conversion tracking)</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Cookies, Google Analytics &amp; Google Ads</h2>
            <p className="mb-3">
              This site uses cookies placed by Google Analytics and Google Ads to distinguish visitors and measure site
              usage. You can control or disable cookies through your browser settings, or opt out of
              Google Analytics tracking across all websites using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ccb78a] hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
            <p className="mb-3">
              You can manage how Google uses your information for advertising, including opting out of
              personalized ads, at{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ccb78a] hover:underline"
              >
                Google&apos;s My Ad Center
              </a>.
            </p>
            <p>
              You can learn more about how Google collects and processes data at{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ccb78a] hover:underline"
              >
                policies.google.com/privacy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Sharing Your Information</h2>
            <p>
              We do not sell or rent your personal information. We may share information with service
              providers who help us operate this website and process your requests (such as Google
              Analytics and Google Ads), and as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Retention</h2>
            <p>
              We keep contact form submissions as long as needed to respond to your request and for our
              business records. Analytics and advertising data is retained according to Google Analytics&apos; and
              Google Ads&apos; standard retention settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Children&apos;s Privacy</h2>
            <p>
              Our website is not directed to children under 13, and we do not knowingly collect
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an
              updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p>
              If you have questions about this policy or your information, contact us at{' '}
              <a
                href="mailto:ptroofingandrenovations.info@gmail.com"
                className="text-[#ccb78a] hover:underline break-all"
              >
                ptroofingandrenovations.info@gmail.com
              </a>{' '}
              or (512) 999-4366.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
