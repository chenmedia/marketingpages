"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

// Bytter språk og bevarer siden man står på (/no/eventfoto ↔ /en/eventfoto).
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(no|en)(?=\/|$)/, "");

  return (
    <div className="meta-label flex items-center gap-1 rounded-full border border-ink/20 p-1">
      {(["no", "en"] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            l === locale
              ? "bg-ink text-cream"
              : "text-smoke hover:text-ink"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
