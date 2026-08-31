"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  Bath, 
  Layers, 
  Hammer, 
  ShieldCheck, 
  ArrowRight,
  Star,
  MapPin,
  Calculator,
  Building,
  Sparkles,
  Users,
  Image as ImageIcon
} from "lucide-react";
import { siteConfig, services, locations } from "@/lib/data";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const iconMap: Record<string, typeof Home> = {
    Home,
    Layers,
    Bath,
    Hammer,
    ShieldCheck
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-header border-b border-slate-200/90 transition-all duration-300 shadow-[0_1px_6px_0_rgba(0,0,0,0.03)]">
      {/* Top micro-bar */}
      <div className="bg-slate-50 text-slate-600 text-xs py-1.5 px-4 border-b border-slate-200/70 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Google Hodnocení 5.0 ★ (Karlovarský kraj)</span>
            </span>
            <span className="text-slate-500 hidden lg:inline">
              Cheb, Karlovy Vary, Sokolov, Aš • Osobní prohlídka a rozpočet ZDARMA
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium">Po–So: 7:00 – 19:00</span>
            <div className="h-3 w-[1px] bg-slate-300"></div>
            <a
              href={`tel:${siteConfig.phoneCZRaw}`}
              className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{siteConfig.phoneCZ}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src="/images/Logo-17.webp"
              alt="HANSBAU - Rekonstrukce bytů a koupelen"
              fill
              priority
              sizes="200px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          <Link
            href="/"
            className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors ${
              isActive("/") 
                ? "text-red-600 bg-red-50/80 font-bold" 
                : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
            }`}
          >
            Domů
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/sluzby"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1 ${
                isActive("/sluzby") || services.some(s => pathname === `/${s.slug}`)
                  ? "text-red-600 bg-red-50/80 font-bold" 
                  : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
              }`}
            >
              <span>Služby</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
            </Link>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-[460px] bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-bold text-slate-400 px-2.5 py-1 uppercase tracking-wider">
                  Naše specializace na klíč
                </div>
                {services.map((srv) => {
                  const Icon = iconMap[srv.iconName] || Home;
                  const isCurrent = pathname === `/${srv.slug}`;
                  return (
                    <Link
                      key={srv.slug}
                      href={`/${srv.slug}`}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                        isCurrent ? "bg-red-50/90 text-red-700" : "hover:bg-slate-50"
                      }`}
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                        isCurrent ? "bg-red-600 text-white" : "bg-red-50 border border-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors flex items-center justify-between">
                          <span>{srv.title}</span>
                          {srv.priority === "hlavní" && (
                            <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded font-semibold">Hlavní</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          {srv.shortDesc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-xs">
                  <span className="text-slate-500 font-medium">Všechny profese pod jednou střechou</span>
                  <Link 
                    href="/sluzby" 
                    className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    <span>Všechny služby</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setLocationsDropdownOpen(true)}
            onMouseLeave={() => setLocationsDropdownOpen(false)}
          >
            <Link
              href="/lokality"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1 ${
                isActive("/lokality") || locations.some(l => pathname === `/${l.slug}`)
                  ? "text-red-600 bg-red-50/80 font-bold" 
                  : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
              }`}
            >
              <span>Lokality</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${locationsDropdownOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
            </Link>

            {/* Dropdown Menu */}
            {locationsDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-bold text-slate-400 px-2.5 py-1 uppercase tracking-wider">
                  Města v Karlovarském kraji
                </div>
                {locations.map((loc) => {
                  const isCurrent = pathname === `/${loc.slug}`;
                  return (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors group ${
                        isCurrent ? "bg-red-50/90 text-red-700 font-bold" : "text-slate-700 hover:text-red-600 hover:bg-red-50/60"
                      }`}
                      onClick={() => setLocationsDropdownOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-red-600 group-hover:scale-110 transition-transform" />
                        <span>{loc.city}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-red-600 font-normal">Rekonstrukce bytu</span>
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-xs mt-1">
                  <span className="text-slate-500 font-medium">Centrála v Chebu</span>
                  <Link 
                    href="/lokality" 
                    className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
                    onClick={() => setLocationsDropdownOpen(false)}
                  >
                    <span>Přehled lokalit</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/kalkulacka"
            className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors ${
              isActive("/kalkulacka") 
                ? "text-red-600 bg-red-50/80 font-bold" 
                : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
            }`}
          >
            Kalkulačka
          </Link>

          <Link
            href="/o-nas"
            className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors ${
              isActive("/o-nas") 
                ? "text-red-600 bg-red-50/80 font-bold" 
                : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
            }`}
          >
            O nás
          </Link>

          <Link
            href="/realizace"
            className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors ${
              isActive("/realizace") 
                ? "text-red-600 bg-red-50/80 font-bold" 
                : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
            }`}
          >
            Realizace
          </Link>

          <Link
            href="/kontakt"
            className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors ${
              isActive("/kontakt") 
                ? "text-red-600 bg-red-50/80 font-bold" 
                : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
            }`}
          >
            Kontakt
          </Link>
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Call */}
          <a
            href={`tel:${siteConfig.phoneCZRaw}`}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-slate-800 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                Zavolejte nám
              </div>
              <div className="text-xs font-bold text-slate-900 tracking-wide">
                {siteConfig.phoneCZ}
              </div>
            </div>
          </a>

          {/* Primary CTA button linking to /kontakt */}
          <Link
            href="/kontakt"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Nezávazná nabídka
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Přepnout navigaci"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            <Link
              href="/"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl ${
                isActive("/") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Domů
            </Link>

            <Link
              href="/sluzby"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl flex items-center justify-between ${
                isActive("/sluzby") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Všechny služby</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </Link>

            {services.map((srv) => (
              <Link
                key={srv.slug}
                href={`/${srv.slug}`}
                className={`flex items-center gap-3 px-4 py-2 text-sm rounded-xl font-medium ${
                  pathname === `/${srv.slug}` ? "bg-red-50/80 text-red-600 font-bold" : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                <span>{srv.title}</span>
              </Link>
            ))}

            <Link
              href="/lokality"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl flex items-center justify-between mt-2 ${
                isActive("/lokality") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Lokality v kraji</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </Link>

            <div className="grid grid-cols-2 gap-1 px-2">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 font-medium ${
                    pathname === `/${loc.slug}` ? "bg-red-50 text-red-600 font-bold" : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                  <span>{loc.city}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/kalkulacka"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl mt-2 ${
                isActive("/kalkulacka") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kalkulačka rozpočtu
            </Link>

            <Link
              href="/o-nas"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl ${
                isActive("/o-nas") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              O nás
            </Link>

            <Link
              href="/realizace"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl ${
                isActive("/realizace") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Realizace
            </Link>

            <Link
              href="/kontakt"
              className={`px-4 py-2.5 text-base font-semibold rounded-xl ${
                isActive("/kontakt") ? "bg-red-50 text-red-600 font-bold" : "text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Call CTA */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <a
              href={`tel:${siteConfig.phoneCZRaw}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Zavolat: {siteConfig.phoneCZ}</span>
            </a>

            <Link
              href="/kontakt"
              className="w-full flex items-center justify-center py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md shadow-red-600/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nezávazná nabídka zdarma
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
