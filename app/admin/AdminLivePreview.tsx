import React, { useState } from "react";
import Image from "next/image";
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  ChevronDown, 
  MapPin, 
  Briefcase,
  Globe
} from "lucide-react";
import { PageContent } from "@/lib/content-schema";

interface AdminLivePreviewProps {
  activeTab: string;
  content: PageContent;
  previewDevice: "desktop" | "tablet" | "mobile";
}

export function AdminLivePreview({ activeTab, content, previewDevice }: AdminLivePreviewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const containerWidthClass = {
    desktop: "w-full",
    tablet: "max-w-[700px] mx-auto",
    mobile: "max-w-[380px] mx-auto",
  }[previewDevice];

  return (
    <div className={`transition-all duration-300 ${containerWidthClass}`}>
      <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden p-5 sm:p-6 space-y-6">
        
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
              {content.home.heroBadge}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              {content.home.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {content.home.heroPerex}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div className="p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 text-center">
                {content.home.guaranteePrice}
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 text-center">
                {content.home.guaranteeTime}
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 text-center">
                {content.home.guaranteeSurvey}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 space-y-1">
              <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">Sekce služeb</span>
              <h3 className="text-sm font-black text-slate-900">{content.home.servicesTitle}</h3>
              <p className="text-xs text-slate-500">{content.home.servicesPerex}</p>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT */}
        {activeTab === "about" && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="text-xs font-bold uppercase text-red-600">
              {content.about.badge}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-950">
              {content.about.title}
            </h2>
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>{content.about.storyP1}</p>
              <p>{content.about.storyP2}</p>
              <p>{content.about.storyP3}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl italic text-xs text-slate-800">
              „{content.about.founderQuote}“
              <div className="mt-2 font-bold text-red-600 not-italic">
                — {content.company.representative}, {content.about.founderRole}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                  Reference
                </span>
                <h3 className="text-base font-black text-slate-950">Co o nás říkají zákazníci</h3>
              </div>
              <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-1.5">
                <span className="font-black text-amber-600 text-sm">{content.reviews.score}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {content.reviews.items.slice(0, 3).map((rev, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      {rev.source}
                    </span>
                  </div>
                  <p className="text-slate-700 italic text-[11px] leading-relaxed">
                    „{rev.text}“
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                    <strong className="text-slate-900">{rev.author}</strong>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
              {content.reviews.items.length > 3 && (
                <div className="text-center text-[11px] text-slate-400 font-medium">
                  + dalších {content.reviews.items.length - 3} recenzí na webu
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PORTFOLIO */}
        {activeTab === "portfolio" && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                Portfolio realizací
              </span>
              <h3 className="text-base font-black text-slate-950">Náhled fotogalerie</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.portfolio.items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 text-xs">
                  <div className="relative aspect-video bg-slate-200">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback on preview error
                          (e.target as any).src = "/images/Logo-17.webp";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Bez fotky</div>
                    )}
                    <span className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs truncate">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
                    <div className="text-[10px] text-red-600 font-bold flex items-center gap-1 pt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {content.portfolio.items.length > 4 && (
              <div className="text-center text-[11px] text-slate-400 font-medium">
                + dalších {content.portfolio.items.length - 4} položek portfolia
              </div>
            )}
          </div>
        )}

        {/* TAB 5: FAQ */}
        {activeTab === "faq" && (
          <div className="space-y-4 text-xs">
            <div className="text-center space-y-1 pb-2 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                {content.faq.subtitle}
              </span>
              <h3 className="text-base font-black text-slate-950">{content.faq.title}</h3>
            </div>

            <div className="space-y-2">
              {content.faq.items.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-2 font-bold text-slate-900 hover:text-red-600 transition-colors bg-white text-xs"
                    >
                      <span>{item.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-red-600" : "text-slate-400"}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3 pt-0 text-[11px] text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100 font-normal">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: WHY US */}
        {activeTab === "whyUs" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase text-red-600">{content.whyUs.badge}</span>
              <h3 className="text-base font-black text-slate-950">{content.whyUs.title}</h3>
              <p className="text-slate-600 text-[11px]">{content.whyUs.perex}</p>
            </div>

            {/* Guarantee highlight */}
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <Award className="w-4 h-4" />
                <span>{content.whyUs.guaranteeTitle}</span>
              </div>
              <div className="text-[11px] font-semibold text-slate-800">{content.whyUs.guaranteeSub}</div>
              <p className="text-[10px] text-slate-600">{content.whyUs.guaranteeDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {content.whyUs.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PROCESS */}
        {activeTab === "process" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase text-red-600">{content.process.badge}</span>
              <h3 className="text-base font-black text-slate-950">{content.process.title}</h3>
              <p className="text-slate-600 text-[11px]">{content.process.perex}</p>
            </div>

            <div className="space-y-2">
              {content.process.steps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-xs">{step.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-base font-black text-slate-950">Náhled nabídky služeb</h3>
            </div>

            <div className="space-y-3">
              {Object.entries(content.servicesContent).map(([id, srv]) => (
                <div key={id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">{srv.title}</h4>
                  <p className="text-[11px] text-slate-600 font-normal">{srv.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase text-red-600">
              {content.calculator.badge}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-950">
              {content.calculator.title}
            </h2>
            <p className="text-xs text-slate-600">
              {content.calculator.perex}
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-950">
              <strong>Důležité informace:</strong> {content.calculator.disclaimer}
            </div>
          </div>
        )}

        {/* TAB 10 & 11: CONTACT & COMPANY */}
        {(activeTab === "contact" || activeTab === "company") && (
          <div className="space-y-4 text-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-950">
              {content.company.legalName} ({content.company.brandName})
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Sídlo:</span>
                <strong className="text-slate-800">{content.company.street}, {content.company.zip} {content.company.city}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px]">IČO & DIČ:</span>
                <strong className="text-slate-800">{content.company.ico} / {content.company.dic}</strong>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Telefon:</span>
                <strong className="text-slate-800">{content.company.phone}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px]">E-mail:</span>
                <strong className="text-slate-800">{content.company.email}</strong>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl text-xs">
              <span className="text-slate-500 block text-[10px]">Otevírací doba:</span>
              <strong className="text-slate-800">{content.contact.openingHours}</strong>
            </div>
          </div>
        )}

        {/* TAB 12: SEO SIMULATOR */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Simulace výsledku vyhledávání na Google</h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Takto uvidí Váš web uživatelé při vyhledávání.</p>
            </div>

            {/* Google SERP Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-white text-[9px] font-black">
                  H
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-800 text-[11px] font-medium leading-none">HANSBAU</span>
                  <span className="text-slate-400 text-[10px] leading-none mt-0.5">https://hansbau.cz</span>
                </div>
              </div>

              <h4 className="text-base text-blue-700 hover:underline font-normal cursor-pointer leading-snug">
                {content.seo.homeTitle || "Rekonstrukce bytu Cheb | HANSBAU"}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {content.seo.homeDesc || "Popisek stránky není vyplněn..."}
              </p>
            </div>
          </div>
        )}

        {/* TAB 13: CSV */}
        {activeTab === "csv" && (
          <div className="space-y-3 text-xs text-slate-600">
            <div className="font-bold text-slate-900 text-sm">Architektura ukládání:</div>
            <p>
              Kombinace <strong>NoSQL Document Store</strong> a <strong>automatického CSV exportu</strong> poskytuje maximální spolehlivost bez nutnosti spoléhat na externí cloudové služby.
            </p>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-900 text-[11px]">
              Všechna data v administraci (texty, recenze, portfolio i FAQ) jsou plně synchronizována.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
