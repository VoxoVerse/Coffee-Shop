"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function FloatingStorePhoto() {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0, 8, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-full max-w-md"
    >
      <div className="overflow-hidden rounded-3xl shadow-lg shadow-black/5">
        <img
          src="/images/find us.jpg"
          alt="My Life Coffee store"
          className="h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  );
}

export function FindUs() {
  const t = useTranslations("findUs");

  const rows = [
    {
      label: t("addressLabel"),
      value: "7726 التخصصي، An Nakhil, Riyadh 12384",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth="1.5" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.25" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      label: t("hoursLabel"),
      value: t("hoursPlaceholder"),
      note: t("hoursNote"),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden>
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          <path strokeWidth="1.5" strokeLinecap="round" d="M12 7v6l3 2" />
        </svg>
      ),
    },
    {
      label: t("phoneLabel"),
      value: "050 222 2333",
      href: "tel:+966502222333",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M7 4h3l2 4-2 1c1 3 3 5 6 6l1-2 4 2v3c0 1-1 2-2 2C9.9 18 6 14.1 6 9c0-1 1-2 2-2Z"
          />
        </svg>
      ),
    },
    {
      label: t("emailLabel"),
      value: "info@mylifecoffee.sa",
      href: "mailto:info@mylifecoffee.sa",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth="1.5" d="M4 7h16v10H4z" />
          <path strokeWidth="1.5" d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
  ] as const;

  return (
    <section id="find-us" className="scroll-mt-28 bg-brand-panel/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.55 }}
          className="max-w-xl"
        >
          <h2 className="font-display text-3xl text-gray-900 sm:text-5xl">{t("title")}</h2>
          <p className="mt-2 font-arabic text-base text-gray-500 sm:text-lg">{t("titleAr")}</p>
        </motion.div>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55 }}
            className="space-y-6 sm:space-y-8"
          >
            {rows.map((row, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                  {row.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{row.label}</p>
                  {"href" in row && row.href ? (
                    <a
                      href={row.href}
                      data-cursor="pointer"
                      className="mt-1 block text-base text-gray-900 transition hover:text-gray-600 sm:mt-2 sm:text-lg"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base text-gray-900 sm:mt-2 sm:text-lg">{row.value}</p>
                  )}
                  {"note" in row && row.note ? (
                    <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">{row.note}</p>
                  ) : null}
                </div>
              </div>
            ))}
            <p className="text-sm text-gray-400">
              <span className="text-gray-600">{t("website")}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <FloatingStorePhoto />
          </motion.div>
        </div>
      </div>
    </section>
  );
}