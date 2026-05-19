/**
 * Depreciation — Division 43 (capital works, 2.5%/yr over 40 yrs for residential)
 * and Division 40 (plant & equipment).
 *
 * Audit fix B2: takes the investor's taxable income and uses getMarginalRate(),
 * not the Lovable repo's hardcoded 37%.
 *
 * Post-9-May-2017 rule: P&E in second-hand residential property is NOT deductible
 * for the buyer — only Div 43 (capital works) applies. The `purchasedNew` flag
 * captures this.
 *
 * Sources: ATO — Rental Properties guide (Div 40 / Div 43).
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { getMarginalRate } from "../tax/brackets";
import { round } from "../util";

export interface DepreciationInput {
  purchasePrice: number;
  /** Estimated building value (excludes land — usually 50–70% of price for new builds). */
  buildingValue: number;
  /** Estimated plant & equipment value (carpets, blinds, white goods, etc.). */
  plantEquipmentValue: number;
  /** Property build year — determines Div 43 eligibility (must be built after 18 Jul 1985 for residential). */
  buildYear: number;
  /** Whether the investor purchased the property new (Div 40 eligibility post-2017). */
  purchasedNew: boolean;
  /** Investor's taxable income — drives marginal rate (audit fix B2). */
  taxableIncome: number;
  fyYear?: FYYear;
}

export interface DepreciationBreakdown {
  capitalWorksAnnual: number;
  plantEquipmentAnnual: number;
  totalFirstYear: number;
  /** 10-year cumulative (P&E declines faster — approximated as 50% of straight-line). */
  totalTenYear: number;
  /** Tax benefit using investor's marginal rate (audit fix B2). */
  firstYearTaxBenefit: number;
  tenYearTaxBenefit: number;
  marginalRate: number;
  div43Eligible: boolean;
  div40Eligible: boolean;
}

const RESIDENTIAL_DIV43_RATE = 0.025; // 2.5% over 40 years for residential
const RESIDENTIAL_DIV43_ELIGIBILITY_YEAR = 1985; // built after 18 July 1985

export function calculateDepreciation(input: DepreciationInput): CalcResult<DepreciationBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const div43Eligible = input.buildYear >= RESIDENTIAL_DIV43_ELIGIBILITY_YEAR;
  const div40Eligible = input.purchasedNew; // post-2017 rule: only deductible if purchased new

  const capitalWorksAnnual = div43Eligible ? input.buildingValue * RESIDENTIAL_DIV43_RATE : 0;
  // P&E declines under diminishing-value method; first-year ~ value × effective_life_factor.
  // Approximate as 0.20 × value for typical 5-yr-effective-life items.
  const plantEquipmentAnnual = div40Eligible ? input.plantEquipmentValue * 0.20 : 0;

  const totalFirstYear = capitalWorksAnnual + plantEquipmentAnnual;
  // Cap works flat 10 yrs; P&E approximate cumulative ~ 65% of (10 × straight-line)
  const totalTenYear = (capitalWorksAnnual * 10) + (plantEquipmentAnnual * 5);

  const marginalRate = getMarginalRate(input.taxableIncome, fyYear);
  const firstYearTaxBenefit = totalFirstYear * marginalRate;
  const tenYearTaxBenefit = totalTenYear * marginalRate;

  const result: DepreciationBreakdown = {
    capitalWorksAnnual: round(capitalWorksAnnual),
    plantEquipmentAnnual: round(plantEquipmentAnnual),
    totalFirstYear: round(totalFirstYear),
    totalTenYear: round(totalTenYear),
    firstYearTaxBenefit: round(firstYearTaxBenefit),
    tenYearTaxBenefit: round(tenYearTaxBenefit),
    marginalRate: round(marginalRate * 100, 1),
    div43Eligible,
    div40Eligible,
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      `FY${fyYear} marginal rate ${(marginalRate * 100).toFixed(0)}% applied (audit fix B2 — was hardcoded 37%)`,
      div43Eligible ? "Div 43 capital works deduction applied at 2.5%/yr over 40 yrs (residential)" : "No Div 43 — building predates 18 Jul 1985 eligibility",
      div40Eligible ? "Div 40 plant & equipment deduction applied (purchased new)" : "No Div 40 — purchased second-hand. Post-9-May-2017 rule disallows P&E for second-hand residential",
      "P&E figures use a simplified 20% diminishing-value approximation — a Quantity Surveyor's schedule is required for ATO-lodgement-grade numbers",
    ],
    sources: [
      { label: "ATO — Rental properties (Div 40 / Div 43)", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/residential-rental-properties", asOf: "2026-05-12" },
      { label: "Treasury Laws Amendment (Housing Tax Integrity) Act 2018 — post-2017 P&E rule", url: "https://www.legislation.gov.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
