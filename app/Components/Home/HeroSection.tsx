"use client";

import Image from "next/image";

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const AVATARS = [
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775049414/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_ejkyi9.png",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775049413/5dcd8ba10380cf4489d888c5172bb0f826cafbf1_1_wrzlxp.jpg",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775049412/e625e8e52d36fe1f858d851d32355633a1783ec0_1_rdxzm4.jpg",
];

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[420px]">

        {/* ── LEFT: beige/taupe panel ── */}
        <div
          className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16"
          style={{ background: "#d8d3c8" }}
        >
          {/* Heading */}
          <h1
            className="text-[#1a1a1a] font-extrabold leading-tight mb-4 sm:mb-5"
            style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
            }}
          >
            Wear Your Confidence
          </h1>

          {/* Description */}
          <p className="text-[#3a3a3a] text-sm leading-relaxed max-w-xs mb-6 sm:mb-8">
            Modern fashion blends minimalism, bold typography, and clean layouts with
            high-quality visuals. Focus on neutral palettes with accent colors, large
            product images, smooth animations, and intuitive navigation.
          </p>

          {/* Shop Now button */}
          <div className="mb-8 sm:mb-10">
            <button
              className="flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a]
                         rounded-full px-6 py-2.5 text-sm font-medium bg-transparent
                         hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
            >
              Shop Now <ChevronDown />
            </button>
          </div>

          {/* Social proof card */}
          <div className="inline-flex flex-col gap-2 bg-white rounded-xl px-4 py-3 w-fit shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white
                               -ml-2 first:ml-0"
                  >
                    <Image
                      src={src}
                      alt={`customer ${i + 1}`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[#1a1a1a] font-extrabold text-base">50+</span>
            </div>
            <p className="text-xs text-gray-500 leading-snug max-w-[160px]">
              Join our growing community of customers
            </p>
          </div>
        </div>

        {/* ── RIGHT: light blue-grey panel with 3 model images ── */}
        <div
          className="flex-[1.2] relative flex hidden md:block items-end justify-center overflow-hidden min-h-[300px] sm:min-h-[380px] md:min-h-[420px]"
          style={{ background: "#dde4ec" }}
        >
          {/* Main center model */}
          <div className="relative z-10 h-[96%] w-[40%] max-w-[240px] self-end">
            <Image
              src="https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/c0e3db74138bdd0508af32c4b91a46f45c6fbdee_psseso.png"
              alt="Main model"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Top-right smaller model */}
          <div
            className="absolute top-3 right-3 sm:top-4 sm:right-5 z-20 rounded-xl overflow-hidden"
            style={{ width: "28%", maxWidth: 155, aspectRatio: "3/4" }}
          >
            <Image
              src="https://res.cloudinary.com/dquki4xol/image/upload/v1775048545/80e9a236a39d0c855c5d4a3c888dfc443a5412a3_ccxmz8.png"
              alt="Model 2"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom-right smaller model */}
          <div
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 z-20 rounded-xl overflow-hidden"
            style={{ width: "28%", maxWidth: 155, aspectRatio: "3/4" }}
          >
            <Image
              src="https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/1579733d0c3681a81a49ae45c5ef7ef77f3c1b5d_bcnjot.png"
              alt="Model 3"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}