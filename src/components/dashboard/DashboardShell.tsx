"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  function logout() {
    clearSession();
    router.push("/login");
  }

  function navigate(key: string) {
    onNavigate(key);
    setDrawerOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-panel">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white px-6 py-7 lg:flex">
        <Logo className="text-2xl" />
        <NavList nav={nav} activeKey={activeKey} onSelect={navigate} className="mt-12" />
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-72 flex-col bg-white px-6 py-7 shadow-xl transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo className="text-2xl" />
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-md text-navy hover:bg-tint"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <NavList nav={nav} activeKey={activeKey} onSelect={navigate} className="mt-8" />
        </aside>
      </div>

      {/* Main column */}
      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-navy hover:bg-white lg:hidden"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-navy">Hello, {greeting}</h1>
              <p className="text-sm text-muted">Have a nice day</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-navy" aria-label="Notifications">
              <BellIcon />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand" />
            </button>
            <div className="hidden h-8 w-px bg-line sm:block" />
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

function NavList({
  nav,
  activeKey,
  onSelect,
  className = "",
}: {
  nav: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}) {
  return (
    <nav className={`space-y-1 ${className}`}>
      {nav.map((item, i) =>
        "divider" in item ? (
          <div key={i} className="my-3 border-t border-line" />
        ) : (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
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
