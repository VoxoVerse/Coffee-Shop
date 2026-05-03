"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const WHATSAPP = "https://wa.me/966502222333";

export function WhatsAppFloatingButton() {
  const t = useTranslations("common");

  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 end-6 z-[60] sm:bottom-8 sm:end-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 22 }}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-black/10 animate-pulse-soft" />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105"
        data-cursor="pointer"
        aria-label={t("whatsappAria")}
      >
        <WhatsAppGlyph className="h-7 w-7" />
      </a>
    </motion.div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.52 0 .33 5.19.33 11.73c0 2.07.54 4.09 1.58 5.88L0 24l6.48-1.7a11.73 11.73 0 0 0 5.58 1.43h.01c6.54 0 11.93-5.19 11.93-11.73 0-3.13-1.22-6.09-3.48-8.52ZM12.07 21.46h-.01a9.37 9.37 0 0 1-4.78-1.3l-.34-.2-4 1.05 1.07-3.89-.23-.36a9.4 9.4 0 0 1 14.24-12 9.39 9.39 0 0 1 2.77 6.68 9.43 9.43 0 0 1-9.42 9.42Zm5.38-7.27c-.29-.15-1.73-.85-2-.95-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.56-.46-.48-.64-.49h-.54c-.19 0-.48.07-.73.36-.26.29-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.86.14.19 1.97 3 4.77 4.2.67.29 1.19.46 1.59.59.67.21 1.28.18 1.76.11.54-.08 1.73-.71 1.97-1.39.24-.68.24-1.26.17-1.39-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}
