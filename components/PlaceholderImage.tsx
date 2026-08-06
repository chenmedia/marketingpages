import Image from "next/image";

/*
  Bildeflate med faktiske foto fra Kais portefølje (public/portfolio,
  hentet fra Google Drive — KarpeWorld 2026). Bildet velges deterministisk
  fra manifestet basert på label, så samme flate alltid viser samme foto.
  Bytt til kuraterte bilder per flate ved å utvide manifestet og/eller
  sende inn `src` direkte.
*/
export const portfolioPhotos = [
  "/portfolio/karpe-stage-1.jpg",
  "/portfolio/karpe-crowd-1.jpg",
  "/portfolio/karpe-stage-2.jpg",
  "/portfolio/karpe-lifestyle-1.jpg",
  "/portfolio/karpe-brand-1.jpg",
  "/portfolio/karpe-stage-3.jpg",
  "/portfolio/karpe-brand-2.jpg",
  "/portfolio/karpe-lifestyle-2.jpg",
];

function pick(label: string): string {
  let hash = 0;
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return portfolioPhotos[hash % portfolioPhotos.length];
}

export default function PlaceholderImage({
  label,
  src,
  className = "",
}: {
  label: string;
  src?: string;
  /** Beholdt for kompatibilitet med eksisterende kall — brukes ikke lenger */
  tone?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src ?? pick(label)}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
