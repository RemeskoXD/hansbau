import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { saveLead, updateLead } from "@/lib/leads-store";

// In-memory rate limiting store (sliding window per IP)
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per minute per IP

const calculatorLeadSchema = z.object({
  name: z.string().trim().min(2, "Jméno musí mít alespoň 2 znaky").max(100, "Jméno je příliš dlouhé"),
  phone: z.string().trim().min(6, "Telefonní číslo je povinné").max(30, "Telefonní číslo je příliš dlouhé"),
  email: z.string().trim().email("Neplatný formát e-mailu").max(120).optional().or(z.literal("")),
  city: z.string().trim().max(100).default("Karlovarský kraj"),
  buildingType: z.string().trim().max(100),
  layout: z.string().trim().max(150),
  standard: z.string().trim().max(50),
  priceRange: z.string().trim().max(100),
  timeEstimate: z.string().trim().max(100),
  honeypot: z.string().max(0, "Bot detection").optional()
});

export async function POST(req: Request) {
  try {
    // 1. Rate limiting check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const now = Date.now();

    const rateData = rateLimitMap.get(clientIp);
    if (rateData) {
      if (now - rateData.firstRequest < RATE_LIMIT_WINDOW) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: "Příliš mnoho požadavků. Zkuste to prosím za chvíli nebo nám zavolejte přímo na +420 606 073 700." },
            { status: 429 }
          );
        }
        rateData.count++;
      } else {
        rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
    }

    // 2. Input validation and parsing
    const body = await req.json();
    const validatedData = calculatorLeadSchema.parse(body);

    const currentTime = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

    // 3. Plaintext fallback body
    const emailBodyText = `
NOVÝ LEAD Z ONLINE KALKULAČKY HANSBAU.cz:
----------------------------------------
Jméno klienta: ${validatedData.name}
Telefon: ${validatedData.phone}
E-mail: ${validatedData.email || "Neuvedeno"}
Lokalita / Město: ${validatedData.city}

VÝPOČET KALKULACE PRO KLIENTA:
Předpokládaná cena: ${validatedData.priceRange} (bez DPH)
Odhadovaná doba: ${validatedData.timeEstimate}
Rozsah / Dispozice: ${validatedData.layout}
Typ zástavby: ${validatedData.buildingType}
Standard vybavení: ${validatedData.standard}
----------------------------------------
Čas odeslání: ${currentTime}
Odesláno z IP: ${clientIp}
    `.trim();

    // 4. HTML formatted email body
    const emailBodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
    .header { background: #dc2626; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
    .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .price-badge { background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 24px; }
    .price-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #991b1b; margin-bottom: 4px; }
    .price-value { font-size: 26px; font-weight: 900; color: #0f172a; }
    .price-time { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 600; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .label { color: #64748b; font-weight: 600; width: 35%; }
    .value { color: #0f172a; font-weight: 700; }
    .value a { color: #dc2626; text-decoration: none; }
    .footer { background: #f1f5f9; padding: 16px 24px; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nový lead z online kalkulačky HANSBAU</h1>
      <p>Klient si nechal spočítat orientační cenu na hansbau.cz/kalkulacka</p>
    </div>
    <div class="content">
      <div class="price-badge">
        <div class="price-label">Vypočtená orientační cena (bez DPH)</div>
        <div class="price-value">${validatedData.priceRange}</div>
        <div class="price-time">Odhadovaný harmonogram: <strong>${validatedData.timeEstimate}</strong></div>
      </div>

      <table class="table">
        <tr>
          <td class="label">Jméno klienta:</td>
          <td class="value">${validatedData.name}</td>
        </tr>
        <tr>
          <td class="label">Telefon:</td>
          <td class="value"><a href="tel:${validatedData.phone.replace(/\s+/g, "")}">${validatedData.phone}</a></td>
        </tr>
        ${validatedData.email ? `
        <tr>
          <td class="label">E-mail:</td>
          <td class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td>
        </tr>` : ""}
        <tr>
          <td class="label">Město / Lokalita:</td>
          <td class="value">${validatedData.city}</td>
        </tr>
        <tr>
          <td class="label">Rozsah / Dispozice:</td>
          <td class="value">${validatedData.layout}</td>
        </tr>
        <tr>
          <td class="label">Typ zástavby:</td>
          <td class="value">${validatedData.buildingType}</td>
        </tr>
        <tr>
          <td class="label">Zvolený standard:</td>
          <td class="value">${validatedData.standard}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      Čas odeslání: ${currentTime} • IP odesílatele: ${clientIp}
    </div>
  </div>
</body>
</html>
    `.trim();

    // 5. Persist lead to local disk storage (safety net so no inquiry is ever lost)
    const savedLead = saveLead({
      type: "calculator",
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email || undefined,
      city: validatedData.city || undefined,
      clientIp,
      emailDelivered: false,
      calculatorDetails: {
        buildingType: validatedData.buildingType,
        layout: validatedData.layout,
        standard: validatedData.standard,
        priceRange: validatedData.priceRange,
        timeEstimate: validatedData.timeEstimate,
      },
    });

    // 6. SMTP Configuration
    const smtpHost = process.env.SMTP_HOST || "mail.mescon.eu";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = smtpPort === 465;
    const smtpUser = process.env.SMTP_USER || "hansbau@mescon.cz";
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO || "team@hansbau.com";
    const smtpFrom = process.env.SMTP_FROM || `"HANSBAU Kalkulačka" <${smtpUser}>`;

    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: smtpFrom,
          to: contactEmailTo,
          replyTo: validatedData.email || undefined,
          subject: `[Kalkulačka Lead] ${validatedData.name} (${validatedData.phone}) - ${validatedData.layout} - Odhad: ${validatedData.priceRange}`,
          text: emailBodyText,
          html: emailBodyHtml,
        });

        updateLead(savedLead.id, { emailDelivered: true });
      } catch (mailErr: unknown) {
        console.error("Failed to send calculator lead email via SMTP:", mailErr);
        updateLead(savedLead.id, {
          emailDelivered: false,
          emailError: mailErr instanceof Error ? mailErr.message : String(mailErr),
        });
      }
    } else {
      console.log("=== NEW CALCULATOR LEAD (SMTP_PASS not set, stored in disk leads store) ===");
      console.log(emailBodyText);
      updateLead(savedLead.id, {
        emailDelivered: false,
        emailError: "SMTP_PASS not configured in environment",
      });
    }

    return NextResponse.json({ success: true, message: "Kalkulace byla úspěšně odeslána." });
  } catch (error: unknown) {
    console.error("Calculator lead API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Chyba validace zadaných údajů." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Při zpracování kalkulace došlo k chybě. Zavolejte nám přímo na +420 606 073 700." },
      { status: 500 }
    );
  }
}
