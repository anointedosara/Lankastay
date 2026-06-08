import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import AuthField from "@/components/auth/AuthField";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Register Your Hotel — LankaStay" };

export default function RegisterHotelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-panel px-6 py-12">
      <AuthForm mode="owner" redirectTo="/register-hotel/success" className="w-full max-w-4xl">
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {/* Owner details */}
          <div className="space-y-5 md:border-r md:border-line md:pr-12">
            <Logo className="text-3xl" />
            <AuthField name="name" label="Name" placeholder="Enter your name" />
            <AuthField name="email" label="E mail" placeholder="name@gmail.com" type="email" />
            <AuthField name="phone" label="Phone No" placeholder="With Country Code" />
            <AuthField name="country" label="Country" placeholder="Country Name" />
            <AuthField name="nic" label="Nic" placeholder="National Identity Card" />
            <AuthField name="username" label="Username" placeholder="Username" />
            <AuthField name="password" label="Password" placeholder="6+ characters" type="password" minLength={6} />
          </div>

          {/* Hotel details */}
          <div className="space-y-5">
            <h1 className="text-center text-3xl font-bold text-ink">Register Your Hotel</h1>
            <AuthField name="hotelName" label="Hotel Name" placeholder="Full Name" />
            <AuthField name="registrationNo" label="Registration No" placeholder="PVT(Ltd)" />
            <AuthField name="address" label="Address" placeholder="Location" />
            <AuthField name="images" label="Upload Images" placeholder="Upload" required={false} />
            <AuthField name="documents" label="Upload Documents" placeholder="Upload" required={false} />
            <AuthField name="facilities" label="Facilities" placeholder="Describe" />

            <button
              type="submit"
              className="block w-full rounded-lg bg-royal py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-brand"
            >
              Register
            </button>
            <p className="text-center">
              <Link href="/login" className="text-sm font-medium text-ink underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </AuthForm>
    </main>
  );
}
