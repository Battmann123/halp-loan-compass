import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Calculator, ArrowRight } from "lucide-react";

const LowDocLoans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Low Doc Loans
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            For self-employed and small business owners
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">What are Low Doc Loans?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Low documentation (Low Doc) loans are designed for self-employed borrowers, contractors, and small 
              business owners who may not have traditional income documentation like payslips or tax returns. These 
              loans use alternative documentation to verify income, making homeownership accessible to the 2+ million 
              self-employed Australians.
            </p>
          </div>

          {/* Who Benefits */}
          <Card className="mb-12 border-2 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Who Benefits from Low Doc Loans?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Self-Employed Individuals</h4>
                    <p className="text-sm text-muted-foreground">
                      Sole traders, freelancers, and contractors with variable income
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Small Business Owners</h4>
                    <p className="text-sm text-muted-foreground">
                      Business owners who maximize deductions and show lower taxable income
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Recently Self-Employed</h4>
                    <p className="text-sm text-muted-foreground">
                      Less than 2 years in business without full financials available
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Multiple Income Sources</h4>
                    <p className="text-sm text-muted-foreground">
                      Multiple businesses or complex income structures
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Documentation */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Acceptable Income Documentation</h3>
              <div className="space-y-4">
                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Business Activity Statements (BAS)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Last 2 quarters of BAS statements showing business turnover
                  </p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Accountant's Declaration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Statement from qualified accountant confirming income levels
                  </p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    ABN Registration & License
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Valid ABN registration (minimum 12 months) and relevant trade licenses
                  </p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Bank Statements
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    6-12 months business account statements showing regular deposits
                  </p>
                </div>
                <div className="bg-secondary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Notice of Assessment (Optional)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Most recent tax return if available (not always required)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Low Doc Loan Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Higher Deposits Required</h4>
                    <p className="text-sm text-muted-foreground">
                      Typically 20% deposit minimum (some lenders accept 10% with LMI)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Competitive Rates</h4>
                    <p className="text-sm text-muted-foreground">
                      Rates typically 0.5-1% higher than full doc loans
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Fast Approval</h4>
                    <p className="text-sm text-muted-foreground">
                      Quicker processing with less documentation required
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Same Loan Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Access to offset accounts, redraw, and flexible repayments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Eligibility Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>ABN registered for minimum 12 months (some lenders accept 6 months)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Minimum 20% deposit (10% possible with stronger application)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Good credit history with no defaults or judgments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Accountant's declaration from qualified CPA or chartered accountant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Genuine savings or demonstrated equity in business/property</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Tips for Success */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Tips for a Successful Application</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                  <p className="text-sm">Maintain clean business bank statements for at least 6 months before applying</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</div>
                  <p className="text-sm">Keep BAS lodgements up to date and filed on time</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</div>
                  <p className="text-sm">Work with an accountant who has experience with low doc loan declarations</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">4</div>
                  <p className="text-sm">Save a larger deposit if possible to secure better rates and terms</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">5</div>
                  <p className="text-sm">Use a mortgage broker who specializes in self-employed lending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Low Doc Loan</h3>
            <p className="text-muted-foreground mb-6">
              See how much you can borrow as a self-employed borrower
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/borrowing-power">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Borrowing Power Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculators/serviceability">
                <Button size="lg" variant="outline">
                  Serviceability Calculator
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

export default LowDocLoans;
