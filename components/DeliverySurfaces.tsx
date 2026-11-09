import PlaceholderImage from "@/components/PlaceholderImage";
import type { Dictionary, Locale } from "@/lib/i18n";

/*
  Høyre side av «Verdien etterpå» på forsiden.

  Øverst et redigert utvalg: hovedbildet markert, to høydepunkter ved siden
  av. Under går hovedbildet igjen i tre flater: story på telefon, nettsak i
  nettleser og en trykksak. Det er samme bilde i alle tre, så det er tydelig
  at det er tilpasset kanalen og ikke bare et nytt foto. Fokuspunktet fra
  /admin/bilder styrer beskjæringen i alle formatene.

  Tidsmerkelappen over hver flate viser når innholdet brukes. Den er et
  forslag, og notatet under sier det.

  Flatene er illustrasjoner, så de er skjult for skjermlesere. Bildetekstene
  under dem er ikke det.
*/
export default function DeliverySurfaces({
  liveOn,
  locale,
}: {
  liveOn: Dictionary["liveOn"];
  locale: Locale;
}) {
  const { mock, formats } = liveOn;
  const main = "leveranse-hoved";

  return (
    <div>
      {/* Redigert utvalg */}
      <div className="grid aspect-[4/3] grid-cols-[2fr_1fr] grid-rows-2 gap-2 sm:aspect-[16/9]">
        <figure className="relative row-span-2 overflow-hidden rounded-2xl">
          <PlaceholderImage
            slot={main}
            locale={locale}
            label={liveOn.formatMain}
            sizes="(max-width: 1024px) 66vw, 38vw"
            className="h-full w-full"
          />
          {/* Valgt-markering: ring og hake */}
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-cream" />
          <span
            aria-hidden
            className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-cream text-ink"
          >
            <svg viewBox="0 0 12 12" className="size-3" fill="none">
              <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <figcaption className="meta-label absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1.5 text-cream backdrop-blur-sm">
            {liveOn.formatMain}
          </figcaption>
        </figure>
        {(["leveranse-2", "leveranse-3"] as const).map((slot, i) => (
          <figure key={slot} className="relative overflow-hidden rounded-xl">
            <PlaceholderImage
              slot={slot}
              locale={locale}
              label={`${liveOn.highlight} ${i + 2}`}
              sizes="(max-width: 1024px) 33vw, 19vw"
              className="h-full w-full"
            />
            <figcaption className="meta-label absolute bottom-2 left-2 hidden rounded-full bg-ink/75 px-2.5 py-1 text-[0.625rem] tabular-nums text-cream backdrop-blur-sm sm:block">
              {liveOn.highlight} {String(i + 2).padStart(2, "0")}
            </figcaption>
          </figure>
        ))}
      </div>

      {/*
        Tre flater. Mobil: nettleseren over hele bredden, telefon og trykk
        side om side under (2/5 og 3/5 gir nesten lik høyde). Fra sm: én rad,
        kolonnebredder valgt så de tre blir omtrent like høye.
      */}
      <div className="mt-8 grid grid-cols-5 items-end gap-x-4 gap-y-8 sm:grid-cols-[0.62fr_1.5fr_0.8fr] sm:gap-x-5">
        {/* Story */}
        <figure className="col-span-2 sm:col-span-1">
          <div
            aria-hidden
            className="relative aspect-[9/19] overflow-hidden rounded-[1.4rem] border-[5px] border-[#2a2a2a] bg-black shadow-2xl shadow-black/50"
          >
            <div className="absolute inset-0">
              <PlaceholderImage slot={main} locale={locale} label="" sizes="160px" className="h-full w-full" />
            </div>
            <div className="absolute inset-x-2 top-2 flex gap-0.5">
              <span className="h-0.5 flex-1 rounded-full bg-cream" />
              <span className="h-0.5 flex-1 rounded-full bg-cream/40" />
              <span className="h-0.5 flex-1 rounded-full bg-cream/40" />
            </div>
            <p className="absolute left-2 top-4 flex items-center gap-1.5 text-[0.5625rem] font-bold text-cream">
              <span className="size-4 rounded-full bg-cream" />
              {mock.handle}
            </p>
            <p className="absolute inset-x-2 bottom-8 -rotate-3 rounded-md bg-cream px-2 py-1.5 text-[0.625rem] font-extrabold leading-tight text-ink">
              {mock.story}
            </p>
            <span className="absolute inset-x-2 bottom-2 h-4 rounded-full border border-cream/50" />
          </div>
          <SurfaceCaption when={formats[0]?.when} name={formats[0]?.name} />
        </figure>

        {/* Nettsak */}
        <figure className="order-first col-span-5 sm:order-none sm:col-span-1">
          <div aria-hidden className="overflow-hidden rounded-lg bg-cream text-ink shadow-2xl shadow-black/50">
            <div className="flex items-center gap-1 bg-bone px-2.5 py-2">
              <span className="size-1.5 rounded-full bg-sand" />
              <span className="size-1.5 rounded-full bg-sand" />
              <span className="size-1.5 rounded-full bg-sand" />
              <span className="ml-2.5 flex-1 truncate rounded bg-cream px-2 py-0.5 text-[0.5625rem] text-olive">
                {mock.url}
              </span>
            </div>
            <div className="flex justify-between gap-3 border-b border-bone px-3.5 py-2 text-[0.5625rem]">
              <span className="font-bold uppercase">{mock.siteName}</span>
              <span className="truncate text-olive">{mock.siteNav}</span>
            </div>
            <PlaceholderImage
              slot={main}
              locale={locale}
              label=""
              sizes="(max-width: 640px) 100vw, 320px"
              className="aspect-video w-full"
            />
            <div className="px-3.5 pb-3.5 pt-2.5">
              <p className="text-[0.5rem] font-bold uppercase tracking-widest text-olive">{mock.articleKicker}</p>
              <p className="mt-1 text-[0.8125rem] font-extrabold leading-tight tracking-tight text-balance">
                {mock.articleTitle}
              </p>
              <span className="mt-2 block h-1 w-11/12 rounded-full bg-bone" />
              <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-bone" />
            </div>
          </div>
          <SurfaceCaption when={formats[1]?.when} name={formats[1]?.name} />
        </figure>

        {/* Trykk */}
        <figure className="col-span-3 sm:col-span-1">
          <div
            aria-hidden
            className="flex aspect-[1/1.414] rotate-2 flex-col bg-cream p-[9%] text-ink shadow-2xl shadow-black/60"
          >
            <PlaceholderImage
              slot={main}
              locale={locale}
              label=""
              sizes="(max-width: 640px) 50vw, 180px"
              className="w-full basis-[52%] shrink-0"
            />
            <p className="mt-2.5 text-[0.4375rem] font-bold uppercase tracking-[0.14em] text-olive">
              {mock.printKicker}
            </p>
            <p className="mt-0.5 text-xs font-extrabold leading-none tracking-tight">{mock.printTitle}</p>
            <span className="mt-2 block h-[3px] w-full rounded-full bg-bone" />
            <span className="mt-1 block h-[3px] w-10/12 rounded-full bg-bone" />
            <span className="mt-1 block h-[3px] w-11/12 rounded-full bg-bone" />
            <span className="mt-1 block h-[3px] w-1/2 rounded-full bg-bone" />
          </div>
          <SurfaceCaption when={formats[2]?.when} name={formats[2]?.name} />
        </figure>
      </div>

      <p className="mt-8 flex max-w-lg items-start gap-2.5 text-sm leading-relaxed text-pretty text-sand">
        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-sand" />
        {liveOn.timelineNote}
      </p>
    </div>
  );
}

function SurfaceCaption({ when, name }: { when?: string; name?: string }) {
  return (
    <figcaption className="mt-3.5 leading-tight">
      <span className="meta-label block text-cream">{when}</span>
      <span className="meta-label mt-1 block [overflow-wrap:anywhere] text-sand">{name}</span>
    </figcaption>
  );
}
