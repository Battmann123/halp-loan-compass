/**
 * Australian land tax — 8 states. NEW in Phase 2 (was missing from Lovable repo).
 *
 * Land tax is levied annually by each state revenue office on the unimproved
 * land value (UCV) of investment / non-PPR property. Each state has its own
 * threshold and scale; rules for trusts, companies, and foreign owners differ.
 *
 * This module implements the FY2025-26 individual-owner scales with a foreign
 * owner surcharge layered on top. PPR (principal place of residence) is exempt
 * in every state.
 *
 * Note: NT does not levy land tax — it is the only Australian jurisdiction
 * without one. Strong SEO angle ("the no-land-tax state").
 *
 * Sources: each state's revenue office land tax schedule.
 */

import type { AusState, FYYear, CalcResult, Source } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { round } from "../util";

export type LandOwnerType = "individual" | "company" | "trust";

export interface LandTaxInput {
  /** Unimproved capital value of the land. */
  landValue: number;
  state: AusState;
  /** Whether the land is the owner's principal place of residence (exempt). */
  isPpr?: boolean;
  ownerType?: LandOwnerType;
  foreignOwner?: boolean;
  fyYear?: FYYear;
}

export interface LandTaxBreakdown {
  baseTax: number;
  foreignSurcharge: number;
  total: number;
  thresholdApplied: number;
  rateApplied: string;
}

