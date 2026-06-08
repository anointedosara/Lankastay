"use client";

import { useState } from "react";
import { updateAccount, type Account } from "@/lib/store";

export default function ProfileForm({
  account,
  onSaved,
}: {
  account: Account;
  onSaved?: () => void;
}) {
  const [form, setForm] = useState({
    name: account.name,
    email: account.email,
    phone: account.phone ?? "",
    country: account.country ?? "",
    hotelName: account.hotelName ?? "",
    address: account.address ?? "",
    facilities: account.facilities ?? "",
  });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    updateAccount(account.id, form);
    setSaved(true);
    onSaved?.();
  }

  const isOwner = account.role === "owner";

  return (
    <section className="rounded-2xl bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-navy">Profile &amp; Settings</h2>
      <p className="text-xs text-muted">Your details are saved to this device.</p>

      <form onSubmit={submit} className="mt-6 grid max-w-2xl gap-5 sm:grid-cols-2">
        <Field label="Full Name" value={form.name} onChange={(v) => set("name", v)} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
        <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
        <Field label="Country" value={form.country} onChange={(v) => set("country", v)} />
        {isOwner && (
          <>
            <Field label="Hotel Name" value={form.hotelName} onChange={(v) => set("hotelName", v)} />
            <Field label="Address" value={form.address} onChange={(v) => set("address", v)} />
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Facilities</label>
              <textarea
                rows={3}
                value={form.facilities}
                onChange={(e) => set("facilities", e.target.value)}
                className="mt-2 w-full resize-none rounded-lg border border-line px-4 py-2.5 text-sm text-navy outline-none focus:border-brand"
              />
            </div>
          </>
        )}

        <div className="flex items-center gap-4 sm:col-span-2">
          <button type="submit" className="rounded-lg bg-royal px-7 py-2.5 text-sm font-semibold text-white hover:bg-brand">
            Save Changes
          </button>
          {saved && <span className="text-sm font-medium text-success">Saved ✓</span>}
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-navy">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-line px-4 py-2.5 text-sm text-navy outline-none focus:border-brand"
      />
    </div>
  );
}
