"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#2a2a2a]">
      <nav className="max-w-6xl mx-auto px-6 py-5 flex flex-col items-center">
        {/* Centered logo — wordmark only, no tagline */}
        <Link href="/" className="flex items-center justify-center mb-3">
          <img
            src="/brand/logo-wordmark-only.png"
            alt="LIM3S"
            className="h-20 md:h-32 w-auto"
          />
        </Link>

        {/* Desktop nav - centered below logo */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest text-[#999] hover:text-white transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-xs uppercase tracking-widest text-[#999] hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="text-xs uppercase tracking-widest text-[#999] hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-xs uppercase tracking-widest text-[#999] hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/cart"
            className="text-xs uppercase tracking-widest text-white border border-[#2a2a2a] px-4 py-2 hover:border-white transition-colors"
          >
            Cart
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white absolute right-6 top-5"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#2a2a2a] px-6 py-4 flex flex-col gap-4">
          <Link href="/shop" className="text-sm uppercase tracking-widest text-[#999] hover:text-white" onClick={() => setOpen(false)}>
            Shop
          </Link>
          <Link href="/about" className="text-sm uppercase tracking-widest text-[#999] hover:text-white" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/faq" className="text-sm uppercase tracking-widest text-[#999] hover:text-white" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link href="/contact" className="text-sm uppercase tracking-widest text-[#999] hover:text-white" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link href="/cart" className="text-sm uppercase tracking-widest text-white border border-[#2a2a2a] px-4 py-2 text-center" onClick={() => setOpen(false)}>
            Cart
          </Link>
        </div>
      )}
    </header>
  );
}