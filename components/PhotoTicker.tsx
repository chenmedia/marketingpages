import PlaceholderImage from "./PlaceholderImage";

const frames = [
  { label: "Snap Session — Oslo", tone: "butter" },
  { label: "Pitch Event — Optiver", tone: "ink" },
  { label: "Varner x Levi's", tone: "bone" },
  { label: "Nordisk Film Kino", tone: "olive" },
  { label: "DNT", tone: "shell" },
  { label: "OBOS", tone: "bone" },
  { label: "Hurtigruten", tone: "ink" },
  { label: "Av-og-til", tone: "shell" },
] as const;

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
                tone={frame.tone}
                className="h-36 w-56 shrink-0 border-r border-ink/10 sm:h-44 sm:w-72"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
