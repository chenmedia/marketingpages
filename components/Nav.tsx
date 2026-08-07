import Link from "next/link";
import { localeBase, type Dictionary, type Locale } from "@/lib/i18n";
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
  const base = localeBase(locale);
  const services = [
    { href: `${base}/eventfoto`, label: dict.nav.photo, sub: dict.nav.photoSub },
    { href: `${base}/eventfilm`, label: dict.nav.film, sub: dict.nav.filmSub },
  ];
  const links = [
    { href: `${base}/prosjekter`, label: dict.nav.projects },
    { href: `${base}#om`, label: dict.nav.about },
    { href: `${base}/nyheter`, label: dict.nav.news },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={base} className="flex items-center gap-2">
          <Squiggle className="w-9 text-ink" />
          <span className="display text-lg tracking-tight">Chen&nbsp;Media</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <Link
              href={base}
              className="meta-label text-smoke transition-colors hover:text-ink"
            >
              {dict.nav.home}
            </Link>
          </li>
          {/* Tjeneste-dropdown — CSS-only via group-hover/focus-within */}
          <li className="group relative">
            <button
              type="button"
              className="meta-label flex items-center gap-1 text-smoke transition-colors group-hover:text-ink"
            >
              {dict.nav.services}
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
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="overflow-hidden rounded-lg border border-ink/10 bg-cream shadow-lg">
                {services.map((service) => (
                  <li key={service.href} className="border-b border-ink/5 last:border-0">
                    <Link href={service.href} className="block px-5 py-4 hover:bg-shell">
                      <span className="display block text-sm">{service.label}</span>
                      <span className="mt-0.5 block text-xs text-smoke">
                        {service.sub}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="meta-label text-smoke transition-colors hover:text-ink"
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
          {[...services, ...links].map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="meta-label text-smoke transition-colors hover:text-ink"
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
