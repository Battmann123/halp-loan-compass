/**
 * Aggregates every cash item a buyer needs at or before settlement, beyond
 * the deposit itself. Wraps stamp duty + LMI + conveyancing + inspections +
 * insurance + registration fees into a single "total cash needed".
 */

import type { AusState, FYYear, OccupancyType, PropertyCategory, CalcResult } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { calculateStampDuty } from "./stamp-duty";
import { calculateLmi } from "./lmi";
import { round } from "../util";

export interface UpfrontCostsInput {
  propertyValue: number;
  loanAmount: number;
  state: AusState;
  isFirstHomeBuyer: boolean;
  occupancy: OccupancyType;
  category: PropertyCategory;
  foreignPurchaser?: boolean;
  /** Optional overrides for soft-cost items. */
  conveyancing?: number;
  buildingInspection?: number;
  pestInspection?: number;
  buildingInsurance?: number;
  fyYear?: FYYear;
}

export interface UpfrontCostsBreakdown {
  stampDuty: number;
  stampDutyConcession: number;
  foreignSurcharge: number;
  mortgageRegistrationFee: number;
  transferFee: number;
  lmi: number;
  conveyancing: number;
  buildingInspection: number;
  pestInspection: number;
  buildingInsurance: number;
  total: number;
}

const DEFAULT_SOFT_COSTS = {
  conveyancing: 1500,
  buildingInspection: 600,
  pestInspection: 350,
  buildingInsurance: 1200,
};

export function calculateUpfrontCosts(input: UpfrontCostsInput): CalcResult<UpfrontCostsBreakdown> {
  const fyYear = input.fyYear ?? CURRENT_FY;
  const sd = calculateStampDuty({
    value: input.propertyValue,
    state: input.state,
    isFirstHomeBuyer: input.isFirstHomeBuyer,
    occupancy: input.occupancy,
    category: input.category,
    foreignPurchaser: input.foreignPurchaser,
    fyYear,
  });
  const lmi = calculateLmi({
    loanAmount: input.loanAmount,
    propertyValue: input.propertyValue,
    isFirstHomeBuyer: input.isFirstHomeBuyer,
    occupancy: input.occupancy,
    state: input.state,
    fyYear,
  });

  const soft = {
    conveyancing: input.conveyancing ?? DEFAULT_SOFT_COSTS.conveyancing,
    buildingInspection: input.buildingInspection ?? DEFAULT_SOFT_COSTS.buildingInspection,
    pestInspection: input.pestInspection ?? DEFAULT_SOFT_COSTS.pestInspection,
    buildingInsurance: input.buildingInsurance ?? DEFAULT_SOFT_COSTS.buildingInsurance,
  };

  const result: UpfrontCostsBreakdown = {
    stampDuty: sd.result.duty,
    stampDutyConcession: sd.result.concession,
    foreignSurcharge: sd.result.foreignSurcharge,
    mortgageRegistrationFee: sd.result.mortgageRegistrationFee,
    transferFee: sd.result.transferFee,
    lmi: lmi.result.total,
    conveyancing: soft.conveyancing,
    buildingInspection: soft.buildingInspection,
    pestInspection: soft.pestInspection,
    buildingInsurance: soft.buildingInsurance,
    total: round(
      sd.result.duty + sd.result.foreignSurcharge + sd.result.mortgageRegistrationFee + sd.result.transferFee +
      lmi.result.total + soft.conveyancing + soft.buildingInspection + soft.pestInspection + soft.buildingInsurance
    ),
  };

  return {
    result,
    breakdown: { ...result },
    assumptions: [
      ...sd.assumptions,
      ...lmi.assumptions,
      `Conveyancing assumed $${soft.conveyancing.toLocaleString()} (override available)`,
      `Building inspection $${soft.buildingInspection.toLocaleString()}; pest $${soft.pestInspection.toLocaleString()}`,
      `Building insurance year-one $${soft.buildingInsurance.toLocaleString()} estimate (varies by location)`,
    ],
    sources: [
      ...sd.sources,
      ...lmi.sources,
      { label: "ABS — Domestic Insurance Premiums series", url: "https://www.abs.gov.au/", asOf: "2026-05-12" },
    ],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
