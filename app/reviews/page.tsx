// app/reviews/page.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Types ── */
type Review = {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  product: string;
  productImg: string;
  verified: boolean;
  helpful: number;
  tags?: string[];
};

type SortOption = "newest" | "highest" | "lowest" | "helpful";
type FilterOption = "All" | "5 Stars" | "4 Stars" | "3 Stars" | "2 Stars" | "1 Star";

/* ── Data ── */
const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Camille Rousseau",
    location: "Paris, France",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    date: "March 18, 2025",
    title: "The last coat I will ever need to buy.",
    body: "I have owned this coat for three months. I have worn it in rain, in wind, and in the kind of cold that makes you question living in northern Europe. It has not changed shape. The seams are as crisp as the day I unboxed it. I have owned fast-fashion coats that looked like this. They lasted one season. This one will outlast my current address.",
    product: "Cendre Wool Overcoat",
    productImg: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",
    verified: true,
    helpful: 48,
    tags: ["True to size", "Worth the price", "Exceptional quality"],
  },
  {
    id: "2",
    author: "James Whitmore",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    date: "February 27, 2025",
    title: "Quiet luxury — no irony intended.",
    body: "I was sceptical of the price. I sat with the tab open for two weeks. Then I ordered. The linen shirt arrived folded inside a cotton dust bag, no plastic. First wash: no shrinkage. Sixth month: it looks better, not worse. The weave has softened in the way that only real fabric does. I understand now why people talk about investment dressing.",
    product: "European Linen Shirt",
    productImg: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png",
    verified: true,
    helpful: 35,
    tags: ["Gets better with age", "Sustainable packaging"],
  },
  {
    id: "3",
    author: "Ingrid Halvorsen",
    location: "Oslo, Norway",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 4,
    date: "February 10, 2025",
    title: "Nearly perfect — one small note.",
    body: "The trousers are exceptional in every regard except the length. I am 5'10\" and ordered the standard length, which was about two centimetres short of where I wanted the break to fall. That said, the fabric is extraordinary — a wool-cotton blend that drapes without cling. I have had them taken up professionally and they now look exactly right. I would order again, and I will.",
    product: "Atelier Tapered Trousers",
    productImg: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/d68a6ad8e7f5e344dcea8564d996f4ea5158b5f0_n8nzjm.png",
    verified: true,
    helpful: 22,
    tags: ["Great fabric", "Consider sizing up in length"],
  },
  {
    id: "4",
    author: "Mateo Alves",
    location: "Lisbon, Portugal",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    date: "January 30, 2025",
    title: "Ordered twice. Will order again.",
    body: "The merino rollneck is the most-worn piece in my wardrobe this winter. I bought charcoal first, then cream. The pilling after heavy weekly wear is minimal — less than any wool garment I have owned before. VESSA's explanation of the yarn count made sense; you can feel the density. Not a fashion purchase. A wardrobe purchase.",
    product: "Fine Merino Rollneck",
    productImg: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg",
    verified: true,
    helpful: 61,
    tags: ["Minimal pilling", "True to size", "Repeat buyer"],
  },
  {
    id: "5",
    author: "Astrid Bergmann",
    location: "Stockholm, Sweden",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 3,
    date: "January 15, 2025",
    title: "Delivery was slow — but the product delivered.",
    body: "My order took 16 days to arrive, which is longer than I expected given the price point. Customer service responded to my enquiry within four hours, which I appreciated. The jacket itself is everything I hoped: structured, beautifully lined, with buttons that feel substantial rather than decorative. I am happy with the purchase. I would simply have preferred a more accurate delivery estimate.",
    product: "Structured Jersey Blazer",
    productImg: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",
    verified: true,
    helpful: 17,
    tags: ["Great product, slow shipping"],
  },
  {
    id: "6",
    author: "Elif Şahin",
    location: "Istanbul, Turkey",
    avatar: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    date: "December 20, 2024",
    title: "Finally — a brand that means it.",
    body: "I have tried every slow fashion brand that has appeared in my feed over the past three years. Most deliver disappointment wrapped in recycled tissue paper. VESSA does not. The stitching on the blouse I ordered is the kind of detail that you only notice because it never fails — it just sits there, correctly, every time. The materials feel honest. I am a convert.",
    product: "Lyon Atelier Silk Blouse",
    productImg: "https://res.cloudinary.com/dquki4xol/image/upload/v1775130205/144dd2e1fb36e78425f9f02cafe2d39387efa9cf_1_w7ruoi.png",
    verified: true,
    helpful: 44,
    tags: ["Exceptional stitching", "Honest materials"],
  },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
  { value: "helpful", label: "Most helpful" },
];

