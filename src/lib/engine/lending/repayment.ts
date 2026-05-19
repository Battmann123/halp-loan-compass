/**
 * Loan repayment calculator. Standard P&I amortisation + interest-only.
 * Frequency conversions (monthly / fortnightly / weekly) follow ASIC MoneySmart.
 *
 * Sources:
 *   • ASIC MoneySmart — Mortgage calculator methodology
 *   • RBA — Monetary Policy Decisions
 */

import type { FYYear, RepaymentFrequency, RepaymentType, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { round } from "../util";

export interface RepaymentInput {
  principal: number;
  annualRatePct: number;
  termYears: number;
  type?: RepaymentType;
  frequency?: RepaymentFrequency;
  fyYear?: FYYear;
}

export interface RepaymentBreakdown {
  repayment: number;
  totalRepayments: number;
  totalInterest: number;
  monthlyRepayment: number;
  numberOfPayments: number;
}

export function monthlyRepayment(principal: number, annualRatePct: number, termYears: number, type: RepaymentType = "principal-interest"): number {
  if (principal <= 0 || annualRatePct < 0 || termYears <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (type === "interest-only") return principal * r;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function calculateRepayment(input: RepaymentInput): CalcResult<RepaymentBreakdown> {
  const { principal, annualRatePct, termYears } = input;
  const type = input.type ?? "principal-interest";
  const frequency = input.frequency ?? "monthly";
  const fyYear = input.fyYear ?? CURRENT_FY;
  const mr = monthlyRepayment(principal, annualRatePct, termYears, type);
  const numPayments = termYears * (frequency === "weekly" ? 52 : frequency === "fortnightly" ? 26 : 12);
  let repayment: number;
  if (frequency === "monthly") repayment = mr;
  else if (frequency === "fortnightly") repayment = (mr * 12) / 26;
  else repayment = (mr * 12) / 52;

  const totalRepayments = repayment * numPayments;
  const totalInterest = type === "interest-only" ? totalRepayments : totalRepayments - principal;

  const result: RepaymentBreakdown = {
    repayment: round(repayment, 2),
    totalRepayments: round(totalRepayments),
    totalInterest: round(totalInterest),
    monthlyRepayment: round(mr, 2),
    numberOfPayments: numPayments,
  };

  return {
    result,
    breakdown: { ...result, frequency, type },
    assumptions: [
      `${type === "interest-only" ? "Interest-only" : "Principal & Interest"} at ${annualRatePct}% over ${termYears} years`,
      `Repayment frequency: ${frequency}`,
      "Result is indicative; actual lender repayment may include monthly fees",
    ],
    sources: [
      { label: "ASIC MoneySmart — Mortgage calculator", url: "https://moneysmart.gov.au/home-loans/mortgage-calculator", asOf: "2026-05-12" },
      { label: "RBA — Monetary Policy Decisions", url: "https://www.rba.gov.au/monetary-policy/int-rate-decisions/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
