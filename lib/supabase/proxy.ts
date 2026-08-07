import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

/*
  Fornyer Supabase-sessionen og forteller hvem brukeren er.

  Fellen her: lager man en NY respons (redirect), må cookies fra
  supabaseResponse kopieres over. Gjør man ikke det, mistes den fornyede
  tokenen på akkurat det kallet, og brukeren logges ut tilfeldig.
*/
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const env = supabaseEnv();
  if (!env) return { response, user: null };

  const supabase = createServerClient<Database>(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser(), aldri getSession(): den siste leser bare cookien uten å
  // verifisere den mot auth-serveren.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}

/** Kopierer session-cookies over på en ny respons. Må brukes ved hver redirect. */
export function withSessionCookies(
  target: NextResponse,
  source: NextResponse
): NextResponse {
  for (const cookie of source.cookies.getAll()) {
    target.cookies.set(cookie);
  }
  return target;
}
