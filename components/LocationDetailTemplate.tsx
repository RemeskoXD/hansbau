import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { LocationItem, services, siteConfig } from "@/lib/data";
import { 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Star, 
  Clock, 
  Calculator,
  Home,
  Layers,
  Bath,
  Hammer
} from "lucide-react";

interface LocationDetailTemplateProps {
  location: LocationItem;
}

export function LocationDetailTemplate({ location }: LocationDetailTemplateProps) {
  const iconList = [Home, Layers, Bath, Hammer];

  return (
    <>
      <JsonLd
        pageTitle={location.metaTitle}
        pageDesc={location.metaDesc}
        pageUrl={`${siteConfig.url}/${location.slug}/`}
        faqs={location.faq}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url },
          { name: `Rekonstrukce bytu ${location.city}`, url: `${siteConfig.url}/${location.slug}/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-slate-950 text-white">
        {/* Location Hero */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Lokalita: {location.city} a okolí ({location.region})</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                  Rekonstrukce bytu <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">{location.city}</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {location.leadParagraph}
                </p>

                {/* Specifics for this city */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                    Naše působení v lokalitě {location.city}:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {location.specifics.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="#kontakt"
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Nezávazná nabídka v {location.city}</span>
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
                    src={location.heroImage}
                    alt={`Rekonstrukce bytu ${location.city}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-bold text-white uppercase">{location.city}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-green-400">Bezplatné zaměření</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services overview for this location with prolinks */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-red-500 block">
              Co pro vás v lokalitě {location.city} zajistíme
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
              Stavební služby pro byty a koupelny v {location.city}
            </h2>
            <p className="text-sm text-slate-400">
              Všechny práce provádíme na klíč pod jednou smlouvou o dílo. Klikněte pro detail jednotlivých služeb:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((srv, idx) => {
              const Icon = iconList[idx] || Home;
              return (
                <div
                  key={srv.slug}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      <Link href={`/${srv.slug}`}>{srv.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  <Link
                    href={`/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 pt-2 border-t border-slate-800"
                  >
                    <span>Zjistit více</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Realizace v lokalitě */}
        {location.realizaceImages && location.realizaceImages.length > 0 && (
          <section className="py-16 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-500 block">
                    Fotogalerie prací
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                    Ukázky rekonstrukcí v {location.city} a okolí
                  </h2>
                </div>
                <Link
                  href="/realizace"
                  className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <span>Všechny realizace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {location.realizaceImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 space-y-3 p-3"
                  >
                    <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-900">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-2 pb-2">
                      <div className="text-sm font-bold text-white">{img.title}</div>
                      <div className="text-xs text-slate-400">{img.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Proč HANSBAU v dané lokalitě */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                Spolehlivý partner pro {location.city}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
                Proč si vybrat HANSBAU v lokalitě {location.city}?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rekonstrukce bytu je významná investice. S námi máte jistotu, že stavební práce proběhnou bez zbytečných prodlev, s ohledem na sousedy a za předem garantovanou pevnou cenu.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {location.whyHere.map((wh, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <h3 className="text-base font-bold text-white">{wh.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{wh.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localized FAQ */}
        {location.faq && location.faq.length > 0 && (
          <FAQSection
            customFaq={location.faq}
            title={`Časté dotazy k rekonstrukci bytu v ${location.city}`}
            subtitle={`Otázky & Odpovědi • ${location.city}`}
          />
        )}

        {/* Neighboring locations internal links */}
        <section className="py-12 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm font-bold text-slate-300">
                Rekonstrukce provádíme i v sousedních městech:
              </div>
              <div className="flex flex-wrap gap-2">
                {location.neighboringLocations.map((nei) => (
                  <Link
                    key={nei.slug}
                    href={`/${nei.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-red-600 border border-slate-800 hover:border-red-600 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>Rekonstrukce bytu {nei.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact form with city prefill */}
        <ContactForm defaultService={`Rekonstrukce bytu - ${location.city}`} />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
