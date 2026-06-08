"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSearch({
  locations,
  basePath = "/hotels",
  initial,
}: {
  locations: string[];
  /** Page the Search button filters — results render on this same route. */
  basePath?: string;
  initial?: { date?: string; guests?: number; location?: string };
}) {
  const router = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState(initial?.date ?? "");
  const [persons, setPersons] = useState(initial?.guests ?? 2);
  const [location, setLocation] = useState(initial?.location ?? "");
  const [open, setOpen] = useState<null | "person" | "location">(null);

  function toggle(which: "person" | "location") {
    setOpen((cur) => (cur === which ? null : which));
  }

  function search() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    params.set("guests", String(persons));
    if (date) params.set("date", date);
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}#results` : basePath);
  }

  return (
    <section className="relative mt-6 rounded-3xl bg-tint px-6 py-6 sm:px-8">
      {open && <button className="fixed inset-0 z-0 cursor-default" aria-hidden onClick={() => setOpen(null)} />}

      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Check Available — date */}
        <button
          type="button"
          onClick={() => dateRef.current?.showPicker?.() ?? dateRef.current?.focus()}
          className="relative flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-left"
        >
          <Image src="/icons/calendar.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
          <span className={`text-sm font-medium ${date ? "text-navy" : "text-navy"}`}>
            {date ? formatDate(date) : "Check Available"}
          </span>
          <input
            ref={dateRef}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </button>

        {/* Person — counter */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => toggle("person")}
            className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3.5"
          >
            <Image src="/icons/person.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-sm font-medium text-navy">Person</span>
            <span className="ml-auto text-sm font-semibold text-navy">{persons}</span>
            <Chevron open={open === "person"} />
          </button>
          {open === "person" && (
            <div className="absolute left-0 top-full z-20 mt-2 flex w-full items-center justify-between rounded-xl bg-white p-3 shadow-lg">
              <span className="text-sm text-navy">Guests</span>
              <div className="flex items-center gap-3">
                <Stepper label="−" onClick={() => setPersons((p) => Math.max(1, p - 1))} />
                <span className="w-6 text-center text-sm font-semibold text-navy">{persons}</span>
                <Stepper label="+" onClick={() => setPersons((p) => Math.min(20, p + 1))} />
              </div>
            </div>
          )}
        </div>

        {/* Select Location */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => toggle("location")}
            className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3.5"
          >
            <Image src="/icons/location.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="truncate text-sm font-medium text-navy">{location || "Select Location"}</span>
            <Chevron open={open === "location"} className="ml-auto" />
          </button>
          {open === "location" && (
            <ul className="absolute left-0 top-full z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 shadow-lg">
              <li>
                <button
                  onClick={() => { setLocation(""); setOpen(null); }}
                  className="block w-full px-4 py-2 text-left text-sm text-muted hover:bg-tint"
                >
                  Anywhere
                </button>
              </li>
              {locations.map((loc) => (
                <li key={loc}>
                  <button
                    onClick={() => { setLocation(loc); setOpen(null); }}
                    className="block w-full px-4 py-2 text-left text-sm text-navy hover:bg-tint"
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={search}
          className="rounded-xl bg-royal px-10 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand"
        >
          Search
        </button>
      </div>
    </section>
  );
}

function Stepper({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md bg-tint text-base font-bold text-brand hover:bg-brand hover:text-white"
    >
      {label}
    </button>
  );
}

function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-4 w-4 text-navy transition-transform ${open ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}
