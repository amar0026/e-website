"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PRODUCTS = [
  {
    id: "5",
    name: "Casual Stripe Shirt",
    price: 3999,
    displayPrice: "$49.99",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111039/8390ee94a969f210e093299f78e4ff1b0afa5404_rumknz.jpg",
    color: "White/Navy Stripe",
    colorHex: "#d6dde8",
    size: "M",
  },
  {
    id: "6",
    name: "Multicolor Check Shacket",
    price: 5499,
    displayPrice: "$64.99",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111038/f9f9be50b551f3032dfa5ad6a6d470043c4e513c_njacg0.png",
    color: "Multicolor Check",
    colorHex: "#c89a72",
    size: "M",
  },
  {
    id: "7",
    name: "Plaid Flannel Shirt",
    price: 4499,
    displayPrice: "$54.99",
    brand: "VESSA",
    image:
      "https://res.cloudinary.com/dquki4xol/image/upload/v1775111037/24f7a8646e98f00a66361f1a6d1cc8a9da0b54c3_c2wbyl.jpg",
    color: "Red Plaid",
    colorHex: "#b85450",
    size: "M",
  },
];

type Product = (typeof PRODUCTS)[number];

export const CART_STORAGE_KEY = "vessa_cart";

// ── localStorage helpers (exported so CartPage can reuse) ─────────────────────
export function readCart(): (Product & { qty: number })[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: (Product & { qty: number })[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function addToCartStorage(product: Product) {
  const current = readCart();
  const existing = current.find((i) => i.id === product.id);
  const updated = existing
    ? current.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    : [...current, { ...product, qty: 1 }];
  writeCart(updated);
  return updated;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CartIcon = ({ count }: { count: number }) => (
  <div className="relative inline-flex">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-white text-[10px]
                       font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
        {count}
      </span>
    )}
  </div>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Add-to-Cart Button ─────────────────────────────────────────────────────────
function AddToCartButton({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
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
      className={`flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl
        text-sm font-semibold transition-all duration-300
        ${added
          ? "bg-[#1a1a1a] text-white"
          : "bg-white/90 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
        }`}
    >
      {added ? <><CheckIcon /> Added</> : "Add to Cart"}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FeaturedProducts() {
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return readCart().reduce((s, i) => s + i.qty, 0);
  });

  const handleAddToCart = (product: Product) => {
    const updated = addToCartStorage(product);
    setCartCount(updated.reduce((s, i) => s + i.qty, 0));
  };

  return (
    <section className="w-full max-w-[1920px] mx-auto px-5 sm:px-8 py-10 bg-white">

      {/* ── Header row ── */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
            <CloseIcon />
            <span className="tracking-widest uppercase">Exclusive Finds</span>
          </div>
          <h2
            className="text-[#1a1a1a] font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontFamily: "sans-serif" }}
          >
            Featured Products
          </h2>
        </div>

        <Link
          href="/cart"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1a1a1a]
                     text-[#1a1a1a] text-sm font-semibold hover:bg-[#1a1a1a] hover:text-white
                     transition-colors duration-200"
        >
          <CartIcon count={cartCount} />
          <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
        </Link>
      </div>

      {/* ── 3-column grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRODUCTS.map((product) => {
          const { id, name, displayPrice, image } = product;
          return (
            <div key={id} className="group relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Link href={`/productdetail/${id}`} className="block w-full h-full">
                <Image
                  src={image} alt={name} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>

              <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-4
                             bg-gradient-to-t from-black/70 via-black/30 to-transparent
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold text-sm mb-0.5">{name}</p>
                <p className="text-white/75 text-xs mb-3">{displayPrice}</p>
                <AddToCartButton product={product} onAdd={handleAddToCart} />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}