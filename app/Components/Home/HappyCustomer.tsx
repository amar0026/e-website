"use client";

import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    title: "Exclusive Winter sale save more!",
    review:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends, enjoy huge discounts, and stay warm in style. Limited time only—don't miss out!",
    name: "Arijit Mitra",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1773835825/803849e0a8e2bfb957a89c7b03a52de227ad2acc_vqmugp.jpg",
  },
  {
    id: 2,
    title: "Exclusive Winter sale save more!",
    review:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends, enjoy huge discounts, and stay warm in style. Limited time only—don't miss out!",
    name: "Arijit Mitra",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1773835826/e625e8e52d36fe1f858d851d32355633a1783ec0_dupxse.jpg",
  },
];

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function HappyCustomers() {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-5 bg-white  sm:px-8 py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
          <CloseIcon />
          <span className="tracking-widest uppercase">Customers</span>
        </div>
        <h2
          className="text-[#1a1a1a] font-extrabold leading-tight"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontFamily: "sans-serif" }}
        >
          Happy Customers
        </h2>
      </div>

      {/* ── 2-column testimonial cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {TESTIMONIALS.map(({ id, title, review, name, image }) => (
          <div
            key={id}
            className="flex rounded-2xl overflow-hidden bg-[#f0ede8]"
            style={{ minHeight: 220 }}
          >
            {/* Left: text */}
            <div className="flex-1 flex flex-col justify-between px-6 py-7">
              <div className="flex flex-col gap-3">
                <h3 className="text-[#1a1a1a] font-extrabold text-base leading-snug">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{review}</p>
              </div>

              {/* Customer name */}
              <p className="text-[#1a1a1a] font-bold text-sm mt-5">{name}</p>
            </div>

            {/* Right: image — taller, bleeds to edges */}
            <div className="relative w-40 sm:w-48 shrink-0">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}