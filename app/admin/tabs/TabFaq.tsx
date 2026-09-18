import React from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { PageContent } from "@/lib/content-schema";

interface TabFaqProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
  updateFaqItem: (index: number, field: "q" | "a", value: string) => void;
  addFaqItem: () => void;
  deleteFaqItem: (index: number) => void;
}

export function TabFaq({
  content,
  updateField,
  updateFaqItem,
  addFaqItem,
  deleteFaqItem,
}: TabFaqProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Často kladené otázky (FAQ)</h2>
          <p className="text-xs text-slate-500">
            Správa odpovědí na nejčastější dotazy zákazníků před začátkem rekonstrukce.
          </p>
        </div>
        <button
          type="button"
          onClick={addFaqItem}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Přidat nový dotaz</span>
        </button>
      </div>

      {/* Header labels */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Horní podnadpis sekce:</label>
          <input
            type="text"
            value={content.faq.subtitle}
            onChange={(e) => updateField("faq", "subtitle", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium"
          />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Hlavní nadpis sekce:</label>
          <input
            type="text"
            value={content.faq.title}
            onChange={(e) => updateField("faq", "title", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold"
          />
        </div>
      </div>

      {/* List of FAQ items */}
      <div className="space-y-4">
        {content.faq.items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-md">
                  {item.q}
                </span>
              </div>
              <button
                type="button"
                onClick={() => deleteFaqItem(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Smazat dotaz"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Otázka klienta (Q):</label>
                <input
                  type="text"
                  value={item.q}
                  onChange={(e) => updateFaqItem(idx, "q", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Podrobná odpověď (A):</label>
                <textarea
                  rows={2}
                  value={item.a}
                  onChange={(e) => updateFaqItem(idx, "a", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-normal"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
