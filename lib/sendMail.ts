import type { SendMailOptions } from "nodemailer";
import { isSmtpPassConfigured, missingSmtpPassHint } from "@/lib/mailEnv";
import { sendMailViaSmtp } from "@/lib/smtp";
import fs from "node:fs";
import path from "node:path";

export type AppMail = {
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export function isMailConfigured(): boolean {
  return (
    Boolean(process.env.RESEND_API_KEY?.trim()) ||
    isSmtpPassConfigured() ||
    process.env.CONTACT_FORM_FALLBACK?.trim() === "formsubmit" ||
    // HTTPS fallback works on Vercel where SMTP ports are blocked
    Boolean(process.env.VERCEL)
  );
}

export function missingMailHint(): string {
  if (isMailConfigured()) return "";

  const envFilePath = path.join(process.cwd(), ".env.local");
  const smtpHint = missingSmtpPassHint({
    envFilePath,
    envFileExists: fs.existsSync(envFilePath),
  });

  return [
    "Email is not configured for this deployment.",
    "Set SMTP_PASS with SMTP_PORT=465 and SMTP_SECURE=true (SSL), or set RESEND_API_KEY.",
    "Avoid CONTACT_FORM_FALLBACK=formsubmit — FormSubmit is often blocked by Cloudflare.",
    "",
    `SMTP: ${smtpHint}`,
  ].join("\n");
}

async function sendMailViaResend(mail: AppMail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const from =
    process.env.RESEND_FROM?.trim() ||
    mail.from ||
    "GHD Hotels <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  });

  const raw = await response.text();
  let parsed: { message?: string; name?: string } = {};
  try {
    parsed = JSON.parse(raw) as typeof parsed;
  } catch {
    /* ignore */
  }

  if (!response.ok) {
    throw new Error(
      parsed.message ||
        parsed.name ||
        `Resend error HTTP ${response.status}: ${raw.slice(0, 240)}`,
    );
  }
}

async function sendMailViaFormSubmit(mail: AppMail): Promise<void> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(mail.to)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: process.env.NEXT_PUBLIC_SITE_URL || "https://samraya.ghdhotels.in",
      Referer: `${process.env.NEXT_PUBLIC_SITE_URL || "https://samraya.ghdhotels.in"}/contact`,
    },
    body: JSON.stringify({
      name: mail.replyTo ? `Website enquiry (${mail.replyTo})` : "Website enquiry",
      email: mail.replyTo || "noreply@ghdhotels.in",
      _subject: mail.subject,
      message: mail.text,
      _template: "table",
      _captcha: "false",
    }),
  });

  const raw = await response.text();
  const contentType = response.headers.get("content-type") || "";

  // Cloudflare challenge pages look like success HTML but are not the mail API
  if (
    /just a moment|cf-browser-verification|cloudflare/i.test(raw) ||
    (contentType.includes("text/html") && raw.trim().startsWith("<!"))
  ) {
    throw new Error(
      "FormSubmit blocked by Cloudflare challenge. Use SMTP (port 465 SSL) or RESEND_API_KEY instead.",
    );
  }

  let parsed: { success?: string | boolean; message?: string } = {};
  try {
    parsed = JSON.parse(raw) as typeof parsed;
  } catch {
    /* ignore */
  }

  const success =
    parsed.success === true ||
    parsed.success === "true" ||
    /thank you|succeeded|true/i.test(raw);

  if (!response.ok || !success) {
    const detail = parsed.message || raw.slice(0, 280) || `HTTP ${response.status}`;
    if (/activation/i.test(detail)) {
      throw new Error(
        `${detail} Check the inbox for ${mail.to}, click Activate Form, then submit again.`,
      );
    }
    throw new Error(`FormSubmit failed: ${detail}`);
  }
}

function shouldUseFormSubmitFallback(): boolean {
  const explicit = process.env.CONTACT_FORM_FALLBACK?.trim().toLowerCase();
  if (explicit === "off" || explicit === "false" || explicit === "0" || explicit === "smtp") {
    return false;
  }
  if (explicit === "formsubmit") return true;
  // Vercel blocks outbound SMTP — HTTPS fallback only when SMTP is not configured
  return Boolean(process.env.VERCEL) && !isSmtpPassConfigured();
}

export async function sendAppMail(mail: AppMail): Promise<void> {
  if (process.env.RESEND_API_KEY?.trim()) {
    await sendMailViaResend(mail);
    return;
  }

  let smtpError: unknown;

  // Prefer SMTP over SSL (port 465) whenever credentials are configured.
  // Do not skip SMTP for CONTACT_FORM_FALLBACK=formsubmit — FormSubmit is often blocked.
  if (isSmtpPassConfigured()) {
    try {
      const payload: SendMailOptions = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
      };
      await sendMailViaSmtp(payload);
      return;
    } catch (error) {
      smtpError = error;
      if (!shouldUseFormSubmitFallback()) {
        throw error;
      }
    }
  }

  if (shouldUseFormSubmitFallback()) {
    try {
      await sendMailViaFormSubmit(mail);
      return;
    } catch (fallbackError) {
      if (smtpError) {
        const smtpMsg =
          smtpError instanceof Error ? smtpError.message : String(smtpError);
        const fbMsg =
          fallbackError instanceof Error
            ? fallbackError.message
            : String(fallbackError);
        throw new Error(`${smtpMsg}\n\nFallback: ${fbMsg}`);
      }
      throw fallbackError;
    }
  }

  if (smtpError) throw smtpError;
  throw new Error("Missing SMTP_PASS");
}
