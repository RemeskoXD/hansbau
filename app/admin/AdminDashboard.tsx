"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  LogOut, 
  Laptop, 
  Tablet, 
  Smartphone,
  Eye,
  Star,
  MessageSquare,
  HelpCircle,
  Award,
  ListOrdered,
  Briefcase,
  Search,
  Building2,
  FileSpreadsheet,
  Home,
  BookOpen,
  Calculator,
  Phone
} from "lucide-react";
import { PageContent, DEFAULT_CONTENT, ReviewItem, PortfolioItem } from "@/lib/content-schema";

import { TabHome } from "./tabs/TabHome";
import { TabAbout } from "./tabs/TabAbout";
import { TabReviews } from "./tabs/TabReviews";
import { TabPortfolio } from "./tabs/TabPortfolio";
import { TabFaq } from "./tabs/TabFaq";
import { TabWhyUs } from "./tabs/TabWhyUs";
import { TabProcess } from "./tabs/TabProcess";
import { TabServices } from "./tabs/TabServices";
import { TabCalculator } from "./tabs/TabCalculator";
import { TabContact } from "./tabs/TabContact";
import { TabCompany } from "./tabs/TabCompany";
import { TabSeo } from "./tabs/TabSeo";
import { TabCsv } from "./tabs/TabCsv";
import { AdminLivePreview } from "./AdminLivePreview";

interface AdminDashboardProps {
  initialContent: PageContent;
  initialUpdatedAt: string;
  onLogout: () => void;
}

export type AdminTab =
  | "home"
  | "about"
  | "reviews"
  | "portfolio"
  | "faq"
  | "whyUs"
  | "process"
  | "services"
  | "calculator"
  | "contact"
  | "company"
  | "seo"
  | "csv";

