import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { FilmCard } from "@/components/site/FilmCard";
import { InstagramCard } from "@/components/site/InstagramCard";
import { Container, Overline, Section } from "@/components/site/ui";
import { filmCategories, films } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "Videos — Riviera Maya Property Tours & Life | Marylene Realtor" },
      {
        name: "description",
        content:
          "Riviera Maya property tours, coastal life and client stories on video by realtor Marylene Maglio, who also handles property management on the coast.",
      },
      { property: "og:title", content: "Videos — Riviera Maya | Marylene Realtor" },
      {
        property: "og:description",
        content: "Property tours, Riviera life and client stories, on video on the Riviera Maya.",
      },
      { property: "og:url", content: "/films" },
    ],
    links: [{ rel: "canonical", href: "/films" }],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  const { t } = useI18n();
  const [category, setCategory] = useState<string | null>(null);
  const shown = category ? films.filter((f) => f.category === category) : films;

  return (
    <>
      <Section className="pt-28 pb-0 md:pt-32">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("films.overline")}</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              {t("films.title")}
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {t("films.intro")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-10 pb-0 md:pt-12">
        <Container>
          <Reveal className="flex flex-wrap gap-x-8 gap-y-1 border-y border-border py-5">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={cn(
                "label-caps -my-2 py-2 text-[0.65rem] transition-colors duration-300 hover:text-gold",
                category === null ? "text-gold" : "text-ink/70",
              )}
            >
              {t("films.category.all")}
            </button>
            {filmCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "label-caps -my-2 py-2 text-[0.65rem] transition-colors duration-300 hover:text-gold",
                  category === c ? "text-gold" : "text-ink/70",
                )}
              >
                {t(`films.category.${c}`)}
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
