
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


/* ── Types ── */
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  tag?: string;
  category: string;
  isNew?: boolean;
};

/* ── Data ── */
const COLLECTIONS = [
  { id: "all", label: "All Pieces" },
  { id: "dresses", label: "Dresses" },
  { id: "outerwear", label: "Outerwear" },
  { id: "shirts", label: "Shirts" },
  { id: "accessories", label: "Accessories" },
];

const PRODUCTS: Product[] = [
  {
    id: "1", name: "Floral Wrap Midi Dress", price: 3499, originalPrice: 4999,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/56af837a3b84f5af1dbe3579b326071e040e4c25_h2737c.png",
    tag: "Bestseller", category: "dresses", isNew: false,
  },
  {
    id: "2", name: "Oversized Linen Blazer", price: 4299, originalPrice: 5999,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/4b94f906882ad57d3ac8358705371f6aac7bbfc5_pkmqxv.png",
    tag: "New", category: "outerwear", isNew: true,
  },
  {
    id: "3", name: "Premium Canvas Duffel", price: 5999,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/03f1f636996c975407b5e6b0e516a4188bb5f957_ilbyt1.png",
    tag: "Limited", category: "accessories",
  },
  {
    id: "4", name: "Trail-Ready Cargo Jacket", price: 6499, originalPrice: 8499,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108997/88ccfe6075518d8b94e74e5da3ff1eed307703f0_lfndej.png",
    tag: "Limited", category: "outerwear",
  },
  {
    id: "5", name: "Casual Stripe Shirt", price: 3999, originalPrice: 5499,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111039/8390ee94a969f210e093299f78e4ff1b0afa5404_rumknz.jpg",
    tag: "Featured", category: "shirts",
  },
  {
    id: "6", name: "Multicolor Check Shacket", price: 5499, originalPrice: 7499,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111038/f9f9be50b551f3032dfa5ad6a6d470043c4e513c_njacg0.png",
    tag: "Featured", category: "outerwear", isNew: true,
  },
  {
    id: "7", name: "Plaid Flannel Shirt", price: 4499, originalPrice: 5999,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111037/24f7a8646e98f00a66361f1a6d1cc8a9da0b54c3_c2wbyl.jpg",
    tag: "Featured", category: "shirts",
  },
  {
    id: "1", name: "Floral Wrap Midi (Alt)", price: 3199,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/d68a6ad8e7f5e344dcea8564d996f4ea5158b5f0_n8nzjm.png",
    category: "dresses", isNew: true, tag: "New",
  },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low → High" },
  { id: "price-desc", label: "Price: High → Low" },
  { id: "new", label: "Newest First" },
];

const CART_KEY = "vessa_cart";

type CartEntry = Product & { brand: string; color: string; colorHex: string; size: string; qty: number };

