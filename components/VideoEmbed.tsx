"use client";

import { useState } from "react";

/*
  Lett Vimeo-spiller: plakaten vises først, og selve spilleren lastes først
  når noen trykker play. Da hentes verken Vimeo-skript eller -cookies for
  besøkende som bare blar forbi, og siden forblir rask.

  Plakaten kommer inn som children, rendret på serveren med
  PlaceholderImage, så den kan byttes i /admin/bilder.

  Uten video (lenken er ikke lagt inn ennå) vises bare plakaten.
*/
export default function VideoEmbed({
  video,
  title,
  playLabel,
  children,
}: {
  video?: { id: string; hash?: string };
  title: string;
  playLabel: string;
  children: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);

  if (video && playing) {
    const params = new URLSearchParams({ autoplay: "1", dnt: "1", title: "0", byline: "0", portrait: "0" });
    if (video.hash) params.set("h", video.hash);
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-ink">
        <iframe
          src={`https://player.vimeo.com/video/${video.id}?${params}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-ink">
      <div className="absolute inset-0">{children}</div>
      {video && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/35"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition-transform group-hover:scale-110 sm:size-20">
            <svg viewBox="0 0 24 24" aria-hidden className="ml-1 size-7 sm:size-8">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
