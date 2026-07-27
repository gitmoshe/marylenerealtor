import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

const base =
  "label-caps inline-flex items-center justify-center gap-2 px-8 py-4 transition-all duration-500 whitespace-nowrap";

const variants = {
  gold: "bg-gold text-ivory hover:bg-ink",
  ghost: "border border-ivory/60 text-ivory hover:border-gold hover:text-gold",
  outline: "border border-ink/25 text-ink hover:border-gold hover:text-gold",
  ink: "bg-ink text-ivory hover:bg-gold",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  variant = "gold",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "gold",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

export function ButtonAction({
  variant = "gold",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function Overline({
  children,
  className,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "lagoon" | "ivory" | "muted";
}) {
  const tones = {
    gold: "text-gold",
    lagoon: "text-lagoon",
    ivory: "text-ivory/80",
    muted: "text-muted-foreground",
  } as const;
  return <span className={cn("overline block", tones[tone], className)}>{children}</span>;
}

export function GoldRule({ className }: { className?: string }) {
  return <span className={cn("rule-gold w-16", className)} aria-hidden="true" />;
}

export function Section({
  children,
  className,
  ...props
}: ComponentProps<"section"> & { children: ReactNode }) {
  return (
    <section className={cn("px-6 py-24 sm:px-10 md:py-32", className)} {...props}>
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl", className)}>{children}</div>;
}