const SOURCES: Record<AusState, Source> = {
  NSW: { label: "Revenue NSW — Land Tax", url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/land-tax", asOf: "2026-05-12" },
  VIC: { label: "State Revenue Office Victoria — Land Tax", url: "https://www.sro.vic.gov.au/land-tax", asOf: "2026-05-12" },
  QLD: { label: "Queensland Revenue Office — Land Tax", url: "https://qro.qld.gov.au/land-tax/", asOf: "2026-05-12" },
  SA:  { label: "RevenueSA — Land Tax", url: "https://www.revenuesa.sa.gov.au/land-tax", asOf: "2026-05-12" },
  WA:  { label: "WA Department of Finance — Land Tax", url: "https://www.wa.gov.au/organisation/department-of-finance/land-tax", asOf: "2026-05-12" },
  TAS: { label: "State Revenue Office Tasmania — Land Tax", url: "https://www.sro.tas.gov.au/property-land-taxes/land-tax", asOf: "2026-05-12" },
  NT:  { label: "NT — no land tax applies", url: "https://treasury.nt.gov.au/dtf/territory-revenue-office", asOf: "2026-05-12" },
  ACT: { label: "ACT Revenue Office — Land Tax", url: "https://www.revenue.act.gov.au/land-tax", asOf: "2026-05-12" },
};

/** Foreign owner land tax surcharge rates (FY2025-26). */
const FOREIGN_SURCHARGE: Record<AusState, number> = {
  NSW: 0.05, // 5% surcharge land tax
  VIC: 0.04, // absentee owner surcharge
  QLD: 0.02, // foreign owner surcharge
  SA:  0.07, // foreign owner surcharge
  WA:  0.07, // foreign owner surcharge
  TAS: 0.015, // foreign investor land tax surcharge
  ACT: 0.0075,
  NT:  0,
};

export function calculateLandTax(input: LandTaxInput): CalcResult<LandTaxBreakdown> {
  const { landValue, state, isPpr = false, foreignOwner = false } = input;
  const fyYear = input.fyYear ?? CURRENT_FY;
  const assumptions: string[] = [`FY${fyYear} thresholds applied`];

  if (state === "NT") {
    assumptions.push("Northern Territory does not levy land tax (only Australian jurisdiction without one)");
    return finalise(0, 0, 0, "Nil — no land tax in NT", state, fyYear, assumptions);
  }
  if (isPpr) {
    assumptions.push("Principal place of residence is exempt from land tax in every Australian state");
    return finalise(0, 0, 0, "Nil — PPR exempt", state, fyYear, assumptions);
  }
  if (landValue <= 0) {
    return finalise(0, 0, 0, "Nil — no land value", state, fyYear, assumptions);
  }

  let baseTax = 0;
  let threshold = 0;
  let rateApplied = "";

  switch (state) {
    case "NSW": {
      threshold = 1075000; // general threshold FY2025-26
      if (landValue <= threshold) { rateApplied = "Nil — below $1,075,000 threshold"; break; }
      const premiumThreshold = 6571000;
      if (landValue <= premiumThreshold) {
        baseTax = 100 + (landValue - threshold) * 0.016;
        rateApplied = "$100 + 1.6% of value above $1,075,000";
      } else {
        baseTax = 88150 + (landValue - premiumThreshold) * 0.02;
        rateApplied = "$88,150 + 2.0% of value above $6,571,000 (premium tier)";
      }
      break;
    }
    case "VIC": {
      threshold = 50000;
      if (landValue < threshold) { rateApplied = "Nil — below $50,000 threshold"; break; }
      if (landValue < 100000) { baseTax = 500; rateApplied = "$500 flat (TFT $50k–$100k)"; }
      else if (landValue < 300000) { baseTax = 975; rateApplied = "$975 flat ($100k–$300k)"; }
      else if (landValue < 600000) { baseTax = 1350 + (landValue - 300000) * 0.003; rateApplied = "$1,350 + 0.3% over $300k"; }
      else if (landValue < 1000000) { baseTax = 2250 + (landValue - 600000) * 0.006; rateApplied = "$2,250 + 0.6% over $600k"; }
      else if (landValue < 1800000) { baseTax = 4650 + (landValue - 1000000) * 0.009; rateApplied = "$4,650 + 0.9% over $1M"; }
      else if (landValue < 3000000) { baseTax = 11850 + (landValue - 1800000) * 0.0165; rateApplied = "$11,850 + 1.65% over $1.8M"; }
      else { baseTax = 31650 + (landValue - 3000000) * 0.0265; rateApplied = "$31,650 + 2.65% over $3M"; }
      break;
    }
    case "QLD": {
      threshold = 600000;
      if (landValue <= threshold) { rateApplied = "Nil — below $600,000 individual threshold"; break; }
      if (landValue < 1000000) { baseTax = 500 + (landValue - 600000) * 0.01; rateApplied = "$500 + 1.0% over $600k"; }
      else if (landValue < 3000000) { baseTax = 4500 + (landValue - 1000000) * 0.0165; rateApplied = "$4,500 + 1.65% over $1M"; }
      else if (landValue < 5000000) { baseTax = 37500 + (landValue - 3000000) * 0.0125; rateApplied = "$37,500 + 1.25% over $3M"; }
      else if (landValue < 10000000) { baseTax = 62500 + (landValue - 5000000) * 0.0175; rateApplied = "$62,500 + 1.75% over $5M"; }
      else { baseTax = 150000 + (landValue - 10000000) * 0.0225; rateApplied = "$150,000 + 2.25% over $10M"; }
      break;
    }
    case "SA": {
      threshold = 755000;
      if (landValue <= threshold) { rateApplied = "Nil — below $755,000 threshold"; break; }
      if (landValue < 1098000) { baseTax = (landValue - 755000) * 0.005; rateApplied = "0.5% over $755k"; }
      else if (landValue < 1672000) { baseTax = 1715 + (landValue - 1098000) * 0.0125; rateApplied = "$1,715 + 1.25% over $1.098M"; }
      else if (landValue < 2547000) { baseTax = 8890 + (landValue - 1672000) * 0.02; rateApplied = "$8,890 + 2.0% over $1.672M"; }
      else { baseTax = 26390 + (landValue - 2547000) * 0.024; rateApplied = "$26,390 + 2.4% over $2.547M"; }
      break;
    }
    case "WA": {
      threshold = 300000;
      if (landValue <= threshold) { rateApplied = "Nil — below $300,000 threshold"; break; }
      if (landValue < 420000) { baseTax = (landValue - 300000) * 0.0025; rateApplied = "0.25% over $300k"; }
      else if (landValue < 1000000) { baseTax = 300 + (landValue - 420000) * 0.009; rateApplied = "$300 + 0.9% over $420k"; }
      else if (landValue < 1800000) { baseTax = 5520 + (landValue - 1000000) * 0.018; rateApplied = "$5,520 + 1.8% over $1M"; }
      else if (landValue < 5000000) { baseTax = 19920 + (landValue - 1800000) * 0.02; rateApplied = "$19,920 + 2.0% over $1.8M"; }
      else if (landValue < 11000000) { baseTax = 83920 + (landValue - 5000000) * 0.024; rateApplied = "$83,920 + 2.4% over $5M"; }
      else { baseTax = 227920 + (landValue - 11000000) * 0.0267; rateApplied = "$227,920 + 2.67% over $11M"; }
      break;
    }
    case "TAS": {
      threshold = 100000;
      if (landValue <= threshold) { rateApplied = "Nil — below $100,000 threshold"; break; }
      if (landValue < 499999) { baseTax = (landValue - 100000) * 0.0055; rateApplied = "0.55% over $100k"; }
      else { baseTax = 2200 + (landValue - 500000) * 0.015; rateApplied = "$2,200 + 1.5% over $500k"; }
      break;
    }
    case "ACT": {
      // ACT charges land tax on all rented properties regardless of value, no threshold.
      // Marginal rate scale applied to AUV (avg unimproved value).
      threshold = 0;
      if (landValue < 150000) { baseTax = landValue * 0.0054; rateApplied = "0.54% on AUV"; }
      else if (landValue < 275000) { baseTax = 810 + (landValue - 150000) * 0.0062; rateApplied = "$810 + 0.62% over $150k"; }
      else if (landValue < 2000000) { baseTax = 1585 + (landValue - 275000) * 0.011; rateApplied = "$1,585 + 1.10% over $275k"; }
      else { baseTax = 20560 + (landValue - 2000000) * 0.0114; rateApplied = "$20,560 + 1.14% over $2M"; }
      assumptions.push("ACT levies land tax on all rented residential property — no general threshold");
      break;
    }
  }

  let foreignSurcharge = 0;
  if (foreignOwner && FOREIGN_SURCHARGE[state] > 0) {
    foreignSurcharge = landValue * FOREIGN_SURCHARGE[state];
    assumptions.push(`Foreign owner surcharge applied at ${(FOREIGN_SURCHARGE[state] * 100).toFixed(1)}% of land value`);
  } else if (foreignOwner) {
    assumptions.push(`${state} does not levy a foreign owner land tax surcharge`);
  }

  return finalise(baseTax, foreignSurcharge, threshold, rateApplied, state, fyYear, assumptions);
}

function finalise(baseTax: number, foreignSurcharge: number, threshold: number, rateApplied: string, state: AusState, fyYear: FYYear, assumptions: string[]): CalcResult<LandTaxBreakdown> {
  const result: LandTaxBreakdown = {
    baseTax: round(baseTax),
    foreignSurcharge: round(foreignSurcharge),
    total: round(baseTax + foreignSurcharge),
    thresholdApplied: threshold,
    rateApplied,
  };
  return {
    result,
    breakdown: { ...result, state },
    assumptions,
    sources: [SOURCES[state]],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
