"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { forwardToHubspot } from "@/lib/hubspot/forms";
import { notifyNewEnquiry } from "@/lib/notify/slack";
import { parseEnquiryForm, type EnquiryError } from "@/lib/enquiries/validate";
import { getDictionary, isLocale } from "@/lib/i18n";

export type EnquiryState = { ok?: boolean; error?: EnquiryError };

/*
  Kontaktskjemaet.

  Rekkefølgen er poenget: henvendelsen lagres i vår egen base FØRST, og
  videresendes til HubSpot etterpå. Feiler videresendingen, ligger den trygt
  og kan sendes på nytt fra /admin/henvendelser. Går alt rett til HubSpot og
  kallet feiler, finnes henvendelsen ingen steder.

  Innsettingen går gjennom public.submit_enquiry(). Anon har execute på den
  funksjonen og ingenting på selve tabellen, så en besøkende kan legge igjen
  en henvendelse uten å kunne lese en eneste rad.
*/
export async function submitEnquiry(
  _prev: EnquiryState,
  form: FormData
): Promise<EnquiryState> {
  const parsed = parseEnquiryForm(form);

  // Honeypot eller for rask innsending: se vellykket ut, lagre ingenting.
  if (!parsed.ok && "silent" in parsed) return { ok: true };
  if (!parsed.ok) return { error: parsed.error };

  const raw = String(form.get("locale") ?? "");
  const locale = isLocale(raw) ? raw : "no";
  const dict = getDictionary(locale);

  const supabase = await createClient();
  const { ip, hash } = await clientIp();

  const { data, error } = await supabase.rpc("submit_enquiry", {
    p_name: parsed.value.name,
    p_email: parsed.value.email,
    p_message: parsed.value.message,
    p_org: parsed.value.org ?? undefined,
    p_locale: locale,
    p_source_path: String(form.get("sourcePath") ?? "").slice(0, 500) || undefined,
    p_marketing_consent: parsed.value.marketingConsent,
    /*
      Ordlyden lagres slik den sto da boksen ble huket av, ikke bare et
      boolsk flagg. Endres teksten senere, viser gamle rader fortsatt hva
      den enkelte faktisk sa ja til.
    */
    p_consent_text: parsed.value.marketingConsent
      ? dict.contact.form.consent
      : undefined,
    p_ip_hash: hash,
    p_ip: ip,
  });

  if (error) {
    if (error.message.includes("rate_limited")) return { error: "rate" };
    console.error("Kunne ikke lagre henvendelse:", error.message);
    return { error: "server" };
  }

  const id = data as string | null;
  if (!id) return { error: "server" };

  const sourcePath = String(form.get("sourcePath") ?? "") || null;

  /*
    Varsel og videresending er uavhengige av hverandre og gjøres samtidig.
    Sekvensielt ville den besøkende ventet på summen av to nettverkskall.

    Begge skjer etter lagringen og kan ikke velte innsendingen. Varselet er
    det viktigste av de to: det er slik Kai får vite at noen har tatt
    kontakt, og det skal ikke henge på at HubSpot svarer.
  */
  const [notified, forwarded] = await Promise.all([
    notifyNewEnquiry({
      name: parsed.value.name,
      org: parsed.value.org,
      email: parsed.value.email,
      message: parsed.value.message,
      marketingConsent: parsed.value.marketingConsent,
      locale,
      sourcePath,
      ip: ip ?? null,
    }),
    forwardToHubspot({
      name: parsed.value.name,
      email: parsed.value.email,
      message: parsed.value.message,
      org: parsed.value.org,
      marketingConsent: parsed.value.marketingConsent,
      pageUri: sourcePath,
      ip: ip ?? null,
      consentText: dict.contact.form.consent,
      privacyText: dict.contact.form.privacy,
    }),
  ]);

  if (!notified.ok) console.error("Varsel ikke sendt:", notified.error);

  /*
    Statusen settes gjennom mark_enquiry_delivery, ikke med et update mot
    tabellen. En besøkende kjører som anon, som ikke har og ikke skal ha
    rettigheter her; et vanlig update feilet stille og lot enhver ekte
    henvendelse stå som «pending» selv når HubSpot hadde fått den.
  */
  await supabase.rpc("mark_enquiry_delivery", {
    p_id: id,
    p_hubspot_state: forwarded.ok ? "sent" : "failed",
    p_hubspot_error: forwarded.ok
      ? (forwarded.note ?? undefined)
      : forwarded.error,
    p_notified: notified.ok,
  });

  revalidatePath("/admin/henvendelser");
  revalidatePath("/admin");

  return { ok: true };
}

/*
  Avsenderens IP, både rå og hashet.

  Hashen driver rate limit. Den kan telle uten å identifisere, og pepperet
  gjør den ubrukelig til oppslag: IPv4-rommet er lite nok til at en usaltet
  SHA-256 kan reverseres med en full tabell, så uten ENQUIRY_IP_PEPPER er
  den obfuskering og ikke beskyttelse.

  Den rå adressen lagres på raden og sendes til HubSpot som
  context.ipAddress. Begge nulles etter 30 dager av submit_enquiry.

  x-forwarded-for er en liste der klienten står først og hver proxy legger
  seg bakerst. På Vercel settes den av plattformen, så første ledd er den
  faktiske besøkende.
*/
async function clientIp(): Promise<{ ip?: string; hash?: string }> {
  const head = await headers();
  const forwarded = head.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || head.get("x-real-ip")?.trim();
  if (!ip) return {};

  const pepper = process.env.ENQUIRY_IP_PEPPER ?? "chenmedia-enquiries";
  return {
    ip,
    hash: createHash("sha256").update(`${ip}${pepper}`).digest("hex"),
  };
}
