import { NextResponse } from "next/server";
import { verifyAdminPassword, createSessionToken, ADMIN_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";

// In-memory brute-force protection
const failedAttemptsMap = new Map<string, { count: number; lockedUntil: number }>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 10 * 60 * 1000; // 10 minutes lock

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const now = Date.now();

    // Check rate limit
    const attempt = failedAttemptsMap.get(clientIp);
    if (attempt && attempt.lockedUntil > now) {
      const waitMinutes = Math.ceil((attempt.lockedUntil - now) / 60000);
      return NextResponse.json(
        { error: `Příliš mnoho neúspěšných pokusů. Přístup zablokován na ${waitMinutes} minut.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Zadejte heslo." }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);

    if (!isValid) {
      const currentCount = (attempt?.count || 0) + 1;
      if (currentCount >= MAX_FAILED_ATTEMPTS) {
        failedAttemptsMap.set(clientIp, { count: currentCount, lockedUntil: now + LOCK_TIME_MS });
        return NextResponse.json(
          { error: "Příliš mnoho neplatných pokusů. Účet dočasně uzamčen na 10 minut." },
          { status: 429 }
        );
      } else {
        failedAttemptsMap.set(clientIp, { count: currentCount, lockedUntil: 0 });
        const remaining = MAX_FAILED_ATTEMPTS - currentCount;
        return NextResponse.json(
          { error: `Nesprávné heslo. Zbývá ${remaining} pokusů.` },
          { status: 401 }
        );
      }
    }

    // Reset failed attempts on success
    failedAttemptsMap.delete(clientIp);

    const token = createSessionToken();
    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json({ success: true, message: "Přihlášení proběhlo úspěšně." });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ error: "Chyba při přihlašování." }, { status: 500 });
  }
}
