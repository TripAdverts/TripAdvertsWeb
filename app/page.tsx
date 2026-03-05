import Link from "next/link";
import NavBar from "./components/NavBar";
import { MapPin, Eye, BarChart3, ArrowRight } from "lucide-react";
import Image from "next/image";
import AccraMap from "./components/AccraMap";
import AdLayoutSwitcher from "./components/AdLayoutSwitcher";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tripadverts.com/#organization",
      name: "TripAdverts",
      url: "https://www.tripadverts.com",
      description:
        "TripAdverts is Accra's leading digital out-of-home (DOOH) advertising platform.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tripadverts.com/icon.svg",
        width: 512,
        height: 512,
      },
      areaServed: {
        "@type": "City",
        name: "Accra",
        containedInPlace: {
          "@type": "Country",
          name: "Ghana",
        },
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] selection:bg-teal-500/30 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Header */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tighter leading-[1.1]">
          Advertising that <br className="hidden sm:block" />
          moves people.
        </h1>
        <p className="mt-8 max-w-2xl text-lg sm:text-2xl text-black/50 dark:text-white/50 tracking-tight font-medium">
          Reach thousands of passengers daily through premium, headrest-mounted displays in taxis across Accra.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a href="#contact" className="group rounded-full bg-black dark:bg-white px-8 py-4 text-lg font-medium text-white dark:text-black hover:scale-105 transition-all flex items-center gap-2">
            Start a Campaign
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#features" className="rounded-full px-8 py-4 text-lg font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Learn more
          </a>
        </div>
        
        {/* Massive Hero Image */}
        <div className="w-full max-w-6xl mt-16 sm:mt-20 rounded-3xl overflow-hidden shadow-2xl relative border border-black/10 dark:border-white/10 h-[40vh] sm:h-[60vh] flex items-center justify-center bg-[#000000]">
          <Image
            src="/Hero-Product.webp"
            alt="TripAdverts platform displayed on an in-cab tablet"
            width={1600}
            height={900}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </section>

      {/* What is TripAdverts Section */}
      <section aria-label="What is TripAdverts" className="py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-tight">
            A captive audience. <br/>
            Zero distractions.
          </h2>
          <p className="mt-8 text-xl sm:text-2xl text-black/50 dark:text-white/50 font-medium leading-relaxed max-w-3xl mx-auto">
            We install high-definition tablet displays inside taxis and ride-share vehicles, turning every passenger journey into a premium digital out-of-home advertising opportunity.
          </p>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="py-24 sm:py-32 px-6 bg-[#f5f5f7] dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-tighter">
              Technology built for impact.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            {/* Bento Box 1: Large Span */}
            <div className="md:col-span-2 rounded-[2rem] bg-white dark:bg-[#1d1d1f] p-10 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-md transition-shadow min-h-[400px]">
              <div className="z-10 max-w-md pointer-events-none">
                <MapPin className="w-8 h-8 text-teal-500 mb-6" />
                <h3 className="text-2xl font-semibold tracking-tight mb-3">Precision Geofencing</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                  Target specific zones across Accra, demographic hotspots, and specific times of day to ensure your ad reaches the right people.
                </p>
              </div>
              {/* Map Interface */}
              <div className="absolute bottom-0 right-0 w-[55%] md:w-[45%] h-[50%] md:rounded-tl-[2rem] overflow-hidden">
                <AccraMap />
              </div>
            </div>

            {/* Bento Box 2: Tall/Square */}
            <div className="rounded-[2rem] bg-white dark:bg-[#1d1d1f] p-10 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
              <div className="z-10">
                <Eye className="w-8 h-8 text-teal-500 mb-6" />
                <h3 className="text-2xl font-semibold tracking-tight mb-3">Deep Engagement</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                  Passengers spend their entire ride engaging with our screens. No scroll-past.
                </p>
              </div>
              <div className="mt-8 rounded-2xl bg-black/5 dark:bg-white/5 h-full w-full flex items-center justify-center">
                <span className="text-black/30 dark:text-white/30 font-medium text-sm text-center px-4">Attention Metric<br/>Placeholder</span>
              </div>
            </div>

            {/* Bento Box 3: Square */}
            <div className="rounded-[2rem] bg-white dark:bg-[#1d1d1f] p-10 flex flex-col overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
              <div className="z-10">
                <BarChart3 className="w-8 h-8 text-teal-500 mb-6" />
                <h3 className="text-2xl font-semibold tracking-tight mb-3">Real-time Analytics</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                  Track impressions and campaign performance instantly through our intuitive dashboard.
                </p>
              </div>
            </div>

            {/* Bento Box 4: Large Span */}
            <div className="md:col-span-2 rounded-[2rem] bg-white dark:bg-[#1d1d1f] p-10 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative shadow-sm hover:shadow-md transition-shadow gap-8">
              <div className="z-10 max-w-sm">
                <h3 className="text-3xl font-semibold tracking-tight mb-4">Launch in minutes.</h3>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-6">
                  A self-serve advertising platform — create, target, and launch campaigns on headrest tablets instantly.
                </p>
                <a href="#contact" className="text-teal-600 font-semibold hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
                  See how it works <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-full rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center">
                <span className="text-black/30 dark:text-white/30 font-medium text-sm text-center px-4">Dashboard UI<br/>Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Packages (Apple M5 Style Presentation) */}
      <section className="py-24 sm:py-32 bg-[#000000] text-white flex flex-col items-center overflow-hidden w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10 px-6 lg:px-8">
          
          {/* Header Text */}
          <div className="max-w-2xl text-left mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-[2.5xl] md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#f5f5f7] leading-tight mb-2">
              Time to Upgrade.
            </h2>
          </div>
        </div>

        {/* Scrolling Cards Container */}
        <div className="flex overflow-x-auto w-full gap-6 sm:gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbars px-[7.5vw] sm:px-[15vw] md:px-[20vw] xl:px-[calc(50vw-500px)]">
          
          {/* Basic Tier Content Card */}
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[1000px] aspect-[4/5] sm:aspect-video flex-shrink-0 snap-center rounded-[2rem] sm:rounded-[3rem] bg-[#111113] overflow-hidden group hover:scale-[1.01] transition-transform duration-500 shadow-2xl">
            {/* Media Placeholder Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <Image 
                src="/Static-Billboard.webp" 
                alt="Static Billboard Illustration" 
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Top Text Content */}
            <div className="relative z-10 w-full pt-2 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-8 sm:px-12 md:px-16 flex flex-col gap-2 pointer-events-none -translate-y-[3px]">
              <h3 className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight">No more.</h3>
            </div>
          </div>

          {/* Pro Tier Content Card */}
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[1000px] aspect-[4/5] sm:aspect-video flex-shrink-0 snap-center rounded-[2rem] sm:rounded-[3rem] bg-[#000000] overflow-hidden group hover:scale-[1.01] transition-transform duration-500 shadow-2xl flex flex-col items-center justify-end pb-8 sm:pb-0">
            
            {/* Top Text Content (Absolute positioned top-left as in reference) */}
            <div className="absolute top-0 left-0 z-10 w-full pt-2 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-8 sm:px-12 md:px-16 flex flex-col pointer-events-none -translate-y-[3px]">
              <h3 className="text-[#f5f5f7] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight">Screen is your's.</h3>
            </div>

            {/* Scaled down, object-contained image */}
            <div 
              className="relative w-[95%] sm:w-[85%] md:w-[75%] aspect-square flex items-center justify-center translate-y-8 sm:translate-y-12 md:translate-y-16 lg:translate-y-20"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)'
              }}
            >
              <Image 
                src="/screen-yours.webp" 
                alt="Digital Screen Illustration" 
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Max Tier Content Card */}
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[1000px] aspect-[4/5] sm:aspect-video flex-shrink-0 snap-center rounded-[2rem] sm:rounded-[3rem] bg-[#111113] overflow-hidden group hover:scale-[1.01] transition-transform duration-500 shadow-2xl flex flex-col">
            {/* Top Text Content */}
            <div className="relative z-10 w-full pt-2 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-8 sm:px-12 md:px-16 flex flex-col gap-2 pointer-events-none shrink-0 -translate-y-[3px]">
              <h3 className="text-[#f5f5f7] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight">Choose your layout.</h3>
            </div>
            {/* Interactive Layout Switcher */}
            <div className="flex-1 min-h-0">
              <AdLayoutSwitcher />
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section aria-label="Key metrics" className="py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-5xl sm:text-7xl font-semibold tracking-tighter">10k+</span>
              <span className="mt-4 text-base sm:text-lg text-black/50 dark:text-white/50 font-medium">Daily Impressions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl sm:text-7xl font-semibold tracking-tighter">500+</span>
              <span className="mt-4 text-base sm:text-lg text-black/50 dark:text-white/50 font-medium">Vehicles</span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl sm:text-7xl font-semibold tracking-tighter">50+</span>
              <span className="mt-4 text-base sm:text-lg text-black/50 dark:text-white/50 font-medium">Zones</span>
            </div>
            <div className="flex flex-col">
              <span className="text-5xl sm:text-7xl font-semibold tracking-tighter">98%</span>
              <span className="mt-4 text-base sm:text-lg text-black/50 dark:text-white/50 font-medium">Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section aria-label="Trusted partners" className="py-20 px-6 border-y border-black/5 dark:border-white/5 bg-[#fbfbfd] dark:bg-black">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-10">
            Trusted by innovative businesses across Ghana
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl sm:text-3xl font-bold font-serif tracking-tighter">Margins Group</span>
            <span className="text-xl sm:text-2xl font-semibold font-sans tracking-tight">Fontissue</span>
            <span className="text-3xl sm:text-4xl font-bold font-sans tracking-tighter italic">MTN</span>
            <span className="text-2xl sm:text-3xl font-semibold font-mono tracking-widest">Arena233</span>
            <span className="text-xl sm:text-2xl font-medium tracking-widest uppercase">Debbies</span>
          </div>
        </div>
      </section>

      {/* Fleet Partner CTA Section */}
      <section id="partner" className="py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tighter leading-tight">
            Turn your fleet into a <br/> revenue engine.
          </h2>
          <p className="mt-6 text-xl text-black/50 dark:text-white/50 font-medium leading-relaxed max-w-2xl mx-auto">
            Install our premium HD headrest tablets in your cabs and start earning passive income on every ride. We handle everything at no cost to you.
          </p>
          <div className="mt-12 flex justify-center">
            <a href="mailto:fleet@tripadverts.com" className="rounded-full bg-[#1d1d1f] dark:bg-white px-8 py-4 text-lg font-medium text-white dark:text-black hover:scale-105 transition-transform flex items-center gap-2">
              Become a Fleet Partner
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] dark:bg-[#111] py-16 px-6 relative border-t border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold tracking-tight mb-4">TripAdverts<span className="text-teal-500">.</span></h3>
              <p className="text-sm text-black/50 dark:text-white/50 font-medium">
                Accra&apos;s leading in-vehicle digital advertising platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-3 text-sm font-medium text-black/50 dark:text-white/50">
                <li><a href="#features" className="hover:text-black dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-black dark:hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#partner" className="hover:text-black dark:hover:text-white transition-colors">Fleet Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-3 text-sm font-medium text-black/50 dark:text-white/50">
                <li><a href="/about" className="hover:text-black dark:hover:text-white transition-colors">About Us</a></li>
                <li><a href="mailto:hello@tripadverts.com" className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
                <li><a href="mailto:sales@tripadverts.com" className="hover:text-black dark:hover:text-white transition-colors">Sales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-3 text-sm font-medium text-black/50 dark:text-white/50">
                <li><a href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-black dark:hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-black/40 dark:text-white/40">
            <p>© {new Date().getFullYear()} TripAdverts Inc. All rights reserved.</p>
            <p>Accra, Greater Accra, Ghana</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
