"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { AGENDA_TAG } from "@/lib/agenda/queries";
import {
  parseEventForm,
  parsePhotographerForm,
  type FieldErrors,
} from "@/lib/agenda/validate";

export type FormState = { errors?: FieldErrors };

/*
  Alle mutasjoner følger samme mal:
    1. requireAdmin() — hver action for seg. En Server Action er et
       POST-endepunkt som kan kalles direkte; proxyen beskytter den ikke.
    2. valider
    3. cookie-bundet klient, så RLS gjelder med brukerens rolle
    4. revalidateTag, som frisker opp kalenderen på alle fem offentlige sider

  revalidateTag krever to argumenter i Next 16. Ettargumentsformen er
  deprecated. "max" gir stale-while-revalidate.
*/
function refreshAgenda() {
  revalidateTag(AGENDA_TAG, "max");
  revalidatePath("/admin/arrangementer");
  revalidatePath("/admin");
}

export async function saveEvent(
  _prev: FormState,
  form: FormData
): Promise<FormState> {
  const profile = await requireAdmin();

  const parsed = parseEventForm(form);
  if (!parsed.ok) return { errors: parsed.errors };
  const v = parsed.value;

  const supabase = await createClient();
  const id = String(form.get("id") ?? "").trim() || null;

  const row = {
    starts_on: v.starts_on,
    ends_on: v.ends_on,
    title_no: v.title_no,
    title_en: v.title_en,
    location_no: v.location_no,
    location_en: v.location_en,
    kind: v.kind,
    status: v.status,
    is_published: v.is_published,
  };

  let eventId = id;
  if (id) {
    const { error } = await supabase.from("events").update(row).eq("id", id);
    if (error) return { errors: { _: error.message } };
  } else {
    const { data, error } = await supabase
      .from("events")
      .insert({ ...row, created_by: profile.id })
      .select("id")
      .single();
    if (error) return { errors: { _: error.message } };
    eventId = data.id;
  }
  if (!eventId) return { errors: { _: "Kunne ikke lagre arrangementet." } };

  // Interne felter i egen tabell, som anon aldri får lese
  if (v.client || v.notes) {
    const { error } = await supabase
      .from("event_internal")
      .upsert({ event_id: eventId, client: v.client, notes: v.notes });
    if (error) return { errors: { _: error.message } };
  } else if (id) {
    await supabase.from("event_internal").delete().eq("event_id", id);
  }

  // Enklest og trygt med så få rader: slett tildelingene og sett dem på nytt
  await supabase.from("event_photographers").delete().eq("event_id", eventId);
  if (v.photographerIds.length > 0) {
    const { error } = await supabase.from("event_photographers").insert(
      v.photographerIds.map((pid) => ({ event_id: eventId, photographer_id: pid }))
    );
    if (error) return { errors: { _: error.message } };
  }

  refreshAgenda();
  redirect("/admin/arrangementer");
}

export async function deleteEvent(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("events").delete().eq("id", id);

  refreshAgenda();
  redirect("/admin/arrangementer");
}

export async function savePhotographer(
  _prev: FormState,
  form: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = parsePhotographerForm(form);
  if (!parsed.ok) return { errors: parsed.errors };

  const supabase = await createClient();
  const id = String(form.get("id") ?? "").trim();

  const { error } = id
    ? await supabase.from("photographers").update(parsed.value).eq("id", id)
    : await supabase.from("photographers").insert(parsed.value);

  if (error) return { errors: { _: error.message } };

  refreshAgenda();
  revalidatePath("/admin/fotografer");
  redirect("/admin/fotografer");
}

export async function setTeamSize(form: FormData) {
  await requireAdmin();
  const size = Number(String(form.get("team_size") ?? ""));
  if (!Number.isInteger(size) || size < 1 || size > 200) return;

  const supabase = await createClient();
  await supabase.from("app_settings").update({ team_size: size }).eq("id", 1);

  refreshAgenda();
  revalidatePath("/admin/innstillinger");
}
