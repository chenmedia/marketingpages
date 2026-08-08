"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { AGENDA_TAG } from "@/lib/agenda/queries";
import { STATS_TAG } from "@/lib/stats/queries";
import { IMAGES_TAG } from "@/lib/images/queries";
import { SLOT_BY_KEY } from "@/lib/images/slots";
import { forwardToHubspot } from "@/lib/hubspot/forms";
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

export async function saveSiteStat(form: FormData) {
  await requireAdmin();

  const id = Number(String(form.get("id") ?? ""));
  const value = String(form.get("value") ?? "").trim();
  const caption_no = String(form.get("caption_no") ?? "").trim();
  const caption_en = String(form.get("caption_en") ?? "").trim();
  if (!Number.isInteger(id) || !value || !caption_no || !caption_en) return;

  const supabase = await createClient();
  await supabase
    .from("site_stats")
    .update({
      value,
      caption_no,
      caption_en,
      is_visible: form.get("is_visible") === "on",
    })
    .eq("id", id);

  revalidateTag(STATS_TAG, "max");
  revalidatePath("/admin/statistikk");
}

/*
  Bilde til én bildeflate.

  Klienten har allerede krympet filen, men den valideres på nytt her. En
  Server Action er et POST-endepunkt som kan kalles med hva som helst, så
  det klienten påstår om type og størrelse teller ikke.

  Selve filen lagres med tidsstempel i navnet, aldri overskrevet. Da kan en
  gammel versjon ligge igjen i CDN-cachen uten å blande seg med den nye.
*/
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/webp", "image/jpeg", "image/png", "image/avif"];

export async function uploadSiteImage(
  form: FormData
): Promise<{ error?: string } | void> {
  await requireAdmin();

  const slot = String(form.get("slot") ?? "");
  const def = SLOT_BY_KEY.get(slot);
  if (!def) return { error: "Ukjent bildeflate." };

  const supabase = await createClient();

  if (form.get("reset") === "1") {
    const { data: existing } = await supabase
      .from("site_images")
      .select("path")
      .eq("slot", slot)
      .maybeSingle();

    await supabase.from("site_images").delete().eq("slot", slot);
    if (existing?.path) {
      await supabase.storage.from("site-images").remove([existing.path]);
    }
    refreshImages();
    return;
  }

  const alt_no = String(form.get("alt_no") ?? "").trim();
  const alt_en = String(form.get("alt_en") ?? "").trim();
  const caption = String(form.get("caption") ?? "").trim() || null;

  // Dekorative flater ligger bak et overlegg og trenger ingen alt-tekst
  if (!def.decorative && (!alt_no || !alt_en)) {
    return { error: "Alt-tekst må fylles ut på begge språk." };
  }

  const focal_x = clamp01(Number(form.get("focal_x")));
  const focal_y = clamp01(Number(form.get("focal_y")));

  const file = form.get("file");
  const hasNewFile = file instanceof File && file.size > 0;

  if (hasNewFile) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return { error: "Bildet er for stort. Grensen er 5 MB etter krymping." };
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { error: "Filtypen støttes ikke." };
    }
  }

  const { data: existing } = await supabase
    .from("site_images")
    .select("path")
    .eq("slot", slot)
    .maybeSingle();

  if (!hasNewFile && !existing) {
    return { error: "Velg en bildefil først." };
  }

  let path = existing?.path ?? "";

  if (hasNewFile) {
    // Tidsstempel i navnet, så en ny opplasting aldri kolliderer med CDN-cachen
    const stamp = Date.now();
    path = `${slot}-${stamp}.webp`;

    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) return { error: `Opplastingen feilet: ${error.message}` };
  }

  const common = {
    path,
    alt_no: alt_no || def.fallbackAlt || def.label,
    alt_en: alt_en || def.fallbackAlt || def.label,
    caption: def.hasCaption ? caption : null,
    focal_x,
    focal_y,
    updated_at: new Date().toISOString(),
  };

  /*
    Uten ny fil er dette bare en redigering av alt-tekst eller fokuspunkt, og
    da skal width, height og blur stå urørt. Derfor update her og insert der,
    i stedet for en upsert som må oppgi alt.
  */
  const { error } = hasNewFile
    ? await supabase.from("site_images").upsert(
        {
          slot,
          ...common,
          width: Math.max(1, Number(form.get("width")) || 1),
          height: Math.max(1, Number(form.get("height")) || 1),
          blur_data_url:
            String(form.get("blur_data_url") ?? "").slice(0, 4000) || null,
        },
        { onConflict: "slot" }
      )
    : await supabase.from("site_images").update(common).eq("slot", slot);

  if (error) return { error: error.message };

  // Den gamle filen ryddes først når den nye ligger trygt i basen
  if (hasNewFile && existing?.path && existing.path !== path) {
    await supabase.storage.from("site-images").remove([existing.path]);
  }

  refreshImages();
}

function clamp01(n: number) {
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.5;
}

/* Bildene ligger på alle fem offentlige sidene, så hele taggen friskes opp. */
function refreshImages() {
  revalidateTag(IMAGES_TAG, "max");
  revalidatePath("/admin/bilder");
}

/*
  Henvendelser fra kontaktskjemaet.

  Ingenting her rører de offentlige sidene, så det holder med revalidatePath
  på selve innboksen og oversikten.
*/
function refreshEnquiries() {
  revalidatePath("/admin/henvendelser");
  revalidatePath("/admin");
}

export async function setEnquiryStatus(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") ?? "");
  const status = String(form.get("status") ?? "");
  if (!id || !["new", "read", "archived"].includes(status)) return;

  const supabase = await createClient();
  await supabase.from("enquiries").update({ status }).eq("id", id);

  refreshEnquiries();
}

/*
  Send til HubSpot på nytt.

  Dette er grunnen til at henvendelsen lagres hos oss først: feiler
  videresendingen, er den ikke tapt, og et nytt forsøk er ett klikk. Typisk
  årsak er at HUBSPOT_FORM_GUID mangler eller er feil, eller at skjemaet i
  HubSpot har reCAPTCHA eller legal consent slått på — API-innsending virker
  ikke med noen av delene.
*/
export async function retryHubspotForward(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const { data: enquiry } = await supabase
    .from("enquiries")
    .select("name, email, message, org, marketing_consent, source_path, ip")
    .eq("id", id)
    .maybeSingle();

  if (!enquiry) return;

  const result = await forwardToHubspot({
    name: enquiry.name,
    email: enquiry.email,
    message: enquiry.message,
    org: enquiry.org,
    marketingConsent: enquiry.marketing_consent,
    pageUri: enquiry.source_path,
    // Null på rader eldre enn 30 dager. Da sendes den bare ikke med.
    ip: enquiry.ip,
  });

  await supabase
    .from("enquiries")
    .update(
      result.ok
        ? { hubspot_state: "sent", hubspot_error: null }
        : { hubspot_state: "failed", hubspot_error: result.error }
    )
    .eq("id", id);

  refreshEnquiries();
}
