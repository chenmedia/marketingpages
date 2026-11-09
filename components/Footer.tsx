import Link from "next/link";
import { localeBase, localePath, type Dictionary, type Locale } from "@/lib/i18n";
import { PHOTO_BASE_PATH, PHOTO_UI } from "@/lib/photography";
import { VIDEO_BASE_PATH, VIDEO_UI } from "@/lib/video";
import { socialLinks } from "@/lib/site";
import Logo from "./Logo";

/* Enkle strekikoner i samme farge som teksten. Navnet står ved siden av, så ikonet er dekorativt. */
function SocialIcon({ name }: { name: (typeof socialLinks)[number]["name"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {name === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M8 10.5V16M8 7.75v.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.5 2.25-2.5S16 11.25 16 12.75V16" />
        </>
      )}
    </svg>
  );
}

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

          <p className="meta-label pt-4 text-sand">{dict.footer.followLabel}</p>
          <ul className="space-y-1.5 text-sm">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-butter"
                >
                  <SocialIcon name={social.name} />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
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
