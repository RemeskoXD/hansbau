import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "hansbau_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Secret key for HMAC signing
const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "hansbau_secure_admin_salt_2026";

export function getExpectedPassword(): string {
  return process.env.ADMIN_PASSWORD || "hansbau2026";
}

export function verifyAdminPassword(inputPass: string): boolean {
  const expected = getExpectedPassword();
  if (!inputPass || !expected) return false;
  // Constant-time comparison to prevent timing attacks
  const inputBuffer = Buffer.from(inputPass);
  const expectedBuffer = Buffer.from(expected);
  if (inputBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`hansbau_admin_${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [timestamp, signature] = token.split(".");
  const timeNum = parseInt(timestamp, 10);
  
  // Check token age (7 days)
  if (isNaN(timeNum) || Date.now() - timeNum > SESSION_MAX_AGE * 1000) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`hansbau_admin_${timestamp}`)
    .digest("hex");

  const sigBuffer = Buffer.from(signature);
  const expectedSigBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedSigBuffer.length) return false;
  return crypto.timingSafeEqual(sigBuffer, expectedSigBuffer);
}

export async function checkIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { ADMIN_COOKIE_NAME, SESSION_MAX_AGE };