function readCart(): CartEntry[] {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function addToCart(product: Product): CartEntry[] {
  const current = readCart();
  const existing = current.find((i) => i.id === product.id && i.name === product.name);
  const entry: CartEntry = { ...product, brand: "VESSA", color: "Default", colorHex: "#c4b59a", size: "M", qty: 1 };
  const updated = existing
    ? current.map((i) => (i.id === product.id && i.name === product.name ? { ...i, qty: i.qty + 1 } : i))
    : [...current, entry];
  try { localStorage.setItem(CART_KEY, JSON.stringify(updated)); } catch {}
  return updated;
}

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Product Card ── */
function ProductCard({
  product, view, onAdd, wishlist, onWishlist,
}: {
  product: Product;
  view: "grid" | "list";
  onAdd: (p: Product) => void;
  wishlist: Set<string>;
  onWishlist: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const key = product.id + product.name;
  const isWished = wishlist.has(key);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (view === "list") {
    return (
      <div className="group bg-white rounded-2xl border border-[#ede9e2] overflow-hidden flex gap-0 hover:shadow-md transition-all duration-300">
        
        <Link href={`/productdetail/${product.id}`} className="relative w-36 sm:w-48 shrink-0 bg-[#dde4ec]">
          <Image src={product.image} alt={product.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
          {product.tag && (
            <span className="absolute top-3 left-3 text-[9px] tracking-[0.12em] uppercase font-bold text-[#1a1a1a] bg-[#e8e4da] rounded-full px-2 py-1">
              {product.tag}
            </span>
          )}
        </Link>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-gray-400 font-bold mb-1">VESSA</p>
            <Link href={`/productdetail/${product.id}`}>
              <h3 className="text-base font-extrabold text-[#1a1a1a] hover:underline underline-offset-2 mb-2">{product.name}</h3>
            </Link>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  <span className="text-xs font-bold text-[#2d6a4f] bg-[#f0faf5] px-2 py-0.5 rounded-full">{discount}% off</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleAdd}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300
                ${added ? "bg-[#1a1a1a] text-white" : "bg-[#1a1a1a] text-white hover:bg-[#333]"}`}>
              {added ? <><CheckIcon /> Added</> : "Add to Cart"}
            </button>
            <button onClick={() => onWishlist(key)}
              className={`p-2 rounded-full border transition-all ${isWished ? "border-red-300 text-red-400 bg-red-50" : "border-[#e0dbd4] text-gray-400 hover:border-red-300 hover:text-red-400"}`}>
              <HeartIcon filled={isWished} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col">
      <div className="relative rounded-2xl overflow-hidden bg-[#dde4ec]" style={{ aspectRatio: "3/4" }}>
        <Link href={`/productdetail/${product.id}`}>
          <Image src={product.image} alt={product.name} fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
        </Link>
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[9px] tracking-[0.12em] uppercase font-bold rounded-full px-2.5 py-1
            ${product.tag === "New" ? "bg-[#1a1a1a] text-white" : "bg-[#e8e4da] text-[#1a1a1a]"}`}>
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 text-[9px] font-extrabold text-white bg-[#2d6a4f] rounded-full px-2 py-1">
            -{discount}%
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0
                        group-hover:opacity-100 transition-all duration-300 flex gap-2">
          <button onClick={handleAdd}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
              ${added ? "bg-[#1a1a1a] text-white" : "bg-white text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"}`}>
            {added ? <span className="flex items-center justify-center gap-1"><CheckIcon /> Added</span> : "Add to Cart"}
          </button>
          <button onClick={() => onWishlist(key)}
            className={`p-2.5 rounded-xl transition-all ${isWished ? "bg-red-50 text-red-400" : "bg-white text-gray-500 hover:text-red-400"}`}>
            <HeartIcon filled={isWished} />
          </button>
        </div>
      </div>
      <div className="pt-3 px-1">
        <p className="text-[10px] tracking-[0.16em] uppercase text-gray-400 font-bold mb-0.5">VESSA</p>
        <Link href={`/productdetail/${product.id}`}>
          <h3 className="text-sm font-bold text-[#1a1a1a] hover:underline underline-offset-2 leading-snug mb-1.5">{product.name}</h3>
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-extrabold">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [sortOpen, setSortOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return readCart().reduce((s, i) => s + i.qty, 0);
  });

  const toggleWishlist = (key: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleAddToCart = (product: Product) => {
    const updated = addToCart(product);
    setCartCount(updated.reduce((s, i) => s + i.qty, 0));
  };

  let filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "new") filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">

      {/* ── HERO BANNER ── */}
      <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ minHeight: 320 }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col items-start justify-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4b59a] font-bold mb-4">
            — Spring / Summer 2025
          </p>
          <h1 className="text-white font-black leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            The Collection
          </h1>
          <p className="text-[#a09080] text-sm leading-relaxed max-w-md mb-8">
            Refined silhouettes, intentional fabrics, and enduring style — each piece crafted to move with you through every season.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#c4b59a] font-medium tracking-widest uppercase">
            <span className="w-8 h-px bg-[#c4b59a]" />
            {filtered.length} pieces available
          </div>
        </div>
      </div>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-10">

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {COLLECTIONS.map(({ id, label }) => (
              <button key={id} onClick={() => setActiveCategory(id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border
                  ${activeCategory === id
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-white text-gray-500 border-[#e0dbd4] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                  }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Search + Sort + View */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 focus-within:border-gray-400 transition-colors bg-white w-40">
              <SearchIcon />
              <input type="text" placeholder="Search collection" value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-300 w-full" />
            </div>
            <div className="relative">
              <button onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e0dbd4] rounded-full text-xs font-semibold hover:border-[#1a1a1a] transition-colors">
                <FilterIcon />
                {SORT_OPTIONS.find((s) => s.id === sort)?.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#e0dbd4] rounded-2xl shadow-lg overflow-hidden z-10 w-44">
                  {SORT_OPTIONS.map(({ id, label }) => (
                    <button key={id} onClick={() => { setSort(id); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-xs font-medium hover:bg-[#f5f3f0] transition-colors flex items-center justify-between
                        ${sort === id ? "text-[#1a1a1a] font-bold" : "text-gray-500"}`}>
                      {label}
                      {sort === id && <CheckIcon />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center border border-[#e0dbd4] rounded-full overflow-hidden bg-white">
              <button onClick={() => setView("grid")}
                className={`p-2 transition-colors ${view === "grid" ? "bg-[#1a1a1a] text-white" : "text-gray-400 hover:text-[#1a1a1a]"}`}>
                <GridIcon />
              </button>
              <button onClick={() => setView("list")}
                className={`p-2 transition-colors ${view === "list" ? "bg-[#1a1a1a] text-white" : "text-gray-400 hover:text-[#1a1a1a]"}`}>
                <ListIcon />
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 font-medium mb-6">
          Showing <span className="text-[#1a1a1a] font-bold">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" ? ` in ${COLLECTIONS.find((c) => c.id === activeCategory)?.label}` : ""}
          {search ? ` for "${search}"` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-extrabold mb-2">No results found</h3>
            <p className="text-sm text-gray-400 mb-6">Try a different category or search term.</p>
            <button onClick={() => { setActiveCategory("all"); setSearch(""); }}
              className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-[#333] transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6"
            : "flex flex-col gap-4"
          }>
            {filtered.map((product, i) => (
              <ProductCard key={product.id + product.name + i} product={product} view={view}
                onAdd={handleAddToCart} wishlist={wishlist} onWishlist={toggleWishlist} />
            ))}
          </div>
        )}

        {wishlist.size > 0 && (
          <div className="mt-10 bg-[#1a1a1a] rounded-2xl px-6 py-4 flex items-center justify-between">
            <p className="text-white text-sm font-semibold">
              ❤️ {wishlist.size} item{wishlist.size !== 1 ? "s" : ""} saved to your wishlist
            </p>
            <button className="text-[#c4b59a] text-xs font-bold hover:text-white transition-colors">
              View Wishlist →
            </button>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Free Delivery", sub: "On orders above ₹999", icon: "🚚" },
            { label: "Easy Returns", sub: "15-day hassle-free returns", icon: "↩" },
            { label: "Authentic Quality", sub: "Crafted with premium materials", icon: "✦" },
          ].map(({ label, sub, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#ede9e2] px-6 py-5 flex items-center gap-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-extrabold text-[#1a1a1a]">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}