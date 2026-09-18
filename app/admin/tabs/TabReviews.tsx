import React from "react";
import { Plus, Trash2, Star, ExternalLink } from "lucide-react";
import { PageContent, ReviewItem } from "@/lib/content-schema";

interface TabReviewsProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
  updateReview: (index: number, field: keyof ReviewItem, value: any) => void;
  addReview: () => void;
  deleteReview: (index: number) => void;
}

export function TabReviews({
  content,
  updateField,
  updateReview,
  addReview,
  deleteReview,
}: TabReviewsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Ověřené recenze & Google hodnocení</h2>
          <p className="text-xs text-slate-500">
            Správa zákaznických recenzí a celkového hodnocení zobrazeného na webu.
          </p>
        </div>
        <button
          type="button"
          onClick={addReview}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Přidat novou recenzi</span>
        </button>
      </div>

      {/* Global Rating Stats */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-600">Hlavní statistiky hodnocení</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Průměrné skóre:</label>
            <input
              type="text"
              value={content.reviews.score}
              onChange={(e) => updateField("reviews", "score", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold text-sm bg-white"
              placeholder="5.0"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Počet recenzí na Google:</label>
            <input
              type="text"
              value={content.reviews.reviewCount}
              onChange={(e) => updateField("reviews", "reviewCount", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold text-sm bg-white"
              placeholder="28"
            />
          </div>
          <div className="space-y-1 sm:col-span-1">
            <label className="text-[11px] font-bold text-slate-700 block">Odkaz na Google Profil:</label>
            <input
              type="text"
              value={content.reviews.googleReviewsUrl}
              onChange={(e) => updateField("reviews", "googleReviewsUrl", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs bg-white truncate"
              placeholder="https://www.google.com/search?..."
            />
          </div>
        </div>
      </div>

      {/* List of Reviews */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase text-slate-600">
          Seznam recenzí ({content.reviews.items.length})
        </h3>

        {content.reviews.items.map((rev, idx) => (
          <div
            key={rev.id || idx}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
              </div>
              <button
                type="button"
                onClick={() => deleteReview(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Smazat recenzi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Jméno zákazníka:</label>
                <input
                  type="text"
                  value={rev.author}
                  onChange={(e) => updateReview(idx, "author", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Hodnocení (hvězdy):</label>
                <select
                  value={rev.rating}
                  onChange={(e) => updateReview(idx, "rating", Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                >
                  <option value={5}>★★★★★ (5 hvězd)</option>
                  <option value={4}>★★★★☆ (4 hvězdy)</option>
                  <option value={3}>★★★☆☆ (3 hvězdy)</option>
                  <option value={2}>★★☆☆☆ (2 hvězdy)</option>
                  <option value={1}>★☆☆☆☆ (1 hvězda)</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Časové razítko:</label>
                <input
                  type="text"
                  value={rev.date}
                  onChange={(e) => updateReview(idx, "date", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  placeholder="Před měsícem"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Lokalita zákazníka:</label>
                <input
                  type="text"
                  value={rev.location}
                  onChange={(e) => updateReview(idx, "location", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  placeholder="Karlovarský kraj"
                />
              </div>

              <div className="sm:col-span-12 space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Text recenze:</label>
                <textarea
                  rows={2}
                  value={rev.text}
                  onChange={(e) => updateReview(idx, "text", e.target.value)}
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
