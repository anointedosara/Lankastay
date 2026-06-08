import Link from "next/link";

export default function PageBanner({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="bg-tint">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-muted">{subtitle}</p>}
        <nav className="mt-4 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-navy">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
