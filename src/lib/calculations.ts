/**
 * Shared calculation helpers used across all calculators.
 * Source of truth for: stamp duty, LMI, Australian tax (Stage 3 — 2024-25 & 2025-26
 * brackets are identical), and loan repayments.
 *
 * Last reviewed: April 2026. Reflects:
 *   • 2025-26 ATO resident tax rates (unchanged from 2024-25 Stage 3)
 *   • Home Guarantee Scheme caps effective 1 October 2025 (no income/place caps)
 *   • QLD: full FHB stamp duty waiver on new homes & vacant land from 1 May 2025
 *   • QLD FHOG: $30,000 extended to 30 June 2026 (≤ $750k total value, new builds)
 *   • VIC FHB: full exemption ≤ $600k, sliding $600k–$750k
 *   • WA FHB thresholds effective 21 March 2025
 *   • ACT FHB Home Buyer Concession: full exemption ≤ $1,020,000 (PPR)
 *   • SA FHB: no value cap on new builds (Feb 2025)
 *
 * IMPORTANT: All calculator pages must import from here so results stay consistent.
 */

export type AusState = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "NT" | "ACT";
export type PropertyCategory = "new" | "established" | "vacant";
export type OccupancyType = "owner-occupier" | "investor";

// ---------------------------------------------------------------------------
// Australian resident tax brackets — 2024-25 (Stage 3, effective 1 July 2024)
// ---------------------------------------------------------------------------
// 0 – $18,200      : 0%
// $18,201 – $45,000: 16%
// $45,001 – $135,000: 30%
// $135,001 – $190,000: 37%
// $190,001+        : 45%
export const calculateIncomeTax = (income: number): number => {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.16;
  if (income <= 135000) return 4288 + (income - 45000) * 0.30;
  if (income <= 190000) return 31288 + (income - 135000) * 0.37;
  return 51638 + (income - 190000) * 0.45;
};

export const getMarginalRate = (income: number): number => {
  if (income <= 18200) return 0;
  if (income <= 45000) return 0.16;
  if (income <= 135000) return 0.30;
  if (income <= 190000) return 0.37;
  return 0.45;
};

