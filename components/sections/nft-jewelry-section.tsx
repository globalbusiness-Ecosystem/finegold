"use client";

import { useState } from "react";
import { Sparkles, Clock, Heart, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";

const RARITY_CONFIG: Record<string, { label: string; labelAr: string; color: string; bg: string; border: string }> = {
  Common:    { label: "Common",    labelAr: "عادي",    color: "text-rarity-common",    bg: "bg-rarity-common/10",    border: "border-rarity-common/30" },
  Rare:      { label: "Rare",      labelAr: "نادر",    color: "text-rarity-rare",      bg: "bg-rarity-rare/10",      border: "border-rarity-rare/30" },
  Legendary: { label: "Legendary", labelAr: "أسطوري", color: "text-rarity-legendary", bg: "bg-rarity-legendary/10", border: "border-rarity-legendary/30" },
};

const NFT_ITEMS: (Product & { rarity: string; edition: string; endsIn?: string; likes: number })[] = [
  {
    id: "n1",
    name: "Golden Dragon Necklace #001",
    nameAr: "قلادة التنين الذهبي #001",
    category: "nft",
    price: 2800,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    seller: "ArtGold Studio",
    verified: true,
    rating: 4.9,
    rarity: "Legendary",
    edition: "1 of 1",
    likes: 342,
    description: "One-of-a-kind digital collectible with real-world 24K gold equivalent. Holder receives physical replica.",
  },
  {
    id: "n2",
    name: "Emerald Serpent Ring #012",
    nameAr: "خاتم الثعبان الزمردي #012",
    category: "nft",
    price: 650,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400",
    seller: "MetalArt",
    verified: true,
    rating: 4.7,
    rarity: "Rare",
    edition: "12 of 50",
    endsIn: "2h 14m",
    likes: 89,
    description: "Hand-crafted digital ring set with virtual emeralds. Part of the Serpent collection.",
  },
  {
    id: "n3",
    name: "Pi Gold Earrings #203",
    nameAr: "أقراط ذهب Pi #203",
    category: "nft",
    price: 180,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    seller: "PiJewels",
    verified: false,
    rating: 4.4,
    rarity: "Common",
    edition: "203 of 500",
    likes: 23,
    description: "Collectible earrings from the Pi Genesis collection.",
  },
  {
    id: "n4",
    name: "Royal Crown Tiara #005",
    nameAr: "تاج ملكي #005",
    category: "nft",
    price: 1400,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
    seller: "LuxNFT",
    verified: true,
    rating: 4.8,
    rarity: "Rare",
    edition: "5 of 20",
    endsIn: "5h 30m",
    likes: 156,
    description: "Rare royal tiara NFT. Physical gold-plated replica shipped to verified owners.",
  },
  {
    id: "n5",
    name: "Phoenix Pendant #099",
    nameAr: "قلادة العنقاء #099",
    category: "nft",
    price: 420,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    seller: "FireGold Art",
    verified: true,
    rating: 4.6,
    rarity: "Rare",
    edition: "99 of 100",
    likes: 67,
  },
  {
    id: "n6",
    name: "Infinity Bracelet #501",
    nameAr: "سوار اللانهاية #501",
    category: "nft",
    price: 95,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
    seller: "LoopArt",
    verified: false,
    rating: 4.2,
    rarity: "Common",
    edition: "501 of 1000",
    likes: 11,
  },
];

interface NftJewelrySectionProps {
  onProductSelect: (product: Product) => void;
  isRTL: boolean;
}

export function NftJewelrySection({ onProductSelect, isRTL }: NftJewelrySectionProps) {
  const [filter, setFilter] = useState<"all" | "Common" | "Rare" | "Legendary">("all");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const filtered = filter === "all" ? NFT_ITEMS : NFT_ITEMS.filter((n) => n.rarity === filter);

  function toggleLike(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={18} className="text-gold" />
          <h2 className="text-lg font-bold text-foreground">
            {isRTL ? "مجوهرات NFT" : "NFT Jewelry"}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {isRTL ? "مقتنيات رقمية نادرة بعملة Pi" : "Rare digital collectibles priced in Pi"}
        </p>
      </div>

      {/* Featured Banner */}
      <div className="px-4 mb-4">
        <div
          className="relative rounded-2xl overflow-hidden border border-gold/20 p-4"
          style={{ background: "linear-gradient(135deg, oklch(0.14 0.02 70) 0%, oklch(0.12 0.01 270) 100%)" }}
        >
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-rarity-legendary/20 text-rarity-legendary border border-rarity-legendary/40 rounded-full px-2.5 py-0.5 font-semibold">
              {isRTL ? "أسطوري" : "Legendary"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-surface-elevated overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"
                alt="Featured NFT"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs text-gold font-medium mb-1">
                {isRTL ? "المميز اليوم" : "Featured Today"}
              </div>
              <div className="text-base font-bold text-foreground leading-tight">
                {isRTL ? "قلادة التنين الذهبي" : "Golden Dragon Necklace"}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">1 of 1 — Edition</div>
              <div className="text-lg font-bold text-gold mt-1">2,800 π</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rarity Filter */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {(["all", "Common", "Rare", "Legendary"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                filter === r
                  ? r === "all"
                    ? "bg-gold text-primary-foreground border-gold"
                    : r === "Legendary"
                    ? "bg-rarity-legendary/20 text-rarity-legendary border-rarity-legendary/50"
                    : r === "Rare"
                    ? "bg-rarity-rare/20 text-rarity-rare border-rarity-rare/50"
                    : "bg-rarity-common/20 text-rarity-common border-rarity-common/50"
                  : "bg-surface border-border text-muted-foreground"
              }`}
            >
              {r === "all"
                ? isRTL ? "الكل" : "All"
                : isRTL
                ? RARITY_CONFIG[r].labelAr
                : r}
            </button>
          ))}
        </div>
      </div>

      {/* NFT Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((nft) => {
          const rarity = RARITY_CONFIG[nft.rarity];
          const isLiked = likedIds.has(nft.id);
          return (
            <button
              key={nft.id}
              onClick={() => onProductSelect(nft)}
              className="text-left bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/30 active:scale-95 transition-all duration-150"
            >
              <div className="relative aspect-square bg-surface-elevated">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                {/* Rarity Badge */}
                <span
                  className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${rarity.color} ${rarity.bg} ${rarity.border}`}
                >
                  {isRTL ? rarity.labelAr : rarity.label}
                </span>
                {/* Like button */}
                <button
                  onClick={(e) => toggleLike(e, nft.id)}
                  className="absolute bottom-2 right-2 p-1.5 bg-background/70 backdrop-blur-sm rounded-full"
                >
                  <Heart
                    size={13}
                    className={isLiked ? "fill-red-400 text-red-400" : "text-muted-foreground"}
                  />
                </button>
                {/* Auction timer */}
                {nft.endsIn && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/70 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <Clock size={10} className="text-gold" />
                    <span className="text-xs text-gold font-medium">{nft.endsIn}</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-xs font-semibold text-foreground leading-tight line-clamp-2 mb-1">
                  {isRTL ? nft.nameAr : nft.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {nft.verified && <ShieldCheck size={11} className="text-gold" />}
                  <span className="text-xs text-muted-foreground truncate">{nft.seller}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{nft.edition}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gold">{nft.price.toLocaleString()} π</span>
                  <div className="flex items-center gap-0.5">
                    <Heart size={10} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{(nft.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
