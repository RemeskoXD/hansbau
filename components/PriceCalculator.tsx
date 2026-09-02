"use client";

import { useState, useMemo } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock,
  Sparkles,
  Building2,
  Home,
  Bath,
  Layers,
  MapPin,
  Info,
  AlertCircle
} from "lucide-react";
import { locations, siteConfig } from "@/lib/data";

type BuildingType = "panel" | "brick";
type LayoutType = "1kk" | "2kk" | "3kk" | "koupelna" | "jadro";
type StandardType = "standard" | "komfort";

interface PriceData {
  min: number;
  max: number;
  time: string;
}

// Exact pricing matrix from official HANSBAU specification document
const PRICING_MATRIX: Record<LayoutType, Record<BuildingType, Record<StandardType, PriceData>>> = {
  "1kk": {
    panel: {
      standard: { min: 314000, max: 410000, time: "4 – 7 týdnů" },
      komfort: { min: 432000, max: 528000, time: "4 – 7 týdnů" }
    },
    brick: {
      standard: { min: 384000, max: 499000, time: "5 – 9 týdnů" },
      komfort: { min: 528000, max: 643000, time: "5 – 9 týdnů" }
    }
  },
  "2kk": {
    panel: {
      standard: { min: 539000, max: 704000, time: "5 – 9 týdnů" },
      komfort: { min: 742000, max: 908000, time: "5 – 9 týdnů" }
    },
    brick: {
      standard: { min: 660000, max: 858000, time: "6 – 11 týdnů" },
      komfort: { min: 908000, max: 1106000, time: "6 – 11 týdnů" }
    }
  },
  "3kk": {
    panel: {
      standard: { min: 735000, max: 960000, time: "9 – 14 týdnů" },
      komfort: { min: 1012000, max: 1238000, time: "9 – 14 týdnů" }
    },
    brick: {
      standard: { min: 900000, max: 1170000, time: "10 – 16 týdnů" },
      komfort: { min: 1238000, max: 1508000, time: "10 – 16 týdnů" }
    }
  },
  "koupelna": {
    panel: {
      standard: { min: 147000, max: 200000, time: "2 – 4 týdny" },
      komfort: { min: 201000, max: 286000, time: "2 – 4 týdny" }
    },
    brick: {
      standard: { min: 147000, max: 200000, time: "2 – 4 týdny" },
      komfort: { min: 201000, max: 286000, time: "2 – 4 týdny" }
    }
  },
  "jadro": {
    panel: {
      standard: { min: 216000, max: 277000, time: "3 – 6 týdnů" },
      komfort: { min: 278000, max: 361000, time: "3 – 6 týdnů" }
    },
    brick: {
      standard: { min: 216000, max: 277000, time: "3 – 6 týdnů" },
      komfort: { min: 278000, max: 361000, time: "3 – 6 týdnů" }
    }
  }
};

