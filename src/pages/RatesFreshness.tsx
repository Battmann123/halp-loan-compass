import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { CalendarCheck, ExternalLink, RefreshCw, ShieldCheck, Filter, Search, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useRef, useState } from "react";

const LAST_UPDATED = "27 April 2026";
const NEXT_REVIEW = "1 July 2026";

type Category = "stamp-duty" | "lmi" | "grants" | "tax" | "repayments";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "stamp-duty", label: "Stamp Duty" },
  { value: "lmi", label: "LMI" },
  { value: "grants", label: "Grants" },
  { value: "tax", label: "Tax" },
  { value: "repayments", label: "Repayments" },
];

type Change = {
  name: string;
  path: string;
  note: string;
  categories: Category[];
};

type Release = {
  version: string;
  date: string;
  summary: string;
  changed: Change[];
};

const releases: Release[] = [
  {
    version: "v2.4",
    date: "27 April 2026",
    summary: "QLD stamp duty waiver (1 May 2025) and Home Guarantee Scheme October 2025 expansion applied site-wide.",
    changed: [
      { name: "Stamp Duty Calculator", path: "/calculators/stamp-duty", note: "QLD: full waiver on new homes & vacant land for FHBs (no value cap).", categories: ["stamp-duty"] },
      { name: "Government Grants", path: "/calculators/government-grants", note: "Updated HGS caps (QLD $1M, SA $900k, WA $850k, ACT $1M) and FHOG values for NT/ACT.", categories: ["grants"] },
      { name: "Upfront Costs", path: "/calculators/upfront-costs", note: "Flows through new QLD duty rules via shared lib.", categories: ["stamp-duty", "lmi"] },
      { name: "State Comparison", path: "/compare-states", note: "Reflects updated state-by-state duty + grant rules.", categories: ["stamp-duty", "grants", "lmi"] },
    ],
  },
  {
    version: "v2.3",
    date: "20 April 2026",
    summary: "Centralised all formulas into src/lib/calculations.ts — single source of truth for stamp duty, LMI, tax, and repayments.",
    changed: [
      { name: "Borrowing Power", path: "/calculators/borrowing-power", note: "APRA-style 9.5% assessment (3% buffer) + HEM-aligned expenses.", categories: ["repayments"] },
      { name: "Serviceability", path: "/calculators/serviceability", note: "Net surplus model replacing legacy multiplier.", categories: ["repayments", "tax"] },
      { name: "Capital Gains / Negative Gearing / Investment", path: "/calculators/capital-gains", note: "ATO 2024-25 Stage 3 resident brackets (16/30/37/45%).", categories: ["tax"] },
      { name: "Depreciation", path: "/calculators/depreciation", note: "New ‘Purchased new?’ toggle enforces post-2017 P&E rule.", categories: ["tax"] },
      { name: "Refinance", path: "/calculators/refinance", note: "Added remaining loan term for accurate lifetime savings.", categories: ["repayments"] },
      { name: "LMI", path: "/calculators/lmi", note: "LVR-tier rates + state stamp duty on premium.", categories: ["lmi", "stamp-duty"] },
    ],
  },
];

