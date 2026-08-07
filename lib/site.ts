import { locales, localePath, type Locale } from "./i18n";

/*
  Absolutt base-URL for metadata. Uten `metadataBase` skriver Next ut relative
  hreflang-lenker, og Google krever absolutte.

  Vercel setter VERCEL_PROJECT_PRODUCTION_URL automatisk. NEXT_PUBLIC_SITE_URL
  overstyrer den om domenet endres.
*/
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://chenmedia.no")
);

/** Hreflang-koden per språk. `nb` er Bokmål, som er mer presist enn makrospråket `no`. */
const hreflang: Record<Locale, string> = { no: "nb", en: "en" };

/*
  Bygger canonical + hreflang for én side. `path` er den språknøytrale stien,
  altså "/eventfoto" eller "/" for forsiden.

  x-default peker på norsk, som er det Google serverer når ingen språk matcher.
*/
export function alternatesFor(locale: Locale, path = "/") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hreflang[l]] = localePath(l, path);
  languages["x-default"] = localePath("no", path);

  return { canonical: localePath(locale, path), languages };
}
