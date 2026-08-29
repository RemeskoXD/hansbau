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
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden" id="sluzby">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            Stavební servis pro Karlovarský kraj
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
            Naše specializace na rekonstrukce
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
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
                className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  isMain 
                    ? "border-2 border-red-500 shadow-md shadow-red-500/10 md:col-span-2 lg:col-span-1" 
                    : "border border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div>
                  {/* Service Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    
                    {/* Category Icon */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>

                    {isMain && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Hlavní služba</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      <Link href={targetUrl} className="hover:underline">
                        {srv.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {srv.shortDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {srv.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
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
                    className="w-full py-3 px-4 bg-slate-50 hover:bg-red-600 border border-slate-200 hover:border-red-600 text-slate-800 hover:text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
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
