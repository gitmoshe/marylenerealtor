import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";

export function NewsletterBand() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const emailSchema = z
    .string()
    .trim()
    .email({ message: t("home.newsletter.errInvalid") })
    .max(255, { message: "Email must be less than 255 characters" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? t("home.newsletter.errInvalid"));
      return;
    }
    setError(null);
    setDone(true);
    setEmail("");
  }

  return (
    <section className="border-y border-border bg-secondary/40 px-6 py-14 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-3xl italic">{t("home.newsletter.title")}</p>
          <span className="rule-gold mt-4 w-12" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("home.newsletter.subtitle")}
          </p>
        </div>

        <form onSubmit={onSubmit} className="w-full md:max-w-sm" noValidate>
          <label htmlFor="lettre-email" className="label-caps text-[0.58rem] text-muted-foreground">
            {t("home.newsletter.emailLabel")}
          </label>
          <div className="mt-2 flex items-center gap-4 border-b border-border focus-within:border-gold">
            <input
              id="lettre-email"
              type="email"
              name="email"
              maxLength={255}
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("home.newsletter.placeholder")}
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
            />
            <button
              type="submit"
              aria-label={t("home.newsletter.subscribeAria")}
              className="grid size-11 shrink-0 place-items-center bg-gold text-ivory transition-colors duration-500 hover:bg-ink"
            >
              <ArrowRight strokeWidth={1.25} className="size-4" />
            </button>
          </div>
          {error ? <p className="mt-3 text-xs text-destructive">{error}</p> : null}
          {done ? (
            <p className="mt-3 text-xs text-lagoon">{t("home.newsletter.success")}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
