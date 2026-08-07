import "server-only";
import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";
import type { AgendaRow } from "./types";

export const AGENDA_TAG = "agenda";

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
