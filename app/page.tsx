import HeroCanvas from "./components/HeroCanvas";
import { MapPin, Eye, BarChart3, UploadCloud, Target, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-500/30">
      
      {/* Hero Section Container for Scroll Animation */}
      <HeroCanvas>
        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 py-12 lg:px-20 h-full bg-slate-950/60 md:bg-transparent">
          <h1 className="max-w-xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-2xl">
            Captivate Your Audience <br className="hidden sm:block" />
            <span className="text-teal-400">on the Go.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg sm:text-lg text-slate-200 drop-shadow-md">
            Reach thousands of high-intent passengers daily through our premium in-cab digital network.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="rounded-full bg-teal-500 px-8 py-4 text-lg font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-400 hover:-translate-y-1">
              Start Advertising
            </a>
          </div>
        </div>
      </HeroCanvas>

      {/* Social Proof */}
      <section className="bg-white py-16 px-6 z-20 relative border-b border-slate-100">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Trusted by innovative local businesses and global agencies
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-700">
            <div className="text-3xl font-black font-serif tracking-tighter">Margins Group</div>
            <div className="text-2xl font-bold font-sans tracking-tight">Fontissue</div>
            <div className="text-4xl font-black font-sans tracking-tighter text-yellow-500 italic">MTN</div>
            <div className="text-3xl font-bold font-mono tracking-widest text-slate-800">Arena233</div>
            <div className="text-2xl font-medium tracking-widest uppercase border-b-2 border-current pb-1">Debbies</div>
          </div>
        </div>
      </section>

      {/* The Tech Section */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Technology Built for Impact
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our platform delivers precision and engagement like no other out-of-home network.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precision Targeting</h3>
              <p className="text-slate-600">
                Target specific zones, times of day, and demographic hotspots to reach your ideal audience when it matters most.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Deep Engagement</h3>
              <p className="text-slate-600">
                Enjoy incredibly high dwell times with a captive audience inside the ride-sharing vehicle, away from outdoor distractions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-6">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Analytics</h3>
              <p className="text-slate-600">
                Track impressions, interactions, and campaign performance instantly through our intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-900 text-white border-y border-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Launch Your Campaign in Minutes
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              A streamlined, self-serve platform designed for modern advertisers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-800" />
            
            <div className="flex flex-col items-center text-center z-10">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 text-teal-400 mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Upload Creative</h3>
              <p className="text-slate-400">
                Upload your high-definition video or image assets directly to our campaign manager.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center z-10">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 text-teal-400 mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Choose Fleet & Zones</h3>
              <p className="text-slate-400">
                Select your target cities, ride-share fleets, and set specific geofences for delivery.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center z-10">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 text-teal-400 mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Launch & Track</h3>
              <p className="text-slate-400">
                Go live instantly and monitor your campaign's reach and impact in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Partner CTA Section */}
      <section className="py-24 px-6 bg-teal-500 text-slate-900 border-b-8 border-teal-600">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl drop-shadow-sm">
            Turn your fleet into a revenue engine.
          </h2>
          <p className="mt-6 text-xl text-teal-950 font-medium">
            Join the TripAdvert network. Install our premium HD tablets in your cabs and start earning passive income on every ride.
          </p>
          <div className="mt-10">
            <a href="#partner" className="rounded-full bg-slate-900 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 hover:-translate-y-1 inline-flex items-center gap-2">
              Become a Fleet Partner
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-6 relative z-20">
        <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2 border-r border-slate-100 pr-8">
            <h3 className="text-2xl font-black tracking-tighter text-slate-900 mb-4">TripAdvert<span className="text-teal-500">.</span></h3>
            <p className="text-slate-500 mb-8 max-w-sm text-lg leading-relaxed">
              The premier digital out-of-home advertising network. Reach audiences on the move.
            </p>
            <form className="flex gap-2 max-w-sm">
              <input type="email" placeholder="Get marketing insights" className="flex-1 rounded-full border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-slate-400"/>
              <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-800">
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="pl-4">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Advertisers</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Fleet Partners</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div className="pl-4">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-teal-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Blog & News</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-400">
          <p>© {new Date().getFullYear()} TripAdvert Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
