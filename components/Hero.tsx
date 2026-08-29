import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, Star, CheckCircle2, Calculator } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-8 pb-16 lg:py-24">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        {/* Glow orb */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-200">
                Google Hodnocení 5.0 ★ (Cheb, Karlovy Vary, Sokolov, Aš)
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
                Stavební firma HANSBAU • Karlovarský kraj
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.1] text-balance">
                Rekonstrukce bytů v Karlovarském kraji <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">na klíč</span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Kompletní i částečné rekonstrukce bytů, koupelen a bytových jader v Chebu, Sokolově, Aši a Karlových Varech. Přesnou cenu znáte předem. Žádné starosti se sháněním 5 různých řemeslníků.
            </p>

            {/* Key USPs check-list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Položková kalkulace & zaměření ZDARMA</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Pevná smlouva o dílo a záruka</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Všechny profese pod jednou střechou</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Každodenní úklid a ohled na sousedy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/#kontakt"
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calculator className="w-5 h-5" />
                <span>Nezávazná nabídka zdarma</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${siteConfig.phoneCZRaw}`}
                className="w-full sm:w-auto px-6 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-2xl text-white font-bold text-sm transition-all flex items-center justify-center gap-3 hover:border-slate-600"
              >
                <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
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
              <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                <Image
                  src="/images/nove/rekonstrukce-karlovarsky-kraj-hlavni.webp"
                  alt="Rekonstrukce bytu Karlovarský kraj HANSBAU"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Nedávná realizace</div>
                      <div className="text-sm font-bold text-white">Kompletní byt 3+1 Cheb</div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold rounded-lg flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Předáno na klíč
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating founder card with photo */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl max-w-xs text-left">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-red-500/40 shrink-0 bg-slate-800">
                  <Image
                    src={siteConfig.founderPhoto}
                    alt="Jan Červeňak - jednatel HANSBAU"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{siteConfig.contactPerson}</div>
                  <div className="text-[10px] text-red-400 font-semibold">{siteConfig.contactRole}</div>
                  <p className="text-[11px] text-slate-300 italic mt-0.5">
                    „Stavíme s poctivou zárukou a pevnou cenou.“
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats banner */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-white">40+ let</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Tradice řemesla od 1984
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-red-500">500+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Dokončených rekonstrukcí
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-white">100%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Dodržení pevného rozpočtu
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black text-amber-400">5.0 ★</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Google hodnocení zákazníků
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
