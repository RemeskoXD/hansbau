import { workProcess } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface ProcessStepsSectionProps {
  lang?: "cs" | "de";
}

export function ProcessStepsSection({ lang = "cs" }: ProcessStepsSectionProps) {
  const isCs = lang === "cs";

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="jak-pracujeme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
            {isCs ? "Jednoduchý postup" : "Einfacher Ablauf"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            {isCs ? "Jak probíhá spolupráce s HANSBAU?" : "Wie läuft eine Renovierung ab?"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {isCs
              ? "Přehledný a transparentní proces od prvního kontaktu po předání klíčů."
              : "Transparenter Ablauf vom ersten Anruf bis zur schlüsselfertigen Übergabe."}
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {workProcess.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 mb-3">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="w-8 h-1 bg-slate-800 group-hover:bg-red-600 rounded-full transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
