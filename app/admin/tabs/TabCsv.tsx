import React from "react";
import { Download, Upload, RotateCcw, ShieldCheck, Database, FileSpreadsheet, Info } from "lucide-react";

interface TabCsvProps {
  updatedAt: string;
  csvUploadStatus: string | null;
  onDownloadCsv: () => void;
  onCsvFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetToDefaults: () => void;
}

export function TabCsv({
  updatedAt,
  csvUploadStatus,
  onDownloadCsv,
  onCsvFileUpload,
  onResetToDefaults,
}: TabCsvProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold text-slate-900">Duální záchranná síť (CSV Safety Net)</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Nezávislost na cloudu: veškerá data jsou uložena v NoSQL JSON souboru i zrcadlena do přenosného CSV.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Download Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Download className="w-4 h-4 text-red-600" />
              <span>Stáhnout kompletní zálohu (CSV)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Stáhněte si celý obsah webu (včetně všech recenzí, FAQ a portfolia) do CSV souboru s českým kódováním UTF-8 BOM, který můžete otevřít v MS Excel.
            </p>
          </div>
          <button
            type="button"
            onClick={onDownloadCsv}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Stáhnout content_backup.csv</span>
          </button>
        </div>

        {/* Upload Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Upload className="w-4 h-4 text-green-600" />
              <span>Nahrát zálohu z CSV souboru</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Vyberte dříve stažený nebo upravený soubor CSV. Systém data okamžitě ověří a bezpečně přepíše web.
            </p>
          </div>
          <label className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center">
            <Upload className="w-4 h-4" />
            <span>Vybrat soubor CSV k obnovení</span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={onCsvFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {csvUploadStatus && (
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900 animate-in fade-in">
          {csvUploadStatus}
        </div>
      )}

      {/* Info Status Card */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-blue-900">
          <Info className="w-4 h-4" />
          <span>Informace o stavu úložiště</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div>
            Poslední uložení dat: <strong>{new Date(updatedAt).toLocaleString("cs-CZ")}</strong>
          </div>
          <div>
            Režim úložiště: <strong>Lokální Docker Volume (/app/data)</strong>
          </div>
        </div>
      </div>

      {/* Reset to Defaults */}
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Chcete vrátit veškerý obsah webu do továrního nastavení?
        </div>
        <button
          type="button"
          onClick={onResetToDefaults}
          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetovat na výchozí texty</span>
        </button>
      </div>
    </div>
  );
}
