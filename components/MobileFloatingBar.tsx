"use client";

import Link from "next/link";
import { Phone, MessageSquare, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function MobileFloatingBar() {
  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("poptavkovy-formular") || document.getElementById("kontakt");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = target.querySelector("input:not([type=hidden]), select, textarea") as HTMLElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 400);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-1.5">
        {/* Call CTA */}
        <a
          href={`tel:${siteConfig.phoneCZRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 active:bg-slate-100 transition-colors"
        >
          <Phone className="w-4 h-4 text-red-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Zavolat</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${siteConfig.phoneCZRaw}?text=${encodeURIComponent(
            "Dobrý den, mám zájem o nezávaznou kalkulaci rekonstrukce bytu."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-green-50 border border-green-200 rounded-xl text-green-700 active:bg-green-100 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-green-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Form CTA - scrolls directly to form on page or navigates to contact */}
        <Link
          href="/kontakt#poptavkovy-formular"
          onClick={handleScrollToForm}
          className="flex flex-col items-center justify-center py-2 px-1 bg-red-600 rounded-xl text-white font-bold active:bg-red-700 transition-colors shadow-md shadow-red-600/20"
        >
          <Send className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Poptávka</span>
        </Link>
      </div>
    </div>
  );
}
