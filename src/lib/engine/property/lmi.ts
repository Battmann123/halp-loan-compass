/**
 * Lenders Mortgage Insurance.
 *
 * LMI is required when LVR > 80%. Premium varies by LVR tier and loan size.
 * Tables here approximate Helia / QBE / Arch indicative rate cards (FY2025-26);
 * lender-specific figures vary by ±0.1–0.3%. Always disclosed as indicative
 * in the calculator UI.
 *
 * Stamp duty on the LMI premium varies by state. Audit fix B5: NSW levies
 * 9% insurance duty on most general insurance including LMI; the Lovable repo
 * hardcoded NSW at 0 which was incorrect.
 *
 * Note: every borrower using the federal 5% Deposit Scheme avoids LMI entirely
 * (the federal guarantee replaces it). The Government Grants calculator
 * surfaces that branch separately.
 *
 * Sources:
 *   • Helia LMI rate card (FY2025-26)
 *   • QBE LMI rate card (FY2025-26)
 *   • State revenue offices — duty on insurance premiums
 */

import type { AusState, FYYear, OccupancyType, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { round } from "../util";

export interface LmiInput {
  loanAmount: number;
  propertyValue: number;
  isFirstHomeBuyer: boolean;
  occupancy: OccupancyType;
  state: AusState;
  fyYear?: FYYear;
}

export interface LmiBreakdown {
  required: boolean;
  premium: number;
  stampDutyOnLmi: number;
  total: number;
  rate: number;
  lvr: number;
}

/** State stamp duty on LMI premium (FY2025-26). Audit fix B5 — NSW corrected from 0 to 9%. */
const STAMP_DUTY_ON_LMI: Record<AusState, number> = {
  NSW: 0.09,  // audit fix B5 — NSW levies 9% general insurance duty including LMI
  VIC: 0.10,
  QLD: 0.09,
  SA:  0.11,
  WA:  0.10,
  TAS: 0.10,
  NT:  0.10,
  ACT: 0,
};

export function calculateLmi(input: LmiInput): CalcResult<LmiBreakdown> {
  const { loanAmount, propertyValue, isFirstHomeBuyer, occupancy, state } = input;
  const fyYear = input.fyYear ?? CURRENT_FY;
  if (propertyValue <= 0 || loanAmount <= 0) {
    return blank(state, fyYear);
  }
  const lvr = (loanAmount / propertyValue) * 100;
  if (lvr <= 80) {
    const r: LmiBreakdown = { required: false, premium: 0, stampDutyOnLmi: 0, total: 0, rate: 0, lvr };
    return {
      result: r,
      breakdown: { ...r },
      assumptions: ["LVR ≤ 80% — LMI not required"],
      sources: [{ label: "ASIC MoneySmart — LMI overview", url: "https://moneysmart.gov.au/home-loans/lenders-mortgage-insurance", asOf: "2026-05-12" }],
      lastUpdated: LAST_UPDATED,
      engineVersion: ENGINE_VERSION,
      fyYear,
    };
  }

  const isLow = loanAmount <= 300000;
  const isMid = loanAmount > 300000 && loanAmount <= 600000;
  const isHigh = loanAmount > 600000 && loanAmount <= 1000000;
  const pick = (a: number, b: number, c: number, d: number) =>
    isLow ? a : isMid ? b : isHigh ? c : d;

  let rate = 0;
  if (lvr <= 82) rate = pick(0.0053, 0.0056, 0.0077, 0.0089);
  else if (lvr <= 84) rate = pick(0.0065, 0.0084, 0.0108, 0.011);
  else if (lvr <= 85) rate = pick(0.0086, 0.0106, 0.0134, 0.0134);
  else if (lvr <= 86) rate = pick(0.0089, 0.0107, 0.0134, 0.0139);
  else if (lvr <= 87) rate = pick(0.0103, 0.0127, 0.0155, 0.0155);
  else if (lvr <= 88) rate = pick(0.0103, 0.0127, 0.016, 0.0179);
  else if (lvr <= 89) rate = pick(0.013, 0.0171, 0.0215, 0.0227);
  else if (lvr <= 90) rate = pick(0.0156, 0.0187, 0.0231, 0.0265);
  else if (lvr <= 92) rate = pick(0.0202, 0.0265, 0.0353, 0.0353);
  else if (lvr <= 93) rate = pick(0.0228, 0.0298, 0.0381, 0.0407);
  else if (lvr <= 94) rate = pick(0.0253, 0.0298, 0.0419, 0.0438);
  else rate = pick(0.0264, 0.033, 0.0443, 0.0457);

  const fhbDiscount = isFirstHomeBuyer ? 0.9 : 1.0;
  const investorMultiplier = occupancy === "investor" ? 1.15 : 1.0;
  rate = rate * fhbDiscount * investorMultiplier;
  const premium = loanAmount * rate;
  const stampDutyOnLmi = premium * STAMP_DUTY_ON_LMI[state];

  const result: LmiBreakdown = {
    required: true,
    premium: round(premium),
    stampDutyOnLmi: round(stampDutyOnLmi),
    total: round(premium + stampDutyOnLmi),
    rate,
    lvr,
  };

  const assumptions = [
    `LVR ${round(lvr, 1)}% triggers LMI`,
    `Indicative premium rate ${(rate * 100).toFixed(3)}% applied (Helia/QBE-style rate card)`,
    `State stamp duty on LMI: ${(STAMP_DUTY_ON_LMI[state] * 100).toFixed(0)}%`,
    isFirstHomeBuyer ? "FHB 10% premium discount applied" : "No FHB premium discount applied",
    occupancy === "investor" ? "Investor 15% premium loading applied" : "Owner-occupier — no investor loading",
    "Federal 5% Deposit Scheme replaces LMI entirely for eligible FHBs (see Government Grants calculator)",
  ];

  return {
    result,
    breakdown: { ...result },
    assumptions,
    sources: [
      { label: "Helia LMI rate card (FY2025-26)", url: "https://www.helia.com.au/", asOf: "2026-05-12" },
      { label: "QBE LMI rate card (FY2025-26)", url: "https://www.qbe.com/au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}

function blank(state: AusState, fyYear: FYYear): CalcResult<LmiBreakdown> {
  const r: LmiBreakdown = { required: false, premium: 0, stampDutyOnLmi: 0, total: 0, rate: 0, lvr: 0 };
  return { result: r, breakdown: { ...r }, assumptions: ["No loan or property value provided"], sources: [], lastUpdated: LAST_UPDATED, engineVersion: ENGINE_VERSION, fyYear };
}
