import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import { Calculator, BookOpen, ArrowLeft, TrendingUp, DollarSign, Percent, Building, Receipt } from "lucide-react";

const investmentStats = [
  { icon: Percent, value: "3–5%", label: "Typical gross rental yield, capital cities" },
  { icon: Building, value: "100%", label: "Of interest deductible on investment loans" },
  { icon: Receipt, value: "$5K–$15K", label: "Yr 1 depreciation on a typical new build" },
  { icon: TrendingUp, value: "50%", label: "CGT discount for assets held 12+ months" },
];

const investmentFAQs = [
  {
    q: "Is interest on an investment property loan tax deductible?",
    a: "Yes — interest on a loan used to purchase an income-producing investment property is fully tax deductible. This is the basis of negative gearing: when total expenses (interest, depreciation, rates, etc.) exceed rental income, the loss reduces your taxable income.",
  },
  {
    q: "What is negative gearing?",
    a: "Negative gearing occurs when the costs of owning a property exceed the rental income, creating a tax-deductible loss. Investors offset that loss against other income (salary), reducing their overall tax bill. The strategy relies on capital growth eventually exceeding accumulated losses.",
  },
  {
    q: "Should I choose Interest Only or Principal & Interest for an investment loan?",
    a: "Interest Only (IO) is common for investors because it maximises tax-deductible interest and keeps cash flow free for other investments. IO is typically limited to 5 years. P&I has lower total interest cost but reduces the deductible amount each year. Discuss the strategy with your accountant.",
  },
  {
    q: "How much deposit do I need for an investment property?",
    a: "Most lenders require 10–20% deposit for investment loans, with LMI applicable above 80% LVR. Investment loan rates are typically 0.20–0.40% higher than owner-occupier rates, and serviceability assessments are stricter (rental income is shaded by 20–25%).",
  },
  {
    q: "What is the difference between new and established for investment?",
    a: "New properties offer significantly higher depreciation deductions (Division 40 plant & equipment plus Division 43 capital works), often $5K–$15K in year one. Second-hand residential property bought after 9 May 2017 can only claim Division 43, materially reducing tax benefits.",
  },
];


const InvestmentPropertyGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Investment Property Guide 2026 — yields, gearing, depreciation, CGT"
        description="A practical Australian investment property guide: rental yields, negative gearing, depreciation (Div 40 vs Div 43), capital growth, interest-only strategy and CGT planning."
        canonical="https://halp-loan-compass.lovable.app/guides/investment-property"
        keywords="investment property Australia, negative gearing, rental yield, property depreciation, interest only investment loan"
      />
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
          <GuideStatsBar stats={investmentStats} />

          
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
