import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { supabaseEnv } from "./env";

/*
  Cookie-bundet klient for admin og Server Actions. Her gjelder RLS med
  brukerens egen rolle.

  Skal ALDRI brukes inne i unstable_cache. Se lib/supabase/anon.ts.
*/
export async function createClient() {
  const env = supabaseEnv();
  if (!env) throw new Error("Supabase er ikke konfigurert (mangler URL eller nøkkel).");

  const store = await cookies(); // Next 16: async

  return createServerClient<Database>(env.url, env.key, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            store.set(name, value, options);
          }
        } catch {
          /*
            Server Components kan ikke skrive cookies. Det er utelukkende
            proxy.ts som fornyer sessionen, så dette er trygt å svelge.
          */
        }
      },
    },
  });
}
