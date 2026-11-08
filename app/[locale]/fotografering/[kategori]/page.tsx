import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import {
  PHOTO_BASE_PATH,
  PHOTO_CATEGORIES,
  PHOTO_UI,
  categoryBySlug,
  categoryPath,
  categorySlot,
  projectsIn,
} from "@/lib/photography";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import PhotoProject from "@/components/PhotoProject";
import PhotoCategoryGrid from "@/components/PhotoCategoryGrid";
import ContactCTA from "@/components/ContactCTA";

/*
  Én fotokategori med sine utvalgte prosjekter. Alle seks bygges statisk;
  en ukjent kategori gir 404 i stedet for en tom side.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return PHOTO_CATEGORIES.map((category) => ({ kategori: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/fotografering/[kategori]">): Promise<Metadata> {
  const { locale, kategori } = await params;
  const category = categoryBySlug(kategori);
  if (!isLocale(locale) || !category) return {};
  return {
    title: { absolute: `${category.title[locale]} | Chen Media` },
    description: category.teaser[locale],
    alternates: alternatesFor(locale, categoryPath(category)),
  };
}

export default async function PhotoCategoryPage({
  params,
}: PageProps<"/[locale]/fotografering/[kategori]">) {
  const { locale, kategori } = await params;
  const category = categoryBySlug(kategori);
  if (!isLocale(locale) || !category) notFound();
  const dict = getDictionary(locale);
  const ui = PHOTO_UI.category;
  const projects = projectsIn(category.key);
  const others = PHOTO_CATEGORIES.filter((c) => c.key !== category.key);

  return (
    <>
      {/* Toppen: tekst og leveransepunkter til venstre, bilde til høyre */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <nav aria-label="Brødsmuler" className="meta-label text-smoke">
          <Link href={localePath(locale, PHOTO_BASE_PATH)} className="hover:text-ink hover:underline">
            {ui.breadcrumb[locale]}
          </Link>
          <span aria-hidden className="mx-2">/</span>
          <span className="text-ink">{category.title[locale]}</span>
        </nav>

        <div className="mt-10 grid items-start gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <h1 className="display text-4xl [overflow-wrap:anywhere] sm:text-5xl">
              {category.title[locale]}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
              {category.lead[locale]}
            </p>
            <div className="mt-10">
              <SectionLabel>{ui.deliver[locale]}</SectionLabel>
              <ul className="mt-4 space-y-2">
                {category.points[locale].map((point) => (
                  <li key={point} className="flex gap-3 text-base">
                    <span aria-hidden className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-ink" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {category.key === "event" && (
              <p className="mt-8">
                <Link
                  href={localePath(locale, "/eventfoto")}
                  className="text-base underline underline-offset-4 hover:text-smoke"
                >
                  {ui.eventLink[locale]}
                </Link>
              </p>
            )}
          </div>
          <PlaceholderImage
            slot={categorySlot(category)}
            locale={locale}
            label={category.title[locale]}
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
            className="aspect-[4/5] w-full rounded-lg"
          />
        </div>
      </section>

      {/* Prosjektene */}
      <section className="bg-shell">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel number="01">{ui.projects[locale]}</SectionLabel>
          <div className="mt-12 space-y-20">
            {projects.map((project, index) => (
              <PhotoProject
                key={project.id}
                project={project}
                locale={locale}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* De andre kategoriene */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="02">{ui.more[locale]}</SectionLabel>
        <div className="mt-8">
          <PhotoCategoryGrid categories={others} locale={locale} compact />
        </div>
      </section>

      <ContactCTA
        dict={dict}
        locale={locale}
        heading={ui.cta.heading[locale]}
        lead={ui.cta.lead[locale]}
      />
    </>
  );
}
