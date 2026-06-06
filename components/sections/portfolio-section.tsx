"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, ShieldCheck, Wallet, BarChart3, Package } from "lucide-react";

interface Holding {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  image: string;
  verified: boolean;
}

const HOLDINGS: Holding[] = [
  {
    id: "h1",
    name: "24K Gold Bar 10g",
    nameAr: "سبيكة ذهب 24 قيراط 10 جرام",
    category: "Gold Bar",
    quantity: 3,
    avgBuyPrice: 400,
    currentPrice: 420,
    image: "/placeholder.svg?height=56&width=56",
    verified: true,
  },
  {
    id: "h2",
    name: "Diamond Solitaire Ring",
    nameAr: "خاتم ألماس سوليتير",
    category: "Jewelry",
    quantity: 1,
    avgBuyPrice: 1900,
    currentPrice: 1850,
    image: "/placeholder.svg?height=56&width=56",
    verified: true,
  },
  {
    id: "h3",
    name: "NFT Gold Necklace #042",
    nameAr: "قلادة ذهب NFT #042",
    category: "NFT",
    quantity: 2,
    avgBuyPrice: 300,
    currentPrice: 320,
    image: "/placeholder.svg?height=56&width=56",
    verified: false,
  },
  {
    id: "h4",
    name: "22K Gold Bangle",
    nameAr: "سوار ذهب 22 قيراط",
    category: "Jewelry",
    quantity: 1,
    avgBuyPrice: 700,
    currentPrice: 760,
    image: "/placeholder.svg?height=56&width=56",
    verified: true,
  },
];

const HISTORY = [
  { date: "2026-02-28", type: "buy",  item: "24K Gold Bar 10g",         amount: 400,  qty: 1 },
  { date: "2026-02-15", type: "sell", item: "NFT Phoenix Pendant",       amount: 380,  qty: 1 },
  { date: "2026-02-01", type: "buy",  item: "Diamond Ring",              amount: 1900, qty: 1 },
  { date: "2026-01-20", type: "buy",  item: "24K Gold Bar 10g",          amount: 395,  qty: 2 },
  { date: "2026-01-05", type: "sell", item: "Gold Coin 5g",              amount: 210,  qty: 2 },
];

// Sparkline data for portfolio value
const PORTFOLIO_SPARK = [4200, 4350, 4180, 4500, 4420, 4680, 4750, 4900, 4820, 5100, 5050, 5280];

interface PortfolioSectionProps {
  isRTL: boolean;
  username?: string;
}

