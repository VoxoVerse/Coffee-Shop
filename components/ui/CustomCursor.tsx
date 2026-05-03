"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SCALE_HOVER = 2.4;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 });
  const scale = useMotionValue(1);
  const sScale = useSpring(scale, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => {
      setEnabled(mq.matches);
      document.body.style.cursor = mq.matches ? "none" : "";
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = target?.closest(
        "a, button, [role='button'], [data-cursor='pointer'], svg, img, [type='submit']",
      );
      scale.set(interactive ? SCALE_HOVER : 1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [enabled, scale, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        scale: sScale,
      }}
    >
      <div className="h-3 w-3 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
    </motion.div>
  );
}
