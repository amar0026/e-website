"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Icons ── */
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const UpiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const CodIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M12 12h.01" />
    <path d="M7 12h.01M17 12h.01" />
  </svg>
);

/* ── Order summary items ── */
const ORDER_ITEMS = [
  {
    id: 1,
    name: "Oversized Linen Blazer",
    subtitle: "Warm Taupe · Size M",
    price: 4299,
    quantity: 1,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775048545/80e9a236a39d0c855c5d4a3c888dfc443a5412a3_ccxmz8.png",
  },
  {
    id: 2,
    name: "Minimal Wrap Dress",
    subtitle: "Dusty Blue · Size S",
    price: 3199,
    quantity: 2,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/1579733d0c3681a81a49ae45c5ef7ef77f3c1b5d_bcnjot.png",
  },
  {
    id: 3,
    name: "Structured Crop Top",
    subtitle: "Ivory · Size XS",
    price: 1849,
    quantity: 1,
    image: "https://res.cloudinary.com/dquki4xol/image/upload/v1775048546/c0e3db74138bdd0508af32c4b91a46f45c6fbdee_psseso.png",
  },
];

type PaymentMethod = "card" | "upi" | "wallet" | "cod";

const PAYMENT_TABS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "card",   label: "Credit / Debit Card", icon: <CardIcon /> },
  { id: "upi",    label: "UPI",                  icon: <UpiIcon /> },
  { id: "wallet", label: "Wallets",              icon: <WalletIcon /> },
  { id: "cod",    label: "Cash on Delivery",     icon: <CodIcon /> },
];

const WALLETS = ["PhonePe", "Paytm", "Amazon Pay", "Mobikwik"];

