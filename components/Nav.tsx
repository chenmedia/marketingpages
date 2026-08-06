import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import LocaleSwitch from "./LocaleSwitch";
import CtaButton from "./CtaButton";
import Squiggle from "./Squiggle";

export default function Nav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = `/${locale}`;
  const links = [
    { href: `${base}/eventfoto`, label: dict.nav.photo },
    { href: `${base}/eventfilm`, label: dict.nav.film },
    { href: `${base}#om`, label: dict.nav.about },
    { href: `${base}#kontakt`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={base} className="flex items-center gap-2">
          <Squiggle className="w-9 text-ink" />
          <span className="display text-lg tracking-tight">Chen&nbsp;Media</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="meta-label text-smoke transition-colors hover:text-ember-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LocaleSwitch locale={locale} />
          <span className="hidden sm:inline-block">
            <CtaButton href={`${base}#kontakt`}>{dict.nav.cta}</CtaButton>
          </span>
        </div>
      </nav>

      {/* Mobil: sekundærrad med sidelenkene */}
      <div className="border-t border-ink/10 md:hidden">
        <ul className="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-2 sm:px-6">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="meta-label text-smoke transition-colors hover:text-ember-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
