import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { services, siteConfig } from "@/lib/data";
import { ArrowRight, CheckCircle2, Home, Layers, Bath, Hammer, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Stavební a řemeslné služby na klíč | HANSBAU Karlovarský kraj",
  description: "Rekonstrukce bytů (kompletní i částečné), bytová jádra, koupelny, zednické práce a elektro/voda/revize v Karlovarském kraji. HANSBAU.",
  alternates: {
    canonical: "/sluzby/",
  },
};

const iconMap: Record<string, typeof Home> = {
  Home,
  Layers,
  Bath,
  Hammer,
  ShieldCheck
};

export default function SluzbyPage() {
  return (
    <>
      <JsonLd
        pageTitle="Stavební a řemeslné služby na klíč - HANSBAU"
        pageDesc="Kompletní nabídka rekonstrukcí bytů a koupelen HANSBAU v Karlovarském kraji."
        pageUrl={`${siteConfig.url}/sluzby/`}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Služby", url: `${siteConfig.url}/sluzby/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-slate-950 text-white">
        {/* Page Hero */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
              HANSBAU • Karlovarský kraj
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Stavební a řemeslné služby na klíč
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Zajišťujeme kompletní realizace od bouracích prací přes rozvody, sádrokartony, obklady až po finální výmalbu a předání. S pevnou cenou a zárukou.
            </p>
          </div>
        </section>

        {/* Detailed Services Listing */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((srv, index) => {
            const Icon = iconMap[srv.iconName] || Home;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={srv.id}
                id={srv.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image side */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 group">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase">{srv.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className={`lg:col-span-6 space-y-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {srv.priority === "hlavní" && (
                        <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          Hlavní specializace
                        </span>
                      )}
                      {srv.priority === "priorita-2" && (
                        <span className="px-2.5 py-0.5 rounded bg-slate-800 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                          Specializace
                        </span>
                      )}
                      {srv.priority === "podpůrná" && (
                        <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                          Podpůrná služba
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                      {srv.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {srv.fullDesc}
                    </p>
                  </div>

                  {/* Included list */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Co je součástí služby:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {srv.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA link */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/${srv.slug}`}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
                    >
                      <span>Detail služby & kalkulace</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/#kontakt"
                      className="px-5 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      Nezávazná poptávka
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <ContactForm />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
