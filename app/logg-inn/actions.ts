"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

/*
  ?neste= må peke innenfor vårt eget nettsted, ellers kan lenken brukes til å
  sende folk til et fremmed domene rett etter en vellykket innlogging.

  Det holder ikke å sjekke «starter med / men ikke med //». I URL-standarden
  er omvendt skråstrek likeverdig med skråstrek for http og https, så
  nettleseren leser «/\evil.com» som «//evil.com» og går dit. Kravet er
  derfor én skråstrek etterfulgt av noe som verken er skråstrek eller
  omvendt skråstrek.
*/
function isInternalPath(value: string): boolean {
  return /^\/(?![/\\])/.test(value);
}

/*
  Innlogging med e-post og passord.

  Det finnes bevisst ingen registrering. Selvregistrering er i tillegg slått
  av i Supabase-dashbordet, som er den eneste kontrollen som faktisk stenger
  signup-endepunktet for noen med den publiserbare nøkkelen.
*/
export async function signIn(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("neste") ?? "/admin");

  if (!email || !password) {
    return { error: "Fyll inn både e-post og passord." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Samme melding uansett årsak, så skjemaet ikke røper hvilke
    // e-postadresser som finnes.
    return { error: "Feil e-post eller passord." };
  }

  redirect(isInternalPath(next) ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/logg-inn");
}
