import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, localeBase } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import { isLocale } from "@/lib/i18n";
import SectionLabel from "@/components/SectionLabel";
import PhotoTicker from "@/components/PhotoTicker";
import PlaceholderImage, { photo } from "@/components/PlaceholderImage";
import ProcessTimeline from "@/components/ProcessTimeline";
import ContactCTA from "@/components/ContactCTA";
import CtaButton from "@/components/CtaButton";
import LogoWall from "@/components/LogoWall";
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

// Bildetekster fra faktisk prosjektkontekst i filnavnene (KarpeWorld 2026)
const polaroids = [
  { label: "Karpe møter publikum", caption: "KarpeWorld · Oslo", src: photo.meetCrowd, float: "float-a" },
  { label: "KarpeWorld, scenen", caption: "KarpeWorld · scenen", src: photo.vocalist, float: "float-b" },
  { label: "Red Bull, aktivering", caption: "Red Bull · aktivering", src: photo.redbull, float: "float-c" },
] as const;

// Kortbilder for «Arbeidet vårt». Roteres, så antall kort kan variere.
const workPhotos = [
  photo.meetCrowd,
  photo.epicStage,
  photo.redbull,
  photo.festivalLife,
] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const base = localeBase(locale);

  return (
    <>
      {/* Hero à la TON: tekst venstre, polaroid-stabel høyre */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="meta-label inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-smoke">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ink" />
              {dict.hero.badge}
            </p>
            <h1 className="display mt-6 text-4xl sm:text-5xl md:text-6xl">
              {dict.hero.title}{" "}
              <span className="relative inline-block">
                {dict.hero.titleAccent}
                {/* Krusedullen under aksentordet, jf. TONs squiggle under «pro.» */}
                <Underline className="absolute -bottom-4 left-0 h-3.5 w-full text-ink opacity-60" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
              {dict.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton href={`${base}#kontakt`}>{dict.hero.ctaPrimary}</CtaButton>
              <CtaButton href={`${base}/prosjekter`} variant="outline">
                {dict.hero.ctaSecondary}
              </CtaButton>
            </div>
          </div>

          {/* Polaroid-stabel — flytende, med bildetekster som TONs */}
          <div className="relative mx-auto hidden w-full max-w-sm lg:block" aria-hidden>
            <div className="relative h-96">
              {polaroids.map((polaroid, i) => (
                <div
                  key={polaroid.label}
                  className={`absolute rounded-lg border border-ink/10 bg-cream p-2 pb-9 shadow-lg ${polaroid.float}`}
                  style={{ top: `${i * 52}px`, left: `${i * 36}px`, width: "72%" }}
                >
                  <PlaceholderImage
                    label={polaroid.label}
                    src={polaroid.src}
                    className="aspect-[4/3] w-full"
                  />
                  <p className="meta-label absolute bottom-2.5 left-3 text-smoke">
                    {polaroid.caption}
                  </p>
                </div>
              ))}
              <p className="meta-label absolute -bottom-2 right-0 rotate-3 rounded-full bg-ink px-4 py-2 text-cream shadow-lg">
                {dict.hero.polaroidBadge}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <LogoWall label={dict.hero.clientsLabel} />
        </div>
      </section>

      <PhotoTicker alt={dict.ticker.alt} />

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
                label={card.title}
                src={[photo.festivalLife, photo.lightshow, photo.ringnesImsdal][i]}
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
              label="Leveranse, redigert utvalg"
              src={photo.epicStage}
              className="aspect-[4/3] w-full rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4">
              <PlaceholderImage label="SoMe 9:16" src={photo.vocalist} className="aspect-[9/16] rounded-lg" />
              <PlaceholderImage label="Web 3:2" src={photo.ringnesImsdal} className="aspect-[9/16] rounded-lg" />
              <PlaceholderImage label="Trykk" src={photo.lightshow} className="aspect-[9/16] rounded-lg" />
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
                label={card.title}
                src={workPhotos[i % workPhotos.length]}
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

      {/* Om Kai */}
      <section id="om" className="scroll-mt-24 bg-shell">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.3fr]">
          <PlaceholderImage
            label="Kai Chen, portrett"
            src={photo.vocalist}
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
                label={group.title}
                src={[photo.vocalist, photo.festivalLife, photo.ringnesImsdal, photo.crewLogistics][i]}
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
