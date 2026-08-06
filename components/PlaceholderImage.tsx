/*
  Bildeflate i påvente av foto fra Kai. Hele malen er bildedrevet, så alle
  flater rendres med riktig format og en mono-label — klare til å byttes mot
  <Image> når fotoene er levert.
*/
const tones = {
  bone: "bg-bone text-smoke",
  shell: "bg-shell text-smoke",
  butter: "bg-butter text-smoke",
  ink: "bg-ink text-sand",
  olive: "bg-olive text-cream",
} as const;

export default function PlaceholderImage({
  label,
  tone = "bone",
  className = "",
}: {
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${tones[tone]} ${className}`}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      {/* Hjørneprikker som i decken */}
      <span aria-hidden className="absolute left-2 top-2 size-1 rounded-full bg-current opacity-60" />
      <span aria-hidden className="absolute right-2 top-2 size-1 rounded-full bg-current opacity-60" />
      <span aria-hidden className="absolute bottom-2 left-2 size-1 rounded-full bg-current opacity-60" />
      <span aria-hidden className="absolute bottom-2 right-2 size-1 rounded-full bg-current opacity-60" />
      <span className="meta-label absolute inset-0 flex items-center justify-center p-4 text-center">
        {label}
      </span>
    </div>
  );
}
