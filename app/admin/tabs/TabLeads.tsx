"use client";

import React, { useState, useEffect } from "react";
import { 
  Inbox, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Calculator, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  MessageSquare, 
  Search,
  Check,
  ChevronDown
} from "lucide-react";
import { LeadRecord, LeadStatus } from "@/lib/leads-store";

const STATUS_LABELS: Record<LeadStatus, { label: string; color: string }> = {
  novy: { label: "Nový", color: "bg-red-50 text-red-700 border-red-200" },
  kontaktovano: { label: "Kontaktováno", color: "bg-amber-50 text-amber-700 border-amber-200" },
  domluveno: { label: "Domluveno / Prohlídka", color: "bg-blue-50 text-blue-700 border-blue-200" },
  dokonceno: { label: "Dokončeno", color: "bg-green-50 text-green-700 border-green-200" },
  archivovano: { label: "Archivováno", color: "bg-slate-100 text-slate-600 border-slate-200" },
};

export function TabLeads() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Opravdu chcete tuto poptávku smazat?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      (lead.city && lead.city.toLowerCase().includes(search.toLowerCase())) ||
      (lead.service && lead.service.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const countNew = leads.filter((l) => l.status === "novy").length;
  const countCalc = leads.filter((l) => l.type === "calculator").length;
  const countContact = leads.filter((l) => l.type === "contact").length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-red-600" />
            <span>Poptávky & Leady z webu</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Všechny poptávky a výpočty kalkulačky jsou bezpečně uloženy na disku serveru a odeslány na team@hansbau.com.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLeads}
          disabled={isLoading}
          className="self-start sm:self-auto px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 transition-all shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-red-600" : ""}`} />
          <span>Obnovit</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200/80">
          <div className="text-2xl font-black text-red-600">{countNew}</div>
          <div className="text-[11px] font-bold text-red-700 uppercase tracking-wider mt-0.5">
            Nové k vyřízení
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-2xl font-black text-slate-900">{leads.length}</div>
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
            Celkem poptávek
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-2xl font-black text-slate-900">{countCalc}</div>
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
            Z kalkulačky
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-2xl font-black text-slate-900">{countContact}</div>
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
            Z formuláře
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hledat podle jména, telefonu, emailu či města..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "Vše" },
            { id: "novy", label: "Nové" },
            { id: "kontaktovano", label: "Kontaktováno" },
            { id: "domluveno", label: "Domluveno" },
            { id: "dokonceno", label: "Dokončeno" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === tab.id
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-red-600" />
          Načítám poptávky...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-14 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">Žádné poptávky k zobrazení</p>
          <p className="text-xs text-slate-400 mt-1">
            Zatím nebyla odeslána žádná poptávka nebo neodpovídá zvolenému filtru.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const statusConfig = STATUS_LABELS[lead.status] || STATUS_LABELS.novy;
            const dateStr = new Date(lead.createdAt).toLocaleString("cs-CZ", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={lead.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 shadow-xs transition-all space-y-3.5"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                      {lead.type === "calculator" ? "Kalkulačka" : "Kontaktní formulář"}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {dateStr}
                    </span>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      aria-label="Změnit stav poptávky"
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:border-red-600"
                    >
                      <option value="novy">Stav: Nový</option>
                      <option value="kontaktovano">Stav: Kontaktováno</option>
                      <option value="domluveno">Stav: Domluveno / Prohlídka</option>
                      <option value="dokonceno">Stav: Dokončeno</option>
                      <option value="archivovano">Stav: Archivovat</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(lead.id)}
                      title="Smazat poptávku"
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Client info & Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Jméno klienta</div>
                    <div className="font-black text-slate-900 mt-0.5">{lead.name}</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Telefon</div>
                    <a
                      href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                      className="font-black text-red-600 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {lead.phone}
                    </a>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">E-mail</div>
                    {lead.email ? (
                      <a
                        href={`mailto:${lead.email}`}
                        className="font-bold text-slate-700 hover:underline flex items-center gap-1 mt-0.5 truncate"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 mt-0.5 block">Neuveden</span>
                    )}
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Město / Lokalita</div>
                    <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{lead.city || "Neuvedeno"}</span>
                    </div>
                  </div>
                </div>

                {/* Calculator specific box */}
                {lead.calculatorDetails && (
                  <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200/70 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <span className="text-red-900/60 block font-semibold text-[10px] uppercase">
                        Odhadovaná cena
                      </span>
                      <span className="font-black text-slate-900 text-sm">
                        {lead.calculatorDetails.priceRange}
                      </span>
                    </div>
                    <div>
                      <span className="text-red-900/60 block font-semibold text-[10px] uppercase">
                        Dispozice & Zástavba
                      </span>
                      <span className="font-bold text-slate-900">
                        {lead.calculatorDetails.layout} ({lead.calculatorDetails.buildingType})
                      </span>
                    </div>
                    <div>
                      <span className="text-red-900/60 block font-semibold text-[10px] uppercase">
                        Standard & Termín
                      </span>
                      <span className="font-bold text-slate-900">
                        {lead.calculatorDetails.standard} • {lead.calculatorDetails.timeEstimate}
                      </span>
                    </div>
                  </div>
                )}

                {/* Message or service description */}
                {(lead.message || lead.service) && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    {lead.service && (
                      <div className="font-bold text-slate-800 mb-1">
                        Poptávaná služba: <span className="text-red-600">{lead.service}</span>
                        {lead.areaSize ? ` (${lead.areaSize})` : ""}
                      </div>
                    )}
                    {lead.message && (
                      <p className="text-slate-600 italic leading-relaxed whitespace-pre-wrap">
                        „{lead.message}“
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
