import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const Guides = () => {
  const guides = [
    {
      title: "Government Grants Guide",
      description:
        "First Home Guarantee (5% deposit, no income or place caps since Oct 2025), Help to Buy shared equity (up to 40% on new builds), FHSS, Family Home Guarantee, plus state FHOG amounts from $10K (NSW/VIC/WA) up to $50K (NT).",
      icon: DollarSign,
      link: "/guides/government-grants",
      highlight: "Updated Apr 2026",
    },
    {
      title: "Stamp Duty Guide",
      description:
        "State-by-state FHB exemptions and concessions: NSW exempt to $800K, VIC exempt to $600K, QLD zero duty on new homes (no price cap), SA stamp duty abolished on new builds, plus ACT, WA, TAS and NT.",
      icon: Home,
      link: "/guides/stamp-duty",
      highlight: "Updated Apr 2026",
    },
    {
      title: "Upfront Costs Guide",
      description:
        "Plan your full purchase budget. Worked examples show combined government benefits of $52K–$72K on a typical $580K–$650K first home — bringing a 20% deposit requirement down to as little as 2–5%.",
      icon: PiggyBank,
      link: "/guides/upfront-costs",
    },
    {
      title: "LMI Guide",
      description:
        "How Lenders Mortgage Insurance works, when it applies, and how to avoid it — including the federal 5% Deposit Scheme which can save $14,000–$30,000 in LMI on properties from $500K to $1M.",
      icon: Shield,
      link: "/guides/lmi",
    },
    {
      title: "Borrowing Power Guide",
      description:
        "How lenders calculate your capacity using income, expenses, debts and a stress-test buffer — plus strategies to maximise your borrowing power without overextending.",
      icon: TrendingUp,
      link: "/guides/borrowing-power",
    },
    {
      title: "Loan Repayment Guide",
      description:
        "Master Principal & Interest vs Interest Only, weekly/fortnightly/monthly frequencies, and money-saving strategies that can shave years off your mortgage.",
      icon: Calculator,
      link: "/guides/repayment",
    },
    {
      title: "Serviceability Guide",
      description:
        "How lenders assess your ability to service a loan — including the ~3% stress-test buffer, HEM benchmarks, and income shading rules that differ between lenders.",
      icon: BarChart3,
      link: "/guides/serviceability",
    },
    {
      title: "Extra Repayments Guide",
      description:
        "How extra payments compound: pay fortnightly instead of monthly, redirect tax returns, and start early to save tens of thousands in interest.",
      icon: Calendar,
      link: "/guides/extra-repayments",
    },
    {
      title: "Refinance Guide",
      description:
        "Decide whether to refinance using a full cost/benefit framework — break costs, switching fees (typically $2K–$4K), LMI re-payable above 80% LVR, and cashback clawback terms.",
      icon: RefreshCw,
      link: "/guides/refinance",
    },
    {
      title: "Lender Comparison Guide",
      description:
        "Compare 40+ lenders on rate, fees, features (offset, redraw, splits), and policy — including specialist lenders for self-employed, temporary visa holders, and non-residents.",
      icon: Scale,
      link: "/guides/lender-comparison",
    },
    {
      title: "Investment Property Guide",
      description:
        "Analyse rental returns, cash flow, depreciation and capital growth. Includes structuring tips, interest-only strategies, and how new builds maximise tax benefits.",
      icon: Building,
      link: "/guides/investment-property",
    },
    {
      title: "Depreciation Guide",
      description:
        "Maximise tax via Division 43 (capital works) and Division 40 (plant & equipment). Note: second-hand residential property acquired after 9 May 2017 has restricted P&E deductions.",
      icon: Percent,
      link: "/guides/depreciation",
    },
    {
      title: "Capital Gains Guide",
      description:
        "Navigate CGT on investment property sales — the 50% discount for individuals holding 12+ months, main residence exemption, and timing strategies to minimise tax.",
      icon: Coins,
      link: "/guides/capital-gains",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
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

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {guides.map((guide, index) => (
                <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <guide.icon className="h-6 w-6 text-primary" />
                      </div>
                      {guide.highlight && (
                        <Badge variant="secondary" className="shrink-0">
                          {guide.highlight}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <CardDescription className="mt-2">{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Link to={guide.link}>
                      <Button variant="outline" className="w-full">
                        Read Guide
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
