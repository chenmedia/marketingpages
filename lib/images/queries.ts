import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createAnonClient } from "@/lib/supabase/anon";

export const IMAGES_TAG = "images";

export type SiteImage = {
  slot: string;
  url: string;
  alt_no: string;
  alt_en: string;
  caption: string | null;
  focal_x: number;
  focal_y: number;
  width: number;
  height: number;
  blur_data_url: string | null;
};

/** Offentlig URL til en fil i site-images-bøtta. */
export function publicUrlFor(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/site-images/${path}`;
}

/*
  Alle bildeflater som har fått eget bilde.

  Samme mønster som getSiteStats: anon-klient uten cookies fordi
  unstable_cache ikke kan lese cookies, og kaster aldri. Feiler databasen,
  får hver flate standardbildet sitt i stedet for at forsiden gir 500.

  NB: returnerer en array, ikke en Map. unstable_cache serialiserer svaret,
  og en Map overlever ikke turen gjennom cachen; den kommer tilbake som et
  tomt objekt uten .get(). Oppslaget bygges derfor utenfor.
*/
const fetchSiteImages = unstable_cache(
  async (): Promise<SiteImage[]> => {
    const sb = createAnonClient();
    if (!sb) return [];

    const { data, error } = await sb
      .from("site_images")
      .select(
        "slot, path, alt_no, alt_en, caption, focal_x, focal_y, width, height, blur_data_url"
      );

    if (error) {
      console.error("[images] site_images feilet:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({ ...row, url: publicUrlFor(row.path) }));
  },
  ["site-images-v1"],
  { tags: [IMAGES_TAG], revalidate: 3600 }
);

/*
  Oppslag på slot. React cache() memoiserer per render, så de 22 flatene
  bygger kartet én gang selv om hver av dem spør.
*/
export const getSiteImages = cache(async (): Promise<Map<string, SiteImage>> => {
  const rows = await fetchSiteImages();
  return new Map(rows.map((row) => [row.slot, row]));
});
