# HANSBAU s.r.o. — Webová prezentace (Next.js 15)

Moderní, bleskově rychlý a SEO-optimalizovaný web stavební firmy **HANSBAU s.r.o.** se sídlem v Potočišti u Chebu, specializující se na rekonstrukce bytů, koupelen a bytových jader v celém Karlovarském kraji.

---

## 🚀 Technologie & Stack
- **Framework:** Next.js 15 (App Router, Standalone output)
- **UI & Stylování:** React 19, Tailwind CSS, Lucide Icons
- **Typová bezpečnost:** TypeScript (Strict mode)
- **Validace & Bezpečnost:** Zod, in-memory Rate Limiting, Honeypot bot protection
- **Optimalizace:** 100% WebP obrázky, Schema.org JSON-LD (@graph), GEO (Generative Engine Optimization)
- **Deployment:** Coolify (Docker multi-stage build) / Self-Hosted VPS

---

## 🛠️ Lokální vývoj

```bash
# Instalace závislostí
npm install

# Spuštění dev serveru
npm run dev

# Produkční build
npm run build

# Spuštění produkčního serveru
npm run start
```

---

## 🐳 Nasazení na Coolify (Docker)

1. V **Coolify** vytvořte novou aplikaci z **Git Repozitáře** (`https://github.com/RemeskoXD/hansbau.git`).
2. Vyberte Build Pack: **Dockerfile** (nebo **Docker Compose**).
3. Port: `3000`.
4. Nastavte doménu: `hansbau.cz` (včetně automatického SSL certifikátu Let's Encrypt).
5. (Volitelné) Nastavte proměnné prostředí pro odesílání e-mailů z poptávkového formuláře:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL_TO`

---

## 🗺️ Struktura stránek

### Služby:
- `/rekonstrukce-bytu/` — Rekonstrukce bytu (hlavní priorita)
- `/rekonstrukce-bytoveho-jadra/` — Rekonstrukce bytového jádra (2. priorita)
- `/rekonstrukce-koupelny/` — Rekonstrukce koupelny (2. priorita)
- `/zednicke-prace/` — Zednické práce (podpůrná)
- `/elektro-voda-revize/` — Elektroinstalace a revize (podpůrná)

### Lokality (SEO landing pages pro Karlovarský kraj):
- `/rekonstrukce-bytu-cheb/`
- `/rekonstrukce-bytu-karlovy-vary/`
- `/rekonstrukce-bytu-sokolov/`
- `/rekonstrukce-bytu-as/`
- `/rekonstrukce-bytu-frantiskovy-lazne/`
- `/rekonstrukce-bytu-marianske-lazne/`
- `/rekonstrukce-bytu-ostrov/`
- `/rekonstrukce-bytu-chodov/`
- `/rekonstrukce-bytu-kraslice/`
