import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabSeoProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
}

export function TabSeo({ content, updateField }: TabSeoProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">SEO & Meta informace</h2>
        <p className="text-xs text-slate-500">Nastavení pro vyhledávače Google, Seznam a sociální sítě.</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800">Hlavní titulek stránky (Meta Title):</label>
            <span className={`text-[11px] font-semibold ${content.seo.homeTitle.length > 60 ? "text-amber-600" : "text-slate-400"}`}>
              {content.seo.homeTitle.length} / 60 znaků
            </span>
          </div>
          <input
            type="text"
            value={content.seo.homeTitle}
            onChange={(e) => updateField("seo", "homeTitle", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            placeholder="např. Rekonstrukce bytu Cheb | HANSBAU - Karlovarský Kraj"
          />
          <p className="text-[11px] text-slate-500">Doporučeno 50–60 znaků pro optimální zobrazení na Google.</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800">Meta popisek (Meta Description):</label>
            <span className={`text-[11px] font-semibold ${content.seo.homeDesc.length > 160 ? "text-amber-600" : "text-slate-400"}`}>
              {content.seo.homeDesc.length} / 160 znaků
            </span>
          </div>
          <textarea
            rows={3}
            value={content.seo.homeDesc}
            onChange={(e) => updateField("seo", "homeDesc", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            placeholder="Stručné shrnutí obsahu webu pro výsledky vyhledávání..."
          />
          <p className="text-[11px] text-slate-500">Doporučeno 120–155 znaků. Zobrazuje se pod odkazem ve vyhledávačích.</p>
        </div>
      </div>
    </div>
  );
}
