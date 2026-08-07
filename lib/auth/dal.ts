import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "editor" | "viewer";
};

/*
  Hvem er innlogget, og hva har de lov til?

  React cache() memoiserer per render, så layout, side og en Server Action i
  samme pass gjør ett oppslag, ikke tre.
*/
export const getCurrentUser = cache(async (): Promise<Profile | null> => {
  const supabase = await createClient();

  // getUser() verifiserer mot auth-serveren. getSession() leser bare cookien.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!data) return null;
  return data as Profile;
});

/*
  Skal kalles i app/admin/layout.tsx OG i hver eneste Server Action.

  En Server Action er et POST-endepunkt som kan kalles direkte, uavhengig av
  hvilken side som rendret skjemaet. Proxyen er en optimistisk sjekk for å
  slippe å rendre admin for utloggede; den er ikke sikkerhet.
*/
export async function requireAdmin(): Promise<Profile> {
  const profile = await getCurrentUser();
  if (!profile) redirect("/logg-inn");
  if (profile.role !== "admin") redirect("/logg-inn?feil=ingen-tilgang");
  return profile;
}
