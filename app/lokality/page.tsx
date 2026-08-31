import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { locations, siteConfig } from "@/lib/data";
import { MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Působnost a lokality v Karlovarském kraji | HANSBAU",
  description: "Přehled měst v Karlovarském kraji, kde provádíme rekonstrukce bytů na klíč: Cheb, Karlovy Vary, Sokolov, Aš, Františkovy Lázně, Mariánské Lázně, Ostrov, Chodov, Kraslice.",
  alternates: {
    canonical: "/lokality/",
  },
};

export default function LokalityPage() {
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
    <>
      <JsonLd
        pageTitle="Lokality v Karlovarském kraji - HANSBAU"
        pageDesc="Města v Karlovarském kraji, kde stavební firma HANSBAU provádí rekonstrukce bytů a koupelen."
        pageUrl={`${siteConfig.url}/lokality/`}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Lokality v kraji", url: `${siteConfig.url}/lokality/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-white text-slate-900">
        {/* Hero */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
              Působnost • Karlovarský kraj
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
              Lokality, kde rekonstruujeme byty
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Naše centrála se nachází v Potočišti u Chebu, což nám umožňuje rychlý a spolehlivý dojezd po celém Karlovarském kraji. Osobní prohlídku a zaměření provádíme bezplatně.
            </p>
          </div>
        </section>

        {/* 9 Cities Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
              Města v Karlovarském kraji
            </h2>
            <p className="text-sm text-slate-600">
              Klikněte na konkrétní město pro podrobné informace o rekonstrukcích bytů v dané lokalitě.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${loc.slug}`}
                className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-500/80 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white group-hover:bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      {driveTimes[loc.id] || "Karlovarský kraj"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    Rekonstrukce bytu {loc.city}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {loc.leadParagraph}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-red-600">
                  <span>Zobrazit podrobnosti k lokalitě</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Embedded Map Section */}
        <ServiceAreaMap />

        {/* Contact Form */}
        <ContactForm defaultService="Rekonstrukce bytu - Karlovarský kraj" />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
