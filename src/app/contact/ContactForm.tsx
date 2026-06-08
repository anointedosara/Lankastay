"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-4 text-lg font-semibold text-navy">Message sent!</h3>
        <p className="mt-2 text-sm text-muted">Thanks for reaching out — we&apos;ll reply within 24 hours.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-line p-7"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" placeholder="Your name" />
        <Field label="Email" placeholder="name@gmail.com" type="email" />
      </div>
      <div className="mt-5">
        <Field label="Subject" placeholder="How can we help?" />
      </div>
      <div className="mt-5">
        <label className="text-sm font-medium text-navy">Message</label>
        <textarea
          required
          rows={6}
          placeholder="Write your message..."
          className="mt-2 w-full resize-none rounded-lg border border-line px-4 py-3 text-sm text-navy outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-royal py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand sm:w-auto sm:px-12"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-navy">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-line px-4 py-3 text-sm text-navy outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}
