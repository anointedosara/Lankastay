import type { Metadata } from "next";
import UserDashboard from "./UserDashboard";

export const metadata: Metadata = { title: "Dashboard — LankaStay" };

export default function DashboardPage() {
  return <UserDashboard />;
}
