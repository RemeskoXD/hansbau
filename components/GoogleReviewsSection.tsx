import { Star, CheckCircle, ExternalLink } from "lucide-react";
import { reviews } from "@/lib/data";

export function GoogleReviewsSection() {
  return (
    <section className="py-20 bg-slate-50/70 text-slate-900 relative overflow-hidden border-b border-slate-200/80" id="reference">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
              Ověřené reference
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
              Co o nás říkají naši zákazníci
            </h2>
          </div>

          {/* Google 5.0 Rating Header Widget */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shrink-0 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 font-black text-xl">
              5.0
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                Google Recenze (100% doporučuje)
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/gpQg2nwdZpDGTWCL9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white transition-colors"
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
              className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm transform hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-normal">
                  „{rev.text}“
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.location}</div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
