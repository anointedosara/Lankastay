import Image from "next/image";
import Link from "next/link";
import { getCapacity, type Hotel } from "@/lib/hotels";

export default function HotelGridCard({ hotel }: { hotel: Hotel }) {
  const cap = getCapacity(hotel);
  return (
    <Link href={`/hotel/${hotel.slug}`} className="group block">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-0 top-3 rounded-l-full bg-royal px-3 py-1 text-xs text-white">
          <span className="font-semibold">${hotel.price}</span> /night
        </span>
        {hotel.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand">
            {hotel.badge}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-navy">{hotel.name}</h3>
      <p className="text-xs text-muted">{hotel.location}</p>
      <p className="mt-1 text-xs text-gray">
        Sleeps {cap.maxGuests} · {cap.bedrooms} room{cap.bedrooms > 1 ? "s" : ""}
        {cap.ac ? " · AC" : ""}
      </p>
    </Link>
  );
}
