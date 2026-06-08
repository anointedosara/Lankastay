import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo className="text-xl" />
            <p className="mt-3 text-sm text-muted">
              We kaboom your beauty holiday instantly and memorable.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-navy">Become hotel Owner</h4>
            <Link
              href="/register-hotel"
              className="mt-4 inline-block rounded-md bg-royal px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-royal py-3 text-center text-xs text-white/90">
        Copyright 2024 • All rights reserved • Salman Faris
      </div>
    </footer>
  );
}
