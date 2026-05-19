/**
 * Loan Serviceability — assesses whether a specific proposed loan can be serviced
 * by the borrower's actual financial position. Outputs PASS/FAIL plus the
 * standard ratios used by lenders.
 *
 * Audit fix B1: progressive ATO tax via calculateIncomeTax (was flat 25%).
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { calculateIncomeTax } from "../tax/brackets";
import { calculateMedicare } from "../tax/medicare";
import { monthlyRepayment } from "./repayment";
import { round } from "../util";

export interface ServiceabilityInput {
  grossAnnualIncome: number;
  partnerGrossIncome?: number;
  monthlyExpenses: number;
  monthlyDebts: number;
  dependents: number;
  proposedLoanAmount: number;
  proposedRatePct?: number;
  termYears?: number;
  fyYear?: FYYear;
}

export interface ServiceabilityBreakdown {
  pass: boolean;
  monthlyNetIncome: number;
  monthlyCommitments: number;
  proposedRepayment: number;
  monthlySurplus: number;
  surplusAfterRepayment: number;
  dsr: number;
  /** Net Surplus Ratio — common lender metric. */
  nsr: number;
}

const APRA_BUFFER = 3.0;

export function calculateServiceability(input: ServiceabilityInput): CalcResult<ServiceabilityBreakdown> {
  const grossSelf = input.grossAnnualIncome || 0;
  const grossPartner = input.partnerGrossIncome ?? 0;
  const fyYear = input.fyYear ?? CURRENT_FY;
  const actualRate = input.proposedRatePct ?? 6.5;
  const termYears = input.termYears ?? 30;

  const taxSelf = calculateIncomeTax(grossSelf, fyYear);
  const taxPartner = calculateIncomeTax(grossPartner, fyYear);
  const medicareSelf = calculateMedicare({ income: grossSelf, fyYear }).total;
  const medicarePartner = calculateMedicare({ income: grossPartner, fyYear }).total;
  const monthlyNetIncome = ((grossSelf - taxSelf - medicareSelf) + (grossPartner - taxPartner - medicarePartner)) / 12;

  const monthlyCommitments = input.monthlyExpenses + input.monthlyDebts + (input.dependents * 600);
  const monthlySurplus = Math.max(0, monthlyNetIncome - monthlyCommitments);
  const assessmentRatePct = actualRate + APRA_BUFFER;
  const proposedRepayment = monthlyRepayment(input.proposedLoanAmount, assessmentRatePct, termYears);

  const surplusAfterRepayment = monthlySurplus - proposedRepayment;
  const pass = surplusAfterRepayment > 0;
  const dsr = monthlyNetIncome > 0 ? (monthlyCommitments + proposedRepayment) / monthlyNetIncome : Infinity;
  const nsr = (monthlyCommitments + proposedRepayment) > 0 ? monthlyNetIncome / (monthlyCommitments + proposedRepayment) : 0;

  const result: ServiceabilityBreakdown = {
    pass,
    monthlyNetIncome: round(monthlyNetIncome, 2),
    monthlyCommitments: round(monthlyCommitments, 2),
    proposedRepayment: round(proposedRepayment, 2),
    monthlySurplus: round(monthlySurplus, 2),
    surplusAfterRepayment: round(surplusAfterRepayment, 2),
    dsr: round(dsr, 3),
    nsr: round(nsr, 2),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `FY${fyYear} ATO progressive tax + Medicare applied (audit fix B1)`,
      `APRA 3% buffer added to proposed rate ${actualRate}% → assessment ${assessmentRatePct}%`,
      pass ? "PASS: surplus remains after proposed loan repayment" : "FAIL: insufficient surplus to service proposed loan at APRA buffered rate",
      "Lenders apply additional buffers for variable expenses, credit card limits, and HELP debt — this is an indicative pre-screen only",
    ],
    sources: [
      { label: "ASIC RG 209 — Responsible lending conduct", url: "https://asic.gov.au/regulatory-resources/", asOf: "2026-05-12" },
      { label: "APRA APG 223 — Residential mortgage lending", url: "https://www.apra.gov.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
