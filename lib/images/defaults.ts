/*
  Standardbildene. Ligger i repoet under public/portfolio og vises til en
  bildeflate får sitt eget bilde fra databasen.

  Grunnbiblioteket er fra KarpeWorld. Leveranseflaten på forsiden bruker en
  egen Oslo Business Forum-serie lenger ned i filen. Etter hvert som slotene
  fylles i /admin/bilder, blir begge deler bare et sikkerhetsnett.
*/
export const photo = {
  lightshow: "/portfolio/karpeworld-karpe-lightshow.jpg",
  meetCrowd: "/portfolio/karpeworld-karpe-meet-crowd.jpg",
  vocalist: "/portfolio/karpeworld-karpe-vocalist.jpg",
  epicStage: "/portfolio/karpeworld-mikeithappen-stage.jpg",
  crewLogistics: "/portfolio/karpeworld-lifestyle-shuttle.jpg",
  festivalLife: "/portfolio/karpeworld-lifestyle-area.jpg",
  ringnesImsdal: "/portfolio/karpeworld-ringnes-imsdal.jpg",
  redbull: "/portfolio/karpeworld-redbull-shark.jpg",
} as const;

/*
  Egen, sammenhengende serie for leveranseflaten på forsiden. Disse holdes
  utenfor portfolioPhotos med vilje, slik at innføringen ikke endrer de
  deterministiske fallback-bildene på nyheter og kundecase.
*/
export const obfPhoto = {
  exhibition: "/portfolio/oslo-business-forum-exhibition.jpg",
  branding: "/portfolio/oslo-business-forum-branding.jpg",
  redCarpet: "/portfolio/oslo-business-forum-red-carpet.jpg",
  entrance: "/portfolio/oslo-business-forum-entrance.jpg",
} as const;

export const portfolioPhotos = Object.values(photo);

/*
  Flater uten egen slot, altså nyhetssaker og kundecase, får et bilde valgt
  deterministisk ut fra etiketten. Samme etikett gir alltid samme bilde, så
  siden ikke bytter utseende mellom to bygg.

  Dette erstattet et kart med 23 regexer mot kundenavn. Det kartet så
  kuratert ut, men pekte uansett inn i det samme ene oppdraget. Får nyheter
  og case egne bilder senere, hører de hjemme som egne slots.
*/
export function fallbackFor(label: string): string {
  let hash = 0;
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return portfolioPhotos[hash % portfolioPhotos.length];
}
