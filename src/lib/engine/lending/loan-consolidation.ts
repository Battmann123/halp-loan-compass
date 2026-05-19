/**
 * Loan Consolidation — combine multiple debts into a single loan and see the
 * after-tax cost. NEW for Phase 2 (from the HALP PIA spec — investor-grade
 * primitive that surfaces debt-recycling intent without going full PIA).
 *
 * Source: ATO debt recycling / debt deductibility guidance.
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { monthlyRepayment } from "./repayment";
import { getMarginalRate } from "../tax/brackets";
import { round } from "../util";

export interface ExistingLoan {
  label: string;
  balance: number;
  ratePct: number;
  /** Whether interest on this debt is currently tax-deductible (e.g. investment loan). */
  deductible: boolean;
}

export interface LoanConsolidationInput {
  loans: ExistingLoan[];
  newConsolidatedRatePct: number;
  newTermYears: number;
  /** Taxable income — used to compute the marginal rate for the deductible-interest tax shield. */
  taxableIncome: number;
  fyYear?: FYYear;
}

export interface LoanConsolidationBreakdown {
  combinedBalance: number;
  preCombinedMonthly: number;
  newMonthlyRepayment: number;
  monthlySaving: number;
  annualSaving: number;
  /** Annual tax shield from the deductible-interest portion (pre vs post). */
  taxShieldChange: number;
  /** After-tax monthly cost (pre vs post). */
  afterTaxMonthlySaving: number;
}

export function calculateLoanConsolidation(input: LoanConsolidationInput): CalcResult<LoanConsolidationBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const marginalRate = getMarginalRate(input.taxableIncome, fyYear);

  let combinedBalance = 0;
  let preCombinedMonthly = 0;
  let preDeductibleAnnualInterest = 0;

  for (const loan of input.loans) {
    combinedBalance += loan.balance;
    const monthly = monthlyRepayment(loan.balance, loan.ratePct, input.newTermYears);
    preCombinedMonthly += monthly;
    const annualInterest = loan.balance * (loan.ratePct / 100);
    if (loan.deductible) preDeductibleAnnualInterest += annualInterest;
  }

  const newMonthlyRepayment = monthlyRepayment(combinedBalance, input.newConsolidatedRatePct, input.newTermYears);
  const monthlySaving = preCombinedMonthly - newMonthlyRepayment;
  const annualSaving = monthlySaving * 12;

  // Post-consolidation — deductibility status is the proportion of original deductible balance
  const totalBalance = combinedBalance || 1;
  const postDeductibleBalance = input.loans.filter(l => l.deductible).reduce((s, l) => s + l.balance, 0);
  const postDeductibleProportion = postDeductibleBalance / totalBalance;
  const postDeductibleAnnualInterest = combinedBalance * (input.newConsolidatedRatePct / 100) * postDeductibleProportion;

  const preShield = preDeductibleAnnualInterest * marginalRate;
  const postShield = postDeductibleAnnualInterest * marginalRate;
  const taxShieldChange = postShield - preShield;
  const afterTaxAnnualSaving = annualSaving + taxShieldChange;
  const afterTaxMonthlySaving = afterTaxAnnualSaving / 12;

  const result: LoanConsolidationBreakdown = {
    combinedBalance: round(combinedBalance),
    preCombinedMonthly: round(preCombinedMonthly, 2),
    newMonthlyRepayment: round(newMonthlyRepayment, 2),
    monthlySaving: round(monthlySaving, 2),
    annualSaving: round(annualSaving),
    taxShieldChange: round(taxShieldChange),
    afterTaxMonthlySaving: round(afterTaxMonthlySaving, 2),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `${input.loans.length} existing loans combined into one at ${input.newConsolidatedRatePct}% over ${input.newTermYears} years`,
      `Marginal tax rate ${(marginalRate * 100).toFixed(0)}% applied to deductible interest (taxable income $${input.taxableIncome.toLocaleString()}, FY${fyYear})`,
      "Tax shield change reflects the difference in deductible interest pre vs post consolidation",
      "Consolidating non-deductible (home loan) and deductible (investment) debt can REDUCE the tax shield — see a tax agent before acting",
      "Debt recycling strategies require splitting structures, not simple consolidation — Phase 4 HALP PIA covers this in detail",
    ],
    sources: [
      { label: "ATO — Rental properties: interest deductibility", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/residential-rental-properties", asOf: "2026-05-12" },
      { label: "ATO — Debt deductibility guide", url: "https://www.ato.gov.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
