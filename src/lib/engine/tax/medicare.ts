/**
 * Medicare Levy and Medicare Levy Surcharge.
 *
 * Standard rate: 2% of taxable income.
 * Low-income threshold (FY25-26, residents): nil ≤ $27,222; full levy from $34,028 (single).
 *                                              Family: nil ≤ $45,907; full from $57,384.
 * Phase-in is linear between the two thresholds (the legislated "shading-in" mechanism).
 *
 * MLS tiers (singles, FY25-26): $101k / $118k / $158k → 1.0% / 1.25% / 1.5%.
 *
 * FY26-27 thresholds are CPI-indexed and will be published in the May 2026 Budget; this
 * module accepts a fyYear flag but currently returns FY25-26 figures with a notice
 * captured in `assumptions` upstream when fyYear === "2026-27".
 *
 * Source: ATO — Medicare levy thresholds.
 */

import type { FYYear } from "../types";

interface MedicareInput {
  income: number;
  fyYear?: FYYear;
  isFamily?: boolean;
  hasPrivateHealth?: boolean;
}

const SINGLE_LOW = 27222;
const SINGLE_FULL = 34028;
const FAMILY_LOW = 45907;
const FAMILY_FULL = 57384;

const MLS_TIERS = [
  { threshold: 101000, rate: 0.010 },
  { threshold: 118000, rate: 0.0125 },
  { threshold: 158000, rate: 0.015 },
] as const;

/** Total Medicare Levy (2% standard, with low-income shading) plus MLS where applicable. */
export function calculateMedicare(input: MedicareInput): { levy: number; surcharge: number; total: number } {
  const { income, isFamily = false, hasPrivateHealth = false } = input;
  if (income <= 0) return { levy: 0, surcharge: 0, total: 0 };

  const low = isFamily ? FAMILY_LOW : SINGLE_LOW;
  const full = isFamily ? FAMILY_FULL : SINGLE_FULL;

  let levy: number;
  if (income <= low) levy = 0;
  else if (income >= full) levy = income * 0.02;
  else {
    // Linear shading-in between low and full
    const fraction = (income - low) / (full - low);
    levy = income * 0.02 * fraction;
  }

  let surcharge = 0;
  if (!hasPrivateHealth) {
    for (const tier of MLS_TIERS) {
      if (income > tier.threshold) surcharge = income * tier.rate;
    }
  }

  return { levy, surcharge, total: levy + surcharge };
}
