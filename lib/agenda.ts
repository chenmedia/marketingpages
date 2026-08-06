/*
  EKSEMPELDATA for «Kommende kalender»-widgeten i booking-seksjonen.
  Byttes med Chen Medias faktiske kalender før lansering — Kai vedlikeholder
  denne listen manuelt (eller vi kobler den mot en kalenderkilde senere).
  `who`: initialer som vises i sirkelchipen per rad (K = Kai).
*/
export interface AgendaEntry {
  day: string;
  month: { no: string; en: string };
  title: { no: string; en: string };
  location: string;
  status: "booked" | "open";
  who: string[];
}

export const agenda: AgendaEntry[] = [
  { day: "28", month: { no: "AUG", en: "AUG" }, title: { no: "Konferanse (booket)", en: "Conference (booked)" }, location: "Oslo", status: "booked", who: ["K"] },
  { day: "4", month: { no: "SEP", en: "SEP" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "11", month: { no: "SEP", en: "SEP" }, title: { no: "Firmaevent (booket)", en: "Corporate event (booked)" }, location: "Oslo", status: "booked", who: ["K"] },
  { day: "18", month: { no: "SEP", en: "SEP" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "25", month: { no: "SEP", en: "SEP" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "2", month: { no: "OKT", en: "OCT" }, title: { no: "Lansering (booket)", en: "Launch event (booked)" }, location: "Oslo", status: "booked", who: ["K"] },
  { day: "9", month: { no: "OKT", en: "OCT" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "16", month: { no: "OKT", en: "OCT" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "23", month: { no: "OKT", en: "OCT" }, title: { no: "Konferanse (booket)", en: "Conference (booked)" }, location: "Trondheim", status: "booked", who: ["K"] },
  { day: "30", month: { no: "OKT", en: "OCT" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "6", month: { no: "NOV", en: "NOV" }, title: { no: "Ledig for oppdrag", en: "Open for bookings" }, location: "Oslo / hele Norge", status: "open", who: ["K"] },
  { day: "13", month: { no: "NOV", en: "NOV" }, title: { no: "Julebord (booket)", en: "Christmas party (booked)" }, location: "Oslo", status: "booked", who: ["K"] },
];
