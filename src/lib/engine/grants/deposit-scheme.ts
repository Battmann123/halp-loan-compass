/**
 * Australian Government 5% Deposit Scheme — overhauled 1 October 2025.
 *
 * Audit fix B11: REBRAND from "Home Guarantee Scheme" → "Australian Government
 * 5% Deposit Scheme" (effective 1 Oct 2025).
 * Audit fix B12: adds the Single Parent / Legal Guardian 2% deposit stream.
 *
 * Post-1-Oct-2025 changes:
 *   • No income caps (was $125k single / $200k couple).
 *   • Unlimited places (was 35,000/yr).
 *   • Higher property price caps per region.
 *   • Regional First Home Buyer Guarantee folded into the main FHB stream.
 *
 * Source: Housing Australia — https://www.housingaustralia.gov.au/
 */

import type { AusState } from "../types";

export type DepositSchemeStream = "first-home-buyer" | "single-parent-or-guardian";

/** Post-1-Oct-2025 property price caps — capital city / regional centre / rest-of-state. */
export const PRICE_CAPS: Record<AusState, { capital: number; regional: number; rest: number }> = {
  NSW: { capital: 1500000, regional: 1000000, rest: 800000 },
  VIC: { capital: 950000,  regional: 750000,  rest: 650000 },
  QLD: { capital: 1000000, regional: 800000,  rest: 600000 },
  WA:  { capital: 850000,  regional: 650000,  rest: 550000 },
  SA:  { capital: 900000,  regional: 600000,  rest: 500000 },
  TAS: { capital: 700000,  regional: 550000,  rest: 450000 },
  ACT: { capital: 1000000, regional: 1000000, rest: 1000000 },
  NT:  { capital: 600000,  regional: 525000,  rest: 525000 },
};

export interface DepositSchemeInput {
  stream: DepositSchemeStream;
  state: AusState;
  region?: "capital" | "regional" | "rest";
  propertyValue: number;
  deposit: number;
  isFirstHomeBuyer: boolean;
}

export function checkDepositSchemeEligibility(input: DepositSchemeInput): {
  eligible: boolean;
  minDepositPct: number;
  reason: string;
  schemeName: string;
} {
  const schemeName = input.stream === "single-parent-or-guardian"
    ? "Australian Government 5% Deposit Scheme — Single Parent / Legal Guardian stream (2% min)"
    : "Australian Government 5% Deposit Scheme — First Home Buyer stream";
  const minDepositPct = input.stream === "single-parent-or-guardian" ? 2 : 5;

  if (!input.isFirstHomeBuyer) {
    return { eligible: false, minDepositPct, reason: "Scheme requires applicant to be a first home buyer", schemeName };
  }
  const region = input.region ?? "capital";
  const cap = PRICE_CAPS[input.state][region];
  if (input.propertyValue > cap) {
    return { eligible: false, minDepositPct, reason: `Property value $${input.propertyValue.toLocaleString()} exceeds ${input.state} ${region} cap of $${cap.toLocaleString()}`, schemeName };
  }
  const depositPct = (input.deposit / input.propertyValue) * 100;
  if (depositPct < minDepositPct) {
    return { eligible: false, minDepositPct, reason: `Deposit ${depositPct.toFixed(1)}% < minimum ${minDepositPct}%`, schemeName };
  }
  return { eligible: true, minDepositPct, reason: "Eligible — government guarantees the shortfall, no LMI payable", schemeName };
}
