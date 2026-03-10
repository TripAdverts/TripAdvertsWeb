"use client"

import React from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import SmoothScrollLink from './SmoothScrollLink';

export default function NavBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          TripAdverts<span className="text-teal-400">.</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-white/60">
          <SmoothScrollLink href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </SmoothScrollLink>
          <SmoothScrollLink href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </SmoothScrollLink>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/login" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition-colors">
            Login
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
