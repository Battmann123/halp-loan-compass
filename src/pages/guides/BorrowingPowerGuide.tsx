import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import { Calculator, BookOpen, ArrowLeft, DollarSign, TrendingUp, Percent, CreditCard } from "lucide-react";

const borrowingStats = [
  { icon: Percent, value: "+3%", label: "APRA stress-test buffer on actual rate" },
  { icon: TrendingUp, value: "$500K+", label: "Typical capacity for $100K single, no debts" },
  { icon: CreditCard, value: "$10K limit", label: "Credit card ≈ $40–$50K less borrowing" },
  { icon: DollarSign, value: "$100K+", label: "Variance between lenders for same applicant" },
];

const borrowingPowerFAQs = [
  {
    q: "How do lenders calculate borrowing power?",
    a: "Lenders assess your net income, subtract living expenses (HEM benchmark or your declared expenses, whichever is higher), subtract existing debt commitments, then test whether you can afford the proposed loan repayment at the assessment rate (the actual rate plus a ~3% buffer required by APRA).",
  },
  {
    q: "What is the APRA serviceability buffer?",
    a: "Since October 2021 APRA has required lenders to assess loan repayments at the actual interest rate plus a 3 percentage point buffer. So if your rate is 6.0%, the lender tests whether you can afford repayments at 9.0%. This reduces borrowing power by roughly 25–30% versus testing at the actual rate.",
  },
  {
    q: "How much can a single person on $100K borrow?",
    a: "A rough guide: a single applicant earning $100K with no debts, no dependents and a 20% deposit can borrow approximately $500K–$580K depending on the lender. With HECS debt, dependents or other loans, this drops significantly.",
  },
  {
    q: "Do credit cards reduce my borrowing power?",
    a: "Yes — lenders assess credit cards on the limit, not the balance. A $10,000 limit typically reduces borrowing power by ~$40,000–$50,000. Cancelling or reducing unused credit card limits before applying can materially increase what you can borrow.",
  },
  {
    q: "How does HECS/HELP affect borrowing power?",
    a: "Lenders treat HECS repayments as ongoing debt commitments. The compulsory repayment scales with income (1%–10% of pre-tax income). A $50K HECS balance on a $100K income reduces borrowing power by roughly $40K–$70K depending on lender policy.",
  },
  {
    q: "Why do different lenders give different borrowing limits?",
    a: "Lenders use different living expense floors (HEM), apply different shading to bonus, overtime, rental and self-employed income, treat existing debt differently, and use different stress-test methodologies. Borrowing limits can vary by $100K+ between lenders for the same applicant.",
  },
];

const BorrowingPowerGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Borrowing Power Guide — how much can I borrow in Australia?"
        description="How lenders calculate borrowing capacity in Australia: income assessment, the 3% APRA stress test buffer, HEM living expenses, debts and HECS — and strategies to maximise what you can borrow."
        canonical="https://halp-loan-compass.lovable.app/guides/borrowing-power"
        keywords="borrowing power calculator, how much can I borrow, APRA serviceability buffer, HEM, mortgage capacity Australia"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/borrowing-power" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Borrowing Power Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Learn how much you can borrow based on your income
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          {/* What It Does */}
          <Card>
            <CardHeader>
              <CardTitle>What This Calculator Does</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Borrowing Power Calculator estimates the maximum amount lenders will allow you to borrow based on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your gross annual income (before tax)</li>
                <li>Your existing financial commitments and debts</li>
                <li>Your living expenses</li>
                <li>Number of dependents</li>
                <li>Current interest rates and lending criteria</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                This calculator uses conservative estimates based on typical lender assessment rates. 
                Actual borrowing capacity may vary between lenders.
              </p>
            </CardContent>
          </Card>

          {/* Step by Step */}
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Enter Your Annual Income</h4>
                    <p className="text-sm text-muted-foreground">
                      Input your gross annual income (before tax). If applying with a partner, add both incomes together. 
                      Include salary, bonuses, and overtime if regular. Self-employed income may be assessed differently.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">List Monthly Commitments</h4>
                    <p className="text-sm text-muted-foreground">
                      Include all monthly debt payments: credit cards (use limits not balances), personal loans, 
                      car loans, HECS/HELP, other mortgages. Lenders assess credit card limits at 3% per month 
                      regardless of actual balance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Add Monthly Living Expenses</h4>
                    <p className="text-sm text-muted-foreground">
                      Include typical monthly expenses: groceries, utilities, insurance, transport, childcare, 
                      entertainment. Lenders use HEM (Household Expenditure Measure) if your stated expenses are 
                      below benchmarks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Number of Dependents</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the number of children or dependents. This affects the minimum living expense 
                      benchmarks used by lenders.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-semibold mb-2">Review Borrowing Capacity</h4>
                    <p className="text-sm text-muted-foreground">
                      See your estimated maximum borrowing capacity. Remember, just because you can borrow this 
                      amount doesn't mean you should - budget carefully!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Real-World Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Example 1 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 1: Single First Home Buyer</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Annual Income:</span>
                    <span className="font-medium">$85,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Monthly Commitments:</span>
                    <span className="font-medium">$500 (car loan + HECS)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Monthly Living Expenses:</span>
                    <span className="font-medium">$2,500</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Dependents:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Estimated Borrowing Power:</span>
                      <span className="font-bold text-primary">$440,000 - $480,000</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Tip:</strong> By paying off the $15,000 car loan before applying, borrowing power 
                      could increase by approximately $75,000.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 2: Couple with Children</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Combined Annual Income:</span>
                    <span className="font-medium">$150,000 ($95k + $55k)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Monthly Commitments:</span>
                    <span className="font-medium">$800 (credit cards $20k limit)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Monthly Living Expenses:</span>
                    <span className="font-medium">$4,500</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Dependents:</span>
                    <span className="font-medium">2 children</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Estimated Borrowing Power:</span>
                      <span className="font-bold text-primary">$720,000 - $780,000</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Important:</strong> Reducing credit card limits from $20,000 to $5,000 could 
                      increase borrowing capacity by approximately $50,000.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 3: High-Income Investor</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Annual Income:</span>
                    <span className="font-medium">$180,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Monthly Commitments:</span>
                    <span className="font-medium">$2,800 (existing home loan)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Monthly Living Expenses:</span>
                    <span className="font-medium">$3,500</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Rental Income Expected:</span>
                    <span className="font-medium">$2,200/month</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Additional Borrowing Power:</span>
                      <span className="font-bold text-primary">$650,000 - $700,000</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Note:</strong> Lenders typically assess only 80% of rental income when calculating 
                      borrowing capacity for investment properties.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Tips to Maximize Borrowing Power</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Reduce Credit Card Limits:</strong> Even if you pay them off monthly, lenders assess 
                    limits at 3% per month. A $20,000 limit costs you $75,000+ in borrowing power.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Pay Off Small Debts:</strong> Eliminate car loans, personal loans, and Afterpay before 
                    applying. Every $100/month freed up adds ~$20,000 to borrowing capacity.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Boost Your Deposit:</strong> A 20% deposit avoids LMI and may access better rates, 
                    increasing what you can afford to borrow.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Joint Applications:</strong> Applying with a partner/spouse typically increases 
                    borrowing capacity significantly due to combined incomes.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Improve Credit Score:</strong> A good credit score (700+) may qualify you for better 
                    rates and terms from more lenders.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Shop Around:</strong> Different lenders have different calculators and policies. 
                    A broker can find lenders that suit your situation.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card>
            <CardHeader>
              <CardTitle>Common Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-destructive font-bold">✕</span>
                  <div>
                    <strong>Borrowing the Maximum:</strong> Just because you can borrow $700k doesn't mean you 
                    should. Leave buffer for rate rises and life changes.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-bold">✕</span>
                  <div>
                    <strong>Forgetting Future Expenses:</strong> Consider upcoming life changes like children, 
                    career changes, or reduced work hours.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-bold">✕</span>
                  <div>
                    <strong>Ignoring Interest Rate Rises:</strong> Lenders assess at rates 2-3% higher than current 
                    rates. Ensure you can afford repayments if rates increase.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          <GuideFAQ items={borrowingPowerFAQs} />

          {/* CTA */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Borrowing Power</h3>
            <p className="text-muted-foreground mb-6">
              Find out how much you can borrow based on your income
            </p>
            <Link to="/calculators/borrowing-power">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Borrowing Power Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BorrowingPowerGuide;
