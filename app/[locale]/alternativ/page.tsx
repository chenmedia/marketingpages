import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, isLocale, localeBase, localePath } from "@/lib/i18n";
import { getAltHome } from "@/lib/i18n/alt-home";
import SectionLabel from "@/components/SectionLabel";
import PhotoTicker from "@/components/PhotoTicker";
import PlaceholderImage from "@/components/PlaceholderImage";
import ContactCTA from "@/components/ContactCTA";
import CtaButton from "@/components/CtaButton";
import LogoWall from "@/components/LogoWall";
import CrewLine from "@/components/CrewLine";
import Underline from "@/components/Underline";

/*
  Alternativ forside — en utforskning, ikke en erstatning.

  Dagens forside selger én ting: eventfoto og eventfilm. Denne prøver ut
  fire fagområder som likeverdige innganger, der event er ett punkt under
  foto og ett under video i stedet for hele premisset.

  Den ligger på sin egen URL så de to kan åpnes side om side. Teksten ligger
  i lib/i18n/alt-home.ts, og resten av siden gjenbruker komponentene fra
  forsiden uendret. Se docs/alternativ-forside.md.
*/

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/alternativ">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const alt = getAltHome(locale);
  return {
    title: { absolute: alt.meta.title },
    description: alt.meta.description,
    /*
      Utkastet må aldri konkurrere med den faktiske forsiden i søk. Ingen
      canonical og ingen hreflang heller: begge deler ville meldt siden inn
      som en variant av nettstedet, og det er nettopp det den ikke er ennå.
    */
    robots: { index: false, follow: false },
  };
}

