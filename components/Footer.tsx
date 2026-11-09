import Link from "next/link";
import { localeBase, localePath, type Dictionary, type Locale } from "@/lib/i18n";
import { PHOTO_BASE_PATH, PHOTO_UI } from "@/lib/photography";
import { VIDEO_BASE_PATH, VIDEO_UI } from "@/lib/video";
import Logo from "./Logo";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = localeBase(locale);
  // Samme som Nav: ankre peker på forsiden, så de virker fra alle sider
  const home = localePath(locale, "/");
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo className="text-cream" />
          <p className="text-sm text-sand">{dict.footer.tagline}</p>
          <p className="max-w-xs text-sm leading-relaxed text-sand">{dict.footer.location}</p>
        </div>

        <div className="space-y-2">
          <p className="meta-label text-sand">{dict.contact.emailLabel}</p>
          <a
            href="mailto:kai@chenmedia.no"
            className="text-sm underline decoration-sand underline-offset-4 hover:text-butter"
          >
            kai@chenmedia.no
          </a>
        </div>

        <div className="space-y-2">
          <p className="meta-label text-sand">{dict.services.label}</p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href={`${base}${PHOTO_BASE_PATH}`} className="hover:text-butter">
                {PHOTO_UI.nav[locale]}
              </Link>
            </li>
            <li>
              <Link href={`${base}${VIDEO_BASE_PATH}`} className="hover:text-butter">
                {VIDEO_UI.nav[locale]}
              </Link>
            </li>
          </ul>
        </div>

        {/* Sidene som ellers bare finnes i menyen øverst */}
        <div className="space-y-2">
          <p className="meta-label text-sand">{dict.footer.pagesLabel}</p>
          <ul className="space-y-1 text-sm">
            {[
              { href: `${base}/prosjekter`, label: dict.nav.projects },
              { href: `${home}#om`, label: dict.nav.about },
              { href: `${base}/nyheter`, label: dict.nav.news },
              { href: `${home}#kontakt`, label: dict.nav.contact },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-butter">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <p className="meta-label mx-auto max-w-6xl px-4 py-4 text-sand sm:px-6">
          © 2026 {dict.footer.orgLabel}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