// ---------------------------------------------------------------------------
// Loan repayment helpers
// ---------------------------------------------------------------------------
export const monthlyRepayment = (
  principal: number,
  annualRatePct: number,
  termYears: number,
  type: "principal-interest" | "interest-only" = "principal-interest"
): number => {
  if (principal <= 0 || annualRatePct < 0 || termYears <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (type === "interest-only") return principal * r;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

// ---------------------------------------------------------------------------
// Stamp duty — current 2024-25 / 2025-26 rates
// Returns { duty, concession } where concession is the FHB benefit applied.
// ---------------------------------------------------------------------------
export interface StampDutyInput {
  value: number;
  state: AusState;
  isFirstHomeBuyer: boolean;
  occupancy: OccupancyType;
  category: PropertyCategory;
  foreignPurchaser?: boolean;
}

export interface StampDutyResult {
  duty: number;                   // payable after concession
  concession: number;             // amount waived via FHB scheme
  foreignSurcharge: number;
  mortgageRegistrationFee: number;
  transferFee: number;
  total: number;
}

const round = (n: number) => Math.round(n);

export const calculateStampDuty = (input: StampDutyInput): StampDutyResult => {
  const { value, state, isFirstHomeBuyer: isFhb, occupancy, category, foreignPurchaser } = input;
  const isPpr = occupancy === "owner-occupier";
  let duty = 0;
  let concession = 0;
  let foreignSurcharge = 0;
  let mortgageRegistrationFee = 0;
  let transferFee = 0;

  switch (state) {
    case "NSW": {
      if (value <= 17000) duty = Math.max(20, value * 0.0125);
      else if (value <= 37000) duty = 212 + (value - 17000) * 0.015;
      else if (value <= 99000) duty = 512 + (value - 37000) * 0.0175;
      else if (value <= 372000) duty = 1597 + (value - 99000) * 0.035;
      else if (value <= 1240000) duty = 11152 + (value - 372000) * 0.045;
      else duty = 50212 + (value - 1240000) * 0.055;

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
            const fullDutyAt1M = 11152 + (1000000 - 372000) * 0.045;
            const proportion = (value - 800000) / 200000;
            const newDuty = fullDutyAt1M * proportion;
            concession = duty - newDuty; duty = newDuty;
          }
        }
      }
      if (foreignPurchaser) foreignSurcharge = value * 0.08;
      mortgageRegistrationFee = 176;
      transferFee = 176;
      break;
    }

    case "VIC": {
      // PPR rates apply for owner-occupiers up to $550k; otherwise general rates
      if (isPpr && value <= 550000) {
        if (value <= 25000) duty = value * 0.014;
        else if (value <= 130000) duty = 350 + (value - 25000) * 0.024;
        else if (value <= 440000) duty = 2870 + (value - 130000) * 0.05;
        else duty = 18370 + (value - 440000) * 0.06;
      } else {
        if (value <= 25000) duty = value * 0.014;
        else if (value <= 130000) duty = 350 + (value - 25000) * 0.024;
        else if (value <= 960000) duty = 2870 + (value - 130000) * 0.06;
        else if (value <= 2000000) duty = value * 0.055;
        else duty = 110000 + (value - 2000000) * 0.065;
      }
      // VIC FHB: full exemption to $600k, sliding $600k–$750k (PPR only)
      if (isFhb && isPpr) {
        if (value <= 600000) { concession = duty; duty = 0; }
        else if (value <= 750000) {
          const c = duty * ((750000 - value) / 150000);
          concession = c; duty -= c;
        }
      }
      if (foreignPurchaser) foreignSurcharge = value * 0.08;
      mortgageRegistrationFee = 122.90;
      transferFee = 1974;
      break;
    }

    case "QLD": {
      if (isPpr) {
        if (value <= 350000) duty = value * 0.01;
        else if (value <= 540000) duty = 3500 + (value - 350000) * 0.035;
        else if (value <= 1000000) duty = 10150 + (value - 540000) * 0.045;
        else duty = 30850 + (value - 1000000) * 0.0575;
      } else {
        if (value <= 5000) duty = 0;
        else if (value <= 75000) duty = (value - 5000) * 0.015;
        else if (value <= 540000) duty = 1050 + (value - 75000) * 0.035;
        else if (value <= 1000000) duty = 17325 + (value - 540000) * 0.045;
        else duty = 38025 + (value - 1000000) * 0.0575;
      }
      // QLD FHB concession
      // From 1 May 2025: full waiver on NEW homes & vacant land (no value cap)
      // Existing homes still use the sliding scale to $800k (effective 9 June 2024)
      if (isFhb && isPpr) {
        if (category === "new" || category === "vacant") {
          concession = duty;
          duty = 0;
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
          }
        }
      }
      if (foreignPurchaser) foreignSurcharge = value * 0.07;
      mortgageRegistrationFee = 238.14;
      transferFee = value <= 180000 ? 238.14 : 238.14 + Math.ceil((value - 180000) / 10000) * 44.71;
      break;
    }

    case "SA": {
      if (value <= 12000) duty = value * 0.01;
      else if (value <= 30000) duty = 120 + (value - 12000) * 0.02;
      else if (value <= 50000) duty = 480 + (value - 30000) * 0.03;
      else if (value <= 100000) duty = 1080 + (value - 50000) * 0.035;
      else if (value <= 200000) duty = 2830 + (value - 100000) * 0.04;
      else if (value <= 250000) duty = 6830 + (value - 200000) * 0.0425;
      else if (value <= 300000) duty = 8955 + (value - 250000) * 0.0475;
      else if (value <= 500000) duty = 11330 + (value - 300000) * 0.05;
      else duty = 21330 + (value - 500000) * 0.055;
      // SA FHB: full exemption for new builds (no cap from Feb 2025)
      if (isFhb && isPpr && category === "new") { concession = duty; duty = 0; }
      if (foreignPurchaser) foreignSurcharge = value * 0.07;
      mortgageRegistrationFee = 198;
      transferFee = 198 + value * 0.01;
      break;
    }

    case "WA": {
      if (value <= 120000) duty = value * 0.019;
      else if (value <= 150000) duty = 2280 + (value - 120000) * 0.0285;
      else if (value <= 360000) duty = 3135 + (value - 150000) * 0.038;
      else if (value <= 725000) duty = 11115 + (value - 360000) * 0.0475;
      else duty = 28453 + (value - 725000) * 0.0515;
      // WA FHB (effective 21 March 2025)
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
      }
      if (foreignPurchaser) foreignSurcharge = value * 0.07;
      mortgageRegistrationFee = 192.50;
      transferFee = 205.30;
      break;
    }

    case "TAS": {
      if (value <= 3000) duty = 50;
      else if (value <= 25000) duty = 50 + (value - 3000) * 0.0175;
      else if (value <= 75000) duty = 435 + (value - 25000) * 0.0225;
      else if (value <= 200000) duty = 1560 + (value - 75000) * 0.035;
      else if (value <= 375000) duty = 5935 + (value - 200000) * 0.04;
      else if (value <= 725000) duty = 12935 + (value - 375000) * 0.0425;
      else duty = 27810 + (value - 725000) * 0.045;
      // TAS FHB: established homes ≤ $750k (full exemption)
      if (isFhb && isPpr && category === "established" && value <= 750000) {
        concession = duty; duty = 0;
      }
      if (foreignPurchaser) foreignSurcharge = value * 0.08;
      mortgageRegistrationFee = 158.20;
      transferFee = 232.80;
      break;
    }

    case "NT": {
      if (value <= 525000) {
        const v = value / 1000;
        duty = (0.06571441 * v * v) + (15 * v);
      } else if (value <= 3000000) duty = value * 0.0495;
      else if (value <= 5000000) duty = value * 0.0575;
      else duty = value * 0.0595;
      // NT FHB: up to $18,601 reduction for ≤ $650k
      if (isFhb && isPpr && value <= 650000) {
        const reduction = Math.min(duty, 18601);
        concession = reduction; duty -= reduction;
      }
      mortgageRegistrationFee = 149;
      transferFee = 149;
      break;
    }

    case "ACT": {
      if (isPpr) {
        if (value <= 260000) duty = value * 0.004;
        else if (value <= 300000) duty = 1040 + (value - 260000) * 0.022;
        else if (value <= 500000) duty = 1920 + (value - 300000) * 0.034;
        else if (value <= 750000) duty = 8720 + (value - 500000) * 0.0432;
        else if (value <= 1000000) duty = 19520 + (value - 750000) * 0.059;
        else if (value <= 1455000) duty = 34270 + (value - 1000000) * 0.064;
        else duty = value * 0.0454;
      } else {
        if (value <= 200000) duty = value * 0.012;
        else if (value <= 300000) duty = 2400 + (value - 200000) * 0.022;
        else if (value <= 500000) duty = 4600 + (value - 300000) * 0.034;
        else if (value <= 750000) duty = 11400 + (value - 500000) * 0.0432;
        else if (value <= 1000000) duty = 22200 + (value - 750000) * 0.059;
        else if (value <= 1455000) duty = 36950 + (value - 1000000) * 0.064;
        else duty = value * 0.0454;
      }
      // ACT FHB: full exemption up to $1,020,000 (PPR) from July 2025
      if (isFhb && isPpr && value <= 1020000) { concession = duty; duty = 0; }
      mortgageRegistrationFee = 170;
      transferFee = 454;
      break;
    }
  }

  return {
    duty: round(duty),
    concession: round(concession),
    foreignSurcharge: round(foreignSurcharge),
    mortgageRegistrationFee: round(mortgageRegistrationFee * 100) / 100,
    transferFee: round(transferFee * 100) / 100,
    total: round(duty + foreignSurcharge + mortgageRegistrationFee + transferFee),
  };
};

