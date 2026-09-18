import React from "react";
import { PageContent } from "@/lib/content-schema";

interface TabCompanyProps {
  content: PageContent;
  updateField: (section: keyof PageContent, key: string, value: string) => void;
}

export function TabCompany({ content, updateField }: TabCompanyProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Firma & Fakturační údaje</h2>
        <p className="text-xs text-slate-500">Úřední a fakturační údaje zobrazené v patičce a v kontaktech.</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Oficiální název firmy (s.r.o.):</label>
            <input
              type="text"
              value={content.company.legalName}
              onChange={(e) => updateField("company", "legalName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Značka (Brand name):</label>
            <input
              type="text"
              value={content.company.brandName}
              onChange={(e) => updateField("company", "brandName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Ulice a číslo popisné:</label>
            <input
              type="text"
              value={content.company.street}
              onChange={(e) => updateField("company", "street", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Město:</label>
            <input
              type="text"
              value={content.company.city}
              onChange={(e) => updateField("company", "city", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">PSČ:</label>
            <input
              type="text"
              value={content.company.zip}
              onChange={(e) => updateField("company", "zip", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">IČO:</label>
            <input
              type="text"
              value={content.company.ico}
              onChange={(e) => updateField("company", "ico", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono font-medium focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">DIČ:</label>
            <input
              type="text"
              value={content.company.dic}
              onChange={(e) => updateField("company", "dic", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono font-medium focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Telefon:</label>
            <input
              type="text"
              value={content.company.phone}
              onChange={(e) => updateField("company", "phone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">E-mail:</label>
            <input
              type="email"
              value={content.company.email}
              onChange={(e) => updateField("company", "email", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">Jednatel společnosti:</label>
            <input
              type="text"
              value={content.company.representative}
              onChange={(e) => updateField("company", "representative", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