const FILTER_OPTIONS: FilterOption[] = ["All", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

/* ── Scroll Reveal Hook ── */
function useReveal(threshold = 0.08) {
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

/* ── Star Rating ── */
function Stars({ rating, size = 12, color = "#c4b59a" }: { rating: number; size?: number; color?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= rating ? color : "none"}
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ── Interactive Star Rating (for form) ── */
function InteractiveStars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24"
            fill={(hovered || value) >= star ? "#c4b59a" : "none"}
            stroke="#c4b59a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "fill 0.15s ease" }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ── Rating Breakdown Bar ── */
function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-gray-500 w-10 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-1.5 bg-[#ede9e2] rounded-full overflow-hidden">
        <div className="h-full bg-[#c4b59a] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-gray-400 w-4 shrink-0">{count}</span>
    </div>
  );
}

/* ── Review Card ── */
function ReviewCard({ review, delay = 0 }: { review: Review; delay?: number }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl border border-[#ede9e2] p-7 hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#dde4ec] shrink-0">
              <Image src={review.avatar} alt={review.author} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a1a1a]">{review.author}</p>
              <p className="text-[10px] text-gray-400">{review.location}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Stars rating={review.rating} />
            <span className="text-[10px] text-gray-400">{review.date}</span>
          </div>
        </div>

        {/* Product badge */}
        <div className="flex items-center gap-2.5 mb-5 p-3 bg-[#f5f3f0] rounded-xl border border-[#ede9e2]">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#dde4ec] shrink-0">
            <Image src={review.productImg} alt={review.product} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] tracking-[0.14em] uppercase text-[#c4b59a] font-bold mb-0.5">Purchased Item</p>
            <p className="text-[10px] font-semibold text-[#1a1a1a] truncate">{review.product}</p>
          </div>
          {review.verified && (
            <span className="flex items-center gap-1 text-[9px] tracking-[0.1em] uppercase text-emerald-600 font-bold shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* Review text */}
        <h4 className="font-bold text-[#1a1a1a] mb-2 leading-snug"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)", fontFamily: "Georgia, serif" }}>
          {review.title}
        </h4>
        <p className="text-xs text-gray-500 leading-[1.85] mb-5">{review.body}</p>

        {/* Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {review.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-[9px] tracking-[0.1em] uppercase font-semibold bg-[#f5f3f0] text-gray-500 border border-[#ede9e2]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Helpful */}
        <div className="flex items-center justify-between pt-4 border-t border-[#ede9e2]">
          <span className="text-[10px] text-gray-400">{helpful} people found this helpful</span>
          <button
            onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }}
            className={`flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase transition-colors px-3 py-1.5 rounded-full border
              ${voted
                ? "border-[#c4b59a] text-[#c4b59a] bg-[#c4b59a]/10"
                : "border-[#ede9e2] text-gray-400 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
              }`}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {voted ? "Helpful" : "Helpful?"}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Write Review Modal ── */
function WriteReviewModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        {submitted ? (
          <div className="flex flex-col items-center justify-center p-14 text-center">
            <div className="w-12 h-12 rounded-full bg-[#c4b59a]/20 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c4b59a" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-black text-[#1a1a1a] mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>Thank you.</p>
            <p className="text-xs text-gray-400">Your review will appear after moderation.</p>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="bg-[#1a1a1a] px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#c4b59a] font-bold mb-1">Share your experience</p>
                <h3 className="text-white font-black" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>Write a Review</h3>
              </div>
              <button onClick={onClose} className="text-[#a09080] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-5">
              {/* Rating */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 font-bold mb-2">Your Rating *</label>
                <InteractiveStars value={rating} onChange={setRating} />
              </div>

              {/* Product */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 font-bold mb-2">Product</label>
                <select className="w-full px-4 py-3 rounded-xl border border-[#ede9e2] text-xs text-[#1a1a1a] bg-white outline-none focus:border-[#c4b59a] transition-colors appearance-none">
                  <option>Cendre Wool Overcoat</option>
                  <option>European Linen Shirt</option>
                  <option>Fine Merino Rollneck</option>
                  <option>Atelier Tapered Trousers</option>
                  <option>Lyon Atelier Silk Blouse</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 font-bold mb-2">Review Title</label>
                <input type="text" placeholder="Summarise your experience"
                  className="w-full px-4 py-3 rounded-xl border border-[#ede9e2] text-xs text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-[#c4b59a] transition-colors" />
              </div>

              {/* Body */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 font-bold mb-2">Your Review</label>
                <textarea rows={4} placeholder="Tell us what you loved — or what could be better."
                  className="w-full px-4 py-3 rounded-xl border border-[#ede9e2] text-xs text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-[#c4b59a] transition-colors resize-none" />
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 font-bold mb-2">Name</label>
                  <input type="text" placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#ede9e2] text-xs text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-[#c4b59a] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 font-bold mb-2">Email</label>
                  <input type="email" placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#ede9e2] text-xs text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-[#c4b59a] transition-colors" />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full py-3.5 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200
                  bg-[#1a1a1a] text-white hover:bg-[#c4b59a] hover:text-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Review
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

/* ── Main Page ── */
export default function ReviewPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showModal, setShowModal] = useState(false);

  /* Derived stats */
  const total = REVIEWS.length;
  const avgRating = REVIEWS.reduce((s, r) => s + r.rating, 0) / total;
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: REVIEWS.filter(r => r.rating === star).length,
  }));

  /* Filter + sort */
  const filtered = REVIEWS
    .filter(r => {
      if (activeFilter === "All") return true;
      const stars = parseInt(activeFilter);
      return r.rating === stars;
    })
    .sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      if (sortBy === "helpful") return b.helpful - a.helpful;
      return 0; // newest — keep original order
    });

  /* Hero parallax */
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
      <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ minHeight: 320 }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute inset-0 overflow-hidden">
          <img ref={heroImgRef}
            src="https://res.cloudinary.com/dquki4xol/image/upload/v1775130057/e625e8e52d36fe1f858d851d32355633a1783ec0_2_hrdpgp.jpg"
            alt="" className="w-full h-full object-cover opacity-20"
            style={{ willChange: "transform", transform: "scale(1.08)" }} />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12 py-20 lg:py-24">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-4">
            — Reviews &nbsp;·&nbsp; VESSA
          </p>
          <h1 className="text-white font-black leading-none mb-4"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            What People Say
          </h1>
          <p className="text-[#a09080] text-sm leading-relaxed max-w-md">
            Unedited. Unsponsored. Every review is from a verified VESSA customer.
          </p>
        </div>
      </div>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12">

        {/* ── SUMMARY PANEL ── */}
        <Reveal className="mb-12">
          <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#ede9e2] bg-white">
            {/* Left — big score */}
            <div className="flex flex-col items-center justify-center px-10 py-12 bg-[#1a1a1a] text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#c4b59a] font-bold mb-3">Overall Rating</p>
              <p className="text-white font-black leading-none mb-2"
                style={{ fontSize: "clamp(4rem, 8vw, 6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.04em" }}>
                {avgRating.toFixed(1)}
              </p>
              <Stars rating={Math.round(avgRating)} size={16} />
              <p className="text-[#a09080] text-xs mt-3">Based on {total} verified reviews</p>
            </div>

            {/* Right — breakdown */}
            <div className="px-8 py-10 flex flex-col justify-center gap-3">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-2">Rating Breakdown</p>
              {ratingCounts.map(({ star, count }) => (
                <RatingBar key={star} label={`${star} ★`} count={count} total={total} />
              ))}
              <button
                onClick={() => setShowModal(true)}
                className="mt-6 px-7 py-3 bg-[#1a1a1a] text-white rounded-full text-xs font-bold tracking-[0.12em] uppercase hover:bg-[#c4b59a] hover:text-[#1a1a1a] transition-all duration-200 self-start">
                Write a Review
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── FILTER + SORT BAR ── */}
        <Reveal className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {FILTER_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setActiveFilter(opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border
                    ${activeFilter === opt
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-gray-500 border-[#ede9e2] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                    }`}>
                  {opt}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] tracking-[0.14em] uppercase text-gray-400 font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 rounded-full border border-[#ede9e2] text-xs font-semibold text-[#1a1a1a] bg-white outline-none focus:border-[#1a1a1a] transition-colors appearance-none cursor-pointer pr-8"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        {/* ── DIVIDER ── */}
        <Reveal className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold">
              {activeFilter === "All" ? "All Reviews" : activeFilter}
            </span>
            <div className="flex-1 h-px bg-[#e0dbd4]" />
            <span className="text-[10px] text-gray-400">{filtered.length} reviews</span>
          </div>
        </Reveal>

        {/* ── REVIEW GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {filtered.map((review, i) => (
              <ReviewCard key={review.id} review={review} delay={i * 60} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center mb-16">
            <p className="text-4xl mb-4">◇</p>
            <p className="text-sm font-bold text-[#1a1a1a] mb-2">No reviews in this category yet.</p>
            <p className="text-xs text-gray-400">Be the first to share your experience.</p>
            <button onClick={() => setShowModal(true)}
              className="mt-6 px-7 py-3 bg-[#1a1a1a] text-white rounded-full text-xs font-bold hover:bg-[#c4b59a] hover:text-[#1a1a1a] transition-all duration-200">
              Write a Review
            </button>
          </div>
        )}

        {/* ── CTA STRIP ── */}
        <Reveal>
          <div className="bg-[#1a1a1a] rounded-2xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-2">Experienced VESSA?</p>
              <h3 className="text-white font-black leading-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                Your words matter.
              </h3>
              <p className="text-[#a09080] text-sm max-w-sm leading-relaxed">
                Honest reviews help others make considered decisions. We read every one, and we never edit them.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowModal(true)}
                className="px-7 py-3 bg-white text-[#1a1a1a] rounded-full text-xs font-bold hover:bg-[#f5f3f0] transition-colors whitespace-nowrap">
                Write a Review
              </button>
              <Link href="/products"
                className="px-7 py-3 bg-transparent text-white border border-white/30 rounded-full text-xs font-bold hover:border-[#c4b59a] hover:text-[#c4b59a] transition-colors whitespace-nowrap text-center">
                Shop the Collection
              </Link>
            </div>
          </div>
        </Reveal>

      </main>

      {/* ── MODAL ── */}
      {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}
    </div>
  );
}