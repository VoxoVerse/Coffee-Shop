/** Zero-padded PNG frames under /sequence/ — copy script syncs from /ezgif-frame */
export const SEQUENCE_FRAME_COUNT = 240;

export function sequenceFrameUrl(indexOneBased: number): string {
  const n = Math.min(
    SEQUENCE_FRAME_COUNT,
    Math.max(1, Math.round(indexOneBased)),
  );
  const padded = String(n).padStart(3, "0");
  return `/sequence/ezgif-frame-${padded}.png`;
}
