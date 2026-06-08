import Link from "next/link";
import type { Metadata } from "next";
import AuthField from "@/components/auth/AuthField";
import AuthForm from "@/components/auth/AuthForm";
import AuthImagePanel from "@/components/auth/AuthImagePanel";

export const metadata: Metadata = { title: "Login — LankaStay" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthImagePanel className="order-1" />

      <div className="order-2 flex items-center justify-center bg-panel px-6 py-12">
        <AuthForm mode="login" redirectTo="/dashboard" className="w-full max-w-md space-y-6">
          <h1 className="text-center text-3xl font-bold text-ink">Login Account</h1>

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
            Login
          </button>

          <p className="text-center">
            <Link href="/register" className="text-sm font-medium text-ink underline">
              Create Account
            </Link>
          </p>
        </AuthForm>
      </div>
    </main>
  );
}
