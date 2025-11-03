import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Home, CheckCircle, Calculator, ArrowRight } from "lucide-react";

const OffThePlanLoans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Home className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Off-the-Plan Loans
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            Specialized financing for apartment and townhouse developments
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">What is an Off-the-Plan Loan?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Off-the-plan loans are designed for purchasing properties that haven't been built yet, typically apartments 
              and townhouses in new developments. You sign the contract and pay a deposit now, but settlement occurs 
              12-24 months later when construction is complete, allowing you to lock in today's prices for tomorrow's property.
            </p>
          </div>

          {/* Key Features */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Key Advantages</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Extended Settlement</h4>
                    <p className="text-sm text-muted-foreground">
                      Typically 12-24 months to save more deposit and prepare for settlement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Price Lock-In</h4>
                    <p className="text-sm text-muted-foreground">
                      Lock in today's price even if the market rises during construction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">First Home Buyer Benefits</h4>
                    <p className="text-sm text-muted-foreground">
                      Access grants, stamp duty concessions, and the 5% deposit scheme
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Brand New Property</h4>
                    <p className="text-sm text-muted-foreground">
                      Modern design, warranties, and lower maintenance costs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">How Off-the-Plan Purchases Work</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Contract Signing</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign contract and pay 10% deposit (usually in stages: 5% at contract, 5% within 3 months)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Construction Period</h4>
                    <p className="text-sm text-muted-foreground">
                      Developer builds the property (12-24 months). No loan payments during this time.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Pre-Settlement Inspection</h4>
                    <p className="text-sm text-muted-foreground">
                      Inspect your property before settlement and ensure it matches contract specifications
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Final Settlement</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete your purchase, move in, and begin loan repayments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Considerations */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Important Considerations</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Sunset Clause Protection:</strong> Understand your rights if construction is delayed beyond the sunset date</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Market Valuation Risk:</strong> Property must value at purchase price at settlement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Finance Contingency:</strong> Include finance clauses in your contract for protection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Developer Research:</strong> Check developer's track record and financial stability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Legal Review:</strong> Have your conveyancer review all contracts before signing</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Plan Your Off-the-Plan Purchase</h3>
            <p className="text-muted-foreground mb-6">
              Calculate your deposit, stamp duty savings, and government grants
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/government-grants">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Government Grants Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculators/stamp-duty">
                <Button size="lg" variant="outline">
                  Stamp Duty Calculator
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

export default OffThePlanLoans;
