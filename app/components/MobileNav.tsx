"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#how-it-works", label: "How It Works", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { href: "#pricing", label: "Pricing", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "/about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", isLink: true },
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
        className="w-10 h-10 flex items-center justify-center text-black/70"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center text-black/50 hover:text-black transition-colors" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 pb-6 h-[calc(100%-72px)]">
          <div className="flex flex-col gap-0.5">
            {links.map(({ href, label, icon, isLink }) => {
              const className = "flex items-center gap-3 px-3 py-3.5 rounded-xl text-[15px] text-black/70 hover:text-black hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors";
              const content = (
                <>
                  <svg className="w-5 h-5 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-full bg-black px-5 py-3.5 text-[15px] font-semibold text-white text-center hover:bg-black/85 transition-colors"
          >
            Login
          </Link>

          <p className="mt-4 text-center text-xs text-black/35">
            hello@tripadverts.com
          </p>
        </nav>
      </div>
    </div>
  );
}
