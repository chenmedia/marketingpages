import "server-only";
import { createClient } from "@/lib/supabase/server";

/*
  Admin leser med den cookie-bundne klienten, så RLS gjelder med brukerens
  rolle. På enquiries er alle policyene admin-only, og anon har ingen
  rettigheter på tabellen i det hele tatt.

  Ingen caching: en innboks skal alltid vise ferskeste tilstand.

  ip hentes ut og vises i admin. ip_hash gjør ikke: den er kun rate limit
  internt i databasen og sier ingenting en menneskelig leser kan bruke.
  Begge nulles etter 30 dager, så eldre rader viser tomt her.
*/

export type Enquiry = {
  id: string;
  name: string;
  org: string | null;
  email: string;
  message: string;
  locale: string;
  source_path: string | null;
  marketing_consent: boolean;
  consent_text: string | null;
  status: string;
  hubspot_state: string;
  hubspot_error: string | null;
  ip: string | null;
  created_at: string;
};

const FIELDS =
  "id, name, org, email, message, locale, source_path, marketing_consent, consent_text, status, hubspot_state, hubspot_error, ip, created_at";

export async function listEnquiries(
  scope: "open" | "archived" = "open"
): Promise<Enquiry[]> {
  const supabase = await createClient();

  const query = supabase
    .from("enquiries")
    .select(FIELDS)
    .order("created_at", { ascending: false })
    .limit(200);

  const { data, error } =
    scope === "archived"
      ? await query.eq("status", "archived")
      : await query.neq("status", "archived");

  if (error) {
    console.error("Kunne ikke hente henvendelser:", error.message);
    return [];
  }
  return data ?? [];
}

/** Til navpunktet i admin-layouten. */
export async function countUnreadEnquiries(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  if (error) return 0;
  return count ?? 0;
}

/** Henvendelser der videresendingen til HubSpot står igjen som mislykket. */
export async function countFailedForwards(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("hubspot_state", "failed");

  if (error) return 0;
  return count ?? 0;
}
