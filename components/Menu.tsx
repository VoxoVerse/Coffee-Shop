"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { CardTilt } from "@/components/ui/CardTilt";

function FloatingImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0, 8, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mb-4 aspect-[4/3] overflow-hidden rounded-xl"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Menu() {
  const t = useTranslations("menuSection");

  const categories = [
    {
      key: "drinks",
      icon: "◎",
      rows: ["Placeholder", "Placeholder", "Placeholder"],
      image: "/images/Iced-Mocha.jpg",
      imageAlt: "Iced Mocha",
    },
    {
      key: "coffee",
      icon: "☕",
      rows: ["Placeholder", "Placeholder", "Placeholder", "Placeholder"],
      image: "/images/cup.jpg",
      imageAlt: "Coffee cup",
    },
    {
      key: "desserts",
      icon: "◇",
      rows: ["Placeholder", "Placeholder", "Placeholder"],
      image: "/images/layer-cake.jpg",
      imageAlt: "Layer cake",
    },
  ] as const;

  return (
    <section id="menu" className="scroll-mt-28 bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 font-arabic text-lg text-gray-400">{t("titleAr")}</p>
          <div className="mt-6 h-px w-24 bg-white/20" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {categories.map((cat) => (
            <motion.div key={cat.key} variants={item}>
              <CardTilt className="h-full rounded-2xl border border-brand-dark-border bg-brand-dark-card p-6">
                <FloatingImage src={cat.image} alt={cat.imageAlt} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl">{cat.icon}</p>
                    <h3 className="mt-4 font-display text-2xl text-white">
                      {t(`categories.${cat.key}.en`)}
                    </h3>
                    <p className="font-arabic text-sm text-gray-500">
                      {t(`categories.${cat.key}.ar`)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-0.5 w-full bg-white/10" />
                <ul className="mt-6 space-y-3 text-sm text-gray-400">
                  {cat.rows.map((name, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-4 border-b border-white/5 pb-3"
                    >
                      <span>{name}</span>
                      <span className="font-mono text-gray-400">
                        {t("items.placeholderPrice")}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardTilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}