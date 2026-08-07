import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Photographer } from "./types";

/*
  Admin leser med den cookie-bundne klienten, så RLS gjelder med brukerens
  rolle. Admin ser derfor også upubliserte og interne arrangementer.

  Ingen caching her: admin skal alltid se ferskeste tilstand.
*/
export type AdminEvent = {
  id: string;
  starts_on: string;
  ends_on: string;
  title_no: string;
  title_en: string;
  location_no: string;
  location_en: string | null;
  kind: string;
  status: string;
  is_published: boolean;
  event_photographers: { photographer_id: string }[];
};

const EVENT_FIELDS =
  "id, starts_on, ends_on, title_no, title_en, location_no, location_en, kind, status, is_published, event_photographers(photographer_id)";

export async function listEvents(scope: "upcoming" | "past" | "all" = "upcoming") {
  const supabase = await createClient();
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Oslo",
  }).format(new Date());

  let q = supabase.from("events").select(EVENT_FIELDS);
  if (scope === "upcoming") q = q.gte("ends_on", today);
  if (scope === "past") q = q.lt("ends_on", today);

  const { data, error } = await q.order("starts_on", {
    ascending: scope !== "past",
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as AdminEvent[];
}

export async function getEvent(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select(EVENT_FIELDS)
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;

  const { data: internal } = await supabase
    .from("event_internal")
    .select("client, notes")
    .eq("event_id", id)
    .maybeSingle();

  return {
    event: data as unknown as AdminEvent,
    client: internal?.client ?? "",
    notes: internal?.notes ?? "",
  };
}

export async function listPhotographers(includeInactive = true) {
  const supabase = await createClient();
  let q = supabase
    .from("photographers")
    .select(
      "id, display_name, initials, role_no, role_en, is_active, counts_toward_capacity, sort_order"
    );
  if (!includeInactive) q = q.eq("is_active", true);

  const { data, error } = await q.order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []) as Photographer[];
}

export async function getTeamSize() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("app_settings")
    .select("team_size")
    .eq("id", 1)
    .maybeSingle();
  return data?.team_size ?? 8;
}

/** Ledig kapasitet per dag framover. Brukes til kapasitetsstripen. */
export async function capacityAhead(days = 30) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("next_free_days", { p_days: days });
  if (error) return [];
  return (data ?? []) as unknown as { day: string; free: number }[];
}
