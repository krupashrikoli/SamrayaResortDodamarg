"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

const INTEREST_OPTIONS = [
  "Stay at the resort",
  "Dining",
  "Wellness",
  "Events & celebrations",
  "Other",
] as const;

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6+"] as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  arrival: string;
  guests: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  arrival: "",
  guests: "",
  message: "",
};

const fieldClass =
  "w-full border border-[#E5E5E5] bg-white px-3 py-2.5 font-body text-sm font-light text-charcoal outline-none transition-colors placeholder:text-[#6b7280]/70 focus:border-[#543119] disabled:opacity-60";

const labelClass =
  "mb-2 block font-body text-[10px] font-medium uppercase tracking-[0.14em] text-charcoal";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatGuests(value: string) {
  if (value === "1") return "1 guest";
  if (value === "6+") return "6+ guests";
  return `${value} guests`;
}

export function GuestInterestForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.interest ||
      !form.arrival ||
      !form.guests ||
      !form.message.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          interest: form.interest,
          arrival: form.arrival.trim(),
          guests: formatGuests(form.guests),
          message: form.message.trim(),
          source: "samraya",
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        hint?: string;
      };

      if (!response.ok || data.ok !== true) {
        setErrorMessage(
          data.error ||
            data.hint ||
            "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setForm(initialForm);
      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="border border-[#E5E5E5] bg-white p-6 shadow-[0_8px_30px_rgba(17,17,17,0.06)] sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black">
          Message sent
        </p>
        <h3 className="mt-3 font-heading text-xl text-charcoal sm:text-2xl">
          Thank you
        </h3>
        <p className="mt-3 font-body text-sm font-light leading-relaxed text-[#6b7280]">
          Your{" "}
          <span className="font-samraya text-[1.05em]">Samrāya</span> guest
          enquiry has been sent successfully. Our team will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 h-10 border border-charcoal bg-white px-6 font-body text-[0.65rem] font-medium uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-charcoal hover:text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[#E5E5E5] bg-white p-6 shadow-[0_8px_30px_rgba(17,17,17,0.06)] sm:p-8">
      <h3 className="font-heading text-xl text-charcoal sm:text-2xl">
        <span className="font-samraya tracking-normal">Samrāya</span> Guest
        Enquiry
      </h3>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label className={labelClass} htmlFor="guest-name">
            Name *
          </label>
          <input
            id="guest-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-phone">
            Phone *
          </label>
          <input
            id="guest-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={fieldClass}
            placeholder="+91"
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-email">
            Email *
          </label>
          <input
            id="guest-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-interest">
            Interest *
          </label>
          <select
            id="guest-interest"
            name="interest"
            value={form.interest}
            onChange={handleChange}
            className={fieldClass}
            disabled={status === "loading"}
            required
          >
            <option value="" disabled>
              Select
            </option>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-arrival">
            Arrival *
          </label>
          <input
            id="guest-arrival"
            name="arrival"
            type="date"
            value={form.arrival}
            onChange={handleChange}
            className={fieldClass}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-guests">
            Guests *
          </label>
          <select
            id="guest-guests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className={fieldClass}
            disabled={status === "loading"}
            required
          >
            <option value="" disabled>
              Select
            </option>
            {GUEST_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count === "1" ? "1 guest" : `${count} guests`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="guest-message">
            Message *
          </label>
          <textarea
            id="guest-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={`${fieldClass} resize-y`}
            disabled={status === "loading"}
            required
          />
        </div>

        {status === "error" ? (
          <p className="font-body text-sm font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 h-10 w-full bg-[#543119] px-6 font-body text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#543119]/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending…" : "Submit enquiry"}
        </button>
      </form>
    </div>
  );
}
