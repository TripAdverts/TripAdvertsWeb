import HeroCanvas from "./components/HeroCanvas";
import { MapPin, Eye, BarChart3 } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tripadvert.com/#organization",
      name: "TripAdverts",
      url: "https://www.tripadvert.com",
      description:
        "TripAdverts is Accra's leading digital out-of-home (DOOH) advertising platform, delivering targeted ads to passengers through headrest-mounted tablet displays in taxis and ride-share vehicles across Ghana.",
      areaServed: {
        "@type": "City",
        name: "Accra",
        containedInPlace: {
          "@type": "Country",
          name: "Ghana",
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Accra",
        addressCountry: "GH",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tripadvert.com/#website",
      url: "https://www.tripadvert.com",
      name: "TripAdverts",
      publisher: { "@id": "https://www.tripadvert.com/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://www.tripadvert.com/#service",
      name: "In-Vehicle Digital Advertising",
      provider: { "@id": "https://www.tripadvert.com/#organization" },
      serviceType: "Digital Out-of-Home Advertising",
      description:
        "Advertise your business on headrest-mounted tablet displays inside taxis and ride-share vehicles in Accra, Ghana. Reach thousands of passengers daily with precision-targeted, real-time campaigns.",
      areaServed: {
        "@type": "City",
        name: "Accra",
        containedInPlace: {
          "@type": "Country",
          name: "Ghana",
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Advertising Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Headrest Tablet Advertising",
              description:
                "Display video and image ads on HD headrest-mounted tablets in taxis across Accra with geofencing, demographic targeting, and real-time analytics.",
            },
          },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section Container for Scroll Animation */}
      <HeroCanvas>
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 py-12 lg:px-20 h-full bg-slate-950/60 md:bg-transparent">
          <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-2xl">
            Captivate Your Audience <br className="hidden sm:block" />
            <span className="text-teal-400">on the Go.</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-lg text-base sm:text-lg text-slate-200 drop-shadow-md">
            Reach thousands of passengers daily through headrest-mounted tablet displays in taxis across Accra, Ghana.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="rounded-full bg-teal-500 px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-400 hover:-translate-y-1 text-center">
              Start Advertising
            </a>
          </div>
        </div>
      </HeroCanvas>

      {/* Social Proof */}
      <section aria-label="Trusted partners" className="bg-white py-12 sm:py-20 px-6 z-20 relative">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Trusted by innovative businesses across Ghana
          </p>
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-6 gap-y-4 sm:gap-24 opacity-40">
            <span className="text-xl sm:text-3xl font-bold font-serif tracking-tighter">Margins Group</span>
            <span className="text-lg sm:text-2xl font-semibold font-sans tracking-tight">Fontissue</span>
            <span className="text-2xl sm:text-4xl font-bold font-sans tracking-tighter italic">MTN</span>
            <span className="text-xl sm:text-3xl font-semibold font-mono tracking-widest">Arena233</span>
            <span className="text-lg sm:text-2xl font-medium tracking-widest uppercase">Debbies</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section aria-label="Key metrics" className="bg-white py-14 sm:py-20 px-6 z-20 relative border-y border-slate-100">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-8 md:gap-0">
            <div className="flex flex-col items-center md:border-r md:border-slate-200 last:border-r-0">
              <span className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900">10,000+</span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-400 font-medium">Daily Impressions</span>
            </div>
            <div className="flex flex-col items-center md:border-r md:border-slate-200">
              <span className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900">500+</span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-400 font-medium">Vehicles</span>
            </div>
            <div className="flex flex-col items-center md:border-r md:border-slate-200">
              <span className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900">50+</span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-400 font-medium">Zones</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900">98%</span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-400 font-medium">Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" aria-label="Platform features" className="py-20 sm:py-32 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 sm:mb-20">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Technology Built for Impact
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-500">
              Our headrest-mounted tablet network delivers precision targeting and deep passenger engagement across Accra.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-10 md:grid-cols-3">
            <div className="flex flex-col p-6 sm:p-8 rounded-2xl border border-slate-200">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-teal-500 mb-4 sm:mb-5" />
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Precision Targeting</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Target specific zones across Accra, times of day, and demographic hotspots to reach your ideal audience on our headrest tablet displays.
              </p>
            </div>

            <div className="flex flex-col p-6 sm:p-8 rounded-2xl border border-slate-200">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-teal-500 mb-4 sm:mb-5" />
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Deep Engagement</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Passengers spend their entire ride engaging with our headrest-mounted screens — no distractions, no scroll-past. Your ad gets full attention.
              </p>
            </div>

            <div className="flex flex-col p-6 sm:p-8 rounded-2xl border border-slate-200">
              <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-teal-500 mb-4 sm:mb-5" />
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Real-time Analytics</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Track impressions, interactions, and campaign performance instantly through our intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" aria-label="How it works" className="py-20 sm:py-32 px-6 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 sm:mb-20">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Launch Your Campaign in Minutes
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-500">
              A self-serve advertising platform — create, target, and launch campaigns on headrest tablets across Accra.
            </p>
          </div>

          <div className="grid gap-10 sm:gap-16 md:grid-cols-3">
            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-light text-teal-500 mb-3 sm:mb-4">1</span>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Upload Creative</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Upload your high-definition video or image assets directly to our campaign manager.
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-light text-teal-500 mb-3 sm:mb-4">2</span>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Choose Fleet & Zones</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Select your target cities, ride-share fleets, and set specific geofences for delivery.
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-light text-teal-500 mb-3 sm:mb-4">3</span>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Launch & Track</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Go live instantly and monitor your campaign&apos;s reach and impact in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Partner CTA Section */}
      <section className="py-20 sm:py-32 px-6 bg-white">
        <div className="mx-auto max-w-3xl text-center border border-slate-200 rounded-3xl p-8 sm:p-16">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Turn your fleet into a revenue engine.
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-500">
            Join the TripAdverts network in Accra. Install our premium HD headrest tablets in your cabs and start earning passive income on every ride.
          </p>
          <div className="mt-8 sm:mt-10">
            <a href="#partner" className="rounded-full border-2 border-teal-500 px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-teal-600 transition-all hover:bg-teal-500 hover:text-white inline-flex items-center gap-2">
              Become a Fleet Partner
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-6 relative z-20">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tighter text-slate-900">TripAdverts<span className="text-teal-500">.</span></h3>
            <p className="mt-1 text-sm text-slate-400">
              Accra&apos;s leading in-vehicle digital advertising platform.
            </p>
          </div>
          <nav className="flex flex-wrap gap-5 sm:gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-teal-600 transition-colors">Advertisers</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Fleet Partners</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Analytics</a>
            <a href="#" className="hover:text-teal-600 transition-colors">About</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Contact</a>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TripAdverts Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
