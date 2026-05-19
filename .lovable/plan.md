## Goal

Merge Claude's audited calculator engine (FY26-27 rates, B1–B12 fixes, new calculators, sources/assumptions metadata) into this Lovable repo **without changing the look or structure** of the existing pages, headers, navigation, or guides.

## What stays exactly as-is

- `Navigation.tsx`, `Footer.tsx`, `Home.tsx`, `Calculators.tsx` category layout
- All 13 guide pages and their copy
- Loan-type pages, FAQ, Sponsors, Disclaimer, Privacy, Terms
- SEO component, brand voice, "Your Home Loan Specialists" positioning
- Lead form + Pipedrive edge function
- Tailwind tokens / design system

## What gets replaced or added

### 1. Calculation engine (foundation — batch 1)
- Rewrite `src/lib/calculations.ts` from Claude's `calculator-engine` source:
  - Audit fixes B1–B12
  - FY26-27 tax brackets, Medicare levy, LITO
  - State-specific stamp duty (NSW foreign 9%, QLD AFAD 8%, NSW LMI duty 9%, full VIC FHB exemption ≤ $750k, ACT FHB $1.02M cap, etc.)
  - LMI matrix, LVR tiers
  - `CalcResult<T>` wrapper with `sources[]`, `assumptions[]`, `fyYear`, `engineVersion`
- Add `src/lib/calculations/` sub-modules if the engine is split (one file per calc), re-exported from `calculations.ts` so existing imports keep working.

### 2. Wire existing 16 calculators to new engine (batch 2)
- Update each `src/pages/calculators/*.tsx` to call new engine functions.
- Keep input fields, labels, and result section structure identical.
- Add a small reusable `<SourceCitationFooter sources assumptions fyYear />` rendered under each result block — visually subtle, matches current card style.

### 3. New calculators (batch 3)
Add five pages + routes + cards on `/calculators`:
- Land Tax Calculator
- Loan Consolidation Calculator
- Deposit Savings Calculator
- Help to Buy Calculator
- 5% Deposit Scheme Calculator (Home Guarantee Scheme)

Each follows the existing page template (Navigation → hero → inputs card → results card → CTASection → Footer) so headers, breadcrumbs, and link patterns are uniform.

### 4. Cross-reference + freshness (batch 4)
- Update `RatesFreshness.tsx` with new FY year + engine version
- Update `StateComparison.tsx` and `InputChecklist.tsx` to include new calculators
- Add the new calculators to `sitemap.xml` and `Calculators.tsx` category grid
- Update guide cross-links

## Technical notes

- Keep numeric inputs as empty strings + `Number(val) || 0` (existing convention).
- All result metadata typed as `CalcResult<T> = { value: T; sources: Source[]; assumptions: string[]; fyYear: string; engineVersion: string }`.
- No backend changes. No new dependencies expected.
- Type-check after each batch before moving to the next.
- I'll post a freshness log at the very end (per your earlier preference).

## Sequence

```text
Batch 1: engine port + type-check
Batch 2: wire 16 existing calculators + SourceCitationFooter
Batch 3: 5 new calculators + routes + Calculators.tsx cards
Batch 4: freshness, sitemap, state comparison, checklist, guide links
Freshness log
```

## What I need from you next

Upload the engine `src/` files (drop them all in one message — labelled "Batch 1 of X" if split). Once I have them I start with Batch 1 and won't pause for approval between batches unless I hit a real ambiguity.