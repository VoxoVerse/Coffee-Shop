"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";

function CafePhotoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 25 });
  const ry = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 25 });
  const imgX = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 });
  const imgY = useSpring(useTransform(y, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 });

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      data-cursor="pointer"
      className="group relative overflow-hidden rounded-3xl transform-gpu will-change-transform"
      style={{ rotateX: rx, rotateY: ry, perspective: 900, transformStyle: "preserve-3d" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="overflow-hidden rounded-3xl">
        <motion.img
          src="/images/caffe photo.png"
          alt="My Life Coffee café"
          className="h-auto w-full object-cover"
          style={{ x: imgX, y: imgY, scale: 1.08 }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

export function Story() {
  const t = useTranslations("story");

  return (
    <section id="story" className="scroll-mt-28 bg-brand-bg py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-14%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 font-arabic text-base text-gray-500 sm:text-lg">{t("titleAr")}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 sm:mt-8 sm:space-y-5 sm:text-lg">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CafePhotoCard />
        </motion.div>
      </div>
    </section>
  );
}