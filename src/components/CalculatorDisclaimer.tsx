import { Link } from "react-router-dom";
import { AlertTriangle, Info, MapPin, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type DisclaimerKind =
  | "borrowing-power"
  | "repayment"
  | "serviceability"
  | "stamp-duty"
  | "lmi"
  | "upfront-costs"
  | "government-grants"
  | "comprehensive"
  | "investment-property"
  | "negative-gearing"
  | "capital-gains"
  | "depreciation"
  | "refinance"
  | "extra-repayments"
  | "lender-comparison";

type Section = { title: string; bullets: string[] };

const COMMON_GENERAL = [
  "Results are estimates only, based on the values you enter and general assumptions.",
  "Rates, fees, taxes and government rules change — always confirm current figures before making a decision.",
  "This is not financial, tax or legal advice.",
];

const COMMON_ADVICE = [
  "Speak with a licensed HALP mortgage broker before committing to a loan or property purchase.",
  "Consult a registered tax agent for tax matters and a licensed conveyancer or solicitor for legal/settlement questions.",
];

const STATE_RULES: Section = {
  title: "State & territory rules",
  bullets: [
    "Stamp duty, land tax and concessions differ across NSW, VIC, QLD, WA, SA, TAS, ACT and NT.",
    "First Home Buyer (FHB) concessions and exemptions have property price caps and residency requirements that vary by state.",
    "VIC FHB owner-occupiers receive a full stamp duty exemption up to $750k (with concessions to $1m).",
    "Foreign buyer surcharges, FIRB approval and additional duties may apply for non-residents — not included by default.",
  ],
};

const GRANT_RULES: Section = {
  title: "Government grants & schemes",
  bullets: [
    "Eligibility for FHOG, FHSS, Help to Buy and the Home Guarantee Scheme (5% deposit) depends on income, citizenship/residency, property type, price and your status as a first home buyer.",
    "Property price caps for the Home Guarantee Scheme are set by region and updated periodically.",
    "Grant amounts and rules are set by federal and state governments and can change without notice.",
    "Grants typically require the property to be your principal place of residence for a minimum period.",
  ],
};

const SPECIFIC: Record<DisclaimerKind, Section[]> = {
  "borrowing-power": [
    {
      title: "How this is calculated",
      bullets: [
        "Uses your stated income, expenses and existing debts against a generic serviceability formula.",
        "Lenders apply a stress-test buffer (currently around 3%) above the actual rate — your real borrowing power may be lower.",
        "Each lender uses different income shading (e.g. bonus, overtime, rental, self-employed) and HEM benchmarks.",
      ],
    },
  ],
  repayment: [
    {
      title: "How this is calculated",
      bullets: [
        "Assumes a constant interest rate over the full term — real rates change.",
        "Principal & Interest and Interest Only repayments are modelled separately; switching mid-loan changes the schedule.",
        "Does not include account fees, redraw, offset interactions or lender-specific rounding.",
      ],
    },
  ],
  serviceability: [
    {
      title: "How this is calculated",
      bullets: [
        "Applies a generic serviceability buffer and HEM-style living expense benchmark.",
        "Lender policies differ on income types, dependents, credit card limits and HELP/HECS treatment.",
        "A pass here does not guarantee lender approval.",
      ],
    },
  ],
  "stamp-duty": [
    {
      title: "How this is calculated",
      bullets: [
        "Uses published general rates and standard FHB concessions for each state/territory.",
        "Does not include foreign buyer surcharges, off-the-plan concessions, or pensioner/regional discounts unless stated.",
        "Mortgage registration and transfer fees are shown separately where applicable.",
      ],
    },
    STATE_RULES,
  ],
  lmi: [
    {
      title: "How this is calculated",
      bullets: [
        "LMI rates are indicative only and vary significantly between insurers (Helia, QBE) and lenders.",
        "Premiums depend on LVR tier, loan amount, property type, borrower type and whether the loan is owner-occupier or investment.",
        "LMI may be waived for eligible professionals, FHB scheme participants and high-deposit borrowers — speak to a broker about waivers.",
      ],
    },
  ],
  "upfront-costs": [
    {
      title: "How this is calculated",
      bullets: [
        "Combines deposit, stamp duty, LMI estimate, conveyancing, building & pest, loan fees and government registration fees.",
        "Conveyancing and inspection fees use typical Australian ranges — your providers may quote differently.",
      ],
    },
    STATE_RULES,
    GRANT_RULES,
  ],
  "government-grants": [GRANT_RULES, STATE_RULES],
  comprehensive: [
    {
      title: "How this is calculated",
      bullets: [
        "Combines borrowing power, repayments, stamp duty, LMI, upfront costs and grants into a single view.",
        "Each module uses the same assumptions noted on its individual calculator.",
      ],
    },
    STATE_RULES,
    GRANT_RULES,
  ],
  "investment-property": [
    {
      title: "How this is calculated",
      bullets: [
        "Projects rent, expenses, interest and depreciation — actual returns depend on market, vacancy and management costs.",
        "Tax treatment depends on your individual marginal rate and ownership structure.",
      ],
    },
  ],
  "negative-gearing": [
    {
      title: "How this is calculated",
      bullets: [
        "Models the tax effect of a rental loss against your other taxable income.",
        "Assumes current ATO rules; legislative changes can alter deductibility.",
      ],
    },
  ],
  "capital-gains": [
    {
      title: "How this is calculated",
      bullets: [
        "Applies the 50% CGT discount for individuals holding the asset over 12 months.",
        "Does not model main-residence exemption, foreign-resident CGT rules or partial-period exemptions in detail.",
      ],
    },
  ],
  depreciation: [
    {
      title: "How this is calculated",
      bullets: [
        "Uses generic capital works (Division 43) and plant & equipment (Division 40) assumptions.",
        "A qualified Quantity Surveyor's report is required for ATO purposes.",
        "Plant & equipment rules are restricted for second-hand residential properties acquired after 9 May 2017.",
      ],
    },
  ],
  refinance: [
    {
      title: "How this is calculated",
      bullets: [
        "Compares your current loan against an indicative new loan — does not include all switching costs (discharge, settlement, valuation, LMI re-payable if LVR > 80%).",
        "Cashback offers have conditions and clawback periods.",
      ],
    },
  ],
  "extra-repayments": [
    {
      title: "How this is calculated",
      bullets: [
        "Assumes extra repayments are applied on schedule and not redrawn.",
        "Some fixed-rate loans cap extra repayments — check your product's terms.",
      ],
    },
  ],
  "lender-comparison": [
    {
      title: "How this is calculated",
      bullets: [
        "Lender rates and fees shown are indicative only and change frequently.",
        "Comparison rate is based on a $150,000 loan over 25 years and may not reflect your actual scenario.",
        "Some lenders have restricted policy (e.g. postcodes, employment types) not modelled here.",
      ],
    },
  ],
};

interface CalculatorDisclaimerProps {
  kind: DisclaimerKind;
  className?: string;
}

const CalculatorDisclaimer = ({ kind, className }: CalculatorDisclaimerProps) => {
  const specific = SPECIFIC[kind] ?? [];

  const sectionIcon = (title: string) => {
    if (title.toLowerCase().includes("state")) return MapPin;
    if (title.toLowerCase().includes("grant")) return Info;
    return Scale;
  };

  return (
    <Card className={`mt-8 border-amber-200 bg-amber-50/40 dark:bg-amber-950/10 ${className ?? ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden />
          Important: please read before relying on these numbers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <section>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Info className="h-4 w-4 text-amber-600" aria-hidden />
            General
          </h4>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            {COMMON_GENERAL.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        {specific.map((s) => {
          const Icon = sectionIcon(s.title);
          return (
            <section key={s.title}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-amber-600" aria-hidden />
                {s.title}
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          );
        })}

        <section>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Scale className="h-4 w-4 text-amber-600" aria-hidden />
            Get advice before you commit
          </h4>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            {COMMON_ADVICE.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 text-muted-foreground">
            Ready to talk to a real person?{" "}
            <Link to="/apply" className="text-primary font-medium underline-offset-2 hover:underline">
              Talk to a HALP broker
            </Link>
            .
          </p>
        </section>
      </CardContent>
    </Card>
  );
};

export default CalculatorDisclaimer;
