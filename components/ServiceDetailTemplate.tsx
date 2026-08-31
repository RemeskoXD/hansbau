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
      <main className="flex-1 bg-white text-slate-900">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-red-600 uppercase tracking-wider shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Stavební firma HANSBAU • Karlovarský kraj</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                  {service.title}
                </h1>

                <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {service.fullDesc}
                </p>

                {/* Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Položkový rozpočet ZDARMA</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Pevná smlouva o dílo & záruka</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Realizace bez starostí na klíč</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Lokalita: Cheb, Sokolov, Aš, Karlovy Vary</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
                  <Link
                    href="/kontakt"
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Nezávazná nabídka zdarma</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/kalkulacka"
                    className="w-full sm:w-auto px-6 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calculator className="w-4 h-4 text-red-600" />
                    <span>Spočítat rozpočet</span>
                  </Link>

                  <a
                    href={`tel:${siteConfig.phoneCZRaw}`}
                    className="w-full sm:w-auto px-5 py-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-red-600" />
                    <span>{siteConfig.phoneCZ}</span>
                  </a>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
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
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 shadow-sm">
              <h2 className="text-2xl font-black uppercase text-slate-950 flex items-center gap-3">
                <Award className="w-6 h-6 text-red-600 shrink-0" />
                <span>Hlavní přednosti a výhody</span>
              </h2>
              <div className="space-y-4">
                {service.benefits.map((ben, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span className="leading-relaxed font-normal">{ben}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Co je v ceně */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 shadow-sm">
              <h2 className="text-2xl font-black uppercase text-slate-950 flex items-center gap-3">
                <Layers className="w-6 h-6 text-red-600 shrink-0" />
                <span>Rozsah a položky realizace</span>
              </h2>
              <div className="space-y-3">
                {service.included.map((inc, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Gallery of this Service */}
          {service.galleryImages && service.galleryImages.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase text-slate-950">
                Ukázky z realizací: {service.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-sm hover:shadow-md transition-all"
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
        <section className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="text-lg font-bold text-slate-900 uppercase">
                Tuto službu ({service.title}) realizujeme ve všech městech kraje:
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-red-600 border border-slate-200 hover:border-red-600 text-xs font-semibold text-slate-700 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <MapPin className="w-3 h-3 text-red-600" />
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
