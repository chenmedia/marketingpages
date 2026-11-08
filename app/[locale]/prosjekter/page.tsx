import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import {
  PHOTO_CATEGORIES,
  PHOTO_UI,
  categoryPath,
  projectSlot,
  projectsIn,
} from "@/lib/photography";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import ContactCTA from "@/components/ContactCTA";

/*
  Prosjektene, gruppert etter fotokategori. Pillene øverst er vanlige
  ankerlenker til hver gruppe, så siden forblir statisk og fungerer uten
  JavaScript. Hvert kort har sitt eget coverbilde fra lib/photography.
*/
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/prosjekter">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.projects.title },
    description: dict.meta.projects.description,
    alternates: alternatesFor(locale, "/prosjekter"),
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/prosjekter">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.projectsPage;
  const groups = PHOTO_CATEGORIES.map((category) => ({
    category,
    projects: projectsIn(category.key),
  })).filter((group) => group.projects.length > 0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
        <SectionLabel number="01">{page.kicker}</SectionLabel>
        <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">
          {page.title}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
          {page.lead}
        </p>
        <ul className="mt-10 flex flex-wrap gap-2">
          {groups.map(({ category, projects }) => (
            <li key={category.key}>
              <a
                href={`#${category.slug}`}
                className="meta-label inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                {category.title[locale]}
                <span className="text-smoke">{projects.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-shell">
        {groups.map(({ category, projects }) => (
          <section
            key={category.key}
            id={category.slug}
            className="mx-auto max-w-6xl scroll-mt-24 border-b border-ink/10 px-4 py-16 last:border-0 sm:px-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-2xl [overflow-wrap:anywhere] sm:text-3xl">
                {category.title[locale]}
              </h2>
              <Link
                href={localePath(locale, categoryPath(category))}
                className="meta-label underline underline-offset-4 hover:text-smoke"
              >
                {PHOTO_UI.hub.seeMore[locale]}
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="min-w-0 overflow-hidden rounded-lg border border-ink/10 bg-cream"
                >
                  <PlaceholderImage
                    slot={projectSlot(project, 1)}
                    locale={locale}
                    label={`${project.client}: ${project.project[locale]}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[3/2] w-full"
                  />
                  <div className="min-w-0 space-y-2 p-5">
                    <h3 className="display text-xl [overflow-wrap:anywhere]">
                      {project.client}
                      <span className="text-smoke"> · {project.project[locale]}</span>
                    </h3>
                    <p className="text-base leading-relaxed [overflow-wrap:anywhere] text-smoke">
                      {project.context[locale]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <ContactCTA dict={dict} locale={locale} />
    </>
  );
}
