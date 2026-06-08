import type { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";
import type { Owner } from "@/components/dashboard/AdminOwners";

export const metadata: Metadata = { title: "Admin Dashboard — LankaStay" };

const initialOwners: Owner[] = [
  { id: "1", name: "David Wagner", email: "david_wagner@example.com", role: "Super Admin", date: "24 Jun, 2023" },
  { id: "2", name: "Ina Hogan", email: "windler.warren@runte.net", role: "Owner", date: "24 Aug, 2023" },
  { id: "3", name: "Devin Harmon", email: "wintheiser_enos@yahoo.com", role: "Owner", date: "18 Dec, 2023" },
  { id: "4", name: "Lena Page", email: "camila_ledner@gmail.com", role: "Pending", date: "8 Oct, 2023" },
  { id: "5", name: "Eula Horton", email: "edula_dorton1221@gmail.com", role: "Owner", date: "15 Jun, 2023" },
  { id: "6", name: "Victoria Perez", email: "terrill.wiza@hotmail.com", role: "Owner", date: "12 July, 2023" },
  { id: "7", name: "Cora Medina", email: "hagenes.isai@hotmail.com", role: "Pending", date: "21 July, 2023" },
  { id: "8", name: "Marcus Lee", email: "marcus.lee@example.com", role: "Owner", date: "2 Aug, 2023" },
  { id: "9", name: "Priya Nair", email: "priya.nair@example.com", role: "Owner", date: "9 Sep, 2023" },
  { id: "10", name: "Tom Baker", email: "tom.baker@example.com", role: "Pending", date: "30 Sep, 2023" },
];

export default function AdminDashboardPage() {
  return <AdminDashboard initialOwners={initialOwners} />;
}
