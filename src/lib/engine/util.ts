/**
 * Numerical and formatting utilities used across the engine.
 */

export const round = (n: number, dp = 0): number => {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
};

export const round2 = (n: number) => round(n, 2);

/** Clamp x into [min, max]. */
export const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(max, x));

/** Linear interpolation from a..b at fraction t ∈ [0,1]. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Returns true if `value` is strictly inside [low, high]. */
export const inRange = (value: number, low: number, high: number) =>
  value >= low && value <= high;
