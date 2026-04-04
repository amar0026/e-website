"use client";

import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    id: 1,
    label: "Women",
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/56af837a3b84f5af1dbe3579b326071e040e4c25_h2737c.png",
  },
  {
    id: 2,
    label: "Suits & Blazer",
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/4b94f906882ad57d3ac8358705371f6aac7bbfc5_pkmqxv.png",
  },
  {
    id: 3,
    label: "Travel Bags",
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/03f1f636996c975407b5e6b0e516a4188bb5f957_ilbyt1.png",
  },
  {
    id: 4,
    label: "Out Door",
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108997/88ccfe6075518d8b94e74e5da3ff1eed307703f0_lfndej.png",
  },
];

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function CollectionSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-5 sm:px-8 py-10 bg-white">

      {/* ── Header ── */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
          <CloseIcon />
          <span className="tracking-widest uppercase">Categories</span>
        </div>
        <h2
          className="text-[#1a1a1a] font-extrabold leading-tight"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontFamily: "sans-serif" }}
        >
          Our Collection
        </h2>
      </div>

      {/* ── 4-column image grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map(({ id, label, image }) => (
          <Link
            key={id}
            href={`/productdetail/${id}`}
            className="group relative rounded-xl overflow-hidden cursor-pointer block"
            style={{ aspectRatio: "3/4" }}
          >
            {/* Image */}
            <Image
              src={image}
              alt={label}
              fill
              className="object-cover object-top group-hover:scale-105
                         transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, 25vw"
            />

            {/* Label pill — bottom-left */}
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className="inline-block bg-white text-[#1a1a1a] text-xs font-semibold
                           px-3 py-1.5 rounded-md shadow-sm
                           group-hover:bg-[#1a1a1a] group-hover:text-white
                           transition-colors duration-200"
              >
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}