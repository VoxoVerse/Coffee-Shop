"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef } from "react";

import { SEQUENCE_FRAME_COUNT } from "@/lib/sequence-config";

import { CanvasSequence } from "./CanvasSequence";
import { SequenceStory } from "./SequenceStory";
import { useSectionScrollProgress } from "./useSectionScrollProgress";
import { useSequenceImages } from "./useSequenceImages";

export function SequenceSection() {
  const t = useTranslations("sequence");
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const { images, loaded, done, error } = useSequenceImages();

  const loadRatio = loaded / Math.max(1, SEQUENCE_FRAME_COUNT);

  return (
    <>
      {(!done || error) && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 1 }}
          animate={{ opacity: done && !error ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ pointerEvents: done && !error ? "none" : "auto" }}
        >
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/50">
            {t("loading")}
          </p>
          <div className="h-1 w-56 max-w-[80vw] overflow-hidden rounded-full bg-white/10 sm:w-80">
            <div
              className="h-full origin-inline-start bg-gradient-to-r from-brand-teal to-brand-mint/90 transition-[width] duration-200"
              style={{ width: `${Math.round(loadRatio * 100)}%` }}
            />
          </div>
          <p className="mt-4 text-xs text-white/40">
            {loaded} / {SEQUENCE_FRAME_COUNT}
          </p>
          {error && (
            <p className="mt-4 max-w-sm text-center text-sm text-red-300/90">
              {error}
            </p>
          )}
        </motion.div>
      )}

      <section
        id="sequence"
        ref={sectionRef}
        className="relative h-[480vh] scroll-mt-0"
        aria-label="Story"
      >
        <div className="sticky top-0 h-[100dvh] min-h-[600px] overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0">
            <CanvasSequence
              progress={done && !error ? progress : 0}
              images={images}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(200,240,224,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A06]/25 via-transparent to-[#0A0A0A]/90" />
          </div>
          {done && !error ? <SequenceStory progress={progress} /> : null}
        </div>
      </section>
    </>
  );
}
