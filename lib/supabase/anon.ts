import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

/*
  Klienten for offentlige lesninger. INGEN cookies, ingen session.

  Dette er ikke en forenkling, det er et krav: `unstable_cache` kan ikke lese
  cookies eller headers («Accessing uncached data sources such as headers or
  cookies inside a cache scope is not supported»). Brukes den cookie-bundne
  klienten fra @supabase/ssr inne i den cachede agenda-spørringen, knekker
  enten build-en eller de fem offentlige sidene blir dynamiske.

  Det er dessuten riktig uansett: kalenderdataen er lik for alle besøkende.
*/
export function createAnonClient() {
  const env = supabaseEnv();
  if (!env) return null;

  return createClient<Database>(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
