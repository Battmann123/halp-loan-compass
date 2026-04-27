import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Search,
  ArrowRight,
} from "lucide-react";

type Field = {
  label: string;
  hint?: string;
  required: boolean;
  isNew?: boolean; // recently added toggle
};

type CalcSpec = {
  id: string;
  name: string;
  route: string;
  category: string;
  fields: Field[];
};

const CALCULATORS: CalcSpec[] = [
  {
    id: "repayment",
    name: "Loan Repayment Calculator",
    route: "/calculators/repayment",
    category: "Affordability & Repayment",
    fields: [
      { label: "Loan amount", required: true },
      { label: "Interest rate (% p.a.)", required: true },
      { label: "Loan term (years)", required: true },
      { label: "Repayment frequency", hint: "Weekly / Fortnightly / Monthly", required: true },
      { label: "Repayment type", hint: "Principal & Interest or Interest Only", required: true },
    ],
  },
  {
    id: "borrowing-power",
    name: "Borrowing Power Calculator",
    route: "/calculators/borrowing-power",
    category: "Affordability & Repayment",
    fields: [
      { label: "Gross annual income (applicant 1)", required: true },
      { label: "Gross annual income (applicant 2)", required: false },
      { label: "Number of dependants", required: true },
      { label: "Monthly living expenses", hint: "HEM benchmark used if blank", required: false },
      { label: "Existing debts / credit limits", required: true },
      { label: "Interest rate", required: true },
      { label: "Loan term", required: true },
    ],
  },
  {
    id: "serviceability",
    name: "Loan Serviceability Calculator",
    route: "/calculators/serviceability",
    category: "Affordability & Repayment",
    fields: [
      { label: "Net monthly income", required: true },
      { label: "Monthly expenses", required: true },
      { label: "Existing repayments", required: true },
      { label: "Proposed loan amount", required: true },
      { label: "Assessment rate buffer", hint: "APRA 3% buffer applied", required: true },
    ],
  },
  {
    id: "stamp-duty",
    name: "Stamp Duty Calculator",
    route: "/calculators/stamp-duty",
    category: "Property Purchase Costs",
    fields: [
      { label: "Property value", required: true },
      { label: "State or territory", required: true },
      { label: "First home buyer?", required: true },
      { label: "Owner-occupier or investor?", required: true },
      { label: "Property type", hint: "New / Established / Vacant land", required: true },
      { label: "Foreign purchaser?", required: false },
    ],
  },
  {
    id: "lmi",
    name: "LMI Calculator",
    route: "/calculators/lmi",
    category: "Property Purchase Costs",
    fields: [
      { label: "Property value", required: true },
      { label: "Loan amount", required: true },
      { label: "First home buyer?", required: true },
      { label: "Occupancy", required: true },
      { label: "State (for LMI stamp duty)", required: true },
    ],
  },
  {
    id: "upfront-costs",
    name: "Upfront Costs Calculator",
    route: "/calculators/upfront-costs",
    category: "Property Purchase Costs",
    fields: [
      { label: "Property value", required: true },
      { label: "Deposit amount", required: true },
      { label: "State", required: true },
      { label: "First home buyer?", required: true },
      { label: "Property type", required: true },
      { label: "Conveyancing/legal estimate", required: false },
      { label: "Building & pest inspection", required: false },
    ],
  },
  {
    id: "government-grants",
    name: "Government Grants Calculator",
    route: "/calculators/government-grants",
    category: "Property Purchase Costs",
    fields: [
      { label: "Property value", required: true },
      { label: "State", required: true },
      { label: "First home buyer?", required: true },
      { label: "New or established property?", required: true },
      { label: "Deposit amount", hint: "Used to test 5% Home Guarantee Scheme", required: true },
    ],
  },
  {
    id: "investment-property",
    name: "Investment Property Calculator",
    route: "/calculators/investment-property",
    category: "Investment & Tax",
    fields: [
      { label: "Property value", required: true },
      { label: "Loan amount and rate", required: true },
      { label: "Weekly rental income", required: true },
      { label: "Annual property expenses", required: true },
      { label: "Annual taxable income", hint: "Drives marginal tax rate", required: true },
    ],
  },
  {
    id: "negative-gearing",
    name: "Negative Gearing Calculator",
    route: "/calculators/negative-gearing",
    category: "Investment & Tax",
    fields: [
      { label: "Rental income (annual)", required: true },
      { label: "Interest paid (annual)", required: true },
      { label: "Other deductible expenses", required: true },
      { label: "Depreciation claimable", required: false },
      { label: "Taxable income (excl. property)", required: true },
    ],
  },
  {
    id: "capital-gains",
    name: "Capital Gains Tax Calculator",
    route: "/calculators/capital-gains",
    category: "Investment & Tax",
    fields: [
      { label: "Purchase price", required: true },
      { label: "Sale price", required: true },
      { label: "Purchase date", hint: "Determines 12-month CGT discount", required: true },
      { label: "Sale date", required: true },
      { label: "Capital costs (legal, stamp duty)", required: true },
      { label: "Annual taxable income", required: true },
    ],
  },
  {
    id: "depreciation",
    name: "Depreciation Calculator",
    route: "/calculators/depreciation",
    category: "Investment & Tax",
    fields: [
      { label: "Construction cost / build year", required: true },
      { label: "Plant & equipment value", required: true },
      { label: "Purchased new?", hint: "Post-2017 ATO rule for second-hand P&E", required: true, isNew: true },
      { label: "Property age", required: true },
    ],
  },
  {
    id: "refinance",
    name: "Refinance Calculator",
    route: "/calculators/refinance",
    category: "Loan Management",
    fields: [
      { label: "Current loan balance", required: true },
      { label: "Current interest rate", required: true },
      { label: "New interest rate", required: true },
      { label: "Remaining loan term (years)", required: true, isNew: true },
      { label: "Switching costs", hint: "Discharge, application, valuation fees", required: true },
    ],
  },
  {
    id: "extra-repayments",
    name: "Extra Repayments Calculator",
    route: "/calculators/extra-repayments",
    category: "Loan Management",
    fields: [
      { label: "Loan amount", required: true },
      { label: "Interest rate", required: true },
      { label: "Loan term", required: true },
      { label: "Extra repayment amount", required: true },
      { label: "Repayment frequency", required: true },
    ],
  },
  {
    id: "lender-comparison",
    name: "Lender Comparison Calculator",
    route: "/calculators/lender-comparison",
    category: "Loan Management",
    fields: [
      { label: "Loan amount", required: true },
      { label: "Loan term", required: true },
      { label: "Interest rate (per lender)", required: true },
      { label: "Comparison rate / fees (per lender)", required: true },
      { label: "Features required", hint: "Offset, redraw, split", required: false },
    ],
  },
  {
    id: "comprehensive",
    name: "All-in-One Calculator",
    route: "/calculators/comprehensive",
    category: "Affordability & Repayment",
    fields: [
      { label: "Property value", required: true },
      { label: "Deposit amount", required: true },
      { label: "Annual income", required: true },
      { label: "State", required: true },
      { label: "First home buyer?", required: true },
      { label: "Property type", required: true },
      { label: "Interest rate & term", required: true },
    ],
  },
];

