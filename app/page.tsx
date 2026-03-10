import NavBar from "./components/NavBar";
import { MapPin, Eye, ArrowRight, ChevronRight, Tablet, Target, Rocket, Check } from "lucide-react";
import Image from "next/image";
import AccraMap from "./components/AccraMap";
import AdLayoutSwitcher from "./components/AdLayoutSwitcher";
import ScrollReveal from "./components/ScrollReveal";
import { Progress } from "@/components/ui/progress";
import AnimatedProgress from "./components/AnimatedProgress";

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
    <main className="min-h-screen bg-white font-sans text-black selection:bg-teal-500/20 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavBar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Column Text */}
        <div className="flex flex-col items-start text-left w-full lg:w-1/2">
          <ScrollReveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f6f6f6] px-4 py-2 text-sm font-medium text-black/70">
              <span className="inline-block w-2 h-2 rounded-full bg-[#44B8A7] animate-pulse" />
              Now live in Accra
              <ChevronRight className="w-3.5 h-3.5 text-black/40" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-black">
              Advertising that <br className="hidden xl:block" />
              moves people
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-7 max-w-xl text-lg sm:text-xl text-black/60 tracking-tight font-normal leading-relaxed">
              Reach thousands of passengers daily through premium, headrest-mounted displays in taxis across Accra.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Right Column Image */}
        <ScrollReveal delay={240}>
          <div className="w-full lg:w-[32rem] xl:w-[36rem] rounded-2xl overflow-hidden relative shadow-md flex items-center justify-center bg-[#F6F6F6] aspect-square">
            <Image
              src="/hero-image.webp"
              alt="TripAdverts platform displayed on an in-cab tablet"
              fill
              className="object-cover"
              priority
            />
          </div>
        </ScrollReveal>
      </section>


      {/* ─── Features Bento Grid ─── */}
      <section id="features" className="py-20 sm:py-28 px-6 bg-[#f6f6f6]">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-14 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-[-0.03em] text-black">
                Technology built for impact
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[380px]">
            <ScrollReveal className="md:col-span-2" delay={0}>
              <div className="h-full rounded-2xl bg-white p-9 flex flex-col justify-between overflow-hidden relative border border-black/[0.06] hover:border-black/[0.12] hover:-translate-y-1 transition-all duration-300 min-h-[380px]">
                <div className="z-10 max-w-md">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-5">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2 text-black">Precision Geofencing</h3>
                  <p className="text-black/50 text-base leading-relaxed">
                    Target specific zones across Accra, demographic hotspots, and specific times of day to ensure your ad reaches the right people.
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-[75%] sm:w-[65%] md:w-[60%] lg:w-[55%] h-[85%] md:h-[90%]">
                  <AccraMap />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="h-full rounded-2xl bg-white p-9 flex flex-col justify-center relative border border-black/[0.06] hover:border-black/[0.12] hover:-translate-y-1 transition-all duration-300">
                <div className="z-10">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-5">
                    <Eye className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2 text-black">Deep Engagement</h3>
                  <p className="text-black/50 text-base leading-relaxed">
                    Passengers spend their entire ride engaging with our screens. No scroll-past.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="h-full rounded-2xl bg-white p-9 flex flex-col justify-center relative border border-black/[0.06] hover:border-black/[0.12] hover:-translate-y-1 transition-all duration-300">
                <div className="z-10">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-5">
                    <Target className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2 text-black">Real-time Analytics</h3>
                  <p className="text-black/50 text-base leading-relaxed">
                    Track impressions and campaign performance instantly through our intuitive dashboard.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="md:col-span-2" delay={200}>
              <div className="h-full rounded-2xl bg-white p-9 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative border border-black/[0.06] hover:border-black/[0.12] hover:-translate-y-1 transition-all duration-300 gap-8">
                <div className="z-10 max-w-sm">
                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-black">Launch in minutes.</h3>
                  <p className="text-black/50 text-base leading-relaxed mb-5">
                    A self-serve advertising platform — create, target, and launch campaigns on headrest tablets instantly.
                  </p>
                  <a href="#contact" className="text-teal-600 font-semibold hover:underline decoration-2 underline-offset-4 flex items-center gap-1 text-sm">
                    See how it works <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto sm:h-[180px] rounded-xl bg-[#f6f6f6] flex items-center justify-center overflow-hidden">
                  <AnimatedProgress />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Ad Packages Showcase ─── */}
      <section className="py-20 sm:py-28 bg-black text-white flex flex-col items-center overflow-hidden w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10 px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl text-left mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white/95 leading-tight">
                Time to Upgrade.
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <div className="flex overflow-x-auto w-full gap-5 sm:gap-6 pb-10 pt-4 snap-x snap-mandatory hide-scrollbars px-[7.5vw] sm:px-[15vw] md:px-[20vw] xl:px-[calc(50vw-500px)]">
          {/* Card 1 */}
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[1000px] aspect-[4/5] sm:aspect-video flex-shrink-0 snap-center rounded-2xl sm:rounded-3xl bg-[#111] overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 sm:hidden block">
                <Image src="/Static-Billboard.webp" alt="" fill className="object-cover blur-3xl opacity-60 scale-125" />
              </div>
              <Image src="/Static-Billboard.webp" alt="Static Billboard Illustration" fill className="object-contain sm:object-cover relative z-10" priority />
            </div>
            <div className="relative z-10 w-full pt-0 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-8 sm:px-12 md:px-14 flex flex-col gap-2 pointer-events-none translate-y-6 sm:translate-y-0">
              <h3 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">No more.</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[1000px] aspect-[4/5] sm:aspect-video flex-shrink-0 snap-center rounded-2xl sm:rounded-3xl bg-black overflow-hidden group hover:scale-[1.01] transition-transform duration-500 flex flex-col items-center justify-end pb-8 sm:pb-0">
            <div className="absolute top-0 left-0 z-10 w-full pt-0 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-8 sm:px-12 md:px-14 flex flex-col pointer-events-none translate-y-6 sm:translate-y-0">
              <h3 className="text-white/95 font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">Screen is your&apos;s.</h3>
            </div>
            <div
              className="relative w-[95%] sm:w-[85%] md:w-[75%] aspect-square flex items-center justify-center translate-y-8 sm:translate-y-12 md:translate-y-16 lg:translate-y-20"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)'
              }}
            >
              <Image src="/screen-yours.webp" alt="Digital Screen Illustration" fill className="object-contain drop-shadow-2xl" priority />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[1000px] aspect-[4/5] sm:aspect-video flex-shrink-0 snap-center rounded-2xl sm:rounded-3xl bg-[#111] overflow-hidden group hover:scale-[1.01] transition-transform duration-500 flex flex-col">
            <div className="relative z-10 w-full pt-0 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-8 sm:px-12 md:px-14 flex flex-col gap-2 pointer-events-none shrink-0 translate-y-6 sm:translate-y-0">
              <h3 className="text-white/95 font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">Choose your layout.</h3>
            </div>
            <div className="flex-1 min-h-0">
              <AdLayoutSwitcher />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Packages ─── */}
      <section id="pricing" className="py-20 sm:py-28 px-6 bg-[#f6f6f6]">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-14 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-[-0.03em] text-black">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-black/45 max-w-xl mx-auto">
                Choose the reach that fits your goals. All packages include real-time analytics and geofencing.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Launch",
                price: "$150",
                coverage: "50 taxis",
                positioning: "Entry level trial",
                features: ["50 taxi coverage", "Basic geofencing", "Real-time dashboard", "7-day campaign"],
              },
              {
                name: "Local",
                price: "$400",
                coverage: "100 taxis",
                positioning: "Small business campaigns",
                features: ["100 taxi coverage", "Zone targeting", "Performance reports", "14-day campaign"],
              },
              {
                name: "Metro",
                price: "$900",
                coverage: "250 taxis",
                positioning: "Growing brand campaigns",
                popular: true,
                features: ["250 taxi coverage", "Advanced geofencing", "Priority support", "30-day campaign"],
              },
              {
                name: "Citywide",
                price: "$2,000",
                coverage: "500 taxis",
                positioning: "Full Accra coverage",
                features: ["500 taxi coverage", "All zones unlocked", "Dedicated manager", "30-day campaign"],
              },
            ].map((pkg) => (
              <ScrollReveal key={pkg.name} delay={0}>
                <div className={`relative h-full rounded-2xl p-7 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                  pkg.popular
                    ? "bg-black text-white border-black shadow-xl shadow-black/10"
                    : "bg-white text-black border-black/[0.06] hover:border-black/[0.12]"
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-teal-500 text-[11px] font-semibold uppercase tracking-wider text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold tracking-tight">{pkg.name}</h3>
                    <p className={`text-sm mt-1 ${pkg.popular ? "text-white/50" : "text-black/40"}`}>
                      {pkg.positioning}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold tracking-[-0.03em]">{pkg.price}</span>
                    <span className={`text-sm ml-1 ${pkg.popular ? "text-white/40" : "text-black/35"}`}>/mo</span>
                  </div>

                  <div className={`text-sm font-medium mb-6 pb-6 border-b ${pkg.popular ? "text-white/60 border-white/10" : "text-black/50 border-black/[0.06]"}`}>
                    {pkg.coverage}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        <Check className={`w-4 h-4 flex-shrink-0 ${pkg.popular ? "text-teal-400" : "text-teal-600"}`} />
                        <span className={pkg.popular ? "text-white/70" : "text-black/55"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`rounded-full px-5 py-3 text-sm font-semibold text-center transition-colors ${
                      pkg.popular
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-black text-white hover:bg-black/85"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {/* ─── Fleet Partner CTA ─── */}
      <section id="partner" className="py-20 sm:py-28 px-6 bg-white">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-[-0.03em] leading-tight gradient-text">
              Turn your fleet into a <br/> revenue engine.
            </h2>
            <p className="mt-5 text-lg text-black/45 font-normal leading-relaxed max-w-2xl mx-auto">
              Install our premium HD headrest tablets in your cabs and start earning passive income on every ride. We handle everything at no cost to you.
            </p>
            <div className="mt-10 flex justify-center">
              <a href="mailto:fleet@tripadverts.com" className="group cta-glow rounded-full bg-black px-7 py-3.5 text-base font-medium text-white hover:bg-black/85 transition-colors flex items-center gap-2">
                Become a Fleet Partner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-black py-14 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold tracking-tight text-white mb-3">TripAdverts<span className="text-teal-400">.</span></h3>
              <p className="text-sm text-white/40 font-normal">
                Accra&apos;s leading in-vehicle digital advertising platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white/60">Platform</h4>
              <ul className="space-y-2.5 text-sm font-normal text-white/40">
                <li><a href="#features" className="hover:text-white/70 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white/70 transition-colors">How It Works</a></li>
                <li><a href="#partner" className="hover:text-white/70 transition-colors">Fleet Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white/60">Company</h4>
              <ul className="space-y-2.5 text-sm font-normal text-white/40">
                <li><a href="/about" className="hover:text-white/70 transition-colors">About Us</a></li>
                <li><a href="mailto:hello@tripadverts.com" className="hover:text-white/70 transition-colors">Contact</a></li>
                <li><a href="mailto:sales@tripadverts.com" className="hover:text-white/70 transition-colors">Sales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white/60">Legal</h4>
              <ul className="space-y-2.5 text-sm font-normal text-white/40">
                <li><a href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-white/70 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-normal text-white/30">
            <p>&copy; {new Date().getFullYear()} TripAdverts Inc. All rights reserved.</p>
            <p>Accra, Greater Accra, Ghana</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
