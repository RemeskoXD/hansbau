import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { Home, ArrowRight, Phone, Calculator, MapPin } from "lucide-react";
import { siteConfig, services, locations } from "@/lib/data";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white text-slate-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            Chyba 404 • Stránka nenalezena
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-950">
              Hledaná stránka neexistuje
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-normal">
              Omlouváme se, ale stránka, kterou hledáte, byla přesunuta nebo již není dostupná. Můžete se vrátit na úvodní stránku nebo si vybrat z našich služeb.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Zpět na hlavní stránku</span>
            </Link>

            <a
              href={`tel:${siteConfig.phoneCZRaw}`}
              className="w-full sm:w-auto px-6 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Zavolat: {siteConfig.phoneCZ}</span>
            </a>
          </div>

          {/* Quick links to services */}
          <div className="pt-12 border-t border-slate-200 text-left space-y-6">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Doporučené služby rekonstrukcí:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {services.slice(0, 3).map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/${srv.slug}`}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-500 transition-all flex items-center justify-between group shadow-sm"
                >
                  <span className="text-xs font-bold text-slate-800 group-hover:text-red-600">{srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
