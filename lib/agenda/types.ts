/** Én rad i kalenderwidgeten, slik agenda_public() returnerer den. */
export type AgendaRow = {
  id: string;
  starts_on: string; // ISO-dato, "2026-10-04"
  ends_on: string;
  title_no: string;
  title_en: string;
  location_no: string;
  location_en: string | null;
  /** «confirmed» eller «tentative». Avlyste returneres ikke. */
  status: "confirmed" | "tentative";
  /** Fotografene som er satt opp, i sorteringsrekkefølge */
  assigned: { initials: string; name: string }[];
  /** Laveste antall ledige i spennet. Kan være negativ ved overbooking. */
  free_min: number;
  /** { "2026-10-04": 7, "2026-10-05": 6 } */
  free_by_day: Record<string, number>;
  /*
    Ingen team_size her med vilje. Funksjonen returnerte den før, og siden
    RPC-en er åpen for anon var teamets størrelse dermed lesbar for hvem som
    helst. free_min og free_by_day er relative tall og røper ikke totalen.
  */
};

export type Photographer = {
  id: string;
  display_name: string;
  initials: string;
  role_no: string | null;
  role_en: string | null;
  is_active: boolean;
  counts_toward_capacity: boolean;
  sort_order: number;
};

export const EVENT_KINDS = ["booking", "hold", "internal"] as const;
export const EVENT_STATUSES = ["tentative", "confirmed", "cancelled"] as const;

export type EventKind = (typeof EVENT_KINDS)[number];
export type EventStatus = (typeof EVENT_STATUSES)[number];

export const KIND_LABELS: Record<EventKind, string> = {
  booking: "Booking",
  hold: "Opsjon",
  internal: "Internt (vises ikke)",
};

export const STATUS_LABELS: Record<EventStatus, string> = {
  tentative: "Tentativ",
  confirmed: "Bekreftet",
  cancelled: "Avlyst",
};
