import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Star, CheckCircle2, Calculator } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pt-8 pb-16 lg:py-20 border-b border-slate-200">
      {/* Background subtle light pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Google Hodnocení 5.0 ★ (Cheb, Karlovy Vary, Sokolov, Aš)
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
                Stavební firma HANSBAU • Karlovarský kraj
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 leading-[1.1] text-balance">
                Rekonstrukce bytů v Karlovarském kraji <span className="text-red-600">na klíč</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Kompletní i částečné rekonstrukce bytů, koupelen a bytových jader v Chebu, Sokolově, Aši a Karlových Varech. Přesnou cenu znáte předem. Žádné starosti se sháněním 5 různých řemeslníků.
            </p>

            {/* Key USPs check-list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Položková kalkulace & zaměření ZDARMA</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Pevná smlouva o dílo a záruka</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Všechny profese pod jednou střechou</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>Každodenní úklid a ohled na sousedy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/#kontakt"
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calculator className="w-5 h-5" />
                <span>Nezávazná nabídka zdarma</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${siteConfig.phoneCZRaw}`}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-sm hover:border-slate-400"
              >
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{siteConfig.phoneCZ}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white">
                <Image
                  src="/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp"
                  alt="Rekonstrukce bytu Karlovarský kraj HANSBAU"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-left shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Nedávná realizace</div>
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
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xl max-w-xs text-left">
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
        <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-slate-900">40+ let</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Tradice řemesla od 1984
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-red-600">500+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Dokončených rekonstrukcí
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-slate-900">100%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Dodržení pevného rozpočtu
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-amber-500">5.0 ★</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Google hodnocení zákazníků
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
