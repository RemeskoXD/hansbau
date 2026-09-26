"use client";

import { useState, useMemo, useEffect } from "react";
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
  Lock,
  User,
  Phone,
  Check,
  RotateCcw,
  Loader2
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

export interface PriceCalculatorProps {
  badge?: string;
  title?: string;
  perex?: string;
  disclaimer?: string;
}

export function PriceCalculator({
  badge = "Online kalkulace rozpočtu",
  title = "Orientační kalkulačka cen rekonstrukcí",
  perex = "Vyberte parametry vaší rekonstrukce a získejte okamžitý přehled o orientační ceně a harmonogramu. Přesný položkový rozpočet pro vás zdarma připravíme po osobním zaměření na místě.",
  disclaimer = "Uvedené ceny jsou pouze orientační a bez DPH. Konečná cena se vždy stanovuje až po posouzení aktuálního stavu bytu, rozsahu bouracích prací, stavu rozvodů, dostupnosti a přístupu na stavbu a zvoleného standardu materiálů. Skutečná cena se může od odhadu lišit směrem dolů i nahoru. Kalkulačka slouží jako hrubý odhad pro prvotní orientaci klienta – přesný položkový rozpočet připravujeme zdarma po osobním zaměření na místě v Karlovarském kraji."
}: PriceCalculatorProps) {
  const [buildingType, setBuildingType] = useState<BuildingType>("panel");
  const [layout, setLayout] = useState<LayoutType>("2kk");
  const [standard, setStandard] = useState<StandardType>("standard");
  const [selectedCity, setSelectedCity] = useState<string>("Cheb");

  // Lead Gate state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleUnlockAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedName = clientName.trim();
    const trimmedPhone = clientPhone.trim();

    if (trimmedName.length < 2) {
      setSubmitError("Zadejte prosím vaše platné jméno a příjmení.");
      return;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (phoneDigits.length < 6) {
      setSubmitError("Zadejte prosím platné telefonní číslo (alespoň 6 číslic).");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send lead to server API which forwards it to team@hansbau.com via Mescon SMTP
      const res = await fetch("/api/calculator-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          city: selectedCity,
          buildingType: buildingType === "panel" ? "Panelový byt" : "Cihlový byt",
          layout: currentResult.layoutTitle,
          standard: standard === "standard" ? "Standard" : "Komfort",
          priceRange: currentResult.priceFormatted,
          timeEstimate: currentResult.timeFormatted
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn("Calculator lead server message:", data);
      }

      // Unlock result display
      setIsUnlocked(true);
    } catch (err) {
      console.error("Failed to submit calculator lead:", err);
      // Gracefully unlock anyway so the user always sees their price
      setIsUnlocked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      // Smoothly scroll to calculation result so user is anchored directly on the answer on mobile
      const timer1 = setTimeout(() => {
        const resultEl = document.getElementById("kalkulace-vysledek");
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);

      // Second trigger ensures proper alignment after mobile virtual keyboard dismisses
      const timer2 = setTimeout(() => {
        const resultEl = document.getElementById("kalkulace-vysledek");
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 250);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isUnlocked]);

  const handlePreFill = () => {
    const prefillData = {
      name: clientName,
      phone: clientPhone,
      city: selectedCity,
      service: layout === "koupelna" 
        ? "Rekonstrukce koupelny" 
        : layout === "jadro" 
          ? "Rekonstrukce bytového jádra" 
          : "Rekonstrukce bytu (kompletní i částečná)",
      message: `Poptávka z online kalkulačky:\n• Požadavek: ${currentResult.layoutTitle}\n• Zástavba: ${buildingType === "panel" ? "Panelový byt" : "Cihlový byt"}\n• Standard: ${standard === "standard" ? "Standard" : "Komfort"}\n• Město: ${selectedCity}\n• Orientační cena: ${currentResult.priceFormatted}\n• Odhadovaná doba: ${currentResult.timeFormatted}`
    };

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hansbau:prefill-contact", { detail: prefillData }));
      try {
        sessionStorage.setItem("hansbau_calc_prefill", JSON.stringify(prefillData));
      } catch {}
    }

    const targetEl = document.getElementById("poptavkovy-formular") || document.getElementById("kontakt");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const emailInput = targetEl.querySelector("input[type=email]") as HTMLInputElement | null;
        if (emailInput && !emailInput.value) {
          emailInput.focus({ preventScroll: true });
        }
      }, 500);
    } else {
      const query = new URLSearchParams({
        name: clientName,
        phone: clientPhone,
        city: selectedCity,
        service: prefillData.service,
      }).toString();
      window.location.href = `/kontakt?${query}#poptavkovy-formular`;
    }
  };

  const isScopeCoreOrBath = layout === "koupelna" || layout === "jadro";

  return (
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80" id="kalkulacka">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {perex}
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

          {/* Results / Lead-Gate Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {!isUnlocked ? (
              /* Gated State: Requires Name & Phone to Reveal Calculation */
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-300 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider rounded-bl-2xl flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Kalkulace připravena</span>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600 block">
                    Okamžitý výpočet zdarma
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                    Získejte okamžitou orientační cenu a harmonogram
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Zadejte své jméno a telefonní číslo pro okamžité zobrazení cenového rozpětí a doby trvání prací pro vaši konfiguraci.
                  </p>
                </div>

                {/* Configuration Summary Badge */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">{currentResult.layoutTitle}</div>
                  <div className="text-slate-600 flex items-center justify-between">
                    <span>Zástavba: <strong className="text-slate-800">{buildingType === "panel" ? "Panel" : "Cihla"}</strong></span>
                    <span>Standard: <strong className="text-slate-800 capitalize">{standard}</strong></span>
                    <span>Město: <strong className="text-slate-800">{selectedCity}</strong></span>
                  </div>
                </div>

                {/* Lead Gate Form */}
                <form onSubmit={handleUnlockAndSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                      <Info className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Vaše jméno a příjmení *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="např. Jan Novák"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:border-red-600 focus:ring-2 focus:ring-red-600/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>Telefonní číslo *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+420 777 123 456"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:border-red-600 focus:ring-2 focus:ring-red-600/20 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generuji kalkulaci...</span>
                      </>
                    ) : (
                      <>
                        <span>Zobrazit orientační kalkulaci</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Vaše údaje jsou u nás v bezpečí. Žádný spam, slouží pouze pro předání kalkulace.</span>
                </div>
              </div>
            ) : (
              /* Unlocked State: Exact Price, Timeline & Inclusions */
              <div 
                id="kalkulace-vysledek" 
                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-red-500 shadow-xl space-y-6 relative overflow-hidden animate-in fade-in duration-300 scroll-mt-24 sm:scroll-mt-28 ring-4 ring-red-500/10"
              >
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-bl-2xl">
                  Orientační odhad
                </div>

                {/* Client Thank you Confirmation banner */}
                <div className="p-3.5 rounded-2xl bg-green-50 border border-green-200 flex items-center gap-2.5 text-xs text-green-900 font-semibold">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>
                    Děkujeme, <strong>{clientName}</strong>! Vaše kalkulace byla úspěšně vygenerována a odeslána technikovi.
                  </span>
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
                    <span>Lokalita: <strong className="text-slate-800">{selectedCity}</strong></span>
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
                    {disclaimer} (Aktuálně zvolená lokalita pro zaměření zdarma: <strong>{selectedCity}</strong>).
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handlePreFill}
                    className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Objednat bezplatné zaměření na místě</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsUnlocked(false)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Zadat jiné kontaktní údaje</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
