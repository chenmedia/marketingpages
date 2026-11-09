import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, localeBase } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import { isLocale } from "@/lib/i18n";
import SectionLabel from "@/components/SectionLabel";
import PhotoTicker from "@/components/PhotoTicker";
import PlaceholderImage from "@/components/PlaceholderImage";
import { slotCaption } from "@/components/PlaceholderImage";
import ProcessTimeline from "@/components/ProcessTimeline";
import ContactCTA from "@/components/ContactCTA";
import CtaButton from "@/components/CtaButton";
import LogoWall from "@/components/LogoWall";
import CrewLine from "@/components/CrewLine";
import Underline from "@/components/Underline";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.home.title },
    description: dict.meta.home.description,
    alternates: alternatesFor(locale, "/"),
  };
}

/*
  Bildetekstene er standard; en bildetekst lagt inn i /admin/bilder vinner.

  Plasseringen er målt fra tonmedia.com: en klynge av tre kort i stedet for
  en rad. Stort kort oppe til venstre, ett til høyre litt ned, og ett nederst
  midt mellom dem. Midtkortet ligger øverst, så bildeteksten («Oslo Proptech
  Summit») ikke dekkes av kortet under.
*/
const polaroids = [
  { slot: "hero-1", caption: "KarpeWorld · Oslo", float: "float-a", place: "left-0 top-0 w-[62%]" },
  { slot: "hero-2", caption: "Oslo Proptech Summit", float: "float-b", place: "right-0 top-[22%] z-20 w-[56%]" },
  { slot: "hero-3", caption: "Red Bull · aktivering", float: "float-c", place: "bottom-0 left-[14%] z-10 w-[58%]" },
] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const base = localeBase(locale);

  /*
    Bildetekstene hentes her, ikke inne i map-callbacken. En callback kan ikke
    være async, og oppslaget er uansett cachet, så alle tre deler ett kall.
  */
  const captions = await Promise.all(
    polaroids.map((p) => slotCaption(p.slot, p.caption))
  );

  return (
    <>
      {/* Hero à la TON: tekst venstre, polaroid-stabel høyre */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="@container">
            <p className="meta-label inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-smoke">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ink" />
              {dict.hero.badge}
            </p>
            {/*
              Tittelen måles mot tekstkolonnen, ikke mot vindusbredden. Kolonnen
              er ikke monoton: 720px på nettbrett i én kolonne, 506px når lg
              deler heroen i to, 576px fra xl. Faste br-punkter blir derfor for
              store akkurat der kolonnen er smalest, og overskriften brekker i
              fire linjer med «øyne.» alene. 10.5cqw holder lengste linje på ~90%
              av kolonnen hele veien. text-balance jevner ut linjelengdene.
            */}
            <h1 className="display mt-6 text-[clamp(2rem,10.5cqw,4.5rem)] text-balance">
              {dict.hero.title}{" "}
              <span className="relative inline-block">
                {dict.hero.titleAccent}
                {/* Krusedullen under aksentordet, jf. TONs squiggle under «pro.» */}
                <Underline className="absolute -bottom-4 left-0 h-3.5 w-full text-ink opacity-60" />
              </span>
            </h1>
            {/* whitespace-pre-line: ingressen har et bevisst linjeskift mellom
                de to setningene. Teksten brytes fortsatt fritt ellers. */}
            <p className="mt-6 max-w-xl text-balance whitespace-pre-line text-base leading-relaxed text-smoke sm:text-lg">
              {dict.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton href={`${base}#kontakt`}>{dict.hero.ctaPrimary}</CtaButton>
              <CtaButton href={`${base}/prosjekter`} variant="outline">
                {dict.hero.ctaSecondary}
              </CtaButton>
            </div>

            {/* Crewet rett under knappene, der sosialt bevis hører hjemme */}
            <div className="mt-8">
              <CrewLine label={dict.hero.clientsLabel} locale={locale} />
            </div>
          </div>

          {/* Polaroid-klynge som TONs, også på mobil (under teksten) */}
          <div className="relative mx-auto w-full" aria-hidden>
            <div className="relative h-[460px] lg:h-[600px]">
              {polaroids.map((polaroid, i) => (
                <div
                  key={polaroid.slot}
                  className={`absolute rounded-lg border border-ink/10 bg-cream p-2.5 pb-9 shadow-2xl shadow-ink/25 ${polaroid.place} ${polaroid.float}`}
                >
                  <PlaceholderImage
                    slot={polaroid.slot}
                    locale={locale}
                    label=""
                    sizes="(max-width: 1024px) 60vw, 380px"
                    priority={i === 0}
                    className="aspect-[4/3] w-full rounded-sm"
                  />
                  <p className="meta-label absolute inset-x-3 bottom-2.5 truncate text-smoke">
                    {captions[i]}
                  </p>
                </div>
              ))}
              <p className="meta-label absolute -bottom-2 right-0 rotate-3 rounded-full bg-ink px-4 py-2 text-cream shadow-lg">
                {dict.hero.polaroidBadge}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PhotoTicker alt={dict.ticker.alt} locale={locale} />

      {/* Tjenester: foto, video og digital markedsføring (kommer), med sjekklister */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6">
        {/* Overskrift venstre, ingress høyre: samme venstrekant som resten av siden */}
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <SectionLabel number="02">{dict.services.label}</SectionLabel>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              {dict.services.heading}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-pretty text-smoke md:justify-self-end">
            {dict.services.lead}
          </p>
        </div>

        {/*
          Mobil: kortene under hverandre. Nettbrett: bilde til venstre, tekst til
          høyre. Desktop: tre kolonner som deler rader med grid-rows-subgrid, så
          tekst, liste og lenke havner på samme høyde i alle tre. Radavstanden
          er 0 på lg, ellers ville den arves inn i hvert kort.
        */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-y-0">
          {dict.services.cards.map((card, i) => (
            <article
              key={card.slug}
              className="group relative flex flex-col rounded-2xl bg-shell p-2 transition-colors duration-300 hover:bg-bone/60 md:grid md:grid-cols-[5fr_7fr] md:grid-rows-[auto_auto_1fr] lg:row-span-4 lg:grid-cols-1 lg:grid-rows-subgrid"
            >
              <PlaceholderImage
                slot={`tjeneste-${i + 1}`}
                locale={locale}
                label={card.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                className="aspect-[3/2] w-full rounded-xl md:row-span-3 md:aspect-auto md:h-full md:min-h-80 lg:row-span-1 lg:aspect-[3/2] lg:h-auto lg:min-h-0 [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-out group-hover:[&_img]:scale-[1.03]"
              />
              <div className="px-4 pt-6 sm:px-5">
                <p className="meta-label text-olive">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-2 text-2xl">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-pretty text-smoke">
                  {card.body}
                </p>
              </div>
              <ul className="mx-4 mt-6 space-y-2.5 border-t border-ink/10 pt-5 sm:mx-5">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm">
                    <svg
                      viewBox="0 0 12 12"
                      className="mt-1 size-3 shrink-0 text-olive"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 6.5L4.5 9L10 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto px-4 pb-5 pt-8 sm:px-5 md:mt-0 md:self-end">
                {/* after-elementet strekker lenken over hele kortet, så alt er klikkbart */}
                <Link
                  href={card.slug.startsWith("#") ? `${base}${card.slug}` : `${base}/${card.slug}`}
                  className="meta-label inline-flex items-center gap-2 border-b-2 border-ink pb-1 outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
                >
                  {card.linkLabel}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/*
        Mørk differensiator: «arrangementet lever videre».

        Bildene viser påstanden i teksten: ett oppdrag, levert i flere formater.
        Formatrammene har ekte sideforhold (9:16, 16:9, A4) og samme høyde.
        Kolonnebreddene er sideforholdet ganget med 16, så høyden blir lik
        uten at noe må regnes ut i JavaScript.
      */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-5">
            <SectionLabel tone="light" number="03">
              {dict.liveOn.label}
            </SectionLabel>
            <h2 className="display mt-4 text-3xl text-balance sm:text-4xl">
              {dict.liveOn.heading}
            </h2>
            {dict.liveOn.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={`mt-5 max-w-lg leading-relaxed text-pretty text-sand ${
                  i === 0 ? "text-base sm:text-lg" : "text-base"
                }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Leveransen som nummerert liste, ikke enda en sjekkliste */}
            <ol className="mt-8 max-w-lg border-t border-cream/15">
              {dict.liveOn.points.map((point, i) => (
                <li
                  key={point}
                  className="flex items-baseline gap-5 border-b border-cream/15 py-4"
                >
                  <span className="meta-label tabular-nums text-sand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base">{point}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Link
                href={`${base}#prosess`}
                className="meta-label group inline-flex items-center gap-2 rounded-full border border-cream px-6 py-3 transition duration-200 hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream active:scale-[0.98]"
              >
                {dict.liveOn.cta}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="relative">
              <PlaceholderImage
                slot="leveranse-hoved"
                locale={locale}
                label="Leveranse, redigert utvalg"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[4/3] w-full rounded-2xl"
              />
              <figcaption className="meta-label absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1.5 text-cream backdrop-blur-sm">
                {dict.liveOn.formatMain}
              </figcaption>
            </figure>

            <div className="mt-4 grid grid-cols-[9fr_28.4fr_11.3fr] items-start gap-3 sm:gap-4">
              {(
                [
                  { slot: "leveranse-some", aspect: "aspect-[9/16]" },
                  { slot: "leveranse-web", aspect: "aspect-[16/9]" },
                  { slot: "leveranse-trykk", aspect: "aspect-[1/1.414]" },
                ] as const
              ).map((frame, i) => (
                <figure key={frame.slot} className="min-w-0">
                  <PlaceholderImage
                    slot={frame.slot}
                    locale={locale}
                    label=""
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className={`${frame.aspect} w-full rounded-lg`}
                  />
                  <figcaption className="mt-2.5 leading-tight">
                    <span className="meta-label block [overflow-wrap:anywhere] text-cream">
                      {dict.liveOn.formats[i]?.name}
                    </span>
                    <span className="meta-label mt-0.5 block tabular-nums text-sand">
                      {dict.liveOn.formats[i]?.ratio}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Arbeidet — kategorikort */}
      <section id="arbeid" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="04">{dict.work.label}</SectionLabel>
        <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl">
          {dict.work.heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke">
          {dict.work.lead}
        </p>
        <div
          className={`mt-10 grid gap-6 sm:grid-cols-2 ${
            dict.work.cards.length % 4 === 0 ? "lg:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {dict.work.cards.map((card, i) => (
            <Link
              key={card.title}
              href={`${base}/${card.slug}`}
              /* bg-ink er kortets grunnfarge under fotoet. Den holder teksten
                 lesbar hvis bildet ikke laster, og gjør at kontrastverktøy
                 finner en faktisk bakgrunnsfarge i stedet for å anta hvit. */
              className="group relative block overflow-hidden rounded-lg bg-ink"
            >
              <PlaceholderImage
                slot={`arbeid-${(i % 4) + 1}`}
                locale={locale}
                label={card.title}
                sizes="(max-width: 768px) 100vw, 25vw"
                className="aspect-[4/5] w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-x-0 bottom-0 min-w-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-5 pt-16 text-cream">
                <span className="display block text-xl [overflow-wrap:anywhere]">
                  {card.title}
                </span>
                <span className="meta-label mt-1 block [overflow-wrap:anywhere] text-sand">
                  {card.sub}
                </span>
                <span className="meta-label mt-3 inline-block max-w-full border-b border-cream pb-0.5 [overflow-wrap:anywhere]">
                  {dict.work.linkLabel} →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/*
        Logoveggen står her, ikke i heroen. Den sier ingenting før man vet hva
        Kai leverer, og alt rett etter at man har sett arbeidet: dette er hvem
        det ble laget for. Den egne toppstreken skiller den fra kortene over,
        og «Om Kai» under har egen bakgrunn og skiller seg selv.
      */}
      <section className="pb-20">
        <LogoWall label={dict.clients.label} />
      </section>

      {/* Om Kai */}
      <section id="om" className="scroll-mt-24 bg-shell">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.3fr]">
          <PlaceholderImage
            slot="om-portrett"
            locale={locale}
            label="Kai Chen, portrett"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-[4/5] w-full max-w-sm rounded-lg"
          />
          <div>
            <SectionLabel number="05">{dict.about.label}</SectionLabel>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              {dict.about.heading}
            </h2>
            {dict.about.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-xl text-base leading-relaxed text-smoke"
              >
                {paragraph}
              </p>
            ))}
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {dict.about.facts.map((fact) => (
                <div key={fact.caption} className="border-t-2 border-ink pt-3">
                  <dt className="display text-xl">{fact.value}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-smoke">
                    {fact.caption}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div id="prosess" className="scroll-mt-24">
        <ProcessTimeline dict={dict} />
      </div>

      {/*
        Hvem er Chen Media for? Overskriften står fast i venstre kolonne mens
        de fire målgruppene scroller forbi på desktop. Undergruppene vises som
        etiketter, ikke som enda en sjekkliste.
      */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel number="06">{dict.audience.label}</SectionLabel>
              <h2 className="display mt-4 text-3xl text-balance sm:text-4xl">
                {dict.audience.heading}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-pretty text-smoke">
                {dict.audience.lead}
              </p>
              <Link
                href={`${base}#kontakt`}
                className="meta-label group mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1 transition-colors hover:text-smoke focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {dict.audience.cta}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {dict.audience.groups.map((group, i) => (
              <li key={group.title}>
                <PlaceholderImage
                  slot={`publikum-${i + 1}`}
                  locale={locale}
                  label={group.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="aspect-[4/3] w-full rounded-xl"
                />
                <p className="meta-label mt-5 tabular-nums text-olive">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-1.5 text-xl text-balance">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-shell px-2.5 py-1.5 text-sm text-smoke"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA dict={dict} locale={locale} />
    </>
  );
}
