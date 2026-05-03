/** Normalized scroll progress (0–1) through the sticky sequence section */
export const BEATS = {
  introEnd: 0.15,
  originEnd: 0.35,
  craftEnd: 0.6,
  menuEnd: 0.8,
} as const;

export function windowOpacity(
  p: number,
  start: number,
  end: number,
  fade = 0.04,
): number {
  if (p < start || p > end) return 0;
  const inStart = (p - start) / Math.max(fade, 0.0001);
  const inEnd = (end - p) / Math.max(fade, 0.0001);
  return Math.min(1, inStart, inEnd, 1);
}
