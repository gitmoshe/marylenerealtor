import { useState, type ComponentProps } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarCheck, X } from "lucide-react";
import { ButtonAction, ButtonAnchor } from "./ui";
import { useI18n } from "@/lib/i18n";

const BOOKING_URL = "https://calendly.com/marylenerealtor-info/30min";

/** One booking experience for every consultation CTA; email enquiries stay separate. */
export function BookingButton({ children, onClick, ...props }: Omit<ComponentProps<typeof ButtonAnchor>, "href">) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(BOOKING_URL);
  const [loaded, setLoaded] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <ButtonAnchor
        {...props}
        href={BOOKING_URL}
        aria-haspopup="dialog"
        onClick={(event) => {
          onClick?.(event);
          event.preventDefault();
          const url = new URL(BOOKING_URL);
          url.searchParams.set("embed_domain", window.location.hostname);
          url.searchParams.set("embed_type", "Inline");
          url.searchParams.set("locale", lang);
          setEmbedUrl(url.toString());
          setLoaded(false);
          setOpen(true);
        }}
      >
        {children}
      </ButtonAnchor>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] flex h-[90svh] max-h-[900px] w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-gold/40 bg-background shadow-xl duration-500 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-6">
            <div>
              <Dialog.Title className="font-serif text-lg font-medium sm:text-2xl">{t("contact.book")}</Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-muted-foreground">{t("booking.description")}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <ButtonAction variant="outline" className="size-11 shrink-0 p-0" aria-label={t("booking.close")}>
                <X className="size-5" />
              </ButtonAction>
            </Dialog.Close>
          </div>
          <div className="relative min-h-0 flex-1 bg-card">
            {!loaded && <p role="status" className="absolute inset-0 flex items-center justify-center gap-3 text-sm text-muted-foreground"><CalendarCheck className="size-5 animate-pulse text-gold" />{t("booking.loading")}</p>}
            <iframe src={embedUrl} title={t("contact.book")} onLoad={() => setLoaded(true)} className="relative h-full w-full border-0" />
          </div>
          <div className="shrink-0 border-t border-border px-4 py-3 text-center">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline underline-offset-4 hover:text-gold">{t("booking.external")}</a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}