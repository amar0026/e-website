"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ── Icons ── */
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
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
const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
  </svg>
);
const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Nav ── */
const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Collection", href: "/collection" },
  { label: "Blogs", href: "/blogs" },
  { label: "Reviews", href: "/reviews" },
];

const CART_STORAGE_KEY = "vessa_cart";

type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
  qty: number;
};

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

const YOU_MAY_LIKE = [
  { id: "4", name: "Trail-Ready Cargo Jacket", price: 6499, originalPrice: 8499, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775108997/88ccfe6075518d8b94e74e5da3ff1eed307703f0_lfndej.png", tag: "Limited" },
  { id: "5", name: "Casual Stripe Shirt", price: 3999, originalPrice: 5499, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111039/8390ee94a969f210e093299f78e4ff1b0afa5404_rumknz.jpg", tag: "Featured" },
  { id: "6", name: "Multicolor Check Shacket", price: 5499, originalPrice: 7499, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111038/f9f9be50b551f3032dfa5ad6a6d470043c4e513c_njacg0.png", tag: "Featured" },
  { id: "7", name: "Plaid Flannel Shirt", price: 4499, originalPrice: 5999, image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775111037/24f7a8646e98f00a66361f1a6d1cc8a9da0b54c3_c2wbyl.jpg", tag: "Featured" },
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount + delivery;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      );
      persistCart(updated);
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      persistCart(updated);
      return updated;
    });
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "VESSA10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  /* ── Navigate to payment page, pass order summary via query params ── */
  const handleCheckout = () => {
    const params = new URLSearchParams({
      subtotal: subtotal.toString(),
      discount: discount.toString(),
      delivery: delivery.toString(),
      total: total.toString(),
      coupon: couponApplied ? "VESSA10" : "",
      itemCount: items.reduce((s, i) => s + i.qty, 0).toString(),
    });
    router.push(`/payment?${params.toString()}`);
  };

  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">

      {/* ── NAVBAR ── */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-6">
          <Link href="/" className="text-xl font-black uppercase shrink-0 hover:opacity-80 transition-opacity" style={{ letterSpacing: "0.18em" }}>
            VESSA
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap">{label}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 focus-within:border-gray-500 transition-colors w-36">
              <SearchIcon />
              <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full" />
            </div>
            <button className="text-gray-700 hover:text-black transition-colors"><UserIcon /></button>
            <Link href="/cart" className="relative text-gray-700 hover:text-black transition-colors">
              <CartIcon />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <button className="text-gray-700"><UserIcon /></button>
            <Link href="/cart" className="relative text-gray-700">
              <CartIcon />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
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
              <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full" />
            </div>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)} className="text-sm text-gray-700 hover:text-black transition-colors">{label}</Link>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
          <ChevronRight />
          <span className="text-[#1a1a1a] font-medium">Shopping Bag</span>
        </div>

        <div className="mb-8">
          <p className="text-[11px] tracking-[0.14em] uppercase text-gray-400 mb-1">Review your order</p>
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-tight leading-tight">
            Shopping Bag
            <span className="text-gray-300 font-normal text-2xl ml-3">({cartCount})</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-full bg-[#ede9e2] flex items-center justify-center mb-5"><CartIcon /></div>
            <h2 className="text-xl font-extrabold mb-2">Your bag is empty</h2>
            <p className="text-sm text-gray-400 mb-7 max-w-xs leading-relaxed">Looks like you haven't added anything yet. Browse our latest collection.</p>
            <Link href="/" className="bg-[#1a1a1a] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#333] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-12">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-4">
              {delivery > 0 && (
                <div className="bg-white rounded-2xl border border-[#ede9e2] px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[#1a1a1a]">
                      Add <span className="font-extrabold">₹{(999 - subtotal).toLocaleString("en-IN")}</span> more for free delivery
                    </p>
                    <span className="text-[10px] text-gray-400">₹999 threshold</span>
                  </div>
                  <div className="h-1.5 bg-[#ede9e2] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a1a1a] rounded-full transition-all duration-500" style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }} />
                  </div>
                </div>
              )}
              {delivery === 0 && (
                <div className="bg-[#f0faf5] border border-[#b7e4cc] rounded-2xl px-5 py-3.5 flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#2d6a4f] flex items-center justify-center shrink-0"><CheckIcon /></span>
                  <p className="text-xs font-semibold text-[#2d6a4f]">You've unlocked <span className="font-extrabold">Free Delivery!</span> 🎉</p>
                </div>
              )}

              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-[#ede9e2] p-4 sm:p-5 flex gap-4 sm:gap-5 group transition-shadow hover:shadow-sm">
                  <Link href={`/productdetail/${item.id}`} className="relative w-24 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden bg-[#dde4ec] shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover object-top" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="min-w-0">
                          <p className="text-[10px] tracking-[0.14em] uppercase text-gray-400 font-bold">{item.brand}</p>
                          <Link href={`/productdetail/${item.id}`}>
                            <h3 className="text-sm font-extrabold leading-snug hover:underline underline-offset-2 truncate max-w-[240px]">{item.name}</h3>
                          </Link>
                        </div>
                        <span className="text-sm font-extrabold shrink-0 whitespace-nowrap">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-[#f5f3f0] rounded-full px-2.5 py-1 font-medium">
                          <span className="w-3 h-3 rounded-full border border-gray-300 shrink-0" style={{ backgroundColor: item.colorHex }} />
                          {item.color}
                        </span>
                        <span className="text-[11px] text-gray-500 bg-[#f5f3f0] rounded-full px-2.5 py-1 font-medium">Size: {item.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                      <div className="flex items-center border border-[#e0dbd4] rounded-full overflow-hidden">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-base text-[#3a3a3a] hover:bg-[#f5f3f0] transition-colors">−</button>
                        <span className="w-7 text-center text-xs font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-base text-[#3a3a3a] hover:bg-[#f5f3f0] transition-colors">+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-[#1a1a1a] transition-colors font-medium"><HeartIcon /> Save</button>
                        <span className="w-px h-3 bg-gray-200" />
                        <button onClick={() => removeItem(item.id)} className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-red-500 transition-colors font-medium"><TrashIcon /> Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#1a1a1a] transition-colors self-start mt-1">
                ← Continue Shopping
              </Link>
            </div>

            {/* ── RIGHT: ORDER SUMMARY ── */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[#ede9e2] p-6 sticky top-20">
                <h2 className="text-base font-extrabold tracking-tight mb-5">Order Summary</h2>
                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({cartCount} items)</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2d6a4f] font-medium">Coupon (VESSA10)</span>
                      <span className="text-[#2d6a4f] font-semibold">− ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className={`font-semibold ${delivery === 0 ? "text-[#2d6a4f]" : ""}`}>
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>
                </div>
                <div className="border-t border-[#ede9e2] pt-4 mb-5">
                  <div className="flex justify-between">
                    <span className="font-extrabold text-base">Total</span>
                    <span className="font-extrabold text-lg">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  {couponApplied && <p className="text-[11px] text-[#2d6a4f] mt-1 font-medium">You saved ₹{discount.toLocaleString("en-IN")} with VESSA10</p>}
                </div>

                <div className="mb-5">
                  <label className="flex items-center gap-1.5 text-xs font-bold mb-2"><TagIcon /> Coupon Code</label>
                  <div className="flex gap-2">
                    <input type="text" value={coupon}
                      onChange={(e) => { setCoupon(e.target.value); setCouponError(false); }}
                      placeholder="Enter code (try VESSA10)"
                      disabled={couponApplied}
                      className="flex-1 border border-[#e0dbd4] rounded-xl px-3 py-2.5 text-xs placeholder-gray-300 outline-none focus:border-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    />
                    <button onClick={applyCoupon} disabled={couponApplied || !coupon.trim()}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
                      {couponApplied ? "✓ Applied" : "Apply"}
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-400 mt-1.5 font-medium">Invalid coupon code. Try VESSA10.</p>}
                  {couponApplied && (
                    <p className="text-[11px] text-[#2d6a4f] mt-1.5 font-medium flex items-center gap-1"><CheckIcon /> 10% discount applied!</p>
                  )}
                </div>

                {/* ── Proceed to Checkout → /payment ── */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#1a1a1a] text-white py-4 rounded-full text-sm
                             font-bold tracking-wide hover:bg-[#333] active:scale-[0.98]
                             transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <LockIcon /> Proceed to Checkout
                </button>

                <button className="w-full border border-[#1a1a1a] text-[#1a1a1a] py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-[#1a1a1a] hover:text-white transition-all mb-5">
                  Buy Now — Pay Later
                </button>

                <div className="flex flex-col gap-2">
                  {["🔒 SSL Secured Checkout", "🚚 Free delivery above ₹999", "↩ Easy 15-day returns"].map((t) => (
                    <span key={t} className="text-[11px] text-gray-400 flex items-center gap-1.5">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#ede9e2] p-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3 text-center">Accepted Payment Methods</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {["Visa", "Mastercard", "UPI", "PayTM", "NetBanking", "COD"].map((method) => (
                    <span key={method} className="text-[10px] font-bold text-gray-500 border border-gray-200 rounded-md px-2.5 py-1.5 bg-[#fafafa]">{method}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <section className="mt-16 mb-6">
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.14em] uppercase text-gray-400 mb-1">Before you go</p>
              <h2 className="text-2xl font-extrabold tracking-tight">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {YOU_MAY_LIKE.map((item) => (
                <Link key={item.id} href={`/productdetail/${item.id}`}
                  className="group bg-white rounded-2xl border border-[#ede9e2] overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-52 sm:h-64 bg-[#dde4ec] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.12em] uppercase font-bold text-[#1a1a1a] bg-[#d8d3c8] rounded-full px-2.5 py-1">{item.tag}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold mb-1 truncate">{item.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <p className="text-sm font-extrabold">₹{item.price.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-gray-400 line-through">₹{item.originalPrice.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}