export function AdminDashboard({ initialContent, initialUpdatedAt, onLogout }: AdminDashboardProps) {
  const [content, setContent] = useState<PageContent>(initialContent);
  const [activeTab, setActiveTab] = useState<AdminTab>("home");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string>(initialUpdatedAt);
  const [csvUploadStatus, setCsvUploadStatus] = useState<string | null>(null);

  // Field updater
  const updateField = (section: keyof PageContent, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value,
      },
    }));
    setHasUnsavedChanges(true);
    setSaveStatus(null);
  };

  // Review updaters
  const updateReview = (index: number, field: keyof ReviewItem, value: any) => {
    setContent((prev) => {
      const newItems = [...prev.reviews.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        reviews: { ...prev.reviews, items: newItems },
      };
    });
    setHasUnsavedChanges(true);
  };

  const addReview = () => {
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: "Nový zákazník",
      rating: 5,
      date: "Před týdnem",
      text: "Vynikající zkušenost s firmou HANSBAU, vše proběhlo dle domluvy a v termínu.",
      source: "Google",
      location: "Karlovarský kraj",
    };
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: [newRev, ...prev.reviews.items],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const deleteReview = (index: number) => {
    if (confirm("Opravdu chcete tuto recenzi smazat?")) {
      setContent((prev) => {
        const newItems = prev.reviews.items.filter((_, i) => i !== index);
        return {
          ...prev,
          reviews: { ...prev.reviews, items: newItems },
        };
      });
      setHasUnsavedChanges(true);
    }
  };

  // Portfolio updaters
  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: any) => {
    setContent((prev) => {
      const newItems = [...prev.portfolio.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        portfolio: { ...prev.portfolio, items: newItems },
      };
    });
    setHasUnsavedChanges(true);
  };

  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: `realizace-${Date.now()}`,
      title: "Nová realizace rekonstrukce",
      category: "byty",
      categoryLabel: "Rekonstrukce bytu",
      location: "Cheb",
      image: "/images/nove/rekonstrukce-bytu-karlovy-vary-detail.webp",
      description: "Kompletní proměna bytu na klíč s novou elektroinstalací a obklady.",
    };
    setContent((prev) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        items: [newItem, ...prev.portfolio.items],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const deletePortfolioItem = (index: number) => {
    if (confirm("Opravdu chcete tuto realizaci smazat z fotogalerie?")) {
      setContent((prev) => {
        const newItems = prev.portfolio.items.filter((_, i) => i !== index);
        return {
          ...prev,
          portfolio: { ...prev.portfolio, items: newItems },
        };
      });
      setHasUnsavedChanges(true);
    }
  };

  // FAQ updaters
  const updateFaqItem = (index: number, field: "q" | "a", value: string) => {
    setContent((prev) => {
      const newItems = [...prev.faq.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        faq: { ...prev.faq, items: newItems },
      };
    });
    setHasUnsavedChanges(true);
  };

  const addFaqItem = () => {
    const newItem = {
      q: "Nový dotaz klienta?",
      a: "Odpověď na dotaz ohledně rekonstrukce a stavebních prací.",
    };
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: [...prev.faq.items, newItem],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const deleteFaqItem = (index: number) => {
    if (confirm("Opravdu chcete tento dotaz smazat?")) {
      setContent((prev) => {
        const newItems = prev.faq.items.filter((_, i) => i !== index);
        return {
          ...prev,
          faq: { ...prev.faq, items: newItems },
        };
      });
      setHasUnsavedChanges(true);
    }
  };

  // WhyUs & Process updaters
  const updateWhyUsItem = (index: number, field: "title" | "desc", value: string) => {
    setContent((prev) => {
      const newItems = [...prev.whyUs.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        whyUs: { ...prev.whyUs, items: newItems },
      };
    });
    setHasUnsavedChanges(true);
  };

  const updateProcessStep = (index: number, field: "title" | "desc", value: string) => {
    setContent((prev) => {
      const newSteps = [...prev.process.steps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      return {
        ...prev,
        process: { ...prev.process, steps: newSteps },
      };
    });
    setHasUnsavedChanges(true);
  };

  // Service updater
  const updateService = (serviceId: string, field: "title" | "shortDesc" | "fullDesc", value: string) => {
    setContent((prev) => {
      const current = prev.servicesContent[serviceId] || {
        id: serviceId,
        title: "",
        shortDesc: "",
        fullDesc: "",
      };
      return {
        ...prev,
        servicesContent: {
          ...prev.servicesContent,
          [serviceId]: {
            ...current,
            [field]: value,
          },
        },
      };
    });
    setHasUnsavedChanges(true);
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
        message: "Veškerý obsah byl úspěšně uložen do NoSQL i do CSV záchranné sítě!",
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

  const TABS_CONFIG: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Úvod (Domů)", icon: Home },
    { id: "about", label: "O nás & Příběh", icon: BookOpen },
    { id: "reviews", label: "Recenze & Hodnocení", icon: Star },
    { id: "portfolio", label: "Realizace & Galerie", icon: Award },
    { id: "faq", label: "Časté dotazy (FAQ)", icon: HelpCircle },
    { id: "whyUs", label: "Proč HANSBAU?", icon: Award },
    { id: "process", label: "Postup prací", icon: ListOrdered },
    { id: "services", label: "Texty služeb", icon: Briefcase },
    { id: "calculator", label: "Kalkulačka cen", icon: Calculator },
    { id: "contact", label: "Kontakty", icon: Phone },
    { id: "company", label: "Firma & Fakturace", icon: Building2 },
    { id: "seo", label: "SEO & Meta tagy", icon: Search },
    { id: "csv", label: "🛡️ Záchranná síť (CSV)", icon: FileSpreadsheet },
  ];

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
              <span className="font-bold text-sm sm:text-base">HANSBAU Admin CMS</span>
              <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                NoSQL + CSV Safety Net
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Kompletní správa veškerého obsahu webu s živým náhledem
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
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
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
            type="button"
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
            type="button"
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
            title="Odhlásit se"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 shadow-xs sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-thin">
          {TABS_CONFIG.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
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
        <div className={`${showLivePreview ? "lg:col-span-6 xl:col-span-6" : "lg:col-span-12"} space-y-6`}>
          {activeTab === "home" && <TabHome content={content} updateField={updateField} />}
          {activeTab === "about" && <TabAbout content={content} updateField={updateField} />}
          {activeTab === "reviews" && (
            <TabReviews
              content={content}
              updateField={updateField}
              updateReview={updateReview}
              addReview={addReview}
              deleteReview={deleteReview}
            />
          )}
          {activeTab === "portfolio" && (
            <TabPortfolio
              content={content}
              updatePortfolioItem={updatePortfolioItem}
              addPortfolioItem={addPortfolioItem}
              deletePortfolioItem={deletePortfolioItem}
            />
          )}
          {activeTab === "faq" && (
            <TabFaq
              content={content}
              updateField={updateField}
              updateFaqItem={updateFaqItem}
              addFaqItem={addFaqItem}
              deleteFaqItem={deleteFaqItem}
            />
          )}
          {activeTab === "whyUs" && (
            <TabWhyUs
              content={content}
              updateField={updateField}
              updateWhyUsItem={updateWhyUsItem}
            />
          )}
          {activeTab === "process" && (
            <TabProcess
              content={content}
              updateField={updateField}
              updateProcessStep={updateProcessStep}
            />
          )}
          {activeTab === "services" && (
            <TabServices
              content={content}
              updateService={updateService}
            />
          )}
          {activeTab === "calculator" && <TabCalculator content={content} updateField={updateField} />}
          {activeTab === "contact" && <TabContact content={content} updateField={updateField} />}
          {activeTab === "company" && <TabCompany content={content} updateField={updateField} />}
          {activeTab === "seo" && <TabSeo content={content} updateField={updateField} />}
          {activeTab === "csv" && (
            <TabCsv
              updatedAt={updatedAt}
              csvUploadStatus={csvUploadStatus}
              onDownloadCsv={handleDownloadCsv}
              onCsvFileUpload={handleCsvFileUpload}
              onResetToDefaults={handleResetToDefaults}
            />
          )}
        </div>

        {/* Live Preview Column */}
        {showLivePreview && (
          <div className="lg:col-span-6 xl:col-span-6 space-y-3 sticky top-[125px]">
            <div className="flex items-center justify-between bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs font-bold">Živý náhled v reálném čase</span>
              </div>

              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    previewDevice === "desktop" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Desktop náhled"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("tablet")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    previewDevice === "tablet" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Tablet náhled"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    previewDevice === "mobile" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  title="Mobilní náhled"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <AdminLivePreview
              activeTab={activeTab}
              content={content}
              previewDevice={previewDevice}
            />
          </div>
        )}
      </main>
    </div>
  );
}
