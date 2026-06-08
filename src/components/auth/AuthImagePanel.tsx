import Image from "next/image";
import Logo from "@/components/Logo";

/** The greenery panel with the centered LankaStay logo used on auth screens. */
export default function AuthImagePanel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative min-h-[300px] overflow-hidden lg:min-h-full ${className}`}>
      <Image
        src="/images/image-5.png"
        alt="Hillside eco lodges in Sri Lanka"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-6 flex items-center justify-center rounded-2xl bg-white/25 backdrop-blur-[2px]">
        <Logo className="text-4xl sm:text-5xl" />
      </div>
    </div>
  );
}
