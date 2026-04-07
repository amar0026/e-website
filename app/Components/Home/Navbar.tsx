"use client";

import { useState } from "react";
import Link from "next/link";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/ourstorypage" },
  { label: "Collection", href: "/collection" },
  { label: "Blogs", href: "/blogs" },
  { label: "Reviews", href: "/reviews" },
];

// Cart item count — replace with your real cart state/context
const CART_COUNT = 3;

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="text-xl font-black tracking-[0.15em] text-black uppercase shrink-0
                     hover:opacity-80 transition-opacity"
          style={{ fontFamily: "sans-serif", letterSpacing: "0.18em" }}
        >
          VESSA
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-gray-700 hover:text-black   transition-colors duration-150
                         whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Right: Search + Icons ── */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search box */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md
                          px-3 py-1.5 text-sm text-gray-400 bg-white
                          focus-within:border-gray-500 transition-colors w-36">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700
                         placeholder-gray-400 w-full"
            />
          </div>

          {/* User */}
          <button
            aria-label="Account"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <UserIcon />
          </button>

          {/* Cart — navigates to /cart */}
          <Link
            href="/addtocart"
            aria-label="Cart"
            className="relative text-gray-700 hover:text-black transition-colors"
          >
            <CartIcon />
            {CART_COUNT > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px]
                               font-bold rounded-full w-4 h-4 flex items-center justify-center
                               leading-none">
                {CART_COUNT}
              </span>
            )}
          </Link>
        </div>

        {/* ── Mobile: icons + hamburger ── */}
        <div className="flex md:hidden items-center gap-3">
          <button aria-label="Account" className="text-gray-700">
            <UserIcon />
          </button>

          {/* Cart — navigates to /cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-gray-700 hover:text-black transition-colors"
          >
            <CartIcon />
            {CART_COUNT > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px]
                               font-bold rounded-full w-4 h-4 flex items-center justify-center
                               leading-none">
                {CART_COUNT}
              </span>
            )}
          </Link>

          <button
            aria-label="Menu"
            className="text-gray-700"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md
                          px-3 py-2 text-sm text-gray-400 bg-white w-full">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700
                         placeholder-gray-400 w-full"
            />
          </div>

          {/* Links */}
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-700 hover:text-black transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}