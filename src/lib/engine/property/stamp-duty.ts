/**
 * Australian stamp duty / transfer / conveyance duty — 8 states.
 *
 * FY2025-26 + FY2026-27 rates. Includes:
 *   • Standard bracket calculations per state.
 *   • First Home Buyer concessions (state-specific rules).
 *   • Foreign purchaser surcharge (NSW 9%, VIC 8%, QLD 8%, TAS 8%, SA 7%, WA 7%, ACT 0%, NT 0%).
 *   • Off-the-plan concessions where applicable (WA strata to $850k, VIC OTP to 21 Oct 2026, ACT to $1.02M).
 *   • Mortgage registration + transfer fees.
 *
 * Key changes from FY2024-25:
 *   • NSW foreign surcharge 8% → 9% (effective 1 January 2025) — audit fix B3
 *   • QLD AFAD 7% → 8% (effective 1 July 2024) — audit fix B4
 *   • QLD FHB full waiver on new homes & vacant land (no value cap) from 1 May 2025
 *   • WA FHB exemption raised to ≤$500k (was $430k) from 21 March 2025
 *   • WA OTP strata: 100% concession ≤$750k, phase to $850k (NEW vs Lovable repo)
 *   • ACT FHB Home Buyer Concession Scheme threshold lifted to $1,020,000 from 1 July 2025
 *   • SA — FHB exemption confirmed no value cap on new builds since 6 June 2024
 *
 * Sources (each state's revenue office):
 *   NSW: https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty
 *   VIC: https://www.sro.vic.gov.au/land-transfer-duty
 *   QLD: https://qro.qld.gov.au/duties/transfer-duty/
 *   SA:  https://www.revenuesa.sa.gov.au/stamp-duty-land
 *   WA:  https://www.wa.gov.au/organisation/department-of-finance/transfer-duty
 *   TAS: https://www.sro.tas.gov.au/property-transfer-duties
 *   ACT: https://www.revenue.act.gov.au/duties/conveyance-duty
 *   NT:  https://nt.gov.au/employ/money-and-taxes/taxes,-royalties-and-grants/stamp-duty
 */

import type { AusState, FYYear, OccupancyType, PropertyCategory, CalcResult, Source } from "../types";
import { CURRENT_FY, ENGINE_VERSION, LAST_UPDATED } from "../meta";
import { round } from "../util";

export interface StampDutyInput {
  value: number;
  state: AusState;
  isFirstHomeBuyer: boolean;
  occupancy: OccupancyType;
  category: PropertyCategory;
  foreignPurchaser?: boolean;
  /** Off-the-plan strata dwelling (apartment/townhouse/villa). Triggers WA/VIC/ACT OTP concessions. */
  offThePlan?: boolean;
  fyYear?: FYYear;
}

export interface StampDutyBreakdown {
  duty: number;
  concession: number;
  foreignSurcharge: number;
  mortgageRegistrationFee: number;
  transferFee: number;
  total: number;
}

