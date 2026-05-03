"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const WHATSAPP = "https://wa.me/966502222333";

export function Hero() {
    const t = useTranslations("sequence");
    const tc = useTranslations("common");

    return (
        <section className="relative h-[100dvh] min-h-[500px] overflow-hidden">
            {/* Background Image — low-res for mobile, high-res on desktop */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                    alt="Premium coffee cup"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <h1 className="font-display text-4xl font-light tracking-tight text-white sm:text-6xl md:text-8xl">
                        {t("intro.title")}
                    </h1>
                    <p className="mt-2 font-arabic text-lg text-white/90 sm:text-2xl">
                        {t("intro.subtitleAr")}
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 max-w-md text-sm text-white/80 sm:mt-6 sm:max-w-lg sm:text-lg"
                >
                    {t("intro.tag")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
                >
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="pointer"
                        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100 sm:px-8"
                    >
                        {tc("orderNow")}
                    </a>
                    <a
                        href="#menu"
                        data-cursor="pointer"
                        className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10 sm:px-8"
                    >
                        {tc("exploreMenu")}
                    </a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-8 hidden font-mono text-xs uppercase tracking-[0.3em] text-white/50 sm:block"
                >
                    {t("intro.micro")}
                </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                        Scroll
                    </span>
                    <div className="h-8 w-px bg-white/30 sm:h-10" />
                </div>
            </motion.div>
        </section>
    );
}