import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { VideoFacade } from "@/components/site/VideoFacade";
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
      <div className="mx-auto w-full max-w-[21rem] bg-ivory p-3 shadow-[0_18px_50px_-30px_rgba(28,26,23,0.55)] ring-1 ring-border/70 sm:p-4">
        <div className="aspect-[9/16] w-full overflow-hidden rounded-[1.35rem] bg-ink">
          <VideoFacade url={embed} title={title} />
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden bg-ink">
      <VideoFacade url={embed} title={title} />
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
  const { t } = useI18n();
  const title = t(`films.item.${film.id}.title`) || film.title;
  const caption = t(`films.item.${film.id}.caption`) || film.caption;
  const description = t(`films.item.${film.id}.description`) || film.description;
  return (
    <article className={cn("flex flex-col", className)}>
      <EmbedFrame embed={film.embed} title={title} format={film.format} />
      <div className={cn("mt-5", film.format === "9:16" && "mx-auto max-w-[21rem] w-full")}>
        <p className="label-caps text-[0.58rem] tracking-[0.22em] text-lagoon">{caption}</p>
        <Heading className="mt-3 font-serif text-xl leading-snug text-ink">{title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}
