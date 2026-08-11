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
  Bildetekster fra faktisk prosjektkontekst i filnavnene (KarpeWorld 2026).

  left/top plasserer polaroidene ved siden av hverandre i stedet for oppå
  hverandre. De faller nedover mot høyre, og hvert kort ligger under naboen
  til venstre. Begge deler er der for bildetekstene: de sitter nede til
  venstre på kortet, så et nabokort som lå over ville dekket dem.
*/
const polaroids = [
  { slot: "hero-1", caption: "KarpeWorld · Oslo", float: "float-a", left: "0%", top: 0 },
  { slot: "hero-2", caption: "KarpeWorld · scenen", float: "float-b", left: "29%", top: 34 },
  { slot: "hero-3", caption: "Red Bull · aktivering", float: "float-c", left: "58%", top: 68 },
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
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

          {/* Polaroider på rad — flytende, med bildetekster som TONs */}
          <div className="relative mx-auto hidden w-full lg:block" aria-hidden>
            <div className="relative h-[300px]">
              {polaroids.map((polaroid, i) => (
                <div
                  key={polaroid.slot}
                  className={`absolute rounded-lg border border-ink/10 bg-cream p-2 pb-9 shadow-lg ${polaroid.float}`}
                  style={{
                    top: `${polaroid.top}px`,
                    left: polaroid.left,
                    width: "42%",
                    zIndex: polaroids.length - i,
                  }}
                >
                  <PlaceholderImage
                    slot={polaroid.slot}
                    locale={locale}
                    label=""
                    sizes="(max-width: 1024px) 0px, 210px"
                    className="aspect-[4/3] w-full"
                  />
                  <p className="meta-label absolute bottom-2.5 left-3 text-smoke">
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

      {/* Tjenester — 3 kort med sjekklister, à la TONs «What we do» */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <SectionLabel number="02">{dict.services.label}</SectionLabel>
          <h2 className="display mt-4 text-3xl sm:text-4xl">
            {dict.services.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-smoke">
            {dict.services.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dict.services.cards.map((card, i) => (
            <article
              key={card.slug}
              className="flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-cream"
            >
              <PlaceholderImage
                slot={`tjeneste-${i + 1}`}
                locale={locale}
                label={card.title}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="aspect-[3/2] w-full"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="display text-xl">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-smoke">
                  {card.body}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <svg
                        viewBox="0 0 12 12"
                        className="mt-1 size-3 shrink-0"
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
                <Link
                  href={`${base}/${card.slug}`}
                  className="meta-label mt-5 inline-block border-b-2 border-ink pb-1 transition-colors hover:text-smoke"
                >
                  {card.linkLabel} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mørk differensiator — «arrangementet lever videre» */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <SectionLabel tone="light" number="03">
              {dict.liveOn.label}
            </SectionLabel>
            <h2 className="display mt-4 text-2xl sm:text-3xl">
              {dict.liveOn.heading}
            </h2>
            {dict.liveOn.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-sand">
                {paragraph}
              </p>
            ))}
            <ul className="mt-6 space-y-2">
              {dict.liveOn.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm">
                  <svg
                    viewBox="0 0 12 12"
                    className="mt-1 size-3 shrink-0"
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
            <div className="mt-8">
              <Link
                href={`${base}#prosess`}
                className="meta-label inline-block rounded-full border border-cream px-6 py-3 transition-colors hover:bg-cream hover:text-ink"
              >
                {dict.liveOn.cta} →
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <PlaceholderImage
              slot="leveranse-hoved"
              locale={locale}
              label="Leveranse, redigert utvalg"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[4/3] w-full rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4">
              {/* Tre stående utsnitt av samme oppdrag: sosiale medier, web og trykk */}
              <PlaceholderImage slot="leveranse-some" locale={locale} label="" sizes="17vw" className="aspect-[9/16] rounded-lg" />
              <PlaceholderImage slot="leveranse-web" locale={locale} label="" sizes="17vw" className="aspect-[9/16] rounded-lg" />
              <PlaceholderImage slot="leveranse-trykk" locale={locale} label="" sizes="17vw" className="aspect-[9/16] rounded-lg" />
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
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-5 pt-16 text-cream">
                <span className="display block text-xl">{card.title}</span>
                <span className="meta-label mt-1 block text-sand">{card.sub}</span>
                <span className="meta-label mt-3 inline-block border-b border-cream pb-0.5">
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

      {/* Hvem er Chen Media for? */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <SectionLabel number="06">{dict.audience.label}</SectionLabel>
          <h2 className="display mt-4 text-3xl sm:text-4xl">
            {dict.audience.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-smoke">
            {dict.audience.lead}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.audience.groups.map((group, i) => (
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
                    <svg
                      viewBox="0 0 12 12"
                      className="mt-1 size-3 shrink-0"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA dict={dict} locale={locale} />
    </>
  );
}
