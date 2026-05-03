"use client";

import { useEffect, useRef } from "react";

import { SEQUENCE_FRAME_COUNT } from "@/lib/sequence-config";

type Props = {
  progress: number;
  images: (HTMLImageElement | null)[];
};

export function CanvasSequence({ progress, images }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, w, h);

      const loadedCount = images.filter(Boolean).length;
      if (loadedCount === 0) return;

      const maxIndex = SEQUENCE_FRAME_COUNT - 1;
      const exact = Math.min(1, Math.max(0, progress)) * maxIndex;
      const i = Math.floor(exact);
      const j = Math.min(maxIndex, i + 1);
      const f = exact - i;

      const imgA = images[i];
      const imgB = images[j];

      const drawContain = (img: HTMLImageElement) => {
        if (!img.complete || img.naturalWidth === 0) return;
        const ir = img.width / img.height;
        const cr = w / h;
        let dw = w;
        let dh = h;
        if (ir > cr) {
          dh = w / ir;
        } else {
          dw = h * ir;
        }
        const dx = (w - dw) / 2;
        const dy = (h - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      if (imgA && imgB && i !== j) {
        ctx.globalAlpha = 1 - f;
        drawContain(imgA);
        ctx.globalAlpha = f;
        drawContain(imgB);
      } else if (imgA) {
        ctx.globalAlpha = 1;
        drawContain(imgA);
      }
      ctx.globalAlpha = 1;
    };

    draw();

    const ro = new ResizeObserver(() => draw());
    ro.observe(wrap);

    return () => ro.disconnect();
  }, [images, progress]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
