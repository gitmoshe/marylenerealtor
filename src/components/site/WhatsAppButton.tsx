import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/529840000000";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Marylene on WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-ink text-gold shadow-lg ring-1 ring-gold/30 transition-all duration-500 hover:bg-gold hover:text-ink sm:right-8 sm:bottom-8"
    >
      <MessageCircle strokeWidth={1} className="size-5" />
    </a>
  );
}
