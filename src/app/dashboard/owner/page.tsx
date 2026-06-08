import type { Metadata } from "next";
import OwnerDashboard from "./OwnerDashboard";

export const metadata: Metadata = { title: "Hotel Owner Dashboard — LankaStay" };

export default function OwnerDashboardPage() {
  return <OwnerDashboard />;
}
