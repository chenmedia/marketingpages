import type { Locale } from "@/lib/i18n";

/*
  GENERERT fra manifestene som ble laget da bildene ble valgt ut fra
  Dropbox (Marketing Pages Assets - Folder structure). Rediger gjerne
  alt-tekst og fokuspunkt for hånd. Bildet nummer én i hver liste er cover.

  Filene ligger i public/portfolio/<kategori>/ som WebP, maks 2400 px.
*/
export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  /** Fokuspunkt [x, y] fra 0 til 1, blir object-position */
  focal: readonly [number, number];
  alt: Record<Locale, string>;
}

export const PROJECT_IMAGES: Record<string, ProjectImage[]> = {};
