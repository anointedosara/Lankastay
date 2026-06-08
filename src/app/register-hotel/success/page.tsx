import type { Metadata } from "next";
import AuthSuccess from "@/components/auth/AuthSuccess";

export const metadata: Metadata = { title: "Hotel Submitted — LankaStay" };

export default function RegisterHotelSuccessPage() {
  return (
    <AuthSuccess
      showLogo
      title="Once we verified, You can Access Dashboard"
      subtitle=""
      buttonLabel="View Dashboard"
      buttonHref="/dashboard/owner"
    />
  );
}
