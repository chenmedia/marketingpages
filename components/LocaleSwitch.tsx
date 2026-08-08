"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALE_COOKIE,
  localePath,
  locales,
  publicPath,
  type Locale,
} from "@/lib/i18n";

/*
  Bytter språk og bevarer siden man står på (/eventfoto ↔ /en/eventfoto).

  Norsk har ingen prefiks utad, så pathname er allerede den rene stien.
  Klikket setter også en cookie, slik at proxy.ts ikke sender brukeren
  tilbake til nettleserspråket ved neste besøk.
*/
/*
  Ligger utenfor komponenten med vilje: React Compiler tillater ikke at en
  komponent skriver til noe som er definert utenfor den.
*/
function rememberLocale(next: Locale) {
  /*
    Ett år, hele nettstedet. Ingen persondata, så ingen samtykke kreves.

    secure utelates på localhost, der protokollen er http og nettleseren
    ellers ville forkastet cookien uten et ord.
  */
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax${secure}`;
}

export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const rest = publicPath(usePathname() ?? "/");

  return (
    <div className="meta-label flex items-center gap-1 rounded-full border border-ink/20 p-1">
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, rest)}
          onClick={() => rememberLocale(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            l === locale ? "bg-ink text-cream" : "text-smoke hover:text-ink"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
