import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import { Calculator, BookOpen, ArrowLeft, DollarSign, Calendar, Percent, Banknote } from "lucide-react";

const repaymentStats = [
  { icon: Calendar, value: "26 pmts", label: "Fortnightly = 13 monthly equivalents per year" },
  { icon: Percent, value: "0.25%", label: "Rate move ≈ $80/mo on $500K loan" },
  { icon: Banknote, value: "$2,998", label: "Monthly P&I on $500K @ 6% over 30 yrs" },
  { icon: DollarSign, value: "4–5 yrs", label: "Saved by switching monthly → fortnightly" },
];

const repaymentFAQs = [
  {
    q: "What's the difference between Principal & Interest and Interest Only?",
    a: "Principal & Interest (P&I) repayments pay down the loan balance each month, so over the loan term you fully repay the mortgage. Interest Only (IO) repayments only cover the interest charge — the balance does not reduce. IO is usually limited to 5 years and costs more in total interest, but is common for investors maximising tax deductions.",
  },
  {
    q: "Should I pay weekly, fortnightly or monthly?",
    a: "Fortnightly repayments set at half the monthly amount mean you make 26 payments per year (the equivalent of 13 monthly payments instead of 12). On a typical 30-year loan this can shave 4–5 years off the term and save tens of thousands in interest. Weekly works similarly. Most lenders allow you to switch frequency at no cost.",
  },
  {
    q: "How is my mortgage repayment calculated?",
    a: "The standard P&I formula is: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate / 12), and n is the number of monthly payments (years × 12). Example: $500,000 at 6.0% over 30 years = $2,998/month.",
  },
  {
    q: "How much does a 0.25% rate change cost me?",
    a: "On a $500,000 loan over 30 years, a 0.25% rate change moves the monthly repayment by roughly $80, and total interest paid over 30 years by roughly $29,000. On a $750,000 loan it's around $120/month and $43,000 over the life of the loan.",
  },
  {
    q: "What is an offset account and how does it save interest?",
    a: "An offset account is a transaction account linked to your home loan. The balance is offset against the loan balance when interest is calculated — so $20,000 in offset on a $500,000 loan means you only pay interest on $480,000. Unlike extra repayments, offset funds stay liquid and accessible.",
  },
  {
    q: "Can I make extra repayments on a fixed rate loan?",
    a: "Most fixed rate loans cap extra repayments at $10,000–$30,000 per year (lender dependent). Exceeding the cap or paying out the loan early may trigger break costs. Variable rate loans typically allow unlimited extra repayments.",
  },
];

const RepaymentGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Mortgage Repayment Guide — P&I vs IO, frequency, extra repayments"
        description="How home loan repayments work in Australia: Principal & Interest vs Interest Only, weekly vs fortnightly vs monthly, offset accounts, extra repayments and the formula behind it all."
        canonical="https://halp-loan-compass.lovable.app/guides/repayment"
        keywords="mortgage repayment calculator, principal and interest, interest only, fortnightly repayments, offset account, extra repayments Australia"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/repayment" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Repayment Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Step-by-step instructions and real-world examples
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GuideStatsBar stats={repaymentStats} />

          
          {/* What It Does */}
          <Card>
            <CardHeader>
              <CardTitle>What This Calculator Does</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Repayment Calculator helps you understand your home loan repayments by calculating:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your monthly, fortnightly, or weekly repayment amounts</li>
                <li>Total interest paid over the loan term</li>
                <li>Complete amortization schedule showing how your loan reduces over time</li>
                <li>Comparison between principal & interest vs interest-only repayments</li>
              </ul>
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
                    <h4 className="font-semibold mb-2">Enter Loan Amount</h4>
                    <p className="text-sm text-muted-foreground">
                      This is the amount you want to borrow. For example, if you're buying a $600,000 property 
                      with a $100,000 deposit, your loan amount would be $500,000.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Select Interest Rate</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the annual interest rate offered by your lender. Current rates typically range from 
                      5.5% to 7.5% depending on whether you choose fixed or variable.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Choose Loan Term</h4>
                    <p className="text-sm text-muted-foreground">
                      Most home loans are 30 years, but you can select 15, 20, 25, or 30 years. 
                      Shorter terms mean higher repayments but less total interest paid.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Select Payment Frequency</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose monthly, fortnightly, or weekly payments. Fortnightly and weekly payments can 
                      save you interest over the life of the loan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-semibold mb-2">View Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Review your repayment amount, total interest, and complete payment schedule. 
                      Adjust the inputs to see how different scenarios affect your repayments.
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
                <h4 className="font-semibold text-lg mb-4">Example 1: First Home Buyer</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Scenario:</span>
                    <span className="font-medium">Purchasing first apartment</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Price:</span>
                    <span className="font-medium">$550,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (10%):</span>
                    <span className="font-medium">$55,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">$495,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Interest Rate:</span>
                    <span className="font-medium">6.5% p.a.</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Term:</span>
                    <span className="font-medium">30 years</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Monthly Repayment:</span>
                      <span className="font-bold text-primary">$3,130</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Total Interest:</span>
                      <span className="font-medium">$631,800</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 2: Growing Family</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Scenario:</span>
                    <span className="font-medium">House & land package</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Total Cost:</span>
                    <span className="font-medium">$750,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (20%):</span>
                    <span className="font-medium">$150,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">$600,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Interest Rate:</span>
                    <span className="font-medium">6.0% p.a.</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Term:</span>
                    <span className="font-medium">25 years</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Monthly Repayment:</span>
                      <span className="font-bold text-primary">$3,866</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Total Interest:</span>
                      <span className="font-medium">$559,800</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Note:</strong> By choosing a 25-year term instead of 30 years, this family 
                      saves approximately $127,000 in interest despite higher monthly repayments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 3: Investment Property</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Scenario:</span>
                    <span className="font-medium">Interest-only investment loan</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Price:</span>
                    <span className="font-medium">$500,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (20%):</span>
                    <span className="font-medium">$100,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">$400,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Interest Rate:</span>
                    <span className="font-medium">6.8% p.a.</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Interest-Only Period:</span>
                    <span className="font-medium">5 years</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Monthly Repayment (I/O):</span>
                      <span className="font-bold text-primary">$2,267</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">After 5 Years (P&I):</span>
                      <span className="font-medium">$2,733</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Note:</strong> Interest-only repayments are lower initially, helping with cash flow, 
                      but the full principal must be repaid over the remaining term.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Tips & Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Consider Fortnightly Payments:</strong> Paying fortnightly instead of monthly 
                    results in 26 payments per year (equivalent to 13 monthly payments), reducing your loan faster.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Add Buffer to Budget:</strong> Add 1-2% to the interest rate when budgeting 
                    to ensure you can afford rate increases.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Compare Loan Terms:</strong> Use the calculator to compare 25-year vs 30-year 
                    terms to see the impact on both monthly repayments and total interest.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Factor in All Costs:</strong> Remember this calculator shows only principal and 
                    interest. Budget for rates, insurance, and maintenance separately.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          <GuideFAQ items={repaymentFAQs} />

          {/* CTA */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Ready to Calculate Your Repayments?</h3>
            <p className="text-muted-foreground mb-6">
              Try the calculator with your own numbers
            </p>
            <Link to="/calculators/repayment">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Repayment Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RepaymentGuide;
