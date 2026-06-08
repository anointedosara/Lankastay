import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-bold tracking-tight ${className}`}>
      <span className="text-brand">Lanka</span>
      <span className="text-navy">Stay.</span>
    </Link>
  );
}
