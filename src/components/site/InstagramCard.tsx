import { Instagram } from "lucide-react";
import { ButtonAnchor } from "./ui";

export function InstagramCard() {
  return (
    <div className="flex flex-col items-start gap-8 border border-border bg-background px-8 py-10 sm:px-12 sm:py-12 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-6">
        <Instagram strokeWidth={0.75} className="mt-1 size-8 shrink-0 text-gold" />
        <div>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
            Follow the journey — <span className="italic">@marylene_realtor</span> on Instagram
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            New videos weekly — tours, cenotes, terraces and the parts of the coast that never reach
            a listing.
          </p>
        </div>
      </div>
      <ButtonAnchor
        href="https://www.instagram.com/marylene_realtor/"
        target="_blank"
        rel="noreferrer"
        variant="gold"
        className="shrink-0"
      >
        Follow
      </ButtonAnchor>
    </div>
  );
}
