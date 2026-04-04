"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

/* ── Icons ── */
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill={filled ? "#1a1a1a" : "none"} stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ShareIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24"
    fill={filled ? "#1a1a1a" : "none"} stroke="#1a1a1a"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Product database (keyed by id) ── */
const PRODUCTS: Record<string, {
  name: string; brand: string; price: number; originalPrice: number;
  rating: number; reviewCount: number; tag: string; description: string;
  images: string[]; colors: { name: string; hex: string }[];
  sizes: string[]; details: string[]; category: string;
}> = {
  "1": {
    name: "Floral Wrap Midi Dress",
    brand: "VESSA",
    price: 3499,
    originalPrice: 4999,
    rating: 5,
    reviewCount: 214,
    tag: "Women",
    category: "Women",
    description:
      "A fluid, feminine midi dress with a wrap silhouette. Crafted in lightweight woven fabric with a vibrant floral print. Adjustable tie waist and V-neckline for a flattering fit every time.",
    images: [
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/56af837a3b84f5af1dbe3579b326071e040e4c25_h2737c.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/1579733d0c3681a81a49ae45c5ef7ef77f3c1b5d_bcnjot.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/c0e3db74138bdd0508af32c4b91a46f45c6fbdee_psseso.png",
    ],
    colors: [
      { name: "Floral Blush", hex: "#e8b4b8" },
      { name: "Sage Green", hex: "#8fad88" },
      { name: "Ivory", hex: "#f0ece4" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% lightweight woven polyester",
      "Wrap silhouette with adjustable tie",
      "V-neckline, flutter sleeves",
      "Midi length — falls below knee",
      "Machine wash cold, gentle cycle",
      "Model is 5'7\" wearing size S",
    ],
  },
  "2": {
    name: "Oversized Linen Blazer",
    brand: "VESSA",
    price: 4299,
    originalPrice: 5999,
    rating: 4,
    reviewCount: 128,
    tag: "New Arrival",
    category: "Suits & Blazer",
    description:
      "Crafted from 100% premium linen, this relaxed blazer brings effortless structure to any outfit. Featuring a single-button closure, welt pockets, and a slightly dropped shoulder.",
    images: [
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/4b94f906882ad57d3ac8358705371f6aac7bbfc5_pkmqxv.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048545/80e9a236a39d0c855c5d4a3c888dfc443a5412a3_ccxmz8.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/c0e3db74138bdd0508af32c4b91a46f45c6fbdee_psseso.png",
    ],
    colors: [
      { name: "Warm Taupe", hex: "#c4b59a" },
      { name: "Dusty Blue", hex: "#9fb3c8" },
      { name: "Charcoal", hex: "#4a4a4a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% premium linen",
      "Single-button closure",
      "Two welt pockets + one chest pocket",
      "Dropped shoulder construction",
      "Dry clean or hand wash cold",
      "Model is 5'9\" wearing size S",
    ],
  },
  "3": {
    name: "Premium Canvas Duffel",
    brand: "VESSA",
    price: 5999,
    originalPrice: 7999,
    rating: 5,
    reviewCount: 89,
    tag: "Bestseller",
    category: "Travel Bags",
    description:
      "The perfect travel companion. Crafted in waxed canvas with full-grain leather handles, this duffel expands to fit a weekend's worth of essentials while remaining carry-on compliant.",
    images: [
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775108996/03f1f636996c975407b5e6b0e516a4188bb5f957_ilbyt1.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/1579733d0c3681a81a49ae45c5ef7ef77f3c1b5d_bcnjot.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048545/80e9a236a39d0c855c5d4a3c888dfc443a5412a3_ccxmz8.png",
    ],
    colors: [
      { name: "Olive Canvas", hex: "#7a8c6e" },
      { name: "Tan", hex: "#c4a882" },
      { name: "Slate", hex: "#7a8a96" },
    ],
    sizes: ["One Size"],
    details: [
      "Waxed canvas exterior, cotton lining",
      "Full-grain leather handles + detachable strap",
      "YKK zippers throughout",
      "Interior zip pocket + 2 slip pockets",
      "Carry-on compliant: 50 × 28 × 25 cm",
      "Water-resistant finish",
    ],
  },
  "4": {
    name: "Trail-Ready Cargo Jacket",
    brand: "VESSA",
    price: 6499,
    originalPrice: 8499,
    rating: 4,
    reviewCount: 63,
    tag: "Limited",
    category: "Out Door",
    description:
      "Built for the elements. This technical cargo jacket features a windproof shell, sealed seams, and four utility pockets. Lightweight enough to pack into its own pocket, tough enough for the trail.",
    images: [
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775108997/88ccfe6075518d8b94e74e5da3ff1eed307703f0_lfndej.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048545/80e9a236a39d0c855c5d4a3c888dfc443a5412a3_ccxmz8.png",
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/c0e3db74138bdd0508af32c4b91a46f45c6fbdee_psseso.png",
    ],
    colors: [
      { name: "Forest Green", hex: "#4a6741" },
      { name: "Stone", hex: "#b0a898" },
      { name: "Navy", hex: "#2c3e6b" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "100% recycled nylon shell",
      "Windproof + water-repellent DWR finish",
      "Sealed seams for light rain",
      "4 utility cargo pockets",
      "Packable into chest pocket",
      "Adjustable hem + cuffs",
    ],
  },
};

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Collection", href: "/collection" },
  { label: "Blogs", href: "/blogs" },
  { label: "Reviews", href: "/reviews" },
];

const REVIEWS = [
  { name: "Priya S.", rating: 5, text: "Absolutely love the quality. Exactly as described — fast shipping too!", date: "Mar 2025" },
  { name: "Kavita M.", rating: 4, text: "Runs slightly large but the fit is intentional and gorgeous.", date: "Feb 2025" },
  { name: "Anika R.", rating: 4, text: "Great quality for the price. Got so many compliments!", date: "Jan 2025" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "1";
  const product = PRODUCTS[id] ?? PRODUCTS["1"];

  const [activeImg, setActiveImg]     = useState(0);
  const [color, setColor]             = useState(product.colors[0].name);
  const [size, setSize]               = useState("");
  const [qty, setQty]                 = useState(1);
  const [wishlisted, setWishlisted]   = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const [search, setSearch]           = useState("");
  const [mobileOpen, setMobileOpen]   = useState(false);
  const cartCount = 3;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    if (!size) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleAccordion = (key: string) =>
    setOpenAccordion((prev) => (prev === key ? null : key));

  // Related = all other products
  const related = Object.entries(PRODUCTS)
    .filter(([pid]) => pid !== id)
    .slice(0, 3)
    .map(([pid, p]) => ({ id: pid, name: p.name, price: p.price, tag: p.tag, image: p.images[0] }));

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">

      {/* ── NAVBAR ── */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-6">
          <Link href="/" className="text-xl font-black uppercase shrink-0 hover:opacity-80 transition-opacity"
            style={{ letterSpacing: "0.18em" }}>VESSA</Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href}
                className="text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md
                            px-3 py-1.5 focus-within:border-gray-500 transition-colors w-36">
              <SearchIcon />
              <input type="text" placeholder="Search" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full" />
            </div>
            <button className="text-gray-700 hover:text-black transition-colors"><UserIcon /></button>
            <Link href="/cart" className="relative text-gray-700 hover:text-black transition-colors">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px]
                                 font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button className="text-gray-700"><UserIcon /></button>
            <Link href="/cart" className="relative text-gray-700">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px]
                                 font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="text-gray-700" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full">
              <SearchIcon />
              <input type="text" placeholder="Search" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full" />
            </div>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-700 hover:text-black transition-colors">{label}</Link>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8 lg:py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
          <ChevronRight />
          <Link href="/shop" className="hover:text-[#1a1a1a] transition-colors">Shop</Link>
          <ChevronRight />
          <Link href="/collection" className="hover:text-[#1a1a1a] transition-colors">
            {product.category}
          </Link>
          <ChevronRight />
          <span className="text-[#1a1a1a] font-medium truncate max-w-[180px]">{product.name}</span>
        </div>

        {/* ── PRODUCT SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-16 mb-20">

          {/* LEFT: IMAGE GALLERY */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden
                               shrink-0 border-[1.5px] transition-all
                               ${activeImg === i ? "border-[#1a1a1a]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <Image src={src} alt={`view ${i + 1}`} fill className="object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 min-h-[420px] sm:min-h-[560px] lg:min-h-[640px]
                            rounded-2xl overflow-hidden bg-[#dde4ec] group">
              <Image src={product.images[activeImg]} alt={product.name} fill
                className="object-cover object-top transition-all duration-500" priority />
              <span className="absolute top-4 left-4 text-[9px] tracking-[0.14em] uppercase
                               font-bold text-[#1a1a1a] bg-[#d8d3c8] rounded-full px-3 py-1">
                {product.tag}
              </span>
              <span className="absolute top-4 right-4 text-[10px] font-extrabold text-white
                               bg-[#1a1a1a] rounded-full px-2.5 py-1">
                -{discount}%
              </span>
              <button onClick={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80
                           backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100
                           transition-opacity shadow-sm hover:bg-white">
                <ChevronLeft />
              </button>
              <button onClick={() => setActiveImg((i) => (i + 1) % product.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80
                           backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100
                           transition-opacity shadow-sm hover:bg-white">
                <ChevronRight />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`rounded-full transition-all ${activeImg === i
                      ? "w-4 h-1.5 bg-[#1a1a1a]" : "w-1.5 h-1.5 bg-white/60"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs tracking-[0.18em] uppercase font-bold text-gray-400">
                {product.brand}
              </span>
              <div className="flex items-center gap-3">
                <button onClick={() => setWishlisted((w) => !w)}
                  className="text-gray-400 hover:text-[#1a1a1a] transition-colors">
                  <HeartIcon filled={wishlisted} />
                </button>
                <button className="text-gray-400 hover:text-[#1a1a1a] transition-colors">
                  <ShareIcon />
                </button>
              </div>
            </div>

            <h1 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold leading-tight tracking-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled={s <= product.rating} />)}
              </div>
              <span className="text-xs text-gray-400">
                {product.rating}.0 ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold tracking-tight">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-base text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-sm font-bold text-[#2d6a4f]">{discount}% off</span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-7">{product.description}</p>

            {/* Color picker */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">Colour</span>
                <span className="text-xs text-gray-400">{color}</span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setColor(c.name)} title={c.name}
                    className={`w-8 h-8 rounded-full border-[2px] transition-all
                                ${color === c.name ? "border-[#1a1a1a] scale-110" : "border-transparent hover:scale-105"}`}
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: color === c.name ? "0 0 0 2px #f5f3f0, 0 0 0 4px #1a1a1a" : "none",
                    }} />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">Size</span>
                <button className="text-xs text-gray-400 underline hover:text-[#1a1a1a] transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`w-12 h-12 rounded-xl border-[1.5px] text-sm font-semibold transition-all
                                ${size === s
                                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                                  : "border-[#e0dbd4] text-[#1a1a1a] hover:border-[#1a1a1a]"}`}>
                    {s}
                  </button>
                ))}
              </div>
              {!size && <p className="text-xs text-gray-400 mt-2">Please select a size</p>}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border-[1.5px] border-[#e0dbd4] rounded-full overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-lg text-[#3a3a3a]
                             hover:bg-[#f5f3f0] transition-colors">−</button>
                <span className="w-10 text-center text-sm font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-lg text-[#3a3a3a]
                             hover:bg-[#f5f3f0] transition-colors">+</button>
              </div>
              <button onClick={handleAddToCart} disabled={!size}
                className={`flex-1 py-3.5 rounded-full text-sm font-bold tracking-wide
                            flex items-center justify-center gap-2 transition-all
                            ${addedToCart
                              ? "bg-[#2d6a4f] text-white"
                              : size
                                ? "bg-[#1a1a1a] text-white hover:bg-[#333]"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                {addedToCart ? "✓ Added to Bag" : <><CartIcon /> Add to Bag</>}
              </button>
            </div>

            <button disabled={!size}
              className={`w-full py-3.5 rounded-full border-[1.5px] text-sm font-bold
                          tracking-wide transition-all mb-6
                          ${size
                            ? "border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                            : "border-gray-200 text-gray-300 cursor-not-allowed"}`}>
              Buy Now
            </button>

            <div className="flex flex-wrap gap-2 mb-8">
              {["🚚 Free Delivery above ₹999", "↩ Easy 15-day Returns", "✦ 100% Authentic"].map((t) => (
                <span key={t} className="text-[11px] text-gray-500 bg-white border border-[#e8e2d8]
                                         rounded-full px-3 py-1">{t}</span>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-[#e8e2d8]">
              {[
                {
                  key: "details", label: "Product Details",
                  content: (
                    <ul className="flex flex-col gap-2">
                      {product.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="text-[#1a1a1a] mt-0.5 shrink-0">—</span> {d}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  key: "shipping", label: "Shipping & Returns",
                  content: (
                    <div className="text-sm text-gray-500 leading-relaxed flex flex-col gap-2">
                      <p>Free standard delivery on orders over ₹999. Express delivery available at checkout.</p>
                      <p>Easy 15-day returns on unworn items with original tags attached.</p>
                    </div>
                  ),
                },
                {
                  key: "care", label: "Care Instructions",
                  content: (
                    <div className="text-sm text-gray-500 leading-relaxed flex flex-col gap-1.5">
                      <p>Dry clean recommended. Hand wash cold if needed.</p>
                      <p>Do not tumble dry. Lay flat to dry. Iron on low heat.</p>
                    </div>
                  ),
                },
              ].map(({ key, label, content }) => (
                <div key={key} className="border-b border-[#e8e2d8]">
                  <button onClick={() => toggleAccordion(key)}
                    className="w-full flex items-center justify-between py-4 text-sm font-bold
                               hover:text-gray-600 transition-colors">
                    {label}
                    <span className={`transition-transform ${openAccordion === key ? "rotate-180" : ""}`}>
                      <ChevronDown />
                    </span>
                  </button>
                  {openAccordion === key && <div className="pb-5">{content}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── REVIEWS ── */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-gray-400 mb-1">What customers say</p>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Reviews <span className="text-gray-400 font-normal text-lg">({product.reviewCount})</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled={s <= product.rating} />)}
              </div>
              <span className="text-sm font-bold">{product.rating}.0</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#ede9e2] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled={s <= r.rating} />)}
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">"{r.text}"</p>
                <p className="text-xs font-bold text-[#1a1a1a]">{r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED PRODUCTS ── */}
        <section>
          <div className="mb-6">
            <p className="text-[11px] tracking-[0.14em] uppercase text-gray-400 mb-1">You might also like</p>
            <h2 className="text-2xl font-extrabold tracking-tight">Related Products</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}
                className="group bg-white rounded-2xl border border-[#ede9e2] overflow-hidden
                           hover:shadow-md transition-shadow">
                <div className="relative h-56 sm:h-72 bg-[#dde4ec] overflow-hidden">
                  <Image src={item.image} alt={item.name} fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.12em] uppercase
                                   font-bold text-[#1a1a1a] bg-[#d8d3c8] rounded-full px-2.5 py-1">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-1 truncate">{item.name}</h3>
                  <p className="text-sm font-extrabold">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}