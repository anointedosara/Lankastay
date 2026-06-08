"use client";

import { useState } from "react";

export default function AuthField({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
  minLength,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <div className="relative mt-2">
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className="w-full rounded-lg border border-line px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
          >
            <EyeOff />
          </button>
        )}
      </div>
    </div>
  );
}

function EyeOff() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.2A9.5 9.5 0 0112 5c5 0 9 4 9 7a9.8 9.8 0 01-2.3 3.2M6.1 6.1A11 11 0 003 12c0 3 4 7 9 7a9.5 9.5 0 003.4-.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
