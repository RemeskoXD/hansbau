import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabHomeProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
}

export function TabHome({ content, updateField }: TabHomeProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Úvodní sekce (Hero banner)</h2>
        <p className="text-xs text-slate-500">Hlavní sdělení, které zákazník uvidí na prvním místě.</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Horní odznak (Badge):</label>
          <input
            type="text"
            value={content.home.heroBadge}
            onChange={(e) => updateField("home", "heroBadge", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Hlavní nadpis (H1):</label>
          <textarea
            rows={2}
            value={content.home.heroTitle}
            onChange={(e) => updateField("home", "heroTitle", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-800 block">Úvodní text (Perex):</label>
          <textarea
            rows={3}
            value={content.home.heroPerex}
            onChange={(e) => updateField("home", "heroPerex", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-normal focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">3 garance v hlavní liště</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">Garance 1:</label>
              <input
                type="text"
                value={content.home.guaranteePrice}
                onChange={(e) => updateField("home", "guaranteePrice", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">Garance 2:</label>
              <input
                type="text"
                value={content.home.guaranteeTime}
                onChange={(e) => updateField("home", "guaranteeTime", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">Garance 3:</label>
              <input
                type="text"
                value={content.home.guaranteeSurvey}
                onChange={(e) => updateField("home", "guaranteeSurvey", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Záhlaví sekce služeb</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">Nadpis sekce služeb:</label>
              <input
                type="text"
                value={content.home.servicesTitle}
                onChange={(e) => updateField("home", "servicesTitle", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">Perex sekce služeb:</label>
              <textarea
                rows={2}
                value={content.home.servicesPerex}
                onChange={(e) => updateField("home", "servicesPerex", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
