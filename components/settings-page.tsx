"use client";

import { useState } from "react";
import {
  X,
  Moon,
  Globe,
  DollarSign,
  Bell,
  Info,
  ChevronRight,
  Check,
  ShieldCheck,
} from "lucide-react";

interface SettingsPageProps {
  open: boolean;
  onClose: () => void;
  isRTL: boolean;
  onRTLChange: (value: boolean) => void;
}

type Currency = "Pi" | "USD" | "EUR" | "AED" | "SAR";
const CURRENCIES: Currency[] = ["Pi", "USD", "EUR", "AED", "SAR"];

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
}
function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
        enabled ? "bg-gold" : "bg-surface-elevated border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function SettingsPage({ open, onClose, isRTL, onRTLChange }: SettingsPageProps) {
  const [darkMode]           = useState(true); // always dark — just cosmetic
  const [currency, setCurrency] = useState<Currency>("Pi");
  const [notifPrice, setNotifPrice]   = useState(true);
  const [notifOrder, setNotifOrder]   = useState(true);
  const [notifNFT, setNotifNFT]       = useState(false);
  const [notifMarket, setNotifMarket] = useState(true);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — slides up from bottom */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isRTL ? "الإعدادات" : "Settings"}
        className={`fixed bottom-0 inset-x-0 max-w-md mx-auto z-50 bg-surface rounded-t-3xl border-t border-border flex flex-col max-h-[92vh] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <h2 className="text-lg font-bold text-foreground">{isRTL ? "الإعدادات" : "Settings"}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 pb-8 flex flex-col gap-6">

          {/* ── Theme ─────────────────────────────────────────────────────── */}
          <section>
            <SectionLabel icon={Moon} title={isRTL ? "المظهر" : "Theme"} isRTL={isRTL} />
            <div className="bg-surface-elevated rounded-2xl overflow-hidden">
              <SettingsRow
                label={isRTL ? "الوضع الداكن" : "Dark Mode"}
                sublabel={isRTL ? "موصى به للمجوهرات الفاخرة" : "Recommended for luxury viewing"}
                isRTL={isRTL}
              >
                <Toggle enabled={darkMode} onChange={() => {}} label="Dark mode" />
              </SettingsRow>
            </div>
          </section>

          {/* ── Language ──────────────────────────────────────────────────── */}
          <section>
            <SectionLabel icon={Globe} title={isRTL ? "اللغة والاتجاه" : "Language & Direction"} isRTL={isRTL} />
            <div className="bg-surface-elevated rounded-2xl overflow-hidden">
              <SettingsRow
                label={isRTL ? "واجهة عربية (RTL)" : "Arabic Interface (RTL)"}
                sublabel={isRTL ? "تفعيل الاتجاه من اليمين إلى اليسار" : "Enable right-to-left layout"}
                isRTL={isRTL}
              >
                <Toggle enabled={isRTL} onChange={onRTLChange} label="Arabic RTL" />
              </SettingsRow>
            </div>
          </section>

          {/* ── Currency ──────────────────────────────────────────────────── */}
          <section>
            <SectionLabel icon={DollarSign} title={isRTL ? "العملة" : "Currency"} isRTL={isRTL} />
            <div className="bg-surface-elevated rounded-2xl p-3 flex flex-wrap gap-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
                    currency === c
                      ? "bg-gold/15 border-gold/50 text-gold"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-gold/20"
                  }`}
                >
                  {currency === c && <Check size={12} />}
                  {c === "Pi" ? "π" : ""}{c}
                </button>
              ))}
            </div>
          </section>

          {/* ── Notifications ─────────────────────────────────────────────── */}
          <section>
            <SectionLabel icon={Bell} title={isRTL ? "الإشعارات" : "Notifications"} isRTL={isRTL} />
            <div className="bg-surface-elevated rounded-2xl overflow-hidden divide-y divide-border">
              <SettingsRow label={isRTL ? "تنبيهات الأسعار" : "Price Alerts"} isRTL={isRTL}>
                <Toggle enabled={notifPrice} onChange={setNotifPrice} label="Price alerts" />
              </SettingsRow>
              <SettingsRow label={isRTL ? "تحديثات الطلبات" : "Order Updates"} isRTL={isRTL}>
                <Toggle enabled={notifOrder} onChange={setNotifOrder} label="Order updates" />
              </SettingsRow>
              <SettingsRow label={isRTL ? "إسقاطات NFT" : "NFT Drops"} isRTL={isRTL}>
                <Toggle enabled={notifNFT} onChange={setNotifNFT} label="NFT drops" />
              </SettingsRow>
              <SettingsRow label={isRTL ? "أخبار السوق" : "Market News"} isRTL={isRTL}>
                <Toggle enabled={notifMarket} onChange={setNotifMarket} label="Market news" />
              </SettingsRow>
            </div>
          </section>

          {/* ── About ─────────────────────────────────────────────────────── */}
          <section>
            <SectionLabel icon={Info} title={isRTL ? "حول التطبيق" : "About"} isRTL={isRTL} />
            <div className="bg-surface-elevated rounded-2xl overflow-hidden divide-y divide-border">
              <AboutRow label={isRTL ? "الإصدار" : "Version"} value="1.0.0" />
              <AboutRow label={isRTL ? "الشبكة" : "Network"} value="Pi Mainnet" />
              <AboutRow label={isRTL ? "النطاق" : "Domain"} value="finegold.pi" />
              <button className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-gold" />
                  <span>{isRTL ? "سياسة الخصوصية" : "Privacy Policy"}</span>
                </div>
                <ChevronRight size={14} className={isRTL ? "rotate-180" : ""} />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <div className="flex items-center gap-2">
                  <Info size={15} className="text-gold" />
                  <span>{isRTL ? "شروط الاستخدام" : "Terms of Service"}</span>
                </div>
                <ChevronRight size={14} className={isRTL ? "rotate-180" : ""} />
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, title, isRTL }: { icon: React.ElementType; title: string; isRTL: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-2 px-1 ${isRTL ? "flex-row-reverse" : ""}`}>
      <Icon size={14} className="text-gold" />
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{title}</span>
    </div>
  );
}

function SettingsRow({
  label,
  sublabel,
  children,
  isRTL,
}: {
  label: string;
  sublabel?: string;
  children: React.ReactNode;
  isRTL: boolean;
}) {
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
      <div className={isRTL ? "text-end" : ""}>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
      </div>
      {children}
    </div>
  );
}

function AboutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
