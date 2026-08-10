import PlaceholderImage from "@/components/PlaceholderImage";
import type { Locale } from "@/lib/i18n";

/*
  «Alene, eller med et komplett crew» — tre overlappende sirkler og en linje
  tekst, rett under CTA-knappene i heroen.

  Sirklene overlapper med -space-x-3 og har en ring i bakgrunnsfargen, som er
  det som gjør at de leses som en gruppe mennesker og ikke tre løse bilder.
  Ringen er ikke en kant på bildet: den ligger utenpå og skiller sirkelen fra
  naboen under.

  Bildene er dekorative, se crew-slotene i lib/images/slots. Teksten ved
  siden av sier hva de viser.
*/
const CREW_SLOTS = ["crew-1", "crew-2", "crew-3"] as const;

export default function CrewLine({
  label,
  locale,
}: {
  label: string;
  locale: Locale;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 -space-x-3">
        {CREW_SLOTS.map((slot) => (
          <PlaceholderImage
            key={slot}
            slot={slot}
            locale={locale}
            label=""
            sizes="44px"
            className="size-11 rounded-full ring-2 ring-cream"
          />
        ))}
      </div>
      <p className="max-w-xs text-sm leading-snug text-smoke">{label}</p>
    </div>
  );
}
