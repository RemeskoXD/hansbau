"use client";

import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck,
  Building,
  User
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
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="kontakt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contacts & Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-500 block">
                Rychlá komunikace • Karlovarský kraj
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Získejte nezávaznou kalkulaci ZDARMA
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Vyplňte krátký poptávkový formulář nebo nám přímo zavolejte. Přijedeme na místo do vašeho bytu, prostor zaměříme a vypracujeme položkový rozpočet.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <a
                href={`tel:${siteConfig.phoneCZRaw}`}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Telefonní kontakt (Po–So 7:00–19:00)
                  </div>
                  <div className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors">
                    {siteConfig.phoneCZ}
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Napište nám e-mail
                  </div>
                  <div className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors">
                    {siteConfig.email}
                  </div>
                </div>
              </a>

              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">
                    Sídlo společnosti
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}
                  </div>
                  <div className="text-xs text-slate-400">{siteConfig.contactPerson} ({siteConfig.contactRole})</div>
                </div>
              </div>
            </div>

            {/* Coverage note */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
              <span>
                Působíme v lokalitách Cheb, Sokolov, Karlovy Vary, Aš, Františkovy Lázně, Mariánské Lázně, Ostrov, Chodov a Kraslice.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Nezávazná poptávka rekonstrukce
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-8">
                Vyplňte základní údaje a Jan Červeňak se vám ozve zpět do 24 hodin s návrhem termínu prohlídky.
              </p>

              {status === "success" ? (
                <div className="p-8 rounded-2xl bg-green-950/40 border border-green-700/60 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 text-green-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Děkujeme za vaši poptávku!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Poptávku jsme v pořádku přijali. Budeme vás kontaktovat pro domluvení bezplatného zaměření.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white transition-colors"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Typ požadované práce
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Jméno a příjmení *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Např. Jan Novák"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Telefonní číslo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+420 606 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        E-mailová adresa
                      </label>
                      <input
                        type="email"
                        placeholder="vas@email.cz"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Město / Lokalita realizace
                      </label>
                      <input
                        type="text"
                        placeholder="Např. Cheb, Karlovy Vary, Sokolov..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message / Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Popis záměru / vaše představa
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Popište stručně stav (např. rekonstrukce koupelny v paneláku 2+1, termín jaro)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Error state alert */}
                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Consent checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-800 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-400">
                      Souhlasím se zpracováním osobních údajů pro účely vytvoření cenové nabídky.
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2"
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
