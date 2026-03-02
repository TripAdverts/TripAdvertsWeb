import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TripAdverts — In-Vehicle Digital Advertising in Accra",
  description:
    "Learn about TripAdverts — Accra's leading digital out-of-home advertising platform delivering targeted ads on headrest-mounted tablet displays in taxis and ride-share vehicles across Ghana.",
  alternates: {
    canonical: "/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.tripadverts.com/about#webpage",
      url: "https://www.tripadverts.com/about",
      name: "About TripAdverts",
      isPartOf: { "@id": "https://www.tripadverts.com/#website" },
      inLanguage: "en",
      dateModified: "2026-03-01",
      description:
        "Learn about TripAdverts — Accra's leading digital out-of-home advertising platform delivering targeted ads on headrest-mounted tablet displays in taxis and ride-share vehicles across Ghana.",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.tripadverts.com/about#breadcrumb",
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
          name: "About",
          item: "https://www.tripadverts.com/about",
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-slate-200 px-6 py-5">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-slate-900"
          >
            TripAdverts<span className="text-teal-500">.</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Page Title */}
        <section className="mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            About TripAdverts
          </h1>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-2xl">
            We are transforming urban mobility into powerful advertising
            opportunities across Accra, Ghana.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Our Story
          </h2>
          <div className="mt-4 space-y-4 text-base text-slate-500 leading-relaxed">
            <p>
              TripAdverts was born from a simple observation: every day,
              thousands of passengers sit in taxis and ride-share vehicles
              across Accra with nothing but idle time on their hands. We saw an
              untapped canvas — an opportunity to connect brands with a captive,
              engaged audience in one of West Africa&apos;s most dynamic cities.
            </p>
            <p>
              We built a digital out-of-home (DOOH) advertising platform
              purpose-designed for the urban transit experience. By installing
              high-definition headrest-mounted tablets in vehicles across the
              city, we created a new media channel that delivers impactful
              advertising where traditional billboards and digital screens
              simply cannot reach — right in front of the passenger, for the
              entire duration of their journey.
            </p>
            <p>
              What started as a small pilot with a handful of vehicles in
              central Accra has grown into a network spanning hundreds of
              vehicles, dozens of advertising zones, and thousands of daily
              impressions. Today, TripAdverts is Accra&apos;s leading in-vehicle
              digital advertising platform, trusted by brands ranging from
              multinational corporations to ambitious local businesses.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16 rounded-2xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Our Mission
          </h2>
          <p className="mt-4 text-base text-slate-500 leading-relaxed">
            Our mission is to transform urban mobility into meaningful
            advertising opportunities — bridging the gap between brands and
            consumers during everyday commutes. We believe that every ride is a
            chance to inform, inspire, and connect. By turning idle transit time
            into an engaging media experience, we create value for advertisers
            who want to reach real people, fleet partners who earn additional
            revenue, and passengers who discover relevant brands and offers
            along the way.
          </p>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Our Technology
          </h2>
          <p className="mt-4 text-base text-slate-500 leading-relaxed">
            Every element of the TripAdverts platform has been engineered for
            performance, reliability, and measurability.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Headrest-Mounted HD Tablets
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our custom-installed, high-definition tablet displays are
                mounted directly on the headrest of each vehicle seat. This
                ensures every passenger has a clear, unobstructed view of
                advertising content throughout their ride — delivering
                engagement rates that far exceed traditional out-of-home media.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Precision Geofencing
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Advertisers can define exact geographic zones across Accra to
                trigger their campaigns. Whether targeting busy commercial
                districts like Osu and Cantonments or university corridors
                around Legon, our geofencing engine ensures ads are served in
                the locations that matter most to each brand.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Real-Time Analytics Dashboard
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our intuitive campaign dashboard provides live data on
                impressions, screen time, geographic distribution, and audience
                engagement. Advertisers can monitor performance the moment a
                campaign goes live — and adjust targeting, creative, or budget
                on the fly.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Demographic Targeting
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                By analysing route patterns, time-of-day behaviour, and zone
                characteristics, we enable advertisers to reach specific
                audience segments — from young professionals commuting through
                business districts to families travelling through residential
                neighbourhoods.
              </p>
            </div>
          </div>
        </section>

        {/* Multi-Stakeholder Platform */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            A Platform for Everyone
          </h2>
          <p className="mt-4 text-base text-slate-500 leading-relaxed">
            TripAdverts operates a multi-stakeholder model designed to create
            shared value across the transit advertising ecosystem.
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-teal-500" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Advertisers
                </h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Brands gain access to a captive audience with unmatched
                  attention — no ad-blockers, no skipping, no competing content.
                  Campaigns can be launched in minutes through our self-serve
                  platform, with full control over targeting, budget, and
                  creative assets.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-teal-500" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Fleet Partners
                </h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Taxi and ride-share fleet operators monetise their vehicles by
                  joining the TripAdverts network. We handle installation,
                  content management, and maintenance — fleet partners simply
                  earn passive revenue on every ride.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-teal-500" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Drivers
                </h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Drivers benefit from supplementary income and a premium
                  passenger experience. The tablets require no intervention from
                  the driver — content is managed remotely, and earnings are
                  tracked transparently through the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Our Values
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Innovation
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We continuously push the boundaries of what in-vehicle
                advertising can achieve — from smarter targeting algorithms to
                richer media formats and deeper analytics.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Transparency
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every impression is tracked, every metric is verifiable, and
                every partner has full visibility into performance. We believe
                trust is built through open data.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Impact
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We measure success not just in impressions but in real outcomes
                — brands reached, revenue generated for drivers, and communities
                connected to the products and services they need.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Ready to reach your audience?
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-lg mx-auto">
            Whether you are an advertiser looking for unmatched engagement or a
            fleet operator ready to unlock new revenue, we would love to hear
            from you.
          </p>
          <div className="mt-8">
            <a
              href="/#contact"
              className="inline-block rounded-full bg-teal-500 px-8 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-400 hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-6">
        <div className="mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter text-slate-900"
            >
              TripAdverts<span className="text-teal-500">.</span>
            </Link>
            <p className="mt-1 text-sm text-slate-400">
              Accra&apos;s leading in-vehicle digital advertising platform.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} TripAdverts Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