const STATE_SOURCES: Record<AusState, Source> = {
  NSW: { label: "Revenue NSW — Transfer Duty", url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty", asOf: "2026-05-12" },
  VIC: { label: "State Revenue Office Victoria — Land Transfer Duty", url: "https://www.sro.vic.gov.au/land-transfer-duty", asOf: "2026-05-12" },
  QLD: { label: "Queensland Revenue Office — Transfer Duty", url: "https://qro.qld.gov.au/duties/transfer-duty/", asOf: "2026-05-12" },
  SA:  { label: "RevenueSA — Stamp Duty on Land", url: "https://www.revenuesa.sa.gov.au/stamp-duty-land", asOf: "2026-05-12" },
  WA:  { label: "WA Department of Finance — Transfer Duty", url: "https://www.wa.gov.au/organisation/department-of-finance/transfer-duty", asOf: "2026-05-12" },
  TAS: { label: "State Revenue Office Tasmania — Property Transfer Duties", url: "https://www.sro.tas.gov.au/property-transfer-duties", asOf: "2026-05-12" },
  NT:  { label: "NT Department of Treasury and Finance — Stamp Duty", url: "https://treasury.nt.gov.au/dtf/territory-revenue-office/stamp-duty", asOf: "2026-05-12" },
  ACT: { label: "ACT Revenue Office — Conveyance Duty", url: "https://www.revenue.act.gov.au/duties/conveyance-duty", asOf: "2026-05-12" },
};

function dutyNSW(value: number): number {
  if (value <= 17000) return Math.max(20, value * 0.0125);
  if (value <= 37000) return 212 + (value - 17000) * 0.015;
  if (value <= 99000) return 512 + (value - 37000) * 0.0175;
  if (value <= 372000) return 1597 + (value - 99000) * 0.035;
  if (value <= 1240000) return 11152 + (value - 372000) * 0.045;
  return 50212 + (value - 1240000) * 0.055;
}

function dutyVIC(value: number, isPpr: boolean): number {
  if (isPpr && value <= 550000) {
    if (value <= 25000) return value * 0.014;
    if (value <= 130000) return 350 + (value - 25000) * 0.024;
    if (value <= 440000) return 2870 + (value - 130000) * 0.05;
    return 18370 + (value - 440000) * 0.06;
  }
  if (value <= 25000) return value * 0.014;
  if (value <= 130000) return 350 + (value - 25000) * 0.024;
  if (value <= 960000) return 2870 + (value - 130000) * 0.06;
  if (value <= 2000000) return value * 0.055;
  return 110000 + (value - 2000000) * 0.065;
}

function dutyQLD(value: number, isPpr: boolean): number {
  if (isPpr) {
    if (value <= 350000) return value * 0.01;
    if (value <= 540000) return 3500 + (value - 350000) * 0.035;
    if (value <= 1000000) return 10150 + (value - 540000) * 0.045;
    return 30850 + (value - 1000000) * 0.0575;
  }
  if (value <= 5000) return 0;
  if (value <= 75000) return (value - 5000) * 0.015;
  if (value <= 540000) return 1050 + (value - 75000) * 0.035;
  if (value <= 1000000) return 17325 + (value - 540000) * 0.045;
  return 38025 + (value - 1000000) * 0.0575;
}

function dutySA(value: number): number {
  if (value <= 12000) return value * 0.01;
  if (value <= 30000) return 120 + (value - 12000) * 0.02;
  if (value <= 50000) return 480 + (value - 30000) * 0.03;
  if (value <= 100000) return 1080 + (value - 50000) * 0.035;
  if (value <= 200000) return 2830 + (value - 100000) * 0.04;
  if (value <= 250000) return 6830 + (value - 200000) * 0.0425;
  if (value <= 300000) return 8955 + (value - 250000) * 0.0475;
  if (value <= 500000) return 11330 + (value - 300000) * 0.05;
  return 21330 + (value - 500000) * 0.055;
}

function dutyWA(value: number): number {
  if (value <= 120000) return value * 0.019;
  if (value <= 150000) return 2280 + (value - 120000) * 0.0285;
  if (value <= 360000) return 3135 + (value - 150000) * 0.038;
  if (value <= 725000) return 11115 + (value - 360000) * 0.0475;
  return 28453 + (value - 725000) * 0.0515;
}

function dutyTAS(value: number): number {
  if (value <= 3000) return 50;
  if (value <= 25000) return 50 + (value - 3000) * 0.0175;
  if (value <= 75000) return 435 + (value - 25000) * 0.0225;
  if (value <= 200000) return 1560 + (value - 75000) * 0.035;
  if (value <= 375000) return 5935 + (value - 200000) * 0.04;
  if (value <= 725000) return 12935 + (value - 375000) * 0.0425;
  return 27810 + (value - 725000) * 0.045;
}

function dutyNT(value: number): number {
  if (value <= 525000) {
    const v = value / 1000;
    return (0.06571441 * v * v) + (15 * v);
  }
  if (value <= 3000000) return value * 0.0495;
  if (value <= 5000000) return value * 0.0575;
  return value * 0.0595;
}

function dutyACT(value: number, isPpr: boolean): number {
  // Owner-occupier rates updated 1 July 2025
  if (isPpr) {
    if (value <= 260000) return value * 0.004;
    if (value <= 300000) return 1040 + (value - 260000) * 0.022;
    if (value <= 500000) return 1920 + (value - 300000) * 0.034;
    if (value <= 750000) return 8720 + (value - 500000) * 0.0432;
    if (value <= 1000000) return 19520 + (value - 750000) * 0.059;
    if (value <= 1455000) return 34270 + (value - 1000000) * 0.064;
    return value * 0.0454;
  }
  if (value <= 200000) return value * 0.012;
  if (value <= 300000) return 2400 + (value - 200000) * 0.022;
  if (value <= 500000) return 4600 + (value - 300000) * 0.034;
  if (value <= 750000) return 11400 + (value - 500000) * 0.0432;
  if (value <= 1000000) return 22200 + (value - 750000) * 0.059;
  if (value <= 1455000) return 36950 + (value - 1000000) * 0.064;
  return value * 0.0454;
}

/** Foreign purchaser surcharge rates (FY2025-26). Audit fixes B3 (NSW) and B4 (QLD). */
const FOREIGN_SURCHARGE: Record<AusState, number> = {
  NSW: 0.09, // 8% → 9% effective 1 January 2025 — audit fix B3
  VIC: 0.08,
  QLD: 0.08, // 7% → 8% effective 1 July 2024 — audit fix B4
  SA:  0.07,
  WA:  0.07,
  TAS: 0.08,
  ACT: 0,    // ACT has no foreign purchaser surcharge
  NT:  0,    // NT has no foreign purchaser surcharge
};

const REG_FEES: Record<AusState, { mortgage: number; transfer: number | "valueBased" }> = {
  NSW: { mortgage: 176, transfer: 176 },
  VIC: { mortgage: 122.90, transfer: 1974 },
  QLD: { mortgage: 238.14, transfer: "valueBased" },
  SA:  { mortgage: 198, transfer: "valueBased" },
  WA:  { mortgage: 192.50, transfer: 205.30 },
  TAS: { mortgage: 158.20, transfer: 232.80 },
  NT:  { mortgage: 149, transfer: 149 },
  ACT: { mortgage: 170, transfer: 454 },
};

function transferFeeFor(state: AusState, value: number): number {
  const fees = REG_FEES[state];
  if (fees.transfer === "valueBased") {
    if (state === "QLD") {
      return value <= 180000 ? 238.14 : 238.14 + Math.ceil((value - 180000) / 10000) * 44.71;
    }
    if (state === "SA") return 198 + value * 0.01;
    return 0;
  }
  return fees.transfer;
}

export function calculateStampDuty(input: StampDutyInput): CalcResult<StampDutyBreakdown> {
  const { value, state, isFirstHomeBuyer: isFhb, occupancy, category, foreignPurchaser, offThePlan } = input;
  const fyYear = input.fyYear ?? CURRENT_FY;
  const isPpr = occupancy === "owner-occupier";
  let duty = 0;
  let concession = 0;
  const assumptions: string[] = [];

  switch (state) {
    case "NSW": {
      duty = dutyNSW(value);
      if (isFhb && isPpr) {
        if (category === "vacant") {
          if (value <= 350000) { concession = duty; duty = 0; }
          else if (value <= 450000) {
            const reduction = ((450000 - value) / 100000) * duty;
            concession = reduction; duty -= reduction;
          }
        } else {
          if (value <= 800000) { concession = duty; duty = 0; }
          else if (value <= 1000000) {
            const fullAt1M = 11152 + (1000000 - 372000) * 0.045;
            const newDuty = fullAt1M * ((value - 800000) / 200000);
            concession = duty - newDuty; duty = newDuty;
          }
        }
        assumptions.push("NSW First Home Buyers Assistance Scheme (FHBAS) applied: full exemption ≤$800k, sliding $800k–$1M");
      }
      break;
    }
    case "VIC": {
      duty = dutyVIC(value, isPpr);
      if (isFhb && isPpr) {
        if (value <= 600000) { concession = duty; duty = 0; }
        else if (value <= 750000) {
          const newDuty = duty * (1 - (750000 - value) / 150000);
          concession = duty - newDuty; duty = newDuty;
        }
        assumptions.push("VIC FHB exemption applied: full exemption ≤$600k, sliding $600k–$750k (PPR only)");
      }
      if (offThePlan && value <= 750000) {
        // VIC OTP concession — extended to contracts signed up to 21 Oct 2026
        assumptions.push("VIC off-the-plan duty concession is available for contracts to 21 Oct 2026 — calculator does not deduct an additional OTP concession on top of FHB exemption; check eligibility with SRO");
      }
      break;
    }
    case "QLD": {
      duty = dutyQLD(value, isPpr);
      if (isFhb && isPpr) {
        if (category === "new" || category === "vacant") {
          concession = duty; duty = 0;
          assumptions.push("QLD First Home (New) Concession applied: full waiver for new homes and vacant land — no value cap (effective 1 May 2025)");
        } else {
          let fhbConc = 0;
          if (value <= 709999.99) fhbConc = 17350;
          else if (value <= 719999.99) fhbConc = 15615;
          else if (value <= 729999.99) fhbConc = 13880;
          else if (value <= 739999.99) fhbConc = 12145;
          else if (value <= 749999.99) fhbConc = 10410;
          else if (value <= 759999.99) fhbConc = 8675;
          else if (value <= 769999.99) fhbConc = 6940;
          else if (value <= 779999.99) fhbConc = 5205;
          else if (value <= 789999.99) fhbConc = 3470;
          else if (value <= 799999.99) fhbConc = 1735;
          if (fhbConc > 0) {
            const before = duty;
            duty = Math.max(0, duty - fhbConc);
            concession = before - duty;
            assumptions.push("QLD First Home Concession applied (established home, sliding scale to $800k)");
          }
        }
      }
      break;
    }
    case "SA": {
      duty = dutySA(value);
      if (isFhb && isPpr && category === "new") {
        concession = duty; duty = 0;
        assumptions.push("SA FHB Stamp Duty Relief: full exemption new builds, no value cap (effective 6 June 2024)");
      }
      break;
    }
    case "WA": {
      duty = dutyWA(value);
      if (isFhb && isPpr) {
        if (category === "vacant") {
          if (value <= 350000) { concession = duty; duty = 0; }
          else if (value <= 450000) {
            const newDuty = (value - 350000) * 0.1539;
            concession = duty - newDuty; duty = newDuty;
          }
        } else {
          if (value <= 500000) { concession = duty; duty = 0; }
          else if (value <= 700000) {
            const newDuty = (value - 500000) * 0.1363;
            concession = duty - newDuty; duty = newDuty;
          }
        }
        assumptions.push("WA First Home Owner Rate (FHOR) applied — expanded 21 March 2025: exemption ≤$500k, concession to $700k Perth Metro / $750k regional");
      } else if (offThePlan) {
        // WA off-the-plan strata concession — NEW (audit fix B9)
        if (value <= 750000) {
          concession = duty; duty = 0;
          assumptions.push("WA off-the-plan strata concession: 100% waiver ≤$750k (any buyer, contracts to 30 June 2026)");
        } else if (value <= 850000) {
          // 75% concession phasing out from $750k to $850k
          const phase = (value - 750000) / 100000;
          const newDuty = duty * (0.25 + 0.75 * phase);
          concession = duty - newDuty; duty = newDuty;
          assumptions.push("WA off-the-plan strata concession: 75% concession phasing $750k–$850k (any buyer, contracts to 30 June 2026)");
        }
      }
      break;
    }
    case "TAS": {
      duty = dutyTAS(value);
      if (isFhb && isPpr && category === "established" && value <= 750000) {
        concession = duty; duty = 0;
        assumptions.push("TAS FHB established-home exemption: full waiver ≤$750k (current to 30 June 2026)");
      }
      break;
    }
    case "NT": {
      duty = dutyNT(value);
      if (isFhb && isPpr && value <= 650000) {
        const reduction = Math.min(duty, 18601);
        concession = reduction; duty -= reduction;
        assumptions.push("NT FHB stamp duty discount applied: up to $18,601 reduction for properties ≤$650k");
      }
      break;
    }
    case "ACT": {
      duty = dutyACT(value, isPpr);
      if (isFhb && isPpr && value <= 1020000) {
        concession = duty; duty = 0;
        assumptions.push("ACT Home Buyer Concession Scheme: full exemption ≤$1,020,000 PPR (from 1 July 2025)");
      }
      break;
    }
  }

  let foreignSurcharge = 0;
  if (foreignPurchaser) {
    foreignSurcharge = value * FOREIGN_SURCHARGE[state];
    if (FOREIGN_SURCHARGE[state] === 0) {
      assumptions.push(`${state} does not levy a foreign purchaser surcharge`);
    } else {
      assumptions.push(`Foreign purchaser surcharge applied at ${(FOREIGN_SURCHARGE[state] * 100).toFixed(0)}% of property value`);
    }
  }

  const mortgageRegistrationFee = REG_FEES[state].mortgage;
  const transferFee = transferFeeFor(state, value);

  const result: StampDutyBreakdown = {
    duty: round(duty),
    concession: round(concession),
    foreignSurcharge: round(foreignSurcharge),
    mortgageRegistrationFee: round(mortgageRegistrationFee, 2),
    transferFee: round(transferFee, 2),
    total: round(duty + foreignSurcharge + mortgageRegistrationFee + transferFee),
  };

  return {
    result,
    breakdown: { ...result, fyYear, state, foreignPurchaser: !!foreignPurchaser, offThePlan: !!offThePlan },
    assumptions: [`FY${fyYear} rates applied`, ...assumptions],
    sources: [STATE_SOURCES[state]],
    lastUpdated: LAST_UPDATED,
    engineVersion: ENGINE_VERSION,
    fyYear,
  };
}
