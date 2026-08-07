"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicPath } from "@/lib/i18n";

/*
  Menypunktene som vet om de er gjeldende side.

  Nav er fortsatt server-komponent. Bare punktene er klient, samme grep som
  LocaleSwitch, så ordbok og språk hentes på serveren som før.

  Felles klassestreng for lenke, dropdown-trigger og mobilrad. Alle er
  «flex», ikke inline, med vilje: en inline-lenke i en <li> får en linjeboks
  med strut fra li-ens arvede 16px-skrift, mens en <button class="flex">
  ikke får det. Da lander grunnlinjene ulikt selv om boksene sentreres, og
  triggeren legger seg noen piksler for høyt. Lik bokskonstruksjon overalt
  holder justeringen av konstruksjon, ikke av tilfeldighet.
*/
const NAV_ITEM =
  "meta-label flex items-center gap-1 transition-colors hover:text-ink";

/*
  Aktiv avgjøres av stien alene. Lenker med fragment (/#om) markeres aldri,
  ellers ville både Hjem og Om oss slått til samtidig på forsiden.

  Begge sider normaliseres med publicPath: href-en er språksatt (/en/prosjekter)
  mens usePathname på klienten gir den offentlige stien (/prosjekter).
*/
function useIsActive(targets: string[]) {
  const here = publicPath(usePathname() ?? "/");
  return targets.some((t) => !t.includes("#") && publicPath(t) === here);
}

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const active = useIsActive([href]);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${NAV_ITEM} ${active ? "text-ink" : "text-smoke"}`}
    >
      {children}
    </Link>
  );
}

/*
  Dropdown-triggeren. Den er ikke en lenke til noe sted, så den får vite
  hvilke stier som skal markere den.

  Ingen aria-expanded: menyen er ren CSS, komponenten kjenner ikke tilstanden,
  og et statisk attributt ville vært feilinformasjon. Panelet er
  visibility:hidden, så lenkene er uansett ute av tabbrekkefølgen til det
  åpnes med fokus.
*/
export function NavTrigger({
  matches,
  children,
}: {
  matches: string[];
  children: React.ReactNode;
}) {
  const active = useIsActive(matches);

  return (
    <button
      type="button"
      className={`${NAV_ITEM} group-hover:text-ink ${
        active ? "text-ink" : "text-smoke"
      }`}
    >
      {children}
      <svg
        viewBox="0 0 12 12"
        className="size-2.5 transition-transform group-hover:rotate-180"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 4L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
