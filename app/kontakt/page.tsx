import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt - Stavební firma HANSBAU Cheb",
  description: "Kontaktní údaje stavební firmy HANSBAU s.r.o. Sídlo: Potočiště 21, Cheb. Tel: +420 606 073 700. Bezplatná prohlídka a nezávazná kalkulace.",
  alternates: {
    canonical: "/kontakt/",
  },
};

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        pageTitle="Kontakt - HANSBAU stavební firma"
        pageDesc="Kontaktní údaje stavební firmy HANSBAU s.r.o."
        pageUrl={`${siteConfig.url}/kontakt/`}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Kontakt", url: `${siteConfig.url}/kontakt/` },
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Kontaktní informace
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Máte dotaz nebo zájem o nezávaznou cenovou nabídku? Zavolejte nám, napište e-mail nebo vyplňte formulář níže.
            </p>
          </div>
        </section>

        {/* Contact info grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Telefonický kontakt</h3>
              <p className="text-xs text-slate-400">
                Jsme vám k dispozici pondělí až sobota od 7:00 do 19:00.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${siteConfig.phoneCZRaw}`}
                  className="text-lg font-bold text-red-400 hover:text-red-300 block"
                >
                  {siteConfig.phoneCZ}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">E-mailová adresa</h3>
              <p className="text-xs text-slate-400">
                Odpovídáme standardně do 24 hodin od doručení poptávky.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-base font-bold text-red-400 hover:text-red-300"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sídlo společnosti</h3>
              <p className="text-xs text-slate-400">
                Centrála pro Karlovarský kraj.
              </p>
              <div className="pt-2 text-sm text-slate-200">
                <div className="font-bold">{siteConfig.name}</div>
                <div>{siteConfig.address.street}</div>
                <div>{siteConfig.address.zip} {siteConfig.address.city}</div>
                <div className="text-xs text-slate-400 mt-1">Jednatel: {siteConfig.contactPerson}</div>
              </div>
            </div>
          </div>
        </section>

        <ServiceAreaMap />
        <ContactForm />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