export default function PaymentPage() {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardNum, setCardNum]     = useState("");
  const [cardName, setCardName]   = useState("");
  const [expiry, setExpiry]       = useState("");
  const [cvv, setCvv]             = useState("");
  const [upiId, setUpiId]         = useState("");
  const [wallet, setWallet]       = useState("PhonePe");
  const [saveCard, setSaveCard]   = useState(false);
  const [paid, setPaid]           = useState(false);
  const [paying, setPaying]       = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = Math.round(subtotal * 0.1); // WEAR10 applied
  const shipping = 0;
  const total    = subtotal - discount + shipping;

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); }, 2000);
  };

  /* ── SUCCESS SCREEN ── */
  if (paid) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] font-sans flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl border border-[#ede9e2] p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#d8d3c8] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-gray-400 mb-2">Payment Successful</p>
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">Order Confirmed!</h1>
          <p className="text-sm text-gray-500 mb-2">
            Your order <span className="font-bold text-[#1a1a1a]">#VES-29471</span> has been placed.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            A confirmation email has been sent to your registered address.
          </p>
          <div className="bg-[#f5f3f0] rounded-2xl p-4 mb-8 text-left">
            <p className="text-xs text-gray-400 mb-1">Amount Paid</p>
            <p className="text-2xl font-extrabold">₹{total.toLocaleString("en-IN")}</p>
          </div>
          <Link href="/shop"
            className="inline-flex items-center justify-center w-full py-4 rounded-full
                       bg-[#1a1a1a] text-white text-sm font-bold tracking-wide
                       hover:bg-[#333] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0] font-sans text-[#1a1a1a]">

      {/* ── NAVBAR ── */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
         
          {/* Breadcrumb steps */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
            {["Cart", "Details", "Payment"].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-300">›</span>}
                <span className={step === "Payment"
                  ? "text-[#1a1a1a] font-bold"
                  : "text-gray-400"}>
                  {step}
                </span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <LockIcon />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-8 items-start">

          {/* ══ LEFT: PAYMENT FORM ══ */}
          <div className="flex flex-col gap-6">

            {/* Back link */}
            <Link href="/addtocart"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400
                         hover:text-[#1a1a1a] transition-colors w-fit">
              <ChevronLeft /> Back to Cart
            </Link>

            {/* Title */}
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-gray-400 mb-1">
                Step 3 of 3
              </p>
              <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-none tracking-tight">
                Payment
              </h1>
            </div>

            {/* Delivery address (read-only recap) */}
            <div className="bg-white rounded-2xl border border-[#ede9e2] p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-gray-400">
                  Delivering to
                </p>
                <Link href="/checkout/details"
                  className="text-xs text-[#1a1a1a] underline hover:no-underline">
                  Edit
                </Link>
              </div>
              <p className="text-sm font-semibold">Rohan Mehta</p>
              <p className="text-sm text-gray-500">
                42, Tagore Road, Ballygunge, Kolkata — 700019, West Bengal
              </p>
              <p className="text-sm text-gray-400 mt-0.5">+91 98765 43210</p>
            </div>

            {/* Payment method tabs */}
            <div className="bg-white rounded-2xl border border-[#ede9e2] overflow-hidden">
              {/* Tab list */}
              <div className="divide-y divide-[#f0ece6]">
                {PAYMENT_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMethod(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left
                                transition-colors
                                ${method === tab.id ? "bg-[#f5f3f0]" : "hover:bg-[#faf9f7]"}`}
                  >
                    {/* Radio dot */}
                    <span className={`w-4 h-4 rounded-full border-[1.5px] flex items-center
                                      justify-center shrink-0 transition-colors
                                      ${method === tab.id
                                        ? "border-[#1a1a1a] bg-[#1a1a1a]"
                                        : "border-gray-300"}`}>
                      {method === tab.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                      )}
                    </span>
                    <span className={`text-gray-500 transition-colors
                                      ${method === tab.id ? "text-[#1a1a1a]" : ""}`}>
                      {tab.icon}
                    </span>
                    <span className={`text-sm font-semibold
                                      ${method === tab.id ? "text-[#1a1a1a]" : "text-gray-500"}`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── CARD FORM ── */}
            {method === "card" && (
              <div className="bg-white rounded-2xl border border-[#ede9e2] p-6 flex flex-col gap-4">
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-gray-400 mb-1">
                  Card Details
                </p>

                {/* Card number */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNum}
                      onChange={(e) => setCardNum(formatCard(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd4]
                                 bg-[#f5f3f0] text-sm text-[#1a1a1a] outline-none
                                 focus:border-[#1a1a1a] transition-colors pr-12"
                    />
                    {/* Card brand ghost */}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs
                                     font-bold text-gray-300 tracking-widest">
                      {cardNum.startsWith("4") ? "VISA"
                        : cardNum.startsWith("5") ? "MC"
                        : cardNum.startsWith("6") ? "RuPay"
                        : "CARD"}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Name on Card</label>
                  <input
                    type="text"
                    placeholder="ROHAN MEHTA"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl border border-[#e0dbd4]
                               bg-[#f5f3f0] text-sm text-[#1a1a1a] outline-none
                               focus:border-[#1a1a1a] transition-colors tracking-widest"
                  />
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd4]
                                 bg-[#f5f3f0] text-sm text-[#1a1a1a] outline-none
                                 focus:border-[#1a1a1a] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      placeholder="•••"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd4]
                                 bg-[#f5f3f0] text-sm text-[#1a1a1a] outline-none
                                 focus:border-[#1a1a1a] transition-colors"
                    />
                  </div>
                </div>

                {/* Save card toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setSaveCard((s) => !s)}
                    className={`w-10 h-5 rounded-full border-[1.5px] transition-colors relative
                                ${saveCard ? "bg-[#1a1a1a] border-[#1a1a1a]" : "bg-white border-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white
                                      transition-all shadow-sm
                                      ${saveCard ? "left-[18px]" : "left-0.5"}`} />
                  </button>
                  <span className="text-xs text-gray-500">Securely save card for future purchases</span>
                </label>
              </div>
            )}

            {/* ── UPI FORM ── */}
            {method === "upi" && (
              <div className="bg-white rounded-2xl border border-[#ede9e2] p-6 flex flex-col gap-4">
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-gray-400 mb-1">
                  UPI ID
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e0dbd4]
                               bg-[#f5f3f0] text-sm text-[#1a1a1a] outline-none
                               focus:border-[#1a1a1a] transition-colors"
                  />
                  {upiId.includes("@") && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                      <CheckIcon />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  Enter your UPI ID and verify. You'll receive a payment request on your UPI app.
                </p>
                {/* QR hint */}
                <div className="bg-[#f5f3f0] rounded-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#d8d3c8] rounded-lg grid grid-cols-3 gap-px p-1.5">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className={`rounded-sm ${[0,2,4,6,8].includes(i) ? "bg-[#1a1a1a]" : "bg-transparent"}`} />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1a1a1a]">Scan QR Code</p>
                    <p className="text-xs text-gray-400">Open any UPI app and scan to pay</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── WALLETS ── */}
            {method === "wallet" && (
              <div className="bg-white rounded-2xl border border-[#ede9e2] p-6">
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-gray-400 mb-4">
                  Select Wallet
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {WALLETS.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWallet(w)}
                      className={`py-3 px-4 rounded-xl border-[1.5px] text-sm font-semibold
                                  transition-all text-left
                                  ${wallet === w
                                    ? "border-[#1a1a1a] bg-[#f5f3f0] text-[#1a1a1a]"
                                    : "border-[#e0dbd4] text-gray-400 hover:border-gray-300"}`}
                    >
                      <span className="flex items-center gap-2">
                        {wallet === w && <CheckIcon />}
                        {w}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── COD ── */}
            {method === "cod" && (
              <div className="bg-white rounded-2xl border border-[#ede9e2] p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#d8d3c8] flex items-center justify-center shrink-0">
                    <CodIcon />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1">Pay when you receive</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Pay in cash when your order arrives at your doorstep. A ₹49 handling
                      fee applies for COD orders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pay button (mobile: shown here too) */}
            <button
              onClick={handlePay}
              disabled={paying}
              className="lg:hidden w-full py-4 rounded-full bg-[#1a1a1a] text-white text-sm
                         font-bold tracking-wide flex items-center justify-center gap-2
                         hover:bg-[#333] transition-colors disabled:opacity-60"
            >
              {paying ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing…
                </span>
              ) : (
                <><LockIcon /> Pay ₹{total.toLocaleString("en-IN")}</>
              )}
            </button>
          </div>

          {/* ══ RIGHT: ORDER SUMMARY ══ */}
          <aside className="flex flex-col gap-5">

            {/* Mobile collapsible toggle */}
            <button
              className="lg:hidden flex justify-between items-center bg-white rounded-2xl
                         border border-[#ede9e2] px-5 py-4 text-sm font-bold w-full"
              onClick={() => setSummaryOpen((o) => !o)}
            >
              <span>Order Summary ({ORDER_ITEMS.length} items)</span>
              <span className="text-gray-400 text-xs">{summaryOpen ? "▲" : "▼"}</span>
            </button>

            <div className={`lg:block ${summaryOpen ? "block" : "hidden"}`}>
              <div className="bg-white rounded-2xl border border-[#ede9e2] p-6 lg:sticky lg:top-20">
                <h2 className="text-base font-extrabold tracking-tight mb-5 hidden lg:block">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="flex flex-col gap-4 mb-5">
                  {ORDER_ITEMS.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-[#dde4ec] shrink-0">
                        <Image src={item.image} alt={item.name} fill
                          className="object-cover object-top" />
                        <span className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white
                                         text-[9px] font-bold rounded-full w-4 h-4
                                         flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
                      </div>
                      <span className="text-sm font-bold shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#f0ece6] pt-4 flex flex-col gap-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#2d6a4f] font-semibold">
                    <span>Discount (WEAR10)</span>
                    <span>−₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="text-[#2d6a4f] font-semibold">Free</span>
                  </div>
                  <div className="border-t border-[#f0ece6] pt-3 flex justify-between
                                  text-base font-extrabold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Pay button (desktop) */}
                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="hidden lg:flex w-full py-4 rounded-full bg-[#1a1a1a] text-white
                             text-sm font-bold tracking-wide items-center justify-center gap-2
                             hover:bg-[#333] transition-colors mb-3 disabled:opacity-60"
                >
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Processing…
                    </span>
                  ) : (
                    <><LockIcon /> Pay ₹{total.toLocaleString("en-IN")}</>
                  )}
                </button>

                {/* Trust row */}
                <div className="flex justify-around text-[10.5px] text-gray-400
                                border-t border-[#f0ece6] pt-4">
                  {["🔒 256-bit SSL", "🚚 Free Returns", "✦ Authentic"].map((b) => (
                    <span key={b}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}