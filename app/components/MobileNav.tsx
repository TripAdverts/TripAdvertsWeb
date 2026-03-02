"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#features", label: "Features", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { href: "#how-it-works", label: "How It Works", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { href: "/about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", isLink: true },
  { href: "#partner", label: "Fleet Partners", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(true)}
        className="w-10 h-10 flex items-center justify-center text-slate-700"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-teal-400 to-teal-600" />

        <nav className="flex flex-col px-5 pt-10 pb-6 h-full">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-4 px-3">
            Navigation
          </p>

          <div className="flex flex-col gap-1">
            {links.map(({ href, label, icon, isLink }) => {
              const className = "flex items-center gap-3 px-3 py-3.5 rounded-xl text-[15px] text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors";
              const content = (
                <>
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                  </svg>
                  {label}
                </>
              );

              return isLink ? (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={className}>
                  {content}
                </Link>
              ) : (
                <a key={href} href={href} onClick={() => setOpen(false)} className={className}>
                  {content}
                </a>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-teal-500 px-5 py-3.5 text-[15px] font-semibold text-slate-950 text-center hover:bg-teal-400 transition-colors"
          >
            Get in Touch
          </a>

          <p className="mt-5 text-center text-xs text-slate-600">
            hello@tripadverts.com
          </p>
        </nav>
      </div>
    </div>
  );
}
