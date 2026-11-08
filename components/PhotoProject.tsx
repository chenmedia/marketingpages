import type { Locale } from "@/lib/i18n";
import {
  projectImages,
  projectSlot,
  type PhotoProject as Project,
} from "@/lib/photography";
import PlaceholderImage from "./PlaceholderImage";

/*
  Ett prosjekt: stort coverbilde, navn og kontekst, og tre bilder under.

  «reverse» speiler oppsettet på store skjermer, så en kategori med tre
  prosjekter ikke blir tre like blokker etter hverandre.
*/
export default function PhotoProject({
  project,
  locale,
  kind,
  reverse = false,
}: {
  project: Project;
  locale: Locale;
  /** Liten etikett over navnet, typisk kategorien */
  kind?: string;
  reverse?: boolean;
}) {
  const images = projectImages(project);
  const gallery = images.slice(1, 4);
  const label = `${project.client}: ${project.project[locale]}`;

  return (
    <article className="min-w-0">
      <div
        className={`grid items-end gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <PlaceholderImage
          slot={projectSlot(project, 1)}
          locale={locale}
          label={label}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="aspect-[3/2] w-full rounded-lg"
        />
        <div className="min-w-0 space-y-3 lg:pb-2">
          {kind && (
            <p className="meta-label [overflow-wrap:anywhere] text-smoke">{kind}</p>
          )}
          <h3 className="display text-2xl [overflow-wrap:anywhere] sm:text-3xl">
            {project.client}
          </h3>
          <p className="display text-lg text-smoke [overflow-wrap:anywhere]">
            {project.project[locale]}
          </p>
          <p className="max-w-md text-base leading-relaxed text-smoke">
            {project.context[locale]}
          </p>
        </div>
      </div>

      {gallery.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
          {gallery.map((_, i) => (
            <li key={i} className="min-w-0">
              <PlaceholderImage
                slot={projectSlot(project, i + 2)}
                locale={locale}
                label={label}
                sizes="(max-width: 640px) 33vw, 25vw"
                className="aspect-[4/5] w-full rounded-md sm:aspect-[4/3]"
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
