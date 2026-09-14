# Walkthrough: Administrační panel (NoSQL + CSV záchranná síť) & Vizuální editor

Tato aktualizace přináší kompletní, plně self-hosted administrační systém pro správu textů a údajů na webu **HANSBAU** s dual-engine architekturou (NoSQL JSON dokumentové úložiště + automatická CSV záchranná síť) a interaktivním vizuálním editorem s živým náhledem (Desktop / Tablet / Mobil).

---

## 1. Klíčové funkce nového Admin systému

### A. Dual-Engine Úložiště (NoSQL + CSV Safety Net)
- **NoSQL JSON Dokumentové úložiště** (`data/content_store.json`): Ukládá veškeré sekce webu do čisté dokumentové struktury s verzováním a časovými razítky.
- **Automatická CSV záchranná síť** (`data/content_backup.csv`): Při každém uložení se automaticky synchronizuje CSV záloha podle specifikace RFC 4180 s hlavičkou `page,key,value` a UTF-8 BOM (`\uFEFF`) pro bezchybné otevření v Microsoft Excelu s českou diakritikou.
- **1-klik stažení a nahrání CSV**: Přímo v záložce **„🛡️ Záchranná síť (CSV)“** lze jedním tlačítkem stáhnout kompletní zálohu do počítače, nebo nahrát upravený CSV soubor a obnovit/přepsat web jedním klikem.

### B. Vizuální editor s živým náhledem (Split-Screen Workspace)
- **Levý panel**: Přehledné formulářové editory rozdělené do záložek:
  1. *Úvodní stránka (Domů)* — Hero odznak, hlavní H1 nadpis, úvodní perex, 3 garance v liště, nadpisy služeb.
  2. *O nás & Příběh majitele* — Badge, H2 nadpis, 3 odstavce příběhu rodinné firmy, citace jednatele a jeho pozice.
  3. *Kalkulačka cen* — Badge, nadpis kalkulačky, doprovodný text a důležité upozornění (disclaimer).
  4. *Kontakty & Otevírací doba* — Nadpisy, otevírací doba (`Po–So 7:00 – 19:00`), rychlost odpovědi.
  5. *Firma & Fakturační údaje* — Název společnosti (`Jan Červeňak s.r.o.`), značka (`HANSBAU`), sídlo (`Potočiště 21 - Odrava, 350 02 Cheb`), IČO (`04860837`), DIČ (`CZ04860837`), telefon, e-mail a jednatel (`Jan Červeňak`).
  6. *🛡️ Záchranná síť (CSV)* — Správa duální zálohy, stažení a nahrání CSV.
- **Pravý panel**: Živý vizuální náhled (Live Preview), který v reálném čase reaguje na každý stisk klávesy v editoru.
- **Responzivní přepínač**: Náhled lze jedním kliknutím přepínat mezi **Desktop**, **Tablet** a **Mobil**.
- **Klávesová zkratka**: Podpora `Ctrl + S` / `Cmd + S` pro okamžité uložení.

### C. Vojenské zabezpečení (DevSecOps)
- **Trasa**: `/admin` (automaticky chráněna meta tagem `robots: noindex, nofollow`).
- **Ochrana proti hrubé síle (Rate Limiting)**: Maximálně 5 neúspěšných pokusů za 10 minut na IP adresu.
- **Ochrana proti Timing Attacks**: Porovnávání hesel přes `crypto.timingSafeEqual`.
- **Relace**: Šifrovaný HMAC-SHA256 session token v `HttpOnly`, `SameSite=Lax`, `Secure` cookie s platností 7 dní.
- **Zero Cloud Lock-in**: Žádný Firebase, žádný Supabase, žádný Vercel — běží 100% nativně na Vašem VPS / Coolify serveru.

---

## 2. Přístupové údaje a konfigurace na VPS

| Položka | Hodnota / Popis |
|---|---|
| **URL administrace** | `https://hansbau.cz/admin` |
| **Výchozí heslo** | `hansbau2026` |
| **Změna hesla na VPS** | V Coolify v sekci *Environment Variables* stačí nastavit proměnnou `ADMIN_PASSWORD=VaseNoveSilneHeslo` |
| **Klíč relace** | `ADMIN_SESSION_SECRET` (volitelně, jinak se generuje bezpečný salt) |

---

## 3. Výsledky testování a sestavení

- **Produkční build (`npm run build`)**: Úspěšně zkompilováno 32 stránek s 0 chybami (TypeScript strict mode).
- **Git status**: Změny úspěšně commitnuty (`8fd85cd`) a odeslány do větve `main` na GitHubu (`RemeskoXD/hansbau`).
