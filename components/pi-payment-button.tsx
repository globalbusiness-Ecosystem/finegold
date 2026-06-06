"use client";

import { useState } from "react";
import { TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

interface PiPaymentButtonProps {
  isRTL?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  className?: string;
  variant?: "primary" | "hero";
}

export function PiPaymentButton({
  isRTL = false,
  onSuccess,
  onError,
  className = "",
  variant = "primary",
}: PiPaymentButtonProps) {
  const { products } = usePiAuth();
  const [loading, setLoading] = useState(false);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69a8aa805bc526c57d3519dd
  );

  const handlePay = () => {
    if (!product) return;
    setLoading(true);

    window.pay({
      amount: product.price_in_pi,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setLoading(false);
        onSuccess?.();
      },
      onError: (error: unknown) => {
        setLoading(false);
        onError?.(error);
      },
    });
  };

  // Product not found — show disabled state
  if (!product) {
    return (
      <button
        disabled
        className={`flex items-center justify-center gap-2 font-semibold py-3.5 rounded-2xl text-sm opacity-50 cursor-not-allowed bg-surface-elevated border border-border text-muted-foreground ${className}`}
      >
        <AlertCircle size={16} />
        {isRTL ? "المنتج غير متاح" : "Product Unavailable"}
      </button>
    );
  }

  if (variant === "hero") {
    return (
      <button
        onClick={handlePay}
        disabled={loading}
        className={`inline-flex items-center gap-2 bg-gold text-primary-foreground font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <TrendingUp size={15} />
        )}
        {loading
          ? isRTL ? "جارٍ المعالجة..." : "Processing..."
          : isRTL
          ? `${product.name} — ${product.price_in_pi} π`
          : `${product.name} — ${product.price_in_pi} π`}
      </button>
    );
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className={`w-full bg-gold text-primary-foreground font-bold py-4 rounded-2xl text-base hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <TrendingUp size={18} />
      )}
      {loading
        ? isRTL ? "جارٍ المعالجة..." : "Processing..."
        : isRTL
        ? `شراء ${product.name} بـ ${product.price_in_pi} π`
        : `Buy ${product.name} — ${product.price_in_pi} π`}
    </button>
  );
}
