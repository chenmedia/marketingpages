import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { updateSession, withSessionCookies } from "@/lib/supabase/proxy";

/*
  Språkruting. Filstrukturen er app/[locale]/, men utad har norsk ingen prefiks:

    /eventfoto      -> rewrite til /no/eventfoto, adressefeltet står stille
    /en/eventfoto   -> slipper rett gjennom
    /no/eventfoto   -> 308 til /eventfoto, ellers svarer to URL-er likt og
                       Google teller duplisert innhold

  Rewrite, ikke redirect, er poenget: proxyen velger hvilken ferdigbygde side
  som serveres, så sidene forblir statisk prerendret.

  NB: filen het middleware.ts fram til Next 16, som deprekerte det navnet.
*/

/** Plukker beste språk fra Accept-Language. Norsk er fallback. */
function fromAcceptLanguage(header: string | null): Locale {
  if (!header) return "no";

  // "en-GB,en;q=0.9,nb;q=0.8" -> [{ tag: "en-gb", q: 1 }, ...]
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // nb og nn er norske varianter, no er makrospråket
    if (tag === "no" || tag.startsWith("no-") || tag.startsWith("nb") || tag.startsWith("nn")) {
      return "no";
    }
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return "no";
}

/** Et manuelt valg vinner over nettleserens preferanse. */
function resolveLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved === "no" || saved === "en") return saved;
  return fromAcceptLanguage(request.headers.get("accept-language"));
}

/** Stier som krever Supabase-session. Alt annet er offentlige, statiske sider. */
function needsSession(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname === "/logg-inn"
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
    Kun admin og auth trenger session. Å kjøre Supabase-klienten på de
    offentlige sidene ville hengt Set-Cookie og no-store på dem, og dermed
    drept CDN-cachingen for hele nettstedet.
  */
  if (needsSession(pathname)) {
    const { response, user } = await updateSession(request);

    if (pathname.startsWith("/admin") && !user) {
      const target = new URL("/logg-inn", request.url);
      target.searchParams.set("neste", pathname);
      return withSessionCookies(NextResponse.redirect(target), response);
    }
    if (pathname === "/logg-inn" && user) {
      return withSessionCookies(
        NextResponse.redirect(new URL("/admin", request.url)),
        response
      );
    }
    return response;
  }

  // /no/ finnes ikke utad
  if (pathname === "/no" || pathname.startsWith("/no/")) {
    const stripped = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(stripped, request.url), 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Alt annet er norsk innhold. Førstegangsbesøkende med engelsk nettleser
  // sendes til /en; ellers serveres den norske siden på den rene URL-en.
  if (resolveLocale(request) === "en") {
    return NextResponse.redirect(new URL(`/en${pathname === "/" ? "" : pathname}`, request.url));
  }

  return NextResponse.rewrite(new URL(`/no${pathname === "/" ? "" : pathname}`, request.url));
}

export const config = {
  // Må treffe alle sider, men aldri statiske filer — ellers rewrites også
  // bilder og fonter i public/.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|fonts/|portfolio/|.*\\.[\\w]+$).*)",
  ],
};
