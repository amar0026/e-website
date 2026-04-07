"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tag?: string;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ALL_PRODUCTS: Product[] = [
  { id: "1",  name: "Floral Wrap Midi Dress",      price: 3499, originalPrice: 4999, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/56af837a3b84f5af1dbe3579b326071e040e4c25_h2737c.png",  category: "dresses",     tag: "Bestseller", isNew: false, rating: 4, reviewCount: 128, colors: ["#e8b4b8","#d4c8b0"], sizes: ["XS","S","M","L"] },
  { id: "2",  name: "Oversized Linen Blazer",       price: 4299, originalPrice: 5999, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/4b94f906882ad57d3ac8358705371f6aac7bbfc5_pkmqxv.png",  category: "outerwear",   tag: "New",        isNew: true,  rating: 5, reviewCount: 64,  colors: ["#c4b59a","#8c6f54"], sizes: ["S","M","L","XL"] },
  { id: "3",  name: "Premium Canvas Duffel",        price: 5999,                      image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/03f1f636996c975407b5e6b0e516a4188bb5f957_ilbyt1.png",  category: "accessories", tag: "Limited",    isNew: false, rating: 5, reviewCount: 47,  colors: ["#7a8c6e"], sizes: ["One Size"] },
  { id: "4",  name: "Trail-Ready Cargo Jacket",     price: 6499, originalPrice: 8499, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108997/88ccfe6075518d8b94e74e5da3ff1eed307703f0_lfndej.png",  category: "outerwear",   tag: "Limited",    isNew: false, rating: 4, reviewCount: 92,  colors: ["#6b7c5c","#3a3a3a"], sizes: ["S","M","L","XL","XXL"] },
  { id: "5",  name: "Casual Stripe Shirt",          price: 3999, originalPrice: 5499, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111039/8390ee94a969f210e093299f78e4ff1b0afa5404_rumknz.jpg",  category: "shirts",      tag: "Featured",   isNew: false, rating: 4, reviewCount: 97,  colors: ["#d6dde8","#d4c8b0"], sizes: ["XS","S","M","L","XL"] },
  { id: "6",  name: "Multicolor Check Shacket",     price: 5499, originalPrice: 7499, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111038/f9f9be50b551f3032dfa5ad6a6d470043c4e513c_njacg0.png",  category: "outerwear",   tag: "Featured",   isNew: true,  rating: 5, reviewCount: 142, colors: ["#c89a72","#8c6f54"], sizes: ["S","M","L","XL","XXL"] },
  { id: "7",  name: "Plaid Flannel Shirt",          price: 4499, originalPrice: 5999, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111037/24f7a8646e98f00a66361f1a6d1cc8a9da0b54c3_c2wbyl.jpg",  category: "shirts",      tag: "Featured",   isNew: false, rating: 4, reviewCount: 76,  colors: ["#b85450","#4a6741","#4a6080"], sizes: ["XS","S","M","L","XL"] },
  { id: "1b", name: "Floral Wrap Midi (Alt)",       price: 3199,                      image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/d68a6ad8e7f5e344dcea8564d996f4ea5158b5f0_n8nzjm.png",  category: "dresses",     tag: "New",        isNew: true,  rating: 4, reviewCount: 33,  colors: ["#e8b4b8"], sizes: ["S","M","L"] },
  { id: "2b", name: "Linen Blazer – Slate",         price: 4599,                      image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",  category: "outerwear",   tag: "New",        isNew: true,  rating: 5, reviewCount: 18,  colors: ["#8892a4"], sizes: ["S","M","L","XL"] },
  { id: "3b", name: "Canvas Duffel – Olive",        price: 5499,                      image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",  category: "accessories", isNew: false,      rating: 4, reviewCount: 22,  colors: ["#7a8c6e","#3a3a3a"], sizes: ["One Size"] },
  { id: "4b", name: "Cargo Jacket – Charcoal",      price: 6999, originalPrice: 8999, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/deac4d81d3d90be2717fda9bbb1461a5600a1ce5_oladhe.jpg",  category: "outerwear",   isNew: false,      rating: 4, reviewCount: 55,  colors: ["#3a3a3a"], sizes: ["M","L","XL","XXL"] },
];

const CATEGORIES = ["All","Dresses","Outerwear","Shirts","Accessories"];
const SIZES_ALL  = ["XS","S","M","L","XL","XXL","One Size"];
const SORT_OPTS  = [
  { id:"featured",   label:"Featured"          },
  { id:"price-asc",  label:"Price: Low → High" },
  { id:"price-desc", label:"Price: High → Low" },
  { id:"rating",     label:"Top Rated"         },
  { id:"new",        label:"Newest First"      },
  { id:"discount",   label:"Biggest Discount"  },
];

const CART_KEY = "vessa_cart";
type CartEntry = Product & { brand:string; color:string; colorHex:string; size:string; qty:number };
function readCart(): CartEntry[] { try { return JSON.parse(localStorage.getItem(CART_KEY)||"[]"); } catch { return []; } }
function pushToCart(p: Product): CartEntry[] {
  const cur = readCart();
  const ex  = cur.find(i => i.id === p.id);
  const entry: CartEntry = { ...p, brand:"VESSA", color:"Default", colorHex: p.colors[0]||"#c4b59a", size:"M", qty:1 };
  const upd  = ex ? cur.map(i => i.id===p.id ? {...i,qty:i.qty+1} : i) : [...cur, entry];
  try { localStorage.setItem(CART_KEY, JSON.stringify(upd)); } catch {}
  return upd;
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const Ico = {
  Search: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Cart: ({n}:{n:number}) => (
    <div className="relative inline-flex">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {n>0 && <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{n}</span>}
    </div>
  ),
  Heart: ({f}:{f:boolean}) => <svg width="15" height="15" viewBox="0 0 24 24" fill={f?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: ({f}:{f:boolean}) => <svg width="12" height="12" viewBox="0 0 24 24" fill={f?"#f59e0b":"none"} stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Filter: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
  Grid: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  List: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  ChevDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

/* ─────────────────────────────────────────────
   STARS
───────────────────────────────────────────── */
function Stars({ r }: { r: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => <Ico.Star key={i} f={i<=r} />)}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function Card({ p, view, onAdd, wished, onWish }:{
  p: Product; view:"grid"|"list";
  onAdd:(p:Product)=>void;
  wished:boolean; onWish:()=>void;
}) {
  const [added, setAdded] = useState(false);
  const discount = p.originalPrice ? Math.round(((p.originalPrice-p.price)/p.originalPrice)*100) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    onAdd(p);
    setAdded(true);
    setTimeout(()=>setAdded(false), 1800);
  };

  if (view === "list") return (
    <div className="group bg-white rounded-2xl border border-[#ede9e2] flex overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/productdetail/${p.id}`} className="relative w-40 sm:w-52 shrink-0 bg-[#e8e4da]">
        <Image src={p.image} alt={p.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
        {p.tag && <span className={`absolute top-3 left-3 text-[9px] tracking-widest uppercase font-bold rounded-full px-2.5 py-1 ${p.tag==="New"?"bg-[#1a1a1a] text-white":"bg-[#e8e4da] text-[#1a1a1a]"}`}>{p.tag}</span>}
      </Link>
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-bold mb-1">VESSA</p>
          <Link href={`/productdetail/${p.id}`}><h3 className="text-base font-extrabold hover:underline underline-offset-2 mb-2">{p.name}</h3></Link>
          <div className="flex items-center gap-2 mb-3">
            <Stars r={p.rating}/>
            <span className="text-[11px] text-gray-400">({p.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold">₹{p.price.toLocaleString("en-IN")}</span>
            {p.originalPrice && <span className="text-sm text-gray-400 line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>}
            {discount>0 && <span className="text-xs font-bold text-[#2d6a4f] bg-[#f0faf5] px-2 py-0.5 rounded-full">{discount}% off</span>}
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            {p.colors.map(c => <span key={c} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{backgroundColor:c}}/>)}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {p.sizes.map(s => <span key={s} className="text-[10px] font-semibold text-gray-500 border border-[#e0dbd4] rounded px-1.5 py-0.5">{s}</span>)}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button onClick={handleAdd} className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${added?"bg-[#2d6a4f] text-white":"bg-[#1a1a1a] text-white hover:bg-[#333]"}`}>
            {added ? <><Ico.Check/> Added</> : "Add to Cart"}
          </button>
          <button onClick={onWish} className={`p-2.5 rounded-full border transition-all ${wished?"border-red-300 text-red-400 bg-red-50":"border-[#e0dbd4] text-gray-400 hover:border-red-300 hover:text-red-400"}`}>
            <Ico.Heart f={wished}/>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="group flex flex-col">
      <div className="relative rounded-2xl overflow-hidden bg-[#e8e4da]" style={{aspectRatio:"3/4"}}>
        <Link href={`/productdetail/${p.id}`}>
          <Image src={p.image} alt={p.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-600"/>
        </Link>
        {p.tag && (
          <span className={`absolute top-3 left-3 text-[9px] tracking-widest uppercase font-bold rounded-full px-2.5 py-1 ${p.tag==="New"?"bg-[#1a1a1a] text-white":"bg-[#e8e4da]/90 text-[#1a1a1a]"}`}>
            {p.tag}
          </span>
        )}
        {discount>0 && (
          <span className="absolute top-3 right-3 text-[9px] font-extrabold text-white bg-[#c0392b] rounded-full px-2 py-1">-{discount}%</span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          <button onClick={handleAdd} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${added?"bg-[#2d6a4f] text-white":"bg-white text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"}`}>
            {added ? <span className="flex items-center justify-center gap-1"><Ico.Check/> Added</span> : "Add to Cart"}
          </button>
          <button onClick={onWish} className={`p-2.5 rounded-xl transition-all ${wished?"bg-red-50 text-red-400":"bg-white text-gray-400 hover:text-red-400"}`}>
            <Ico.Heart f={wished}/>
          </button>
        </div>
      </div>
      <div className="pt-3 px-0.5">
        <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-bold mb-0.5">VESSA</p>
        <Link href={`/productdetail/${p.id}`}><h3 className="text-sm font-bold hover:underline underline-offset-2 leading-snug mb-1">{p.name}</h3></Link>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Stars r={p.rating}/>
          <span className="text-[10px] text-gray-400">({p.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm font-extrabold">₹{p.price.toLocaleString("en-IN")}</span>
          {p.originalPrice && <span className="text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>}
        </div>
        <div className="flex items-center gap-1">
          {p.colors.map(c => <span key={c} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor:c}}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILTER SIDEBAR
───────────────────────────────────────────── */
function Sidebar({
  category, setCategory,
  priceRange, setPriceRange,
  selectedSizes, toggleSize,
  onlyNew, setOnlyNew,
  onlyDiscount, setOnlyDiscount,
  onReset, mobile, onClose,
}:{
  category:string; setCategory:(c:string)=>void;
  priceRange:[number,number]; setPriceRange:(r:[number,number])=>void;
  selectedSizes:Set<string>; toggleSize:(s:string)=>void;
  onlyNew:boolean; setOnlyNew:(v:boolean)=>void;
  onlyDiscount:boolean; setOnlyDiscount:(v:boolean)=>void;
  onReset:()=>void; mobile?:boolean; onClose?:()=>void;
}) {
  const Section = ({title, children}:{title:string; children:React.ReactNode}) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="border-b border-[#ede9e2] pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
        <button className="flex items-center justify-between w-full mb-3" onClick={()=>setOpen(o=>!o)}>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1a1a1a]">{title}</span>
          <span className={`transition-transform ${open?"rotate-180":""}`}><Ico.ChevDown/></span>
        </button>
        {open && children}
      </div>
    );
  };

  return (
    <aside className={`bg-white rounded-2xl border border-[#ede9e2] p-5 ${mobile?"":"sticky top-20"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-extrabold tracking-tight">Filters</h2>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="text-[11px] text-gray-400 hover:text-[#1a1a1a] transition-colors font-medium underline underline-offset-2">Reset all</button>
          {mobile && onClose && <button onClick={onClose} className="text-gray-500 hover:text-[#1a1a1a]"><Ico.Close/></button>}
        </div>
      </div>

      <Section title="Category">
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={()=>setCategory(c==="All"?"all":c.toLowerCase())}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all
                ${(category==="all"&&c==="All")||(category===c.toLowerCase())
                  ? "bg-[#1a1a1a] text-white font-semibold"
                  : "text-gray-600 hover:bg-[#f5f3f0]"}`}>
              <span>{c}</span>
              <span className={`text-[10px] font-bold ${(category==="all"&&c==="All")||(category===c.toLowerCase())?"text-white/60":"text-gray-400"}`}>
                {c==="All" ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p=>p.category===c.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <div className="px-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1a1a1a]">₹{priceRange[0].toLocaleString("en-IN")}</span>
            <span className="text-xs font-bold text-[#1a1a1a]">₹{priceRange[1].toLocaleString("en-IN")}</span>
          </div>
          <input type="range" min={1000} max={10000} step={100}
            value={priceRange[1]}
            onChange={e=>setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full h-1 appearance-none bg-[#e0dbd4] rounded-full cursor-pointer accent-[#1a1a1a]"
          />
          <div className="flex items-center gap-2 mt-3">
            <input type="number" min={1000} max={priceRange[1]} value={priceRange[0]}
              onChange={e=>setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full border border-[#e0dbd4] rounded-lg px-2 py-1.5 text-xs text-center outline-none focus:border-[#1a1a1a]"/>
            <span className="text-gray-400 text-xs shrink-0">—</span>
            <input type="number" min={priceRange[0]} max={10000} value={priceRange[1]}
              onChange={e=>setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full border border-[#e0dbd4] rounded-lg px-2 py-1.5 text-xs text-center outline-none focus:border-[#1a1a1a]"/>
          </div>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex flex-wrap gap-1.5">
          {SIZES_ALL.map(s => (
            <button key={s} onClick={()=>toggleSize(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${selectedSizes.has(s)?"bg-[#1a1a1a] text-white border-[#1a1a1a]":"border-[#e0dbd4] text-gray-500 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"}`}>
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Quick Filters">
        <div className="flex flex-col gap-2">
          {[
            { label:"New Arrivals", val:onlyNew, set:setOnlyNew },
            { label:"On Sale", val:onlyDiscount, set:setOnlyDiscount },
          ].map(({label,val,set}) => (
            <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
              <div onClick={()=>set(!val)} className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0
                ${val?"bg-[#1a1a1a] border-[#1a1a1a]":"border-[#c4b59a] group-hover:border-[#1a1a1a]"}`}>
                {val && <Ico.Check/>}
              </div>
              <span className="text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </Section>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ShopPage() {
  const [category,      setCategory]      = useState("all");
  const [priceRange,    setPriceRange]    = useState<[number,number]>([1000,10000]);
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [onlyNew,       setOnlyNew]       = useState(false);
  const [onlyDiscount,  setOnlyDiscount]  = useState(false);
  const [sort,          setSort]          = useState("featured");
  const [view,          setView]          = useState<"grid"|"list">("grid");
  const [search,        setSearch]        = useState("");
  const [wishlist,      setWishlist]      = useState<Set<string>>(new Set());
  const [filterOpen,    setFilterOpen]    = useState(false);
  const [sortOpen,      setSortOpen]      = useState(false);
  const [cartCount,     setCartCount]     = useState(() => { if(typeof window==="undefined") return 0; return readCart().reduce((s,i)=>s+i.qty,0); });

  const sortRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if(sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleSize   = (s:string) => setSelectedSizes(prev => { const n=new Set(prev); n.has(s)?n.delete(s):n.add(s); return n; });
  const toggleWish   = (id:string) => setWishlist(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  const handleAdd    = (p:Product) => { const u=pushToCart(p); setCartCount(u.reduce((s,i)=>s+i.qty,0)); };
  const resetFilters = () => { setCategory("all"); setPriceRange([1000,10000]); setSelectedSizes(new Set()); setOnlyNew(false); setOnlyDiscount(false); setSearch(""); };

  /* Filter */
  let results = ALL_PRODUCTS.filter(p => {
    if(category!=="all" && p.category!==category) return false;
    if(p.price<priceRange[0] || p.price>priceRange[1]) return false;
    if(selectedSizes.size>0 && !p.sizes.some(s=>selectedSizes.has(s))) return false;
    if(onlyNew && !p.isNew) return false;
    if(onlyDiscount && !p.originalPrice) return false;
    if(search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  /* Sort */
  if(sort==="price-asc")  results=[...results].sort((a,b)=>a.price-b.price);
  if(sort==="price-desc") results=[...results].sort((a,b)=>b.price-a.price);
  if(sort==="rating")     results=[...results].sort((a,b)=>b.rating-a.rating||(b.reviewCount-a.reviewCount));
  if(sort==="new")        results=[...results].sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
  if(sort==="discount")   results=[...results].sort((a,b)=>{
    const da=a.originalPrice?a.originalPrice-a.price:0;
    const db=b.originalPrice?b.originalPrice-b.price:0;
    return db-da;
  });

  const activeFilterCount = [
    category!=="all", priceRange[1]<10000, selectedSizes.size>0, onlyNew, onlyDiscount
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">

      {/* ── PAGE HEADER ── */}
      <div className="bg-white border-b border-[#e8e4da]">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8 lg:py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-1">Browse all</p>
              <h1 className="font-black leading-none text-[#1a1a1a]" style={{fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"Georgia, serif", letterSpacing:"-0.02em"}}>
                Shop
              </h1>
            </div>
            <p className="text-sm text-gray-400 font-medium pb-1">
              <span className="text-[#1a1a1a] font-extrabold">{results.length}</span> products
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-4">
            <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#1a1a1a] font-medium">Shop</span>
            {category!=="all" && <><span>›</span><span className="text-[#1a1a1a] font-medium capitalize">{category}</span></>}
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex gap-8">

          {/* ── DESKTOP SIDEBAR ── */}
          <div className="hidden lg:block w-56 xl:w-64 shrink-0">
            <Sidebar
              category={category} setCategory={setCategory}
              priceRange={priceRange} setPriceRange={setPriceRange}
              selectedSizes={selectedSizes} toggleSize={toggleSize}
              onlyNew={onlyNew} setOnlyNew={setOnlyNew}
              onlyDiscount={onlyDiscount} setOnlyDiscount={setOnlyDiscount}
              onReset={resetFilters}
            />
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button onClick={()=>setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e0dbd4] rounded-full text-xs font-semibold hover:border-[#1a1a1a] transition-colors relative">
                  <Ico.Filter/>
                  Filters
                  {activeFilterCount>0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#1a1a1a] text-white text-[9px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
                </button>

                {/* Active filter chips */}
                <div className="hidden sm:flex items-center gap-2 flex-wrap">
                  {category!=="all" && (
                    <span className="flex items-center gap-1 bg-[#1a1a1a] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      <span className="capitalize">{category}</span>
                      <button onClick={()=>setCategory("all")} className="ml-0.5 opacity-70 hover:opacity-100"><Ico.Close/></button>
                    </span>
                  )}
                  {onlyNew && (
                    <span className="flex items-center gap-1 bg-[#1a1a1a] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      New only <button onClick={()=>setOnlyNew(false)} className="ml-0.5 opacity-70 hover:opacity-100"><Ico.Close/></button>
                    </span>
                  )}
                  {onlyDiscount && (
                    <span className="flex items-center gap-1 bg-[#1a1a1a] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      On sale <button onClick={()=>setOnlyDiscount(false)} className="ml-0.5 opacity-70 hover:opacity-100"><Ico.Close/></button>
                    </span>
                  )}
                  {activeFilterCount>0 && (
                    <button onClick={resetFilters} className="text-[11px] text-gray-400 hover:text-[#1a1a1a] font-medium underline underline-offset-2 transition-colors">
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Sort */}
                <div className="relative" ref={sortRef}>
                  <button onClick={()=>setSortOpen(o=>!o)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e0dbd4] rounded-full text-xs font-semibold hover:border-[#1a1a1a] transition-colors">
                    <Ico.Filter/>
                    <span className="hidden sm:inline">{SORT_OPTS.find(s=>s.id===sort)?.label}</span>
                    <span className="sm:hidden">Sort</span>
                    <Ico.ChevDown/>
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[#e0dbd4] rounded-2xl shadow-xl overflow-hidden z-20 w-48">
                      {SORT_OPTS.map(({id,label})=>(
                        <button key={id} onClick={()=>{setSort(id);setSortOpen(false);}}
                          className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between hover:bg-[#f5f3f0] transition-colors
                            ${sort===id?"font-bold text-[#1a1a1a]":"font-medium text-gray-500"}`}>
                          {label}
                          {sort===id && <Ico.Check/>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Grid / list */}
                <div className="flex items-center border border-[#e0dbd4] rounded-full overflow-hidden bg-white">
                  <button onClick={()=>setView("grid")} className={`p-2 transition-colors ${view==="grid"?"bg-[#1a1a1a] text-white":"text-gray-400 hover:text-[#1a1a1a]"}`}><Ico.Grid/></button>
                  <button onClick={()=>setView("list")} className={`p-2 transition-colors ${view==="list"?"bg-[#1a1a1a] text-white":"text-gray-400 hover:text-[#1a1a1a]"}`}><Ico.List/></button>
                </div>
              </div>
            </div>

            {/* Products */}
            {results.length===0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-lg font-extrabold mb-2">No products found</h3>
                <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search term.</p>
                <button onClick={resetFilters} className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-bold hover:bg-[#333] transition-colors">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={view==="grid"
                ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
                : "flex flex-col gap-4"}>
                {results.map((p,i)=>(
                  <Card key={p.id+i} p={p} view={view}
                    onAdd={handleAdd}
                    wished={wishlist.has(p.id)}
                    onWish={()=>toggleWish(p.id)}
                  />
                ))}
              </div>
            )}

            {/* Wishlist strip */}
            {wishlist.size>0 && (
              <div className="mt-10 bg-[#1a1a1a] rounded-2xl px-6 py-4 flex items-center justify-between">
                <p className="text-white text-sm font-semibold">❤️ {wishlist.size} item{wishlist.size!==1?"s":""} in your wishlist</p>
                <button className="text-[#c4b59a] text-xs font-bold hover:text-white transition-colors">View Wishlist →</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER ── */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setFilterOpen(false)}/>
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-[#f5f3f0] overflow-y-auto p-4">
            <Sidebar
              category={category} setCategory={setCategory}
              priceRange={priceRange} setPriceRange={setPriceRange}
              selectedSizes={selectedSizes} toggleSize={toggleSize}
              onlyNew={onlyNew} setOnlyNew={setOnlyNew}
              onlyDiscount={onlyDiscount} setOnlyDiscount={setOnlyDiscount}
              onReset={resetFilters} mobile onClose={()=>setFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}