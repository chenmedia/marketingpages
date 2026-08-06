import Image from "next/image";

/*
  Bildeflate med faktiske foto fra Kais portefølje (public/portfolio,
  hentet fra Google Drive). Filnavnene bevarer konteksten fra
  originalfilene (DATO_TID_Event_Motiv), f.eks.
  «20260703_1911_KarpeWorld_Ringnes_Imsdal_03436» → karpeworld-ringnes-imsdal.
  Kuratering: `src` fra kallstedet vinner; ellers matches label mot
  nøkkelord-kartet under; ellers deterministisk hash-valg.
*/
export const photo = {
  // KarpeWorld_Karpe — publikum mot scenen, lysstråler (stående)
  lightshow: "/portfolio/karpeworld-karpe-lightshow.jpg",
  // KarpeWorld_Karpe — artist møter publikum, TV-kameraer i bildet
  meetCrowd: "/portfolio/karpeworld-karpe-meet-crowd.jpg",
  // KarpeWorld_Karpe — vokalist på scenen, nærbilde (stående)
  vocalist: "/portfolio/karpeworld-karpe-vocalist.jpg",
  // KarpeWorld_Mikeithappen — hele produksjonen i skumring
  epicStage: "/portfolio/karpeworld-mikeithappen-stage.jpg",
  // KarpeWorld_Lifestyle — logistikk, vakter og shuttlebuss
  crewLogistics: "/portfolio/karpeworld-lifestyle-shuttle.jpg",
  // KarpeWorld_Lifestyle — festivalområdet, folk ved bordene
  festivalLife: "/portfolio/karpeworld-lifestyle-area.jpg",
  // KarpeWorld_Ringnes_Imsdal — merkevareaktivering, produkt i hånd (stående)
  ringnesImsdal: "/portfolio/karpeworld-ringnes-imsdal.jpg",
  // KarpeWorld_Redbull — aktivering med hai i skumbasseng
  redbull: "/portfolio/karpeworld-redbull-shark.jpg",
} as const;

export const portfolioPhotos = Object.values(photo);

// Kontekst-kuratering: første regel som treffer label vinner
const curation: [RegExp, string][] = [
  [/karpe/i, photo.lightshow],
  [/ringnes|imsdal/i, photo.ringnesImsdal],
  [/red ?bull/i, photo.redbull],
  [/snap session/i, photo.festivalLife],
  [/optiver|aktiv|pitch event/i, photo.vocalist],
  [/varner|levi/i, photo.redbull],
  [/hurtigruten|ignite/i, photo.epicStage],
  [/dnt/i, photo.crewLogistics],
  [/obos/i, photo.lightshow],
  [/jcp/i, photo.meetCrowd],
  [/nordisk film/i, photo.lightshow],
  [/av-og-til/i, photo.ringnesImsdal],
  [/portrett|portrait/i, photo.vocalist],
  [/bak kamera|behind/i, photo.meetCrowd],
  [/fra salen|from the/i, photo.lightshow],
  [/stillbilde|still/i, photo.epicStage],
  [/leveranse|redigert|edited|delivery/i, photo.epicStage],
  [/some/i, photo.vocalist],
  [/web/i, photo.ringnesImsdal],
  [/trykk|print/i, photo.lightshow],
  [/eventfilm|event film/i, photo.epicStage],
  [/eventfoto|event photo/i, photo.meetCrowd],
] as [RegExp, string][];

function pick(label: string): string {
  for (const [pattern, src] of curation) {
    if (pattern.test(label)) return src;
  }
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
