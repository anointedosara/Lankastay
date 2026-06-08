import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSearch from "@/components/HeroSearch";
import HotelGridCard from "@/components/HotelGridCard";
import { CustomHotelsSection } from "@/components/CustomHotels";
import {
  mostPicked,
  popular,
  allHotels,
  filterHotels,
  type Hotel,
  type HotelFilters,
} from "@/lib/hotels";

const locations = Array.from(new Set(allHotels.map((h) => h.location))).sort();

const stats = [
  { icon: "/icons/ic_traveler.png", value: "2500", label: "Users" },
  { icon: "/icons/ic_treasure.png", value: "200", label: "treasure" },
  { icon: "/icons/ic_cities.png", value: "100", label: "cities" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    guests?: string;
    persons?: string;
    date?: string;
  }>;
}) {
  const sp = await searchParams;
  const filters: HotelFilters = {
    location: sp.location,
    guests: Number(sp.guests ?? sp.persons) || undefined,
  };
  const searching = Boolean(filters.location || filters.guests);
  const results = searching ? filterHotels(filters) : [];

  return (
    <>
      <SiteHeader active="Home" />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="font-sans text-4xl font-bold leading-tight text-navy sm:text-5xl">
              Forget Busy Work,
              <br />
              Start Next Vacation
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              We provide what you need to enjoy your holiday with family. Time to
              make another memorable moments.
            </p>
            <Link
              href="/rooms"
              className="mt-7 inline-block rounded-md bg-royal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Show More
            </Link>

            <div className="mt-12 flex gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <Image src={s.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                  <p className="mt-2 text-sm">
                    <span className="font-bold text-navy">{s.value}</span>{" "}
                    <span className="text-muted">{s.label}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-3">
            <div className="absolute bottom-0 right-0 hidden h-[88%] w-[88%] rounded-3xl border border-line bg-white lg:block" />
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/hero.jpg"
                alt="A bright, sunlit hotel room with mountain views"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                preload
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Search bar */}
        <HeroSearch
          locations={locations}
          basePath="/"
          initial={{ location: sp.location, guests: filters.guests, date: sp.date }}
        />

        <span id="results" />

        {searching ? (
          /* Search results — rendered right here on the home page */
          <section className="py-16">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-navy">Search Results</h2>
              <p className="text-sm text-muted">
                {results.length} hotel{results.length === 1 ? "" : "s"}
                {filters.location && ` in ${filters.location}`}
                {filters.guests && ` · ${filters.guests}+ guests`}
              </p>
              <Link
                href="/"
                className="rounded-full border border-line px-3 py-1 text-xs font-medium text-gray hover:text-navy"
              >
                Clear ✕
              </Link>
            </div>
            {results.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted">
                No hotels match your search.{" "}
                <Link href="/" className="text-brand underline">
                  Reset
                </Link>
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 min-[500px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {results.map((hotel) => (
                  <HotelGridCard key={hotel.slug} hotel={hotel} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Most Picked */}
            <section id="most-picked" className="py-16">
              <h2 className="mb-6 text-xl font-semibold text-navy">Most Picked</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <FeaturedCard hotel={mostPicked[0]} className="md:row-span-2 md:h-full" tall />
                {mostPicked.slice(1).map((hotel) => (
                  <FeaturedCard key={hotel.slug} hotel={hotel} />
                ))}
              </div>
            </section>

            {/* Popular */}
            <section id="popular" className="pt-10">
              <div className="grid grid-cols-1 gap-6 min-[500px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {popular.map((hotel) => (
                  <PopularCard key={hotel.slug} hotel={hotel} />
                ))}
              </div>
            </section>

            {/* Owner-published listings (from localStorage) */}
            <div className="pt-16">
              <CustomHotelsSection />
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

function FeaturedCard({
  hotel,
  className = "",
  tall,
}: {
  hotel: Hotel;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/hotel/${hotel.slug}`}
      className={`group relative block overflow-hidden rounded-2xl ${tall ? "min-h-[320px]" : "min-h-[230px]"} ${className}`}
    >
      <Image
        src={hotel.image}
        alt={hotel.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

      <span className="absolute right-0 top-4 rounded-l-full bg-royal px-4 py-1.5 text-xs font-medium text-white">
        <span className="font-semibold">${hotel.price}</span> per night
      </span>

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-base font-semibold drop-shadow">{hotel.name}</h3>
        <p className="text-xs text-white/85">{hotel.location}</p>
      </div>
    </Link>
  );
}

function PopularCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link href={`/hotel/${hotel.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hotel.badge && (
          <span className="absolute right-0 top-3 rounded-l-full bg-royal px-3 py-1 text-xs text-white">
            <span className="font-semibold">Popular</span> {hotel.badge.replace("Popular ", "")}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-navy">{hotel.name}</h3>
      <p className="text-xs text-muted">{hotel.location}</p>
    </Link>
  );
}
