import nodemailer from "nodemailer";

export interface SendMailParams {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}

export interface SendMailResult {
  success: boolean;
  error?: string;
}

/**
 * Resilient SMTP mail sender with automatic port fallback (587 STARTTLS <-> 465 SMTPS)
 * and fail-safe error handling for self-hosted VPS / Docker environments.
 */
export async function sendLeadEmail(params: SendMailParams): Promise<SendMailResult> {
  const smtpHost = process.env.SMTP_HOST || "mail.mescon.eu";
  // Default to 587 (Submission / STARTTLS) which is universally compatible with Docker bridge networks
  const primaryPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER || "hansbau@mescon.eu";
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const contactEmailTo = process.env.CONTACT_EMAIL_TO || "team@hansbau.com";
  const fromName = params.fromName || "HANSBAU";
  const smtpFrom = process.env.SMTP_FROM || `"${fromName}" <${smtpUser}>`;
  const rejectUnauthorized = process.env.SMTP_REJECT_UNAUTHORIZED !== "false";

  if (!smtpPass) {
    console.warn("⚠️ SMTP_PASS / SMTP_PASSWORD is not configured in environment variables. Email was not dispatched.");
    return { success: false, error: "SMTP_PASS not configured in environment" };
  }

  // Determine port attempts: primary port first, then fallback port if connection is refused
  const fallbackPort = primaryPort === 465 ? 587 : (primaryPort === 587 ? 465 : null);
  const portsToTry: number[] = [primaryPort];
  if (fallbackPort && fallbackPort !== primaryPort) {
    portsToTry.push(fallbackPort);
  }

  let lastError: unknown = null;

  for (const port of portsToTry) {
    // Explicit override from env if provided, otherwise 465 is implicit TLS, 587 is STARTTLS
    const isSecure = process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: contactEmailTo,
        replyTo: params.replyTo || undefined,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });

      if (port !== primaryPort) {
        console.log(`✅ Email successfully dispatched via fallback port ${port} on ${smtpHost} (primary port ${primaryPort} was unreachable).`);
      }
      return { success: true };
    } catch (err: unknown) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn(`[SMTP Attempt Warning on ${smtpHost}:${port}] ${errMsg}`);

      // If it was a protocol rejection (bad credentials 535, invalid sender/recipient 550, etc.),
      // the mail server responded properly, so trying another port is pointless.
      const isProtocolError = 
        /5\d{2}/.test(errMsg) || 
        errMsg.toLowerCase().includes("authentication failed") || 
        errMsg.toLowerCase().includes("unrouteable address") ||
        errMsg.toLowerCase().includes("sender verify failed");

      if (isProtocolError) {
        console.error(`❌ SMTP Server protocol rejection: ${errMsg}`);
        break;
      }
    }
  }

  const finalErrMsg = lastError instanceof Error ? lastError.message : String(lastError);
  console.error(`❌ Failed to send email via ${smtpHost} on ports [${portsToTry.join(", ")}]:`, finalErrMsg);
  return { success: false, error: finalErrMsg };
}
