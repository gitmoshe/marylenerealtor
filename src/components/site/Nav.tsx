import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

const links = [
  { to: "/", label: "Home" },
  { to: "/meet-marylene", label: "Meet Marylene" },
  { to: "/properties", label: "Properties" },
  { to: "/property-management", label: "Property Management" },
  { to: "/films", label: "The Films" },
  { to: "/la-riviera", label: "La Riviera" },
  { to: "/contact", label: "Contact" },
] as const;

const languages = ["FR", "EN", "ES"] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<(typeof languages)[number]>("EN");

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !overHero || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        solid
          ? "border-b border-border/60 bg-background/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 transition-all duration-700 sm:px-10 lg:grid-cols-[1fr_auto_1fr]",
          solid ? "py-4" : "py-6",
        )}
      >
        <div className="hidden lg:block" />

        <Link to="/" aria-label="Marylene Realtor — home" className="justify-self-start lg:justify-self-center">
          <Wordmark size="compact" tone={solid ? "ink" : "ivory"} />
        </Link>

        <div className="flex items-center justify-end gap-5">
          <div
            className={cn(
              "hidden items-center gap-1 xl:flex",
              solid ? "text-ink/70" : "text-ivory/80",
            )}
          >
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "label-caps px-1.5 text-[0.65rem] transition-colors duration-300 hover:text-gold",
                  lang === l && "text-gold",
                )}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="label-caps hidden bg-gold px-6 py-3 text-[0.65rem] text-ivory transition-colors duration-500 hover:bg-ink xl:inline-flex"
          >
            Consultation
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "grid size-10 shrink-0 place-items-center transition-colors duration-300 lg:hidden",
              solid ? "text-ink hover:text-gold" : "text-ivory hover:text-gold",
            )}
          >
            {open ? <X strokeWidth={1} className="size-6" /> : <Menu strokeWidth={1} className="size-6" />}
          </button>
        </div>
      </div>

      {/* Desktop inline nav */}
      <nav
        className={cn(
          "hidden justify-center gap-8 pb-4 transition-all duration-700 lg:flex",
          solid ? "text-ink" : "text-ivory",
        )}
        aria-label="Primary"
      >
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="label-caps link-underline text-[0.65rem] transition-colors duration-300 hover:text-gold"
            activeProps={{ className: "text-gold" }}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Overlay menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background transition-[max-height,opacity] duration-700",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-8 sm:px-10" aria-label="Menu">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="border-b border-border/50 py-4 font-serif text-2xl text-ink transition-colors duration-300 hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1 text-ink/70">
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "label-caps px-1.5 text-[0.65rem] hover:text-gold",
                    lang === l && "text-gold",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              to="/contact"
              className="label-caps bg-gold px-6 py-3 text-[0.65rem] text-ivory transition-colors duration-500 hover:bg-ink"
            >
              Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
