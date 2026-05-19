/**
 * @halp/calculator-engine — version + last-updated metadata
 *
 * Centralised so every calculator's CalcResult.engineVersion and
 * CalcResult.lastUpdated are consistent. Bump LAST_UPDATED whenever any rate,
 * threshold, or formula changes; the Transparency page reads this date.
 */

/** Engine package semver (kept in sync with package.json). */
export const ENGINE_VERSION = "1.0.0" as const;

/** ISO date the engine's underlying data was last refreshed end-to-end. */
export const LAST_UPDATED = "2026-05-12" as const;

/**
 * Default Financial Year for any calculator that doesn't take an explicit
 * fyYear input. Update on 1 July each year (or sooner if Treasury legislates
 * a change to the next FY).
 */
export const CURRENT_FY = "2025-26" as const;

/**
 * Convert a Date (or now) to the active Australian financial year.
 * FY runs 1 July to 30 June.
 */
export function fyYearOf(date: Date = new Date()): "2025-26" | "2026-27" | "future" {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0 = January, 6 = July
  // If we're in Jan-Jun, FY started 1 Jul of (year-1); if Jul-Dec, FY started 1 Jul of year.
  const fyStart = month < 6 ? year - 1 : year;
  if (fyStart === 2025) return "2025-26";
  if (fyStart === 2026) return "2026-27";
  return "future";
}
