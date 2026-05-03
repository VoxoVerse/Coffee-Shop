"use client";

import { useCallback, useEffect, useState } from "react";

import { SEQUENCE_FRAME_COUNT, sequenceFrameUrl } from "@/lib/sequence-config";

const CONCURRENCY = 8;

type LoadState = {
  images: (HTMLImageElement | null)[];
  loaded: number;
  done: boolean;
  error: string | null;
};

export function useSequenceImages() {
  const [state, setState] = useState<LoadState>({
    images: Array.from({ length: SEQUENCE_FRAME_COUNT }, () => null),
    loaded: 0,
    done: false,
    error: null,
  });

  const start = useCallback(() => {
    setState({
      images: Array.from({ length: SEQUENCE_FRAME_COUNT }, () => null),
      loaded: 0,
      done: false,
      error: null,
    });

    const images: (HTMLImageElement | null)[] = Array.from(
      { length: SEQUENCE_FRAME_COUNT },
      () => null,
    );
    let completed = 0;
    let cancelled = false;

    const loadOne = (index: number) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[index] = img;
          completed += 1;
          if (!cancelled) {
            setState((s) => ({
              ...s,
              images: [...images],
              loaded: completed,
            }));
          }
          resolve();
        };
        img.onerror = () => {
          reject(new Error(`Failed to load ${sequenceFrameUrl(index + 1)}`));
        };
        img.src = sequenceFrameUrl(index + 1);
      });

    const run = async () => {
      const queue = Array.from({ length: SEQUENCE_FRAME_COUNT }, (_, i) => i);
      const workers = Array.from({ length: CONCURRENCY }, async () => {
        while (queue.length && !cancelled) {
          const i = queue.shift();
          if (i === undefined) return;
          try {
            await loadOne(i);
          } catch (e) {
            if (!cancelled) {
              setState((s) => ({
                ...s,
                error: e instanceof Error ? e.message : "Load error",
                done: true,
              }));
            }
            return;
          }
        }
      });
      await Promise.all(workers);
      if (!cancelled) {
        setState((s) => ({
          ...s,
          images: [...images],
          done: true,
        }));
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return start();
  }, [start]);

  return state;
}
