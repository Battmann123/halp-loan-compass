/**
 * Legacy compatibility shim over the audited calculator engine.
 *
 * The full source-of-truth lives in `src/lib/engine/` (the `@halp/calculator-engine`
 * package source ported into the repo). It returns `CalcResult<T>` objects with
 * line-item breakdowns, source citations, assumptions, FY year, and engine version.
 *
 * Existing calculator pages import the legacy functions below (which return the
 * old flat shapes). They keep working unchanged. New pages — and pages migrated
 * in Batch 2 — should import directly from `@/lib/engine` to get the full
 * `CalcResult<T>` payload (sources + assumptions) for the SourceCitationFooter.
 *
 * Engine version: see `src/lib/engine/meta.ts` (ENGINE_VERSION, LAST_UPDATED).
 */

import {
  calculateIncomeTax as _calculateIncomeTax,
  getMarginalRate as _getMarginalRate,
  monthlyRepayment as _monthlyRepayment,
  calculateStampDuty as _calculateStampDuty,
  calculateLmi as _calculateLmi,
} from "@/lib/engine";
import type {
  StampDutyInput as EngineStampDutyInput,
  StampDutyBreakdown,
  LmiInput as EngineLmiInput,
  LmiBreakdown,
} from "@/lib/engine";

// Re-export shared types so existing imports keep working.
export type { AusState, OccupancyType, PropertyCategory } from "@/lib/engine";

// ---------------------------------------------------------------------------
// Tax — engine signatures are backward-compatible (fyYear is optional)
// ---------------------------------------------------------------------------
export const calculateIncomeTax = (income: number): number => _calculateIncomeTax(income);
export const getMarginalRate = (income: number): number => _getMarginalRate(income);

// ---------------------------------------------------------------------------
// Loan repayment — same signature as the original helper
// ---------------------------------------------------------------------------
export const monthlyRepayment = (
  principal: number,
  annualRatePct: number,
  termYears: number,
  type: "principal-interest" | "interest-only" = "principal-interest"
): number => _monthlyRepayment(principal, annualRatePct, termYears, type);

// ---------------------------------------------------------------------------
// Stamp duty — legacy flat-shape wrapper around CalcResult<StampDutyBreakdown>
// ---------------------------------------------------------------------------
export type StampDutyInput = Omit<EngineStampDutyInput, "offThePlan" | "fyYear"> & {
  offThePlan?: boolean;
};

export type StampDutyResult = StampDutyBreakdown;

export const calculateStampDuty = (input: StampDutyInput): StampDutyResult =>
  _calculateStampDuty(input as EngineStampDutyInput).result;

// ---------------------------------------------------------------------------
// LMI — legacy flat-shape wrapper around CalcResult<LmiBreakdown>
// ---------------------------------------------------------------------------
export type LmiInput = Omit<EngineLmiInput, "fyYear">;

export type LmiResult = LmiBreakdown;

export const calculateLmi = (input: LmiInput): LmiResult =>
  _calculateLmi(input as EngineLmiInput).result;
