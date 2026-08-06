import { useState } from "react";
import { cn } from "@/lib/utils";

/** Pull the YouTube id out of any embed/watch/short URL. */
function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|watch\?v=|v\/))([\w-]{6,})/);
  return m?.[1] ?? null;
}

function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m?.[1] ?? null;
}

function withAutoplay(url: string) {
  return url + (url.includes("?") ? "&" : "?") + "autoplay=1";
}

/**
 * Click-to-play facade: a static thumbnail plus a play button.
 * The player iframe is only created after the visitor clicks —
 * no third-party video script ever loads on page view.
 */
export function VideoFacade({
  url,
  title,
  poster,
  className,
}: {
  url: string;
  title: string;
  /** Optional custom poster; YouTube thumbnails are derived automatically. */
  poster?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const yt = youTubeId(url);
  const vm = vimeoId(url);
  const thumb = poster ?? (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : undefined);

  if (playing) {
    return (
      <iframe
        src={withAutoplay(url)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={cn("size-full", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play — ${title}`}
      className={cn("group relative block size-full overflow-hidden bg-ink", className)}
    >
      {thumb ? (
        <img
          src={thumb}
          alt={title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      ) : (
        <span className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" aria-hidden="true" />
      )}
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="flex size-16 items-center justify-center rounded-full border border-gold/70 bg-ink/40 backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-ink/60">
          <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-gold">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      {vm && <span className="sr-only">Vimeo</span>}
    </button>
  );
}
