import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabProcessProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
  updateProcessStep: (index: number, field: "title" | "desc", value: string) => void;
}

export function TabProcess({ content, updateField, updateProcessStep }: TabProcessProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Postup spolupráce (5 kroků realizace)</h2>
        <p className="text-xs text-slate-500">
          Jednotlivé fáze od nezávazné poptávky až po čisté předání klíčů a revizí.
        </p>
      </div>

      {/* Main Header */}
      <div className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Horní odznak (Badge):</label>
            <input
              type="text"
              value={content.process.badge}
              onChange={(e) => updateField("process", "badge", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Hlavní H2 nadpis sekce:</label>
            <input
              type="text"
              value={content.process.title}
              onChange={(e) => updateField("process", "title", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Úvodní perex sekce:</label>
          <textarea
            rows={2}
            value={content.process.perex}
            onChange={(e) => updateField("process", "perex", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-normal"
          />
        </div>
      </div>

      {/* 5 Steps */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase text-slate-600">
          5 kroků procesu rekonstrukce
        </h3>

        <div className="space-y-3">
          {content.process.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {step.step}
                </span>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateProcessStep(idx, "title", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                />
              </div>
              <textarea
                rows={2}
                value={step.desc}
                onChange={(e) => updateProcessStep(idx, "desc", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-normal"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
