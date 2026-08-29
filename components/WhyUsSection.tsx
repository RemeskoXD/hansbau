import { 
  BadgeCheck, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldAlert, 
  MapPin,
  CheckCircle,
  Award
} from "lucide-react";
import { whyUsPoints } from "@/lib/data";

interface WhyUsSectionProps {
  lang?: "cs" | "de";
}

const iconMap: Record<string, typeof BadgeCheck> = {
  BadgeCheck,
  Clock,
  Users,
  Sparkles,
  ShieldAlert,
  MapPin
};

export function WhyUsSection({ lang = "cs" }: WhyUsSectionProps) {
  const isCs = lang === "cs";

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="proc-hansbau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Guarantee Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
                {isCs ? "Proč si vybrat HANSBAU?" : "Warum HANSBAU?"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {isCs ? "Férové stavební řemeslo bez kompromisů a stresu" : "Ehrliches Handwerk ohne Kompromisse"}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isCs
                ? "Víme, jak náročná může být rekonstrukce. Proto stavíme na absolutní transparentnosti, dodržování rozpočtu a precizním řemeslném zpracování. U nás přesně víte, co platíte a kdy bude hotovo."
                : "Wir wissen, wie anspruchsvoll eine Renovierung ist. Deshalb setzen wir auf transparente Festpreise, feste Termine und höchste handwerkliche Qualität."}
            </p>

            {/* Guarantee Highlight Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isCs ? "Garantovaný položkový rozpočet" : "Garantierter Festpreis"}
                  </h3>
                  <div className="text-xs text-red-400 font-semibold">
                    {isCs ? "Žádné skryté poplatky a nečekané doplatky" : "Keine versteckten Zusatzkosten"}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                {isCs
                  ? "Cena sjednaná ve smlouvě o dílo je konečná. Jakékoliv případné úpravy jsou vždy předem schváleny písemným dodatkem."
                  : "Der im Vertrag vereinbarte Preis ist verbindlich. Transparenz steht bei uns an erster Stelle."}
              </p>
            </div>
          </div>

          {/* Right Column: 6 Grid Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUsPoints.map((item, idx) => {
              const Icon = iconMap[item.icon] || BadgeCheck;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
