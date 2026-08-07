"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

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

  // Bare interne stier, ellers kan ?neste= brukes til å sende folk ut av siden
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/logg-inn");
}
