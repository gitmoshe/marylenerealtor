import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "ivory";
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center leading-none",
        tone === "ivory" ? "text-ivory" : "text-ink",
        className,
      )}
    >
      <span className="font-serif text-[1.35rem] tracking-[0.28em] uppercase sm:text-[1.5rem]">
        Marylene
      </span>
      <span className="mt-1 flex w-full items-center gap-2">
        <span className="rule-gold flex-1 opacity-70" />
        <span className="overline text-[0.55rem] tracking-[0.34em] whitespace-nowrap">
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