const CATEGORIES = [
  "Affordability & Repayment",
  "Property Purchase Costs",
  "Investment & Tax",
  "Loan Management",
];

const InputChecklist = () => {
  const [query, setQuery] = useState("");
  // Track which fields the user has marked as "I have this"
  const [haveByCalc, setHaveByCalc] = useState<Record<string, Set<string>>>({});

  const toggleField = (calcId: string, fieldLabel: string) => {
    setHaveByCalc((prev) => {
      const next = { ...prev };
      const set = new Set(next[calcId] ?? []);
      if (set.has(fieldLabel)) set.delete(fieldLabel);
      else set.add(fieldLabel);
      next[calcId] = set;
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CALCULATORS;
    return CALCULATORS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.fields.some((f) => f.label.toLowerCase().includes(q))
    );
  }, [query]);

  const summary = useMemo(() => {
    let totalRequired = 0;
    let totalChecked = 0;
    let calcsReady = 0;
    let calcsMissing = 0;
    CALCULATORS.forEach((c) => {
      const requiredFields = c.fields.filter((f) => f.required);
      totalRequired += requiredFields.length;
      const have = haveByCalc[c.id] ?? new Set<string>();
      const checkedRequired = requiredFields.filter((f) => have.has(f.label)).length;
      totalChecked += checkedRequired;
      if (requiredFields.length > 0 && checkedRequired === requiredFields.length) calcsReady++;
      else if (have.size > 0) calcsMissing++;
    });
    return { totalRequired, totalChecked, calcsReady, calcsMissing };
  }, [haveByCalc]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Calculator Input Checklist | What You Need Before Calculating | HALP"
        description="See exactly which inputs each HALP calculator needs, including new toggles like 'Purchased new?' for depreciation. Get warned when required inputs are missing."
        canonical="/input-checklist"
      />
      <Navigation />

      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/calculators"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Calculators
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <ClipboardList className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Calculator Input Checklist</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Not sure what numbers you need to gather? Tick off the inputs you already have
              and we'll show you which calculators are ready to run — and warn you about
              anything missing.
            </p>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Required inputs ticked</div>
                <div className="text-3xl font-bold mt-1">
                  {summary.totalChecked} / {summary.totalRequired}
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground inline-flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Ready to run
                </div>
                <div className="text-3xl font-bold mt-1">{summary.calcsReady}</div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground inline-flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-destructive" /> Missing required inputs
                </div>
                <div className="text-3xl font-bold mt-1">{summary.calcsMissing}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search calculators or inputs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Grouped checklists */}
          {CATEGORIES.map((cat) => {
            const calcs = filtered.filter((c) => c.category === cat);
            if (calcs.length === 0) return null;
            return (
              <div key={cat} className="mb-10">
                <h2 className="text-2xl font-bold mb-4">{cat}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {calcs.map((c) => {
                    const have = haveByCalc[c.id] ?? new Set<string>();
                    const required = c.fields.filter((f) => f.required);
                    const missing = required.filter((f) => !have.has(f.label));
                    const ready = required.length > 0 && missing.length === 0;
                    return (
                      <Card
                        key={c.id}
                        className={`shadow-sm ${
                          ready
                            ? "border-l-4 border-l-primary"
                            : missing.length > 0 && have.size > 0
                            ? "border-l-4 border-l-destructive"
                            : ""
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-3">
                            <CardTitle className="text-lg">{c.name}</CardTitle>
                            {ready ? (
                              <Badge className="bg-primary text-primary-foreground">
                                Ready
                              </Badge>
                            ) : have.size > 0 ? (
                              <Badge variant="destructive">
                                {missing.length} missing
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                {required.length} required
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mb-4">
                            {c.fields.map((f) => {
                              const id = `${c.id}-${f.label}`;
                              const checked = have.has(f.label);
                              return (
                                <li key={f.label} className="flex items-start gap-2">
                                  <Checkbox
                                    id={id}
                                    checked={checked}
                                    onCheckedChange={() => toggleField(c.id, f.label)}
                                    className="mt-1"
                                  />
                                  <label
                                    htmlFor={id}
                                    className="text-sm leading-snug cursor-pointer flex-1"
                                  >
                                    <span className={checked ? "line-through text-muted-foreground" : ""}>
                                      {f.label}
                                    </span>
                                    {f.required ? (
                                      <Badge variant="outline" className="ml-2 text-[10px] py-0">
                                        Required
                                      </Badge>
                                    ) : (
                                      <Badge variant="secondary" className="ml-2 text-[10px] py-0">
                                        Optional
                                      </Badge>
                                    )}
                                    {f.isNew && (
                                      <Badge className="ml-1 text-[10px] py-0 bg-accent text-accent-foreground">
                                        New
                                      </Badge>
                                    )}
                                    {f.hint && (
                                      <span className="block text-xs text-muted-foreground mt-0.5">
                                        {f.hint}
                                      </span>
                                    )}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>

                          {missing.length > 0 && have.size > 0 && (
                            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-md p-3 mb-3">
                              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                              <div>
                                You're missing {missing.length} required input
                                {missing.length === 1 ? "" : "s"}:{" "}
                                <span className="font-medium">
                                  {missing.map((m) => m.label).join(", ")}
                                </span>
                                .
                              </div>
                            </div>
                          )}

                          <Link to={c.route}>
                            <Button
                              variant={ready ? "default" : "outline"}
                              size="sm"
                              className="w-full"
                            >
                              Open calculator
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No calculators match "{query}".
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
};

export default InputChecklist;
