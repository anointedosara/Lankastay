import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hotels, getHotel } from "@/lib/hotels";
import BookingFlow from "./BookingFlow";

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
  return { title: hotel ? `Book ${hotel.name} — LankaStay` : "Booking — LankaStay" };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) notFound();

  return <BookingFlow hotel={hotel} />;
}
