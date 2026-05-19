/**
 * Borrowing Power — APRA-compliant serviceability assessment.
 *
 * Audit fix B1: uses progressive ATO tax brackets via calculateIncomeTax
 * (Lovable repo used a flat 25% effective tax — incorrect).
 * Audit fix B7: enforces APRA's high-DTI cap (Feb 2026) by flagging when
 * DTI ≥ 6.0x and warning the user that 80% of new lending must be below 6.0x.
 *
 * Sources:
 *   • ATO — Individual income tax rates
 *   • APRA APG 223 — Residential mortgage lending
 *   • APRA — High-DTI macroprudential cap (effective 1 Feb 2026)
 *   • Melbourne Institute — HEM (Household Expenditure Measure) Q1 2026
 *   • ASIC RG 209 — Responsible Lending Conduct
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { calculateIncomeTax } from "../tax/brackets";
import { calculateMedicare } from "../tax/medicare";
import { round } from "../util";

export interface BorrowingPowerInput {
  grossAnnualIncome: number;
  partnerGrossIncome?: number;
  monthlyExpenses: number;
  monthlyDebts: number;
  dependents: number;
  /** Actual interest rate the borrower would receive (decimal pct). */
  actualRatePct?: number;
  termYears?: number;
  isFirstHomeBuyer?: boolean;
  fyYear?: FYYear;
  hasPrivateHealth?: boolean;
  isFamily?: boolean;
}

export interface BorrowingPowerBreakdown {
  maxLoan: number;
  monthlySurplus: number;
  monthlyAfterTaxIncome: number;
  monthlyOutgoings: number;
  dti: number;
  highDtiFlag: boolean;
  assessmentRatePct: number;
}

/** APRA mandates +3% buffer applied to the actual interest rate (APG 223). */
const APRA_BUFFER = 3.0;

/** HEM Q1 2026 proxy floor — $ per dependent per month. Lender-specific HEM tables vary. */
const HEM_PER_DEPENDENT_MONTHLY = 600;

/** APRA macroprudential high-DTI threshold (effective 1 Feb 2026). */
const HIGH_DTI_THRESHOLD = 6.0;

export function calculateBorrowingPower(input: BorrowingPowerInput): CalcResult<BorrowingPowerBreakdown> {
  const grossSelf = input.grossAnnualIncome || 0;
  const grossPartner = input.partnerGrossIncome ?? 0;
  const fyYear = input.fyYear ?? CURRENT_FY;
  const actualRate = input.actualRatePct ?? 6.5;
  const termYears = input.termYears ?? 30;

  // Progressive ATO income tax — audit fix B1 (Lovable used flat 25%)
  const taxSelf = calculateIncomeTax(grossSelf, fyYear);
  const taxPartner = calculateIncomeTax(grossPartner, fyYear);
  const medicareSelf = calculateMedicare({ income: grossSelf, fyYear, isFamily: input.isFamily, hasPrivateHealth: input.hasPrivateHealth }).total;
  const medicarePartner = calculateMedicare({ income: grossPartner, fyYear, isFamily: input.isFamily, hasPrivateHealth: input.hasPrivateHealth }).total;
  const netAnnual = (grossSelf - taxSelf - medicareSelf) + (grossPartner - taxPartner - medicarePartner);
  const monthlyAfterTaxIncome = netAnnual / 12;

  // HEM-style floor for dependents (lenders use lender-specific HEM tables — this is a proxy)
  const dependentExpense = (input.dependents || 0) * HEM_PER_DEPENDENT_MONTHLY;
  const monthlyOutgoings = (input.monthlyExpenses || 0) + (input.monthlyDebts || 0) + dependentExpense;
  const monthlySurplus = Math.max(0, monthlyAfterTaxIncome - monthlyOutgoings);

  // APRA serviceability buffer — actual rate + 3%
  const assessmentRatePct = actualRate + APRA_BUFFER;
  const r = assessmentRatePct / 100 / 12;
  const n = termYears * 12;
  let maxLoan = 0;
  if (monthlySurplus > 0 && r > 0) {
    maxLoan = (monthlySurplus * (1 - Math.pow(1 + r, -n))) / r;
  }

  const gross = grossSelf + grossPartner;
  const dti = gross > 0 ? maxLoan / gross : 0;
  const highDtiFlag = dti >= HIGH_DTI_THRESHOLD;

  // High-DTI cap: APRA restricts ADIs to ≤20% of new mortgages at DTI ≥ 6.0x.
  // Engine doesn't reduce the calculated max (that's a lender call) but flags it.

  const result: BorrowingPowerBreakdown = {
    maxLoan: round(maxLoan),
    monthlySurplus: round(monthlySurplus, 2),
    monthlyAfterTaxIncome: round(monthlyAfterTaxIncome, 2),
    monthlyOutgoings: round(monthlyOutgoings, 2),
    dti: round(dti, 2),
    highDtiFlag,
    assessmentRatePct: round(assessmentRatePct, 2),
  };

  const assumptions = [
    `FY${fyYear} ATO progressive tax brackets applied to income (audit fix B1)`,
    `APRA 3% serviceability buffer added to actual rate ${actualRate}% → ${assessmentRatePct}%`,
    `HEM proxy: $${HEM_PER_DEPENDENT_MONTHLY}/month per dependent (lender-specific HEM tables vary)`,
    `Loan term ${termYears} years`,
  ];
  if (highDtiFlag) {
    assumptions.push(`⚠ High-DTI flag: projected DTI of ${dti.toFixed(2)}x ≥ APRA's 6.0x cap. ADIs are restricted to ≤20% of new lending in this band (effective 1 Feb 2026). Loan may route to non-bank lender or require larger deposit.`);
  }

  return {
    result,
    breakdown: { ...result },
    assumptions,
    sources: [
      { label: "ATO — Individual income tax rates", url: "https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents", asOf: "2026-05-12" },
      { label: "APRA APG 223 — Residential mortgage lending", url: "https://www.apra.gov.au/", asOf: "2026-05-12" },
      { label: "APRA — High-DTI macroprudential cap (Feb 2026)", url: "https://www.apra.gov.au/news-and-publications", asOf: "2026-05-12" },
      { label: "Melbourne Institute — HEM Q1 2026", url: "https://melbourneinstitute.unimelb.edu.au/", asOf: "2026-05-12" },
      { label: "ASIC RG 209 — Responsible lending conduct", url: "https://asic.gov.au/regulatory-resources/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
