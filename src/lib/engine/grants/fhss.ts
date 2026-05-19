/**
 * First Home Super Saver Scheme — voluntary super contributions, withdrawable
 * for a first-home deposit.
 *
 * Max withdrawable: $50,000 per individual (couples can each contribute and
 * withdraw $50k = $100k combined). Annual countable contribution: $15,000.
 *
 * Source: ATO — First Home Super Saver Scheme.
 */

export interface FHSSInput {
  annualContribution: number;
  yearsContributing: number;
  /** Whether the applicant is part of a couple (both partners can use FHSS). */
  isCouple?: boolean;
  /** Marginal rate, for the 30%-offset tax calculation on withdrawal. */
  marginalRate: number;
}

export interface FHSSResult {
  totalContributable: number;
  withdrawable: number;
  /** Tax on withdrawal: marginal rate less 30% offset. */
  withdrawalTax: number;
  netAvailableForDeposit: number;
}

const ANNUAL_CONTRIBUTION_CAP = 15000;
const TOTAL_WITHDRAWABLE_CAP = 50000;
const TAX_OFFSET = 0.30;

export function calculateFHSS(input: FHSSInput): FHSSResult {
  const capped = Math.min(input.annualContribution, ANNUAL_CONTRIBUTION_CAP);
  const totalContributable = capped * input.yearsContributing;
  const perPerson = Math.min(totalContributable, TOTAL_WITHDRAWABLE_CAP);
  const withdrawable = input.isCouple ? perPerson * 2 : perPerson;
  const effectiveRate = Math.max(0, input.marginalRate - TAX_OFFSET);
  const withdrawalTax = withdrawable * effectiveRate;
  const netAvailableForDeposit = withdrawable - withdrawalTax;
  return {
    totalContributable,
    withdrawable,
    withdrawalTax,
    netAvailableForDeposit,
  };
}
