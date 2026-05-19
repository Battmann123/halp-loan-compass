/**
 * Help to Buy — federal shared equity scheme. Applications opened 5 December 2025.
 *
 * NEW for Phase 2 (audit fix B10) — completely missing from the Lovable repo.
 *
 * Key parameters (FY2025-26):
 *   • Government takes an equity share: up to 40% for new homes, 30% for existing.
 *   • Buyer deposit minimum: 2%.
 *   • Income caps: $100,000 single / $160,000 couple (combined).
 *   • 10,000 places/yr nationally.
 *   • Available in NSW, VIC, QLD, SA, ACT, NT (WA joined early 2026; TAS opted out).
 *
 * Source: Treasury — Help to Buy (https://treasury.gov.au/policy-topics/housing/home-ownership-support)
 */

import type { AusState } from "../types";

export interface HelpToBuyInput {
  state: AusState;
  propertyValue: number;
  /** Combined household gross income — single + partner. */
  householdIncome: number;
  isCouple: boolean;
  newHome: boolean;
  deposit: number;
}

export interface HelpToBuyResult {
  eligible: boolean;
  governmentEquity: number;
  governmentEquityPct: number;
  buyerLoanAmount: number;
  buyerDepositPct: number;
  reason: string;
}

const PARTICIPATING_STATES: AusState[] = ["NSW", "VIC", "QLD", "SA", "ACT", "NT", "WA"];

export function calculateHelpToBuy(input: HelpToBuyInput): HelpToBuyResult {
  if (!PARTICIPATING_STATES.includes(input.state)) {
    return { eligible: false, governmentEquity: 0, governmentEquityPct: 0, buyerLoanAmount: 0, buyerDepositPct: 0, reason: `Help to Buy not available in ${input.state} (TAS opted out)` };
  }
  const incomeCap = input.isCouple ? 160000 : 100000;
  if (input.householdIncome > incomeCap) {
    return { eligible: false, governmentEquity: 0, governmentEquityPct: 0, buyerLoanAmount: 0, buyerDepositPct: 0, reason: `Household income $${input.householdIncome.toLocaleString()} exceeds ${input.isCouple ? "couple" : "single"} cap of $${incomeCap.toLocaleString()}` };
  }
  const depositPct = (input.deposit / input.propertyValue) * 100;
  if (depositPct < 2) {
    return { eligible: false, governmentEquity: 0, governmentEquityPct: 0, buyerLoanAmount: 0, buyerDepositPct: depositPct, reason: `Deposit ${depositPct.toFixed(1)}% < 2% minimum` };
  }
  const governmentEquityPct = input.newHome ? 0.40 : 0.30;
  const governmentEquity = input.propertyValue * governmentEquityPct;
  const buyerLoanAmount = input.propertyValue - input.deposit - governmentEquity;
  return {
    eligible: true,
    governmentEquity,
    governmentEquityPct: governmentEquityPct * 100,
    buyerLoanAmount,
    buyerDepositPct: depositPct,
    reason: `Eligible — government takes ${(governmentEquityPct * 100).toFixed(0)}% equity (${input.newHome ? "new" : "existing"} home)`,
  };
}
