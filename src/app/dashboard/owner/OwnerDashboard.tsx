"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardShell, { type NavItem } from "@/components/dashboard/DashboardShell";
import OwnerListings from "@/components/dashboard/OwnerListings";
import SectionPlaceholder from "@/components/dashboard/SectionPlaceholder";
import ProfileForm from "@/components/dashboard/ProfileForm";
import {
  CommandIcon,
  BarsIcon,
  BookingIcon,
  PhotosIcon,
  RefundIcon,
  MessageIcon,
  HelpIcon,
  SettingIcon,
} from "@/components/dashboard/icons";
import { useSession } from "@/hooks/useSession";

const nav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: CommandIcon },
  { key: "objectives", label: "Objectives", icon: BarsIcon },
  { key: "bookings", label: "Bookings", icon: BookingIcon },
  { key: "photos", label: "Photos", icon: PhotosIcon },
  { key: "refunds", label: "Refunds", icon: RefundIcon },
  { divider: true },
  { key: "message", label: "Message", icon: MessageIcon },
  { key: "help", label: "Help", icon: HelpIcon },
  { key: "setting", label: "Setting", icon: SettingIcon },
];

export default function OwnerDashboard() {
  const { account, ready, refresh } = useSession();
  const [section, setSection] = useState("bookings");

  if (!ready) return null;

  if (!account) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-panel px-6 text-center">
        <h1 className="text-xl font-bold text-navy">Please log in as a hotel owner</h1>
        <Link href="/login" className="rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand">
          Go to Login
        </Link>
      </div>
    );
  }

  const firstName = account.name.split(" ")[0] || "Owner";

  return (
    <DashboardShell
      nav={nav}
      activeKey={section}
      onNavigate={setSection}
      greeting="Hotel Owner"
      userName={account.name}
      userRole="Hotel Owner"
    >
      {section === "bookings" && <OwnerListings ownerId={account.id} />}
      {section === "dashboard" && (
        <SectionPlaceholder
          title={`Welcome, ${firstName}`}
          description="Manage your hotels and rooms under the Bookings tab. New listings show up on the public site instantly."
        />
      )}
      {section === "objectives" && <SectionPlaceholder title="Objectives" />}
      {section === "photos" && <SectionPlaceholder title="Photos" description="Photos you upload with listings appear here." />}
      {section === "refunds" && <SectionPlaceholder title="Refunds" description="No refund requests." />}
      {section === "message" && <SectionPlaceholder title="Messages" description="No new messages." />}
      {section === "help" && <SectionPlaceholder title="Help Center" description="Reach us at hello@lankastay.com." />}
      {section === "setting" && <ProfileForm account={account} onSaved={refresh} />}
    </DashboardShell>
  );
}
