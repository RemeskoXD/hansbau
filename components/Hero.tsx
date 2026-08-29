import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Star, CheckCircle2, Calculator, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-white text-slate-900 pt-6 pb-16 lg:py-20 border-b border-slate-200/80">
      {/* Background subtle light ambient pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 subtle-grid-bg opacity-60" />
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-red-50/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-slate-100/80 rounded-full blur-3xl" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Google Hodnocení 5.0 ★ • Karlovarský kraj
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
                Stavební firma HANSBAU • Cheb, Sokolov, Vary, Aš
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 leading-[1.08] text-balance">
                Rekonstrukce bytů v Karlovarském kraji <span className="text-red-600">na klíč</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Kompletní i částečné rekonstrukce bytů, koupelen a bytových jader. Přesnou cenu znáte předem. Žádné starosti se sháněním 5 různých řemeslníků – vše pod jednou smlouvou a se zárukou.
            </p>

            {/* Key USPs check-list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                </div>
                <span>Položková kalkulace & zaměření ZDARMA</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                </div>
                <span>Pevná smlouva o dílo a 100% záruka</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                </div>
                <span>Všechny profese pod jednou střechou</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                </div>
                <span>Každodenní úklid a ohled na sousedy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <Link
                href="/#kontakt"
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calculator className="w-4 h-4" />
                <span>Nezávazná nabídka zdarma</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${siteConfig.phoneCZRaw}`}
                className="w-full sm:w-auto px-6 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-sm hover:border-slate-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Zavolat: {siteConfig.phoneCZ}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-slate-100 group">
                <Image
                  src="/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp"
                  alt="Rekonstrukce bytu Karlovarský kraj HANSBAU"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-left shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-600" />
                        <span>Nedávná realizace</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900">Kompletní byt 3+1 Cheb</div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Předáno na klíč
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating founder card with photo */}
              <div className="absolute -top-5 -right-5 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xl max-w-xs text-left">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-red-200 shrink-0 bg-slate-100">
                  <Image
                    src={siteConfig.founderPhoto}
                    alt="Jan Červeňak - jednatel HANSBAU"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{siteConfig.contactPerson}</div>
                  <div className="text-[10px] text-red-600 font-semibold">{siteConfig.contactRole}</div>
                  <p className="text-[11px] text-slate-600 italic mt-0.5">
                    „Stavíme s poctivou zárukou a pevnou cenou.“
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats banner */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">40+ let</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Tradice řemesla od 1984
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="text-2xl sm:text-3xl font-black text-red-600">500+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Dokončených rekonstrukcí
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Dodržení pevného rozpočtu
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-500">5.0 ★</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Google hodnocení zákazníků
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
