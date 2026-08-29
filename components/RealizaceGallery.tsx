"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ZoomIn, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { portfolioItems, PortfolioItem } from "@/lib/data";

interface RealizaceGalleryProps {
  limit?: number;
  showViewAll?: boolean;
}

export function RealizaceGallery({ limit, showViewAll = false }: RealizaceGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: "all", label: "Všechny realizace" },
    { id: "byty", label: "Rekonstrukce bytů" },
    { id: "koupelny", label: "Koupelny" },
    { id: "jadra", label: "Bytová jádra" },
    { id: "pokoje", label: "Pokoje & Interiéry" }
  ];

  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <section className="py-20 bg-slate-900 text-white relative" id="realizace">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
            Fotogalerie našich prací
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Ukázky našich posledních realizací
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Prohlédněte si reálné výsledky naší práce v Chebu, Karlových Varech, Sokolově, Aši a dalších městech kraje.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-red-500 cursor-pointer transition-all duration-300 shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Badges on top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-slate-200 uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-red-600/90 text-white text-[10px] font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Zvětšit fotografii</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/realizace"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-950 hover:bg-red-600 border border-slate-800 hover:border-red-600 rounded-2xl text-white font-bold text-sm transition-all shadow-xl"
            >
              <span>Zobrazit všechny realizace a fotogalerii</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 hover:bg-red-600 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1000px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold rounded-lg uppercase">
                  {selectedItem.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {selectedItem.location}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{selectedItem.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
