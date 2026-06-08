import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import { rooms, roomFeatures } from "@/lib/rooms";

export const metadata: Metadata = {
  title: "Rooms — LankaStay",
  description: "Explore room types available across LankaStay hotels.",
};

export default function RoomsPage() {
  return (
    <>
      <SiteHeader active="Rooms" />
      <PageBanner
        title="Our Rooms"
        subtitle="Comfortable, well-equipped rooms for every kind of traveller."
        crumb="Rooms"
      />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <article
              key={room.slug}
              className="overflow-hidden rounded-2xl border border-line transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                {room.badge && (
                  <span className="absolute right-0 top-3 rounded-l-full bg-royal px-3 py-1 text-xs text-white">
                    <span className="font-semibold">Popular</span> Choice
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-navy">{room.name}</h3>
                <p className="text-xs text-muted">{room.hotel}</p>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray">
                  <span>{room.guests} Guests</span>
                  <span className="text-line">|</span>
                  <span>{room.beds} Bed{room.beds > 1 ? "s" : ""}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {roomFeatures.map((f) => (
                    <Image
                      key={f.label}
                      src={f.icon}
                      alt={f.label}
                      title={f.label}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <p className="text-sm">
                    <span className="text-lg font-bold text-navy">${room.price}</span>
                    <span className="text-muted"> /night</span>
                  </p>
                  <Link
                    href={`/hotels?guests=${room.guests}&rooms=${room.beds}&ac=1`}
                    className="rounded-md bg-royal px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
