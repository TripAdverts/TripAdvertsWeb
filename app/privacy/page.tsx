import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how TripAdverts collects, uses, and protects your personal information across our digital out-of-home advertising platform in Accra, Ghana.",
  alternates: {
    canonical: "/privacy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.tripadverts.com/privacy#webpage",
      url: "https://www.tripadverts.com/privacy",
      name: "Privacy Policy",
      isPartOf: { "@id": "https://www.tripadverts.com/#website" },
      inLanguage: "en",
      dateModified: "2026-03-01",
      description:
        "Learn how TripAdverts collects, uses, and protects your personal information across our digital out-of-home advertising platform in Accra, Ghana.",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.tripadverts.com/privacy#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.tripadverts.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: "https://www.tripadverts.com/privacy",
        },
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-12">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            &larr; Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-slate-500">Last updated: March 1, 2026</p>
        </header>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Introduction
            </h2>
            <p>
              TripAdverts Inc. (&quot;TripAdverts,&quot; &quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) operates a digital
              out-of-home (DOOH) advertising platform that delivers
              advertisements through headrest-mounted tablet displays in taxis
              and ride-share vehicles across Accra, Ghana. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website at{" "}
              <span className="font-medium">www.tripadverts.com</span>, use
              our advertiser dashboard, or interact with our in-vehicle
              displays.
            </p>
            <p className="mt-4">
              By accessing our services, you agree to the collection and use of
              information in accordance with this policy. If you do not agree,
              please discontinue use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="font-medium text-slate-900">
              2.1 Information You Provide Directly
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Account registration details (name, email address, phone
                number, company name)
              </li>
              <li>
                Billing and payment information processed through our
                third-party payment providers
              </li>
              <li>
                Campaign details including ad creatives, targeting preferences,
                and scheduling information
              </li>
              <li>
                Communications you send to us via email, contact forms, or
                customer support channels
              </li>
            </ul>

            <p className="mt-4 font-medium text-slate-900">
              2.2 Information Collected Automatically
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Device and browser information (IP address, browser type,
                operating system)
              </li>
              <li>
                Usage data from our website and advertiser dashboard (pages
                visited, features used, session duration)
              </li>
              <li>
                Cookies and similar tracking technologies (see our{" "}
                <Link
                  href="/cookies"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Cookie Policy
                </Link>
                )
              </li>
            </ul>

            <p className="mt-4 font-medium text-slate-900">
              2.3 In-Vehicle Display Data
            </p>
            <p className="mt-2">
              Our headrest-mounted tablets collect aggregated, anonymized data
              to measure ad performance. This includes impression counts, ad
              display duration, and general route information. We do{" "}
              <span className="font-semibold">not</span> collect personally
              identifiable information from passengers viewing ads in vehicles.
              No cameras, microphones, or biometric sensors are used on our
              in-vehicle displays to identify individual passengers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                Provide, maintain, and improve our advertising platform and
                services
              </li>
              <li>
                Process transactions and send related billing and account
                notifications
              </li>
              <li>
                Deliver campaign performance reports and analytics to
                advertisers
              </li>
              <li>
                Optimize ad delivery, targeting, and scheduling across our
                vehicle network
              </li>
              <li>
                Communicate with you about service updates, promotions, and
                support inquiries
              </li>
              <li>
                Detect, prevent, and address fraud, abuse, and technical issues
              </li>
              <li>
                Comply with applicable laws and regulations in Ghana and other
                jurisdictions
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell your personal information. We may share your data
              with:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">Service providers:</span>{" "}
                Third-party vendors who assist with payment processing, cloud
                hosting, analytics, and email delivery
              </li>
              <li>
                <span className="font-medium">Fleet partners:</span> Vehicle
                operators in our network receive only the information necessary
                to operate in-vehicle displays (no advertiser personal data is
                shared)
              </li>
              <li>
                <span className="font-medium">Legal obligations:</span> When
                required by law, regulation, legal process, or governmental
                request
              </li>
              <li>
                <span className="font-medium">Business transfers:</span> In
                connection with a merger, acquisition, or sale of assets, your
                data may be transferred to the successor entity
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              information, including encryption in transit (TLS/SSL),
              encrypted storage, access controls, and regular security audits.
              However, no method of electronic transmission or storage is
              completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as your account
              is active or as needed to provide you with our services. Campaign
              performance data is retained in aggregated, anonymized form for
              analytics purposes. We will delete or anonymize your personal
              data upon request, subject to any legal obligations requiring us
              to retain certain records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Your Rights
            </h2>
            <p>
              Under the Ghana Data Protection Act, 2012 (Act 843) and other
              applicable laws, you have the right to:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>
                Request deletion of your personal data, subject to legal
                retention requirements
              </li>
              <li>Object to or restrict certain processing of your data</li>
              <li>
                Withdraw consent at any time where processing is based on
                consent
              </li>
              <li>Lodge a complaint with the Data Protection Commission of Ghana</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:hello@tripadverts.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                hello@tripadverts.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. International Data Transfers
            </h2>
            <p>
              Your information may be transferred to and processed in countries
              outside Ghana where our service providers operate. We ensure that
              such transfers comply with applicable data protection laws and
              that appropriate safeguards are in place to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children.
              If we learn that we have collected data from a child without
              parental consent, we will take steps to delete that information
              promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by posting the updated policy on
              our website with a revised &quot;Last updated&quot; date. Your
              continued use of our services after any changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy
              or our data practices, please contact us:
            </p>
            <div className="mt-4 bg-slate-50 rounded-lg p-6">
              <p className="font-medium text-slate-900">TripAdverts Inc.</p>
              <p>Accra, Ghana</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:hello@tripadverts.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  hello@tripadverts.com
                </a>
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            &larr; Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
