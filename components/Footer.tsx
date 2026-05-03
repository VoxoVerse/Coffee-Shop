"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const WHATSAPP = "https://wa.me/966502222333";
const FB = "https://www.facebook.com/mylifecoffe.ksa/";
const IG = "https://instagram.com/";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="border-t border-[#A0714F] bg-[#8B5E3C] py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-1"
        >
          <span className="font-display text-xl text-white">{tc("brandEn")}</span>
          <span className="font-arabic text-sm text-white/60">{tc("brandArShort")}</span>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            className="mt-3 text-sm text-white/50 hover:text-white"
          >
            050 222 2333
          </a>
        </motion.div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
          <a href="#menu" data-cursor="pointer" className="hover:text-white transition">
            {tn("menu")}
          </a>
          <a href="#story" data-cursor="pointer" className="hover:text-white transition">
            {tn("story")}
          </a>
          <a href="#find-us" data-cursor="pointer" className="hover:text-white transition">
            {tn("findUs")}
          </a>
        </nav>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">{t("follow")}</p>
          <div className="flex gap-4">
            <motion.a
              href={FB}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              aria-label="Facebook"
              whileHover={{ y: -2 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/40 hover:text-white"
            >
              <FacebookIcon />
            </motion.a>
            <motion.a
              href={IG}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              aria-label="Instagram"
              whileHover={{ y: -2 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/40 hover:text-white"
            >
              <InstagramIcon />
            </motion.a>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-7xl px-5 text-center text-xs text-white/40 sm:px-8">
        {t("rights")}
      </p>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7V12h3.5V9.8c0-3.5 2.1-5.4 5.3-5.4 1.5 0 3 .3 3 .3v3.4h-1.7c-1.7 0-2.2 1-2.2 2.1V12h3.8l-.6 3.9h-3.2v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 8.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-4a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 5.5Z" />
    </svg>
  );
}