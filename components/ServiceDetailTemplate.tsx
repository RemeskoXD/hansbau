import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { ServiceItem, locations, siteConfig } from "@/lib/data";
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Calculator,
  Award,
  Layers,
  MapPin
} from "lucide-react";

interface ServiceDetailTemplateProps {
  service: ServiceItem;
}

export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  return (
    <>
      <JsonLd
        pageTitle={`${service.title} | HANSBAU - Karlovarský kraj`}
        pageDesc={service.shortDesc}
        pageUrl={`${siteConfig.url}/${service.slug}/`}
        faqs={service.faq}
        serviceData={{
          name: service.title,
          description: service.shortDesc,
          url: `${siteConfig.url}/${service.slug}/`,
          image: `${siteConfig.url}${service.image}`
        }}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: "Služby", url: `${siteConfig.url}/sluzby/` },
          { name: service.title, url: `${siteConfig.url}/${service.slug}/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-slate-950 text-white">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>Stavební firma HANSBAU • Karlovarský kraj</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                  {service.title}
                </h1>

                <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Položkový rozpočet ZDARMA</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Pevná smlouva o dílo & záruka</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Realizace bez starostí na klíč</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Lokalita: Cheb, Sokolov, Aš, Karlovy Vary</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="#kontakt"
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Nezávazná nabídka zdarma</span>
                  </Link>

                  <a
                    href={`tel:${siteConfig.phoneCZRaw}`}
                    className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-2xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>Zavolat: {siteConfig.phoneCZ}</span>
                  </a>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Breakdown: Features & What's Included */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 2-column detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Box 1: Hlavní výhody */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                <Award className="w-6 h-6 text-red-500 shrink-0" />
                <span>Hlavní přednosti a výhody</span>
              </h2>
              <div className="space-y-4">
                {service.benefits.map((ben, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span className="leading-relaxed">{ben}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Co je v ceně */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                <Layers className="w-6 h-6 text-red-500 shrink-0" />
                <span>Rozsah a položky realizace</span>
              </h2>
              <div className="space-y-3">
                {service.included.map((inc, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Gallery of this Service */}
          {service.galleryImages && service.galleryImages.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase text-white">
                Ukázky z realizací: {service.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group"
                  >
                    <Image
                      src={img}
                      alt={`${service.title} ukázka ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Localized cities links for this service */}
        <section className="py-12 bg-slate-900 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="text-lg font-bold text-white uppercase">
                Tuto službu ({service.title}) realizujeme ve všech městech kraje:
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-red-600 border border-slate-800 hover:border-red-600 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>{loc.city}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Service FAQ */}
        {service.faq && service.faq.length > 0 && (
          <FAQSection
            customFaq={service.faq}
            title={`Časté dotazy: ${service.title}`}
            subtitle="Otázky & Odpovědi"
          />
        )}

        {/* Contact Form with pre-selected service */}
        <ContactForm defaultService={service.title} />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
