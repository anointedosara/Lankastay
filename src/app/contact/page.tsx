import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — LankaStay",
  description: "Get in touch with the LankaStay team.",
};

const details = [
  { icon: LocationIcon, label: "Address", value: "221 Galle Road, Colombo 03, Sri Lanka" },
  { icon: PhoneIcon, label: "Phone", value: "+94 11 234 5678" },
  { icon: MailIcon, label: "Email", value: "hello@lankastay.com" },
  { icon: ClockIcon, label: "Hours", value: "Mon – Sun, 8:00 AM – 10:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader active="Contact" />
      <PageBanner
        title="Contact Us"
        subtitle="Questions about a booking or becoming a host? We'd love to hear from you."
        crumb="Contact"
      />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy">Get in touch</h2>
            <p className="text-sm leading-relaxed text-muted">
              Reach us through any of the channels below, or send a message and our
              team will get back to you within 24 hours.
            </p>

            <ul className="space-y-5">
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint text-brand">
                    <Icon />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{label}</p>
                    <p className="text-sm text-muted">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 14l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