// ---------------------------------------------------------------------------
// LMI — detailed LVR-tier rates (approximating QBE/Helia base premium tables)
// ---------------------------------------------------------------------------
export interface LmiInput {
  loanAmount: number;
  propertyValue: number;
  isFirstHomeBuyer: boolean;
  occupancy: OccupancyType;
  state: AusState;
}

export interface LmiResult {
  required: boolean;
  premium: number;        // base LMI premium
  stampDutyOnLmi: number; // state stamp duty on LMI
  total: number;          // premium + stamp duty
  rate: number;           // applied premium rate (decimal)
  lvr: number;            // %
}

export const calculateLmi = (input: LmiInput): LmiResult => {
  const { loanAmount, propertyValue, isFirstHomeBuyer, occupancy, state } = input;
  if (propertyValue <= 0 || loanAmount <= 0) {
    return { required: false, premium: 0, stampDutyOnLmi: 0, total: 0, rate: 0, lvr: 0 };
  }
  const lvr = (loanAmount / propertyValue) * 100;
  if (lvr <= 80) {
    return { required: false, premium: 0, stampDutyOnLmi: 0, total: 0, rate: 0, lvr };
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

  // State stamp duty on LMI premium
  const stampDutyRate: Record<AusState, number> = {
    NSW: 0, VIC: 0.10, QLD: 0.09, SA: 0.11, WA: 0.10, TAS: 0.10, NT: 0.10, ACT: 0,
  };
  const stampDutyOnLmi = premium * stampDutyRate[state];

  return {
    required: true,
    premium: round(premium),
    stampDutyOnLmi: round(stampDutyOnLmi),
    total: round(premium + stampDutyOnLmi),
    rate,
    lvr,
  };
};
