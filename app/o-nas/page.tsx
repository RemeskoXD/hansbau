import { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";
import { 
  CheckCircle2, 
  Phone
} from "lucide-react";

export const metadata: Metadata = {
  title: "O nás - Stavební firma HANSBAU",
  description: "Česká stavební firma z Karlovarského kraje se zaměřením na rekonstrukce bytů a domů. Tradice řemesla od roku 1984, férové jednání a pevné ceny.",
  alternates: {
    canonical: "/o-nas/",
  },
};

export default function ONasPage() {
  return (
    <>
      <JsonLd
        pageTitle="O nás - HANSBAU stavební firma"
        pageDesc="Česká stavební firma z Karlovarského kraje se zaměřením na rekonstrukce bytů a domů."
        pageUrl={`${siteConfig.url}/o-nas/`}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "O nás", url: `${siteConfig.url}/o-nas/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-white text-slate-900">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
              Stavební firma HANSBAU • Karlovarský kraj
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
              Kdo jsme a co děláme
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Poctivé stavební řemeslo s tradicí rodinných zkušeností sahajících až do roku 1984. Specializujeme se na rekonstrukce bytů v celém Karlovarském kraji.
            </p>
          </div>
        </section>

        {/* Story & Philosophy Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  Naše hodnoty & filozofie
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-950 leading-tight">
                  Stavíme na důvěře, pevných cenách a čistotě
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <p>
                  <strong className="text-slate-950 font-bold">{siteConfig.legalName}</strong> (působící pod značkou <strong className="text-slate-950 font-bold">{siteConfig.name}</strong>) je stavební a zednická firma se sídlem v Potočišti u Chebu. Stavíme na poctivém řemesle, osobním přístupu a rodinné tradici sahající až do roku 1984.
                </p>
                <p>
                  Naší hlavní specializací jsou <strong>kompletní rekonstrukce bytů na klíč, zděná bytová jádra z Ytongu a moderní koupelny</strong> po celém Karlovarském kraji. Zákazníkům nabízíme naprostý klid: od bouracích prací a odvozu suti přes novou elektřinu v mědi, instalatérské rozvody, precizní velkoformátové obklady, štuky a sádrové stěrky až po pokládku podlah.
                </p>
                <p>
                  Nemusíte shánět 5 různých part řemeslníků a složitě je koordinovat. Všechny profese – včetně certifikovaného elektrikáře a instalatéra s revizními zprávami – koordinuje osobně pan Červeňak. Za celý výsledek ručíme pevnou smlouvou o dílo a garantovanou cenou.
                </p>
              </div>

              {/* 4 Pillars Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Položkový rozpočet bez skrytých víceprací</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Pevná smlouva o dílo a termín dokončení</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Plné pojištění odpovědnosti za dílo</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Každodenní úklid a ohled na sousedy</span>
                </div>
              </div>

              {/* Official Company Credentials Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
                <div className="font-bold uppercase tracking-wider text-slate-900 text-[11px] text-red-600">
                  Fakturační & Právní údaje
                </div>
                <div className="text-slate-950 font-bold text-sm sm:text-base">
                  {siteConfig.legalName}
                </div>
                <div className="text-slate-600 text-xs">
                  Sídlo: <strong>{siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}</strong>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 pt-2 border-t border-slate-100 text-slate-700 text-xs font-semibold">
                  <span>IČO: <strong>{siteConfig.ico}</strong></span>
                  <span>DIČ: <strong>{siteConfig.dic}</strong></span>
                  <span>Jednatel: <strong>{siteConfig.contactPerson}</strong></span>
                </div>
              </div>
            </div>

            {/* Founder Card with real photo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 shadow-md text-center">
                <div className="relative w-44 h-56 mx-auto rounded-3xl overflow-hidden border-2 border-red-500 shadow-xl bg-slate-100">
                  <Image
                    src={siteConfig.founderPhoto}
                    alt="Jan Červeňak - jednatel společnosti"
                    fill
                    priority
                    sizes="200px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">{siteConfig.contactPerson}</h3>
                  <div className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                    {siteConfig.contactRole} • {siteConfig.legalName}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-normal bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  „Za každou rekonstrukcí stojím osobně. Když se domluvíme na rozpočtu a termínu, platí to. Sám koordinuji instalatéry i elektrikáře, dohlížím na precizní obklady a zednickou práci a dbám na to, aby po nás každý den zůstalo uklizeno. Naší největší vizitkou je spokojený zákazník a poctivě odvedené řemeslo.“
                </p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-center gap-4 text-xs font-bold text-slate-800">
                  <a
                    href={`tel:${siteConfig.phoneCZRaw}`}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Zavolat panu Červeňakovi</span>
                  </a>
                </div>
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-red-600">40+</div>
                  <div className="text-[11px] text-slate-600 font-semibold">Let tradice řemesla</div>
                </div>
                <a
                  href={siteConfig.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-white hover:border-red-400 border border-slate-200 text-center space-y-1 shadow-sm transition-all group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-amber-500 group-hover:scale-105 transition-transform">5.0 ★</div>
                  <div className="text-[11px] text-slate-600 group-hover:text-red-600 font-semibold transition-colors">Google Recenze</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
