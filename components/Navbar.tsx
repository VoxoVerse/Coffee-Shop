"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LangToggle } from "@/components/LangToggle";

const WHATSAPP = "https://wa.me/966502222333";

const navIds = [
  { href: "#menu", key: "menu" as const },
  { href: "#story", key: "story" as const },
  { href: "#find-us", key: "findUs" as const },
];

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Smooth 0→1 opacity over first 120px of scroll
      const y = Math.min(window.scrollY, 120);
      setBgOpacity(y / 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolled = bgOpacity > 0.3;

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: `rgba(255,255,255,${bgOpacity * 0.92})`,
          backdropFilter: bgOpacity > 0.05 ? `blur(${12 + bgOpacity * 4}px)` : "none",
          borderBottom: bgOpacity > 0.1 ? `1px solid rgba(0,0,0,${bgOpacity * 0.08})` : "1px solid transparent",
          boxShadow: bgOpacity > 0.3 ? `0 1px 3px rgba(0,0,0,${bgOpacity * 0.05})` : "none",
          transition: "background-color 0s, backdrop-filter 0s, border-bottom 0s, box-shadow 0s",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <motion.a
          href="#"
          data-cursor="pointer"
          className="group flex shrink-0 flex-col leading-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`font-display text-lg tracking-tight transition-colors duration-500 ${scrolled ? "text-black" : "text-white/95 group-hover:text-white"}`}>
            {tc("brandEn")}
          </span>
          <span className={`font-arabic text-xs transition-colors duration-500 ${scrolled ? "text-gray-600" : "text-white/70"}`}>
            {tc("brandArShort")}
          </span>
        </motion.a>

        <motion.nav
          className="absolute start-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8 lg:flex"
          aria-label="Primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {navIds.map((item) => (
            <a
              key={item.key}
              href={item.href}
              data-cursor="pointer"
              className={`text-sm transition-colors duration-500 ${scrolled ? "text-gray-600 hover:text-black" : "text-white/70 hover:text-white"
                }`}
            >
              {t(item.key)}
            </a>
          ))}
        </motion.nav>

        <motion.div
          className="flex items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            className={`hidden rounded-full px-4 py-2 text-xs font-semibold transition-all duration-500 md:inline-flex ${scrolled
              ? "border border-black bg-black text-white hover:bg-gray-800"
              : "border border-white/40 bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            {tc("orderNow")}
          </a>
          <LangToggle scrolled={scrolled} />
          <button
            type="button"
            data-cursor="pointer"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden transition-colors duration-500 ${scrolled ? "border-gray-200 text-black" : "border-white/20 text-white"
              }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </span>
          </button>
        </motion.div>
      </div>

      <motion.div
        id="mobile-nav"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="overflow-hidden border-t border-gray-200 bg-white backdrop-blur-xl lg:hidden"
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {navIds.map((item, i) => (
            <motion.a
              key={item.key}
              href={item.href}
              data-cursor="pointer"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -10 }}
              transition={{ delay: open ? i * 0.05 : 0 }}
              className="rounded-xl px-3 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              {t(item.key)}
            </motion.a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            className="mt-2 rounded-full bg-black px-4 py-3 text-center text-sm font-semibold text-white"
          >
            {tc("orderNow")}
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}