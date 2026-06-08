"use client";

import { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import {
  SearchIcon,
  SlidersIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "./icons";

export type Role = "Super Admin" | "Owner" | "Pending";
export type Owner = { id: string; name: string; email: string; role: Role; date: string };

const SORT_OPTIONS = ["Default", "Name A–Z", "Name Z–A", "Role"];
const ROLE_RANK: Record<Role, number> = { "Super Admin": 0, Owner: 1, Pending: 2 };
const roleStyles: Record<Role, string> = {
  "Super Admin": "bg-royal text-white",
  Owner: "bg-sky text-white",
  Pending: "bg-line text-gray",
};

export default function AdminOwners({ initial }: { initial: Owner[] }) {
  const [owners, setOwners] = useState<Owner[]>(initial);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Pending" as Role });

  const filtered = useMemo(() => {
    let list = owners.filter((o) => {
      const q = query.toLowerCase();
      return !q || o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
    });
    if (sort === "Name A–Z") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "Name Z–A") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "Role") list = [...list].sort((a, b) => ROLE_RANK[a.role] - ROLE_RANK[b.role]);
    return list;
  }, [owners, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * perPage;
  const pageRows = filtered.slice(start, start + perPage);

  function remove(id: string) {
    setOwners((os) => os.filter((o) => o.id !== id));
  }
  function submitOwner(e: React.FormEvent) {
    e.preventDefault();
    setOwners((os) => [
      { id: `o${Date.now()}`, name: form.name, email: form.email, role: form.role, date: "Today" },
      ...os,
    ]);
    setForm({ name: "", email: "", role: "Pending" });
    setAdding(false);
    setPage(1);
  }

  return (
    <>
      <h2 className="text-xl font-bold text-brand">Admin Dashboard</h2>

      {/* Search row */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div className="flex min-w-[240px] flex-1 items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-muted"
          />
        </div>
        <button
          onClick={() => setAdding((a) => !a)}
          className="flex items-center gap-2 rounded-lg bg-royal px-5 py-3 text-sm font-semibold text-white hover:bg-brand"
        >
          Add Owner <PlusIcon className="h-4 w-4" />
        </button>
        <Dropdown value={sort} options={SORT_OPTIONS} onChange={setSort} align="right" />
        <button className="text-navy" aria-label="Filter">
          <SlidersIcon />
        </button>
      </div>

      {/* Add owner form */}
      {adding && (
        <form
          onSubmit={submitOwner}
          className="mt-4 flex flex-wrap items-end gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm"
        >
          <label className="flex-1 text-sm">
            <span className="mb-1 block font-medium text-navy">Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Full name"
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm text-navy outline-none focus:border-brand"
            />
          </label>
          <label className="flex-1 text-sm">
            <span className="mb-1 block font-medium text-navy">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm text-navy outline-none focus:border-brand"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-navy">Role</span>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}
              className="rounded-lg border border-line px-3 py-2.5 text-sm text-navy outline-none focus:border-brand"
            >
              <option>Pending</option>
              <option>Owner</option>
              <option>Super Admin</option>
            </select>
          </label>
          <button type="submit" className="rounded-lg bg-royal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand">
            Save
          </button>
          <button
            type="button"
            onClick={() => setAdding(false)}
            className="rounded-lg border border-line px-6 py-2.5 text-sm font-medium text-gray hover:text-navy"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Owners table */}
      <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <h3 className="px-6 py-5 font-semibold text-navy">
          List Hotel Owners <span className="text-sm font-normal text-muted">({filtered.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-table-head text-sm text-gray">
                <th className="py-3 pl-6 font-medium">Name</th>
                <th className="py-3 font-medium">Create Date</th>
                <th className="py-3 font-medium">Role</th>
                <th className="py-3 pr-6 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-sm text-muted">
                    No owners found.
                  </td>
                </tr>
              ) : (
                pageRows.map((o) => (
                  <tr key={o.id} className="border-b border-line last:border-0">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-5">
                        <div>
                          <p className="text-sm font-semibold text-navy">{o.name}</p>
                          <p className="text-xs text-muted">{o.email}</p>
                        </div>
                        <span className={`rounded-full px-4 py-1 text-xs font-medium ${roleStyles[o.role]}`}>
                          {o.role}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-navy">{o.date}</td>
                    <td className="py-4 text-sm text-muted">Lorem Ipsum</td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center justify-end gap-3 text-muted">
                        <button className="hover:text-brand" aria-label="Edit">
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(o.id)} className="hover:text-danger" aria-label="Delete">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
        <span className="flex items-center gap-2">
          Items per page:
          <span className="relative inline-flex items-center gap-1 text-navy">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="cursor-pointer appearance-none bg-transparent pr-4 outline-none"
            >
              {[6, 10, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 h-3 w-3" />
          </span>
        </span>
        <span>
          {filtered.length === 0 ? 0 : start + 1}-{Math.min(start + perPage, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-4 text-navy">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current <= 1}
            className="disabled:opacity-30"
            aria-label="Previous"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current >= totalPages}
            className="disabled:opacity-30"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
