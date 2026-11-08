import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import PlaceholderImage from "./PlaceholderImage";

export interface CategoryTile {
  key: string;
  title: string;
  teaser: string;
  /** Ferdig lokalisert sti */
  href: string;
  slot: string;
}

/*
  Kategoriflisene på /fotografering og /videoproduksjon: stort bilde, navn,
  én linje og en «Se mer»-knapp. Hele flisen er lenken, så treffflaten er
  hele kortet.

  «compact» er den lille varianten nederst på kategorisidene, der den viser
  de andre kategoriene uten tekst og knapp.
*/
export default function CategoryGrid({
  tiles,
  locale,
  seeMore,
  compact = false,
}: {
  tiles: CategoryTile[];
  locale: Locale;
  seeMore: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((tile) => (
          <li key={tile.key} className="min-w-0">
            <Link href={tile.href} className="group block">
              <PlaceholderImage
                slot={tile.slot}
                locale={locale}
                label={tile.title}
                sizes="(max-width: 640px) 50vw, 20vw"
                className="aspect-[4/3] w-full rounded-lg"
              />
              <span className="display mt-3 block text-sm [overflow-wrap:anywhere] group-hover:underline">
                {tile.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
      {tiles.map((tile, index) => (
        <li key={tile.key} className="min-w-0">
          <Link
            href={tile.href}
            className="group block text-center"
          >
            <div className="overflow-hidden rounded-lg">
              <PlaceholderImage
                slot={tile.slot}
                locale={locale}
                label={tile.title}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
                className="aspect-[16/11] w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="display mt-6 text-2xl [overflow-wrap:anywhere]">
              {tile.title}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-smoke">
              {tile.teaser}
            </p>
            <span className="meta-label mt-5 inline-flex items-center rounded-full bg-ink px-5 py-2 text-cream transition-colors group-hover:bg-smoke">
              {seeMore}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
