"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, findByLogin, setSession } from "@/lib/store";

type Mode = "register" | "owner" | "login";

/**
 * Wraps auth fields in a real form. Native `required` validation blocks
 * submission when a field is empty; on a valid submit we persist to
 * localStorage (register/owner) or validate credentials (login), set the
 * session, then navigate.
 */
export default function AuthForm({
  mode,
  redirectTo,
  className,
  children,
}: {
  mode: Mode;
  redirectTo: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    if (mode === "login") {
      const account = findByLogin(get("username"), get("password"));
      if (!account) {
        setError("No account found with those credentials. Please register first.");
        return;
      }
      setSession(account.id);
      router.push(account.role === "owner" ? "/dashboard/owner" : "/dashboard");
      return;
    }

    if (mode === "register") {
      const account = createAccount({
        role: "user",
        name: get("name"),
        email: get("email"),
        username: get("username"),
        password: get("password"),
        phone: get("phone"),
        country: get("country"),
      });
      setSession(account.id);
    } else {
      // owner
      const account = createAccount({
        role: "owner",
        name: get("name"),
        email: get("email"),
        username: get("username"),
        password: get("password"),
        phone: get("phone"),
        country: get("country"),
        nic: get("nic"),
        hotelName: get("hotelName"),
        registrationNo: get("registrationNo"),
        address: get("address"),
        facilities: get("facilities"),
      });
      setSession(account.id);
    }
    router.push(redirectTo);
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
      {error && (
        <p className="rounded-md bg-danger/10 px-4 py-2 text-center text-sm text-danger">{error}</p>
      )}
    </form>
  );
}