const dataSources = [
  { topic: "Income Tax (Resident, 2024-25 Stage 3)", source: "ATO – Individual income tax rates", url: "https://www.ato.gov.au/rates/individual-income-tax-rates/" },
  { topic: "Stamp Duty – NSW", source: "Revenue NSW", url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty" },
  { topic: "Stamp Duty – VIC", source: "State Revenue Office Victoria", url: "https://www.sro.vic.gov.au/land-transfer-duty" },
  { topic: "Stamp Duty – QLD (1 May 2025 reforms)", source: "Queensland Revenue Office", url: "https://qro.qld.gov.au/duties/transfer-duty/" },
  { topic: "Stamp Duty – WA", source: "RevenueWA", url: "https://www.wa.gov.au/organisation/department-of-finance/transfer-duty" },
  { topic: "Stamp Duty – SA", source: "RevenueSA", url: "https://www.revenuesa.sa.gov.au/stampduty" },
  { topic: "Stamp Duty – TAS", source: "State Revenue Office Tasmania", url: "https://www.sro.tas.gov.au/property-transfer-duties" },
  { topic: "Stamp Duty – ACT", source: "ACT Revenue Office", url: "https://www.revenue.act.gov.au/duties/conveyance-duty" },
  { topic: "Stamp Duty – NT", source: "Territory Revenue Office", url: "https://nt.gov.au/employ/money-and-taxes/taxes,-royalties-and-grants/stamp-duty" },
  { topic: "Home Guarantee Scheme (Oct 2025 caps)", source: "Housing Australia", url: "https://www.housingaustralia.gov.au/support-buy-home/home-guarantee-scheme" },
  { topic: "First Home Owner Grant (state-by-state)", source: "FirstHome.gov.au", url: "https://www.firsthome.gov.au/" },
  { topic: "APRA Serviceability Buffer (3%)", source: "APRA – Prudential Practice Guide APG 223", url: "https://www.apra.gov.au/news-and-publications" },
  { topic: "Household Expenditure Measure (HEM)", source: "Melbourne Institute", url: "https://melbourneinstitute.unimelb.edu.au/" },
  { topic: "Depreciation – Plant & Equipment rules", source: "ATO – Rental properties (Div 40/43)", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/residential-rental-properties" },
];

const categoryLabel = (c: Category) =>
  CATEGORIES.find((x) => x.value === c)?.label ?? c;

const RatesFreshness = () => {
  const [active, setActive] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const latestRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const matches = (cats: Category[]) =>
    active.length === 0 || cats.some((c) => active.includes(c));

  const filteredLatest = useMemo(
    () => releases[0].changed.filter((c) => matches(c.categories)),
    [active]
  );

  const filteredHistory = useMemo(
    () =>
      releases
        .map((r) => ({ ...r, changed: r.changed.filter((c) => matches(c.categories)) }))
        .filter((r) => r.changed.length > 0),
    [active]
  );

  const q = query.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!q) return [];
    const seen = new Set<string>();
    const results: { name: string; path: string; version: string; date: string; note: string; inLatest: boolean }[] = [];
    releases.forEach((r, idx) => {
      r.changed.forEach((c) => {
        if (seen.has(c.name)) return;
        if (c.name.toLowerCase().includes(q) || c.note.toLowerCase().includes(q)) {
          seen.add(c.name);
          results.push({
            name: c.name,
            path: c.path,
            version: r.version,
            date: r.date,
            note: c.note,
            inLatest: idx === 0,
          });
        }
      });
    });
    return results.slice(0, 8);
  }, [q]);

  const jumpToLatest = (name: string) => {
    setActive([]);
    setQuery("");
    requestAnimationFrame(() => {
      const row = rowRefs.current[name];
      if (row) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });
        row.classList.add("ring-2", "ring-primary", "ring-offset-2", "rounded");
        setTimeout(() => {
          row.classList.remove("ring-2", "ring-primary", "ring-offset-2", "rounded");
        }, 2000);
      } else {
        latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Formula & Rates Freshness | HALP Home Loans"
        description="See when our calculator formulas, tax rates, stamp duty and grant data were last updated, with source links and recent change history."
        canonical="/rates-freshness"
      />
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="secondary" className="text-sm">
                <RefreshCw className="h-3 w-3 mr-1" /> Transparency
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Formula & Rates Freshness
              </h1>
              <p className="text-lg text-muted-foreground">
                We keep our calculators aligned with the latest ATO, APRA and state revenue office rules.
                Here's what's current, what changed, and where the numbers come from.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Badge variant="default" className="text-sm py-1.5 px-3">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Last updated: {LAST_UPDATED}
                </Badge>
                <Badge variant="outline" className="text-sm py-1.5 px-3">
                  Next scheduled review: {NEXT_REVIEW}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile compact summary — visible only on small screens */}
        <section className="md:hidden py-4 px-4 bg-background border-b">
          <Card className="border-primary/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold">Updated</span>{" "}
                  <span className="text-muted-foreground">{LAST_UPDATED}</span>
                </div>
                <Badge variant="outline" className="ml-auto text-[10px]">
                  {releases[0].version}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Changed in latest release
                </p>
                <ul className="space-y-1.5">
                  {releases[0].changed.map((c) => (
                    <li key={c.name} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <Link to={c.path} className="text-primary hover:underline leading-snug">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Search bar */}
        <section className="py-8 border-b bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Find a calculator</h2>
              <span className="text-sm text-muted-foreground">
                Search by name or change keyword
              </span>
            </div>
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. stamp duty, LMI, depreciation…"
                className="pl-9 pr-9"
                aria-label="Search calculators"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted text-muted-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {q && (
                <Card className="absolute z-20 mt-2 w-full shadow-lg border">
                  <CardContent className="p-2">
                    {searchResults.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-3 px-2">
                        No matching calculators or change notes.
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {searchResults.map((r) => (
                          <li key={r.name}>
                            <button
                              onClick={() => jumpToLatest(r.name)}
                              className="w-full text-left p-2 rounded hover:bg-muted transition-colors group"
                            >
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{r.name}</span>
                                  {r.inLatest ? (
                                    <Badge className="text-[10px]">Latest</Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-[10px]">
                                      {r.version}
                                    </Badge>
                                  )}
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {r.note}
                              </p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="py-8 border-b bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Filter by category</h2>
                <span className="text-sm text-muted-foreground">
                  {active.length === 0 ? "Showing all" : `Showing ${active.length} selected`}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <ToggleGroup
                  type="multiple"
                  value={active}
                  onValueChange={(v) => setActive(v as Category[])}
                  className="flex-wrap justify-start"
                >
                  {CATEGORIES.map((c) => (
                    <ToggleGroupItem key={c.value} value={c.value} aria-label={c.label} className="text-sm">
                      {c.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                {active.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setActive([])}>
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Latest release */}
        <section className="py-12" ref={latestRef}>
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-primary/30 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      Latest release — {releases[0].version}
                    </CardTitle>
                    <CardDescription>{releases[0].date}</CardDescription>
                  </div>
                  <Badge>Current</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{releases[0].summary}</p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Calculator</TableHead>
                        <TableHead>Categories</TableHead>
                        <TableHead>What changed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLatest.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                            No changes in the latest release match the selected filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLatest.map((c) => (
                          <TableRow key={c.name} ref={(el) => (rowRefs.current[c.name] = el)}>
                            <TableCell className="font-medium">
                              <Link to={c.path} className="text-primary hover:underline">
                                {c.name}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {c.categories.map((cat) => (
                                  <Badge key={cat} variant="secondary" className="text-xs">
                                    {categoryLabel(cat)}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{c.note}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Source links */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-2">Source data & references</h2>
            <p className="text-muted-foreground mb-6">
              All formulas are derived from official Australian government and regulator publications.
            </p>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataSources.map((s) => (
                      <TableRow key={s.topic}>
                        <TableCell className="font-medium">{s.topic}</TableCell>
                        <TableCell className="text-muted-foreground">{s.source}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary hover:underline text-sm"
                          >
                            Visit <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Release history */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Release history</h2>
            {filteredHistory.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No past releases match the selected filters.{" "}
                  <button onClick={() => setActive([])} className="text-primary hover:underline">
                    Clear filters
                  </button>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="w-full" defaultValue={filteredHistory[0]?.version}>
                {filteredHistory.map((r) => (
                  <AccordionItem key={r.version} value={r.version}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 text-left flex-wrap">
                        <Badge variant="outline">{r.version}</Badge>
                        <span className="font-medium">{r.date}</span>
                        <Badge variant="secondary" className="text-xs">
                          {r.changed.length} match{r.changed.length === 1 ? "" : "es"}
                        </Badge>
                        <span className="text-muted-foreground hidden md:inline">— {r.summary}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-4 md:hidden">{r.summary}</p>
                      <ul className="space-y-3">
                        {r.changed.map((c) => (
                          <li key={c.name} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Link to={c.path} className="font-medium text-primary hover:underline">
                                  {c.name}
                                </Link>
                                {c.categories.map((cat) => (
                                  <Badge key={cat} variant="secondary" className="text-xs">
                                    {categoryLabel(cat)}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{c.note}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">
              Calculators are a guide only. Rates, grants and duties change frequently — always confirm with your
              broker or the relevant authority before acting. See our{" "}
              <Link to="/disclaimer" className="text-primary hover:underline">full disclaimer</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RatesFreshness;
