import { workProcess } from "@/lib/data";

export function ProcessStepsSection() {
  return (
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200" id="jak-pracujeme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            Jednoduchý postup
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            Jak probíhá spolupráce s HANSBAU?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Přehledný a transparentní proces od prvního kontaktu po předání klíčů.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {workProcess.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-red-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div>
                <div className="text-3xl font-black text-red-600 mb-3">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="w-8 h-1 bg-slate-200 group-hover:bg-red-600 rounded-full transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
