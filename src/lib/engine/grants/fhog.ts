/**
 * First Home Owner Grant — state-by-state cash amounts (FY2025-26).
 *
 * Note: VIC FHOG is $10k metro / $20k regional — confirm with SRO Victoria
 * for the current eligibility scope.
 *
 * FY2026-27 watch list: QLD drops $30k → $15k from 1 Jul 2026; TAS ($20k)
 * and NT HomeGrown ($30-50k) expire 30 Jun 2026 and 30 Sep 2026 respectively.
 */

import type { AusState } from "../types";

export interface FHOGRule {
  amount: number;
  newOnly: boolean;
  /** Property value cap (0 = no cap). */
  valueCap: number;
  regionalSplit?: { regional: number; regionalLabel: string };
}

export const FHOG_BY_STATE: Record<AusState, FHOGRule> = {
  NSW: { amount: 10000, newOnly: true, valueCap: 750000 },
  VIC: { amount: 10000, newOnly: true, valueCap: 750000, regionalSplit: { regional: 20000, regionalLabel: "regional VIC" } },
  QLD: { amount: 30000, newOnly: true, valueCap: 750000 }, // drops to $15k from 1 Jul 2026
  SA:  { amount: 15000, newOnly: true, valueCap: 0 },
  WA:  { amount: 10000, newOnly: true, valueCap: 1000000 },
  TAS: { amount: 20000, newOnly: true, valueCap: 0 },     // expires 30 Jun 2026
  NT:  { amount: 50000, newOnly: true, valueCap: 0 },     // HomeGrown Territory — expires 30 Sep 2026
  ACT: { amount: 0,     newOnly: false, valueCap: 0 },    // no FHOG — Home Buyer Concession Scheme via stamp duty
};

export interface FHOGInput {
  state: AusState;
  propertyValue: number;
  isFirstHomeBuyer: boolean;
  newProperty: boolean;
  isRegional?: boolean;
}

export function calculateFHOG(input: FHOGInput): { amount: number; eligible: boolean; reason: string } {
  if (!input.isFirstHomeBuyer) return { amount: 0, eligible: false, reason: "Not a first home buyer" };
  const rule = FHOG_BY_STATE[input.state];
  if (rule.newOnly && !input.newProperty) return { amount: 0, eligible: false, reason: `${input.state} FHOG is for new homes only` };
  if (rule.valueCap > 0 && input.propertyValue > rule.valueCap) {
    return { amount: 0, eligible: false, reason: `Property value $${input.propertyValue.toLocaleString()} exceeds ${input.state} FHOG cap of $${rule.valueCap.toLocaleString()}` };
  }
  const amount = (input.isRegional && rule.regionalSplit) ? rule.regionalSplit.regional : rule.amount;
  if (amount === 0) return { amount: 0, eligible: false, reason: `${input.state} does not offer a cash FHOG (concessions applied via stamp duty)` };
  return { amount, eligible: true, reason: `Eligible for ${input.state} FHOG` };
}
