"use client"

import React from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import SmoothScrollLink from './SmoothScrollLink';

export default function NavBar() {
  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-black/[0.04] dark:border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 py-[15px] flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          TripAdverts<span className="text-teal-500">.</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-black/60 dark:text-white/60">
          <SmoothScrollLink href="#features" className="hover:text-black dark:hover:text-white transition-colors">
            Features
          </SmoothScrollLink>
          <SmoothScrollLink href="#how-it-works" className="hover:text-black dark:hover:text-white transition-colors">
            How It Works
          </SmoothScrollLink>
          <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
          <SmoothScrollLink href="#contact" className="rounded-full bg-black/90 dark:bg-white/90 px-4 py-2 text-sm font-semibold text-white dark:text-black hover:scale-105 transition-transform">
            Contact Sales
          </SmoothScrollLink>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
