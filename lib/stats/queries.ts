import "server-only";
import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";

export const STATS_TAG = "stats";

export type SiteStat = {
  id: number;
  value: string;
  caption_no: string;
  caption_en: string;
};

/*
  Statistikkflisene over kalenderen. Samme mønster som getAgenda: anon-klient
  uten cookies, fordi unstable_cache ikke kan lese cookies, og kaster aldri.
*/
export const getSiteStats = unstable_cache(
  async (): Promise<SiteStat[]> => {
    const sb = createAnonClient();
    if (!sb) return [];

    const { data, error } = await sb
      .from("site_stats")
      .select("id, value, caption_no, caption_en")
      .eq("is_visible", true)
      .order("sort_order");

    if (error) {
      console.error("[stats] site_stats feilet:", error.message);
      return [];
    }
    return data ?? [];
  },
  ["site-stats-v1"],
  { tags: [STATS_TAG], revalidate: 3600 }
);
