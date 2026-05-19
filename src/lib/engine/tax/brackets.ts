/**
 * Australian resident income-tax brackets.
 *
 * FY2024-25 / FY2025-26 (Stage 3, effective 1 July 2024):
 *   0 – $18,200       : 0%
 *   $18,201 – $45,000 : 16%
 *   $45,001 – $135,000: 30%
 *   $135,001 – $190,000: 37%
 *   $190,001+         : 45%
 *
 * FY2026-27 (legislated, effective 1 July 2026 — Cost-of-Living Tax Cuts Act 2024):
 *   0 – $18,200       : 0%
 *   $18,201 – $45,000 : 15%   <- second bracket cut from 16% → 15%
 *   $45,001 – $135,000: 30%
 *   $135,001 – $190,000: 37%
 *   $190,001+         : 45%
 *
 * Sources:
 *   • ATO — Individual income tax rates (https://www.ato.gov.au/rates/individual-income-tax-rates/)
 *   • Treasury Laws Amendment (Cost of Living Tax Cuts) Act 2024 (Cth)
 */

import type { FYYear } from "../types";
import { CURRENT_FY } from "../meta";

interface Bracket {
  /** Inclusive upper bound of the bracket. Use Infinity for the top bracket. */
  upTo: number;
  /** Marginal rate in this bracket (decimal). */
  rate: number;
  /** Tax payable at the start of this bracket (computed). */
  base: number;
}

function buildBrackets(rates: { upTo: number; rate: number }[]): Bracket[] {
  const out: Bracket[] = [];
  let prevUpper = 0;
  let cumulative = 0;
  for (const r of rates) {
    out.push({ upTo: r.upTo, rate: r.rate, base: cumulative });
    cumulative += (r.upTo - prevUpper) * r.rate;
    prevUpper = r.upTo;
  }
  return out;
}

const BRACKETS_25_26: Bracket[] = buildBrackets([
  { upTo: 18200, rate: 0 },
  { upTo: 45000, rate: 0.16 },
  { upTo: 135000, rate: 0.30 },
  { upTo: 190000, rate: 0.37 },
  { upTo: Infinity, rate: 0.45 },
]);

const BRACKETS_26_27: Bracket[] = buildBrackets([
  { upTo: 18200, rate: 0 },
  { upTo: 45000, rate: 0.15 }, // 16% → 15% from 1 Jul 2026
  { upTo: 135000, rate: 0.30 },
  { upTo: 190000, rate: 0.37 },
  { upTo: Infinity, rate: 0.45 },
]);

function bracketsFor(fyYear: FYYear): Bracket[] {
  return fyYear === "2026-27" ? BRACKETS_26_27 : BRACKETS_25_26;
}

/** Total income tax payable for a resident at `income`, for the given FY. */
export function calculateIncomeTax(income: number, fyYear: FYYear = CURRENT_FY): number {
  if (income <= 0) return 0;
  const brackets = bracketsFor(fyYear);
  let prevUpper = 0;
  for (const b of brackets) {
    if (income <= b.upTo) {
      return b.base + (income - prevUpper) * b.rate;
    }
    prevUpper = b.upTo;
  }
  return 0; // unreachable — top bracket has upTo = Infinity
}

/** Marginal rate (decimal) for the bracket containing `income`. */
export function getMarginalRate(income: number, fyYear: FYYear = CURRENT_FY): number {
  if (income <= 0) return 0;
  const brackets = bracketsFor(fyYear);
  for (const b of brackets) {
    if (income <= b.upTo) return b.rate;
  }
  return 0.45;
}

/** Average (effective) tax rate at this income, for the given FY. */
export function getEffectiveRate(income: number, fyYear: FYYear = CURRENT_FY): number {
  if (income <= 0) return 0;
  return calculateIncomeTax(income, fyYear) / income;
}
