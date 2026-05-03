"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

const photos = [
  { src: "/images/blue-drink.jpg", alt: "Blue drink" },
  { src: "/images/store-interior.jpg", alt: "Store interior" },
  { src: "/images/happiness-sign.jpg", alt: "Happiness is a cup of coffee" },
  { src: "/images/layer-cake.jpg", alt: "Layer cake" },
  { src: "/images/coffee-pour.jpg", alt: "Coffee pour" },
  { src: "/images/iced-latte.jpg", alt: "Iced latte" },
  { src: "/images/latte-art.jpg", alt: "Latte art" },
];

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 300, damping: 30 });

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
      className={`transform-gpu will-change-transform ${className}`}
      style={{ rotateX: rx, rotateY: ry, perspective: 900, transformStyle: "preserve-3d" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

function GalleryCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-5 break-inside-avoid">
      <TiltCard className="rounded-2xl">
        <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </TiltCard>
    </div>
  );
}

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="scroll-mt-28 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55 }}
          className="max-w-xl"
        >
          <h2 className="font-display text-3xl text-gray-900 sm:text-5xl">{t("title")}</h2>
          <p className="mt-2 font-arabic text-base text-gray-400 sm:text-lg">{t("titleAr")}</p>
        </motion.div>

        <div className="mt-10 columns-1 gap-4 sm:mt-12 sm:columns-2 sm:gap-5 lg:columns-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <GalleryCard src={photo.src} alt={photo.alt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}