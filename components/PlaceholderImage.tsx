import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { fallbackFor } from "@/lib/images/defaults";
import { getSiteImages } from "@/lib/images/queries";
import { SLOT_BY_KEY } from "@/lib/images/slots";

/*
  Én bildeflate på nettsiden.

  Async server-komponent som slår opp selv, samme grep som AgendaWidget.
  getSiteImages er unstable_cache, så de 22 flatene deler ett oppslag i
  stedet for at bildene må tres gjennom hele komponenttreet.

  Tre måter å bestemme bildet, i denne rekkefølgen:
    slot   flaten har et navn og kan styres fra /admin/bilder
    src    kallstedet bestemmer selv
    label  deterministisk valg blant standardbildene, for nyheter og case
           som ikke har egne flater ennå
*/
export default async function PlaceholderImage({
  slot,
  label,
  src,
  locale = "no",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: {
  slot?: string;
  /** Brukes som alt-tekst når flaten ikke har eget bilde */
  label: string;
  src?: string;
  locale?: Locale;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const def = slot ? SLOT_BY_KEY.get(slot) : undefined;
  const images = slot ? await getSiteImages() : null;
  const image = slot ? images?.get(slot) : undefined;

  const resolvedSrc = image?.url ?? src ?? def?.fallback ?? fallbackFor(label);

  /*
    Alt-teksten kommer fra bildet når flaten har ett, ellers fra slotens
    beskrivelse av standardbildet, ellers fra label. Dekorative flater får
    tom alt, som er det riktige for et bakgrunnsbilde bak et overlegg.
  */
  const alt = def?.decorative
    ? ""
    : image
      ? locale === "no"
        ? image.alt_no
        : image.alt_en
      : (def?.fallbackAlt ?? label);

  /*
    Fokuspunktet er poenget med hele oppsettet: det samme bildet beskjæres
    til seks ulike forhold, og uten dette kutter 9:16-utsnittet hodet av folk
    som ikke står midt i bildet.
  */
  const objectPosition = image
    ? `${image.focal_x * 100}% ${image.focal_y * 100}%`
    : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={image?.blur_data_url ? "blur" : "empty"}
        blurDataURL={image?.blur_data_url ?? undefined}
        style={objectPosition ? { objectPosition } : undefined}
        className="object-cover"
      />
    </div>
  );
}

/** Bildeteksten under hero-polaroidene, som redigeres sammen med bildet. */
export async function slotCaption(slot: string, fallback: string) {
  const images = await getSiteImages();
  return images.get(slot)?.caption ?? fallback;
}
