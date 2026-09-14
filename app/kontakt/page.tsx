import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";
import { getContentStore } from "@/lib/content-store";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt - Stavební firma HANSBAU Cheb",
  description: "Kontaktní údaje stavební firmy Jan Červeňak s.r.o. (HANSBAU). Sídlo: Potočiště 21, Cheb. Tel: +420 606 073 700. Bezplatná prohlídka a nezávazná kalkulace.",
  alternates: {
    canonical: "/kontakt/",
  },
};

export default function KontaktPage() {
  const { contact, company } = getContentStore().content;

  return (
    <>
      <JsonLd
        pageTitle="Kontakt - HANSBAU stavební firma"
        pageDesc="Kontaktní údaje stavební firmy Jan Červeňak s.r.o. (HANSBAU)."
        pageUrl={`${siteConfig.url}/kontakt/`}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Kontakt", url: `${siteConfig.url}/kontakt/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-white text-slate-900">
        {/* Page Hero */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
              {company.brandName} • Karlovarský kraj
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
              {contact.title}
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {contact.perex}
            </p>
          </div>
        </section>

        {/* Contact info grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Telefonický kontakt</h3>
              <p className="text-xs text-slate-600 font-normal">
                {contact.openingHours}
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="text-lg font-bold text-red-600 hover:text-red-700 block"
                >
                  {company.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">E-mailová adresa</h3>
              <p className="text-xs text-slate-600 font-normal">
                {contact.responseSpeed}
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${company.email}`}
                  className="text-base font-bold text-red-600 hover:text-red-700"
                >
                  {company.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sídlo & Fakturační údaje</h3>
              <p className="text-xs text-slate-600 font-normal">
                Oficiální sídlo společnosti a centrála.
              </p>
              <div className="pt-2 text-sm text-slate-800 space-y-1">
                <div className="font-bold text-slate-950">{company.legalName}</div>
                <div className="text-xs text-slate-500 font-medium">Obchodní značka: {company.brandName}</div>
                <div className="text-slate-700">{company.street}</div>
                <div className="text-slate-700">{company.zip} {company.city} (Cheb)</div>
                <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 space-y-0.5">
                  <div><strong>IČO:</strong> {company.ico}</div>
                  <div><strong>DIČ:</strong> {company.dic}</div>
                  <div><strong>Jednatel:</strong> {company.representative}</div>
                </div>
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
