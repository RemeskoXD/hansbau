import React from "react";
import { Award, ShieldCheck } from "lucide-react";
import { PageContent } from "@/lib/content-schema";

interface TabWhyUsProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
  updateWhyUsItem: (index: number, field: "title" | "desc", value: string) => void;
}

export function TabWhyUs({ content, updateField, updateWhyUsItem }: TabWhyUsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Proč si vybrat HANSBAU (Naše výhody)</h2>
        <p className="text-xs text-slate-500">
          Sekce přesvědčivých argumentů a garancí, proč svěřit stavbu firmě HANSBAU.
        </p>
      </div>

      {/* Main Header */}
      <div className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Horní odznak (Badge):</label>
            <input
              type="text"
              value={content.whyUs.badge}
              onChange={(e) => updateField("whyUs", "badge", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Hlavní H2 nadpis sekce:</label>
            <input
              type="text"
              value={content.whyUs.title}
              onChange={(e) => updateField("whyUs", "title", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Úvodní perex sekce:</label>
          <textarea
            rows={2}
            value={content.whyUs.perex}
            onChange={(e) => updateField("whyUs", "perex", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-normal"
          />
        </div>
      </div>

      {/* Guarantee Highlight Card */}
      <div className="p-5 bg-red-50/50 border border-red-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
          <Award className="w-4 h-4" />
          <span>Zvýrazněná karta garance položkového rozpočtu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Nadpis karty:</label>
            <input
              type="text"
              value={content.whyUs.guaranteeTitle}
              onChange={(e) => updateField("whyUs", "guaranteeTitle", e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Podtitul:</label>
            <input
              type="text"
              value={content.whyUs.guaranteeSub}
              onChange={(e) => updateField("whyUs", "guaranteeSub", e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-red-600 font-semibold"
            />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-slate-700 block">Podrobný popis záruky ceny:</label>
            <textarea
              rows={2}
              value={content.whyUs.guaranteeDesc}
              onChange={(e) => updateField("whyUs", "guaranteeDesc", e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-normal"
            />
          </div>
        </div>
      </div>

      {/* 6 Grid items */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-600">
          6 bodů výhod spolupráce
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.whyUs.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white space-y-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateWhyUsItem(idx, "title", e.target.value)}
                  className="w-full px-2.5 py-1 rounded border border-slate-300 bg-white font-bold text-slate-900"
                />
              </div>
              <textarea
                rows={2}
                value={item.desc}
                onChange={(e) => updateWhyUsItem(idx, "desc", e.target.value)}
                className="w-full px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-700 text-xs font-normal"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
