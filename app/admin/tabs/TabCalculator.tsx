import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabCalculatorProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
}

export function TabCalculator({ content, updateField }: TabCalculatorProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Kalkulačka cen rekonstrukce</h2>
        <p className="text-xs text-slate-500">Texty v záhlaví kalkulačky a důležité právní upozornění.</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Horní odznak:</label>
          <input
            type="text"
            value={content.calculator.badge}
            onChange={(e) => updateField("calculator", "badge", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Hlavní nadpis kalkulačky:</label>
          <input
            type="text"
            value={content.calculator.title}
            onChange={(e) => updateField("calculator", "title", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Doprovodný perex:</label>
          <textarea
            rows={2}
            value={content.calculator.perex}
            onChange={(e) => updateField("calculator", "perex", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-normal focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Důležité upozornění (Právní disclaimer):</label>
          <textarea
            rows={4}
            value={content.calculator.disclaimer}
            onChange={(e) => updateField("calculator", "disclaimer", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-normal focus:border-red-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
