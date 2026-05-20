## Background

There is no `mortgage_calculator_suite` module in the repo. The existing 15 calculators live under `src/pages/calculators/*`. The two genuinely state-dependent ones are **Stamp Duty** and **Government Grants** (Upfront Costs also includes stamp duty but is broader).

For SEO, the best 12-page expansion is **per-state landing pages** of the two state-sensitive calculators. They each target a high-intent long-tail keyword (e.g. "stamp duty calculator NSW", "first home owner grant VIC") that the single generic page can't rank for well.

## Proposed 12 pages

Stamp Duty Calculator — one per state/territory (8):
- `/calculators/stamp-duty/nsw`
- `/calculators/stamp-duty/vic`
- `/calculators/stamp-duty/qld`
- `/calculators/stamp-duty/wa`
- `/calculators/stamp-duty/sa`
- `/calculators/stamp-duty/tas`
- `/calculators/stamp-duty/act`
- `/calculators/stamp-duty/nt`

Government Grants Calculator — one per state for the four highest-volume (4):
- `/calculators/government-grants/nsw`
- `/calculators/government-grants/vic`
- `/calculators/government-grants/qld`
- `/calculators/government-grants/wa`

Total: **12 new routes**.

## How each page works

- Reuses the existing `StampDutyCalculator` / `GovernmentGrantsCalculator` components but pre-selects and **locks** the state to the page's state.
- Per-page `<Helmet>` block with state-specific `<title>`, meta description, canonical, and `WebPage` + `BreadcrumbList` JSON-LD.
- State-specific intro copy (H1, ~120-word explainer, current rates/thresholds summary table, "last updated" date) above the calculator — this is the content that earns rankings.
- FAQ section using `FAQPage` JSON-LD with 3-4 state-specific questions ("How much is stamp duty in NSW for a $700k home?", "Does VIC waive stamp duty for first home buyers?", etc.).
- Internal links: each state page links to the other state variants and back to the generic calculator.

## Wiring

- Add a `StateCalculatorPage` wrapper component that takes `{ state, calculator }` props, renders Helmet + intro + locked calculator + FAQ.
- Add 12 routes in `src/App.tsx`.
- Update `scripts/generate-sitemap.ts` `entries` array to include all 12 URLs.
- Add the new pages to the calculator index / navigation grid so they're discoverable.

## Out of scope

- No backend or engine changes — uses existing state-aware logic in `src/lib/engine/*`.
- No new content for the other 13 calculators; they remain a single page each.
- No changes to the existing generic `/calculators/stamp-duty` and `/calculators/government-grants` pages beyond adding internal links to the new state variants.

## Confirm before I build

1. Are the 12 routes above the right split, or do you want 6 states × 2 calcs (drop ACT/NT, add VIC/QLD/SA/TAS grants)?
2. OK to **lock** the state selector on each per-state page (vs. just pre-selecting it)?
