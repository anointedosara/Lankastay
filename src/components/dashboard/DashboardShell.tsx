"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import Logo from "@/components/Logo";
import { clearSession } from "@/lib/store";
import { BellIcon, ChevronDown } from "./icons";

export type NavItem =
  | { divider: true }
  | {
      key: string;
      label: string;
      icon: ComponentType<{ className?: string }>;
    };

export default function DashboardShell({
  nav,
  activeKey,
  onNavigate,
  greeting,
  userName,
  userRole,
  avatarSrc,
  children,
}: {
  nav: NavItem[];
  activeKey: string;
  onNavigate: (key: string) => void;
  greeting: string;
  userName: string;
  userRole: string;
  avatarSrc?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  function logout() {
    clearSession();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-panel">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white px-6 py-7 lg:flex">
        <Logo className="text-2xl" />
        <nav className="mt-12 space-y-1">
          {nav.map((item, i) =>
            "divider" in item ? (
              <div key={i} className="my-3 border-t border-line" />
            ) : (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  item.key === activeKey
                    ? "font-semibold text-brand"
                    : "text-gray hover:bg-panel hover:text-navy"
                }`}
              >
                <item.icon />
                {item.label}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main column */}
      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <div>
            <h1 className="text-lg font-bold text-navy">Hello, {greeting}</h1>
            <p className="text-sm text-muted">Have a nice day</p>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-navy" aria-label="Notifications">
              <BellIcon />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand" />
            </button>
            <div className="h-8 w-px bg-line" />
            <div className="flex items-center gap-3">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={userName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tint text-sm font-semibold text-brand">
                  {initials(userName)}
                </span>
              )}
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-navy">{userName}</p>
                <p className="text-xs text-muted">{userRole}</p>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="text-muted transition-colors hover:text-danger"
                aria-label="Log out"
              >
                <ChevronDown />
              </button>
            </div>
          </div>
        </header>

        <main className="px-6 pb-12 sm:px-10">{children}</main>
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
