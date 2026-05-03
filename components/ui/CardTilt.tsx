"use client";

import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function CardTilt({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    // Skip 3D tilt on touch devices for performance
    if (e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const rx = (-py * 10).toFixed(2);
    const ry = (px * 14).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="pointer"
      className={`transform-gpu transition-transform duration-200 ease-out will-change-transform ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
