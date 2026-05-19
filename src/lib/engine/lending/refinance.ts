/**
 * Refinance calculator — compares the existing loan against a refinance offer.
 * Like-for-like remaining-term comparison, break-even months, lifetime savings.
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { monthlyRepayment } from "./repayment";
import { round } from "../util";

export interface RefinanceInput {
  currentBalance: number;
  currentRatePct: number;
  currentRepayment: number;
  remainingYears: number;
  newRatePct: number;
  refinanceCosts: number;
  fyYear?: FYYear;
}

export interface RefinanceBreakdown {
  newRepayment: number;
  monthlySaving: number;
  annualSaving: number;
  breakEvenMonths: number;
  fiveYearSavings: number;
  lifetimeSavings: number;
  worthRefinancing: boolean;
}

export function calculateRefinance(input: RefinanceInput): CalcResult<RefinanceBreakdown> {
  const { currentBalance, currentRepayment, remainingYears, newRatePct, refinanceCosts } = input;
  const fyYear = input.fyYear ?? CURRENT_FY;
  const newRepayment = monthlyRepayment(currentBalance, newRatePct, remainingYears);
  const monthlySaving = currentRepayment - newRepayment;
  const annualSaving = monthlySaving * 12;
  const breakEvenMonths = monthlySaving > 0 ? refinanceCosts / monthlySaving : Infinity;
  const fiveYearSavings = monthlySaving * 60 - refinanceCosts;
  const n = remainingYears * 12;
  const oldTotalInterest = currentRepayment * n - currentBalance;
  const newTotalInterest = newRepayment * n - currentBalance;
  const lifetimeSavings = oldTotalInterest - newTotalInterest - refinanceCosts;

  const result: RefinanceBreakdown = {
    newRepayment: round(newRepayment, 2),
    monthlySaving: round(monthlySaving, 2),
    annualSaving: round(annualSaving, 2),
    breakEvenMonths: round(breakEvenMonths, 1),
    fiveYearSavings: round(fiveYearSavings),
    lifetimeSavings: round(lifetimeSavings),
    worthRefinancing: lifetimeSavings > 0 && breakEvenMonths < remainingYears * 12,
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `Like-for-like comparison over ${remainingYears} remaining years`,
      `Refinance costs of $${refinanceCosts.toLocaleString()} include estimated discharge, application, and registration fees`,
      "Does not account for break costs on fixed loans — confirm with current lender if loan is fixed",
      "Cashback offers (where applicable) not included — net them against refinance costs",
    ],
    sources: [
      { label: "ASIC MoneySmart — Switching home loans", url: "https://moneysmart.gov.au/home-loans/switching-home-loans", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
