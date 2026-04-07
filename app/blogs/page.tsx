"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../Components/Home/Navbar";

/* ── Types ── */
type Post = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  img: string;
  featured?: boolean;
};

/* ── Data ── */
const CATEGORIES = ["All", "Sustainability", "Craft", "Style", "Behind the Brand", "Materials"];

const POSTS: Post[] = [
  {
    id: "1",
    category: "Sustainability",
    title: "Why We Removed Every Synthetic Fibre from Our Supply Chain",
    excerpt: "In 2020, we made a decision that cost us six months of production. Here is why we have never looked back — and what we learned along the way.",
    author: "Mara Leclerc",
    date: "March 12, 2025",
    readTime: "8 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg",
    featured: true,
  },
  {
    id: "2",
    category: "Craft",
    title: "Inside the Lyon Atelier: A Day with Our Master Tailors",
    excerpt: "We spent three days inside the workshop where every VESSA seam is pressed by hand. What we witnessed was nothing short of devotion.",
    author: "Sofia Andersson",
    date: "February 28, 2025",
    readTime: "6 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",
  },
  {
    id: "3",
    category: "Materials",
    title: "The Case for European Linen: A Fabric Worth Waiting For",
    excerpt: "Linen takes 100 days to grow. Ours takes longer — because we only source from mills that let it. A deep dive into our most beloved fabric.",
    author: "Mara Leclerc",
    date: "February 10, 2025",
    readTime: "5 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png",
  },
  {
    id: "4",
    category: "Style",
    title: "CENDRE SS25: The Story Behind the Ash Palette",
    excerpt: "The new collection began with a single image: volcanic rock in the Faroe Islands at dusk. How a landscape became a wardrobe.",
    author: "Sofia Andersson",
    date: "January 22, 2025",
    readTime: "4 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/d68a6ad8e7f5e344dcea8564d996f4ea5158b5f0_n8nzjm.png",
  },
  {
    id: "5",
    category: "Behind the Brand",
    title: "What B Corp Certification Actually Means for a Fashion Brand",
    excerpt: "We are often asked what our B Corp status means in practice. The answer is harder — and more honest — than most brands admit.",
    author: "Mara Leclerc",
    date: "January 5, 2025",
    readTime: "7 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",
  },
  {
    id: "6",
    category: "Sustainability",
    title: "Our Net Zero Roadmap: Progress, Setbacks, and What Comes Next",
    excerpt: "Publishing a roadmap is easy. Following it is not. A transparent account of where we stand two years in.",
    author: "Mara Leclerc",
    date: "December 18, 2024",
    readTime: "9 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg",
  },
  {
    id: "7",
    category: "Craft",
    title: "Hand-Pressing vs. Machine Pressing: Why the Difference Matters",
    excerpt: "A single seam, two methods, decades of difference. Our head tailor explains what happens to a garment when craft is replaced by speed.",
    author: "Sofia Andersson",
    date: "December 2, 2024",
    readTime: "5 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",
  },
  {
    id: "8",
    category: "Style",
    title: "Building a Wardrobe That Lasts: The VESSA Ten-Year Rule",
    excerpt: "We design every piece to be worn for at least a decade. Here is what that constraint forces us to do differently — and what it means for you.",
    author: "Sofia Andersson",
    date: "November 14, 2024",
    readTime: "6 min read",
    img: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png",
  },
];

