"use client";

import {
  X,
  ShoppingBag,
  BarChart2,
  Sparkles,
  Tag,
  Wallet,
  ShieldCheck,
  Globe,
  HelpCircle,
  Star,
  ChevronRight,
} from "lucide-react";

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  isRTL: boolean;
}

const NAV_ITEMS = [
  { id: "browse",    icon: ShoppingBag, label: "Browse",    labelAr: "تصفح"    },
  { id: "market",   icon: BarChart2,   label: "Gold Market", labelAr: "سوق الذهب" },
  { id: "nft",      icon: Sparkles,    label: "NFT Jewelry", labelAr: "مجوهرات NFT" },
  { id: "sell",     icon: Tag,         label: "Sell",      labelAr: "بيع"     },
  { id: "portfolio",icon: Wallet,      label: "Portfolio", labelAr: "محفظة"   },
];

const QUICK_LINKS = [
  { icon: ShieldCheck, label: "Verified Sellers", labelAr: "البائعون الموثوقون" },
  { icon: Star,        label: "Top Rated",        labelAr: "الأعلى تقييماً"     },
  { icon: Globe,       label: "Global Market",    labelAr: "السوق العالمي"      },
  { icon: HelpCircle,  label: "Help & Support",   labelAr: "المساعدة والدعم"    },
];

export function SidebarMenu({ open, onClose, onTabChange, activeTab, isRTL }: SidebarMenuProps) {
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

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isRTL ? "القائمة الرئيسية" : "Main Menu"}
        className={`fixed top-0 bottom-0 z-50 w-72 bg-surface border-border flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isRTL
            ? `right-0 border-l ${open ? "translate-x-0" : "translate-x-full"}`
            : `left-0 border-r ${open ? "translate-x-0" : "-translate-x-full"}`
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-safe-top py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-base leading-none">F</span>
            </div>
            <div>
              <div className="text-base font-bold text-foreground leading-none">FineGold</div>
              <div className="text-xs text-gold leading-tight mt-0.5">finegold.pi</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Main navigation */}
          <div className="px-3 mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
              {isRTL ? "التنقل" : "Navigation"}
            </p>
            {NAV_ITEMS.map(({ id, icon: Icon, label, labelAr }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => { onTabChange(id); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                    active
                      ? "bg-gold/10 text-gold border border-gold/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <Icon size={18} strokeWidth={active ? 2.2 : 1.7} />
                  <span className="flex-1 text-start">{isRTL ? labelAr : label}</span>
                  {active && <ChevronRight size={14} className={isRTL ? "rotate-180" : ""} />}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-border mb-5" />

          {/* Quick links */}
          <div className="px-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </p>
            {QUICK_LINKS.map(({ icon: Icon, label, labelAr }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all mb-0.5"
              >
                <Icon size={16} strokeWidth={1.7} />
                <span>{isRTL ? labelAr : label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs text-muted-foreground">
              {isRTL ? "متصل بشبكة Pi" : "Connected to Pi Network"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-1">v1.0.0 · finegold.pi</p>
        </div>
      </aside>
    </>
  );
}
