import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, BookOpen, ArrowLeft, TrendingUp, DollarSign } from "lucide-react";

const InvestmentPropertyGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/investment-property" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Investment Property Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Analyze returns, cash flow, and tax benefits
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>What This Calculator Does</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Investment Property Calculator helps you evaluate the financial viability of property 
                investments by calculating:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Weekly/monthly rental income and cash flow position</li>
                <li>Annual tax deductions including interest and depreciation</li>
                <li>Capital growth projections over time</li>
                <li>Total return on investment (ROI) including capital gains</li>
                <li>Negative gearing tax benefits</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Real-World Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">New Apartment Investment - Brisbane</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Purchase Price:</span>
                    <span className="font-medium">$550,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (20%):</span>
                    <span className="font-medium">$110,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">$440,000 @ 6.5%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Weekly Rent:</span>
                    <span className="font-medium">$600</span>
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <p className="font-semibold">Annual Analysis:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Rental Income:</span>
                      <span className="font-medium">$31,200</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Loan Interest:</span>
                      <span className="font-medium">-$28,600</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Other Expenses:</span>
                      <span className="font-medium">-$5,500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Depreciation:</span>
                      <span className="font-medium">-$12,000</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t font-semibold">
                      <span>Tax Loss:</span>
                      <span className="text-primary">$14,900</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span>Tax Refund (37% bracket):</span>
                      <span className="font-bold text-primary">$5,513/year</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics to Understand</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Rental Yield:</strong> Annual rent ÷ property price × 100. Aim for 4-6% for capital cities.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Cash Flow:</strong> Rent minus all expenses. Negative = you pay extra monthly, Positive = profit.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Capital Growth:</strong> Property value increase over time. Historical average 7% p.a. long-term.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Total Return:</strong> Rental income + capital growth + tax benefits - all costs.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Analyze Your Investment Property</h3>
            <Link to="/calculators/investment-property">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Investment Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestmentPropertyGuide;