export function PortfolioSection({ isRTL, username = "Pi User" }: PortfolioSectionProps) {
  const [tab, setTab] = useState<"holdings" | "history">("holdings");

  const totalValue = HOLDINGS.reduce(
    (sum, h) => sum + h.currentPrice * h.quantity,
    0
  );
  const totalCost = HOLDINGS.reduce(
    (sum, h) => sum + h.avgBuyPrice * h.quantity,
    0
  );
  const totalPnL = totalValue - totalCost;
  const totalPnLPct = ((totalPnL / totalCost) * 100).toFixed(2);
  const isProfit = totalPnL >= 0;

  const sparkMin = Math.min(...PORTFOLIO_SPARK);
  const sparkMax = Math.max(...PORTFOLIO_SPARK);
  const H = 52;
  const W = 260;
  const points = PORTFOLIO_SPARK.map((v, i) => {
    const x = (i / (PORTFOLIO_SPARK.length - 1)) * W;
    const y = H - ((v - sparkMin) / (sparkMax - sparkMin)) * H;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex flex-col pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-0.5">
          <Wallet size={18} className="text-gold" />
          <h2 className="text-lg font-bold text-foreground">
            {isRTL ? "محفظتي" : "My Portfolio"}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          @{username}
        </p>
      </div>

      {/* Total Value Card */}
      <div className="px-4 mb-4">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            {isRTL ? "القيمة الإجمالية" : "Total Value"}
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            {totalValue.toLocaleString()} <span className="text-gold">π</span>
          </div>
          <div
            className={`flex items-center gap-1.5 text-sm font-semibold mb-4 ${
              isProfit ? "text-green-400" : "text-red-400"
            }`}
          >
            {isProfit ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
            <span>
              {isProfit ? "+" : ""}
              {totalPnL.toLocaleString()} π ({isProfit ? "+" : ""}{totalPnLPct}%)
            </span>
            <span className="text-xs text-muted-foreground font-normal">
              {isRTL ? "إجمالي" : "all time"}
            </span>
          </div>

          {/* Portfolio Sparkline */}
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14" preserveAspectRatio="none">
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isProfit ? "#4ade80" : "#f87171"} stopOpacity="0.3" />
                <stop offset="100%" stopColor={isProfit ? "#4ade80" : "#f87171"} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke={isProfit ? "#4ade80" : "#f87171"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            <polygon
              fill="url(#portfolioGrad)"
              points={`0,${H} ${points} ${W},${H}`}
            />
          </svg>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
            <div className="text-center">
              <div className="text-base font-bold text-foreground">{HOLDINGS.length}</div>
              <div className="text-xs text-muted-foreground">{isRTL ? "أصول" : "Assets"}</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-foreground">
                {HOLDINGS.filter((h) => h.verified).length}
              </div>
              <div className="text-xs text-muted-foreground">{isRTL ? "موثق" : "Verified"}</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-gold">{totalPnLPct}%</div>
              <div className="text-xs text-muted-foreground">{isRTL ? "الربح" : "P&L"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation donut‑like bar */}
      <div className="px-4 mb-4">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="text-xs text-muted-foreground mb-2">
            {isRTL ? "توزيع الأصول" : "Asset Allocation"}
          </div>
          <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
            <div className="bg-gold rounded-l-full" style={{ width: "48%" }} title="Gold Bars" />
            <div className="bg-rarity-rare rounded-none" style={{ width: "25%" }} title="Jewelry" />
            <div className="bg-rarity-common rounded-none" style={{ width: "15%" }} title="NFT" />
            <div className="bg-muted-foreground rounded-r-full" style={{ width: "12%" }} title="Diamonds" />
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              { color: "bg-gold",             label: isRTL ? "ذهب" : "Gold",    pct: "48%" },
              { color: "bg-rarity-rare",       label: isRTL ? "مجوهرات" : "Jewelry", pct: "25%" },
              { color: "bg-rarity-common",     label: "NFT",                     pct: "15%" },
              { color: "bg-muted-foreground",  label: isRTL ? "ألماس" : "Diamond",  pct: "12%" },
            ].map((a) => (
              <div key={a.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${a.color}`} />
                <span className="text-xs text-muted-foreground">{a.label}</span>
                <span className="text-xs font-semibold text-foreground">{a.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="px-4 mb-3">
        <div className="flex bg-surface border border-border rounded-xl p-1 gap-1">
          {(["holdings", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-gold text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "holdings"
                ? isRTL ? "الممتلكات" : "Holdings"
                : isRTL ? "السجل" : "History"}
            </button>
          ))}
        </div>
      </div>

      {/* Holdings Tab */}
      {tab === "holdings" && (
        <div className="px-4 flex flex-col gap-3">
          {HOLDINGS.map((h) => {
            const pnl = (h.currentPrice - h.avgBuyPrice) * h.quantity;
            const pnlPct = (((h.currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100).toFixed(1);
            const profit = pnl >= 0;
            return (
              <div
                key={h.id}
                className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-3"
              >
                <div className="w-14 h-14 rounded-xl bg-surface-elevated overflow-hidden shrink-0">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    {h.verified && <ShieldCheck size={11} className="text-gold" />}
                    <span className="text-sm font-semibold text-foreground truncate">
                      {isRTL ? h.nameAr : h.name}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {h.category} · x{h.quantity}
                  </div>
                  <div
                    className={`text-xs font-semibold flex items-center gap-0.5 ${
                      profit ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {profit ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {profit ? "+" : ""}{pnl.toLocaleString()} π ({profit ? "+" : ""}{pnlPct}%)
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-base font-bold text-gold">
                    {(h.currentPrice * h.quantity).toLocaleString()} π
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {h.currentPrice} π {isRTL ? "للوحدة" : "each"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div className="px-4 flex flex-col gap-2">
          {HISTORY.map((tx, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  tx.type === "buy" ? "bg-green-400/10" : "bg-red-400/10"
                }`}
              >
                {tx.type === "buy" ? (
                  <Package size={14} className="text-green-400" />
                ) : (
                  <BarChart3 size={14} className="text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">{tx.item}</div>
                <div className="text-xs text-muted-foreground">
                  {tx.date} · x{tx.qty}
                </div>
              </div>
              <div
                className={`text-sm font-bold shrink-0 ${
                  tx.type === "buy" ? "text-red-400" : "text-green-400"
                }`}
              >
                {tx.type === "buy" ? "-" : "+"}{tx.amount} π
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
