import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Gift, ArrowLeft, CheckCircle2, XCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { calculateGovernmentGrants, FHOG_BY_STATE, PRICE_CAPS } from "@/lib/engine/grants";
import { calculateStampDuty } from "@/lib/engine/property";
import type { AusState } from "@/lib/engine";

type Region = "capital" | "regional" | "rest";

const STATE_LABELS: Record<AusState, string> = {
  NSW: "New South Wales", VIC: "Victoria", QLD: "Queensland", SA: "South Australia",
  WA: "Western Australia", TAS: "Tasmania", NT: "Northern Territory", ACT: "Australian Capital Territory",
};

const GovernmentGrantsCalculator = () => {
  // Core inputs
  const [propertyValue, setPropertyValue] = useState<string | number>(650000);
  const [deposit, setDeposit] = useState<string | number>(50000);
  const [state, setState] = useState<AusState>("NSW");
  const [region, setRegion] = useState<Region>("capital");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState(true);
  const [newProperty, setNewProperty] = useState(true);
  const [isRegional, setIsRegional] = useState(false);

  // Optional streams
  const [isSingleParent, setIsSingleParent] = useState(false);
  const [evaluateHelpToBuy, setEvaluateHelpToBuy] = useState(false);
  const [isCouple, setIsCouple] = useState(false);
  const [householdIncome, setHouseholdIncome] = useState<string | number>(95000);

  const [evaluateFhss, setEvaluateFhss] = useState(false);
  const [fhssAnnualContribution, setFhssAnnualContribution] = useState<string | number>(15000);
  const [fhssYearsContributing, setFhssYearsContributing] = useState<string | number>(3);

  const pv = Number(propertyValue) || 0;
  const dep = Number(deposit) || 0;

  const calc = calculateGovernmentGrants({
    state,
    region,
    propertyValue: pv,
    deposit: dep,
    isFirstHomeBuyer: firstHomeBuyer,
    newProperty,
    isRegional,
    isSingleParent,
    evaluateHelpToBuy,
    householdIncome: Number(householdIncome) || 0,
    isCouple,
    evaluateFhss,
    fhssAnnualContribution: Number(fhssAnnualContribution) || 0,
    fhssYearsContributing: Number(fhssYearsContributing) || 0,
  });

  const r = calc.result;
  const depositPctNum = pv > 0 ? (dep / pv) * 100 : 0;
  const depositPct = depositPctNum.toFixed(1);
  const caps = PRICE_CAPS[state];

  // ── Per-stream context for the breakdown rows ──────────────────────────────
  const fhogRule = FHOG_BY_STATE[state];
  const fhogCashAmount = (isRegional && fhogRule.regionalSplit) ? fhogRule.regionalSplit.regional : fhogRule.amount;

  const dutyNoFhb = calculateStampDuty({
    value: pv, state, isFirstHomeBuyer: false, occupancy: "owner-occupier",
    category: newProperty ? "new" : "established",
  }).result.duty;
  const dutyAsFhb = calculateStampDuty({
    value: pv, state, isFirstHomeBuyer: firstHomeBuyer, occupancy: "owner-occupier",
    category: newProperty ? "new" : "established",
  }).result.duty;

  const depositCap = caps[region];
  const minDepositPct = isSingleParent ? 2 : 5;
  const htbIncomeCap = isCouple ? 160000 : 100000;
  const htbEquityPct = newProperty ? 40 : 30;
  const incomeNum = Number(householdIncome) || 0;
  const HTB_STATES: AusState[] = ["NSW", "VIC", "QLD", "SA", "ACT", "NT", "WA"];

  const fhssAnnualCapped = Math.min(Number(fhssAnnualContribution) || 0, 15000);
  const fhssGrossContrib = fhssAnnualCapped * (Number(fhssYearsContributing) || 0);

  // Tiny row helper for breakdown tables
  const Row = ({ label, value, ok }: { label: string; value: React.ReactNode; ok?: boolean }) => (
    <div className="flex justify-between items-baseline gap-3 text-xs py-1 border-b border-border/40 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${ok === true ? "text-green-700" : ok === false ? "text-destructive" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );

  // ── Per-stream source citations (state-aware where relevant) ──────────────
  const FHOG_SOURCES: Record<AusState, { label: string; url: string }> = {
    NSW: { label: "Revenue NSW — First Home Owner (New Homes) Grant", url: "https://www.revenue.nsw.gov.au/grants-schemes/first-home-owner" },
    VIC: { label: "SRO Victoria — First Home Owner Grant", url: "https://www.sro.vic.gov.au/first-home-owner" },
    QLD: { label: "QRO — First Home Owner Grant", url: "https://qro.qld.gov.au/property-concessions-grants/first-home-grant/" },
    SA:  { label: "RevenueSA — First Home Owner Grant", url: "https://www.revenuesa.sa.gov.au/grants-and-concessions/first-home-owners" },
    WA:  { label: "RevenueWA — First Home Owner Grant", url: "https://www.wa.gov.au/organisation/department-of-finance/first-home-owner-grant" },
    TAS: { label: "SRO Tasmania — First Home Owner Grant", url: "https://www.sro.tas.gov.au/first-home-owner" },
    NT:  { label: "Territory Revenue Office — HomeGrown Territory Grant", url: "https://nt.gov.au/property/home-owner-assistance" },
    ACT: { label: "ACT Revenue Office — Home Buyer Concession Scheme", url: "https://www.revenue.act.gov.au/home-buyer-assistance" },
  };
  const STAMP_DUTY_SOURCES: Record<AusState, { label: string; url: string }> = {
    NSW: { label: "Revenue NSW — Transfer Duty & FHB Assistance Scheme", url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty" },
    VIC: { label: "SRO Victoria — Land Transfer Duty (FHB exemption ≤ $750k)", url: "https://www.sro.vic.gov.au/land-transfer-duty" },
    QLD: { label: "QRO — Transfer Duty & First Home Concession", url: "https://qro.qld.gov.au/duties/transfer-duty/concessions/homes/" },
    SA:  { label: "RevenueSA — Stamp Duty (FHB relief from Jun 2024)", url: "https://www.revenuesa.sa.gov.au/stampduty" },
    WA:  { label: "RevenueWA — Transfer Duty & First Home Owner Rate", url: "https://www.wa.gov.au/organisation/department-of-finance/transfer-duty" },
    TAS: { label: "SRO Tasmania — Duty Concessions", url: "https://www.sro.tas.gov.au/property-transfer-duties" },
    NT:  { label: "Territory Revenue Office — Stamp Duty", url: "https://nt.gov.au/employ/money-and-taxes/stamp-duty" },
    ACT: { label: "ACT Revenue Office — Home Buyer Concession Scheme (≤ $1.02M)", url: "https://www.revenue.act.gov.au/duties/conveyance-duty" },
  };
  const DEPOSIT_SCHEME_SOURCE = { label: "Housing Australia — Australian Government 5% Deposit Scheme (eff. 1 Oct 2025)", url: "https://www.housingaustralia.gov.au/" };
  const HELP_TO_BUY_SOURCE   = { label: "Treasury — Help to Buy (Shared Equity, applications opened 5 Dec 2025)", url: "https://treasury.gov.au/policy-topics/housing/home-ownership-support" };
  const FHSS_SOURCE          = { label: "ATO — First Home Super Saver Scheme", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/early-access-to-super/first-home-super-saver-scheme" };

  const SourceList = ({ items }: { items: { label: string; url: string }[] }) => (
    <div className="mt-3 pt-2 border-t border-border/40">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground/70 mb-1 font-semibold">Sources</p>
      <ul className="space-y-0.5">
        {items.map((s, i) => (
          <li key={i} className="text-[11px] leading-snug">
            <a href={s.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // ── Eligibility checklist: criterion + pass/fail + linked source ─────────
  type ChecklistItem = {
    label: string;
    passed: boolean;
    detail?: string;
    source?: { label: string; url: string };
  };
  const EligibilityChecklist = ({ items }: { items: ChecklistItem[] }) => (
    <div className="mt-3 mb-2 rounded-md border border-border/60 bg-muted/30 p-3">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground/80 mb-2 font-semibold">
        Eligibility checklist
      </p>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            {it.passed
              ? <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              : <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className={`font-medium ${it.passed ? "text-foreground" : "text-destructive"}`}>
                  {it.label}
                </span>
                {it.detail && <span className="text-muted-foreground">— {it.detail}</span>}
              </div>
              {it.source && (
                <a href={it.source.url} target="_blank" rel="noreferrer"
                   className="text-[11px] text-primary hover:underline inline-block mt-0.5">
                  Source: {it.source.label} ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />



      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to All Calculators
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Government Grants Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            All available grants in one view — FHOG, stamp duty concessions, the new Australian Government
            5% Deposit Scheme (incl. 2% Single Parent stream), Help to Buy shared equity, and FHSS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="propertyValue">Property Purchase Price</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="propertyValue" type="number" value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)} className="pl-7" />
                </div>
              </div>

              <div>
                <Label htmlFor="deposit">Your Deposit Amount</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="deposit" type="number" value={deposit}
                    onChange={(e) => setDeposit(e.target.value)} className="pl-7" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Deposit percentage: {depositPct}%</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="state">State/Territory</Label>
                  <Select value={state} onValueChange={(v) => setState(v as AusState)}>
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(STATE_LABELS) as AusState[]).map((s) => (
                        <SelectItem key={s} value={s}>{STATE_LABELS[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="region">Region (5% Scheme cap)</Label>
                  <Select value={region} onValueChange={(v) => setRegion(v as Region)}>
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="capital">Capital city / major</SelectItem>
                      <SelectItem value="regional">Regional centre</SelectItem>
                      <SelectItem value="rest">Rest of state</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="fhb" checked={firstHomeBuyer}
                    onCheckedChange={(c) => setFirstHomeBuyer(c as boolean)} />
                  <Label htmlFor="fhb" className="cursor-pointer">I am a First Home Buyer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="new" checked={newProperty}
                    onCheckedChange={(c) => setNewProperty(c as boolean)} />
                  <Label htmlFor="new" className="cursor-pointer">Purchasing a new property</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="regional" checked={isRegional}
                    onCheckedChange={(c) => setIsRegional(c as boolean)} />
                  <Label htmlFor="regional" className="cursor-pointer">Regional area (affects VIC FHOG)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sp" checked={isSingleParent}
                    onCheckedChange={(c) => setIsSingleParent(c as boolean)} />
                  <Label htmlFor="sp" className="cursor-pointer">
                    Single Parent / Legal Guardian (2% deposit stream)
                  </Label>
                </div>
              </div>

              {/* Help to Buy block */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="htb" checked={evaluateHelpToBuy}
                    onCheckedChange={(c) => setEvaluateHelpToBuy(c as boolean)} />
                  <Label htmlFor="htb" className="cursor-pointer font-semibold">
                    Evaluate Help to Buy (shared equity)
                  </Label>
                </div>
                {evaluateHelpToBuy && (
                  <div className="ml-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="couple" checked={isCouple}
                        onCheckedChange={(c) => setIsCouple(c as boolean)} />
                      <Label htmlFor="couple" className="cursor-pointer">Applying as a couple</Label>
                    </div>
                    <div>
                      <Label htmlFor="income">Household gross income (combined)</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="income" type="number" value={householdIncome}
                          onChange={(e) => setHouseholdIncome(e.target.value)} className="pl-7" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Income cap: ${isCouple ? "160,000 (couple)" : "100,000 (single)"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* FHSS block */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="fhss" checked={evaluateFhss}
                    onCheckedChange={(c) => setEvaluateFhss(c as boolean)} />
                  <Label htmlFor="fhss" className="cursor-pointer font-semibold">
                    Evaluate First Home Super Saver (FHSS)
                  </Label>
                </div>
                {evaluateFhss && (
                  <div className="ml-6 grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="fhssAnnual">Annual contribution</Label>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="fhssAnnual" type="number" value={fhssAnnualContribution}
                          onChange={(e) => setFhssAnnualContribution(e.target.value)} className="pl-7" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Cap: $15,000/yr</p>
                    </div>
                    <div>
                      <Label htmlFor="fhssYears">Years contributing</Label>
                      <Input id="fhssYears" type="number" className="mt-2" value={fhssYearsContributing}
                        onChange={(e) => setFhssYearsContributing(e.target.value)} />
                      <p className="text-xs text-muted-foreground mt-1">Max $50k per person</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Your Potential Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
                <p className="text-sm opacity-90 mb-2">Total Cash Benefit</p>
                <p className="text-4xl font-bold">${r.totalCashBenefit.toLocaleString()}</p>
                <p className="text-xs opacity-80 mt-2">
                  FHOG + Stamp duty concession + FHSS net (excludes shared equity & LMI-saved)
                </p>
              </div>

              {/* FHOG */}
              <div className="bg-white p-4 rounded-lg border-2 border-border">
                <div className="flex items-center gap-2 mb-2">
                  {r.fhogAmount > 0
                    ? <CheckCircle2 className="h-5 w-5 text-green-600" />
                    : <XCircle className="h-5 w-5 text-muted-foreground" />}
                  <span className="font-semibold">First Home Owner Grant (FHOG)</span>
                </div>
                <p className={`text-2xl font-bold mb-2 ${r.fhogAmount > 0 ? "text-green-600" : "text-muted-foreground"}`}>
                  ${r.fhogAmount.toLocaleString()}
                </p>
                <EligibilityChecklist items={[
                  { label: "First home buyer", passed: firstHomeBuyer,
                    detail: firstHomeBuyer ? "confirmed" : "must be a first home buyer",
                    source: { label: "FirstHome.gov.au", url: "https://firsthomebuyers.gov.au/" } },
                  { label: fhogRule.newOnly ? "Property is a new build" : "New or established accepted",
                    passed: fhogRule.newOnly ? newProperty : true,
                    detail: fhogRule.newOnly
                      ? (newProperty ? "new build confirmed" : `${STATE_LABELS[state]} FHOG is new-only`)
                      : "no restriction",
                    source: FHOG_SOURCES[state] },
                  { label: "Within property value cap",
                    passed: fhogRule.valueCap === 0 || pv <= fhogRule.valueCap,
                    detail: fhogRule.valueCap > 0
                      ? `cap $${fhogRule.valueCap.toLocaleString()} · your $${pv.toLocaleString()}`
                      : "no cap in this state",
                    source: FHOG_SOURCES[state] },
                  { label: "State offers a cash FHOG",
                    passed: fhogCashAmount > 0,
                    detail: fhogCashAmount > 0
                      ? `$${fhogCashAmount.toLocaleString()} in ${STATE_LABELS[state]}`
                      : "no cash grant (concessions via stamp duty instead)",
                    source: FHOG_SOURCES[state] },
                ]} />
                <div className="space-y-0.5">
                  <Row label={`${STATE_LABELS[state]} FHOG amount`}
                       value={fhogCashAmount > 0 ? `$${fhogCashAmount.toLocaleString()}` : "No cash grant"} />
                  <Row label="Property type required"
                       value={fhogRule.newOnly ? "New build only" : "New or established"}
                       ok={fhogRule.newOnly ? newProperty : true} />
                  <Row label="Property value cap"
                       value={fhogRule.valueCap > 0 ? `$${fhogRule.valueCap.toLocaleString()}` : "No cap"}
                       ok={fhogRule.valueCap === 0 || pv <= fhogRule.valueCap} />
                  <Row label="First home buyer required" value="Yes" ok={firstHomeBuyer} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {r.fhogAmount > 0 ? "✓ " : ""}{r.fhogReason}
                </p>
                <SourceList items={[FHOG_SOURCES[state], { label: "FirstHome.gov.au — national FHB hub", url: "https://firsthomebuyers.gov.au/" }]} />
              </div>

              {/* Stamp duty concession */}
              <div className="bg-white p-4 rounded-lg border-2 border-border">
                <div className="flex items-center gap-2 mb-2">
                  {r.stampDutyConcession > 0
                    ? <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    : <XCircle className="h-5 w-5 text-muted-foreground" />}
                  <span className="font-semibold">Stamp Duty Concession</span>
                </div>
                <p className={`text-2xl font-bold mb-2 ${r.stampDutyConcession > 0 ? "text-blue-600" : "text-muted-foreground"}`}>
                  ${r.stampDutyConcession.toLocaleString()}
                </p>
                <div className="space-y-0.5">
                  <Row label="Duty if NOT a first home buyer" value={`$${Math.round(dutyNoFhb).toLocaleString()}`} />
                  <Row label={`Duty as ${firstHomeBuyer ? "FHB" : "non-FHB"} (your case)`}
                       value={`$${Math.round(dutyAsFhb).toLocaleString()}`} />
                  <Row label="Your concession (saving)"
                       value={`$${r.stampDutyConcession.toLocaleString()}`}
                       ok={r.stampDutyConcession > 0} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {firstHomeBuyer
                    ? r.stampDutyConcession > 0
                      ? `✓ FHB concession applied for a ${newProperty ? "new" : "established"} ${STATE_LABELS[state]} property.`
                      : `Property value above the ${STATE_LABELS[state]} FHB concession threshold — no saving available.`
                    : "Tick \"First Home Buyer\" to see the concession you'd qualify for."}
                </p>
                <SourceList items={[STAMP_DUTY_SOURCES[state]]} />
              </div>

              {/* 5% Deposit Scheme */}
              <div className="bg-white p-4 rounded-lg border-2 border-border">
                <div className="flex items-center gap-2 mb-2">
                  {r.depositSchemeEligible
                    ? <CheckCircle2 className="h-5 w-5 text-primary" />
                    : <XCircle className="h-5 w-5 text-muted-foreground" />}
                  <span className="font-semibold">
                    {isSingleParent
                      ? "5% Deposit Scheme — Single Parent stream (2%)"
                      : "Australian Government 5% Deposit Scheme"}
                  </span>
                </div>
                <p className={`text-sm font-semibold mb-2 ${r.depositSchemeEligible ? "text-primary" : "text-muted-foreground"}`}>
                  {r.depositSchemeEligible ? "Eligible — no LMI payable" : "Not eligible"}
                </p>
                <div className="space-y-0.5">
                  <Row label={`Property cap (${STATE_LABELS[state]} ${region})`}
                       value={`$${depositCap.toLocaleString()}`}
                       ok={pv <= depositCap} />
                  <Row label="Your property value"
                       value={`$${pv.toLocaleString()}`} />
                  <Row label={`Minimum deposit required`}
                       value={`${minDepositPct}%`} />
                  <Row label="Your deposit"
                       value={`${depositPct}% ($${dep.toLocaleString()})`}
                       ok={depositPctNum >= minDepositPct} />
                  <Row label="First home buyer required" value="Yes" ok={firstHomeBuyer} />
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {r.depositSchemeEligible ? "✓ " : ""}{r.depositSchemeReason}
                </p>
                <SourceList items={[DEPOSIT_SCHEME_SOURCE]} />
              </div>

              {/* Help to Buy */}
              {evaluateHelpToBuy && (
                <div className="bg-white p-4 rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    {r.helpToBuyEligible
                      ? <CheckCircle2 className="h-5 w-5 text-accent" />
                      : <XCircle className="h-5 w-5 text-muted-foreground" />}
                    <span className="font-semibold">Help to Buy (Shared Equity)</span>
                  </div>
                  {r.helpToBuyEligible && (
                    <p className="text-2xl font-bold text-accent mb-2">
                      ${r.helpToBuyEquity.toLocaleString()}{" "}
                      <span className="text-sm font-normal text-muted-foreground">gov equity</span>
                    </p>
                  )}
                  <div className="space-y-0.5">
                    <Row label={`State participates (${state})`}
                         value={HTB_STATES.includes(state) ? "Yes" : "No (TAS opted out)"}
                         ok={HTB_STATES.includes(state)} />
                    <Row label={`Income cap (${isCouple ? "couple" : "single"})`}
                         value={`$${htbIncomeCap.toLocaleString()}`}
                         ok={incomeNum <= htbIncomeCap} />
                    <Row label="Your household income"
                         value={`$${incomeNum.toLocaleString()}`} />
                    <Row label="Minimum deposit"
                         value="2%"
                         ok={depositPctNum >= 2} />
                    <Row label={`Gov equity share (${newProperty ? "new" : "existing"})`}
                         value={`${htbEquityPct}%`} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    {r.helpToBuyEligible ? "✓ " : ""}{r.helpToBuyReason}
                  </p>
                  <SourceList items={[HELP_TO_BUY_SOURCE]} />
                </div>
              )}

              {/* FHSS */}
              {evaluateFhss && (
                <div className="bg-white p-4 rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    {r.fhssNetForDeposit > 0
                      ? <CheckCircle2 className="h-5 w-5 text-green-600" />
                      : <XCircle className="h-5 w-5 text-muted-foreground" />}
                    <span className="font-semibold">First Home Super Saver (FHSS)</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    ${r.fhssNetForDeposit.toLocaleString()}
                  </p>
                  <div className="space-y-0.5">
                    <Row label="Annual contribution cap" value="$15,000"
                         ok={(Number(fhssAnnualContribution) || 0) <= 15000} />
                    <Row label="Your annual contribution"
                         value={`$${(Number(fhssAnnualContribution) || 0).toLocaleString()} (counted: $${fhssAnnualCapped.toLocaleString()})`} />
                    <Row label="Per-person total cap" value="$50,000" />
                    <Row label={`Total contributed (${fhssYearsContributing} yrs${isCouple ? ", couple" : ""})`}
                         value={`$${fhssGrossContrib.toLocaleString()}${isCouple ? " × 2" : ""}`} />
                    <Row label="Gross withdrawable"
                         value={`$${r.fhssWithdrawable.toLocaleString()}`} />
                    <Row label="Less withdrawal tax (marginal − 30%)"
                         value={`−$${(r.fhssWithdrawable - r.fhssNetForDeposit).toLocaleString()}`} />
                    <Row label="Net available for deposit"
                         value={`$${r.fhssNetForDeposit.toLocaleString()}`}
                         ok={r.fhssNetForDeposit > 0} />
                  </div>
                  <SourceList items={[FHSS_SOURCE]} />
                </div>
              )}



              <Button className="w-full bg-gradient-to-r from-primary to-accent" asChild>
                <Link to="/apply">Apply for Pre-Approval</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Source Citations */}
        <Card className="mt-8 border bg-muted/30">
          <CardContent className="pt-6 space-y-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Assumptions (FY{calc.fyYear}, engine v{calc.engineVersion})
                </p>
                <ul className="space-y-1 list-disc ml-4">
                  {calc.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Sources</p>
              <ul className="space-y-1 list-disc ml-4">
                {calc.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      {s.label}
                    </a>{" "}
                    <span className="opacity-70">(as of {s.asOf})</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 5% Deposit Scheme Details */}
        <Card className="mt-8 border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Australian Government 5% Deposit Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Rebranded from the Home Guarantee Scheme on <strong>1 October 2025</strong>. The federal
              government guarantees the deposit shortfall so eligible buyers can purchase with as little as
              5% (or 2% for single parents) without paying Lenders Mortgage Insurance.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" /> What changed Oct 2025
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                  <li>• No income caps (previously $125k single / $200k couple)</li>
                  <li>• Unlimited places (previously 35,000/yr)</li>
                  <li>• Higher property price caps per region</li>
                  <li>• Regional FHB Guarantee folded into the main stream</li>
                  <li>• New Single Parent / Guardian 2% deposit stream</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" /> Key Benefits
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                  <li>• Purchase with just 5% deposit (2% for single parents)</li>
                  <li>• No Lenders Mortgage Insurance (typically saves $15k–$30k)</li>
                  <li>• Government guarantees up to 15% (or 18%) of property value</li>
                  <li>• Available for new and established properties</li>
                  <li>• Must move in within 12 months & live there 6+ months</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg mt-4">
              <h3 className="font-semibold mb-3">
                Property Price Caps — {STATE_LABELS[state]} (Effective 1 October 2025)
              </h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded border bg-muted/20">
                  <p className="text-muted-foreground text-xs">Capital city / major</p>
                  <p className="font-semibold text-lg">${caps.capital.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded border bg-muted/20">
                  <p className="text-muted-foreground text-xs">Regional centre</p>
                  <p className="font-semibold text-lg">${caps.regional.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded border bg-muted/20">
                  <p className="text-muted-foreground text-xs">Rest of state</p>
                  <p className="font-semibold text-lg">${caps.rest.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help to Buy info */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>Help to Buy — Shared Equity Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Federal shared-equity scheme — applications opened <strong>5 December 2025</strong>. The
              government takes an equity share so eligible buyers borrow less.
            </p>
            <ul className="space-y-1 list-disc ml-5">
              <li>Up to <strong>40% equity</strong> for new homes, <strong>30%</strong> for existing</li>
              <li>Minimum <strong>2% deposit</strong></li>
              <li>Income caps: <strong>$100k single / $160k couple</strong> combined</li>
              <li>10,000 places nationally per year</li>
              <li>Available in NSW, VIC, QLD, SA, ACT, NT, WA — TAS opted out</li>
            </ul>
          </CardContent>
        </Card>

        {/* FHSS info */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>First Home Super Saver (FHSS)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Save for a first-home deposit inside super at concessional tax rates, then withdraw it.
              Cap: <strong>$15,000/yr countable</strong>, <strong>$50,000 total per person</strong>
              (couples can each contribute = $100k combined). Withdrawal is taxed at marginal rate less
              a 30% offset.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Important Disclaimer:</strong> Government grants and schemes are subject to
              eligibility criteria, application processes, and may change without notice. Grant amounts,
              property price caps, and eligibility requirements vary by state and region and are updated
              regularly. This calculator provides estimates only and does not guarantee approval. Please
              contact a licensed mortgage broker through HALP for current information and assistance with
              grant applications.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default GovernmentGrantsCalculator;
