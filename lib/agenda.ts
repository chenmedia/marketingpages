/*
  EKSEMPELDATA for «Kommende kalender»-widgeten i booking-seksjonen.
  Byttes med Chen Medias faktiske kalender før lansering — Kai vedlikeholder
  denne listen manuelt (eller vi kobler den mot en kalenderkilde senere).
*/
export interface AgendaEntry {
  day: string;
  month: { no: string; en: string };
  title: { no: string; en: string };
  location: string;
  status: "booked" | "open";
}

export const agenda: AgendaEntry[] = [
  {
    day: "28",
    month: { no: "AUG", en: "AUG" },
    title: { no: "Konferanse (booket)", en: "Conference (booked)" },
    location: "Oslo",
    status: "booked",
  },
  {
    day: "04",
    month: { no: "SEP", en: "SEP" },
    title: { no: "Ledig for oppdrag", en: "Open for bookings" },
    location: "Oslo / hele Norge",
    status: "open",
  },
  {
    day: "11",
    month: { no: "SEP", en: "SEP" },
    title: { no: "Firmaevent (booket)", en: "Corporate event (booked)" },
    location: "Oslo",
    status: "booked",
  },
  {
    day: "18",
    month: { no: "SEP", en: "SEP" },
    title: { no: "Ledig for oppdrag", en: "Open for bookings" },
    location: "Oslo / hele Norge",
    status: "open",
  },
  {
    day: "25",
    month: { no: "SEP", en: "SEP" },
    title: { no: "Ledig for oppdrag", en: "Open for bookings" },
    location: "Oslo / hele Norge",
    status: "open",
  },
];
