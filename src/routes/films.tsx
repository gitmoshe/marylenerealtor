import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Container, Overline, Section } from "@/components/site/ui";
import { filmCategories, films } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "The Films — Riviera Maya Property Tours & Life | Marylene Realtor" },
      {
        name: "description",
        content:
          "A cinematic gallery of Riviera Maya property tours, coastal life and client stories, filmed by Marylene Maglio.",
      },
      { property: "og:title", content: "The Films — Riviera Maya | Marylene Realtor" },
      {
        property: "og:description",
        content: "Property tours, Riviera life and client stories, filmed on the Mayan Riviera.",
      },
      { property: "og:url", content: "/films" },
    ],
    links: [{ rel: "canonical", href: "/films" }],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  const [category, setCategory] = useState<string | null>(null);
  const shown = category ? films.filter((f) => f.category === category) : films;

  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>Media</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              The Films.
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Every property is filmed before it is described. What you see is the house as it is,
              at the hour it looks like itself.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <Reveal className="flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-6">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={cn(
                "label-caps text-[0.65rem] transition-colors duration-300 hover:text-gold",
                category === null ? "text-gold" : "text-ink/70",
              )}
            >
              All Films
            </button>
            {filmCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "label-caps text-[0.65rem] transition-colors duration-300 hover:text-gold",
                  category === c ? "text-gold" : "text-ink/70",
                )}
              >
                {c}
              </button>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-14">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((film, i) => (
              <Reveal key={film.id} delay={(i % 3) * 100}>
                <div className={film.format === "9:16" ? "aspect-[9/16] bg-ink" : "aspect-video bg-ink"}>
                  <iframe
                    src={film.embed}
                    title={film.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
                <p className="label-caps mt-4 text-[0.6rem] text-lagoon">{film.category}</p>
                <h2 className="mt-2 font-serif text-xl">{film.title}</h2>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/50">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <Instagram strokeWidth={0.75} className="mx-auto size-8 text-gold" />
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl">@marylene_realtor</h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              New films weekly — tours, cenotes, terraces and the parts of the coast that never
              reach a listing.
            </p>
            <a
              href="https://instagram.com/marylene_realtor"
              target="_blank"
              rel="noreferrer"
              className="label-caps mt-10 inline-flex items-center gap-2 bg-gold px-8 py-4 text-[0.65rem] text-ivory transition-colors duration-500 hover:bg-ink"
            >
              Follow on Instagram
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
