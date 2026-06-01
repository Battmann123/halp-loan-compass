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
 * Convert a Date (or now) to the active Australian financial year.
 * FY runs 1 July to 30 June.
 */
export function fyYearOf(date: Date = new Date()): "2025-26" | "2026-27" | "future" {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0 = January, 6 = July
  const fyStart = month < 6 ? year - 1 : year;
  if (fyStart === 2025) return "2025-26";
  if (fyStart === 2026) return "2026-27";
  return "future";
}

/**
 * Highest FY for which the engine has verified rates/thresholds loaded.
 * Bump this ONLY after verifying FHOG, stamp duty, LMI, land-tax, and
 * deposit-scheme price caps for the new year.
 */
export const VERIFIED_THROUGH_FY = "2026-27" as const;

/**
 * Default Financial Year. Auto-derives from today's date — flips on 1 July
 * each year with zero code change, as long as VERIFIED_THROUGH_FY covers it.
 * If today is past VERIFIED_THROUGH_FY, clamps to the verified year and
 * `isFyOutOfDate()` returns true so the Rates Freshness page can warn.
 */
export const CURRENT_FY: "2025-26" | "2026-27" = (() => {
  const live = fyYearOf();
  return live === "future" ? VERIFIED_THROUGH_FY : live;
})();

/** True when today's FY is newer than the engine's verified data window. */
export function isFyOutOfDate(date: Date = new Date()): boolean {
  return fyYearOf(date) === "future";
}
