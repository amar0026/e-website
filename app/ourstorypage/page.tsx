"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";


/* ── Types ── */
type Milestone = { year: string; title: string; desc: string };
type Value = { num: string; title: string; body: string; icon: string };
type Founder = { name: string; role: string; bio: string; img: string; origin: string };
type Stat = { value: string; label: string };

/* ── Data ── */
const MILESTONES: Milestone[] = [
  { year: "2018", title: "Founded in Milan", desc: "Sofia Andersson and Mara Leclerc sign the first atelier partnership in Lyon. VESSA is born from a single conviction." },
  { year: "2019", title: "Debut Collection: BLANC", desc: "300 pieces. Sold out in 18 days. Vogue Italia names VESSA a brand to watch. The philosophy is validated." },
  { year: "2020", title: "A Necessary Pause", desc: "The pandemic forces a rethink. Every synthetic material is removed from the supply chain — entirely, permanently." },
  { year: "2021", title: "Certified & Committed", desc: "GOTS and B Corp certification achieved. Flagship concept space opens in Milan's Brera district." },
  { year: "2023", title: "NUIT Collection", desc: "Our most complete creative vision. Net Zero roadmap published. 50,000 customers across 38 countries." },
  { year: "2025", title: "CENDRE — SS25", desc: "18 pieces. Ash tones, architectural silhouettes. Seven years in, we are still asking the same first question." },
];

const VALUES: Value[] = [
  { num: "01", title: "Slow Fashion", body: "Two collections per year. No markdowns, no overproduction. Each piece is designed to be worn for a decade — then passed on to someone who will love it equally.", icon: "◇" },
  { num: "02", title: "Ethical Production", body: "Every factory partner is audited annually. Fair wages and safe conditions are our baseline, not a bonus. We publish every partner name on our website.", icon: "◈" },
  { num: "03", title: "Conscious Materials", body: "GOTS-certified organic cotton, European linen, RWS-certified wool. We use natural fibres exclusively and publish our full supply chain without exception.", icon: "◉" },
];

const FOUNDERS: Founder[] = [
  {
    name: "Sofia Andersson",
    role: "Creative Director",
    bio: "Trained at Central Saint Martins, Sofia spent a decade at Maison Margiela before founding VESSA. Her approach to design is rigorous and deeply personal — she refuses to create anything she would not wear herself.",
    origin: "Stockholm, 1982",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",
  },
  {
    name: "Mara Leclerc",
    role: "Head of Operations & Sustainability",
    bio: "With a background in supply chain ethics at the Ellen MacArthur Foundation, Mara ensures VESSA's values are embedded in every step — from the field where the cotton grows to the last thread of the final stitch.",
    origin: "Lyon, 1984",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",
  },
];

const STATS: Stat[] = [
  { value: "7+", label: "Years of craft" },
  { value: "42", label: "Atelier partners" },
  { value: "98%", label: "Natural fibres" },
  { value: "2", label: "Collections / year" },
];

const ATELIER_IMAGES = [
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/d68a6ad8e7f5e344dcea8564d996f4ea5158b5f0_n8nzjm.png",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",
  "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",
];

