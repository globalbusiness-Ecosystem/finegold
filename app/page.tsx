"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  BarChart2,
  Sparkles,
  Tag,
  Wallet,
  X,
  ShieldCheck,
  Star,
  Heart,
  Clock,
  TrendingUp,
  Globe,
  ChevronRight,
  Menu,
  Settings,
} from "lucide-react";
import { BrowseSection } from "@/components/sections/browse-section";
import { GoldMarketSection } from "@/components/sections/gold-market-section";
import { NftJewelrySection } from "@/components/sections/nft-jewelry-section";
import { SellSection } from "@/components/sections/sell-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { PiPaymentButton } from "@/components/pi-payment-button";
import { SidebarMenu } from "@/components/sidebar-menu";
import { SettingsPage } from "@/components/settings-page";
import type { Product } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "browse" | "market" | "nft" | "sell" | "portfolio";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "info" | "error";
}

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS: { id: Tab; icon: React.ElementType; label: string; labelAr: string }[] = [
  { id: "browse",    icon: ShoppingBag, label: "Browse",    labelAr: "تصفح"    },
  { id: "market",   icon: BarChart2,   label: "Market",    labelAr: "السوق"   },
  { id: "nft",      icon: Sparkles,    label: "NFT",       labelAr: "NFT"     },
  { id: "sell",     icon: Tag,         label: "Sell",      labelAr: "بيع"     },
  { id: "portfolio",icon: Wallet,      label: "Portfolio", labelAr: "محفظة"   },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FineGoldApp() {
  const [activeTab, setActiveTab]           = useState<Tab>("browse");
  const [isRTL, setIsRTL]                   = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalClosing, setModalClosing]     = useState(false);
  const [toasts, setToasts]                 = useState<Toast[]>([]);
  const [likedProducts, setLikedProducts]   = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [settingsOpen, setSettingsOpen]     = useState(false);
  let toastCounter = 0;

  // ── Toast helper ────────────────────────────────────────────────────────────
  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  // ── Modal helpers ───────────────────────────────────────────────────────────
  function openProduct(product: Product) {
    setModalClosing(false);
    setSelectedProduct(product);
  }

  function closeModal() {
    setModalClosing(true);
    setTimeout(() => { setSelectedProduct(null); setModalClosing(false); }, 300);
  }

  function toggleLike(id: string) {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast(isRTL ? "تمت الإزالة من المفضلة" : "Removed from wishlist", "info"); }
      else               { next.add(id);    showToast(isRTL ? "تمت الإضافة إلى المفضلة" : "Added to wishlist"); }
      return next;
    });
  }

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  return (
    <div className="relative min-h-screen bg-background max-w-md mx-auto overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 pt-safe-top py-3 border-b border-border bg-background/90 backdrop-blur-md">
        {/* Left — hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors shrink-0"
          aria-label={isRTL ? "فتح القائمة" : "Open menu"}
        >
          <Menu size={18} />
        </button>

        {/* Center — logo + domain */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gold flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-xs leading-none">F</span>
            </div>
            <span className="text-base font-bold text-foreground leading-none">FineGold</span>
          </div>
          <span className="text-xs text-gold leading-tight tracking-wide mt-0.5">finegold.pi</span>
        </div>

        {/* Right — settings gear */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors shrink-0"
          aria-label={isRTL ? "الإعدادات" : "Settings"}
        >
          <Settings size={18} />
        </button>
      </header>

      {/* ── Scrollable Content ──────────────────────────────────────────────── */}
      <main className="overflow-y-auto h-[calc(100vh-56px-64px)]">
        {activeTab === "browse"    && <BrowseSection    onProductSelect={openProduct} isRTL={isRTL} />}
        {activeTab === "market"    && <GoldMarketSection onProductSelect={openProduct} isRTL={isRTL} />}
        {activeTab === "nft"       && <NftJewelrySection onProductSelect={openProduct} isRTL={isRTL} />}
        {activeTab === "sell"      && <SellSection isRTL={isRTL} onToast={(msg) => showToast(msg)} />}
        {activeTab === "portfolio" && <PortfolioSection isRTL={isRTL} username="PiUser_AE" />}
      </main>

      {/* ── Fixed Bottom Nav ─────────────────────────────────────────────────── */}
      <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-stretch h-16 pb-safe-bottom">
          {NAV_ITEMS.map(({ id, icon: Icon, label, labelAr }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all relative ${
                  active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={isRTL ? labelAr : label}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gold" />
                )}
                <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
                <span className="text-xs font-medium leading-none">{isRTL ? labelAr : label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Product Modal ────────────────────────────────────────────────────── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center max-w-md mx-auto"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProduct.name}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-background/70 backdrop-blur-sm ${modalClosing ? "animate-fade-out" : "animate-fade-in"}`}
            onClick={closeModal}
          />

          {/* Sheet */}
          <div
            className={`relative w-full bg-surface border-t border-border rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col ${
              modalClosing ? "animate-slide-down" : "animate-slide-up"
            }`}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              {/* Product Image */}
              <div className="w-full aspect-square bg-surface-elevated shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={isRTL ? selectedProduct.nameAr : selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 py-5" dir={isRTL ? "rtl" : "ltr"}>
                {/* Badges row */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {selectedProduct.verified && (
                    <span className="flex items-center gap-1 text-xs bg-gold/10 text-gold border border-gold/30 rounded-full px-2.5 py-0.5 font-medium">
                      <ShieldCheck size={11} />
                      {isRTL ? "موثق KYC" : "KYC Verified"}
                    </span>
                  )}
                  {selectedProduct.badge && (
                    <span className="text-xs bg-surface-elevated text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                      {selectedProduct.badge}
                    </span>
                  )}
                  {selectedProduct.rarity && (
                    <span className={`text-xs rounded-full px-2.5 py-0.5 font-semibold border ${
                      selectedProduct.rarity === "Legendary"
                        ? "bg-rarity-legendary/10 text-rarity-legendary border-rarity-legendary/30"
                        : selectedProduct.rarity === "Rare"
                        ? "bg-rarity-rare/10 text-rarity-rare border-rarity-rare/30"
                        : "bg-rarity-common/10 text-rarity-common border-rarity-common/30"
                    }`}>
                      {selectedProduct.rarity}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-foreground leading-tight text-balance mb-1">
                  {isRTL ? selectedProduct.nameAr : selectedProduct.name}
                </h2>

                {/* Seller + Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-gold" />
                    <span className="text-sm text-muted-foreground">{selectedProduct.seller}</span>
                  </div>
                  {selectedProduct.rating && (
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-gold fill-gold" />
                      <span className="text-sm font-medium text-foreground">{selectedProduct.rating}</span>
                    </div>
                  )}
                  {selectedProduct.endsIn && (
                    <div className="flex items-center gap-1 ml-auto">
                      <Clock size={12} className="text-gold" />
                      <span className="text-sm text-gold font-medium">{selectedProduct.endsIn}</span>
                    </div>
                  )}
                </div>

                {/* Specs */}
                {(selectedProduct.weight || selectedProduct.purity || selectedProduct.edition) && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {selectedProduct.weight && (
                      <div className="bg-surface-elevated rounded-xl px-3 py-2 text-center">
                        <div className="text-xs text-muted-foreground">{isRTL ? "الوزن" : "Weight"}</div>
                        <div className="text-sm font-bold text-foreground">{selectedProduct.weight}</div>
                      </div>
                    )}
                    {selectedProduct.purity && (
                      <div className="bg-surface-elevated rounded-xl px-3 py-2 text-center">
                        <div className="text-xs text-muted-foreground">{isRTL ? "النقاء" : "Purity"}</div>
                        <div className="text-sm font-bold text-foreground">{selectedProduct.purity}</div>
                      </div>
                    )}
                    {selectedProduct.edition && (
                      <div className="bg-surface-elevated rounded-xl px-3 py-2 text-center">
                        <div className="text-xs text-muted-foreground">{isRTL ? "الإصدار" : "Edition"}</div>
                        <div className="text-sm font-bold text-foreground">{selectedProduct.edition}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                {selectedProduct.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {selectedProduct.description}
                  </p>
                )}

                {/* Price + Actions */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{isRTL ? "السعر" : "Price"}</div>
                    <div className="text-2xl font-bold text-gold">
                      {selectedProduct.price.toLocaleString()} <span className="text-lg">π</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLike(selectedProduct.id)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      likedProducts.has(selectedProduct.id)
                        ? "border-red-400/50 bg-red-400/10 text-red-400"
                        : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold"
                    }`}
                    aria-label={isRTL ? "إضافة للمفضلة" : "Add to wishlist"}
                  >
                    <Heart size={17} className={likedProducts.has(selectedProduct.id) ? "fill-red-400" : ""} />
                  </button>
                </div>

                {/* CTA */}
                <PiPaymentButton
                  isRTL={isRTL}
                  onSuccess={() => {
                    showToast(isRTL ? "تمت عملية الدفع بنجاح!" : "Payment successful!", "success");
                    closeModal();
                  }}
                  onError={() => {
                    showToast(isRTL ? "فشلت عملية الدفع. حاول مرة أخرى." : "Payment failed. Please try again.", "error");
                  }}
                />

                <button
                  onClick={() => {
                    showToast(isRTL ? "تمت إضافة عرض السعر" : "Price offer submitted", "info");
                    closeModal();
                  }}
                  className="w-full mt-3 border border-gold/40 text-gold font-semibold py-3.5 rounded-2xl text-sm hover:bg-gold/5 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronRight size={16} />
                  {isRTL ? "تقديم عرض سعر" : "Make an Offer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar Menu ─────────────────────────────────────────────────────── */}
      <SidebarMenu
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(tab) => setActiveTab(tab as Tab)}
        activeTab={activeTab}
        isRTL={isRTL}
      />

      {/* ── Settings Page ─────────────────────────────────────────────────────── */}
      <SettingsPage
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        isRTL={isRTL}
        onRTLChange={setIsRTL}
      />

      {/* ── Toast Stack ──────────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-20 inset-x-0 max-w-md mx-auto px-4 z-50 flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`animate-toast-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg text-sm font-medium ${
              t.type === "error"
                ? "bg-destructive/20 border-destructive/40 text-destructive-foreground"
                : t.type === "info"
                ? "bg-surface-elevated border-border text-foreground"
                : "bg-gold/15 border-gold/40 text-gold"
            }`}
          >
            <span className="flex-1 leading-snug">{t.message}</span>
            <button
              onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
