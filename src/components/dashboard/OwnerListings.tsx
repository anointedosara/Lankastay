"use client";

import { useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import {
  getOwnerListings,
  addListing,
  updateListing,
  removeListing,
  type Listing,
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

const SORT_OPTIONS = ["Newest", "Name A–Z", "Price: high to low"];
const EMPTY = {
  kind: "hotel" as Listing["kind"],
  name: "",
  location: "",
  price: "",
  image: "",
  gallery: [] as string[],
  facilities: "",
};

export default function OwnerListings({ ownerId }: { ownerId: string }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [period, setPeriod] = useState("This Month");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    setListings(getOwnerListings(ownerId));
  }, [ownerId]);

  const visible = useMemo(() => {
    let list = listings.filter((l) => {
      const q = query.toLowerCase();
      return !q || l.name.toLowerCase().includes(q) || l.location.toLowerCase().includes(q);
    });
    if (sort === "Name A–Z") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "Price: high to low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [listings, query, sort]);

  // Downscale + compress so images fit inside localStorage's small quota.
  function resizeImage(file: File, maxDim = 1000, quality = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read the file."));
      reader.onload = () => {
        const img = new window.Image();
        img.onerror = () => reject(new Error("That file isn't a valid image."));
        img.onload = () => {
          let { width, height } = img;
          if (Math.max(width, height) > maxDim) {
            const scale = maxDim / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Image processing isn't supported here."));
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function pickImage(file: File | undefined) {
    if (!file) return;
    setError("");
    resizeImage(file)
      .then((url) => setForm((f) => ({ ...f, image: url })))
      .catch((e) => setError(e.message));
  }

  async function pickGallery(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    try {
      const urls = await Promise.all(Array.from(files).map((f) => resizeImage(f)));
      setForm((f) => ({ ...f, gallery: [...f.gallery, ...urls] }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not process images.");
    }
  }

  function removeGalleryImage(i: number) {
    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, idx) => idx !== i) }));
  }

  function openAdd() {
    setForm(EMPTY);
    setEditingId(null);
    setAdding((a) => !a);
  }

  function openEdit(l: Listing) {
    setForm({
      kind: l.kind,
      name: l.name,
      location: l.location,
      price: String(l.price),
      image: l.image,
      gallery: l.gallery ?? [],
      facilities: l.facilities ?? "",
    });
    setEditingId(l.id);
    setAdding(true);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image) {
      setError("Please add a cover picture.");
      return;
    }
    const data = {
      kind: form.kind,
      name: form.name,
      location: form.location,
      price: Number(form.price) || 0,
      image: form.image,
      gallery: form.gallery,
      facilities: form.facilities,
    };
    try {
      if (editingId) updateListing(editingId, data);
      else addListing({ ownerId, ...data });
      setListings(getOwnerListings(ownerId));
      setForm(EMPTY);
      setEditingId(null);
      setAdding(false);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the listing.");
    }
  }

  function remove(id: string) {
    removeListing(id);
    setListings(getOwnerListings(ownerId));
  }

  return (
    <>
      <h2 className="text-xl font-bold text-brand">Hotel&nbsp; Owner</h2>

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
            <button key={i} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand shadow-sm hover:bg-tint">
              <Icon />
            </button>
          ))}
          <button onClick={() => window.print()} title="Print" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand shadow-sm hover:bg-tint">
            <PrintIcon />
          </button>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Dropdown value={period} options={["This Month", "Last Month", "This Year"]} onChange={setPeriod} align="right" />
          <button
            onClick={openAdd}
            title="Add hotel or room"
            className="flex h-10 w-11 items-center justify-center rounded-lg bg-royal text-white hover:bg-brand"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={save} className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-navy">
            {editingId ? "Edit" : "Add a new"} {form.kind}
          </h3>
          <p className="text-xs text-muted">It will appear on the home and hotels pages.</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-navy">Type</span>
              <select
                value={form.kind}
                onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value as Listing["kind"] }))}
                className="w-full rounded-lg border border-line px-3 py-2.5 text-sm text-navy outline-none focus:border-brand"
              >
                <option value="hotel">Hotel</option>
                <option value="room">Room</option>
              </select>
            </label>
            <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="e.g. Sunset Villa" required />
            <Field label="Location" value={form.location} onChange={(v) => setForm((f) => ({ ...f, location: v }))} placeholder="City, Sri Lanka" required />
            <Field label="Price per night (USD)" type="number" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} placeholder="120" required />

            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-navy">Picture</span>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => pickImage(e.target.files?.[0])}
                className="block w-full text-sm text-gray file:mr-4 file:rounded-md file:border-0 file:bg-tint file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand hover:file:text-white"
              />
            </label>

            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="Preview" className="h-32 w-full rounded-lg object-cover sm:col-span-2" />
            )}

            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-navy">
                More images <span className="font-normal text-muted">(shown on the details page)</span>
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => pickGallery(e.target.files)}
                className="block w-full text-sm text-gray file:mr-4 file:rounded-md file:border-0 file:bg-tint file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand hover:file:text-white"
              />
            </label>

            {form.gallery.length > 0 && (
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                {form.gallery.map((src, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Gallery ${i + 1}`} className="h-20 w-28 rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-navy">Facilities</span>
              <textarea
                rows={2}
                value={form.facilities}
                onChange={(e) => setForm((f) => ({ ...f, facilities: e.target.value }))}
                placeholder="WiFi, AC, Pool…"
                className="w-full resize-none rounded-lg border border-line px-3 py-2.5 text-sm text-navy outline-none focus:border-brand"
              />
            </label>
          </div>

          {error && (
            <p className="mt-4 rounded-md bg-danger/10 px-4 py-2 text-sm text-danger">{error}</p>
          )}

          <div className="mt-5 flex items-center gap-4">
            <button type="submit" className="rounded-lg bg-royal px-7 py-2.5 text-sm font-semibold text-white hover:bg-brand">
              Save &amp; Publish
            </button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-lg border border-line px-7 py-2.5 text-sm font-medium text-gray hover:text-navy">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Listings */}
      <section className="mt-6 min-h-[400px] rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-navy">List of Hotels &amp; Rooms</h3>
        <p className="text-xs text-muted">
          {visible.length} listing{visible.length === 1 ? "" : "s"} · published by you
        </p>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            No listings yet. Use the <span className="font-semibold text-brand">+</span> button to add a hotel or room.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-line">
            {visible.map((l) => (
              <li key={l.id} className="flex items-center gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt={l.name} className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-navy">{l.name}</p>
                    <span className="rounded-full bg-tint px-2 py-0.5 text-[10px] font-semibold capitalize text-brand">
                      {l.kind}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{l.location}</p>
                </div>
                <p className="hidden text-sm font-semibold text-navy sm:block">${l.price}/night</p>
                <button
                  onClick={() => openEdit(l)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-brand hover:bg-tint"
                  aria-label="Edit"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(l.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-brand hover:bg-tint hover:text-danger"
                  aria-label="Delete"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-medium text-navy">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line px-3 py-2.5 text-sm text-navy outline-none focus:border-brand"
      />
    </label>
  );
}
