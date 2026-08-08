import { EVENT_KINDS, EVENT_STATUSES, type EventKind, type EventStatus } from "./types";

/*
  Håndskrevet validering, ingen zod. CHECK-constraintene i databasen er den
  egentlige garantien; dette gir bare lesbare feilmeldinger i skjemaet.
*/
export type EventInput = {
  starts_on: string;
  ends_on: string;
  title_no: string;
  title_en: string;
  location_no: string;
  location_en: string | null;
  kind: EventKind;
  status: EventStatus;
  is_published: boolean;
  client: string | null;
  notes: string | null;
  photographerIds: string[];
};

export type FieldErrors = Partial<Record<keyof EventInput | "_", string>>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/*
  Speiler check-constraintene i databasen. Grensene finnes begge steder med
  vilje: databasen er garantien, denne gir en lesbar feilmelding i skjemaet i
  stedet for en rå Postgres-feil.
*/
const MAX = { title: 200, location: 200, name: 100, client: 200, notes: 4000 };

function tooLong(value: string | null, limit: number) {
  return value !== null && value.length > limit;
}

function text(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function optional(form: FormData, key: string): string | null {
  const v = text(form, key);
  return v === "" ? null : v;
}

export function parseEventForm(
  form: FormData
): { ok: true; value: EventInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const starts_on = text(form, "starts_on");
  // Tom sluttdato betyr endagsarrangement
  const ends_on = text(form, "ends_on") || starts_on;

  if (!ISO_DATE.test(starts_on)) errors.starts_on = "Velg en startdato.";
  if (!ISO_DATE.test(ends_on)) errors.ends_on = "Ugyldig sluttdato.";
  if (!errors.starts_on && !errors.ends_on && ends_on < starts_on) {
    errors.ends_on = "Sluttdato kan ikke være før startdato.";
  }

  const title_no = text(form, "title_no");
  const title_en = text(form, "title_en");
  const location_no = text(form, "location_no");

  const location_en = optional(form, "location_en");
  const client = optional(form, "client");
  const notes = optional(form, "notes");

  if (!title_no) errors.title_no = "Tittel på norsk må fylles ut.";
  else if (title_no.length > MAX.title)
    errors.title_no = `Tittelen kan være maks ${MAX.title} tegn.`;

  if (!title_en) errors.title_en = "Tittel på engelsk må fylles ut.";
  else if (title_en.length > MAX.title)
    errors.title_en = `Tittelen kan være maks ${MAX.title} tegn.`;

  if (!location_no) errors.location_no = "Sted må fylles ut.";
  else if (location_no.length > MAX.location)
    errors.location_no = `Stedet kan være maks ${MAX.location} tegn.`;

  if (tooLong(location_en, MAX.location))
    errors.location_en = `Stedet kan være maks ${MAX.location} tegn.`;
  if (tooLong(client, MAX.client))
    errors.client = `Kunde kan være maks ${MAX.client} tegn.`;
  if (tooLong(notes, MAX.notes))
    errors.notes = `Notatet kan være maks ${MAX.notes} tegn.`;

  const kind = text(form, "kind") as EventKind;
  const status = text(form, "status") as EventStatus;
  if (!EVENT_KINDS.includes(kind)) errors.kind = "Ugyldig type.";
  if (!EVENT_STATUSES.includes(status)) errors.status = "Ugyldig status.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      starts_on,
      ends_on,
      title_no,
      title_en,
      location_no,
      location_en,
      kind,
      status,
      // Interne arrangementer skal aldri publiseres
      is_published: kind !== "internal" && form.get("is_published") === "on",
      client,
      notes,
      photographerIds: form.getAll("photographers").map(String).filter(Boolean),
    },
  };
}

export type PhotographerInput = {
  display_name: string;
  initials: string;
  role_no: string | null;
  role_en: string | null;
  is_active: boolean;
  counts_toward_capacity: boolean;
  sort_order: number;
};

export function parsePhotographerForm(
  form: FormData
): { ok: true; value: PhotographerInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const display_name = text(form, "display_name");
  const initials = text(form, "initials").toUpperCase();

  if (!display_name) errors.title_no = "Navn må fylles ut.";
  else if (display_name.length > MAX.name) {
    errors.title_no = `Navnet kan være maks ${MAX.name} tegn.`;
  }
  if (initials.length < 1 || initials.length > 3) {
    errors._ = "Initialer må være mellom én og tre tegn.";
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      display_name,
      initials,
      role_no: optional(form, "role_no"),
      role_en: optional(form, "role_en"),
      is_active: form.get("is_active") === "on",
      counts_toward_capacity: form.get("counts_toward_capacity") === "on",
      sort_order: Number(text(form, "sort_order")) || 0,
    },
  };
}
