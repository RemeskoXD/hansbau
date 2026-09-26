import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { JsonLd } from "@/components/JsonLd";
import { LocationItem, cityInLocative, services, siteConfig } from "@/lib/data";
import { 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Calculator,
  Home,
  Layers,
  Bath,
  Hammer,
  ShieldCheck,
  Clock,
  Sparkles,
  Award,
  Building,
  Check
} from "lucide-react";

interface LocationDetailTemplateProps {
  location: LocationItem;
}

export function LocationDetailTemplate({ location }: LocationDetailTemplateProps) {
  const inCity = cityInLocative[location.city] || `v ${location.city}`;
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
          { name: "Lokality", url: `${siteConfig.url}/lokality/` },
          { name: `Rekonstrukce bytu ${inCity}`, url: `${siteConfig.url}/${location.slug}/` },
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-white text-slate-900">
        {/* Location Hero */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-red-600 uppercase tracking-wider shadow-sm">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Lokalita: {location.city} ({location.region})</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[11px] font-bold text-green-700">
                    <Clock className="w-3.5 h-3.5 text-green-600" />
                    <span>{location.driveTime}</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                  Rekonstrukce bytu <span className="text-red-600">{inCity}</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {location.leadParagraph}
                </p>

                {/* Specifics for this city */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Co u nás {inCity} dostanete:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {location.specifics.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
                  <Link
                    href="#poptavkovy-formular"
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
                    src={location.heroImage}
                    alt={`Rekonstrukce bytu ${inCity}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-left shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-slate-900 uppercase">{location.city}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">Bezplatná prohlídka a zaměření</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods & Quarters badge section */}
        {location.neighborhoods && location.neighborhoods.length > 0 && (
          <section className="py-10 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Místní dostupnost
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    Čtvrti a sídliště, kde {inCity} působíme:
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {location.neighborhoods.map((nei, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                    >
                      {nei}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step-by-step Process in this City */}
        <section className="py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 block">
                Průběh prací
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-950">
                Jak rekonstrukce probíhá
              </h2>
              <p className="text-sm text-slate-600">
                Od první poptávky po předání hotové rekonstrukce ve 4 krocích.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Prohlídka a zaměření zdarma",
                  desc: "Přijedeme k vám, byt zaměříme, posoudíme stav rozvodů a probereme vaše představy.",
                },
                {
                  step: "02",
                  title: "Položkový rozpočet zdarma",
                  desc: "Připravíme rozpočet s rozpisem prací a materiálu. Termín jeho zaslání vám potvrdíme při prohlídce.",
                },
                {
                  step: "03",
                  title: "Smlouva a realizace",
                  desc: "Ve smlouvě potvrdíme rozsah, cenu a termíny. Zajistíme bourání, rozvody, zdění, sádrokartony, obklady i podlahy a řemeslníky koordinujeme my.",
                },
                {
                  step: "04",
                  title: "Úklid a předání",
                  desc: "Uklidíme, společně projdeme hotové práce a předáme předávací protokol a revizní zprávy.",
                },
              ].map((st, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden"
                >
                  <div className="text-2xl font-black text-red-600">{st.step}</div>
                  <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services overview for this location with prolinks */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-red-600 block">
              Naše služby
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-950">
              Co {inCity} děláme
            </h2>
            <p className="text-sm text-slate-600">
              Všechny práce zajistíme pod jednou smlouvou o dílo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Rekonstrukce bytu",
                slug: "rekonstrukce-bytu",
                desc: "Kompletní i částečné rekonstrukce panelových a cihlových bytů. Řemeslníky koordinujeme my, cenu a termín sjednáme ve smlouvě.",
                Icon: Home,
              },
              {
                title: "Rekonstrukce bytového jádra",
                slug: "rekonstrukce-bytoveho-jadra",
                desc: "Výměna umakartového jádra za zděné z tvárnic Ytong. Nové rozvody, hydroizolace, obklady a sanita. Obvykle 3–6 týdnů od zahájení do předání.",
                Icon: Layers,
              },
              {
                title: "Rekonstrukce koupelny a WC",
                slug: "rekonstrukce-koupelny",
                desc: "Koupelny a WC v bytech i rodinných domech. Hydroizolace, velkoformátové obklady, walk-in kouty a podomítková sanita.",
                Icon: Bath,
              },
              {
                title: "Zednické práce a omítky",
                slug: "zednicke-prace",
                desc: "Zděné příčky, omítky, štuky, sádrové stěrky a vyrovnání podlah. Připravíme podklad pro malování, obklady i podlahy.",
                Icon: Hammer,
              },
            ].map((srv) => (
              <div
                key={srv.slug}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-red-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <srv.Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    <Link href={`/${srv.slug}`}>{srv.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {srv.desc}
                  </p>
                </div>

                <Link
                  href={`/${srv.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 pt-2 border-t border-slate-200"
                >
                  <span>Zjistit více</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Realizace v lokalitě */}
        {location.realizaceImages && location.realizaceImages.length > 0 && (
          <section className="py-16 bg-slate-50 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                    Fotogalerie prací
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-950">
                    Ukázky rekonstrukcí {inCity} a okolí
                  </h2>
                </div>
                <Link
                  href="/realizace"
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <span>Všechny realizace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {location.realizaceImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group rounded-3xl overflow-hidden bg-white border border-slate-200 space-y-3 p-3 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-2 pb-2">
                      <div className="text-sm font-bold text-slate-900">{img.title}</div>
                      <div className="text-xs text-slate-500">{img.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Embedded Before / After Slider */}
        <BeforeAfterSlider />

        {/* Proč HANSBAU v dané lokalitě */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                Spolehlivý partner {inCity}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-slate-950">
                Proč si vybrat HANSBAU {inCity}?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Rekonstrukce bytu je velká investice. Proto rozsah, cenu a termín sjednáme předem písemně a změny s vámi vždy odsouhlasíme dřív, než se na nich začne pracovat.
              </p>

              <div className="pt-2">
                <Link
                  href="/kalkulacka"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Spočítat orientační cenu</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {location.whyHere.map((wh, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm"
                >
                  <h3 className="text-base font-bold text-slate-900">{wh.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{wh.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localized FAQ */}
        {location.faq && location.faq.length > 0 && (
          <FAQSection
            customFaq={location.faq}
            title={`Časté dotazy k rekonstrukci bytu ${inCity}`}
            subtitle="Otázky a odpovědi"
          />
        )}

        {/* Neighboring locations internal links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm font-bold text-slate-700">
                Rekonstrukce děláme i v okolních městech:
              </div>
              <div className="flex flex-wrap gap-2">
                {location.neighboringLocations.map((nei) => (
                  <Link
                    key={nei.slug}
                    href={`/${nei.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-600 border border-slate-200 hover:border-red-600 text-xs font-semibold text-slate-700 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <MapPin className="w-3 h-3 text-red-600" />
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
