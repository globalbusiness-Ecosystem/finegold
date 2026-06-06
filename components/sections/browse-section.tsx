"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { PiPaymentButton } from "@/components/pi-payment-button";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "All", labelAr: "الكل" },
  { id: "gold_bars", label: "Gold Bars", labelAr: "سبائك" },
  { id: "jewelry", label: "Jewelry", labelAr: "مجوهرات" },
  { id: "diamonds", label: "Diamonds", labelAr: "ألماس" },
  { id: "nft", label: "NFT", labelAr: "NFT" },
];

const BROWSE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "24K Gold Bar 10g",
    nameAr: "سبيكة ذهب 24 قيراط 10 جرام",
    category: "gold_bars",
    price: 420,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400",
    seller: "GoldVault AE",
    verified: true,
    rating: 4.9,
    purity: "999.9",
    weight: "10g",
    badge: "Top Seller",
  },
  {
    id: "2",
    name: "Diamond Solitaire Ring",
    nameAr: "خاتم ألماس",
    category: "jewelry",
    price: 1850,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    seller: "LuxJewels Dubai",
    verified: true,
    rating: 4.8,
    badge: "Certified",
  },
  {
    id: "3",
    name: "0.5ct Diamond Loose",
    nameAr: "ألماس مفكك 0.5 قيراط",
    category: "diamonds",
    price: 980,
    image: "https://images.unsplash.com/photo-1573408301185-9519f94816c1?w=400",
    seller: "DiamondHub",
    verified: true,
    rating: 4.7,
  },
  {
    id: "4",
    name: "NFT Gold Necklace #042",
    nameAr: "قلادة ذهب NFT",
    category: "nft",
    price: 320,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    seller: "MetalArt Studio",
    verified: false,
    rating: 4.5,
    badge: "Rare",
  },
  {
    id: "5",
    name: "22K Gold Bangle",
    nameAr: "سوار ذهب 22 قيراط",
    category: "jewelry",
    price: 760,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    seller: "Al-Fakhry Gold",
    verified: true,
    rating: 4.9,
    purity: "916",
    weight: "18g",
  },
  {
    id: "6",
    name: "24K Gold Bar 1g",
    nameAr: "سبيكة ذهب 1 جرام",
    category: "gold_bars",
    price: 52,
    image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=400",
    seller: "MicroGold Co",
    verified: true,
    rating: 4.6,
    purity: "999.9",
    weight: "1g",
  },
];

interface BrowseSectionProps {
  onProductSelect: (product: Product) => void;
  isRTL: boolean;
}

export function BrowseSection({ onProductSelect, isRTL }: BrowseSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filtered = BROWSE_PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.seller.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-full pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-surface mx-4 mt-4 rounded-2xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589656966895-2f33e7835fd8?w=800')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            borderRadius: "inherit",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.10 0.02 70 / 0.92) 0%, oklch(0.12 0.03 78 / 0.85) 100%)",
            borderRadius: "inherit",
          }}
        />
        <div className="relative px-5 py-7">
          <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-3">
            <TrendingUp size={12} className="text-gold" />
            <span className="text-xs text-gold font-medium tracking-wide">
              {isRTL ? "منصة Pi للذهب والمجوهرات" : "Pi Gold & Jewelry Platform"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground leading-tight text-balance mb-1">
            {isRTL ? "FineGold" : "FineGold"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {isRTL
              ? "اشترِ وبيع الذهب والمجوهرات بعملة Pi"
              : "Buy & sell gold, diamonds and jewelry using Pi"}
          </p>
          <div className="flex gap-3 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gold">2,400+</div>
              <div className="text-xs text-muted-foreground">{isRTL ? "منتج" : "Products"}</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-lg font-bold text-gold">380+</div>
              <div className="text-xs text-muted-foreground">{isRTL ? "بائع موثق" : "Verified Sellers"}</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-lg font-bold text-gold">42</div>
              <div className="text-xs text-muted-foreground">{isRTL ? "دولة" : "Countries"}</div>
            </div>
          </div>
          <PiPaymentButton
            variant="hero"
            isRTL={isRTL}
            onSuccess={() =>
              toast({ title: isRTL ? "تمت عملية الدفع بنجاح!" : "Payment successful!" })
            }
            onError={() =>
              toast({
                title: isRTL ? "فشلت عملية الدفع" : "Payment failed",
                description: isRTL ? "حاول مرة أخرى" : "Please try again",
                variant: "destructive",
              })
            }
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute top-1/2 -translate-y-1/2 text-muted-foreground"
              style={{ [isRTL ? "right" : "left"]: "12px" }}
            />
            <input
              type="text"
              placeholder={isRTL ? "ابحث عن ذهب، مجوهرات..." : "Search gold, jewelry..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
              style={{ [isRTL ? "paddingRight" : "paddingLeft"]: "40px", [isRTL ? "paddingLeft" : "paddingRight"]: "12px" }}
            />
          </div>
          <button className="p-2.5 bg-surface border border-border rounded-xl text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mt-3 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gold text-primary-foreground"
                  : "bg-surface border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {isRTL ? cat.labelAr : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 mt-4 mb-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {filtered.length} {isRTL ? "نتيجة" : "results"}
        </span>
        <button className="text-xs text-gold">{isRTL ? "الأحدث" : "Latest"}</button>
      </div>

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isRTL={isRTL}
            onSelect={() => onProductSelect(product)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-3">
            <Search size={24} className="text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium">{isRTL ? "لا توجد نتائج" : "No results found"}</p>
          <p className="text-sm text-muted-foreground mt-1">{isRTL ? "جرب كلمات بحث أخرى" : "Try different search terms"}</p>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  isRTL,
  onSelect,
}: {
  product: Product;
  isRTL: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="text-left bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/40 active:scale-95 transition-all duration-150"
    >
      <div className="relative aspect-square bg-surface-elevated">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span
            className={`absolute top-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
              product.badge === "Rare"
                ? "bg-rarity-rare/20 text-rarity-rare border border-rarity-rare/40"
                : product.badge === "Top Seller"
                ? "bg-gold/20 text-gold border border-gold/40"
                : "bg-muted text-foreground border border-border"
            }`}
            style={{ [isRTL ? "right" : "left"]: "8px" }}
          >
            {product.badge === "Rare"
              ? isRTL ? "نادر" : "Rare"
              : product.badge === "Top Seller"
              ? isRTL ? "الأكثر مبيعاً" : "Top Seller"
              : product.badge}
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="text-xs font-semibold text-foreground leading-tight line-clamp-2 flex-1">
            {isRTL ? product.nameAr : product.name}
          </h3>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {product.verified && (
            <ShieldCheck size={11} className="text-gold shrink-0" />
          )}
          <span className="text-xs text-muted-foreground truncate">{product.seller}</span>
        </div>
        {(product.weight || product.purity) && (
          <div className="flex gap-1 mb-2">
            {product.weight && (
              <span className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">
                {product.weight}
              </span>
            )}
            {product.purity && (
              <span className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">
                {product.purity}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gold">
            {product.price.toLocaleString()} π
          </span>
          {product.rating && (
            <div className="flex items-center gap-0.5">
              <Star size={10} className="text-gold fill-gold" />
              <span className="text-xs text-muted-foreground">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
