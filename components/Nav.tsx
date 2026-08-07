import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import LocaleSwitch from "./LocaleSwitch";
import CtaButton from "./CtaButton";
import Logo from "./Logo";
import NavLink, { NavTrigger } from "./NavLink";

export default function Nav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  /*
    localePath, ikke localeBase. localeBase("no") er "" med vilje, siden norsk
    ikke har prefiks i URL-en, men brukt rett som href blir markupen
    <a href="">, som nettleseren tolker som «last denne siden på nytt».
    localePath gir "/" for norsk og "/en" for engelsk.
  */
  const home = localePath(locale);
  const services = [
    {
      href: localePath(locale, "/eventfoto"),
      label: dict.nav.photo,
      sub: dict.nav.photoSub,
    },
    {
      href: localePath(locale, "/eventfilm"),
      label: dict.nav.film,
      sub: dict.nav.filmSub,
    },
  ];
  /*
    Om oss må ha stien med seg. Seksjonen id="om" finnes bare på forsiden, så
    et rent «#om» er et blindspor fra de fire andre sidene.

    #kontakt under er derimot riktig som rent fragment: ContactCTA ligger på
    alle fem sider, og skal peke på sidens egen kontaktseksjon.
  */
  const links = [
    { href: localePath(locale, "/prosjekter"), label: dict.nav.projects },
    { href: `${home}#om`, label: dict.nav.about },
    { href: localePath(locale, "/nyheter"), label: dict.nav.news },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={home} aria-label="Chen Media" className="text-ink">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {/* Hver li er flex, så lenke og trigger får lik bokskonstruksjon */}
          <li className="flex">
            <NavLink href={home}>{dict.nav.home}</NavLink>
          </li>
          {/* Tjeneste-dropdown — CSS-only via group-hover/focus-within */}
          <li className="group relative flex">
            <NavTrigger matches={services.map((s) => s.href)}>
              {dict.nav.services}
            </NavTrigger>
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
            <li key={link.href} className="flex">
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LocaleSwitch locale={locale} />
          <span className="hidden sm:inline-block">
            {/* Rent fragment med vilje, jf. kommentaren over links */}
            <CtaButton href="#kontakt">{dict.nav.cta}</CtaButton>
          </span>
        </div>
      </nav>

      {/* Mobil: sekundærrad med sidelenkene */}
      <div className="border-t border-ink/10 md:hidden">
        <ul className="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-2 sm:px-6">
          {[...services, ...links].map((link) => (
            <li key={link.href} className="flex shrink-0">
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
