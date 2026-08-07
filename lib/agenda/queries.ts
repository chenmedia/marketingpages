import "server-only";
import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import type { AgendaRow } from "./types";

export const AGENDA_TAG = "agenda";

type NextFreeDay = { day: string; free: number };

/*
  Offentlig kalender for widgeten.

  revalidate er sikkerhetsnettet: agenda_public filtrerer på dagens dato, så
  uten en tidsbasert revalidering ville et arrangement hengt igjen i listen
  etter at det passerte. Det dekker også at en Server Action skulle glemme
  sitt revalideringskall.

  Kaster aldri. Widgeten står på fem sider, og en databasefeil skal ikke gi
  500 på forsiden.
*/
export const getAgenda = unstable_cache(
  async (): Promise<AgendaRow[]> => {
    const sb = createAnonClient();
    if (!sb) return [];

    const { data, error } = await sb.rpc("agenda_public", { p_limit: 20 });
    if (error) {
      console.error("[agenda] agenda_public feilet:", error.message);
      return [];
    }
    return (data ?? []) as unknown as AgendaRow[];
  },
  ["agenda-public-v1"],
  { tags: [AGENDA_TAG], revalidate: 3600 }
);

/*
  Første dato framover med ledig kapasitet.

  Uten denne viser widgeten bare når Kai er opptatt. Dagens statiske liste har
  syv «Ledig for oppdrag»-rader som aktivt selger ledighet, og den funksjonen
  ville ellers gått tapt i omleggingen.
*/
export const getNextFreeDay = unstable_cache(
  async (): Promise<string | null> => {
    const sb = createAnonClient();
    if (!sb) return null;

    const { data, error } = await sb.rpc("next_free_days", { p_days: 120 });
    if (error) {
      console.error("[agenda] next_free_days feilet:", error.message);
      return null;
    }
    const days = (data ?? []) as unknown as NextFreeDay[];
    return days.find((d) => d.free > 0)?.day ?? null;
  },
  ["agenda-next-free-v1"],
  { tags: [AGENDA_TAG], revalidate: 3600 }
);
