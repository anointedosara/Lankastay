import Link from "next/link";
import Logo from "./Logo";
import HeaderAuth from "./HeaderAuth";

const nav = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader({ active = "Home" }: { active?: string }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo className="text-xl" />

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.label === active
                  ? "font-medium text-brand"
                  : "text-navy/80 transition-colors hover:text-brand"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderAuth />
      </div>
    </header>
  );
}
