"use client";

import Link from "next/link";
import { useState } from "react";

const COLUMNS = [
  {
    heading: "Customer Care",
    links: [
      { label: "Size Guide",           href: "/size-guide" },
      { label: "Shipping Information", href: "/shipping" },
      { label: "Returns & Exchanges",  href: "/returns" },
      { label: "FAQ",                  href: "/faq" },
      { label: "Wholesale",            href: "/wholesale" },
      { label: "Affiliates",           href: "/affiliates" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About us",      href: "/about" },
      { label: "In The Press",  href: "/press" },
      { label: "Collaborations",href: "/collaborations" },
      { label: "Charities",     href: "/charities" },
      { label: "Careers",       href: "/careers" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "We're Hiring",       href: "/careers" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy",     href: "/privacy" },
      { label: "Blogs",              href: "/blogs" },
    ],
  },
  {
    heading: "Supplies",
    links: [
      { label: "Walk",       href: "/shop/walk" },
      { label: "Bags",       href: "/shop/bags" },
      { label: "Wear",       href: "/shop/wear" },
      { label: "Toys",       href: "/shop/toys" },
      { label: "Beds",       href: "/shop/beds" },
      { label: "Bestseller", href: "/shop/bestseller" },
    ],
  },
];

const linkCls =
  "text-gray-400 text-sm hover:text-white transition-colors duration-150";

export default function Footer() {
  const [search, setSearch] = useState("");

  return (
    <footer className="w-full bg-[#1f1f1f] text-white">

      {/* ── Main grid ── */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10">

          {/* COL 1 — Brand + search */}
          <div className="flex flex-col gap-5">
            <Link href="/"
                  className="text-lg font-black tracking-[0.18em] uppercase text-white
                             hover:opacity-80 transition-opacity">
              VESSA
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
              Need help? Email us at{" "}
              <a href="mailto:info@maxbone.com"
                 className="text-gray-300 hover:text-white transition-colors underline underline-offset-2">
                info@maxbone.com
              </a>
              . We're here for you, and ready to answer your questions.
            </p>

            {/* Search box */}
            <div className="flex items-center border border-gray-600 rounded-md
                            px-4 py-2.5 bg-transparent focus-within:border-gray-400
                            transition-colors max-w-[240px]">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-white
                           placeholder-gray-500 min-w-0"
              />
            </div>
          </div>

          {/* COL 2-5 — Link columns */}
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">{heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkCls}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-gray-700/60">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-10 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs text-gray-500">
          <p>©2025–2026 Overlays Next All Rights Reserved</p>
          <Link href="/privacy"
                className="hover:text-white transition-colors">
            Privacy &amp; Cookie Policy
          </Link>
        </div>
      </div>

    </footer>
  );
}