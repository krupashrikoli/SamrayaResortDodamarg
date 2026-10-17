import { NextResponse } from "next/server";
import { isMailConfigured, missingMailHint, sendAppMail } from "@/lib/sendMail";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  arrival?: string;
  guests?: string;
  message?: string;
  source?: string;
};

const DEFAULT_RECIPIENT = "website@ghdhotels.in";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function recipient(): string {
  return String(
    process.env.CONTACT_RECIPIENT_SAMRAYA ||
      process.env.CONTACT_RECIPIENT ||
      process.env.MAILBOX ||
      DEFAULT_RECIPIENT,
  ).trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const interest = String(body.interest ?? "").trim();
    const arrival = String(body.arrival ?? "").trim();
    const guests = String(body.guests ?? "").trim();
    const message = String(body.message ?? "").trim();
    const to = recipient();

    if (!name || !phone || !email || !interest || !arrival || !guests || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email not configured",
          hint: missingMailHint(),
        },
        { status: 400 },
      );
    }

    const subject = `[Samrāya] Guest enquiry from ${name}`;
    const text = [
      "Samrāya Guest Enquiry",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      `Arrival: ${arrival}`,
      `Guests: ${guests}`,
      `Message: ${message}`,
      "",
      `Source: Samrāya (samraya.ghdhotels.in)`,
      `Delivered to: ${to}`,
    ].join("\n");

    await sendAppMail({
      from:
        process.env.RESEND_FROM?.trim() ||
        process.env.SMTP_FROM?.trim() ||
        process.env.SMTP_USER?.trim() ||
        to,
      to,
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, source: "samraya" });
  } catch (error) {
    if (
      error instanceof Error &&
      (/Missing SMTP_PASS/i.test(error.message) ||
        /Missing RESEND_API_KEY/i.test(error.message) ||
        /Email not configured/i.test(error.message))
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email not configured",
          hint: missingMailHint(),
        },
        { status: 400 },
      );
    }

    const msg =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Failed to send email";

    console.error("Samrāya contact form error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