/* ── Scroll Reveal Hook ── */
function useReveal(threshold = 0.1) {
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

function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right"; className?: string;
}) {
  const [ref, visible] = useReveal();
  const translate =
    direction === "up" ? "translateY(28px)"
    : direction === "left" ? "translateX(-28px)"
    : "translateX(28px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : translate,
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── Arrow Icon ── */
const ArrowRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Post Card ── */
function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  return (
    <Reveal delay={delay}>
      
      <Link href={`/blogs/${post.id}`} className="group block bg-white rounded-2xl border border-[#ede9e2] overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative overflow-hidden bg-[#dde4ec]" style={{ aspectRatio: "16/10" }}>
        
          <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#1a1a1a] text-[#c4b59a] text-[9px] tracking-[0.18em] uppercase font-bold rounded-full px-3 py-1">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] text-gray-400 font-medium">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[10px] text-gray-400 font-medium">{post.readTime}</span>
          </div>
          <h3 className="font-extrabold text-[#1a1a1a] leading-snug mb-3 group-hover:text-[#c4b59a] transition-colors duration-200"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", fontFamily: "Georgia, serif" }}>
            {post.title}
          </h3>
          <p className="text-xs text-gray-500 leading-[1.8] mb-5 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.12em] uppercase text-gray-400 font-bold">{post.author}</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#1a1a1a] group-hover:text-[#c4b59a] transition-colors">
              Read <ArrowRightIcon />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ── Main Page ── */
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = POSTS.find(p => p.featured)!;
  const filtered = POSTS.filter(p => !p.featured && (activeCategory === "All" || p.category === activeCategory));

  /* hero parallax */
  const heroImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.2}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">

      {/* ── HERO BANNER ── */}
      <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ minHeight: 360 }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute inset-0 overflow-hidden">
          <img ref={heroImgRef}
            src="https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg"
            alt="" className="w-full h-full object-cover opacity-20"
            style={{ willChange: "transform", transform: "scale(1.08)" }} />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-4">
            — Journal &nbsp;·&nbsp; VESSA
          </p>
          <h1 className="text-white font-black leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            The Journal
          </h1>
          <p className="text-[#a09080] text-sm leading-relaxed max-w-md">
            Craft, ethics, materials, and the slow philosophy behind every piece we make.
          </p>
        </div>
      </div>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12">

        {/* ── FEATURED POST ── */}
        <Reveal className="mb-14">
          <Link href={`/blogs/${featured.id}`} className="group block">
            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#ede9e2] bg-white hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative overflow-hidden bg-[#dde4ec]" style={{ minHeight: 340 }}>
                <Image src={featured.img} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center px-8 lg:px-14 py-10 lg:py-14 bg-[#1a1a1a]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-[#c4b59a] text-[#1a1a1a] text-[9px] tracking-[0.18em] uppercase font-black rounded-full px-3 py-1">
                    Featured
                  </span>
                  <span className="text-[9px] tracking-[0.16em] uppercase text-[#c4b59a]/70 font-bold">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-white font-black leading-snug mb-4"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                  {featured.title}
                </h2>
                <p className="text-[#a09080] text-sm leading-[1.85] mb-8">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.14em] uppercase text-[#c4b59a] font-bold">{featured.author}</p>
                    <p className="text-[10px] text-[#a09080] mt-0.5">{featured.date} · {featured.readTime}</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#c4b59a] transition-colors">
                    Read Essay <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* ── CATEGORY FILTER ── */}
        <Reveal className="mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border
                  ${activeCategory === cat
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-white text-gray-500 border-[#ede9e2] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── DIVIDER ── */}
        <Reveal className="mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold">
              {activeCategory === "All" ? "All Essays" : activeCategory}
            </span>
            <div className="flex-1 h-px bg-[#e0dbd4]" />
            <span className="text-[10px] text-gray-400">{filtered.length} articles</span>
          </div>
        </Reveal>

        {/* ── POST GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} delay={i * 60} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center mb-16">
            <p className="text-4xl mb-4">◇</p>
            <p className="text-sm font-bold text-[#1a1a1a] mb-2">No essays in this category yet.</p>
            <p className="text-xs text-gray-400">Check back soon — we write slowly and deliberately.</p>
          </div>
        )}

        {/* ── NEWSLETTER CTA ── */}
        <Reveal>
          <div className="bg-[#1a1a1a] rounded-2xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-2">The Journal</p>
              <h3 className="text-white font-black leading-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                Essays, twice a month.
              </h3>
              <p className="text-[#a09080] text-sm max-w-sm leading-relaxed">
                No trend reports. No promotions. Just thoughtful writing on craft, materials, and slow fashion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-[#a09080] text-xs outline-none focus:border-[#c4b59a] transition-colors w-full sm:w-56"
              />
              <button className="px-7 py-3 bg-white text-[#1a1a1a] rounded-full text-xs font-bold hover:bg-[#f5f3f0] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>

      </main>
    </div>
  );
}