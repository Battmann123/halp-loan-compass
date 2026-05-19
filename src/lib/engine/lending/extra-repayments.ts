/**
 * Extra repayments calculator — time + interest saved by paying more than
 * the minimum repayment. Standard amortisation differencing.
 */

import type { FYYear, RepaymentFrequency, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { monthlyRepayment } from "./repayment";
import { round } from "../util";

export interface ExtraRepaymentsInput {
  principal: number;
  annualRatePct: number;
  termYears: number;
  extraMonthlyAmount: number;
  frequency?: RepaymentFrequency;
  fyYear?: FYYear;
}

export interface ExtraRepaymentsBreakdown {
  baseRepayment: number;
  enhancedRepayment: number;
  monthsSaved: number;
  yearsSaved: number;
  interestSaved: number;
  newPayoffYears: number;
}

export function calculateExtraRepayments(input: ExtraRepaymentsInput): CalcResult<ExtraRepaymentsBreakdown> {
  const { principal, annualRatePct, termYears, extraMonthlyAmount } = input;
  const fyYear = input.fyYear ?? CURRENT_FY;
  const baseMonthly = monthlyRepayment(principal, annualRatePct, termYears);
  const enhanced = baseMonthly + extraMonthlyAmount;
  const r = annualRatePct / 100 / 12;

  // Amortise with extra payments to find new payoff term.
  let balance = principal;
  let months = 0;
  let interestPaidEnhanced = 0;
  while (balance > 0.01 && months < 50 * 12) {
    const interest = balance * r;
    let payment = enhanced;
    if (payment > balance + interest) payment = balance + interest;
    interestPaidEnhanced += interest;
    balance = balance + interest - payment;
    months++;
  }
  const newPayoffYears = months / 12;
  const monthsSaved = termYears * 12 - months;
  const yearsSaved = monthsSaved / 12;
  const baseTotalInterest = baseMonthly * termYears * 12 - principal;
  const interestSaved = baseTotalInterest - interestPaidEnhanced;

  const result: ExtraRepaymentsBreakdown = {
    baseRepayment: round(baseMonthly, 2),
    enhancedRepayment: round(enhanced, 2),
    monthsSaved,
    yearsSaved: round(yearsSaved, 1),
    interestSaved: round(interestSaved),
    newPayoffYears: round(newPayoffYears, 1),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `Base monthly repayment $${round(baseMonthly, 2).toLocaleString()} at ${annualRatePct}% over ${termYears} years`,
      `Extra $${extraMonthlyAmount.toLocaleString()}/month added — loan paid off ${yearsSaved.toFixed(1)} years earlier`,
      "Assumes constant interest rate over the loan term",
      "Check your loan for redraw / extra repayment limits before relying on this result",
    ],
    sources: [
      { label: "ASIC MoneySmart — Extra repayments", url: "https://moneysmart.gov.au/home-loans/extra-mortgage-repayments-calculator", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
