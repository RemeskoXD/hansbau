import Link from "next/link";
import Image from "next/image";
import { 
  Home, 
  Bath, 
  Layers, 
  Hammer, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, typeof Home> = {
  Home,
  Layers,
  Bath,
  Hammer,
  ShieldCheck
};

export function ServicesSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="sluzby">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
            Stavební servis pro Karlovarský kraj
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Naše specializace na rekonstrukce
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Od vyklizení a bourání přes rozvody a sádrokartony až po finální předání. Veškeré řemeslné profese zajistíme na klíč pod jednou střechou.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = iconMap[srv.iconName] || Home;
            const targetUrl = `/${srv.slug}`;
            const isMain = srv.priority === "hlavní";

            return (
              <div
                key={srv.id}
                className={`group relative bg-slate-950/80 border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl ${
                  isMain 
                    ? "border-red-500/60 shadow-red-600/10 md:col-span-2 lg:col-span-1 ring-1 ring-red-500/30" 
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Service Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    {/* Category Icon */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-red-600/90 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    {isMain && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Hlavní služba</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                      <Link href={targetUrl} className="hover:underline">
                        {srv.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-900">
                      {srv.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    href={targetUrl}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-600 text-slate-200 hover:text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    <span>Podrobnosti & kalkulace</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
