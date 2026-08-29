import { 
  BadgeCheck, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldAlert, 
  MapPin,
  Award,
  CheckCircle2
} from "lucide-react";
import { whyUsPoints } from "@/lib/data";

const iconMap: Record<string, typeof BadgeCheck> = {
  BadgeCheck,
  Clock,
  Users,
  Sparkles,
  ShieldAlert,
  MapPin
};

export function WhyUsSection() {
  return (
    <section className="py-20 bg-slate-50/70 text-slate-900 relative overflow-hidden border-b border-slate-200/80" id="proc-hansbau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading & Guarantee Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
                Proč si vybrat HANSBAU?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                Férové stavební řemeslo bez kompromisů a stresu
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Víme, jak náročná může být rekonstrukce. Proto stavíme na absolutní transparentnosti, dodržování rozpočtu a precizním řemeslném zpracování. U nás přesně víte, co platíte a kdy bude hotovo.
            </p>

            {/* Guarantee Highlight Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 space-y-3 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black shadow-md shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Garantovaný položkový rozpočet
                  </h3>
                  <div className="text-xs text-red-600 font-semibold">
                    Žádné skryté poplatky a nečekané doplatky
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Cena sjednaná ve smlouvě o dílo je konečná. Jakékoliv případné úpravy jsou vždy předem schváleny písemným dodatkem.
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
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all space-y-2.5 shadow-sm transform hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
