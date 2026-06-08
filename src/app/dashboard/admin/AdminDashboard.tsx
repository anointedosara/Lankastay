"use client";

import { useEffect, useState } from "react";
import DashboardShell, { type NavItem } from "@/components/dashboard/DashboardShell";
import AdminOwners, { type Owner } from "@/components/dashboard/AdminOwners";
import SectionPlaceholder from "@/components/dashboard/SectionPlaceholder";
import {
  CommandIcon,
  BarsIcon,
  DocIcon,
  PhotosIcon,
  RefundIcon,
  MessageIcon,
  HelpIcon,
  SettingIcon,
} from "@/components/dashboard/icons";
import { listAccounts, type Account } from "@/lib/store";

const nav: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: CommandIcon },
  { key: "users", label: "Users", icon: BarsIcon },
  { key: "owners", label: "Hotel Owners", icon: DocIcon },
  { key: "bookings", label: "Booking Details", icon: PhotosIcon },
  { key: "refund", label: "Refund", icon: RefundIcon },
  { divider: true },
  { key: "message", label: "Message", icon: MessageIcon },
  { key: "help", label: "Help", icon: HelpIcon },
  { key: "setting", label: "Setting", icon: SettingIcon },
];

export default function AdminDashboard({ initialOwners }: { initialOwners: Owner[] }) {
  const [section, setSection] = useState("dashboard");

  return (
    <DashboardShell
      nav={nav}
      activeKey={section}
      onNavigate={setSection}
      greeting="Salman"
      userName="Salman Faris"
      userRole="Admin"
    >
      {(section === "dashboard" || section === "owners") && <AdminOwners initial={initialOwners} />}
      {section === "users" && <RegisteredUsers />}
      {section === "bookings" && <SectionPlaceholder title="Booking Details" description="Platform-wide bookings appear here." />}
      {section === "refund" && <SectionPlaceholder title="Refund" description="No refund requests." />}
      {section === "message" && <SectionPlaceholder title="Messages" description="No new messages." />}
      {section === "help" && <SectionPlaceholder title="Help Center" />}
      {section === "setting" && <SectionPlaceholder title="Settings" />}
    </DashboardShell>
  );
}

function RegisteredUsers() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => setAccounts(listAccounts()), []);

  return (
    <>
      <h2 className="text-xl font-bold text-brand">Registered Users</h2>
      <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
        <h3 className="px-6 py-5 font-semibold text-navy">
          Accounts <span className="text-sm font-normal text-muted">({accounts.length})</span>
        </h3>
        {accounts.length === 0 ? (
          <p className="px-6 pb-8 text-sm text-muted">
            No accounts registered on this device yet. Sign up via Login → Create Account.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="bg-table-head text-sm text-gray">
                  <th className="py-3 pl-6 font-medium">Name</th>
                  <th className="py-3 font-medium">Email</th>
                  <th className="py-3 font-medium">Username</th>
                  <th className="py-3 pr-6 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.id} className="border-b border-line last:border-0">
                    <td className="py-4 pl-6 text-sm font-semibold text-navy">{a.name}</td>
                    <td className="py-4 text-sm text-muted">{a.email}</td>
                    <td className="py-4 text-sm text-navy">{a.username}</td>
                    <td className="py-4 pr-6">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${a.role === "owner" ? "bg-sky text-white" : "bg-tint text-brand"}`}>
                        {a.role === "owner" ? "Hotel Owner" : "User"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
