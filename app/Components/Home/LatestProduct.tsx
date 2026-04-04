"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// IDs 1–4 already exist in your PRODUCTS record in product/[id]/page.tsx
const PRODUCTS = [
  {
    id: "1",
    name: "Floral Wrap Midi Dress",
    price: 3499,
    displayPrice: "₹3,499",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/d68a6ad8e7f5e344dcea8564d996f4ea5158b5f0_n8nzjm.png",
    color: "Floral Blush",
    colorHex: "#e8b4b8",
    size: "M",
  },
  {
    id: "2",
    name: "Oversized Linen Blazer",
    price: 4299,
    displayPrice: "₹4,299",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111743/95b0272132154fa449f51c10150d51c03e5fdeae_kt2dc8.png",
    color: "Warm Taupe",
    colorHex: "#c4b59a",
    size: "M",
  },
  {
    id: "3",
    name: "Premium Canvas Duffel",
    price: 5999,
    displayPrice: "₹5,999",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/aaf24a68bd880d1f6f1ace70b6bfbe6a8fb03e1b_fgm5lx.jpg",
    color: "Olive Canvas",
    colorHex: "#7a8c6e",
    size: "One Size",
  },
  {
    id: "4",
    name: "Trail-Ready Cargo Jacket",
    price: 6499,
    displayPrice: "₹6,499",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111742/deac4d81d3d90be2717fda9bbb1461a5600a1ce5_oladhe.jpg",
    color: "Olive",
    colorHex: "#6b7c5c",
    size: "M",
  },
];

/* ── Promo banners ── */
const BANNERS = [
  {
    id: 1,
    title: "Exclusive Winter sale save more!",
    description:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends, enjoy huge discounts, and stay warm in style. Limited time only—don't miss out!",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775112146/e32f66445fa43f949a0129b252e0f7f167b0d0d6_axaldu.jpg",
    href: "/sale",
    bg: "#e8e4da",
  },
  {
    id: 2,
    title: "Exclusive Winter sale save more!",
    description:
      "Upgrade your style this season with unbeatable deals. Shop the latest winter trends, enjoy huge discounts, and stay warm in style. Limited time only—don't miss out!",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111741/8c6c4cc922d5509ad000f7782161392405b0cbb9_s7qlqw.png",
    href: "/sale",
    bg: "#e8e4da",
  },
];

/* ── localStorage helpers (same key as FeaturedProducts & CartPage) ── */
const CART_KEY = "vessa_cart";

type Product = (typeof PRODUCTS)[number];
type CartEntry = Product & { qty: number };

function readCart(): CartEntry[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function addToCartStorage(product: Product): CartEntry[] {
  const current = readCart();
  const existing = current.find((i) => i.id === product.id);
  const updated = existing
    ? current.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    : [...current, { ...product, qty: 1 }];
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

/* ── Icons ── */
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CartIcon = ({ count }: { count: number }) => (
  <div className="relative inline-flex">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-white text-[9px]
                       font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
        {count}
      </span>
    )}
  </div>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BagPlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

/* ── Per-card Add to Cart button ── */
function AddToCartBtn({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-1.5
        w-full py-2 rounded-lg text-xs font-semibold
        transition-all duration-300 mt-1.5
        ${added
          ? "bg-[#1a1a1a] text-white"
          : "bg-[#f5f3f0] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white border border-transparent hover:border-[#1a1a1a]"
        }
      `}
    >
      {added ? <><CheckIcon /> Added</> : <><BagPlusIcon /> Add to Cart</>}
    </button>
  );
}

/* ── Main component ── */
export default function LatestProducts() {
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return readCart().reduce((s, i) => s + i.qty, 0);
  });

  const handleAdd = (product: Product) => {
    const updated = addToCartStorage(product);
    setCartCount(updated.reduce((s, i) => s + i.qty, 0));
  };

  return (
    <section className="w-full max-w-[1920px] mx-auto px-5 sm:px-8 py-10 bg-white">

      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
            <CloseIcon />
            <span className="tracking-widest uppercase">Exclusives Finds</span>
          </div>
          <h2
            className="text-[#1a1a1a] font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontFamily: "sans-serif" }}
          >
            Latest Products
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Cart nav button */}
          <Link
            href="/cart"
            className="flex items-center gap-2 border border-gray-300 rounded-full
                       px-3 py-2 text-sm text-gray-700 font-medium hover:border-black
                       hover:text-black transition-colors duration-200"
          >
            <CartIcon count={cartCount} />
            {cartCount > 0 && <span className="text-xs font-bold">{cartCount}</span>}
          </Link>

          {/* View all */}
          <Link
            href="/products"
            className="flex items-center gap-2 border border-gray-300 rounded-full
                       px-4 py-2 text-sm text-gray-700 font-medium hover:border-black
                       hover:text-black transition-colors duration-200"
          >
            View all Products <ArrowRight />
          </Link>
        </div>
      </div>

      {/* ── 4-column product grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {PRODUCTS.map((product) => {
          const { id, name, displayPrice, image } = product;
          return (
            <div key={id} className="group flex flex-col gap-2">
              {/* Image — still navigates to product detail */}
              <Link href={`/productdetail/${id}`}>
                <div
                  className="relative rounded-xl overflow-hidden bg-gray-100"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top group-hover:scale-105
                               transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              </Link>

              {/* Info */}
              <div>
                <p className="text-xs text-gray-700 font-medium leading-snug group-hover:text-black
                              transition-colors">
                  {name}
                </p>
                <p className="text-sm font-bold text-[#1a1a1a] mt-0.5">{displayPrice}</p>
              </div>

              {/* Add to Cart button */}
              <AddToCartBtn product={product} onAdd={handleAdd} />
            </div>
          );
        })}
      </div>

      {/* ── 2-column promo banners ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BANNERS.map(({ id, title, description, image, href, bg }) => (
          <div
            key={id}
            className="flex rounded-2xl overflow-hidden"
            style={{ background: bg, minHeight: 200 }}
          >
            {/* Text side */}
            <div className="flex-1 flex flex-col justify-between p-6 pr-4">
              <div>
                <h3 className="text-[#1a1a1a] font-extrabold text-base leading-snug mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>

              {/* Shop Now */}
              <Link
                href={href}
                className="inline-flex items-center gap-2 border border-gray-400 rounded-full
                           px-4 py-2 text-xs font-semibold text-gray-700 mt-4 w-fit
                           hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]
                           transition-all duration-200"
              >
                Shop Now <ArrowRight />
              </Link>
            </div>

            {/* Image side */}
            <div className="relative w-40 shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}