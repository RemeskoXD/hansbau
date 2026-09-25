import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";
import { getContentStore } from "@/lib/content-store";
import { Calculator, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulačka ceny rekonstrukce bytu | HANSBAU Karlovarský kraj",
  description: "Online orientační kalkulačka rekonstrukce bytu, bytového jádra nebo koupelny v Chebu, Sokolově, Aši a Karlových Varech. Zjistěte odhad ceny a harmonogram.",
  alternates: {
    canonical: "/kalkulacka/",
  },
};

const kalkulackaFaq = [
  {
    q: "Jak přesný je výpočet v online kalkulačce?",
    a: "Online kalkulačka poskytuje reálný orientační odhad na základě našich předchozích realizací v Karlovarském kraji. Přesný položkový rozpočet s pevnou cenou za sjednaný rozsah vám zdarma a nezávazně připravíme po osobním zaměření vašeho bytu."
  },
  {
    q: "Je osobní zaměření a cenová nabídka opravdu zdarma?",
    a: "Ano, zaměření i položkový rozpočet jsou zdarma a nezávazně. Přijedeme k vám do bytu kdekoliv v Karlovarském kraji (Cheb, Karlovy Vary, Sokolov, Aš atd.), zaměříme prostory a připravíme detailní položkový rozpočet."
  },
  {
    q: "Může se cena po podpisu smlouvy o dílo navýšit?",
    a: "Cena sjednaná ve smlouvě o dílo je pevná za dohodnutý rozsah prací. Jakékoliv případné změny či práce navíc s vámi vždy předem písemně odsouhlasíme dřív, než se na nich začne pracovat."
  },
  {
    q: "Co všechno je v celkové ceně rekonstrukce zahrnuto?",
    a: "Kompletní servis na klíč: bourací práce a odvoz suti, nové rozvody elektřiny v mědi včetně revize, rozvody vody a odpadů, zednické práce, sádrokartony, obklady, dlažby, podlahy i finální úklid."
  }
];

export default function KalkulackaPage() {
  const { calculator } = getContentStore().content;

  return (
    <>
      <JsonLd
        pageTitle="Kalkulačka rekonstrukce bytu - HANSBAU"
        pageDesc="Online kalkulačka ceny a harmonogramu rekonstrukce bytu a bytového jádra v Karlovarském kraji."
        pageUrl={`${siteConfig.url}/kalkulacka/`}
        faqs={kalkulackaFaq}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Kalkulačka rozpočtu", url: `${siteConfig.url}/kalkulacka/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-white text-slate-900">
        {/* Page Hero */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
              {calculator.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
              {calculator.title}
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {calculator.perex}
            </p>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600" />
                <span>Osobní zaměření a kalkulace zdarma</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Pevná garantovaná cena ve smlouvě</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span>Přesný časový harmonogram prací</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Calculator Section */}
        <PriceCalculator
          badge={calculator.badge}
          title={calculator.title}
          perex={calculator.perex}
          disclaimer={calculator.disclaimer}
        />

        {/* FAQ Section */}
        <FAQSection
          customFaq={kalkulackaFaq}
          title="Časté dotazy k cenám a rozpočtu rekonstrukcí"
          subtitle="Transparentní finance"
        />

        {/* Contact form */}
        <ContactForm defaultService="Kalkulace rekonstrukce bytu na míru" />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
