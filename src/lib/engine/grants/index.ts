/**
 * Consolidated Government Grants calculator.
 * Combines FHOG + 5% Deposit Scheme (with Single Parent stream) + Help to Buy
 * + FHSS into a single "total benefit" view per audit decision D7.
 */

import type { AusState, FYYear, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { calculateStampDuty } from "../property/stamp-duty";
import { calculateFHOG, FHOG_BY_STATE } from "./fhog";
import { checkDepositSchemeEligibility, type DepositSchemeStream, PRICE_CAPS } from "./deposit-scheme";
import { calculateHelpToBuy } from "./help-to-buy";
import { calculateFHSS } from "./fhss";
import { getMarginalRate } from "../tax/brackets";
import { round } from "../util";

export interface GovernmentGrantsInput {
  state: AusState;
  /** 5% Deposit Scheme region — capital / regional centre / rest-of-state. Defaults to "capital". */
  region?: "capital" | "regional" | "rest";
  propertyValue: number;
  deposit: number;
  isFirstHomeBuyer: boolean;
  newProperty: boolean;
  isRegional?: boolean;
  /** Whether to evaluate Help to Buy (FHB single/couple shared equity, Tim D7 — inside Grants). */
  evaluateHelpToBuy?: boolean;
  householdIncome?: number;
  isCouple?: boolean;
  /** Whether to evaluate Single Parent / Legal Guardian 2% deposit stream (audit fix B12). */
  isSingleParent?: boolean;
  /** Whether to evaluate FHSS contributions. */
  evaluateFhss?: boolean;
  fhssAnnualContribution?: number;
  fhssYearsContributing?: number;
  fyYear?: FYYear;
}

export interface GovernmentGrantsBreakdown {
  fhogAmount: number;
  fhogReason: string;
  stampDutyConcession: number;
  depositSchemeEligible: boolean;
  depositSchemeName: string;
  depositSchemeReason: string;
  helpToBuyEligible: boolean;
  helpToBuyEquity: number;
  helpToBuyReason: string;
  fhssWithdrawable: number;
  fhssNetForDeposit: number;
  totalCashBenefit: number;
}

export function calculateGovernmentGrants(input: GovernmentGrantsInput): CalcResult<GovernmentGrantsBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const assumptions: string[] = [`FY${fyYear} grants applied`];

  // FHOG
  const fhog = calculateFHOG({ state: input.state, propertyValue: input.propertyValue, isFirstHomeBuyer: input.isFirstHomeBuyer, newProperty: input.newProperty, isRegional: input.isRegional });

  // Stamp duty concession (vs non-FHB)
  const dutyNoFhb = calculateStampDuty({ value: input.propertyValue, state: input.state, isFirstHomeBuyer: false, occupancy: "owner-occupier", category: input.newProperty ? "new" : "established", fyYear });
  const dutyFhb = calculateStampDuty({ value: input.propertyValue, state: input.state, isFirstHomeBuyer: input.isFirstHomeBuyer, occupancy: "owner-occupier", category: input.newProperty ? "new" : "established", fyYear });
  const stampDutyConcession = Math.max(0, dutyNoFhb.result.duty - dutyFhb.result.duty);

  // 5% Deposit Scheme — FHB stream by default, Single Parent if flagged
  const stream: DepositSchemeStream = input.isSingleParent ? "single-parent-or-guardian" : "first-home-buyer";
  const depositCheck = checkDepositSchemeEligibility({
    stream, state: input.state, propertyValue: input.propertyValue, deposit: input.deposit, isFirstHomeBuyer: input.isFirstHomeBuyer
  });
  if (input.isSingleParent) {
    assumptions.push("Single Parent / Legal Guardian stream evaluated (2% deposit minimum) — audit fix B12");
  } else {
    assumptions.push("First Home Buyer stream evaluated (5% deposit minimum)");
  }
  assumptions.push("Federal scheme rebranded 1 Oct 2025: 'Home Guarantee Scheme' → 'Australian Government 5% Deposit Scheme' (audit fix B11). No income caps post-rebrand; unlimited places.");

  // Help to Buy (audit fix B10) — only if explicitly evaluated (Tim D7 = inside Grants)
  let helpToBuyEligible = false;
  let helpToBuyEquity = 0;
  let helpToBuyReason = "Not evaluated";
  if (input.evaluateHelpToBuy && input.householdIncome !== undefined) {
    const htb = calculateHelpToBuy({ state: input.state, propertyValue: input.propertyValue, householdIncome: input.householdIncome, isCouple: !!input.isCouple, newHome: input.newProperty, deposit: input.deposit });
    helpToBuyEligible = htb.eligible;
    helpToBuyEquity = htb.governmentEquity;
    helpToBuyReason = htb.reason;
    assumptions.push("Help to Buy evaluated — shared equity scheme, 30%/40% gov equity. Audit fix B10.");
  }

  // FHSS
  let fhssWithdrawable = 0;
  let fhssNetForDeposit = 0;
  if (input.evaluateFhss && input.fhssAnnualContribution && input.fhssYearsContributing) {
    const marginal = input.householdIncome ? getMarginalRate(input.householdIncome, fyYear) : 0.30;
    const fhss = calculateFHSS({
      annualContribution: input.fhssAnnualContribution,
      yearsContributing: input.fhssYearsContributing,
      isCouple: !!input.isCouple,
      marginalRate: marginal,
    });
    fhssWithdrawable = fhss.withdrawable;
    fhssNetForDeposit = fhss.netAvailableForDeposit;
    assumptions.push(`FHSS evaluated at marginal rate ${(marginal * 100).toFixed(0)}% (30% offset applied to withdrawal tax)`);
  }

  const totalCashBenefit = round(fhog.amount + stampDutyConcession + fhssNetForDeposit);

  const result: GovernmentGrantsBreakdown = {
    fhogAmount: round(fhog.amount),
    fhogReason: fhog.reason,
    stampDutyConcession: round(stampDutyConcession),
    depositSchemeEligible: depositCheck.eligible,
    depositSchemeName: depositCheck.schemeName,
    depositSchemeReason: depositCheck.reason,
    helpToBuyEligible,
    helpToBuyEquity: round(helpToBuyEquity),
    helpToBuyReason,
    fhssWithdrawable: round(fhssWithdrawable),
    fhssNetForDeposit: round(fhssNetForDeposit),
    totalCashBenefit,
  };

  return {
    result,
    breakdown: { ...result },
    assumptions,
    sources: [
      { label: "Housing Australia — Australian Government 5% Deposit Scheme", url: "https://www.housingaustralia.gov.au/", asOf: "2026-05-12" },
      { label: "Treasury — Help to Buy", url: "https://treasury.gov.au/policy-topics/housing/home-ownership-support", asOf: "2026-05-12" },
      { label: "ATO — First Home Super Saver Scheme", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/early-access-to-super/first-home-super-saver-scheme", asOf: "2026-05-12" },
      { label: "FirstHome.gov.au", url: "https://firsthomebuyers.gov.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}

export { calculateFHOG, FHOG_BY_STATE } from "./fhog";
export type { FHOGInput, FHOGRule } from "./fhog";
export { checkDepositSchemeEligibility, PRICE_CAPS } from "./deposit-scheme";
export type { DepositSchemeInput, DepositSchemeStream } from "./deposit-scheme";
export { calculateHelpToBuy } from "./help-to-buy";
export type { HelpToBuyInput, HelpToBuyResult } from "./help-to-buy";
export { calculateFHSS } from "./fhss";
export type { FHSSInput, FHSSResult } from "./fhss";
