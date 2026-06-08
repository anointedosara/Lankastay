"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "@/hooks/useSession";

type NavItem = { label: string; href: string };

export default function MobileNav({
  nav,
  active,
}: {
  nav: NavItem[];
  active: string;
}) {
  const [open, setOpen] = useState(false);
  const { account } = useSession();

  const dashboard = account?.role === "owner" ? "/dashboard/owner" : "/dashboard";

  // Lock the page behind the full-screen menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Toggle */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-md text-navy transition-colors hover:bg-tint"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <Logo className="text-xl" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-navy transition-colors hover:bg-tint"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* key forces the stagger animation to replay each time it opens */}
        <nav key={open ? "open" : "closed"} className="flex flex-1 flex-col px-6 py-8">
          {nav.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`${open ? "animate-item" : "opacity-0"} border-b border-line/70 py-4 text-lg ${
                item.label === active
                  ? "font-semibold text-brand"
                  : "text-navy transition-colors hover:text-brand"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Auth lives inside the menu on mobile */}
          <div
            style={{ animationDelay: `${nav.length * 70}ms` }}
            className={`mt-8 ${open ? "animate-item" : "opacity-0"}`}
          >
            {account ? (
              <Link
                href={dashboard}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-line p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {initials(account.name)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-navy">{account.name}</span>
                  <span className="block text-xs text-muted">
                    {account.role === "owner" ? "Hotel Owner" : "My account"}
                  </span>
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-royal py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-brand"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
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
