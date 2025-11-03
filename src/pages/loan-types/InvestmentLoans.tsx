import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrendingUp, CheckCircle, Calculator, ArrowRight } from "lucide-react";

const InvestmentLoans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <TrendingUp className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Investment Property Loans
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            Maximize returns on new property investments
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">Build Your Property Portfolio</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Investment property loans are specifically structured for purchasing properties to generate rental income 
              and capital growth. New property investments offer maximum tax benefits through depreciation allowances, 
              making them ideal for building wealth through property.
            </p>
          </div>

          {/* Tax Benefits */}
          <Card className="mb-12 border-2 border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Powerful Tax Benefits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Tax-Deductible Interest</h4>
                    <p className="text-sm text-muted-foreground">
                      All loan interest payments are 100% tax deductible against rental income
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Depreciation Allowances</h4>
                    <p className="text-sm text-muted-foreground">
                      Claim up to $10,000-$15,000 annually on new property fixtures and fittings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Negative Gearing</h4>
                    <p className="text-sm text-muted-foreground">
                      Offset rental losses against your taxable income for immediate tax savings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Capital Works Deductions</h4>
                    <p className="text-sm text-muted-foreground">
                      2.5% of construction costs claimed annually over 40 years
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Features */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Investment Loan Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Interest-Only Options</h4>
                    <p className="text-sm text-muted-foreground">
                      Lower monthly payments during construction and early ownership (1-5 years)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Higher Borrowing Capacity</h4>
                    <p className="text-sm text-muted-foreground">
                      80% of rental income counted toward serviceability calculations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Offset Accounts</h4>
                    <p className="text-sm text-muted-foreground">
                      Park rental income to reduce interest while maintaining tax deductibility
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Portfolio Lending</h4>
                    <p className="text-sm text-muted-foreground">
                      Leverage existing properties to purchase additional investments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Strategy */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Smart Investment Strategy</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Research Growth Areas</h4>
                    <p className="text-sm text-muted-foreground">
                      Target areas with infrastructure development, population growth, and rental demand
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Choose New Properties</h4>
                    <p className="text-sm text-muted-foreground">
                      Maximize depreciation benefits and minimize maintenance costs in early years
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Structure Correctly</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up separate loan accounts and maintain detailed records for tax purposes
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Get Professional Advice</h4>
                    <p className="text-sm text-muted-foreground">
                      Work with quantity surveyors and accountants to maximize tax benefits
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Investment Loan Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Minimum 10% deposit (20% preferred to avoid LMI)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Strong credit history and demonstrated savings capacity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Sufficient income to service both current and investment loans</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Property must meet lender's rental income requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Exit strategy and investment goals clearly defined</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Investment Returns</h3>
            <p className="text-muted-foreground mb-6">
              Analyze cash flow, depreciation benefits, and long-term capital growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/investment-property">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Investment Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculators/depreciation">
                <Button size="lg" variant="outline">
                  Depreciation Calculator
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

export default InvestmentLoans;
