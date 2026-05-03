"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { BEATS, windowOpacity } from "@/lib/beats";
const WHATSAPP = "https://wa.me/966502222333";

type Props = {
  progress: number;
};

export function SequenceStory({ progress }: Props) {
  const t = useTranslations("sequence");
  const tc = useTranslations("common");
  const locale = useLocale();
  const isAr = locale === "ar";

  const oIntro = windowOpacity(progress, 0, BEATS.introEnd);
  const oBean = windowOpacity(progress, BEATS.introEnd, BEATS.originEnd);
  const oCraft = windowOpacity(progress, BEATS.originEnd, BEATS.craftEnd);
  const oMenu = windowOpacity(progress, BEATS.craftEnd, BEATS.menuEnd);
  const oCta = windowOpacity(progress, BEATS.menuEnd, 1);

  const displayFont = isAr ? "font-arabic" : "font-display";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
      <div className="pointer-events-auto relative mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-10 pt-28 sm:px-8">
        {/* Intro */}
        <motion.div
          className="absolute inset-x-5 top-28 flex flex-col items-center text-center sm:inset-x-8"
          style={{ opacity: oIntro }}
        >
          <motion.h1
            className={`${displayFont} text-4xl tracking-tight text-white/90 sm:text-6xl md:text-7xl`}
            initial={false}
            animate={{ y: oIntro > 0.2 ? 0 : 12, filter: `blur(${oIntro < 0.05 ? 6 : 0}px)` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("intro.title")}
          </motion.h1>
          <p className="mt-3 font-arabic text-lg text-brand-mint sm:text-xl">
            {t("intro.subtitleAr")}
          </p>
          <p className="mt-6 max-w-xl text-base text-white/55 sm:text-lg">
            <span className={isAr ? "font-arabic" : ""}>{isAr ? t("intro.tagAr") : t("intro.tag")}</span>
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-white/35">
            {t("intro.micro")}
          </p>
        </motion.div>

        {/* Origin */}
        <motion.div
          className="absolute inset-x-5 top-[22%] max-w-xl ps-0 text-start sm:inset-x-8 md:top-[26%]"
          style={{ opacity: oBean }}
        >
          <motion.div
            initial={false}
            animate={{ x: oBean > 0 ? 0 : isAr ? 48 : -48 }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          >
            <h2
              className={`${displayFont} text-3xl text-white/90 sm:text-5xl`}
            >
              {isAr ? t("bean.titleAr") : t("bean.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">
              {t("bean.body")}
            </p>
          </motion.div>
        </motion.div>

        {/* Craft */}
        <motion.div
          className="absolute inset-x-5 top-[24%] ms-auto max-w-xl text-start sm:inset-x-8 md:top-[28%]"
          style={{ opacity: oCraft }}
        >
          <motion.div
            initial={false}
            animate={{ x: oCraft > 0 ? 0 : isAr ? -48 : 48 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
          >
            <h2 className={`${displayFont} text-3xl text-white/90 sm:text-5xl`}>
              {isAr ? t("craft.titleAr") : t("craft.title")}
            </h2>
            <ul className="mt-6 space-y-3 text-base text-white/55 sm:text-lg">
              <li className="border-s-2 border-brand-teal/40 ps-4">{t("craft.line1")}</li>
              <li className="border-s-2 border-brand-teal/25 ps-4">{t("craft.line2")}</li>
              <li className="border-s-2 border-brand-gold/35 ps-4 text-white/65">
                {t("craft.line3")}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Menu moment */}
        <motion.div
          className="absolute inset-x-5 top-[30%] flex flex-col items-center text-center sm:inset-x-8 md:top-[32%]"
          style={{ opacity: oMenu }}
        >
          <motion.div
            initial={false}
            animate={{ scale: oMenu > 0 ? 1 : 0.96, y: oMenu > 0 ? 0 : 18 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={`${displayFont} text-3xl text-white/90 sm:text-5xl`}>
              {isAr ? t("menuMoment.titleAr") : t("menuMoment.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/55 sm:text-lg">
              {t("menuMoment.body")}
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="absolute inset-x-5 bottom-16 flex flex-col items-center text-center sm:inset-x-8 md:bottom-20"
          style={{ opacity: oCta }}
        >
          <motion.div
            initial={false}
            animate={{ y: oCta > 0 ? 0 : 28 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={`${displayFont} text-3xl text-white/90 sm:text-5xl`}>
              {isAr ? t("cta.titleAr") : t("cta.title")}
            </h2>
            <p className="mt-4 text-sm text-white/45 sm:text-base">{t("cta.sub")}</p>

            <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                className="rounded-full bg-gradient-to-r from-brand-teal to-brand-mint/90 px-8 py-3 text-sm font-semibold text-[#0A0A0A] shadow-[0_10px_40px_rgba(26,138,96,0.35)] transition hover:brightness-110"
              >
                {tc("orderWhatsapp")}
              </a>
              <a
                href="#menu"
                data-cursor="pointer"
                className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/80 transition hover:border-brand-teal/60 hover:text-white"
              >
                {tc("exploreMenu")}
              </a>
            </div>

            <p className="mt-8 max-w-xl text-xs leading-relaxed text-white/40 sm:text-sm">
              {t("cta.micro")}
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent" />
    </div>
  );
}
