"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { homeFaq } from "@/lib/data";

interface FAQSectionProps {
  customFaq?: { q: string; a: string }[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  customFaq,
  title,
  subtitle
}: FAQSectionProps) {
  const faqList = customFaq || homeFaq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50/70 text-slate-900 relative overflow-hidden border-b border-slate-200/80" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
            {subtitle || "Často kladené otázky"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
            {title || "Vše, co potřebujete vědět před rekonstrukcí"}
          </h2>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-red-600 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
