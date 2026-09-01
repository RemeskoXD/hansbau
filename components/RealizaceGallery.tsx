"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ZoomIn, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioItems, PortfolioItem } from "@/lib/data";

interface RealizaceGalleryProps {
  limit?: number;
  showViewAll?: boolean;
}

export function RealizaceGallery({ limit, showViewAll = false }: RealizaceGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "Všechny realizace" },
    { id: "koupelny", label: "Koupelny" },
    { id: "jadra", label: "Bytová jádra" },
    { id: "byty", label: "Rekonstrukce bytů" },
    { id: "pokoje", label: "Pokoje & Interiéry" },
    { id: "zednicke", label: "Zednické práce & Podlahy" }
  ];

  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : displayedItems.length - 1));
  }, [selectedIndex, displayedItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < displayedItems.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, displayedItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const currentItem = selectedIndex !== null ? displayedItems[selectedIndex] : null;

  return (
    <section className="py-20 bg-white text-slate-900 relative" id="realizace">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            Fotogalerie našich prací
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            Ukázky našich posledních realizací
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Prohlédněte si reálné výsledky naší práce v Chebu, Karlových Varech, Sokolově, Aši a dalších městech kraje.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20 scale-105"
                  : "bg-slate-100/90 border border-slate-200 text-slate-700 hover:bg-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 hover:border-red-500 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Badges on top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                  {item.categoryLabel}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-200 line-clamp-1">
                  {item.description}
                </p>
                <div className="pt-1.5 flex items-center gap-1 text-[11px] font-semibold text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
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
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-red-600 text-white font-bold text-sm transition-all rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Zobrazit všechny realizace a fotogalerii</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal with Next / Prev */}
      {currentItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors shadow-lg"
            aria-label="Zavřít galerii"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors hidden sm:flex items-center justify-center shadow-lg"
            aria-label="Předchozí fotografie"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors hidden sm:flex items-center justify-center shadow-lg"
            aria-label="Další fotografie"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Card Container */}
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-slate-950">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1000px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-lg uppercase">
                    {currentItem.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedIndex + 1} z {displayedItems.length}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  {currentItem.location}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{currentItem.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600">{currentItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
