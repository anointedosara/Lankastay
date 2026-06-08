import type { Metadata } from "next";
import AuthSuccess from "@/components/auth/AuthSuccess";

export const metadata: Metadata = { title: "Account Created — LankaStay" };

export default function RegisterSuccessPage() {
  return (
    <AuthSuccess
      showLogo
      title="Account Created Successfull"
      subtitle="Please Check Your Email"
      buttonLabel="Book Now"
      buttonHref="/hotels"
    />
  );
}