/** Sjekkmerket foran hvert tjenestepunkt, samme som på forsiden. */
function Check() {
  return (
    <svg viewBox="0 0 12 12" className="mt-1 size-3 shrink-0" fill="none" aria-hidden>
      <path
        d="M2 6.5L4.5 9L10 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function AlternativeHomePage({
  params,
}: PageProps<"/[locale]/alternativ">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const alt = getAltHome(locale);
  const base = localeBase(locale);

  return (
    <>
      {/*
        Utkastbåndet. Siden er ikke lenket fra menyen, så den eneste måten å
        havne her på er en direkte URL — og da skal det stå på selve siden at
        dette ikke er den publiserte forsiden.
      */}
      <div className="border-b border-ink/10 bg-shell">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 sm:px-6">
          <span className="meta-label rounded-full bg-ink px-2.5 py-1 text-cream">
            {alt.draft.label}
          </span>
          <span className="text-xs text-smoke">{alt.draft.note}</span>
          <Link
            href={localePath(locale)}
            className="meta-label ml-auto border-b border-ink pb-0.5 transition-colors hover:text-smoke"
          >
            {alt.draft.back} →
          </Link>
        </div>
      </div>

      {/* Hero — samme rytme som forsiden, men fagområdene erstatter polaroidene */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="@container">
            <p className="meta-label inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-smoke">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ink" />
              {alt.hero.badge}
            </p>
            {/* cqw, ikke vw: tittelen måles mot tekstkolonnen. Se forsiden. */}
            <h1 className="display mt-6 text-[clamp(2rem,10.5cqw,4.5rem)] text-balance">
              {alt.hero.title}{" "}
              <span className="relative inline-block">
                {alt.hero.titleAccent}
                <Underline className="absolute -bottom-4 left-0 h-3.5 w-full text-ink opacity-60" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-balance whitespace-pre-line text-base leading-relaxed text-smoke sm:text-lg">
              {alt.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Rent fragment: ContactCTA ligger nederst på denne siden.
                  `${base}#kontakt` ville sendt engelske besøkende til
                  kontaktseksjonen på /en i stedet for den her. */}
              <CtaButton href="#kontakt">{alt.hero.ctaPrimary}</CtaButton>
              <CtaButton href="#omrader" variant="outline">
                {alt.hero.ctaSecondary}
              </CtaButton>
            </div>
            <div className="mt-8">
              <CrewLine label={alt.hero.crewLabel} locale={locale} />
            </div>
          </div>

          {/*
            Bilde med innholdsfortegnelsen over de fire fagområdene lagt inntil.
            Kortet stikker utenfor bildet, derfor har wrapperen plass i bunnen
            og til venstre — ellers ville skyggen blitt klippet av griden.
          */}
          <div className="relative hidden lg:block lg:pb-12 lg:pl-10">
            <PlaceholderImage
              slot="alt-hero"
              locale={locale}
              label=""
              sizes="(max-width: 1024px) 0px, 420px"
              priority
              className="aspect-[4/5] w-full rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-64 rounded-lg border border-ink/10 bg-cream p-5 shadow-lg">
              <p className="meta-label text-smoke">{alt.hero.indexLabel}</p>
              <ol className="mt-3 space-y-2">
                {alt.list.map((area) => (
                  <li key={area.id} className="flex items-baseline gap-3">
                    <span className="meta-label text-smoke">{area.number}</span>
                    <a
                      href={`#${area.id}`}
                      className="display text-sm transition-colors hover:text-smoke"
                    >
                      {area.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <PhotoTicker alt={alt.tickerAlt} locale={locale} />

      {/* Oversikten over de fire fagområdene */}
      <section id="omrader" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <SectionLabel number="02">{alt.areas.label}</SectionLabel>
          <h2 className="display mt-4 text-3xl sm:text-4xl">{alt.areas.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-smoke">
            {alt.areas.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {alt.list.map((area, i) => (
            <a
              key={area.id}
              href={`#${area.id}`}
              className="group block overflow-hidden rounded-lg border border-ink/10 bg-cream"
            >
              <PlaceholderImage
                slot={`alt-omrade-${i + 1}`}
                locale={locale}
                label={area.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="aspect-[4/5] w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {/*
                Antallet står i metaraden og undertittelen under overskriften,
                ikke omvendt. Metaraden er da alltid én linje, og de fire
                overskriftene står på samme høyde selv når en undertittel
                brekker i to — som «Løpende, ikke bare én gang» gjør.
              */}
              <div className="p-5">
                <p className="meta-label flex items-center gap-3 text-smoke">
                  <span>{area.number}</span>
                  <span aria-hidden className="h-px w-6 bg-current opacity-40" />
                  <span>
                    {alt.areas.countLabel.replace("{n}", String(area.points.length))}
                  </span>
                </p>
                <h3 className="display mt-3 text-lg">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {area.tagline}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/*
        Ett avsnitt per fagområde, med hele tjenestelisten synlig. Det er
        hele poenget med utkastet: bredden skal leses på forsiden, ikke først
        etter et klikk.

        Annenhver seksjon har bakgrunn, og bildet bytter side. Uten det
        hadde fire like seksjoner på rad blitt en liste, ikke en side.
      */}
      {alt.list.map((area, i) => {
        const shaded = i % 2 === 1;
        return (
          <section
            key={area.id}
            id={area.id}
            className={`scroll-mt-24 ${shaded ? "bg-shell" : ""}`}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
              <PlaceholderImage
                slot={`alt-omrade-${i + 1}`}
                locale={locale}
                label={area.title}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`aspect-[4/3] w-full rounded-lg ${shaded ? "md:order-2" : ""}`}
              />
              <div>
                <SectionLabel number={area.number}>{area.tagline}</SectionLabel>
                <h2 className="display mt-4 text-3xl sm:text-4xl">{area.title}</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke">
                  {area.body}
                </p>
                {/*
                  To kolonner fra sm. Videoproduksjon har åtte punkter, og i én
                  kolonne blir den seksjonen dobbelt så høy som de andre.

                  columns, ikke grid: et grid gir hver rad høyden til den
                  høyeste cellen, så «Sosiale medier (Instagram, TikTok og
                  Snap)» — den ene som brekker i to linjer — river et hull i
                  nabokolonnen. columns pakker punktene tett, og listen leses
                  ovenfra og ned i hver kolonne i stedet for annenhver.
                */}
                <ul className="mt-6 sm:columns-2 sm:gap-x-8">
                  {area.points.map((point) => (
                    <li
                      key={point}
                      className="mb-2 flex break-inside-avoid items-start gap-2 text-sm"
                    >
                      <Check />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <CtaButton href="#kontakt">{dict.nav.cta}</CtaButton>
                  {area.link && (
                    <Link
                      href={`${base}${area.link.href}`}
                      className="meta-label border-b-2 border-ink pb-1 transition-colors hover:text-smoke"
                    >
                      {area.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Mørk differensiator — den faste avtalen, ikke enkeltoppdraget */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <SectionLabel tone="light" number="07">
              {alt.retainer.label}
            </SectionLabel>
            <h2 className="display mt-4 text-2xl sm:text-3xl">{alt.retainer.heading}</h2>
            {alt.retainer.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-sand">
                {paragraph}
              </p>
            ))}
            <ul className="mt-6 space-y-2">
              {alt.retainer.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm">
                  <Check />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="#prosess"
                className="meta-label inline-block rounded-full border border-cream px-6 py-3 transition-colors hover:bg-cream hover:text-ink"
              >
                {alt.retainer.cta} →
              </Link>
            </div>
          </div>
          <PlaceholderImage
            slot="alt-abonnement"
            locale={locale}
            label="Månedlig innholdsproduksjon"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-[4/3] w-full rounded-lg"
          />
        </div>
      </section>

      <section className="pb-20 pt-20">
        <LogoWall label={alt.clientsLabel} />
      </section>

      {/*
        Prosessen. Samme oppsett som ProcessTimeline, men den komponenten
        leser dict.process, altså den event-spesifikke teksten om shot list
        og kjøreplan. Her er stegene generiske nok til å gjelde alle fire
        fagområdene, så teksten kommer fra alt-home i stedet.
      */}
      <section id="prosess" className="scroll-mt-24 bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel tone="light" number="08">
            {alt.process.label}
          </SectionLabel>
          <h2 className="display mt-4 max-w-xl text-3xl sm:text-4xl">
            {alt.process.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand">
            {alt.process.lead}
          </p>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
            {alt.process.steps.map((step) => (
              <li key={step.number} className="flex flex-col bg-ink p-6">
                <span className="display text-3xl text-cream">{step.number}</span>
                <h3 className="display mt-4 text-lg">{step.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-sand">
                  {step.body}
                </p>
                <p className="meta-label mt-5 border-t border-cream/15 pt-4 font-bold text-cream">
                  {step.promise}
                </p>
              </li>
            ))}
          </ol>

          <p className="meta-label mt-8 text-sand">{alt.process.note}</p>
        </div>
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
            <SectionLabel number="09">{alt.about.label}</SectionLabel>
            <h2 className="display mt-4 text-3xl sm:text-4xl">{alt.about.heading}</h2>
            {alt.about.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-xl text-base leading-relaxed text-smoke"
              >
                {paragraph}
              </p>
            ))}
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {alt.about.facts.map((fact) => (
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

      {/* Hvem det er for */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <SectionLabel number="10">{alt.audience.label}</SectionLabel>
          <h2 className="display mt-4 text-3xl sm:text-4xl">{alt.audience.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-smoke">
            {alt.audience.lead}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {alt.audience.groups.map((group, i) => (
            <div key={group.title}>
              <PlaceholderImage
                slot={`publikum-${i + 1}`}
                locale={locale}
                label={group.title}
                sizes="(max-width: 768px) 100vw, 25vw"
                className="aspect-[4/3] w-full rounded-lg"
              />
              <h3 className="display mt-4 text-lg">{group.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-smoke">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA
        dict={dict}
        locale={locale}
        heading={alt.contact.heading}
        lead={alt.contact.lead}
      />
    </>
  );
}
