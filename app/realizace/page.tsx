import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { RealizaceGallery } from "@/components/RealizaceGallery";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Realizace a fotogalerie rekonstrukcí bytů | HANSBAU",
  description: "Ukázky našich realizací rekonstrukcí bytů, koupelen, jader a pokojů v Karlovarském kraji (Cheb, Karlovy Vary, Sokolov, Aš). HANSBAU.",
  alternates: {
    canonical: "/realizace/",
  },
};

export default function RealizacePage() {
  return (
    <>
      <JsonLd
        pageTitle="Realizace a fotogalerie rekonstrukcí - HANSBAU"
        pageDesc="Ukázky našich realizací rekonstrukcí bytů a koupelen v Karlovarském kraji."
        pageUrl={`${siteConfig.url}/realizace/`}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Realizace", url: `${siteConfig.url}/realizace/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-slate-950 text-white">
        {/* Page Hero */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
              Portfolio stavebních prací • Karlovarský kraj
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Fotogalerie našich realizací
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Podívejte se na reálné výsledky naší práce. Od panelákových koupelen a jader až po kompletní proměny celých bytů.
            </p>
          </div>
        </section>

        {/* Full Gallery with all items */}
        <RealizaceGallery showViewAll={false} />

        <ContactForm />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