export function PriceCalculator() {
  const [buildingType, setBuildingType] = useState<BuildingType>("panel");
  const [layout, setLayout] = useState<LayoutType>("2kk");
  const [standard, setStandard] = useState<StandardType>("standard");
  const [selectedCity, setSelectedCity] = useState<string>("Cheb");

  // Dynamic estimate calculation directly from exact pricing document matrix
  const currentResult = useMemo(() => {
    const data = PRICING_MATRIX[layout][buildingType][standard];
    
    const formatPrice = (val: number) => {
      return new Intl.NumberFormat("cs-CZ").format(val) + " Kč";
    };

    const isCoreOrBath = layout === "koupelna" || layout === "jadro";

    return {
      priceFormatted: `${formatPrice(data.min)} – ${formatPrice(data.max)}`,
      timeFormatted: data.time,
      isCoreOrBath,
      layoutTitle: 
        layout === "1kk" ? "Kompletní rekonstrukce bytu 1+kk / 1+1 (~35 m²)" :
        layout === "2kk" ? "Kompletní rekonstrukce bytu 2+kk / 2+1 (~55 m²)" :
        layout === "3kk" ? "Kompletní rekonstrukce bytu 3+kk / 3+1 (~75 m²)" :
        layout === "koupelna" ? "Rekonstrukce samostatné koupelny" :
        "Kompletní výměna bytového jádra vč. koupelny"
    };
  }, [buildingType, layout, standard]);

  const handlePreFill = () => {
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/kontakt";
    }
  };

  const isScopeCoreOrBath = layout === "koupelna" || layout === "jadro";

  return (
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80" id="kalkulacka">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            Online kalkulace rozpočtu
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            Orientační kalkulačka cen rekonstrukcí
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Získejte okamžitý přehled o orientační ceně a harmonogramu rekonstrukce. Přesný položkový rozpočet pro vás zdarma připravíme po osobním zaměření na místě.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-7 bg-slate-50/90 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
            
            {/* 1. Typ zástavby */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block flex items-center justify-between">
                <span>1. Typ zástavby</span>
                {isScopeCoreOrBath && (
                  <span className="text-[11px] font-normal text-slate-500 lowercase">
                    (u jádra/koupelny je cena fixní)
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBuildingType("panel")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    buildingType === "panel"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Panelový byt</span>
                    <Building2 className={`w-4 h-4 ${buildingType === "panel" ? "text-white" : "text-slate-400"}`} />
                  </div>
                  <div className={`text-xs mt-1 font-normal ${buildingType === "panel" ? "text-red-100" : "text-slate-500"}`}>
                    Sazba: 9 800 – 16 500 Kč/m²
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBuildingType("brick")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    buildingType === "brick"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Cihlový byt</span>
                    <Home className={`w-4 h-4 ${buildingType === "brick" ? "text-white" : "text-slate-400"}`} />
                  </div>
                  <div className={`text-xs mt-1 font-normal ${buildingType === "brick" ? "text-red-100" : "text-slate-500"}`}>
                    Sazba: 12 000 – 20 100 Kč/m²
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Dispozice bytu / Rozsah */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                2. Dispozice bytu / Rozsah rekonstrukce
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  { id: "1kk", label: "1+kk / 1+1", desc: "cca 35 m²", icon: Home },
                  { id: "2kk", label: "2+kk / 2+1", desc: "cca 55 m²", icon: Home },
                  { id: "3kk", label: "3+kk / 3+1", desc: "cca 75 m²", icon: Home },
                  { id: "koupelna", label: "Koupelna samostatná", desc: "rekonstrukce pouze koupelny", icon: Bath },
                  { id: "jadro", label: "Bytové jádro", desc: "výměna jádra vč. koupelny", icon: Layers }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = layout === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLayout(item.id as LayoutType)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                      } ${item.id === "jadro" || item.id === "koupelna" ? "sm:col-span-1" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                      </div>
                      <div className={`text-[11px] font-normal leading-tight ${isSelected ? "text-red-100" : "text-slate-500"}`}>
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Standard vybavení */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                3. Standard vybavení
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStandard("standard")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    standard === "standard"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Standard</span>
                    {standard === "standard" && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`text-xs mt-1 font-normal ${standard === "standard" ? "text-red-100" : "text-slate-500"}`}>
                    Kvalitní ověřené materiály s optimálním poměrem ceny a výkonu
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStandard("komfort")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    standard === "komfort"
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Komfort</span>
                    {standard === "komfort" && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`text-xs mt-1 font-normal ${standard === "komfort" ? "text-red-100" : "text-slate-500"}`}>
                    Vyšší řada sanity, velkoformátové obklady, designové prvky
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Město realizace (Nemá vliv na výpočet ceny) */}
            <div className="space-y-2 pt-1 border-t border-slate-200/80">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block flex items-center justify-between">
                <span>4. Město realizace</span>
                <span className="text-[11px] font-normal text-slate-400">
                  (nemá vliv na výpočet ceny)
                </span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-red-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-semibold focus:border-red-600 focus:outline-none shadow-sm transition-colors"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.city}>
                      {loc.city} ({loc.region})
                    </option>
                  ))}
                  <option value="Jiné město v Karlovarském kraji">Jiné město v Karlovarském kraji</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-red-500 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-bl-2xl">
                Orientační odhad
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Předpokládaná cena (bez DPH):
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  {currentResult.priceFormatted}
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1.5 font-medium">
                  <Clock className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Odhadovaná doba realizace: <strong className="text-slate-900 font-bold">{currentResult.timeFormatted}</strong></span>
                </div>
              </div>

              {/* Selected Configuration Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900">{currentResult.layoutTitle}</div>
                <div className="text-slate-600 flex items-center justify-between">
                  <span>Zástavba: <strong className="text-slate-800">{buildingType === "panel" ? "Panelový byt" : "Cihlový byt"}</strong></span>
                  <span>Standard: <strong className="text-slate-800 capitalize">{standard}</strong></span>
                </div>
              </div>

              {/* Co je v ceně zahrnuto */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {isScopeCoreOrBath 
                    ? "Co je v ceně zahrnuto (bytové jádro / koupelna):" 
                    : "Co je v ceně zahrnuto (kompletní rekonstrukce):"}
                </div>

                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  {isScopeCoreOrBath ? (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Demontáž a odvoz stávajícího vybavení</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Nové rozvody vody, odpadů a elektřiny</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Obklady, dlažba a hydroizolace</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Sanita a zařizovací předměty</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Smlouva o dílo, záruka a úklid</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Bourací práce a odvoz suti kontejnerem</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Nové rozvody elektřiny v mědi vč. Revize</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Rozvody vody, odpadů a hydroizolace</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Zednické práce, vyzdívky a štukové/sádrové povrchy</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Nivelace podkladu a nové podlahy</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Smlouva o dílo, záruka a úklid staveniště</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Disclaimer / Upozornění z podkladu */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950 space-y-1 font-normal leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Důležité informace k cenám:</span>
                </div>
                <p>
                  Uvedené ceny jsou pouze orientační a bez DPH. Konečná cena se vždy stanovuje až po posouzení aktuálního stavu bytu, rozsahu bouracích prací, stavu rozvodů, dostupnosti a přístupu na stavbu a zvoleného standardu materiálů. Skutečná cena se může od odhadu lišit směrem dolů i nahoru. Kalkulačka slouží jako hrubý odhad pro prvotní orientaci klienta – přesný položkový rozpočet připravujeme zdarma po osobním zaměření na místě v lokalitě <strong>{selectedCity}</strong> a celém Karlovarském kraji.
                </p>
              </div>

              {/* CTA Button */}
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
