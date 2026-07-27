import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Instagram, MessageCircle, Mail, MapPin, CalendarCheck } from "lucide-react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import { photos } from "@/lib/photos";
import { ButtonAction, ButtonAnchor, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { useI18n, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Marylene Maglio — Riviera Maya Realtor | FR / EN / ES" },
      {
        name: "description",
        content:
          "Contact Marylene Maglio, Riviera Maya realtor: buying, selling, investing and property management, answered in French, English or Spanish.",
      },
      { property: "og:title", content: "Contact Marylene Maglio — Riviera Maya Realtor" },
      {
        property: "og:description",
        content: "Book a private consultation in French, English or Spanish.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const interests = ["Buying", "Selling", "Property management", "Investing"] as const;
const interestKeys: Record<(typeof interests)[number], TKey> = {
  Buying: "contact.buying",
  Selling: "contact.selling",
  "Property management": "contact.managing",
  Investing: "contact.investing",
};
const languages = ["FR", "EN", "ES"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40, "Phone number is too long").optional().or(z.literal("")),
  interest: z.enum(interests),
  language: z.enum(languages),
  message: z
    .string()
    .trim()
    .min(1, "Please add a short message")
    .max(1000, "Message must be under 1000 characters"),
});

function Contact() {
  const { t } = useI18n();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<(typeof interests)[number]>("Buying");
  const [language, setLanguage] = useState<(typeof languages)[number]>("EN");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      interest,
      language,
      message: data.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      const localised: Record<string, TKey> = {
        name: "contact.errName",
        email: "contact.errEmail",
        message: "contact.errMessage",
      };
      parsed.error.issues.forEach((i) => {
        const field = String(i.path[0]);
        const key = localised[field];
        next[field] = key ? t(key) : i.message;
      });
      setErrors(next);
      setSent(false);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("contact.overline")}</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              {t("contact.titleLine1")}
              <span className="block italic">{t("contact.titleLine2")}</span>
            </h1>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <form onSubmit={onSubmit} noValidate className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label={t("contact.name")} name="name" error={errors.name} />
                <Field label={t("contact.email")} name="email" type="email" error={errors.email} />
              </div>
              <Field label={t("contact.phone")} name="phone" type="tel" error={errors.phone} />

              <fieldset>
                <legend className="label-caps text-[0.58rem] text-muted-foreground">
                  {t("contact.interestLegend")}
                </legend>
                <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                  {interests.map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setInterest(i)}
                      aria-pressed={interest === i}
                      className={cn(
                        "label-caps text-[0.65rem] transition-colors duration-300 hover:text-gold",
                        interest === i ? "text-gold" : "text-ink/70",
                      )}
                    >
                      {t(interestKeys[i])}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="label-caps text-[0.58rem] text-muted-foreground">
                  {t("contact.languageLegend")}
                </legend>
                <div className="mt-4 flex gap-7">
                  {languages.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLanguage(l)}
                      aria-pressed={language === l}
                      className={cn(
                        "label-caps text-[0.65rem] transition-colors duration-300 hover:text-gold",
                        language === l ? "text-gold" : "text-ink/70",
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="message" className="label-caps text-[0.58rem] text-muted-foreground">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold"
                />
                {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
              </div>

              <ButtonAction type="submit" variant="gold" className="w-full sm:w-auto">
                {t("contact.submit")}
              </ButtonAction>

              {sent && (
                <p className="font-serif text-xl text-ink">
                  {t("contact.success")}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={140} className="md:col-span-5 md:pl-6">
            <PhotoFrame
              photo={photos.portrait}
              className="mb-8 aspect-[4/3] w-full"
              position="top"
            />
            <div className="border border-border bg-card p-8">
              <Overline>{t("contact.directOverline")}</Overline>
              <GoldRule className="mt-6" />
              <ul className="mt-8 space-y-6 text-sm">
                <li className="flex items-start gap-4">
                  <MapPin strokeWidth={1} className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-muted-foreground">
                    Riviera Maya, Quintana Roo, Mexico
                    <span className="mt-1 block text-xs">
                      Playa del Carmen · Tulum · Puerto Aventuras · Cancún
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Mail strokeWidth={1} className="mt-0.5 size-5 shrink-0 text-gold" />
                  <a
                    href="mailto:hello@marylenerealtor.com"
                    className="link-underline text-ink transition-colors duration-300 hover:text-gold"
                  >
                    hello@marylenerealtor.com
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <Instagram strokeWidth={1} className="mt-0.5 size-5 shrink-0 text-gold" />
                  <a
                    href="https://instagram.com/marylene_realtor"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-ink transition-colors duration-300 hover:text-gold"
                  >
                    @marylene_realtor
                  </a>
                </li>
              </ul>

              <ButtonAnchor
                href="https://wa.me/529840000000"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                className="mt-10 flex w-full"
              >
                <MessageCircle strokeWidth={1} className="size-4" /> {t("contact.whatsapp")}
              </ButtonAnchor>
              <ButtonAnchor href="#" variant="gold" className="mt-3 flex w-full">
                <CalendarCheck strokeWidth={1} className="size-4" /> {t("contact.book")}
              </ButtonAnchor>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Consultations are held in French, English or Spanish, by video or in person on the
                coast.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-caps text-[0.58rem] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={255}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
