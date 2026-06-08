import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthSuccess({
  title,
  subtitle,
  buttonLabel,
  buttonHref,
  showLogo = false,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
  showLogo?: boolean;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <Image
        src="/images/image-5.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative w-full max-w-3xl rounded-3xl bg-white/35 px-8 py-14 text-center backdrop-blur-sm">
        {showLogo && <Logo className="text-3xl" />}
        <div className={showLogo ? "mt-6" : ""}>
          <CheckCircle />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-brand sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 text-sm font-semibold text-navy">{subtitle}</p>}
        <Link
          href={buttonHref}
          className="mt-8 inline-block rounded-md bg-royal px-12 py-3 text-base font-semibold text-white transition-colors hover:bg-brand"
        >
          {buttonLabel}
        </Link>
      </div>
    </main>
  );
}

function CheckCircle() {
  return (
    <svg className="mx-auto h-16 w-16 text-success" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" />
      <path
        d="M15 24.5L21 30.5L33 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
