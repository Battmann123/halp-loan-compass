/**
 * Deposit Savings Calculator — time-to-deposit with monthly contribution +
 * interest accumulation. NEW for Phase 2 (Phase 2 scope spec listed this but
 * the Lovable repo doesn't have it).
 *
 * Optionally overlays the FHSS contribution to show how voluntary super
 * contributions accelerate deposit accumulation.
 *
 * Source: ASIC MoneySmart — Savings calculator methodology.
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { round } from "../util";
import { calculateFHSS } from "../grants/fhss";

export interface DepositSavingsInput {
  propertyValue: number;
  targetDepositPct: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedAnnualReturnPct?: number;
  /** Optional FHSS overlay. */
  includeFhss?: boolean;
  fhssAnnualContribution?: number;
  marginalRate?: number;
  fyYear?: FYYear;
}

export interface DepositSavingsBreakdown {
  targetDeposit: number;
  shortfall: number;
  monthsToTarget: number;
  yearsToTarget: number;
  totalContributions: number;
  totalInterest: number;
  fhssContribution: number;
  finalAtTarget: number;
}

export function calculateDepositSavings(input: DepositSavingsInput): CalcResult<DepositSavingsBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const annualReturn = (input.expectedAnnualReturnPct ?? 4.5) / 100;
  const monthlyReturn = annualReturn / 12;
  const targetDeposit = input.propertyValue * (input.targetDepositPct / 100);
  const shortfall = Math.max(0, targetDeposit - input.currentSavings);

  // Standard FV-of-annuity inversed to solve for n (months)
  let balance = input.currentSavings;
  let months = 0;
  let totalContributions = input.currentSavings;
  while (balance < targetDeposit && months < 30 * 12) {
    balance = balance * (1 + monthlyReturn) + input.monthlyContribution;
    totalContributions += input.monthlyContribution;
    months++;
  }
  const yearsToTarget = months / 12;
  const totalInterest = balance - totalContributions;

  let fhssContribution = 0;
  if (input.includeFhss && input.fhssAnnualContribution && input.marginalRate !== undefined) {
    const yearsContributing = Math.ceil(yearsToTarget);
    const fhss = calculateFHSS({ annualContribution: input.fhssAnnualContribution, yearsContributing, marginalRate: input.marginalRate });
    fhssContribution = fhss.netAvailableForDeposit;
  }

  const result: DepositSavingsBreakdown = {
    targetDeposit: round(targetDeposit),
    shortfall: round(shortfall),
    monthsToTarget: months,
    yearsToTarget: round(yearsToTarget, 1),
    totalContributions: round(totalContributions),
    totalInterest: round(totalInterest),
    fhssContribution: round(fhssContribution),
    finalAtTarget: round(balance + fhssContribution),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `${input.targetDepositPct}% deposit target on $${input.propertyValue.toLocaleString()} property`,
      `${(annualReturn * 100).toFixed(1)}% expected annual return on savings (high-interest savings or term deposit)`,
      "Monthly contribution assumed constant — review annually as income changes",
      "Interest assumed paid monthly and reinvested",
      input.includeFhss ? "FHSS overlay included — voluntary super contributions withdrawn as part of deposit" : "FHSS not included — turn on the toggle to model voluntary super contributions",
    ],
    sources: [
      { label: "ASIC MoneySmart — Savings calculator", url: "https://moneysmart.gov.au/saving/savings-goals-calculator", asOf: "2026-05-12" },
      { label: "ATO — FHSS scheme details", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/early-access-to-super/first-home-super-saver-scheme", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
