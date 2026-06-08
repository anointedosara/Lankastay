"use client";

import Link from "next/link";
import { useSession } from "@/hooks/useSession";

export default function HeaderAuth() {
  const { account, ready } = useSession();

  if (!ready || !account) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
      >
        Login
      </Link>
    );
  }

  const dashboard = account.role === "owner" ? "/dashboard/owner" : "/dashboard";
  const firstName = account.name.split(" ")[0] || "Account";

  return (
    <Link
      href={dashboard}
      className="flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-1.5 pr-4 transition-colors hover:border-brand"
      title="Go to your dashboard"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
        {initials(account.name)}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-sm font-semibold text-navy">{firstName}</span>
        <span className="block text-[11px] text-muted">
          {account.role === "owner" ? "Hotel Owner" : "My account"}
        </span>
      </span>
    </Link>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
