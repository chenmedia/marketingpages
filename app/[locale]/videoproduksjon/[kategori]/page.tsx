import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import {
  VIDEO_BASE_PATH,
  VIDEO_CATEGORIES,
  VIDEO_UI,
  parseVimeo,
  videoCategoryBySlug,
  videoCategoryPath,
  videoPosterSlot,
  videoProjectsIn,
  videoTiles,
} from "@/lib/video";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import VideoEmbed from "@/components/VideoEmbed";
import CategoryGrid from "@/components/CategoryGrid";
import ContactCTA from "@/components/ContactCTA";

/*
  Én videokategori med filmene sine. Alle bygges statisk; en ukjent
  kategori gir 404.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return VIDEO_CATEGORIES.map((category) => ({ kategori: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/videoproduksjon/[kategori]">): Promise<Metadata> {
  const { locale, kategori } = await params;
  const category = videoCategoryBySlug(kategori);
  if (!isLocale(locale) || !category) return {};
  return {
    title: { absolute: `${category.title[locale]} | Chen Media` },
    description: category.teaser[locale],
    alternates: alternatesFor(locale, videoCategoryPath(category)),
  };
}

export default async function VideoCategoryPage({
  params,
}: PageProps<"/[locale]/videoproduksjon/[kategori]">) {
  const { locale, kategori } = await params;
  const category = videoCategoryBySlug(kategori);
  if (!isLocale(locale) || !category) notFound();
  const dict = getDictionary(locale);
  const ui = VIDEO_UI.category;
  const projects = videoProjectsIn(category.key);
  const others = VIDEO_CATEGORIES.filter((c) => c.key !== category.key);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <nav aria-label="Brødsmuler" className="meta-label text-smoke">
          <Link href={localePath(locale, VIDEO_BASE_PATH)} className="hover:text-ink hover:underline">
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
          </div>
          <div className="min-w-0 md:pt-3">
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
        </div>
      </section>

      {/* Filmene */}
      <section className="bg-shell">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel number="01">{ui.projects[locale]}</SectionLabel>
          <div className={`mt-12 grid gap-x-8 gap-y-14 ${projects.length > 1 ? "md:grid-cols-2" : ""}`}>
            {projects.map((project, index) => {
              const label = `${project.client}: ${project.project[locale]}`;
              return (
                <article key={project.id} className="min-w-0">
                  <VideoEmbed
                    video={parseVimeo(project.vimeo)}
                    title={label}
                    playLabel={ui.play[locale]}
                  >
                    <PlaceholderImage
                      slot={videoPosterSlot(project)}
                      locale={locale}
                      label={label}
                      sizes={projects.length > 1 ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
                      priority={index === 0}
                      className="h-full w-full"
                    />
                  </VideoEmbed>
                  <div className="mt-5 space-y-2">
                    <h2 className="display text-2xl [overflow-wrap:anywhere]">
                      {project.client}
                      <span className="text-smoke"> · {project.project[locale]}</span>
                    </h2>
                    <p className="max-w-xl text-base leading-relaxed text-smoke">
                      {project.context[locale]}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="02">{ui.more[locale]}</SectionLabel>
        <div className="mt-8">
          <CategoryGrid
            tiles={videoTiles(locale, others)}
            locale={locale}
            seeMore={VIDEO_UI.hub.seeMore[locale]}
            compact
          />
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
