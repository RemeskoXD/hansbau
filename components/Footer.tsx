import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Star, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { siteConfig, services, locations } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Column 1: Company Profile & Rating */}
          <div className="space-y-4">
            <div className="relative h-12 w-44">
              <Image
                src="/images/Logo-17.webp"
                alt="HANSBAU - Rekonstrukce bytů a koupelen"
                fill
                sizes="180px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Profesionální stavební firma se specializací na kompletní i částečné rekonstrukce bytů, koupelen a bytových jader v Karlovarském kraji.
            </p>

            {/* Rating badge */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 font-black text-sm">
                5.0
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-800 font-semibold mt-0.5">
                  Google Hodnocení 5.0 ★ (100% spokojenost)
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Services Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Stavební Služby
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {services.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    href={`/${srv.slug}`}
                    className="text-slate-600 hover:text-red-600 font-medium transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-red-500 shrink-0" />
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Kontaktní Údaje
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-semibold">{siteConfig.address.street}</div>
                  <div className="text-slate-600">{siteConfig.address.zip} {siteConfig.address.city}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${siteConfig.phoneCZRaw}`}
                    className="text-slate-900 font-bold hover:text-red-600 transition-colors block"
                  >
                    {siteConfig.phoneCZ}
                  </a>
                  <div className="text-[11px] text-slate-500">Po–So: 7:00 – 19:00 hod</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-slate-900 font-semibold hover:text-red-600 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-medium">Jednatel společnosti</div>
                  <div className="text-slate-500">{siteConfig.contactPerson}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Coverage Area */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Lokality v Kraji
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Rekonstrukce bytů provádíme po celém Karlovarském kraji:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="px-2.5 py-1 bg-white hover:bg-red-600 border border-slate-200 hover:border-red-600 rounded-lg text-[11px] font-medium text-slate-700 hover:text-white transition-colors shadow-sm"
                >
                  {loc.city}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span>Pojištění odpovědnosti & Záruka na dílo</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Všechna práva vyhrazena.
          </div>
          <div className="flex items-center gap-6">
            <span>Jednatel: {siteConfig.contactPerson}</span>
            <span>•</span>
            <Link href="/kontakt" className="hover:text-red-600 transition-colors font-medium">
              Kontakt & Sídlo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
