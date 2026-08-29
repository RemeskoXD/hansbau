import { Star, CheckCircle, ExternalLink, Quote } from "lucide-react";
import { reviews, siteConfig } from "@/lib/data";

interface GoogleReviewsSectionProps {
  lang?: "cs" | "de";
}

export function GoogleReviewsSection({ lang = "cs" }: GoogleReviewsSectionProps) {
  const isCs = lang === "cs";

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="reference">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
              {isCs ? "Ověřené reference" : "Kundenstimmen & Referenzen"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              {isCs ? "Co o nás říkají naši zákazníci" : "Das sagen unsere Kunden"}
            </h2>
          </div>

          {/* Google 5.0 Rating Header Widget */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xl">
              5.0
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-white mt-1">
                Google Recenze (100% doporučuje)
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/gpQg2nwdZpDGTWCL9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
              title="Zobrazit na Google Mapách"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  „{rev.text}“
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{rev.author}</div>
                  <div className="text-[11px] text-slate-400">{rev.location}</div>
                </div>
                <div className="text-[10px] text-slate-400">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
