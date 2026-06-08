"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listListings, type Listing } from "@/lib/store";

function Card({ l }: { l: Listing }) {
  return (
    <Link href={`/listing/${l.slug}`} className="group block">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={l.image}
          alt={l.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-0 top-3 rounded-l-full bg-royal px-3 py-1 text-xs text-white">
          <span className="font-semibold">${l.price}</span> /night
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-medium text-white">
          New
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-navy">{l.name}</h3>
      <p className="text-xs text-muted capitalize">
        {l.location} · {l.kind}
      </p>
    </Link>
  );
}

/** Bare cards for embedding inside an existing grid (e.g. the Hotels page). */
export function CustomHotelCards() {
  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => setListings(listListings()), []);
  if (listings.length === 0) return null;
  return (
    <>
      {listings.map((l) => (
        <Card key={l.id} l={l} />
      ))}
    </>
  );
}

/** A full home-page section, hidden when there are no owner listings. */
export function CustomHotelsSection() {
  const [listings, setListings] = useState<Listing[]>([]);
  useEffect(() => setListings(listListings()), []);
  if (listings.length === 0) return null;
  return (
    <section className="pb-16">
      <h2 className="mb-6 text-xl font-semibold text-navy">Newly Listed by Owners</h2>
      <div className="grid grid-cols-1 gap-6 min-[500px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {listings.map((l) => (
          <Card key={l.id} l={l} />
        ))}
      </div>
    </section>
  );
}
