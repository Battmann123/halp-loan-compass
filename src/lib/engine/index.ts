/**
 * @halp/calculator-engine — Phase 2 public API.
 *
 * Every calculator returns a CalcResult<T> with the primary result, breakdown,
 * assumptions, source citations, and engine version. Self-describing for the UI.
 *
 * Sub-paths are also exported for tree-shaking:
 *   @halp/calculator-engine/tax
 *   @halp/calculator-engine/property
 *   @halp/calculator-engine/lending
 *   @halp/calculator-engine/investment
 *   @halp/calculator-engine/grants
 *   @halp/calculator-engine/savings
 */

// Meta + types (always re-exported at root)
export { ENGINE_VERSION, LAST_UPDATED, CURRENT_FY, VERIFIED_THROUGH_FY, fyYearOf, isFyOutOfDate } from "./meta";
export type { AusState, OccupancyType, PropertyCategory, FYYear, RepaymentFrequency, RepaymentType, Source, CalcResult } from "./types";

// Tax
export { calculateIncomeTax, getMarginalRate, getEffectiveRate, calculateMedicare } from "./tax/index";

// Property
export { calculateStampDuty, calculateLmi, calculateLandTax, calculateUpfrontCosts } from "./property/index";
export type { StampDutyInput, StampDutyBreakdown, LmiInput, LmiBreakdown, LandTaxInput, LandTaxBreakdown, LandOwnerType, UpfrontCostsInput, UpfrontCostsBreakdown } from "./property/index";

// Lending
export { calculateRepayment, monthlyRepayment, calculateBorrowingPower, calculateServiceability, calculateRefinance, calculateExtraRepayments, calculateLoanConsolidation } from "./lending/index";
export type { RepaymentInput, RepaymentBreakdown, BorrowingPowerInput, BorrowingPowerBreakdown, ServiceabilityInput, ServiceabilityBreakdown, RefinanceInput, RefinanceBreakdown, ExtraRepaymentsInput, ExtraRepaymentsBreakdown, LoanConsolidationInput, LoanConsolidationBreakdown, ExistingLoan } from "./lending/index";

// Investment
export { calculateInvestmentProperty, calculateNegativeGearing, calculateCGT, calculateDepreciation } from "./investment/index";
export type { InvestmentPropertyInput, InvestmentPropertyBreakdown, NegativeGearingInput, NegativeGearingBreakdown, CGTInput, CGTBreakdown, DepreciationInput, DepreciationBreakdown } from "./investment/index";

// Grants
export { calculateGovernmentGrants, calculateFHOG, FHOG_BY_STATE, checkDepositSchemeEligibility, PRICE_CAPS, calculateHelpToBuy, calculateFHSS } from "./grants/index";
export type { GovernmentGrantsInput, GovernmentGrantsBreakdown, FHOGInput, FHOGRule, DepositSchemeInput, DepositSchemeStream, HelpToBuyInput, HelpToBuyResult, FHSSInput, FHSSResult } from "./grants/index";

// Savings
export { calculateDepositSavings } from "./savings/index";
export type { DepositSavingsInput, DepositSavingsBreakdown } from "./savings/index";
