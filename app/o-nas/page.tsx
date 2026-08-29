import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/data";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  Clock, 
  BadgeCheck, 
  Phone, 
  Calculator,
  ArrowRight,
  Sparkles
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
      <main className="flex-1 bg-slate-950 text-white">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
              Stavební firma HANSBAU • Karlovarský kraj
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Kdo jsme a co děláme
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Poctivé stavební řemeslo s tradicí rodinných zkušeností sahajících až do roku 1984. Specializujeme se na rekonstrukce bytů v celém Karlovarském kraji.
            </p>
          </div>
        </section>

        {/* Story & Philosophy Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                  Naše hodnoty & filozofie
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
                  Stavíme na důvěře, pevných cenách a čistotě
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">HANSBAU s.r.o.</strong> je stavební firma se sídlem v Potočišti u Chebu, založená v roce 2016 s návazností na rodinnou řemeslnou tradici od roku 1984. Naší hlavní specializací jsou kompletní i částečné rekonstrukce bytů a koupelen.
                </p>
                <p>
                  Řešíme úpravy dispozic, bourací a přípravné práce, zednické práce, sádrokartony, omítky, velkoformátové obklady, dlažby, podlahy a dokončovací práce. V rámci každé rekonstrukce zajistíme také navazující profese, jako jsou instalatérské a elektrikářské práce včetně potřebných revizních zpráv přes naše stálé partnery.
                </p>
                <p>
                  Naším cílem je, aby pro vás rekonstrukce nebyla noční můrou. Nemusíte shánět 5 různých part řemeslníků – u nás máte jednoho spolehlivého partnera, který ručí za celý výsledek smlouvou o dílo.
                </p>
              </div>

              {/* 4 Pillars Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Položkový rozpočet bez skrytých víceprací</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Pevná smlouva o dílo a záruka</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Pojištění odpovědnosti pro vaši jistotu</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Každodenní úklid a ohled na sousedy</span>
                </div>
              </div>
            </div>

            {/* Founder Card with real photo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl text-center">
                <div className="relative w-40 h-40 mx-auto rounded-3xl overflow-hidden border-2 border-red-500 shadow-xl bg-slate-800">
                  <Image
                    src={siteConfig.founderPhoto}
                    alt="Jan Červeňak - jednatel HANSBAU"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{siteConfig.contactPerson}</h3>
                  <div className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                    {siteConfig.contactRole}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  „Každou stavbu realizujeme tak, jako bychom stavěli pro sebe. Naší největší vizitkou je spokojený zákazník, který nás s čistým svědomím doporučí svým známým.“
                </p>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-4 text-xs font-bold text-slate-300">
                  <a
                    href={`tel:${siteConfig.phoneCZRaw}`}
                    className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-red-600 border border-slate-800 hover:border-red-600 text-white transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    <span>{siteConfig.phoneCZ}</span>
                  </a>
                </div>
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-red-500">40+</div>
                  <div className="text-[11px] text-slate-300 font-semibold">Let tradice řemesla</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">5.0 ★</div>
                  <div className="text-[11px] text-slate-300 font-semibold">Google Recenze</div>
                </div>
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
