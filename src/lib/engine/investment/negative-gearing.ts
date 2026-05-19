/**
 * Negative Gearing — quantifies the tax benefit of running an investment
 * property at a loss against other income.
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { calculateIncomeTax, getMarginalRate } from "../tax/brackets";
import { round } from "../util";

export interface NegativeGearingInput {
  annualSalary: number;
  annualRent: number;
  annualInterest: number;
  annualExpenses: number;
  annualDepreciation: number;
  fyYear?: FYYear;
}

export interface NegativeGearingBreakdown {
  preTaxLoss: number;
  marginalRate: number;
  taxShield: number;
  afterTaxLoss: number;
  taxWithoutProperty: number;
  taxWithProperty: number;
  weeklyAfterTaxCost: number;
}

export function calculateNegativeGearing(input: NegativeGearingInput): CalcResult<NegativeGearingBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const propertyOutcome = input.annualRent - input.annualInterest - input.annualExpenses - input.annualDepreciation;
  const preTaxLoss = -Math.min(0, propertyOutcome); // positive number representing loss
  const taxWithout = calculateIncomeTax(input.annualSalary, fyYear);
  const taxWith = calculateIncomeTax(input.annualSalary + propertyOutcome, fyYear);
  const taxShield = taxWithout - taxWith;
  const afterTaxLoss = preTaxLoss - taxShield;
  const marginalRate = getMarginalRate(input.annualSalary, fyYear);
  const weeklyAfterTaxCost = afterTaxLoss / 52;

  const result: NegativeGearingBreakdown = {
    preTaxLoss: round(preTaxLoss),
    marginalRate: round(marginalRate * 100, 1),
    taxShield: round(taxShield),
    afterTaxLoss: round(afterTaxLoss),
    taxWithoutProperty: round(taxWithout),
    taxWithProperty: round(taxWith),
    weeklyAfterTaxCost: round(weeklyAfterTaxCost, 2),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `FY${fyYear} ATO marginal rate ${(marginalRate * 100).toFixed(0)}% applied to net property loss`,
      "Tax shield is realised when the annual return is lodged — cash-flow gap exists during the year unless a PAYG variation is in place",
      "Property loss must be offset against ALL other Australian assessable income (salary, business, other rents)",
    ],
    sources: [
      { label: "ATO — Rental properties: deductions", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/residential-rental-properties", asOf: "2026-05-12" },
      { label: "Treasury Laws Amendment (Cost of Living Tax Cuts) Act 2024", url: "https://www.legislation.gov.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
