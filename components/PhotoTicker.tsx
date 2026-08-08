import PlaceholderImage from "./PlaceholderImage";
import type { Locale } from "@/lib/i18n";

// Åtte rammer, hver med sin egen slot, styrt fra /admin/bilder
const frames = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `stripe-${n}`);

// Full-bredde rullende fotostripe. Innholdet dupliseres for sømløs loop.
export default function PhotoTicker({
  alt,
  locale = "no",
}: {
  alt: string;
  locale?: Locale;
}) {
  return (
    <section aria-label={alt} className="overflow-hidden border-y border-ink/10 bg-shell">
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex">
            {frames.map((slot) => (
              <PlaceholderImage
                key={`${copy}-${slot}`}
                slot={slot}
                locale={locale}
                label=""
                sizes="288px"
                className="h-36 w-56 shrink-0 border-r border-ink/10 sm:h-44 sm:w-72"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
