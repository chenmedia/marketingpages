import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import SectionLabel from "@/components/SectionLabel";
import Squiggle from "@/components/Squiggle";
import PhotoTicker from "@/components/PhotoTicker";
import PlaceholderImage from "@/components/PlaceholderImage";
import CaseList from "@/components/CaseList";
import ProcessTimeline from "@/components/ProcessTimeline";
import ContactCTA from "@/components/ContactCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.home.title },
    description: dict.meta.home.description,
    alternates: {
      languages: { nb: "/no", en: "/en" },
    },
  };
}

const clients = [
  "Snapchat",
  "OBOS",
  "DNT",
  "JCP",
  "Nordisk Film Kino",
  "Hurtigruten",
  "Av-og-til",
];

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const base = `/${locale}`;

  return (
    <>
      {/* Hero — redaksjonell, à la deckens forside */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <SectionLabel number="01">{dict.hero.kicker}</SectionLabel>
        <h1 className="display mt-6 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
          {dict.hero.title}{" "}
          <span className="text-ember">{dict.hero.titleAccent}</span>
        </h1>
        <div className="mt-10 grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
          <p className="max-w-xl text-sm leading-relaxed text-smoke sm:text-base">
            {dict.hero.lead}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`${base}#kontakt`}
              className="meta-label rounded-full bg-ember-deep px-6 py-3 text-cream transition-colors hover:bg-ink"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`${base}#arbeid`}
              className="meta-label rounded-full border border-ink px-6 py-3 transition-colors hover:border-ember hover:text-ember-deep"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="meta-label text-smoke">{dict.hero.clientsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {clients.map((client) => (
              <li key={client} className="display text-sm text-olive">
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoTicker alt={dict.ticker.alt} />

      {/* Hva vi gjør — to redaksjonelle blokker, ikke tjenestekort */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="02">{dict.services.label}</SectionLabel>
        <h2 className="display mt-4 text-4xl sm:text-5xl">
          {dict.services.heading}
        </h2>

        <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <PlaceholderImage
            label="Eventfoto — Snap Session"
            tone="bone"
            className="aspect-[4/3] w-full rounded-lg"
          />
          <div>
            <h3 className="display text-2xl sm:text-3xl">
              {dict.services.photo.title}
            </h3>
            {dict.services.photo.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-sm leading-relaxed text-smoke"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href={`${base}/eventfoto`}
              className="meta-label mt-6 inline-block border-b-2 border-ember pb-1 transition-colors hover:text-ember-deep"
            >
              {dict.services.photo.link} →
            </Link>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="md:order-2">
            <PlaceholderImage
              label="Eventfilm — Pitch Event"
              tone="ink"
              className="aspect-[4/3] w-full rounded-lg"
            />
          </div>
          <div className="md:order-1">
            <h3 className="display text-2xl sm:text-3xl">
              {dict.services.film.title}
            </h3>
            {dict.services.film.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-sm leading-relaxed text-smoke"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href={`${base}/eventfilm`}
              className="meta-label mt-6 inline-block border-b-2 border-ember pb-1 transition-colors hover:text-ember-deep"
            >
              {dict.services.film.link} →
            </Link>
          </div>
        </div>
      </section>

      {/* Utvalgte oppdrag — navngitte cases med kontekst */}
      <section id="arbeid" className="scroll-mt-24 bg-shell">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel number="03">{dict.cases.label}</SectionLabel>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-4xl sm:text-5xl">
              {dict.cases.heading}
            </h2>
            <Squiggle className="w-24" />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-smoke">
            {dict.cases.lead}
          </p>
          <div className="mt-12">
            <CaseList items={dict.cases.items} />
          </div>
        </div>
      </section>

      <ProcessTimeline dict={dict} />

      {/* Om Kai / Chen Media AS */}
      <section id="om" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="05">{dict.about.label}</SectionLabel>
        <div className="mt-6 grid items-start gap-10 md:grid-cols-[1fr_1.3fr]">
          <PlaceholderImage
            label="Kai Chen — portrett"
            tone="olive"
            className="aspect-[4/5] w-full max-w-sm rounded-lg"
          />
          <div>
            <h2 className="display text-4xl sm:text-5xl">
              {dict.about.heading}
            </h2>
            {dict.about.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-xl text-sm leading-relaxed text-smoke"
              >
                {paragraph}
              </p>
            ))}
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {dict.about.facts.map((fact) => (
                <div key={fact.caption} className="border-t-2 border-ember pt-3">
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

      <ContactCTA dict={dict} />
    </>
  );
}
