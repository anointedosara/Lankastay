"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BookingFlow from "@/app/hotel/[slug]/book/BookingFlow";
import { getListing, type Listing } from "@/lib/store";
import { amenities, treasures } from "@/lib/hotels";
import type { Hotel } from "@/lib/hotels";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [ready, setReady] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    setListing(getListing(params.id) ?? null);
    setReady(true);
  }, [params.id]);

  if (!ready) return null;

  if (!listing) {
    return (
      <>
        <SiteHeader active="Hotels" />
        <main className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 py-32 text-center">
          <h1 className="text-2xl font-bold text-navy">Listing not found</h1>
          <p className="text-sm text-muted">
            This stay may have been removed, or it was added on another device.
          </p>
          <Link href="/hotels" className="rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand">
            Browse hotels
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Adapt the stored listing to the shape BookingFlow expects.
  const asHotel: Hotel = {
    slug: listing.slug,
    name: listing.name,
    location: listing.location,
    price: listing.price,
    image: listing.image,
  };

  if (booking) return <BookingFlow hotel={asHotel} />;

  const gallery = listing.gallery ?? [];

  return (
    <>
      <SiteHeader active="Hotels" />

      <main className="mx-auto max-w-6xl px-6">
        {/* Title + breadcrumb */}
        <section className="relative py-10 sm:text-center">
          <nav className="mb-4 text-sm text-muted sm:absolute sm:left-0 sm:top-10 sm:mb-0">
            <Link href="/" className="transition-colors hover:text-brand">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-navy">Hotel Details</span>
          </nav>
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">{listing.name}</h1>
          <p className="mt-2 text-sm text-muted capitalize">
            {listing.location} · {listing.kind}
          </p>
        </section>

        {/* Gallery */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={listing.image} alt={listing.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-5">
            {(gallery.length > 0 ? gallery : [listing.image]).slice(0, 2).map((src, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${listing.name} ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Extra gallery thumbnails */}
        {gallery.length > 2 && (
          <section className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-5">
            {gallery.slice(2).map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${listing.name} extra ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </section>
        )}

        {/* About + Booking */}
        <section className="grid gap-8 py-14 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-lg font-semibold text-navy">About the place</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {listing.facilities
                ? listing.facilities
                : `Welcome to ${listing.name} in ${listing.location}. A lovely ${listing.kind} listed by one of our hosts.`}
            </p>
          </div>

          <aside className="self-start rounded-2xl border border-line p-7">
            <h3 className="font-semibold text-navy">Start Booking</h3>
            <p className="mt-3 text-2xl font-bold text-success">
              ${listing.price} <span className="text-base font-normal text-muted">per Day</span>
            </p>
            <button
              onClick={() => setBooking(true)}
              className="mt-5 block w-full rounded-md bg-royal py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Book Now!
            </button>
          </aside>
        </section>

        {/* Amenities */}
        <section className="border-t border-line py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
            {amenities.map((a) => (
              <div key={a.label}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.icon} alt="" className="h-7 w-7 object-contain" />
                <p className="mt-3 text-sm">
                  <span className="font-bold text-navy">{a.value}</span>{" "}
                  <span className="text-muted">{a.label}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Treasure to Choose */}
        <section className="py-12">
          <h2 className="mb-6 text-xl font-semibold text-navy">Treasure to Choose</h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {treasures.map((t) => (
              <div key={t.name}>
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 font-semibold text-navy">{t.name}</h3>
                <p className="text-xs text-muted">{t.type}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
