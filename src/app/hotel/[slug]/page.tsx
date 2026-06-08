import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  hotels,
  getHotel,
  amenities,
  gallery,
  treasures,
  aboutText,
} from "@/lib/hotels";

export function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) return { title: "Hotel not found — LankaStay" };
  return {
    title: `${hotel.name} — LankaStay`,
    description: `Book ${hotel.name} in ${hotel.location} from $${hotel.price} per day.`,
  };
}

export default async function HotelDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) notFound();

  return (
    <>
      <SiteHeader active="Hotels" />

      <main className="mx-auto max-w-6xl px-6">
        {/* Title + breadcrumb */}
        <section className="relative py-10 sm:text-center">
          <nav className="mb-4 text-sm text-muted sm:absolute sm:left-0 sm:top-10 sm:mb-0">
            <Link href="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-navy">Hotel Details</span>
          </nav>
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">{hotel.name}</h1>
          <p className="mt-2 text-sm text-muted">{hotel.location}</p>
        </section>

        {/* Gallery */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:aspect-auto">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              preload
              className="object-cover"
            />
          </div>
          <div className="grid gap-5">
            {gallery.slice(1).map((src, i) => (
              <div key={src} className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={`${hotel.name} interior ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* About + Booking */}
        <section className="grid gap-8 py-14 lg:grid-cols-[1fr_360px]">
          <div id="about">
            <h2 className="text-lg font-semibold text-navy">About the place</h2>
            {aboutText.map((p, i) => (
              <p key={i} className="mt-4 text-sm leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>

          <aside className="self-start rounded-2xl border border-line p-7">
            <h3 className="font-semibold text-navy">Start Booking</h3>
            <p className="mt-3 text-2xl font-bold text-success">
              ${hotel.price}{" "}
              <span className="text-base font-normal text-muted">per Day</span>
            </p>
            <Link
              href={`/hotel/${hotel.slug}/book`}
              className="mt-5 block rounded-md bg-royal py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Book Now!
            </Link>
          </aside>
        </section>

        {/* Amenities */}
        <section className="border-t border-line py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
            {amenities.map((a) => (
              <div key={a.label}>
                <Image src={a.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
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
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  {t.badge && (
                    <span className="absolute right-0 top-3 rounded-l-full bg-royal px-3 py-1 text-xs text-white">
                      <span className="font-semibold">Popular</span>{" "}
                      {t.badge.replace("Popular ", "")}
                    </span>
                  )}
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
