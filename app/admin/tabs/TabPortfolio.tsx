import React from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { PageContent, PortfolioItem } from "@/lib/content-schema";

interface TabPortfolioProps {
  content: PageContent;
  updatePortfolioItem: (index: number, field: keyof PortfolioItem, value: any) => void;
  addPortfolioItem: () => void;
  deletePortfolioItem: (index: number) => void;
}

const CATEGORY_OPTIONS: { id: PortfolioItem["category"]; label: string }[] = [
  { id: "koupelny", label: "Koupelny" },
  { id: "jadra", label: "Bytové jádro" },
  { id: "byty", label: "Rekonstrukce bytu" },
  { id: "pokoje", label: "Pokoje & Interiéry" },
  { id: "zednicke", label: "Zednické práce" },
];

export function TabPortfolio({
  content,
  updatePortfolioItem,
  addPortfolioItem,
  deletePortfolioItem,
}: TabPortfolioProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Portfolio & Fotogalerie realizací</h2>
          <p className="text-xs text-slate-500">
            Správa realizovaných zakázek zobrazených na hlavní stránce i v sekci /realizace.
          </p>
        </div>
        <button
          type="button"
          onClick={addPortfolioItem}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Přidat realizaci do portfolia</span>
        </button>
      </div>

      <div className="space-y-4">
        {content.portfolio.items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  {item.categoryLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => deletePortfolioItem(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Smazat realizaci"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Název realizace:</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updatePortfolioItem(idx, "title", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Kategorie:</label>
                <select
                  value={item.category}
                  onChange={(e) => {
                    const selectedCat = CATEGORY_OPTIONS.find((c) => c.id === e.target.value);
                    updatePortfolioItem(idx, "category", e.target.value);
                    if (selectedCat) {
                      updatePortfolioItem(idx, "categoryLabel", selectedCat.label);
                    }
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Město / Lokalita:</label>
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => updatePortfolioItem(idx, "location", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  placeholder="např. Cheb"
                />
              </div>

              <div className="sm:col-span-6 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Cesta k fotografii (URL / relativní):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => updatePortfolioItem(idx, "image", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[11px]"
                    placeholder="/images/nove/..."
                  />
                </div>
              </div>

              <div className="sm:col-span-6 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Stručný popis provedených prací:</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => updatePortfolioItem(idx, "description", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  placeholder="Popis materiálů a detailů realizace..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
