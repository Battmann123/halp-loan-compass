import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  TrendingUp,
  Home,
  Building,
  Percent,
  DollarSign,
  PiggyBank,
  BarChart3,
  Calendar,
  RefreshCw,
  Coins,
  Scale,
  Shield,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type Category = "Grants" | "Stamp Duty" | "Repayments" | "Borrowing Power" | "Investment" | "Other";
type State = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";
const ALL_STATES: State[] = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"];

interface Guide {
  title: string;
  description: string;
  icon: typeof BookOpen;
  link: string;
  calculatorLink: string;
  calculatorLabel?: string;
  showTryCalculator?: boolean;
  categories: Category[];
  /** States this guide is specifically relevant to. Empty = nationally applicable (always shown). */
  states?: State[];
  highlight?: string;
  /** 3 short scan-friendly bullet takeaways shown under a divider. */
  keyPoints: string[];
}

const Guides = () => {
  const guides: Guide[] = [
    {
      title: "Government Grants Guide",
      description:
        "Every federal and state first home buyer scheme explained — what stacks, what doesn't, and how to claim it.",
      icon: DollarSign,
      link: "/guides/government-grants",
      calculatorLink: "/calculators/government-grants",
      calculatorLabel: "Check what you qualify for",
      showTryCalculator: true,
      categories: ["Grants"],
      states: ALL_STATES,
      highlight: "Updated Apr 2026",
      keyPoints: [
        "5% Deposit Scheme — no income or place caps (since Oct 2025)",
        "Help to Buy — up to 40% government equity on new builds",
        "State FHOG ranges from $10K (NSW/VIC/WA) up to $50K (NT)",
      ],
    },
    {
      title: "Stamp Duty Guide",
      description:
        "State-by-state thresholds, exemptions and concessions for first home buyers and owner-occupiers.",
      icon: Home,
      link: "/guides/stamp-duty",
      calculatorLink: "/calculators/stamp-duty",
      calculatorLabel: "Calculate your stamp duty",
      showTryCalculator: true,
      categories: ["Stamp Duty"],
      states: ALL_STATES,
      highlight: "Updated Apr 2026",
      keyPoints: [
        "NSW exempt to $800K · VIC exempt to $600K",
        "QLD zero duty on new homes (no price cap)",
        "SA stamp duty abolished on new builds",
      ],
    },
    {
      title: "Upfront Costs Guide",
      description:
        "Plan your full purchase budget — deposit, duty, fees, legals and inspections in one place.",
      icon: PiggyBank,
      link: "/guides/upfront-costs",
      calculatorLink: "/calculators/upfront-costs",
      categories: ["Grants", "Stamp Duty"],
      states: ALL_STATES,
      keyPoints: [
        "Combined benefits often hit $52K–$72K on a typical first home",
        "Brings 20% deposit needed down to 2–5%",
        "Worked examples for $580K–$650K purchases",
      ],
    },
    {
      title: "LMI Guide",
      description:
        "How Lenders Mortgage Insurance works, when it applies, and how to avoid it entirely.",
      icon: Shield,
      link: "/guides/lmi",
      calculatorLink: "/calculators/lmi",
      calculatorLabel: "Estimate your LMI",
      showTryCalculator: true,
      categories: ["Borrowing Power", "Grants"],
      states: ALL_STATES,
      keyPoints: [
        "Triggered when LVR is above 80%",
        "5% Deposit Scheme saves $14K–$30K in LMI",
        "Some lenders waive LMI for nurses, doctors, lawyers",
      ],
    },
    {
      title: "Borrowing Power Guide",
      description:
        "How lenders calculate what you can borrow — and the levers that actually move the number.",
      icon: TrendingUp,
      link: "/guides/borrowing-power",
      calculatorLink: "/calculators/borrowing-power",
      categories: ["Borrowing Power"],
      states: ALL_STATES,
      keyPoints: [
        "Income, expenses and debts all assessed",
        "~3% stress-test buffer applied to the rate",
        "Strategies to maximise without overextending",
      ],
    },
    {
      title: "Loan Repayment Guide",
      description:
        "Principal & Interest vs Interest Only, payment frequencies, and strategies to shave years off your loan.",
      icon: Calculator,
      link: "/guides/repayment",
      calculatorLink: "/calculators/repayment",
      categories: ["Repayments"],
      states: ALL_STATES,
      keyPoints: [
        "Fortnightly vs monthly: ~4 years off a 30-year loan",
        "Offset accounts vs redraw — when each wins",
        "P&I vs IO trade-offs for owner-occupiers",
      ],
    },
    {
      title: "Serviceability Guide",
      description:
        "How lenders assess your ability to service a loan, including HEM benchmarks and income shading.",
      icon: BarChart3,
      link: "/guides/serviceability",
      calculatorLink: "/calculators/serviceability",
      categories: ["Borrowing Power"],
      states: ALL_STATES,
      keyPoints: [
        "~3% stress-test buffer (APRA requirement)",
        "HEM benchmarks for living expenses",
        "Income shading rules differ between lenders",
      ],
    },
    {
      title: "Extra Repayments Guide",
      description:
        "How extra payments compound — and the small habits that save tens of thousands in interest.",
      icon: Calendar,
      link: "/guides/extra-repayments",
      calculatorLink: "/calculators/extra-repayments",
      categories: ["Repayments"],
      states: ALL_STATES,
      keyPoints: [
        "Pay fortnightly instead of monthly",
        "Redirect tax returns and bonuses",
        "Start early — compound effect is huge",
      ],
    },
    {
      title: "Refinance Guide",
      description:
        "A full cost/benefit framework for switching lenders — break costs, fees and cashback traps.",
      icon: RefreshCw,
      link: "/guides/refinance",
      calculatorLink: "/calculators/refinance",
      categories: ["Repayments"],
      states: ALL_STATES,
      keyPoints: [
        "Typical switching costs: $2K–$4K",
        "LMI re-payable above 80% LVR",
        "Watch cashback clawback terms",
      ],
    },
    {
      title: "Lender Comparison Guide",
      description:
        "Compare 40+ lenders on rate, fees, features and policy — including specialist lenders.",
      icon: Scale,
      link: "/guides/lender-comparison",
      calculatorLink: "/calculators/lender-comparison",
      categories: ["Borrowing Power", "Repayments"],
      states: ALL_STATES,
      keyPoints: [
        "Offset, redraw, splits — feature comparison",
        "Specialist lenders for self-employed",
        "Options for temporary visa holders & non-residents",
      ],
    },
    {
      title: "Investment Property Guide",
      description:
        "Analyse rental returns, cash flow, depreciation and capital growth before you buy.",
      icon: Building,
      link: "/guides/investment-property",
      calculatorLink: "/calculators/investment-property",
      categories: ["Investment"],
      states: ALL_STATES,
      keyPoints: [
        "Cash flow vs capital growth strategies",
        "Interest-only structuring tips",
        "New builds maximise tax benefits",
      ],
    },
    {
      title: "Depreciation Guide",
      description:
        "Maximise tax via Division 43 (capital works) and Division 40 (plant & equipment).",
      icon: Percent,
      link: "/guides/depreciation",
      calculatorLink: "/calculators/depreciation",
      categories: ["Investment"],
      states: ALL_STATES,
      keyPoints: [
        "Division 43: 2.5% of construction cost per year",
        "Division 40: fixtures, fittings, appliances",
        "Post-9 May 2017 second-hand rules apply",
      ],
    },
    {
      title: "Capital Gains Guide",
      description:
        "Navigate CGT on investment sales — discounts, exemptions, and timing strategies.",
      icon: Coins,
      link: "/guides/capital-gains",
      calculatorLink: "/calculators/capital-gains",
      categories: ["Investment"],
      states: ALL_STATES,
      keyPoints: [
        "50% CGT discount for 12+ month holdings",
        "Main residence exemption rules",
        "Timing strategies to minimise tax",
      ],
    },
  ];

  const filters: Array<"All" | Category> = [
    "All",
    "Grants",
    "Stamp Duty",
    "Repayments",
    "Borrowing Power",
    "Investment",
  ];
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");
  const [activeState, setActiveState] = useState<"All" | State>("All");

  const visibleGuides = useMemo(() => {
    return guides.filter((g) => {
      const catMatch = activeFilter === "All" || g.categories.includes(activeFilter);
      const stateMatch =
        activeState === "All" || !g.states || g.states.length === 0 || g.states.includes(activeState);
      return catMatch && stateMatch;
    });
  }, [activeFilter, activeState]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Home Loan Guides — grants, stamp duty, LMI, borrowing power"
        description="Plain-English Australian home loan guides updated for April 2026. Every federal and state first home buyer scheme, stamp duty rules by state, LMI, repayments and borrowing power explained."
        canonical="https://halp-loan-compass.lovable.app/guides"
        keywords="home loan guides Australia, first home buyer grants 2026, stamp duty by state, LMI calculator, borrowing power, FHOG, First Home Guarantee, Help to Buy"
      />
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Plain-English home loan guides
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Updated for April 2026 — covering every federal and state scheme,
                stamp duty rules, and the numbers that actually matter when you buy.
              </p>
            </div>
          </div>
        </section>

        {/* What's New callout */}
        <section className="pt-10">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-xl md:text-2xl font-semibold">
                      What's new for first home buyers in 2026
                    </h2>
                    <Badge variant="secondary">Updated 22 Apr 2026</Badge>
                  </div>
                  <ul className="text-muted-foreground space-y-1.5 text-sm md:text-base">
                    <li>
                      <strong>First Home Guarantee (5% Deposit Scheme)</strong> — income caps,
                      place caps and price caps all lifted from 1 October 2025. Sydney cap now $1.5M.
                    </li>
                    <li>
                      <strong>Help to Buy</strong> launched 5 December 2025 — government takes up to
                      <strong> 40% equity on new builds</strong> (30% on existing) with just a 2% deposit.
                    </li>
                    <li>
                      <strong>QLD $30,000 FHOG</strong> on new builds expires <strong>30 June 2026</strong>,
                      then reverts to $15,000. QLD also charges zero stamp duty on new homes.
                    </li>
                    <li>
                      <strong>VIC off-the-plan duty concession</strong> extended to <strong>20 October 2026</strong>.
                    </li>
                    <li>
                      Combined government benefits typically reach <strong>$60K–$100K+</strong> when schemes
                      are stacked correctly.
                    </li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link to="/guides/government-grants">
                      <Button>Read the Grants Guide</Button>
                    </Link>
                    <Link to="/calculators/government-grants">
                      <Button variant="outline">Check what you qualify for</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filter chips */}
        <section className="pt-10">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Topic filters */}
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter guides by topic">
                <span className="text-sm text-muted-foreground mr-2 min-w-[3.5rem]">Topic:</span>
                {filters.map((f) => {
                  const active = f === activeFilter;
                  return (
                    <button
                      key={f}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>

              {/* State filters */}
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter guides by Australian state">
                <span className="text-sm text-muted-foreground mr-2 inline-flex items-center gap-1 min-w-[3.5rem]">
                  <MapPin className="h-3.5 w-3.5" /> State:
                </span>
                {(["All", ...ALL_STATES] as Array<"All" | State>).map((s) => {
                  const active = s === activeState;
                  return (
                    <button
                      key={s}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveState(s)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {visibleGuides.map((guide, index) => (
                <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <guide.icon className="h-6 w-6 text-primary" />
                      </div>
                      {guide.highlight && (
                        <Badge variant="secondary" className="shrink-0">
                          {guide.highlight}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {guide.categories.map((c) => (
                        <Badge key={c} variant="outline" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                    <CardDescription className="mt-3">{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-4">
                    <Separator />
                    <ul className="space-y-2">
                      {guide.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Separator />
                    <div className="space-y-2">
                      <Link to={guide.link}>
                        <Button variant="outline" className="w-full">
                          Read Guide
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      {guide.showTryCalculator && (
                        <Link to={guide.calculatorLink}>
                          <Button className="w-full">
                            <Calculator className="h-4 w-4 mr-2" />
                            {guide.calculatorLabel ?? "Try the calculator"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {visibleGuides.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-12">
                  No guides match these filters yet.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready when you are.</h2>
              <p className="text-xl text-muted-foreground mb-8">
                A quick chat with a HALP broker. We'll tell you what you can borrow,
                which grants you qualify for, and what your next move is.
              </p>
              <Link to="/apply">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Talk to a Broker
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Guides;
