/**
 * Capital Gains Tax — on disposal of an investment property.
 * Applies the 12-month 50% discount for individuals (CGT discount).
 */

import type { FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { getMarginalRate, calculateIncomeTax } from "../tax/brackets";
import { round } from "../util";

export interface CGTInput {
  purchasePrice: number;
  /** Sum of acquisition costs (stamp duty, legal, agent at purchase). */
  acquisitionCosts: number;
  salePrice: number;
  /** Sum of disposal costs (agent commission, legal, marketing). */
  disposalCosts: number;
  /** Whether held for at least 12 months (eligible for 50% CGT discount). */
  heldMoreThan12Months: boolean;
  /** Whether the asset is the seller's main residence (PPR exempt). */
  isMainResidence: boolean;
  /** Other taxable income in year of sale — drives marginal rate. */
  taxableIncome: number;
  fyYear?: FYYear;
}

export interface CGTBreakdown {
  costBase: number;
  proceeds: number;
  grossGain: number;
  discount: number;
  taxableGain: number;
  marginalRate: number;
  cgtPayable: number;
}

export function calculateCGT(input: CGTInput): CalcResult<CGTBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const costBase = input.purchasePrice + input.acquisitionCosts;
  const proceeds = input.salePrice - input.disposalCosts;
  const grossGain = Math.max(0, proceeds - costBase);
  const discount = input.isMainResidence ? grossGain : (input.heldMoreThan12Months ? grossGain * 0.5 : 0);
  const taxableGain = input.isMainResidence ? 0 : grossGain - discount;

  // Marginal rate applied to (taxableIncome + taxableGain) gives the incremental CGT
  const taxNoGain = calculateIncomeTax(input.taxableIncome, fyYear);
  const taxWithGain = calculateIncomeTax(input.taxableIncome + taxableGain, fyYear);
  const cgtPayable = Math.max(0, taxWithGain - taxNoGain);
  const marginalRate = getMarginalRate(input.taxableIncome + taxableGain, fyYear);

  const result: CGTBreakdown = {
    costBase: round(costBase),
    proceeds: round(proceeds),
    grossGain: round(grossGain),
    discount: round(discount),
    taxableGain: round(taxableGain),
    marginalRate: round(marginalRate * 100, 1),
    cgtPayable: round(cgtPayable),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      input.isMainResidence ? "Main residence exemption applied — capital gain not taxable" : (input.heldMoreThan12Months ? "12-month 50% CGT discount applied" : "Held < 12 months — no CGT discount"),
      `FY${fyYear} ATO progressive tax applied incrementally to (other income + taxable gain)`,
      "Excludes any capital losses brought forward — reduces taxable gain dollar-for-dollar if present",
    ],
    sources: [
      { label: "ATO — Capital gains tax for property", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
