import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import HeroSearch from "@/components/HeroSearch";
import HotelGridCard from "@/components/HotelGridCard";
import { CustomHotelCards } from "@/components/CustomHotels";
import { allHotels, filterHotels, type HotelFilters } from "@/lib/hotels";

const locations = Array.from(new Set(allHotels.map((h) => h.location))).sort();

export const metadata: Metadata = {
  title: "Hotels — LankaStay",
  description: "Browse every LankaStay hotel across Sri Lanka.",
};

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    guests?: string;
    persons?: string;
    rooms?: string;
    ac?: string;
    date?: string;
  }>;
}) {
  const sp = await searchParams;

  const filters: HotelFilters = {
    location: sp.location,
    guests: Number(sp.guests ?? sp.persons) || undefined,
    rooms: Number(sp.rooms) || undefined,
    ac: sp.ac === "1" || sp.ac === "true",
  };

  const results = filterHotels(filters);

  const chips = [
    filters.location && { label: filters.location },
    filters.guests && { label: `${filters.guests}+ guests` },
    filters.rooms && { label: `${filters.rooms}+ room${filters.rooms > 1 ? "s" : ""}` },
    filters.ac && { label: "Air conditioning" },
  ].filter(Boolean) as { label: string }[];

  const hasFilters = chips.length > 0;

  return (
    <>
      <SiteHeader active="Hotels" />
      <PageBanner
        title="Find Your Hotel"
        subtitle="Handpicked stays across Sri Lanka — from beachfront villas to hilltop cabins."
        crumb="Hotels"
      />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <HeroSearch
          locations={locations}
          basePath="/hotels"
          initial={{ location: filters.location, guests: filters.guests, date: sp.date }}
        />

        <div id="results" className="mb-6 mt-12 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted">
            Showing <span className="font-semibold text-navy">{results.length}</span> hotel
            {results.length === 1 ? "" : "s"}
            {hasFilters && " matching:"}
          </p>
          {chips.map((c) => (
            <span
              key={c.label}
              className="rounded-full bg-tint px-3 py-1 text-xs font-medium text-brand"
            >
              {c.label}
            </span>
          ))}
          {hasFilters && (
            <Link
              href="/hotels"
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-gray hover:text-navy"
            >
              Clear all ✕
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted">
              No hotels match these requirements.
            </p>
            <Link
              href="/hotels"
              className="mt-4 inline-block rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand"
            >
              View all hotels
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {!hasFilters && <CustomHotelCards />}
            {results.map((hotel) => (
              <HotelGridCard key={hotel.slug} hotel={hotel} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
