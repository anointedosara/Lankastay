import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "About — LankaStay",
  description: "Learn about LankaStay and our mission to make holidays memorable.",
};

const stats = [
  { value: "2,500+", label: "Happy Travelers" },
  { value: "200+", label: "Curated Stays" },
  { value: "100+", label: "Cities Covered" },
  { value: "4.9", label: "Average Rating" },
];

const testimonials = [
  {
    quote:
      "Booking took less than five minutes and the villa was even better than the photos. LankaStay made our family trip to Galle completely stress-free.",
    name: "Amara Perera",
    role: "Family traveler",
    initials: "AP",
    color: "bg-brand",
  },
  {
    quote:
      "I travel for work constantly and this is now my go-to for Sri Lanka. Honest pricing, great stays, and support actually answered at 2am.",
    name: "Daniel Fernando",
    role: "Business traveler",
    initials: "DF",
    color: "bg-success",
  },
  {
    quote:
      "The hilltop cabin in Ella was magical. Every detail was exactly as described — we'll be back for our anniversary next year.",
    name: "Nethmi Silva",
    role: "Couple getaway",
    initials: "NS",
    color: "bg-sky",
  },
];

const values = [
  {
    title: "Handpicked Stays",
    body: "Every property is personally reviewed so you only ever see places worth staying in.",
  },
  {
    title: "Best Price Promise",
    body: "Transparent pricing with no hidden fees — what you see is what you pay.",
  },
  {
    title: "24/7 Support",
    body: "Our team is on hand around the clock, from your first search to checkout.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="About" />
      <PageBanner
        title="About LankaStay"
        subtitle="We kaboom your beauty holiday instantly and memorable."
        crumb="About"
      />

      <main className="mx-auto max-w-6xl px-6">
        {/* Story */}
        <section className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/image-5.png"
              alt="Hillside eco lodges in Sri Lanka"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Holidays that feel effortless
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              LankaStay began with a simple idea: booking a memorable holiday in Sri
              Lanka should be quick, honest, and a little bit delightful. We bring
              together the island&apos;s most loved villas, cabins, and beachfront
              hideaways in one place.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              From the tea hills of Nuwara Eliya to the beaches of Mirissa, we help you
              find the right stay for family trips, getaways, and everything in between —
              then get you booked in just a few taps.
            </p>
            <Link
              href="/hotels"
              className="mt-7 inline-block rounded-md bg-royal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Explore Hotels
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-6 rounded-3xl bg-tint px-8 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-brand">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Values */}
        <section className="py-16">
          <h2 className="text-center text-2xl font-bold text-navy">Why travelers choose us</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line p-7">
                <h3 className="font-semibold text-navy">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="pb-16">
          <h2 className="text-center text-2xl font-bold text-navy">What our guests say</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted">
            Real stays, real stories from travelers across the island.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl border border-line p-7">
                <div className="flex gap-1 text-success" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${t.color}`}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy">{t.name}</span>
                    <span className="block text-xs text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 rounded-3xl bg-navy px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to start your next vacation?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/75">
            Browse handpicked stays and book in minutes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/hotels"
              className="rounded-md bg-royal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Find a Hotel
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-white px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-line"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Star() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" />
    </svg>
  );
}
