import { cn } from "@/lib/utils";
import type { Film } from "@/lib/site-data";

export function EmbedFrame({
  embed,
  title,
  format,
}: {
  embed: string;
  title: string;
  format: Film["format"];
}) {
  if (format === "9:16") {
    return (
      <div className="mx-auto w-full max-w-[19rem] bg-ivory p-3 shadow-[0_18px_50px_-30px_rgba(28,26,23,0.55)] ring-1 ring-border/70 sm:p-4">
        <div className="aspect-[9/16] w-full overflow-hidden rounded-[1.35rem] bg-ink">
          <iframe
            src={embed}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden bg-ink">
      <iframe
        src={embed}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    </div>
  );
}

export function FilmCard({
  film,
  className,
  headingLevel = "h3",
}: {
  film: Film;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className={cn("flex flex-col", className)}>
      <EmbedFrame embed={film.embed} title={film.title} format={film.format} />
      <div className={cn("mt-5", film.format === "9:16" && "mx-auto max-w-[19rem] w-full")}>
        <p className="label-caps text-[0.58rem] tracking-[0.22em] text-lagoon">{film.caption}</p>
        <Heading className="mt-3 font-serif text-xl leading-snug text-ink">{film.title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{film.description}</p>
      </div>
    </article>
  );
}
