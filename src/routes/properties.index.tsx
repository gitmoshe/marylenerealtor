import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Container, Overline, Section } from "@/components/site/ui";
import { intents, locations, properties, propertyTypes } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type PropertiesSearch = { location?: string };

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, unknown>): PropertiesSearch => ({
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Properties for Sale — Playa del Carmen, Tulum & Cancún | Marylene Realtor" },
      {
        name: "description",
        content:
          "Villas, condos, land and pre-construction on the Riviera Maya with realtor Marylene Maglio, plus property management once you own.",
      },
      { property: "og:title", content: "Properties for Sale — Riviera Maya | Marylene Realtor" },
      {
        property: "og:description",
        content:
          "Villas, condos, land and pre-construction residences in Playa del Carmen, Tulum, Puerto Aventuras and Cancún.",
      },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

function FilterRow({
  label,
  options,
  value,
  onChange,
  optionLabel,
}: {
  label: string;
  options: readonly string[];
  value: string | null;
  onChange: (v: string | null) => void;
  optionLabel?: (v: string) => string;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="label-caps w-24 shrink-0 text-[0.6rem] text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={cn(
            "label-caps text-[0.65rem] transition-colors duration-300 hover:text-gold",
            value === null ? "text-gold" : "text-ink/70",
          )}
        >
          {t("properties.filter.all")}
        </button>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(value === o ? null : o)}
            className={cn(
              "label-caps text-[0.65rem] transition-colors duration-300 hover:text-gold",
              value === o ? "text-gold" : "text-ink/70",
            )}
          >
            {optionLabel ? optionLabel(o) : o}
          </button>
        ))}
      </div>
    </div>
  );
}

function PropertiesPage() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const initialLocation =
    search.location && (locations as readonly string[]).includes(search.location)
      ? search.location
      : null;
  const [location, setLocation] = useState<string | null>(initialLocation);
  const [type, setType] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  const results = useMemo(
    () =>
      properties.filter(
        (p) =>
          (!location || p.location === location) &&
          (!type || p.type === type) &&
          (!intent || p.intent === intent),
      ),
    [location, type, intent],
  );

  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("properties.hero.overline")}</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              {t("properties.hero.titleLine1")}
              <span className="block italic">{t("properties.hero.titleLine2")}</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {t("properties.hero.subtitle")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-16 pb-0 md:pt-20">
        <Container>
          <Reveal className="space-y-5 border-y border-border py-8">
            <FilterRow
              label={t("properties.filter.location")}
              options={locations}
              value={location}
              onChange={setLocation}
            />
            <FilterRow
              label={t("properties.filter.type")}
              options={propertyTypes}
              value={type}
              onChange={setType}
              optionLabel={(o) => t(`properties.type.${o}`)}
            />
            <FilterRow
              label={t("properties.filter.intent")}
              options={intents}
              value={intent}
              onChange={setIntent}
              optionLabel={(o) => t(`properties.intent.${o}`)}
            />
          </Reveal>
          <p className="label-caps mt-6 text-[0.6rem] text-muted-foreground">
            {results.length} {results.length === 1 ? t("properties.count.singular") : t("properties.count.plural")}
          </p>
        </Container>
      </Section>

      <Section className="pt-14">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2">
            {results.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120}>
                <Link to="/properties/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="hover-zoom">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1280}
                      height={960}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                    <div className="min-w-0">
                      <p className="label-caps text-[0.62rem] text-lagoon">
                        {p.location} · {t(`properties.type.${p.type}`)}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl transition-colors duration-300 group-hover:text-gold">
                        {p.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t(`properties.item.${p.slug}.line`) !== `properties.item.${p.slug}.line`
                          ? t(`properties.item.${p.slug}.line`)
                          : p.line}
                      </p>
                    </div>
                    <p className="shrink-0 font-serif text-lg">{p.price}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {results.length === 0 && (
            <p className="py-16 text-center font-serif text-2xl text-muted-foreground">
              {t("properties.empty")}
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
