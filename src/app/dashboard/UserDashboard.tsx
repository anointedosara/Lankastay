"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardShell, { type NavItem } from "@/components/dashboard/DashboardShell";
import DashboardBookings, { type Booking } from "@/components/dashboard/DashboardBookings";
import SectionPlaceholder from "@/components/dashboard/SectionPlaceholder";
import ProfileForm from "@/components/dashboard/ProfileForm";
import {
  CommandIcon,
  BookingIcon,
  RefundIcon,
  MessageIcon,
  HelpIcon,
  SettingIcon,
} from "@/components/dashboard/icons";
import { useSession } from "@/hooks/useSession";
import { hotels } from "@/lib/hotels";

const nav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: CommandIcon },
  { key: "bookings", label: "Bookings", icon: BookingIcon },
  { key: "refunds", label: "Refunds", icon: RefundIcon },
  { divider: true },
  { key: "message", label: "Message", icon: MessageIcon },
  { key: "help", label: "Help", icon: HelpIcon },
  { key: "setting", label: "Setting", icon: SettingIcon },
];

function addressFor(location: string) {
  const city = location.split(",")[0];
  return `${city} to Colombo Road 245, Main Street, ${city}.`;
}

export default function UserDashboard() {
  const { account, ready, refresh } = useSession();
  const router = useRouter();
  const [section, setSection] = useState("bookings");

  const seed: Booking[] = useMemo(() => {
    const picks = [hotels[0], hotels[5], hotels[8]];
    return picks.map((h, i) => ({
      id: `seed-${i}`,
      hotelSlug: h.slug,
      name: h.name,
      location: h.location,
      image: h.image,
      price: h.price,
      dates: ["20 Jan - 22 Jan", "5 Feb - 9 Feb", "14 Mar - 17 Mar"][i],
      days: [2, 4, 3][i],
      address: addressFor(h.location),
      status: i === 2 ? "Pending" : "Confirmed",
    }));
  }, []);

  if (!ready) return null;

  if (!account) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-panel px-6 text-center">
        <h1 className="text-xl font-bold text-navy">Please log in to view your dashboard</h1>
        <Link href="/login" className="rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand">
          Go to Login
        </Link>
      </div>
    );
  }

  const firstName = account.name.split(" ")[0] || "there";

  return (
    <DashboardShell
      nav={nav}
      activeKey={section}
      onNavigate={setSection}
      greeting={firstName}
      userName={account.name}
      userRole="User"
    >
      {section === "bookings" && <DashboardBookings accountId={account.id} seed={seed} />}
      {section === "dashboard" && (
        <SectionPlaceholder
          title={`Welcome back, ${firstName}!`}
          description="Use the Bookings tab to manage your trips, or update your details under Setting."
        />
      )}
      {section === "refunds" && (
        <SectionPlaceholder title="Refunds" description="You have no refund requests." />
      )}
      {section === "message" && (
        <SectionPlaceholder title="Messages" description="No new messages." />
      )}
      {section === "help" && (
        <SectionPlaceholder title="Help Center" description="Reach us anytime at hello@lankastay.com." />
      )}
      {section === "setting" && <ProfileForm account={account} onSaved={refresh} />}
    </DashboardShell>
  );
}
