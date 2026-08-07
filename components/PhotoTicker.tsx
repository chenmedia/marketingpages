import PlaceholderImage, { photo } from "./PlaceholderImage";

// Rammene navngir de faktiske prosjektene bildene er fra (jf. filnavn-kontekst)
const frames = [
  { label: "KarpeWorld i Oslo", src: photo.epicStage },
  { label: "Ringnes x Imsdal, aktivering", src: photo.ringnesImsdal },
  { label: "KarpeWorld, scenen", src: photo.vocalist },
  { label: "Festivalområdet", src: photo.festivalLife },
  { label: "KarpeWorld, lysshow", src: photo.lightshow },
  { label: "Karpe møter publikum", src: photo.meetCrowd },
  { label: "Red Bull, aktivering", src: photo.redbull },
  { label: "Crew og produksjon", src: photo.crewLogistics },
];

// Full-bredde rullende fotostripe. Innholdet dupliseres for sømløs loop.
export default function PhotoTicker({ alt }: { alt: string }) {
  return (
    <section aria-label={alt} className="overflow-hidden border-y border-ink/10 bg-shell">
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex">
            {frames.map((frame) => (
              <PlaceholderImage
                key={`${copy}-${frame.label}`}
                label={frame.label}
                src={frame.src}
                className="h-36 w-56 shrink-0 border-r border-ink/10 sm:h-44 sm:w-72"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
