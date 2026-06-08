"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import type { Hotel } from "@/lib/hotels";
import { getCurrentAccount, createAccount, setSession, addBooking } from "@/lib/store";

type Step = 1 | 2 | 3;

export default function BookingFlow({ hotel }: { hotel: Hotel }) {
  const [step, setStep] = useState<Step>(1);
  const [days, setDays] = useState(2);
  const [checkIn, setCheckIn] = useState("2026-01-20");

  const total = hotel.price * days;
  const initial = Math.round(total / 2);

  const checkInDate = parseISO(checkIn);
  const checkOutDate = addDays(checkInDate, days);
  const rangeLabel = `${formatDay(checkInDate)} - ${formatDay(checkOutDate)}`;

  function completeBooking() {
    let account = getCurrentAccount();
    if (!account) {
      account = createAccount({
        role: "user",
        name: "Guest",
        email: "guest@lankastay.com",
        username: `guest-${Date.now()}`,
        password: "",
      });
      setSession(account.id);
    }
    const city = hotel.location.split(",")[0];
    addBooking(account.id, {
      hotelSlug: hotel.slug,
      name: hotel.name,
      location: hotel.location,
      image: hotel.image,
      price: hotel.price,
      dates: rangeLabel,
      days,
      address: `${city} to Colombo Road 245, Main Street, ${city}.`,
      status: "Confirmed",
    });
    setStep(3);
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-5">
          <Logo className="text-xl" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <Stepper step={step} />

        {step === 1 && (
          <StepInformation
            hotel={hotel}
            days={days}
            total={total}
            checkIn={checkIn}
            rangeLabel={rangeLabel}
            onCheckIn={setCheckIn}
            onInc={() => setDays((d) => d + 1)}
            onDec={() => setDays((d) => Math.max(1, d - 1))}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepPayment
            hotel={hotel}
            days={days}
            total={total}
            initial={initial}
            rangeLabel={rangeLabel}
            onPay={completeBooking}
            onCancel={() => setStep(1)}
          />
        )}

        {step === 3 && <StepCompleted href="/dashboard" />}
      </main>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const items = [1, 2, 3];
  return (
    <div className="mb-10 flex items-center justify-center">
      {items.map((n, i) => {
        const done = n < step;
        const active = n === step;
        return (
          <div key={n} className="flex items-center">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                done || active ? "bg-success text-white" : "bg-line text-gray"
              }`}
            >
              {done ? <CheckIcon /> : n}
            </div>
            {i < items.length - 1 && (
              <div className={`h-px w-16 ${n < step ? "bg-success" : "bg-line"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepInformation({
  hotel,
  days,
  total,
  checkIn,
  rangeLabel,
  onCheckIn,
  onInc,
  onDec,
  onNext,
}: {
  hotel: Hotel;
  days: number;
  total: number;
  checkIn: string;
  rangeLabel: string;
  onCheckIn: (value: string) => void;
  onInc: () => void;
  onDec: () => void;
  onNext: () => void;
}) {
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy">Booking Information</h1>
        <p className="mt-2 text-sm text-muted">Please fill up the blank fields below</p>
      </div>

      <div className="mt-10 grid items-center gap-8 sm:grid-cols-2">
        <div>
          <div className="relative aspect-4/3 overflow-hidden rounded-xl">
            <Image src={hotel.image} alt={hotel.name} fill sizes="320px" className="object-cover" />
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <h2 className="font-semibold text-navy">{hotel.name}</h2>
            <span className="text-xs text-muted">{hotel.location}</span>
          </div>
        </div>

        <div className="sm:border-l sm:border-line sm:pl-8">
          <p className="text-sm font-medium text-navy">How long you will stay?</p>
          <div className="mt-3 flex items-stretch overflow-hidden rounded-md">
            <button
              onClick={onDec}
              aria-label="Decrease days"
              className="flex w-12 items-center justify-center bg-danger text-xl font-bold text-white"
            >
              −
            </button>
            <span className="flex flex-1 items-center justify-center bg-panel py-3 text-sm font-medium text-navy">
              {days} Days
            </span>
            <button
              onClick={onInc}
              aria-label="Increase days"
              className="flex w-12 items-center justify-center bg-success text-xl font-bold text-white"
            >
              +
            </button>
          </div>

          <p className="mt-6 text-sm font-medium text-navy">Pick a Date</p>
          <button
            type="button"
            onClick={() => dateRef.current?.showPicker?.() ?? dateRef.current?.focus()}
            className="relative mt-3 flex w-full items-center gap-3 rounded-md text-left"
          >
            <span className="flex h-11 w-12 items-center justify-center rounded-md bg-navy text-white">
              <CalendarIcon />
            </span>
            <span className="flex-1 rounded-md bg-panel px-4 py-3 text-sm text-navy">
              {rangeLabel}
            </span>
            <input
              ref={dateRef}
              type="date"
              value={checkIn}
              onChange={(e) => onCheckIn(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </button>
          <p className="mt-2 text-xs text-muted">
            Check-in date · {days} night{days > 1 ? "s" : ""} stay
          </p>

          <p className="mt-6 text-sm text-muted">
            You will pay <span className="font-bold text-navy">${total} USD</span> per{" "}
            <span className="font-bold text-navy">{days} Days</span>
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3">
        <button
          onClick={onNext}
          className="w-full max-w-sm rounded-md bg-royal py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
        >
          Book Now
        </button>
        <Link
          href={`/hotel/${hotel.slug}`}
          className="w-full max-w-sm rounded-md bg-panel py-3.5 text-center text-sm font-medium text-gray transition-colors hover:bg-line"
        >
          Cancel
        </Link>
      </div>
    </>
  );
}

function StepPayment({
  hotel,
  days,
  total,
  initial,
  rangeLabel,
  onPay,
  onCancel,
}: {
  hotel: Hotel;
  days: number;
  total: number;
  initial: number;
  rangeLabel: string;
  onPay: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy">Payment</h1>
        <p className="mt-2 text-sm text-muted">Kindly follow the instructions below</p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="space-y-5 text-navy">
          <p className="text-lg font-semibold">Transfer LankaStay:</p>
          <p className="text-lg font-semibold leading-relaxed">
            {days} Days at {hotel.name}, {hotel.location}
          </p>
          <p className="text-sm text-muted">{rangeLabel}</p>
          <p className="text-lg font-semibold">
            Total: <span className="font-bold">${total} USD</span>
          </p>
          <p className="text-lg font-semibold">
            Initial Payment: <span className="font-bold">${initial}</span>
          </p>
        </div>

        <form
          id="payment-form"
          className="space-y-4 sm:border-l sm:border-line sm:pl-8"
          onSubmit={(e) => {
            e.preventDefault();
            onPay();
          }}
        >
          <Field label="Card Number" placeholder="Payment card number" />
          <Field label="Bank" placeholder="Select Bank" />
          <Field label="Exp Date" placeholder="Validation date" />
          <Field label="CVV" placeholder="Beside the card" />
        </form>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3">
        <button
          type="submit"
          form="payment-form"
          className="w-full max-w-sm rounded-md bg-royal py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
        >
          Pay Now
        </button>
        <button
          onClick={onCancel}
          className="w-full max-w-sm rounded-md bg-panel py-3.5 text-sm font-medium text-gray transition-colors hover:bg-line"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

function StepCompleted({ href }: { href: string }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-navy">Yay! Payment Completed</h1>
      <div className="mx-auto my-8 max-w-xs">
        <Image
          src="/images/group-1-1.png"
          alt="Payment completed"
          width={420}
          height={380}
          className="mx-auto h-auto w-full"
        />
      </div>
      <p className="text-sm leading-relaxed text-brand">
        Please check your email &amp; phone Message.
        <br />
        We have sent all the Information
      </p>
      <Link href={href} className="mt-8 inline-block text-sm text-muted hover:text-navy">
        Go to Dashboard
      </Link>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-navy">{label}</label>
      <input
        type="text"
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-md bg-panel px-4 py-3 text-sm text-navy outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/40"
      />
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function formatDay(date: Date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path d="M5 10.5L8.5 14L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
