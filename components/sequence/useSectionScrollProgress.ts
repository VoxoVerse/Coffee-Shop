"use client";

import { useEffect, useState, type RefObject } from "react";

export function useSectionScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const elTop = rect.top + scrollY;
      const range = el.offsetHeight - viewH;
      if (range <= 0) {
        setProgress(0);
        return;
      }
      const p = (scrollY - elTop) / range;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  return progress;
}
