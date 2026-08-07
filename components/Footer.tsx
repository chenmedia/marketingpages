import Link from "next/link";
import { localeBase, type Dictionary, type Locale } from "@/lib/i18n";
import Logo from "./Logo";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = localeBase(locale);
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Logo className="text-cream" />
          <p className="text-sm text-sand">{dict.footer.tagline}</p>
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
              <Link href={`${base}/eventfoto`} className="hover:text-butter">
                {dict.nav.photo}
              </Link>
            </li>
            <li>
              <Link href={`${base}/eventfilm`} className="hover:text-butter">
                {dict.nav.film}
              </Link>
            </li>
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
