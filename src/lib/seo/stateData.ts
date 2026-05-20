// Per-state SEO copy for calculator landing pages.
// Keep content under 200 words per state per calculator — long enough for
// uniqueness, short enough to maintain.

export type StateSlug = "nsw" | "vic" | "qld" | "wa" | "sa" | "tas" | "act" | "nt";

export const STATE_NAMES: Record<StateSlug, string> = {
  nsw: "New South Wales",
  vic: "Victoria",
  qld: "Queensland",
  wa: "Western Australia",
  sa: "South Australia",
  tas: "Tasmania",
  act: "Australian Capital Territory",
  nt: "Northern Territory",
};

export const STATE_AUTHORITY: Record<StateSlug, { name: string; url: string }> = {
  nsw: { name: "Revenue NSW", url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty" },
  vic: { name: "State Revenue Office Victoria", url: "https://www.sro.vic.gov.au/land-transfer-duty" },
  qld: { name: "Queensland Revenue Office", url: "https://qro.qld.gov.au/duties/transfer-duty/" },
  wa: { name: "RevenueWA", url: "https://www.wa.gov.au/organisation/department-of-finance/transfer-duty" },
  sa: { name: "RevenueSA", url: "https://www.revenuesa.sa.gov.au/stampduty" },
  tas: { name: "State Revenue Office Tasmania", url: "https://www.sro.tas.gov.au/property-transfer-duties" },
  act: { name: "ACT Revenue Office", url: "https://www.revenue.act.gov.au/duties/conveyance-duty" },
  nt: { name: "Territory Revenue Office", url: "https://nt.gov.au/property/home-owner-assistance/buying-a-home/stamp-duty" },
};

export interface StateStampDutyCopy {
  intro: string;
  thresholdHighlights: string[];
  faqs: { q: string; a: string }[];
}

export const STAMP_DUTY_BY_STATE: Record<StateSlug, StateStampDutyCopy> = {
  nsw: {
    intro:
      "Stamp duty (officially 'transfer duty') in New South Wales is one of the largest upfront costs when buying property. The rate is tiered and rises sharply above $1M. First home buyers may pay no duty on homes up to $800,000 and a concessional rate up to $1,000,000 under the First Home Buyers Assistance Scheme.",
    thresholdHighlights: [
      "FHB exemption: full exemption up to $800,000 (new or established)",
      "FHB concession: tapered up to $1,000,000",
      "Foreign purchaser surcharge: 9% additional",
      "Premium rate kicks in above ~$3.5M",
    ],
    faqs: [
      { q: "How much is stamp duty in NSW on a $700,000 home?", a: "An owner-occupier (non-FHB) pays roughly $26,500. A first home buyer qualifying for the assistance scheme pays $0 because the price is under the $800,000 exemption threshold." },
      { q: "Do first home buyers pay stamp duty in NSW?", a: "No, not on homes valued at $800,000 or less. Between $800,000 and $1,000,000 a tapered concession applies. Above $1,000,000 full duty is payable." },
      { q: "Is NSW stamp duty payable on off-the-plan apartments?", a: "Yes, but the duty is assessed on the value at contract date, not completion. FHB exemptions and concessions still apply if eligible." },
    ],
  },
  vic: {
    intro:
      "Victoria's land transfer duty is among the highest in the country at the top end, but Victoria also offers the most generous first home buyer concession. Owner-occupier first home buyers pay no duty on properties up to $600,000 and a sliding concession up to $750,000. Standard rates start at 1.4% and reach 6.5% above $2M.",
    thresholdHighlights: [
      "FHB full exemption: up to $600,000",
      "FHB concession: tapered $600,001-$750,000",
      "Principal place of residence concession on first $550,000",
      "Foreign purchaser surcharge: 8%",
    ],
    faqs: [
      { q: "How much is stamp duty in VIC on a $750,000 home?", a: "A non-FHB owner-occupier pays around $40,000. A first home buyer pays $0 thanks to the VIC FHB exemption that covers the full $750,000 threshold." },
      { q: "What's the difference between the VIC FHB grant and stamp duty exemption?", a: "Two separate things. The $10,000 First Home Owner Grant is for new builds only. The stamp duty exemption/concession applies to new or established homes under $750,000." },
      { q: "Does VIC charge stamp duty on land for an owner-builder?", a: "Yes, transfer duty is payable on the land value at settlement, with construction excluded. FHB concessions on vacant land may apply separately." },
    ],
  },
  qld: {
    intro:
      "Queensland uses 'transfer duty' on property purchases, with a separate concessional rate for homes used as a principal place of residence. First home buyers in QLD can pay zero duty on homes up to $700,000, and reduced duty up to $800,000 (recently expanded from $550k/$650k).",
    thresholdHighlights: [
      "FHB full exemption: up to $700,000 (raised 2024)",
      "FHB concession: tapered up to $800,000",
      "Home concession (non-FHB owner-occupier): on first $350,000",
      "Foreign purchaser additional duty: 8%",
    ],
    faqs: [
      { q: "How much is stamp duty in QLD on a $650,000 home for a first home buyer?", a: "$0 — under the expanded threshold introduced in 2024, FHBs pay no duty on homes up to $700,000." },
      { q: "Is the QLD home concession the same as the FHB concession?", a: "No. The home concession is for any owner-occupier and reduces the rate on the first $350k. The FHB concession adds a further reduction, but only first home buyers can claim it." },
      { q: "Does QLD charge stamp duty on vacant land?", a: "Yes. FHBs building their first home may claim a separate vacant land concession on land valued up to $500,000." },
    ],
  },
  wa: {
    intro:
      "Western Australia's transfer duty has separate residential and general rates. First home buyers benefit from a concession on homes up to $530,000 (full exemption to $450,000) and on vacant land up to $400,000. Established home FHOG is not available in WA — only new builds qualify for the $10,000 grant.",
    thresholdHighlights: [
      "FHB exemption: up to $450,000 home value",
      "FHB concession: tapered $450,001-$530,000",
      "Vacant land FHB exemption: up to $300,000",
      "Foreign buyer surcharge: 7%",
    ],
    faqs: [
      { q: "How much is stamp duty in WA on a $500,000 home for a first home buyer?", a: "Around $13,400 — a concession applies between $450k and $530k. A non-FHB would pay roughly $17,765 at residential rates." },
      { q: "Is the WA FHOG available for established homes?", a: "No. The $10,000 First Home Owner Grant in WA applies only to newly constructed or substantially renovated homes." },
      { q: "Does WA charge a foreign buyer duty surcharge?", a: "Yes, an additional 7% applies to residential purchases by foreign persons, on top of standard transfer duty." },
    ],
  },
  sa: {
    intro:
      "South Australia removed stamp duty for first home buyers purchasing new homes in 2023 — there is no price cap on this exemption, making SA uniquely generous for FHBs buying new. Established home buyers still pay standard rates that rise to 5.5% above $500,000.",
    thresholdHighlights: [
      "FHB new home: full stamp duty exemption (no price cap)",
      "FHB vacant land: full exemption if building first home",
      "Established home FHB: standard rates apply",
      "Foreign ownership surcharge: 7%",
    ],
    faqs: [
      { q: "Do first home buyers pay stamp duty in SA?", a: "Not on new builds — SA scrapped the cap in 2023. FHBs buying established homes pay standard rates." },
      { q: "How much is stamp duty in SA on a $600,000 established home?", a: "Approximately $26,830 at standard residential rates. No FHB concession applies to established homes in SA." },
      { q: "Can SA first home buyers stack the grant and the stamp duty exemption?", a: "Yes — eligible FHBs can claim both the $15,000 FHOG (new builds, capped value) and the stamp duty exemption (new builds, no cap)." },
    ],
  },
  tas: {
    intro:
      "Tasmania charges 'duty on property transfers' with rates that top out at 4.5% above $725,000. First home buyers receive a 100% duty concession on established homes up to $750,000 (extended through 2026) and the $10,000 FHOG applies to new builds.",
    thresholdHighlights: [
      "FHB concession: 100% duty waiver on established homes up to $750,000",
      "FHOG: $10,000 for new builds (no price cap)",
      "Pensioner downsizer concession: 50% reduction up to $600,000",
      "Foreign purchaser surcharge: 8%",
    ],
    faqs: [
      { q: "Do Tasmanian first home buyers pay stamp duty?", a: "No — eligible FHBs purchasing established homes up to $750,000 receive a 100% concession. The waiver was extended to mid-2026." },
      { q: "How much is stamp duty in TAS on a $500,000 home for a non-FHB?", a: "Around $18,247 at standard rates." },
      { q: "Is the TAS FHOG available for established homes?", a: "No, only newly constructed homes. The stamp duty concession is the FHB benefit for established purchases." },
    ],
  },
  act: {
    intro:
      "The ACT uses an income-tested conveyance duty system unique among Australian jurisdictions. The Home Buyer Concession Scheme can reduce duty to zero for eligible buyers based on household income (currently capped at $250,000 gross), regardless of whether it's a new or established home, and with no price cap on the property.",
    thresholdHighlights: [
      "Home Buyer Concession: $0 duty if household income under $250,000",
      "Income cap increases with dependants",
      "No property price cap (unlike most other states)",
      "Standard rates start at 0.6% on first $260,000",
    ],
    faqs: [
      { q: "How does the ACT Home Buyer Concession work?", a: "It's income-tested: if your household income is under the threshold ($250,000 base, plus increments per dependant), you pay no conveyance duty regardless of property price. You must not have owned property in the last 2 years." },
      { q: "Is there a price cap on the ACT FHB concession?", a: "No — unlike NSW, VIC and QLD which cap by property value, the ACT caps by household income only. This makes it especially favourable for high-cost suburbs." },
      { q: "Do ACT buyers also get the FHOG?", a: "The FHOG was abolished in the ACT in 2019 and replaced by the income-tested Home Buyer Concession Scheme." },
    ],
  },
  nt: {
    intro:
      "The Northern Territory has the lowest entry threshold for stamp duty in Australia but offers targeted concessions including the BuildBonus grant and a House and Land Package exemption for principal place of residence purchases.",
    thresholdHighlights: [
      "House and Land exemption: up to $650,000 (PPR)",
      "First Home Owner Grant: $10,000 for new builds",
      "Stamp duty applies from $0 (no general threshold)",
      "BuildBonus grant ($30,000) periodically available for new builds",
    ],
    faqs: [
      { q: "How much is stamp duty in NT on a $500,000 home?", a: "Approximately $23,929 at standard rates. The House and Land Package exemption may apply if buying a new build as a principal place of residence." },
      { q: "What is the NT House and Land Package exemption?", a: "A full stamp duty exemption on new house-and-land packages up to $650,000 purchased as a principal place of residence, including first home buyers and other owner-occupiers." },
      { q: "Is the NT FHOG available for established homes?", a: "No, only for newly constructed homes. Established home FHBs may still access the House and Land exemption if the build is new." },
    ],
  },
};

export interface StateGrantsCopy {
  intro: string;
  highlights: string[];
  faqs: { q: string; a: string }[];
}

export const GRANTS_BY_STATE: Record<StateSlug, StateGrantsCopy> = {
  nsw: {
    intro:
      "First home buyers in NSW can stack three major incentives: the $10,000 First Home Owner Grant (FHOG) for new builds, the First Home Buyers Assistance Scheme (stamp duty exemption up to $800k), and the federal Home Guarantee Scheme allowing a 5% deposit without LMI. Help to Buy shared equity is also available from 2024.",
    highlights: [
      "FHOG: $10,000 for new homes under $600k (or new build under $750k)",
      "Stamp duty exemption: up to $800,000",
      "Home Guarantee Scheme: 5% deposit, no LMI",
      "Help to Buy: federal shared equity (up to 40% new / 30% existing)",
    ],
    faqs: [
      { q: "Can I get the FHOG and stamp duty exemption in NSW?", a: "Yes — the two schemes are independent. If you buy a new home under $600k as a FHB, you can claim both the $10,000 grant and full stamp duty exemption." },
      { q: "What is the property price cap for the 5% deposit scheme in NSW?", a: "$900,000 in Sydney, Newcastle, Lake Macquarie, Illawarra; $750,000 in the rest of NSW (2024-25 caps)." },
      { q: "Is the NSW FHOG available for established homes?", a: "No, only newly built or substantially renovated homes. Established home FHBs rely on the stamp duty exemption instead." },
    ],
  },
  vic: {
    intro:
      "Victorian first home buyers get the country's most generous stamp duty package (full exemption up to $600k, concession to $750k), plus a $10,000 FHOG on new regional builds (boosted to $20,000 in regional VIC). Federal Home Guarantee Scheme and Help to Buy stack on top.",
    highlights: [
      "Stamp duty: full exemption to $600k, concession to $750k",
      "FHOG: $10,000 metro / $20,000 regional (new builds only)",
      "Home Guarantee Scheme: 5% deposit, no LMI",
      "VIC Homebuyer Fund: state shared equity up to 25%",
    ],
    faqs: [
      { q: "How much can a VIC first home buyer save in total?", a: "On a new $600k regional build, FHBs can save the $10k+ grant, full stamp duty (~$31k), and LMI (~$15k) — over $55,000 in concessions." },
      { q: "What's the VIC Homebuyer Fund?", a: "A state shared-equity scheme: the government contributes up to 25% of the purchase price in exchange for a proportional share of the property. You buy them out later (or on sale)." },
      { q: "Property price cap for the 5% deposit scheme in VIC?", a: "$800,000 in Melbourne and Geelong; $650,000 elsewhere in Victoria." },
    ],
  },
  qld: {
    intro:
      "Queensland first home buyers benefit from a $30,000 FHOG (boosted from $15k through mid-2025) for new builds, plus a stamp duty exemption that was expanded in 2024 to cover homes up to $700,000 fully, with concessions up to $800,000.",
    highlights: [
      "FHOG: $30,000 (boosted) for new homes under $750k",
      "Stamp duty: full exemption up to $700,000 (raised 2024)",
      "Home Guarantee Scheme: 5% deposit, no LMI",
      "First Home Concession (home concession): on any owner-occupier purchase",
    ],
    faqs: [
      { q: "Is the QLD $30,000 FHOG permanent?", a: "It's a temporary boost from the previous $15,000 level, applying to contracts signed between 20 November 2023 and 30 June 2025. Confirm current eligibility at QRO." },
      { q: "Can I get the QLD FHOG for an established home?", a: "No, only new builds. Buyers of established homes rely on the stamp duty concession instead." },
      { q: "Property price cap for the 5% deposit scheme in QLD?", a: "$700,000 in Brisbane and Gold Coast/Sunshine Coast; $550,000 in the rest of QLD." },
    ],
  },
  wa: {
    intro:
      "WA first home buyers receive a $10,000 FHOG for new builds (with a metro price cap of $750k south of the 26th parallel, higher north) plus a stamp duty exemption up to $450,000 and tapered concession to $530,000. The federal 5% deposit scheme stacks on top.",
    highlights: [
      "FHOG: $10,000 for new homes (metro cap $750k)",
      "Stamp duty: full exemption to $450k, concession to $530k",
      "Home Guarantee Scheme: 5% deposit, no LMI",
      "Keystart loans: low deposit option without LMI (state-backed)",
    ],
    faqs: [
      { q: "What is Keystart in WA?", a: "A state-backed lender offering home loans with low deposits (typically 2%) and no LMI, with eligibility based on income caps. An alternative to the federal Home Guarantee Scheme." },
      { q: "Can WA FHBs get the FHOG on established homes?", a: "No, only on newly constructed or substantially renovated homes. The grant was restricted to new builds in 2013." },
      { q: "Property price cap for the 5% deposit scheme in WA?", a: "$600,000 in Perth; $450,000 in the rest of WA." },
    ],
  },
  sa: {
    intro:
      "South Australian first home buyers receive the most generous stamp duty treatment in the country on new builds (zero duty, no price cap) plus a $15,000 FHOG for new homes valued under $650,000.",
    highlights: [
      "FHOG: $15,000 for new homes under $650k",
      "Stamp duty: full exemption on new builds (no cap)",
      "Home Guarantee Scheme: 5% deposit, no LMI",
      "HomeStart Finance: state lender with low deposit options",
    ],
    faqs: [
      { q: "Can SA first home buyers really pay zero stamp duty?", a: "Yes — on new builds and vacant land where you'll build your first home, with no upper price cap. Established home FHBs pay standard rates." },
      { q: "Property price cap for the 5% deposit scheme in SA?", a: "$600,000 in Adelaide; $450,000 in the rest of SA." },
      { q: "What is HomeStart Finance?", a: "An SA government-owned lender offering low-deposit home loans (from 3%) without LMI for eligible South Australians." },
    ],
  },
  tas: {
    intro:
      "Tasmanian first home buyers receive a $10,000 FHOG on new builds (extended through mid-2026) plus a 100% stamp duty concession on established homes up to $750,000. The combination makes Tasmania one of the easier states for FHBs in absolute dollar terms.",
    highlights: [
      "FHOG: $10,000 for new homes (no price cap)",
      "Stamp duty: 100% concession on established homes to $750k",
      "Home Guarantee Scheme: 5% deposit, no LMI",
      "MyHome shared equity scheme: up to 40% government contribution",
    ],
    faqs: [
      { q: "Is the Tasmanian FHB stamp duty concession permanent?", a: "It's been extended several times; the current extension runs through 30 June 2026. Check the State Revenue Office for updates." },
      { q: "What's the TAS MyHome shared equity scheme?", a: "A state shared equity program providing up to 40% of the purchase price for eligible buyers, repayable over time or on sale." },
      { q: "Property price cap for the 5% deposit scheme in TAS?", a: "$600,000 in Hobart; $450,000 in the rest of TAS." },
    ],
  },
  act: {
    intro:
      "The ACT replaced its FHOG with the income-tested Home Buyer Concession Scheme in 2019. Eligible buyers (household income under ~$250k) pay zero conveyance duty regardless of property price. The federal Home Guarantee Scheme and Help to Buy also apply.",
    highlights: [
      "FHOG: abolished — replaced by Home Buyer Concession",
      "Home Buyer Concession: zero duty if income under threshold",
      "No property price cap on the concession",
      "Home Guarantee Scheme: 5% deposit, no LMI",
    ],
    faqs: [
      { q: "What replaced the ACT FHOG?", a: "The Home Buyer Concession Scheme: income-tested rather than price-tested, removing duty entirely for eligible lower-and-middle income households." },
      { q: "Income cap for the ACT Home Buyer Concession?", a: "$250,000 gross household income (base), increased by ~$3,330 per dependant up to 5 dependants. Reviewed annually." },
      { q: "Property price cap for the 5% deposit scheme in ACT?", a: "$750,000 across the ACT (no regional split)." },
    ],
  },
  nt: {
    intro:
      "Northern Territory first home buyers can access the $10,000 FHOG on new builds, the House and Land Package exemption (stamp duty waiver up to $650,000 PPR), and periodically the BuildBonus grant ($30k for new construction).",
    highlights: [
      "FHOG: $10,000 for new homes (no price cap)",
      "House and Land exemption: stamp duty waiver up to $650k PPR",
      "BuildBonus: $30,000 (when scheme is open) for new builds",
      "Home Guarantee Scheme: 5% deposit, no LMI",
    ],
    faqs: [
      { q: "What is the NT BuildBonus grant?", a: "A $30,000 grant for new home construction, periodically opened and capped by funding allocation. Check the Territory Revenue Office for current availability." },
      { q: "Can NT FHBs claim both the FHOG and the House and Land exemption?", a: "Yes — they're separate schemes and can be stacked on eligible new builds purchased as a principal place of residence." },
      { q: "Property price cap for the 5% deposit scheme in NT?", a: "$600,000 in Darwin; $550,000 in the rest of NT." },
    ],
  },
};
