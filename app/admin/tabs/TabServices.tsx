import React from "react";
import { Briefcase } from "lucide-react";
import { PageContent } from "@/lib/content-schema";

interface TabServicesProps {
  content: PageContent;
  updateService: (serviceId: string, field: "title" | "shortDesc" | "fullDesc", value: string) => void;
}

const SERVICE_KEYS = [
  { id: "rekonstrukce-bytu", defaultName: "Rekonstrukce bytu (kompletní i částečná)" },
  { id: "rekonstrukce-bytoveho-jadra", defaultName: "Rekonstrukce bytového jádra" },
  { id: "rekonstrukce-koupelny", defaultName: "Rekonstrukce koupelny" },
  { id: "zednicke-prace", defaultName: "Zednické práce a povrchové úpravy" },
  { id: "elektro-voda-revize", defaultName: "Elektroinstalace, voda a revize" },
];

export function TabServices({ content, updateService }: TabServicesProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Služby & Stavební nabídka</h2>
        <p className="text-xs text-slate-500">
          Úprava názvů, krátkých anotací pro hlavní stranu a podrobných popisů pro 5 hlavních služeb.
        </p>
      </div>

      <div className="space-y-6">
        {SERVICE_KEYS.map((srvDef, idx) => {
          const srvData = content.servicesContent[srvDef.id] || {
            id: srvDef.id,
            title: srvDef.defaultName,
            shortDesc: "",
            fullDesc: "",
          };

          return (
            <div
              key={srvDef.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
            >
              <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm">{srvData.title || srvDef.defaultName}</span>
                <span className="text-[10px] text-slate-500 font-mono">/{srvDef.id}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">Titulek služby:</label>
                  <input
                    type="text"
                    value={srvData.title}
                    onChange={(e) => updateService(srvDef.id, "title", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">
                    Krátký popis (zobrazuje se na hlavní straně v kartě služby):
                  </label>
                  <textarea
                    rows={2}
                    value={srvData.shortDesc}
                    onChange={(e) => updateService(srvDef.id, "shortDesc", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-normal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">
                    Podrobný popis (úvod detailní podstránky):
                  </label>
                  <textarea
                    rows={3}
                    value={srvData.fullDesc}
                    onChange={(e) => updateService(srvDef.id, "fullDesc", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-normal"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
