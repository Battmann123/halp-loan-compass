/**
 * Investment Property Calculator — yield, cash flow, capital growth, "Who Pays?" breakdown.
 * Returns first-year and 10-year projections plus the PIA-style three-way attribution
 * (investor / tenant / taxman) that the Phase 4 PIA suite will build on.
 *
 * Uses progressive ATO tax via calculateIncomeTax (audit fix B1 baseline).
 *
 * Sources: ATO Rental Properties guide; PIPA investor benchmarks.
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { calculateIncomeTax, getMarginalRate } from "../tax/brackets";
import { monthlyRepayment } from "../lending/repayment";
import { round } from "../util";

export interface InvestmentPropertyInput {
  purchasePrice: number;
  deposit: number;
  loanRatePct: number;
  loanTermYears: number;
  interestOnly?: boolean;
  weeklyRent: number;
  annualGrowthPct: number;
  /** Annual non-interest expenses (rates, strata, management, insurance, maintenance). */
  annualExpenses: number;
  vacancyWeeks?: number;
  annualSalary: number;
  /** Optional annual depreciation deduction (from Depreciation calc). */
  annualDepreciation?: number;
  fyYear?: FYYear;
}

export interface InvestmentPropertyBreakdown {
  loanAmount: number;
  grossYield: number;
  netYield: number;
  annualRent: number;
  annualInterest: number;
  annualCashFlow: number;
  annualTaxSaving: number;
  afterTaxCashFlow: number;
  projectedValueYear10: number;
  capitalGainYear10: number;
  totalReturnYear10: number;
  /** Who Pays? — share of annual holding cost (PIA signature breakdown). */
  whoPaysInvestor: number;
  whoPaysTenant: number;
  whoPaysTaxman: number;
}

export function calculateInvestmentProperty(input: InvestmentPropertyInput): CalcResult<InvestmentPropertyBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const loanAmount = Math.max(0, input.purchasePrice - input.deposit);
  const repayment = monthlyRepayment(loanAmount, input.loanRatePct, input.loanTermYears, input.interestOnly ? "interest-only" : "principal-interest");
  const annualRepayment = repayment * 12;

  const vacancy = input.vacancyWeeks ?? 2;
  const annualRent = input.weeklyRent * (52 - vacancy);
  const grossYield = (input.purchasePrice > 0) ? annualRent / input.purchasePrice : 0;

  // Interest-only portion of repayment (simplified — first-year approximation for P&I)
  const annualInterest = input.interestOnly
    ? annualRepayment
    : loanAmount * (input.loanRatePct / 100); // year-1 approx for P&I

  const annualDepreciation = input.annualDepreciation ?? 0;
  const expenses = input.annualExpenses;
  const annualCashFlow = annualRent - annualRepayment - expenses;
  const netYield = (input.purchasePrice > 0) ? (annualRent - expenses) / input.purchasePrice : 0;

  // Tax shield: deductible loss = -(rent - interest - expenses - depreciation)
  const taxableIncomeWithoutProperty = input.annualSalary;
  const propertyTaxableOutcome = annualRent - annualInterest - expenses - annualDepreciation;
  const taxableIncomeWithProperty = taxableIncomeWithoutProperty + propertyTaxableOutcome;
  const taxWithout = calculateIncomeTax(taxableIncomeWithoutProperty, fyYear);
  const taxWith = calculateIncomeTax(taxableIncomeWithProperty, fyYear);
  const annualTaxSaving = taxWithout - taxWith;
  const afterTaxCashFlow = annualCashFlow + annualTaxSaving;

  // 10-year capital growth (compounded annually)
  const projectedValueYear10 = input.purchasePrice * Math.pow(1 + input.annualGrowthPct / 100, 10);
  const capitalGainYear10 = projectedValueYear10 - input.purchasePrice;
  // Cumulative after-tax cash flow over 10 years (using year-1 figure, simplified)
  const totalReturnYear10 = capitalGainYear10 + afterTaxCashFlow * 10;

  // Who Pays? attribution (PIA signature) — annual holding-cost split.
  // Total holding cost = interest + expenses
  const totalHolding = annualInterest + expenses;
  const whoPaysTenant = Math.min(totalHolding, annualRent);
  const whoPaysTaxman = Math.max(0, annualTaxSaving);
  const whoPaysInvestor = Math.max(0, totalHolding - whoPaysTenant - whoPaysTaxman);

  const result: InvestmentPropertyBreakdown = {
    loanAmount: round(loanAmount),
    grossYield: round(grossYield * 100, 2),
    netYield: round(netYield * 100, 2),
    annualRent: round(annualRent),
    annualInterest: round(annualInterest),
    annualCashFlow: round(annualCashFlow),
    annualTaxSaving: round(annualTaxSaving),
    afterTaxCashFlow: round(afterTaxCashFlow),
    projectedValueYear10: round(projectedValueYear10),
    capitalGainYear10: round(capitalGainYear10),
    totalReturnYear10: round(totalReturnYear10),
    whoPaysInvestor: round(whoPaysInvestor),
    whoPaysTenant: round(whoPaysTenant),
    whoPaysTaxman: round(whoPaysTaxman),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `FY${fyYear} ATO progressive tax brackets applied to investor's marginal income`,
      `Vacancy allowance ${vacancy} weeks per year (annual rent based on ${52 - vacancy} weeks)`,
      `Capital growth ${input.annualGrowthPct}% compounded annually over 10-year projection`,
      input.interestOnly ? "Interest-only loan — repayment treated as 100% interest" : "P&I loan — year-one interest approximated; later years drift lower as principal pays down",
      annualDepreciation > 0 ? `Annual depreciation deduction $${annualDepreciation.toLocaleString()} included in tax shield` : "No depreciation supplied — tax shield understates investor benefit if property is new",
    ],
    sources: [
      { label: "ATO — Rental properties guide", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/residential-rental-properties", asOf: "2026-05-12" },
      { label: "PIPA — Property Investment Professionals of Australia", url: "https://pipa.asn.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
