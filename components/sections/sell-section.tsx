"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Plus, X, ShieldCheck, ChevronDown, Info } from "lucide-react";

const ITEM_TYPES = [
  { value: "gold_bar", label: "Gold Bar", labelAr: "سبيكة ذهب" },
  { value: "jewelry", label: "Jewelry", labelAr: "مجوهرات" },
  { value: "diamond", label: "Diamond", labelAr: "ألماس" },
  { value: "coin", label: "Gold Coin", labelAr: "عملة ذهبية" },
  { value: "nft", label: "NFT Jewelry", labelAr: "مجوهرات NFT" },
];

const PURITY_OPTIONS = [
  { value: "999.9", label: "999.9 (24K)" },
  { value: "999", label: "999 (24K)" },
  { value: "916", label: "916 (22K)" },
  { value: "750", label: "750 (18K)" },
  { value: "585", label: "585 (14K)" },
  { value: "375", label: "375 (9K)" },
  { value: "custom", label: "Custom" },
];

interface SellSectionProps {
  isRTL: boolean;
  onToast: (msg: string) => void;
}

export function SellSection({ isRTL, onToast }: SellSectionProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [form, setForm] = useState({
    itemType: "",
    title: "",
    weight: "",
    purity: "",
    customPurity: "",
    price: "",
    description: "",
    location: "",
    shipping: false,
    kyc: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoAdd() {
    // Simulate photo selection by adding a placeholder
    if (photos.length >= 5) {
      onToast(isRTL ? "الحد الأقصى 5 صور" : "Maximum 5 photos allowed");
      return;
    }
    setPhotos((prev) => [...prev, `/placeholder.svg?height=120&width=120`]);
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.itemType || !form.title || !form.price) {
      onToast(isRTL ? "يرجى ملء الحقول المطلوبة" : "Please fill in required fields");
      return;
    }
    setSubmitted(true);
    onToast(isRTL ? "تم رفع الإعلان بنجاح!" : "Listing submitted successfully!");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="flex flex-col pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">
          {isRTL ? "بيع منتجك" : "List Your Item"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isRTL ? "أضف منتجك وابدأ البيع بعملة Pi" : "Add your item and start selling in Pi"}
        </p>
      </div>

      {/* KYC Banner */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-xl p-3">
          <ShieldCheck size={20} className="text-gold shrink-0" />
          <div>
            <div className="text-sm font-semibold text-foreground">
              {isRTL ? "تحقق KYC للبيع" : "KYC Verification Required"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {isRTL
                ? "يجب التحقق من هويتك لبيع المنتجات"
                : "Complete identity verification to list items"}
            </div>
          </div>
          <button className="shrink-0 text-xs font-semibold text-gold border border-gold/40 rounded-lg px-2.5 py-1 hover:bg-gold/10 transition-colors">
            {isRTL ? "تحقق" : "Verify"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-4">
        {/* Photo Upload */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            {isRTL ? "الصور" : "Photos"}
            <span className="text-muted-foreground font-normal text-xs ml-1">
              ({photos.length}/5)
            </span>
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={handlePhotoAdd}
              className="shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-gold/50 transition-colors bg-surface"
            >
              <Camera size={18} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{isRTL ? "إضافة" : "Add"}</span>
            </button>
            {photos.map((src, idx) => (
              <div key={idx} className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-border">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center"
                >
                  <X size={10} className="text-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Item Type */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            {isRTL ? "نوع المنتج *" : "Item Type *"}
          </label>
          <div className="relative">
            <select
              value={form.itemType}
              onChange={(e) => handleChange("itemType", e.target.value)}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground appearance-none outline-none focus:border-gold/50 transition-colors"
              required
            >
              <option value="" className="bg-surface">
                {isRTL ? "اختر النوع..." : "Select type..."}
              </option>
              {ITEM_TYPES.map((t) => (
                <option key={t.value} value={t.value} className="bg-surface">
                  {isRTL ? t.labelAr : t.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              style={{ [isRTL ? "left" : "right"]: "14px" }}
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            {isRTL ? "عنوان المنتج *" : "Listing Title *"}
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder={isRTL ? "مثال: سبيكة ذهب 24 قيراط 10 جرام" : "e.g. 24K Gold Bar 10g — Swiss Bullion"}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
            required
          />
        </div>

        {/* Weight & Purity */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              {isRTL ? "الوزن" : "Weight"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="10"
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
                style={{ [isRTL ? "paddingLeft" : "paddingRight"]: "40px" }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                style={{ [isRTL ? "left" : "right"]: "12px" }}
              >
                g
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              {isRTL ? "النقاء" : "Purity"}
            </label>
            <div className="relative">
              <select
                value={form.purity}
                onChange={(e) => handleChange("purity", e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground appearance-none outline-none focus:border-gold/50 transition-colors"
              >
                <option value="" className="bg-surface">--</option>
                {PURITY_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value} className="bg-surface">{p.label}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                style={{ [isRTL ? "left" : "right"]: "10px" }}
              />
            </div>
          </div>
        </div>

        {/* Price in Pi */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <label className="text-sm font-semibold text-foreground">
              {isRTL ? "السعر بعملة Pi *" : "Price in Pi *"}
            </label>
            <Info size={13} className="text-muted-foreground" />
          </div>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="420"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
              style={{ [isRTL ? "paddingLeft" : "paddingRight"]: "40px" }}
              required
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 text-base font-bold text-gold"
              style={{ [isRTL ? "left" : "right"]: "14px" }}
            >
              π
            </span>
          </div>
          {form.price && (
            <p className="text-xs text-muted-foreground mt-1.5">
              {isRTL ? "≈ $" : "≈ $"}{(Number(form.price) * 314159).toFixed(2)} USD
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            {isRTL ? "الوصف" : "Description"}
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={isRTL ? "أضف تفاصيل المنتج..." : "Describe your item, certifications, condition..."}
            rows={4}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            {isRTL ? "الموقع" : "Location"}
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder={isRTL ? "مثال: دبي، الإمارات" : "e.g. Dubai, UAE"}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3">
          <ToggleRow
            label={isRTL ? "يقبل الشحن الدولي" : "Accept International Shipping"}
            checked={form.shipping}
            onChange={(v) => handleChange("shipping", v)}
          />
          <ToggleRow
            label={isRTL ? "بائع موثق KYC" : "KYC Verified Seller Badge"}
            checked={form.kyc}
            onChange={(v) => handleChange("kyc", v)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gold text-primary-foreground font-bold py-4 rounded-2xl text-base hover:opacity-90 active:scale-98 transition-all mt-2"
        >
          {isRTL ? "نشر الإعلان" : "Publish Listing"}
        </button>

        <p className="text-xs text-center text-muted-foreground pb-2">
          {isRTL
            ? "بالنشر توافق على شروط FineGold وسياسة البيع"
            : "By publishing you agree to FineGold Terms & Seller Policy"}
        </p>
      </form>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5.5 rounded-full transition-colors ${
          checked ? "bg-gold" : "bg-muted"
        }`}
        style={{ height: "22px", width: "40px" }}
      >
        <span
          className={`absolute top-0.5 w-4.5 h-4.5 bg-foreground rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
          style={{ width: "18px", height: "18px", top: "2px" }}
        />
      </button>
    </div>
  );
}
