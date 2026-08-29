"use client";

import { useState, useMemo } from "react";
import { 
  Calculator, 
  Home, 
  Layers, 
  Bath, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  MapPin
} from "lucide-react";
import { locations } from "@/lib/data";

export function PriceCalculator() {
  const [propertyType, setPropertyType] = useState<"panel" | "brick" | "core">("panel");
  const [layout, setLayout] = useState<"1kk" | "2kk" | "3kk" | "4kk" | "bathOnly">("2kk");
  const [scope, setScope] = useState<"full" | "core" | "surfaces">("full");
  const [quality, setQuality] = useState<"standard" | "comfort" | "premium">("comfort");
  const [selectedCity, setSelectedCity] = useState<string>("Cheb");

  // Dynamic estimate calculation logic
  const estimate = useMemo(() => {
    let baseMin = 180000;
    let baseMax = 260000;
    let estimatedWeeks = "2–4 týdny";

    // Layout modifiers
    if (layout === "1kk") {
      baseMin = 140000;
      baseMax = 220000;
      estimatedWeeks = "2–3 týdny";
    } else if (layout === "2kk") {
      baseMin = 220000;
      baseMax = 340000;
      estimatedWeeks = "3–5 týdnů";
    } else if (layout === "3kk") {
      baseMin = 310000;
      baseMax = 480000;
      estimatedWeeks = "4–6 týdnů";
    } else if (layout === "4kk") {
      baseMin = 390000;
      baseMax = 620000;
      estimatedWeeks = "5–8 týdnů";
    } else if (layout === "bathOnly") {
      baseMin = 95000;
      baseMax = 160000;
      estimatedWeeks = "10–14 dní";
    }

    // Scope modifiers
    if (scope === "core") {
      baseMin = Math.round(baseMin * 0.55);
      baseMax = Math.round(baseMax * 0.55);
      if (layout !== "bathOnly") estimatedWeeks = "10–14 dní";
    } else if (scope === "surfaces") {
      baseMin = Math.round(baseMin * 0.65);
      baseMax = Math.round(baseMax * 0.65);
      estimatedWeeks = "2–3 týdny";
    }

    // Property type modifiers
    if (propertyType === "brick") {
      baseMin = Math.round(baseMin * 1.1);
      baseMax = Math.round(baseMax * 1.15);
    }

    // Quality modifiers
    if (quality === "comfort") {
      baseMin = Math.round(baseMin * 1.12);
      baseMax = Math.round(baseMax * 1.15);
    } else if (quality === "premium") {
      baseMin = Math.round(baseMin * 1.3);
      baseMax = Math.round(baseMax * 1.35);
    }

    const formatPrice = (val: number) => {
      return new Intl.NumberFormat("cs-CZ").format(val) + " Kč";
    };

    return {
      priceRange: `${formatPrice(baseMin)} – ${formatPrice(baseMax)}`,
      timeEstimate: estimatedWeeks,
      breakdown: {
        bourani: Math.round(baseMin * 0.12),
        elektro: Math.round(baseMin * 0.22),
        voda: Math.round(baseMin * 0.18),
        zednicke: Math.round(baseMin * 0.28),
        dokonceni: Math.round(baseMin * 0.20),
      }
    };
  }, [propertyType, layout, scope, quality]);

  const handlePreFill = () => {
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="kalkulacka">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
            Online kalkulace rozpočtu
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Orientační kalkulačka rekonstrukce bytu
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Získejte okamžitý přehled o předpokládané ceně a časovém harmonogramu. Přesný položkový rozpočet pro vás zdarma připravíme po osobním zaměření na místě.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (8 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
            {/* Step 1: Typ nemovitosti */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                1. Typ objektu
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType("panel")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    propertyType === "panel"
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Panelový byt</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Umakart / panel</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("brick")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    propertyType === "brick"
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Cihlový byt</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Cihla / starší zástavba</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("core")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    propertyType === "core"
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Jádro / Koupelna</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Jen sanita a WC</div>
                </button>
              </div>
            </div>

            {/* Step 2: Velikost / Dispozice */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                2. Dispozice bytu
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: "1kk", label: "1+kk / 1+1", desc: "do 35 m²" },
                  { id: "2kk", label: "2+kk / 2+1", desc: "cca 55 m²" },
                  { id: "3kk", label: "3+kk / 3+1", desc: "cca 75 m²" },
                  { id: "4kk", label: "4+1 a více", desc: "nad 85 m²" },
                  { id: "bathOnly", label: "Koupelna", desc: "pouze jádro" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLayout(item.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      layout === item.id
                        ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-75">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Rozsah prací */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                3. Požadovaný rozsah rekonstrukce
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setScope("full")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    scope === "full"
                      ? "bg-slate-800 border-red-500 text-white ring-1 ring-red-500"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Kompletní na klíč</span>
                    {scope === "full" && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Vše od bourání přes jádro, elektro, omítky až po podlahy a dveře.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setScope("core")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    scope === "core"
                      ? "bg-slate-800 border-red-500 text-white ring-1 ring-red-500"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Bytové jádro & Koupelna</span>
                    {scope === "core" && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Vybourání umakartu, nové zděné stěny z Ytongu, voda, obklady a sanita.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setScope("surfaces")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    scope === "surfaces"
                      ? "bg-slate-800 border-red-500 text-white ring-1 ring-red-500"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Povrchy & Nová elektřina</span>
                    {scope === "surfaces" && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Nová elektřina v mědi, sádrové stěrky, nivelace a nové podlahy.
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Standard & Město */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-2">
                  4. Standard vybavení
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "Standard" },
                    { id: "comfort", label: "Komfort" },
                    { id: "premium", label: "Premium" }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setQuality(lvl.id as any)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        quality === lvl.id
                          ? "bg-red-600 text-white border-red-500"
                          : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-2">
                  5. Město realizace
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-semibold focus:border-red-500 focus:outline-none"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.city}>
                      {loc.city} (Karlovarský kraj)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-600/50 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-bl-2xl">
                Nezávazný odhad
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Předpokládaný rozpočet:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-400">
                  {estimate.priceRange}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1 pt-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>Doba realizace: <strong>{estimate.timeEstimate}</strong></span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Co vše je v tomto odhadu zahrnuto:
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Bourací práce & odvoz suti kontejnerem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Nové rozvody elektřiny v mědi + revize</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Rozvody vody, odpadů a hydroizolace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Zednické práce, Ytong a štukové / sádrové stěrky</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Smlouva o dílo, záruka a každodenní úklid</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                <span>
                  Osobní prohlídka a přesné zaměření v <strong>{selectedCity}</strong> je zcela ZDARMA.
                </span>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handlePreFill}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Objednat bezplatné zaměření na místě</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
