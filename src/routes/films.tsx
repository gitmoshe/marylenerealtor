import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { FilmCard } from "@/components/site/FilmCard";
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

      <Section className="pt-16 pb-0 md:pt-20">
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
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((film, i) => (
              <Reveal key={film.id} delay={(i % 3) * 100}>
                <FilmCard film={film} headingLevel="h2" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/50">
        <Container>
          <Reveal>
            <InstagramCard />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
