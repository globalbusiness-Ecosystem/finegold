"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, ChevronRight, Activity } from "lucide-react";
import type { Product } from "@/lib/types";

const PRICE_DATA = [
  { label: "XAU/USD", price: 2345.80, change: +12.4, changePct: +0.53, unit: "oz" },
  { label: "Gold/Pi", price: 42.5, change: -0.3, changePct: -0.7, unit: "g" },
  { label: "Silver/Pi", price: 1.2, change: +0.05, changePct: +4.3, unit: "g" },
  { label: "Platinum/Pi", price: 28.9, change: +0.8, changePct: +2.8, unit: "g" },
];

const GOLD_LISTINGS: Product[] = [
  {
    id: "g1",
    name: "24K Gold Bar 100g LBMA",
    nameAr: "سبيكة ذهب LBMA 100 جرام",
    category: "gold_bars",
    price: 4200,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400",
    seller: "Swiss Bullion",
    verified: true,
    rating: 5.0,
    purity: "999.9",
    weight: "100g",
    badge: "LBMA",
    description: "London Bullion Market Association certified. Comes with assay certificate and tamper-evident packaging.",
  },
  {
    id: "g2",
    name: "24K Gold Bar 50g",
    nameAr: "سبيكة ذهب 50 جرام",
    category: "gold_bars",
    price: 2100,
    image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=400",
    seller: "GoldVault AE",
    verified: true,
    rating: 4.9,
    purity: "999.9",
    weight: "50g",
  },
  {
    id: "g3",
    name: "22K Gold Bar 20g",
    nameAr: "سبيكة ذهب 22 قيراط 20 جرام",
    category: "gold_bars",
    price: 780,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    seller: "Al-Masa Gold",
    verified: true,
    rating: 4.8,
    purity: "916",
    weight: "20g",
  },
  {
    id: "g4",
    name: "24K Gold Coins (5pc)",
    nameAr: "عملات ذهب 24 قيراط (5 قطع)",
    category: "gold_bars",
    price: 1050,
    image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=400",
    seller: "Coin Masters",
    verified: true,
    rating: 4.7,
    purity: "999",
    weight: "5x5g",
  },
  {
    id: "g5",
    name: "24K Gold Granules 10g",
    nameAr: "حبيبات ذهب 24 قيراط 10 جرام",
    category: "gold_bars",
    price: 420,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400",
    seller: "PureMetals",
    verified: false,
    rating: 4.5,
    purity: "999.9",
    weight: "10g",
  },
];

// Sparkline mock data points
const SPARK = [42, 43, 41.5, 44, 43.5, 45, 44.8, 46, 45.5, 47, 46, 47.5, 48, 47, 42.5];

interface GoldMarketSectionProps {
  onProductSelect: (product: Product) => void;
  isRTL: boolean;
}

export function GoldMarketSection({ onProductSelect, isRTL }: GoldMarketSectionProps) {
  const [selectedWeight, setSelectedWeight] = useState("all");
  const weights = ["all", "1g", "5g", "10g", "20g", "50g", "100g"];

  const filtered = GOLD_LISTINGS.filter(
    (p) => selectedWeight === "all" || p.weight === selectedWeight || (p.weight?.includes(selectedWeight))
  );

  const sparkMin = Math.min(...SPARK);
  const sparkMax = Math.max(...SPARK);
  const sparkH = 48;
  const sparkW = 200;
  const points = SPARK.map((v, i) => {
    const x = (i / (SPARK.length - 1)) * sparkW;
    const y = sparkH - ((v - sparkMin) / (sparkMax - sparkMin)) * sparkH;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex flex-col pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={18} className="text-gold" />
          <h2 className="text-lg font-bold text-foreground">
            {isRTL ? "سوق الذهب" : "Gold Market"}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {isRTL ? "أسعار حية ومعاملات مباشرة بعملة Pi" : "Live prices & direct trades in Pi"}
        </p>
      </div>

      {/* Live Prices Strip */}
      <div className="px-4 mb-4">
        <div className="bg-surface border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">
              {isRTL ? "الأسعار الحية" : "Live Prices"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">{isRTL ? "مباشر" : "Live"}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {PRICE_DATA.map((item) => (
              <div key={item.label} className="bg-surface-elevated rounded-xl p-3">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className="text-base font-bold text-foreground">
                  {item.label === "XAU/USD" ? `$${item.price.toLocaleString()}` : `${item.price} π`}
                </div>
                <div
                  className={`flex items-center gap-0.5 text-xs font-medium mt-0.5 ${
                    item.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  <span>
                    {item.change >= 0 ? "+" : ""}
                    {item.changePct.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sparkline chart */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                {isRTL ? "ذهب/Pi - 7 أيام" : "Gold/Pi — 7 Days"}
              </span>
              <span className="text-xs text-green-400">+12.3%</span>
            </div>
            <svg
              viewBox={`0 0 ${sparkW} ${sparkH}`}
              className="w-full h-12"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.15 78)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="oklch(0.78 0.15 78)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="oklch(0.78 0.15 78)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
              <polygon
                fill="url(#goldGrad)"
                points={`0,${sparkH} ${points} ${sparkW},${sparkH}`}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Weight Filter */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {weights.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedWeight === w
                  ? "bg-gold text-primary-foreground"
                  : "bg-surface border border-border text-muted-foreground hover:border-gold/40"
              }`}
            >
              {w === "all" ? (isRTL ? "الكل" : "All") : w}
            </button>
          ))}
        </div>
      </div>

      {/* Gold Listings */}
      <div className="px-4 flex flex-col gap-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => onProductSelect(item)}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-3 hover:border-gold/40 active:scale-99 transition-all text-left"
          >
            <div className="w-16 h-16 rounded-xl bg-surface-elevated overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm font-semibold text-foreground truncate">
                  {isRTL ? item.nameAr : item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                {item.verified && <ShieldCheck size={11} className="text-gold" />}
                <span className="text-xs text-muted-foreground">{item.seller}</span>
                {item.badge && (
                  <span className="text-xs bg-gold/10 text-gold border border-gold/20 rounded px-1.5 py-0.5 ml-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {item.weight && (
                  <span className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">
                    {item.weight}
                  </span>
                )}
                {item.purity && (
                  <span className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">
                    {item.purity}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-base font-bold text-gold">{item.price.toLocaleString()} π</span>
              <ChevronRight size={14} className="text-muted-foreground mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
