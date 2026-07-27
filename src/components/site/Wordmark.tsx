import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  tone = "ink",
  size = "default",
}: {
  className?: string;
  tone?: "ink" | "ivory";
  size?: "default" | "compact";
}) {
  const compact = size === "compact";
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center leading-none",
        tone === "ivory" ? "text-ivory" : "text-ink",
        className,
      )}
    >
      <span
        className={cn(
          "font-serif uppercase",
          compact
            ? "text-[1.05rem] tracking-[0.2em] sm:text-[1.15rem]"
            : "text-[2.1rem] tracking-[0.22em] sm:text-[3rem]",
        )}
      >
        Marylene
      </span>
      <span
        className={cn(
          "flex w-full items-center",
          compact ? "mt-[0.3rem] gap-1.5" : "mt-3 gap-3",
        )}
      >
        <span className="rule-gold flex-1 opacity-70" />
        <span
          className={cn(
            "overline whitespace-nowrap",
            compact
              ? "text-[0.4rem] tracking-[0.3em] sm:text-[0.42rem]"
              : "text-[0.63rem] tracking-[0.42em] sm:text-[0.9rem]",
          )}
        >
          Realtor
        </span>
        <span className="rule-gold flex-1 opacity-70" />
      </span>
    </span>
  );
}


export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-grid size-14 place-items-center rounded-full border border-gold/60",
        className,
      )}
      aria-hidden="true"
    >
      <span className="font-serif text-lg tracking-[0.12em] text-gold">MM</span>
    </span>
  );
}
