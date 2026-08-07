/*
  Miljøvariablene for Supabase.

  Vercel-integrasjonen og Supabase sin egen dokumentasjon bruker forskjellige
  navn, så vi godtar begge. Publishable-nøkkelen er den nyere formen
  (sb_publishable_...), anon-nøkkelen den eldre JWT-baserte.

  Returnerer null framfor å kaste når noe mangler. Kaster vi her, feiler
  `next build` på en fersk klone eller på en preview-deploy der
  integrasjonen ikke er koblet til branchen.
*/
export type SupabaseEnv = { url: string; key: string };

export function supabaseEnv(): SupabaseEnv | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    "";

  if (!url || !key) return null;
  return { url, key };
}