/* ── Icons ── */
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Scroll Reveal Hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/* ── Animated Counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [ref, visible] = useReveal(0.4);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (1600 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Reveal Wrapper ── */
function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right"; className?: string;
}) {
  const [ref, visible] = useReveal();
  const translate =
    direction === "up" ? "translateY(32px)"
    : direction === "left" ? "translateX(-32px)"
    : "translateX(32px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translate,
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Main Page ── */
export default function OurStoryPage() {
  const [activeTab, setActiveTab] = useState<"story" | "values" | "founders" | "timeline">("story");

  /* hero parallax */
  const heroImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">
     
      {/* HERO BANNER */}
      <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ minHeight: 440 }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroImgRef}
            src="https://images.unsplash.com/photo-1558171813-2759a0b9fd7c?w=1800&q=85"
            alt=""
            className="w-full h-full object-cover opacity-25"
            style={{ willChange: "transform", transform: "scale(1.08)" }}
          />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12 py-20 lg:py-32 flex flex-col items-start justify-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-4">
            — Est. 2018 &nbsp;·&nbsp; Milan
          </p>
          <h1
            className="text-white font-black leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
          >
            Our Story
          </h1>
          <p className="text-[#a09080] text-sm leading-relaxed max-w-lg mb-8">
            VESSA was born from a single conviction: that truly beautiful clothing should never ask you to compromise
            comfort, ethics, or longevity.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {(["story", "values", "founders", "timeline"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(tab)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border capitalize
                  ${activeTab === tab
                    ? "bg-white text-[#1a1a1a] border-white"
                    : "bg-transparent text-[#c4b59a] border-[#c4b59a]/40 hover:border-[#c4b59a] hover:text-white"
                  }`}
              >
                {tab === "story" ? "The Beginning" : tab === "values" ? "Our Values" : tab === "founders" ? "Founders" : "Timeline"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12">

        {/* STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
          {STATS.map(({ value, label }) => {
            const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
            const suffix = value.replace(/[0-9.]/g, "");
            return (
              <div key={label} className="bg-white rounded-2xl border border-[#ede9e2] px-6 py-5 flex flex-col items-center justify-center text-center">
                <p className="font-black leading-none mb-1 text-[#1a1a1a]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}>
                  <Counter target={numericPart} suffix={suffix} />
                </p>
                <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-bold">{label}</p>
              </div>
            );
          })}
        </div>

        {/* THE BEGINNING */}
        <section id="story" className="mb-20 scroll-mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold">Chapter 01</span>
              <div className="flex-1 h-px bg-[#e0dbd4]" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden bg-[#dde4ec]" style={{ aspectRatio: "4/5" }}>
                <Image src="https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png"
                  alt="Atelier craftsmanship" fill className="object-cover object-center hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4 bg-[#1a1a1a] text-white rounded-2xl px-5 py-4">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#c4b59a] font-bold mb-0.5">The Beginning</p>
                  <p className="text-2xl font-black" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>2018</p>
                </div>
              </div>
            </Reveal>
            <div className="flex flex-col gap-5">
              <Reveal delay={80}>
                <h2 className="font-black leading-tight text-[#1a1a1a]"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                  Crafted with intention,<br />made to endure.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-sm text-gray-500 leading-[1.85]">
                  Every VESSA piece begins with a question: does this design serve the woman who will wear it,
                  or merely the trend that inspired it? We work exclusively with atelier partners in Milan and
                  Lyon — small studios where craftspeople still press seams by hand.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="text-sm text-gray-500 leading-[1.85]">
                  Our fabrics are sourced from certified mills. Our production runs are deliberate and small.
                  We would rather disappoint a trend cycle than compromise the integrity of a garment.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <Link href="/collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-xs font-bold hover:bg-[#333] transition-colors self-start mt-2">
                  View Collection <ArrowRightIcon />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PULL QUOTE */}
        <Reveal className="mb-20">
          <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a]" style={{ minHeight: 320 }}>
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
            <div className="absolute inset-0 overflow-hidden">
              <img src="https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg"
                alt="" className="w-full h-full object-cover opacity-20" />
            </div>
            <div className="relative px-8 md:px-16 lg:px-24 py-16 lg:py-24 max-w-4xl">
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-6">— Sofia Andersson, Creative Director</p>
              <p className="text-white font-light leading-snug"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}>
                "We design for the woman who does not follow fashion — she uses it, thoughtfully, to say something true about herself."
              </p>
            </div>
          </div>
        </Reveal>

        {/* OUR VALUES */}
        <section id="values" className="mb-20 scroll-mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold">Chapter 02</span>
              <div className="flex-1 h-px bg-[#e0dbd4]" />
            </div>
            <h2 className="font-black text-[#1a1a1a] mb-10"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              Three commitments. No exceptions.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {VALUES.map(({ num, title, body, icon }, i) => (
              <Reveal key={num} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-[#ede9e2] p-6 lg:p-8 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-4xl font-black text-[#1a1a1a]/10 leading-none" style={{ fontFamily: "Georgia, serif" }}>{num}</span>
                    <span className="text-xl text-[#c4b59a]">{icon}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#1a1a1a] mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-[1.85] flex-1">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ATELIER IMAGE STRIP */}
        <Reveal className="mb-20 -mx-6 lg:-mx-12">
          <div className="flex gap-3 px-6 lg:px-12 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {ATELIER_IMAGES.map((src, i) => (
              <div key={i} className="shrink-0 rounded-2xl overflow-hidden bg-[#dde4ec]"
                style={{ width: "clamp(140px, 20vw, 240px)", aspectRatio: "3/4" }}>
                <img src={src} alt={`Atelier ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* FOUNDERS */}
        <section id="founders" className="mb-20 scroll-mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold">Chapter 03</span>
              <div className="flex-1 h-px bg-[#e0dbd4]" />
            </div>
            <h2 className="font-black text-[#1a1a1a] mb-10"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              The people behind the brand.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {FOUNDERS.map(({ name, role, bio, img, origin }, i) => (
              <Reveal key={name} delay={i * 120}>
                <div className="group bg-white rounded-2xl border border-[#ede9e2] overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="relative overflow-hidden bg-[#dde4ec]" style={{ aspectRatio: "16/9" }}>
                    <Image src={img} alt={name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#1a1a1a] text-[#c4b59a] text-[9px] tracking-[0.18em] uppercase font-bold rounded-full px-3 py-1">{origin}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-gray-400 font-bold mb-1">VESSA</p>
                    <h3 className="text-lg font-extrabold text-[#1a1a1a] mb-0.5">{name}</h3>
                    <p className="text-xs font-semibold text-[#c4b59a] uppercase tracking-widest mb-4">{role}</p>
                    <p className="text-sm text-gray-500 leading-[1.85]">{bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="mb-20 scroll-mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold">Chapter 04</span>
              <div className="flex-1 h-px bg-[#e0dbd4]" />
            </div>
            <h2 className="font-black text-[#1a1a1a] mb-10"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              Seven years, one direction.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-0">
            {MILESTONES.map(({ year, title, desc }, i) => (
              <Reveal key={year} delay={i * 70}>
                <div className="group grid grid-cols-12 gap-4 bg-white rounded-2xl border border-[#ede9e2] px-6 py-5 mb-2 hover:shadow-md transition-all duration-300 items-center">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="font-black text-[#1a1a1a]/20 leading-none"
                      style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>
                      {year}
                    </p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-px h-8 bg-[#e0dbd4] group-hover:bg-[#c4b59a] transition-colors" />
                  </div>
                  <div className="col-span-9 sm:col-span-10">
                    <p className="text-sm font-extrabold text-[#1a1a1a] mb-0.5">{title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* BOTTOM EDITORIAL STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {[
            { label: "Slow Fashion", sub: "Two collections a year, no exceptions", icon: "◇" },
            { label: "Ethical Production", sub: "Every partner published, every year", icon: "◈" },
            { label: "Certified Materials", sub: "GOTS, B Corp, RWS certified", icon: "◉" },
          ].map(({ label, sub, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#ede9e2] px-6 py-5 flex items-center gap-4">
              <span className="text-2xl text-[#c4b59a]">{icon}</span>
              <div>
                <p className="text-sm font-extrabold text-[#1a1a1a]">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="bg-[#1a1a1a] rounded-2xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-2">Explore VESSA</p>
              <h3 className="text-white font-black leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                The current collection awaits.
              </h3>
              <p className="text-[#a09080] text-sm mt-2 max-w-md leading-relaxed">
                Refined silhouettes, intentional fabrics, and enduring style — crafted to move with you through every season.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/collection"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#1a1a1a] rounded-full text-xs font-bold hover:bg-[#f5f3f0] transition-colors whitespace-nowrap">
                View Collection <ArrowRightIcon />
              </Link>
              <Link href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 border border-[#c4b59a]/40 text-[#c4b59a] rounded-full text-xs font-bold hover:border-[#c4b59a] transition-colors whitespace-nowrap">
                Shop All
              </Link>
            </div>
          </div>
        </Reveal>

      </main>
    </div>
  );
}