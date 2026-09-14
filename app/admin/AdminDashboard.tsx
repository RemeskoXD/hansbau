"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  Database, 
  FileSpreadsheet, 
  Laptop, 
  Tablet, 
  Smartphone,
  Eye,
  RotateCcw,
  Sparkles,
  Info
} from "lucide-react";
import { PageContent, DEFAULT_CONTENT } from "@/lib/content-schema";

interface AdminDashboardProps {
  initialContent: PageContent;
  initialUpdatedAt: string;
  onLogout: () => void;
}

export function AdminDashboard({ initialContent, initialUpdatedAt, onLogout }: AdminDashboardProps) {
  const [content, setContent] = useState<PageContent>(initialContent);
  const [activeTab, setActiveTab] = useState<"home" | "about" | "calculator" | "contact" | "company" | "csv">("home");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string>(initialUpdatedAt);
  const [csvUploadStatus, setCsvUploadStatus] = useState<string | null>(null);

  // Mark unsaved changes when content changes
  const updateField = (section: keyof PageContent, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasUnsavedChanges(true);
    setSaveStatus(null);
  };

  // Keyboard shortcut Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Uložení selhalo.");
      }

      setHasUnsavedChanges(false);
      setUpdatedAt(data.updatedAt);
      setSaveStatus({
        type: "success",
        message: "Obsah byl úspěšně uložen do NoSQL i do CSV záchranné sítě!",
      });

      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err.message || "Chyba při ukládání.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadCsv = () => {
    window.location.href = "/api/admin/csv-backup";
  };

  const handleCsvFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvUploadStatus("Nahrávám a ověřuji CSV...");
    try {
      const text = await file.text();
      const res = await fetch("/api/admin/csv-backup", {
        method: "POST",
        headers: { "Content-Type": "text/csv; charset=utf-8" },
        body: text,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Obnova z CSV selhala.");
      }

      setContent(data.content);
      setUpdatedAt(data.updatedAt);
      setHasUnsavedChanges(false);
      setCsvUploadStatus("✅ Záloha z CSV byla úspěšně obnovena a uložena!");
      setTimeout(() => setCsvUploadStatus(null), 5000);
    } catch (err: any) {
      setCsvUploadStatus(`❌ Chyba: ${err.message}`);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm("Opravdu chcete resetovat všechny texty do výchozího stavu? Neuložené změny budou ztraceny.")) {
      setContent(DEFAULT_CONTENT);
      setHasUnsavedChanges(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Top Header Bar */}
      <header className="bg-slate-950 text-white px-4 sm:px-6 py-3 border-b border-slate-800 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-sm">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">HANSBAU Admin</span>
              <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                NoSQL + CSV Safety Net
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Vizuální editor obsahu a záchranná síť pro správu webu
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {hasUnsavedChanges && (
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-lg hidden sm:flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Neuložené změny
            </span>
          )}

          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              showLivePreview
                ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                : "bg-transparent text-slate-400 border-slate-800 hover:text-white"
            }`}
            title="Přepnout živý náhled stránky"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{showLivePreview ? "Skrýt náhled" : "Zobrazit náhled"}</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Otevřít web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-slate-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Ukládám...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Uložit změny</span>
              </>
            )}
          </button>

          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-900 transition-colors"
            title="Odhlásit se"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {[
            { id: "home", label: "Úvodní stránka (Domů)" },
            { id: "about", label: "O nás & Příběh majitele" },
            { id: "calculator", label: "Kalkulačka cen" },
            { id: "contact", label: "Kontakty & Otevírací doba" },
            { id: "company", label: "Firma & Fakturační údaje" },
            { id: "csv", label: "🛡️ Záchranná síť (CSV)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Status Notification */}
      {saveStatus && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div
            className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-xs sm:text-sm font-bold ${
              saveStatus.type === "success"
                ? "bg-green-600 text-white border-green-500 shadow-green-600/30"
                : "bg-red-600 text-white border-red-500 shadow-red-600/30"
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{saveStatus.message}</span>
          </div>
        </div>
      )}

      {/* Main Dual-Pane Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Form Column */}
        <div className={`${showLivePreview ? "lg:col-span-6 xl:col-span-5" : "lg:col-span-12"} space-y-6`}>
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === "home" && (
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
                  <label className="font-bold text-slate-800 block">Úvodní perex (Podnadpis):</label>
                  <textarea
                    rows={3}
                    value={content.home.heroPerex}
                    onChange={(e) => updateField("home", "heroPerex", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="font-bold text-slate-900">3 Hlavní garance v liště:</div>
                  <div className="grid grid-cols-1 gap-2.5">
                    <input
                      type="text"
                      value={content.home.guaranteePrice}
                      onChange={(e) => updateField("home", "guaranteePrice", e.target.value)}
                      placeholder="Garance 1"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={content.home.guaranteeTime}
                      onChange={(e) => updateField("home", "guaranteeTime", e.target.value)}
                      placeholder="Garance 2"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={content.home.guaranteeSurvey}
                      onChange={(e) => updateField("home", "guaranteeSurvey", e.target.value)}
                      placeholder="Garance 3"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="font-bold text-slate-900">Sekce Služby na hlavní stránce:</div>
                  <input
                    type="text"
                    value={content.home.servicesTitle}
                    onChange={(e) => updateField("home", "servicesTitle", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.home.servicesPerex}
                    onChange={(e) => updateField("home", "servicesPerex", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT PAGE */}
          {activeTab === "about" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Stránka O nás & Příběh majitele</h2>
                <p className="text-xs text-slate-500">Texty vyjadřující filozofii firmy a osobní dohled Jana Červeňaka.</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Nadpis sekce hodnot:</label>
                  <input
                    type="text"
                    value={content.about.title}
                    onChange={(e) => updateField("about", "title", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Osobní citát majitele v rámečku:</label>
                  <textarea
                    rows={4}
                    value={content.about.founderQuote}
                    onChange={(e) => updateField("about", "founderQuote", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Příběh firmy - Odstavec 1 (Úvod a tradice):</label>
                  <textarea
                    rows={3}
                    value={content.about.storyP1}
                    onChange={(e) => updateField("about", "storyP1", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Příběh firmy - Odstavec 2 (Služby a rozsah):</label>
                  <textarea
                    rows={3}
                    value={content.about.storyP2}
                    onChange={(e) => updateField("about", "storyP2", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Příběh firmy - Odstavec 3 (Koordinace a garance):</label>
                  <textarea
                    rows={3}
                    value={content.about.storyP3}
                    onChange={(e) => updateField("about", "storyP3", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CALCULATOR */}
          {activeTab === "calculator" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Kalkulačka cen</h2>
                <p className="text-xs text-slate-500">Úprava textů a oficiálního upozornění v online kalkulačce.</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Nadpis kalkulačky:</label>
                  <input
                    type="text"
                    value={content.calculator.title}
                    onChange={(e) => updateField("calculator", "title", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Úvodní instrukce k výpočtu:</label>
                  <textarea
                    rows={2}
                    value={content.calculator.perex}
                    onChange={(e) => updateField("calculator", "perex", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Důležité upozornění (Disclaimer):</label>
                  <textarea
                    rows={5}
                    value={content.calculator.disclaimer}
                    onChange={(e) => updateField("calculator", "disclaimer", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & OPENING HOURS */}
          {activeTab === "contact" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Kontakty & Otevírací doba</h2>
                <p className="text-xs text-slate-500">Zákaznická podpora a provozní doba.</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Otevírací doba (Zobrazuje se v hlavičce a patičce):</label>
                  <input
                    type="text"
                    value={content.contact.openingHours}
                    onChange={(e) => updateField("contact", "openingHours", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Perex na stránce Kontakt:</label>
                  <textarea
                    rows={2}
                    value={content.contact.perex}
                    onChange={(e) => updateField("contact", "perex", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Rychlost odezvy na poptávky:</label>
                  <input
                    type="text"
                    value={content.contact.responseSpeed}
                    onChange={(e) => updateField("contact", "responseSpeed", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMPANY DETAILS */}
          {activeTab === "company" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Fakturační a oficiální údaje společnosti</h2>
                <p className="text-xs text-slate-500">Tyto údaje se automaticky promítají do patičky, kontaktů a JSON-LD.</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">Právnická osoba:</label>
                    <input
                      type="text"
                      value={content.company.legalName}
                      onChange={(e) => updateField("company", "legalName", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">Obchodní značka:</label>
                    <input
                      type="text"
                      value={content.company.brandName}
                      onChange={(e) => updateField("company", "brandName", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">IČO:</label>
                    <input
                      type="text"
                      value={content.company.ico}
                      onChange={(e) => updateField("company", "ico", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">DIČ:</label>
                    <input
                      type="text"
                      value={content.company.dic}
                      onChange={(e) => updateField("company", "dic", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-800 block">Ulice a číslo:</label>
                    <input
                      type="text"
                      value={content.company.street}
                      onChange={(e) => updateField("company", "street", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">PSČ:</label>
                    <input
                      type="text"
                      value={content.company.zip}
                      onChange={(e) => updateField("company", "zip", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">Město:</label>
                    <input
                      type="text"
                      value={content.company.city}
                      onChange={(e) => updateField("company", "city", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800 block">Jednatel:</label>
                    <input
                      type="text"
                      value={content.company.representative}
                      onChange={(e) => updateField("company", "representative", e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CSV SAFETY NET (ZÁCHRANNÁ SÍŤ) */}
          {activeTab === "csv" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dual-Engine Architektura</span>
                </div>
                <h2 className="text-xl font-black text-slate-950">Záchranná síť v CSV</h2>
                <p className="text-xs text-slate-600">
                  Každá změna provedená v administraci se automaticky ukládá do NoSQL databáze i do CSV souboru na serveru.
                </p>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>NoSQL i CSV jsou 100% synchronizovány</span>
                </div>
                <div className="text-emerald-700">
                  Poslední aktualizace proběhla: {new Date(updatedAt).toLocaleString("cs-CZ")}
                </div>
              </div>

              {csvUploadStatus && (
                <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-semibold">
                  {csvUploadStatus}
                </div>
              )}

              {/* Download / Upload Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Download CSV */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Stáhnout CSV zálohu</div>
                    <p className="text-xs text-slate-500">
                      Stáhněte si kompletní aktuální zálohu všech textů webu v otevřeném CSV formátu (pro Excel).
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadCsv}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Stáhnout CSV</span>
                  </button>
                </div>

                {/* Upload & Restore CSV */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Obnovit ze souboru CSV</div>
                    <p className="text-xs text-slate-500">
                      Nahrajte soubor CSV ze zálohy a web okamžitě převezme všechny texty.
                    </p>
                  </div>
                  <label className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer text-center">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Nahrát a obnovit CSV</span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Emergency Reset to Default Content */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Potřebujete začít znovu s čistým štítem?
                </div>
                <button
                  onClick={handleResetToDefaults}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Obnovit výchozí texty</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Live Preview */}
        {showLivePreview && (
          <div className="lg:col-span-6 xl:col-span-7 sticky top-20 space-y-3">
            <div className="bg-slate-900 text-white p-3 rounded-2xl flex items-center justify-between text-xs shadow-md">
              <div className="flex items-center gap-2 font-semibold text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Interaktivní náhled změn</span>
              </div>

              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    previewDevice === "desktop" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Desktop náhled"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    previewDevice === "tablet" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Tablet náhled"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    previewDevice === "mobile" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Mobilní náhled"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Simulated Mockup Box */}
            <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden p-6 space-y-6">
              {activeTab === "home" && (
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                    {content.home.heroBadge}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                    {content.home.heroTitle}
                  </h1>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {content.home.heroPerex}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <div className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 text-center">
                      {content.home.guaranteePrice}
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 text-center">
                      {content.home.guaranteeTime}
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-800 text-center">
                      {content.home.guaranteeSurvey}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase text-red-600">
                    {content.about.badge}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950">
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
                      — Jan Červeňak, {content.about.founderRole}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "calculator" && (
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase text-red-600">
                    {content.calculator.badge}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950">
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

              {(activeTab === "contact" || activeTab === "company") && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-950">
                    {content.company.legalName} ({content.company.brandName})
                  </h2>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block">Sídlo:</span>
                      <strong className="text-slate-800">{content.company.street}, {content.company.zip} {content.company.city}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block">IČO & DIČ:</span>
                      <strong className="text-slate-800">{content.company.ico} / {content.company.dic}</strong>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs">
                    <span className="text-slate-500 block">Otevírací doba:</span>
                    <strong className="text-slate-800">{content.contact.openingHours}</strong>
                  </div>
                </div>
              )}

              {activeTab === "csv" && (
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="font-bold text-slate-900 text-sm">Architektura ukládání:</div>
                  <p>
                    Kombinace <strong>NoSQL Document Store</strong> (bleskový přístup v milisekundách) a <strong>automatického CSV exportu</strong> (garance obnovy a možnost úprav v tabulkovém procesoru) poskytuje maximální spolehlivost bez nutnosti spoléhat na externí cloudové služby.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
