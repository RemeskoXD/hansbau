"use client";

import { useState, useMemo } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock,
  Sparkles,
  Layers,
  Wrench,
  Zap,
  Droplets,
  Paintbrush
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
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80" id="kalkulacka">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            Online kalkulace rozpočtu
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            Orientační kalkulačka rekonstrukce bytu
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Získejte okamžitý přehled o předpokládané ceně a časovém harmonogramu. Přesný položkový rozpočet pro vás zdarma připravíme po osobním zaměření na místě.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-7 bg-slate-50/90 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
            {/* Step 1: Typ nemovitosti */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                1. Typ objektu
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType("panel")}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    propertyType === "panel"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Panelový byt</div>
                  <div className={`text-[10px] mt-0.5 ${propertyType === "panel" ? "text-red-100" : "text-slate-500"}`}>Umakart / panel</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("brick")}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    propertyType === "brick"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Cihlový byt</div>
                  <div className={`text-[10px] mt-0.5 ${propertyType === "brick" ? "text-red-100" : "text-slate-500"}`}>Cihla / starší zástavba</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType("core")}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    propertyType === "core"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">Jádro / Koupelna</div>
                  <div className={`text-[10px] mt-0.5 ${propertyType === "core" ? "text-red-100" : "text-slate-500"}`}>Sanita a koupelna</div>
                </button>
              </div>
            </div>

            {/* Step 2: Velikost / Dispozice */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
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
                        ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className={`text-[10px] ${layout === item.id ? "text-red-100" : "text-slate-500"}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Rozsah prací */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                3. Požadovaný rozsah rekonstrukce
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setScope("full")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    scope === "full"
                      ? "bg-white border-red-500 text-slate-900 ring-2 ring-red-500/20 shadow-md"
                      : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Kompletní na klíč</span>
                    {scope === "full" && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Vše od bourání přes jádro, elektro, omítky až po podlahy a dveře.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setScope("core")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    scope === "core"
                      ? "bg-white border-red-500 text-slate-900 ring-2 ring-red-500/20 shadow-md"
                      : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Bytové jádro & Koupelna</span>
                    {scope === "core" && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Vybourání umakartu, nové zděné stěny z Ytongu, voda, obklady a sanita.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setScope("surfaces")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    scope === "surfaces"
                      ? "bg-white border-red-500 text-slate-900 ring-2 ring-red-500/20 shadow-md"
                      : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center justify-between">
                    <span>Povrchy & Nová elektřina</span>
                    {scope === "surfaces" && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Nová elektřina v mědi, sádrové stěrky, nivelace a nové podlahy.
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Standard & Město */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
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
                          ? "bg-red-600 text-white border-red-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  5. Město realizace
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs font-semibold focus:border-red-600 focus:outline-none shadow-sm"
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
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-red-500 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-bl-2xl">
                Nezávazný odhad
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Předpokládaný rozpočet:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  {estimate.priceRange}
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1 pt-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  <span>Doba realizace: <strong className="text-slate-900">{estimate.timeEstimate}</strong></span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Co vše je v tomto odhadu zahrnuto:
                </div>
                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Bourací práce & odvoz suti kontejnerem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Nové rozvody elektřiny v mědi + revize</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Rozvody vody, odpadů a hydroizolace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Zednické práce, Ytong a štukové / sádrové stěrky</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Smlouva o dílo, záruka a každodenní úklid</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
                <span>
                  Osobní prohlídka a přesné zaměření v <strong>{selectedCity}</strong> je zcela ZDARMA.
                </span>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handlePreFill}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
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
