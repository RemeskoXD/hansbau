import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// In-memory rate limiting store (sliding window per IP)
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per minute per IP

const contactSchema = z.object({
  name: z.string().trim().min(2, "Jméno musí mít alespoň 2 znaky").max(100, "Jméno je příliš dlouhé"),
  phone: z.string().trim().min(6, "Telefonní číslo je povinné").max(30, "Telefonní číslo je příliš dlouhé"),
  email: z.string().trim().email("Neplatný formát e-mailu").max(120).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.string().trim().max(150).optional().or(z.literal("")),
  areaSize: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Zpráva je příliš dlouhá").optional().or(z.literal("")),
  honeypot: z.string().max(0, "Bot detection"),
  consent: z.boolean().refine((val) => val === true, "Souhlas se zpracováním údajů je povinný")
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
            { error: "Příliš mnoho požadavků. Zkuste to prosím za chvíli nebo nám zavolejte přímo na telefon." },
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
    const validatedData = contactSchema.parse(body);

    const currentTime = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

    // 3. Plaintext fallback body
    const emailBodyText = `
Nová poptávka z webu HANSBAU.cz:
----------------------------------------
Jméno klienta: ${validatedData.name}
Telefon: ${validatedData.phone}
E-mail: ${validatedData.email || "Neuvedeno"}
Lokalita / Město: ${validatedData.city || "Neuvedeno"}
Požadovaná služba: ${validatedData.service || "Neuvedeno"}
${validatedData.areaSize ? `Předpokládaná plocha: ${validatedData.areaSize}` : ""}
Zpráva klienta:
${validatedData.message || "Bez doplňující zprávy"}
----------------------------------------
Čas odeslání: ${currentTime}
Odesláno z IP: ${clientIp}
    `.trim();

    // 4. HTML formatted email body for beautiful display in Outlook/Gmail/Apple Mail
    const emailBodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
    .header { background: #dc2626; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .label { color: #64748b; font-weight: 600; width: 35%; }
    .value { color: #0f172a; font-weight: 700; }
    .value a { color: #dc2626; text-decoration: none; }
    .message-box { background: #f8fafc; border-left: 4px solid #dc2626; padding: 16px; border-radius: 8px; margin-top: 16px; }
    .message-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .message-text { font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap; margin: 0; }
    .footer { background: #f1f5f9; padding: 16px 24px; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nová poptávka z webu HANSBAU</h1>
      <p>Odesláno z formuláře na webu hansbau.cz</p>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="label">Jméno a příjmení:</td>
          <td class="value">${validatedData.name}</td>
        </tr>
        <tr>
          <td class="label">Telefon:</td>
          <td class="value"><a href="tel:${validatedData.phone.replace(/\s+/g, "")}">${validatedData.phone}</a></td>
        </tr>
        <tr>
          <td class="label">E-mail:</td>
          <td class="value">${validatedData.email ? `<a href="mailto:${validatedData.email}">${validatedData.email}</a>` : "Neuvedeno"}</td>
        </tr>
        <tr>
          <td class="label">Lokalita / Město:</td>
          <td class="value">${validatedData.city || "Neuvedeno"}</td>
        </tr>
        <tr>
          <td class="label">Požadovaná služba:</td>
          <td class="value">${validatedData.service || "Nezávazná poptávka"}</td>
        </tr>
        ${validatedData.areaSize ? `
        <tr>
          <td class="label">Předpokládaná plocha:</td>
          <td class="value">${validatedData.areaSize}</td>
        </tr>` : ""}
      </table>

      <div class="message-box">
        <div class="message-title">Znění zprávy od klienta:</div>
        <p class="message-text">${validatedData.message ? validatedData.message : "Klient nezadal žádný doplňující text, kontaktujte jej telefonicky."}</p>
      </div>
    </div>
    <div class="footer">
      Čas doručení: ${currentTime} • IP adresa odesílatele: ${clientIp}
    </div>
  </div>
</body>
</html>
    `.trim();

    // 5. SMTP Configuration with defaults matching Mescon infrastructure
    const smtpHost = process.env.SMTP_HOST || "mail.mescon.eu";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = smtpPort === 465;
    const smtpUser = process.env.SMTP_USER || "hansbau@mescon.cz";
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO || "team@hansbau.com";
    const smtpFrom = process.env.SMTP_FROM || `"HANSBAU Web" <${smtpUser}>`;

    if (smtpPass) {
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
        subject: `[Nová poptávka] ${validatedData.service || "Rekonstrukce"} - ${validatedData.name} (${validatedData.phone})`,
        text: emailBodyText,
        html: emailBodyHtml,
      });
    } else {
      // Fallback log when password is not yet configured in Coolify
      console.log("=== NEW CONTACT INQUIRY (SMTP_PASS not set, logging to console) ===");
      console.log(emailBodyText);
    }

    return NextResponse.json({ success: true, message: "Poptávka byla úspěšně odeslána." });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Chyba validace zadaných údajů." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Při zpracování poptávky došlo k chybě. Zavolejte nám prosím přímo na +420 606 073 700." },
      { status: 500 }
    );
  }
}
