"use client";

import Image from "next/image";
import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    tag1: "Style Guide",
    tag2: "Winter 2025",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png",
    description:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends",
    href: "/articles/1",
  },
  {
    id: 2,
    tag1: "Trend Report",
    tag2: "Spring 2025",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg",
    description:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends",
    href: "/articles/2",
  },
  {
    id: 3,
    tag1: "How To Wear",
    tag2: "Layering Tips",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775129599/5dcd8ba10380cf4489d888c5172bb0f826cafbf1_2_zxibvz.jpg",
    description:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends",
    href: "/articles/3",
  },
];

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function ArticlesSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto bg-white px-5 sm:px-8 py-10">

      {/* ── Header ── */}
      <div className="mb-7">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
          <CloseIcon />
          <span className="tracking-widest uppercase">Exclusives Finds</span>
        </div>
        <h2
          className="text-[#1a1a1a] font-extrabold leading-tight"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontFamily: "sans-serif" }}
        >
          Articles &amp; Resources
        </h2>
      </div>

      {/* ── 3-column card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {ARTICLES.map(({ id, tag1, tag2, image, description, href }) => (
          <Link
            key={id}
            href={`/productdetail/${id}`}
            className="group flex flex-col border border-gray-200 rounded-xl overflow-hidden
                       hover:shadow-md transition-shadow duration-200 bg-white"
          >
            {/* ── Top tag row ── */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#1a1a1a]">{tag1}</span>
              <span className="text-sm font-semibold text-[#1a1a1a]">{tag2}</span>
            </div>

            {/* ── Image ── */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image
                src={image}
                alt={tag1}
                fill
                className="object-cover object-top group-hover:scale-105
                           transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>

            {/* ── Bottom content ── */}
            <div className="px-4 pt-4 pb-5 flex flex-col gap-3">
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

              {/* shop now link */}
              <div className="flex items-center gap-1 text-sm font-semibold text-[#1a1a1a]
                              group-hover:text-gray-500 transition-colors duration-150">
                shop now <ChevronRight />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}