import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, CheckCircle, Calculator, ArrowRight, Gift } from "lucide-react";

const FirstHomeBuyerLoans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Users className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            First Home Buyer Loans
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            400,000+ Australians newly eligible for 5% deposit scheme
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">Breaking Into the Property Market</h2>
            <p className="text-lg text-muted-foreground mb-8">
              First home buyer loans provide special access to government schemes, grants, and concessions that can 
              significantly reduce the deposit required and upfront costs. With the expanded 5% deposit scheme and 
              generous state-based grants, buying your first home is more achievable than ever.
            </p>
          </div>

          {/* Government Support */}
          <Card className="mb-12 border-2 border-primary">
            <CardContent className="p-8">
              <Gift className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-6">Government Support Available</h3>
              <div className="space-y-4">
                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 text-lg">Home Guarantee Scheme (5% Deposit)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Buy with just 5% deposit and avoid Lenders Mortgage Insurance (LMI) worth $10,000-$30,000+
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>400,000+ Australians now eligible (expanded income caps)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Singles up to $125,000 income, couples up to $200,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Property price caps: $800,000 (regional) to $1M+ (Sydney/Melbourne)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 text-lg">First Home Owner Grants</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cash grants for purchasing or building new homes (varies by state)
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>NSW: $10,000 grant for new homes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>VIC: Up to $20,000 for regional builds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>QLD: $30,000 for new builds under $750,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>WA: Up to $10,000 for new homes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 text-lg">Stamp Duty Concessions</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Save thousands with full or partial stamp duty exemptions
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Full exemptions available in most states for properties under certain thresholds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Partial concessions for properties above base threshold</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Options */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">First Home Buyer Loan Options</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">5% Deposit + Guarantor</h4>
                    <p className="text-sm text-muted-foreground">
                      Parents or family provide security against their property to boost your deposit
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Standard 10-20% Deposit</h4>
                    <p className="text-sm text-muted-foreground">
                      Traditional approach with lower LMI costs and more lender options
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Shared Equity Schemes</h4>
                    <p className="text-sm text-muted-foreground">
                      Government or providers contribute up to 40% of purchase price
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">First Home Super Saver</h4>
                    <p className="text-sm text-muted-foreground">
                      Withdraw up to $50,000 from super for your deposit
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Your First Home Buying Journey</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Calculate Your Budget</h4>
                    <p className="text-sm text-muted-foreground">
                      Determine how much you can borrow and what you can afford using our calculators
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Check Your Eligibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Review government scheme requirements and available grants in your state
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Get Pre-Approval</h4>
                    <p className="text-sm text-muted-foreground">
                      Speak with our brokers to secure pre-approval and increase your negotiating power
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Start House Hunting</h4>
                    <p className="text-sm text-muted-foreground">
                      Shop with confidence knowing your budget and available schemes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your First Home Buying Power</h3>
            <p className="text-muted-foreground mb-6">
              See what you can afford and how much government support you'll receive
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/government-grants">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Government Grants Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculators/borrowing-power">
                <Button size="lg" variant="outline">
                  Borrowing Power Calculator
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

export default FirstHomeBuyerLoans;
