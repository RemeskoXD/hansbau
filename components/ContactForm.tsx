"use client";

import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  User,
  MessageSquare,
  Building,
  Clock,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/lib/data";

interface ContactFormProps {
  defaultService?: string;
}

export function ContactForm({ defaultService = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: defaultService || "Rekonstrukce bytu (kompletní i částečná)",
    areaSize: "",
    message: "",
    honeypot: "",
    consent: true
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const servicesOptions = [
    "Rekonstrukce bytu (kompletní i částečná)",
    "Rekonstrukce bytového jádra",
    "Rekonstrukce koupelny",
    "Zednické práce a povrchové úpravy",
    "Elektroinstalace, voda a revize",
    "Jiné stavební práce"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Anti-spam bot trigger

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Vyplňte prosím vaše jméno a telefonní číslo.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "",
          service: "Rekonstrukce bytu (kompletní i částečná)",
          areaSize: "",
          message: "",
          honeypot: "",
          consent: true
        });
      } else {
        const json = await res.json();
        setStatus("error");
        setErrorMessage(json.error || "Při odesílání došlo k chybě. Zavolejte nám přímo na +420 606 073 700.");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden" id="kontakt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column: Direct Contacts & Information */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-600 block">
                Rychlá komunikace • Karlovarský kraj
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
                Získejte nezávaznou kalkulaci ZDARMA
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Vyplňte krátký poptávkový formulář nebo nám přímo zavolejte. Přijedeme na místo do vašeho bytu, prostor bezplatně zaměříme a vypracujeme položkový rozpočet.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5">
              {/* Phone Card */}
              <a
                href={`tel:${siteConfig.phoneCZRaw}`}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-500/80 transition-all flex items-center gap-4 group shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    Telefonní kontakt (Po–So 7:00–19:00)
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    {siteConfig.phoneCZ}
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-500/80 transition-all flex items-center gap-4 group shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    Napište nám e-mail
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    {siteConfig.email}
                  </div>
                </div>
              </a>

              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                    Sídlo společnosti
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900">
                    {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}
                  </div>
                  <div className="text-xs text-slate-500">{siteConfig.contactPerson} ({siteConfig.contactRole})</div>
                </div>
              </div>
            </div>

            {/* Coverage note */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
              <span>
                Působíme po celém kraji: Cheb, Sokolov, Karlovy Vary, Aš, Františkovy Lázně, Mariánské Lázně, Ostrov, Chodov i Kraslice.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-50/90 border border-slate-200 shadow-md relative">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                Nezávazná poptávka rekonstrukce
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-7">
                Vyplňte základní údaje a Jan Červeňak se vám ozve zpět do 24 hodin s návrhem termínu prohlídky.
              </p>

              {status === "success" ? (
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 text-green-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Děkujeme za vaši poptávku!
                  </h4>
                  <p className="text-sm text-slate-700 max-w-md mx-auto">
                    Poptávku jsme v pořádku přijali. Budeme vás kontaktovat pro domluvení bezplatného zaměření.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 transition-colors shadow-sm"
                  >
                    Odeslat další dotaz
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for anti-spam */}
                  <input
                    type="text"
                    name="website_field_ignore"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Service selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Typ požadované práce
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-sm transition-colors"
                    >
                      {servicesOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Jméno a příjmení *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="Jan Novák"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Telefonní číslo *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          placeholder="+420 606 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        E-mailová adresa
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="vas@email.cz"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Město / Lokalita realizace
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Cheb, Sokolov, Vary..."
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message / Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Popis záměru / vaše představa
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        placeholder="Popište stručně stav (např. rekonstrukce koupelny v paneláku 2+1, termín jaro)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-sm transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Error state alert */}
                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Consent checkbox */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-600">
                      Souhlasím se zpracováním osobních údajů pro účely vytvoření cenové nabídky.
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {status === "loading" ? "Odesílám..." : "Odeslat nezávaznou poptávku"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
