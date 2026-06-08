import Link from "next/link";
import type { Metadata } from "next";
import AuthField from "@/components/auth/AuthField";
import AuthForm from "@/components/auth/AuthForm";
import AuthImagePanel from "@/components/auth/AuthImagePanel";

export const metadata: Metadata = { title: "Create Account — LankaStay" };

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthImagePanel />

      <div className="flex items-center justify-center bg-panel px-6 py-12">
        <AuthForm mode="register" redirectTo="/register/success" className="w-full max-w-md space-y-5">
          <h1 className="text-center text-3xl font-bold text-ink">Create Account</h1>

          <AuthField name="name" label="Name" placeholder="Enter your name" />
          <AuthField name="email" label="E mail" placeholder="name@gmail.com" type="email" />
          <AuthField name="phone" label="Phone No" placeholder="With Country Code" />
          <AuthField name="country" label="Country" placeholder="Country Name" />
          <AuthField name="username" label="Username" placeholder="Username" />
          <AuthField name="password" label="Password" placeholder="6+ characters" type="password" minLength={6} />

          <p className="text-xs text-ink">
            By signing up you agree to{" "}
            <span className="text-brand">terms and conditions</span> at zoho.
          </p>

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
        </AuthForm>
      </div>
    </main>
  );
}
