/**
 * @halp/calculator-engine — shared types
 *
 * Every calculator returns a CalcResult<T> with a primary numeric result, a
 * structured breakdown, the source citations the result was derived from, the
 * key assumptions in plain English, and the engine version that produced it.
 * The UI layer reads these and renders a self-describing source-citation
 * footer under every result. Drives the Transparency page automatically.
 */

export type AusState = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "NT" | "ACT";

export type OccupancyType = "owner-occupier" | "investor";

export type PropertyCategory = "new" | "established" | "vacant";

/** Australian financial year. FY2025-26 = 1 Jul 2025 - 30 Jun 2026. */
export type FYYear = "2025-26" | "2026-27";

export type RepaymentFrequency = "monthly" | "fortnightly" | "weekly";

export type RepaymentType = "principal-interest" | "interest-only";

export interface Source {
  /** Human-readable source name (e.g. "Revenue NSW — Transfer Duty"). */
  label: string;
  /** Canonical URL of the source. */
  url: string;
  /** ISO date — the date this source was last verified or refreshed. */
  asOf: string;
}

export interface CalcResult<T> {
  /** Primary numeric output (e.g. duty payable, monthly repayment). */
  result: T;
  /** Line-item breakdown — keys are display labels, values are amounts or strings. */
  breakdown: Record<string, number | string | boolean>;
  /** Plain-English statements of the assumptions applied (e.g. "APRA 3% buffer added to actual rate"). */
  assumptions: string[];
  /** Source citations used to derive this result. */
  sources: Source[];
  /** ISO date — the last time any input data behind this calculation was refreshed. */
  lastUpdated: string;
  /** Semver from package.json — the engine version that produced this result. */
  engineVersion: string;
  /** Whether the FY year that produced this result is the current FY at execution time. */
  fyYear: FYYear;
}
