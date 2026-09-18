import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabContactProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
}

export function TabContact({ content, updateField }: TabContactProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Kontakty & Otevírací doba</h2>
        <p className="text-xs text-slate-500">Texty v sekci kontaktů a otevírací doba pro zákazníky.</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Nadpis kontaktní sekce:</label>
          <input
            type="text"
            value={content.contact.title}
            onChange={(e) => updateField("contact", "title", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Úvodní text:</label>
          <textarea
            rows={2}
            value={content.contact.perex}
            onChange={(e) => updateField("contact", "perex", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-normal focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Otevírací doba:</label>
            <input
              type="text"
              value={content.contact.openingHours}
              onChange={(e) => updateField("contact", "openingHours", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
              placeholder="Po–So 7:00 – 19:00"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Rychlost odpovědi:</label>
            <input
              type="text"
              value={content.contact.responseSpeed}
              onChange={(e) => updateField("contact", "responseSpeed", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
              placeholder="Do 24 hodin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
