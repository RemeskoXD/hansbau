import Link from "next/link";
import { MapPin, Navigation, Car, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig, locations } from "@/lib/data";

export function ServiceAreaMap() {
  const driveTimes: Record<string, string> = {
    "cheb": "Dojezd do 15 min",
    "frantiskovy-lazne": "Dojezd do 10 min",
    "as": "Dojezd do 25 min",
    "sokolov": "Dojezd do 20 min",
    "karlovy-vary": "Dojezd do 35 min",
    "marianske-lazne": "Dojezd do 30 min",
    "ostrov": "Dojezd do 40 min",
    "chodov": "Dojezd do 25 min",
    "kraslice": "Dojezd do 35 min",
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="pusobnost">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
                  Regionální dostupnost • Karlovarský kraj
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  Kde všude rekonstrukce bytů provádíme?
                </h2>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Naše centrála v Potočišti u Chebu nám umožňuje bleskový dojezd po celém Karlovarském kraji. Osobní prohlídku a zaměření provádíme bezplatně.
              </p>

              {/* City Badges with Clickable Prolinks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {locations.map((loc) => (
                  <Link
                    key={loc.id}
                    href={`/${loc.slug}`}
                    className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-red-500/60 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          {loc.city}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {driveTimes[loc.id] || "Karlovarský kraj"}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Visual Interactive Map / Location embed */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
                <iframe
                  title="HANSBAU Působnost v Karlovarském kraji"
                  src="https://maps.google.com/maps?q=Poto%C4%8Di%C5%A1t%C4%9B+21,+Odrava,+350+02+Cheb&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0 filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="absolute top-3 left-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
                    <div className="text-xs font-bold text-white">Centrála: Cheb (Potočiště 21)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
