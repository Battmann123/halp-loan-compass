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
 * Highest FY for which the engine has verified rates/thresholds loaded.
 * Bump this only after verifying FHOG, stamp duty, LMI, land-tax, and price
 * caps for the new year. Used to detect when the calendar has rolled past
 * our verified data window.
 */
export const VERIFIED_THROUGH_FY = "2026-27" as const;

/**
 * Default Financial Year for any calculator that doesn't take an explicit
 * fyYear input. Auto-derives from today's date — flips on 1 July each year
 * with zero code change, as long as VERIFIED_THROUGH_FY covers it.
 *
 * If the live date moves past VERIFIED_THROUGH_FY, we clamp to the verified
 * year and `isFyOutOfDate()` returns true so the Rates Freshness page can
 * surface a warning banner.
 */
export const CURRENT_FY: "2025-26" | "2026-27" = (() => {
  const live = fyYearOf();
  if (live === "future") return VERIFIED_THROUGH_FY;
  return live;
})();

/** True when today's FY is newer than the engine's verified data window. */
export function isFyOutOfDate(date: Date = new Date()): boolean {
  return fyYearOf(date) === "future";
}

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
