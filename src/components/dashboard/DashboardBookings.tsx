"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import {
  getBookings,
  setBookings as persistBookings,
  type StoredBooking,
} from "@/lib/store";
import {
  SearchIcon,
  SlidersIcon,
  BookmarkIcon,
  ExpandIcon,
  BookIcon,
  PrintIcon,
  TrashIcon,
  EditIcon,
  PlusIcon,
} from "./icons";

export type Booking = StoredBooking;

const SORT_OPTIONS = ["Newest", "Price: low to high", "Price: high to low", "Name A–Z"];

export default function DashboardBookings({
  accountId,
  seed,
}: {
  accountId: string;
  seed: Booking[];
}) {
  const [bookings, setBookingsState] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [status, setStatus] = useState("All bookings");
  const [editing, setEditing] = useState<string | null>(null);

  // Load from storage on mount; seed sample bookings on first visit.
  useEffect(() => {
    let stored = getBookings(accountId);
    if (stored.length === 0 && seed.length > 0) {
      persistBookings(accountId, seed);
      stored = seed;
    }
    setBookingsState(stored);
  }, [accountId, seed]);

  function commit(next: Booking[]) {
    setBookingsState(next);
    persistBookings(accountId, next);
  }

  const visible = useMemo(() => {
    let list = bookings.filter((b) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q);
      const matchesStatus = status === "All bookings" || b.status === status;
      return matchesQuery && matchesStatus;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "Price: low to high":
          return a.price * a.days - b.price * b.days;
        case "Price: high to low":
          return b.price * b.days - a.price * a.days;
        case "Name A–Z":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return list;
  }, [bookings, query, sort, status]);

  function remove(id: string) {
    commit(bookings.filter((b) => b.id !== id));
  }
  function setDays(id: string, delta: number) {
    commit(
      bookings.map((b) => (b.id === id ? { ...b, days: Math.max(1, b.days + delta) } : b))
    );
  }
  function add() {
    const base = bookings[0] ?? seed[0];
    if (!base) return;
    commit([{ ...base, id: `b${Date.now()}`, status: "Pending" }, ...bookings]);
  }

  return (
    <>
      <h2 className="text-xl font-bold text-brand">Your Bookings</h2>

      {/* Search + sort */}
      <div className="mt-5 flex items-center gap-4">
        <div className="flex flex-1 items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-muted"
          />
        </div>
        <Dropdown value={sort} options={SORT_OPTIONS} onChange={setSort} align="right" />
        <button className="text-navy" aria-label="Filter">
          <SlidersIcon />
        </button>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 border-l-2 border-brand pl-3">
          {[BookmarkIcon, ExpandIcon, BookIcon].map((Icon, i) => (
            <button
              key={i}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand shadow-sm hover:bg-tint"
            >
              <Icon />
            </button>
          ))}
          <button
            onClick={() => window.print()}
            title="Print"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand shadow-sm hover:bg-tint"
          >
            <PrintIcon />
          </button>
          <button
            onClick={() => commit([])}
            title="Clear all"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-danger shadow-sm hover:bg-tint"
          >
            <TrashIcon />
          </button>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Dropdown
            value={status}
            options={["All bookings", "Confirmed", "Pending"]}
            onChange={setStatus}
            align="right"
          />
          <button
            onClick={add}
            title="Add booking"
            className="flex h-10 w-11 items-center justify-center rounded-lg bg-royal text-white hover:bg-brand"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Booking list */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-navy">Booking List</h3>
        <p className="text-xs text-muted">
          {visible.length} booking{visible.length === 1 ? "" : "s"}
        </p>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">No bookings to show.</p>
        ) : (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((b) => {
              const total = b.price * b.days;
              return (
                <article key={b.id} className="w-full max-w-xs rounded-xl border border-line p-3">
                  <div className="relative aspect-3/4 overflow-hidden rounded-lg">
                    <Image src={b.image} alt={b.name} fill sizes="260px" className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 rounded-md bg-royal px-3 py-1 text-xs font-semibold text-white">
                      ${b.price} per night
                    </span>
                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        b.status === "Confirmed" ? "bg-success text-white" : "bg-white/90 text-gray"
                      }`}
                    >
                      {b.status}
                    </span>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-semibold">{b.name}</p>
                      <p className="text-xs text-white/85">{b.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-navy">
                    <p>{b.dates}</p>
                    {editing === b.id ? (
                      <div className="flex items-center gap-3">
                        <span className="text-muted">Days</span>
                        <button onClick={() => setDays(b.id, -1)} className="flex h-6 w-6 items-center justify-center rounded bg-danger text-white">−</button>
                        <span className="w-6 text-center font-semibold">{String(b.days).padStart(2, "0")}</span>
                        <button onClick={() => setDays(b.id, 1)} className="flex h-6 w-6 items-center justify-center rounded bg-success text-white">+</button>
                      </div>
                    ) : (
                      <p>{String(b.days).padStart(2, "0")} Days</p>
                    )}
                    <p className="leading-snug">{b.address}</p>
                    <p>Initial Payment ${Math.round(total / 2)}</p>
                    <div className="flex items-center justify-between pt-1">
                      <p>Total Payment ${total}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing((e) => (e === b.id ? null : b.id))}
                          className={`flex h-7 w-7 items-center justify-center rounded-md border hover:bg-tint ${
                            editing === b.id ? "border-brand bg-tint text-brand" : "border-line text-brand"
                          }`}
                          aria-label="Edit"
                        >
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(b.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-brand hover:bg-tint hover:text-danger"
                          aria-label="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
