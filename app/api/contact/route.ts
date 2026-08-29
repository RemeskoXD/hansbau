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

    const emailBody = `
Nová poptávka z webu HANSBAU.cz:
----------------------------------------
Jméno: ${validatedData.name}
Telefon: ${validatedData.phone}
Email: ${validatedData.email || "Neuvedeno"}
Lokalita / Město: ${validatedData.city || "Neuvedeno"}
Požadovaná služba: ${validatedData.service || "Neuvedeno"}
Zpráva / Popis:
${validatedData.message || "Bez doplňující zprávy"}
----------------------------------------
Odesláno z IP: ${clientIp}
Čas: ${new Date().toLocaleString("cs-CZ")}
    `.trim();

    // 3. Email dispatch via SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"HANSBAU Web" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL_TO || "team@hansbau.com",
        replyTo: validatedData.email || undefined,
        subject: `[Poptávka Web] ${validatedData.service} - ${validatedData.name} (${validatedData.phone})`,
        text: emailBody,
      });
    } else {
      console.log("=== NEW CONTACT INQUIRY RECEIVED (LOG MODE) ===");
      console.log(emailBody);
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
      { error: "Při zpracování poptávky došlo k chybě. Zavolejte nám přímo na +420 606 073 700." },
      { status: 500 }
    );
  }
}
