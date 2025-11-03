import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { RefreshCw, CheckCircle, Calculator, ArrowRight } from "lucide-react";

const RefinanceLoans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <RefreshCw className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Refinance Loans
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            Better rates and terms for existing homeowners
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Refinance Your Home Loan?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Refinancing means switching your existing home loan to a new lender or loan product to take advantage 
              of better interest rates, improved features, or to access equity in your home. With potential savings 
              of $5,000-$20,000+ over the life of your loan, refinancing could be one of the smartest financial moves you make.
            </p>
          </div>

          {/* Benefits */}
          <Card className="mb-12 border-2 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Key Refinancing Benefits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Lower Interest Rates</h4>
                    <p className="text-sm text-muted-foreground">
                      Save thousands by securing a lower rate - even 0.5% can make a huge difference
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Debt Consolidation</h4>
                    <p className="text-sm text-muted-foreground">
                      Roll high-interest debts (credit cards, car loans) into your lower-rate mortgage
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Access Home Equity</h4>
                    <p className="text-sm text-muted-foreground">
                      Use equity for renovations, investment properties, or other major purchases
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Better Loan Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Switch to loans with offset accounts, redraw facilities, or flexible repayments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* When to Refinance */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">When Should You Refinance?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Interest rates have dropped:</strong> Even 0.25% lower can justify refinancing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Fixed rate ending:</strong> Your fixed term is expiring and reverting to a higher variable rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>High-interest debts:</strong> You have credit cards or personal loans with rates over 8%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Home value increased:</strong> Built equity and want to avoid LMI or access funds</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Lifestyle changes:</strong> Income increased, wanting to pay off faster, or need more flexibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Planning renovations:</strong> Need to access equity for home improvements</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Process */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">The Refinancing Process</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Calculate Your Savings</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our refinance calculator to see potential savings vs. costs (discharge fees, application fees, etc.)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Compare Lenders</h4>
                    <p className="text-sm text-muted-foreground">
                      Our brokers compare 40+ lenders to find the best rate and features for your situation
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Submit Application</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide documents (payslips, rates notice, current loan statements) - we handle the paperwork
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Approval & Settlement</h4>
                    <p className="text-sm text-muted-foreground">
                      New lender orders valuation, approves loan, and handles discharge with old lender (2-6 weeks)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-semibold mb-2">Start Saving</h4>
                    <p className="text-sm text-muted-foreground">
                      Begin lower repayments or accelerate payoff with your improved loan terms
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Costs to Consider */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Costs to Consider</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Discharge Fees</h4>
                  <p className="text-sm text-muted-foreground">$150-$500 to exit your current loan</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Application Fees</h4>
                  <p className="text-sm text-muted-foreground">$0-$700 (often waived with broker)</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Valuation Fees</h4>
                  <p className="text-sm text-muted-foreground">$0-$300 (sometimes covered by lender)</p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Break Costs</h4>
                  <p className="text-sm text-muted-foreground">$0-$10,000+ if exiting fixed rate early</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Tip:</strong> These costs are typically recovered within 12-24 months through interest savings
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Refinance Savings</h3>
            <p className="text-muted-foreground mb-6">
              See how much you could save by refinancing your home loan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/refinance">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Refinance Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculators/lender-comparison">
                <Button size="lg" variant="outline">
                  Compare Lenders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefinanceLoans;
