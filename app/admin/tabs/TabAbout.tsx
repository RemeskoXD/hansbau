import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabAboutProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
}

export function TabAbout({ content, updateField }: TabAboutProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">O nás & Příběh rodinné firmy</h2>
        <p className="text-xs text-slate-500">Texty o historii, hodnotách a osobní citát zakladatele.</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Horní odznak:</label>
          <input
            type="text"
            value={content.about.badge}
            onChange={(e) => updateField("about", "badge", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Hlavní nadpis (H2):</label>
          <input
            type="text"
            value={content.about.title}
            onChange={(e) => updateField("about", "title", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">3 odstavce příběhu</h3>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">1. Odstavec (Založení & tradice):</label>
            <textarea
              rows={3}
              value={content.about.storyP1}
              onChange={(e) => updateField("about", "storyP1", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">2. Odstavec (Specializace a klid pro klienta):</label>
            <textarea
              rows={3}
              value={content.about.storyP2}
              onChange={(e) => updateField("about", "storyP2", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">3. Odstavec (Všechny profese pod jednou střechou):</label>
            <textarea
              rows={3}
              value={content.about.storyP3}
              onChange={(e) => updateField("about", "storyP3", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
            />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Osobní citát zakladatele (Jan Červeňak)</h3>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Text citace:</label>
            <textarea
              rows={3}
              value={content.about.founderQuote}
              onChange={(e) => updateField("about", "founderQuote", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs italic"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Pozice pod jménem:</label>
            <input
              type="text"
              value={content.about.founderRole}
              onChange={(e) => updateField("about", "founderRole", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
