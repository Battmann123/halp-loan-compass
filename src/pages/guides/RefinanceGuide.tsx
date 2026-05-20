import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import { Calculator, BookOpen, ArrowLeft, RefreshCw, DollarSign, Percent, Clock, Wallet } from "lucide-react";

const refinanceStats = [
  { icon: Percent, value: "0.50%", label: "Typical break-even rate gap to make refinancing worthwhile" },
  { icon: DollarSign, value: "$2K–$4K", label: "Switching costs (discharge + new loan setup)" },
  { icon: Clock, value: "2–4 yrs", label: "Common cashback clawback window" },
  { icon: Wallet, value: "80% LVR", label: "Stay below to avoid new LMI on refinance" },
];

const refinanceFAQs = [
  {
    q: "When is it worth refinancing my home loan?",
    a: "A common rule of thumb is refinancing pays off when the new rate is at least 0.50% lower than your current rate and you plan to stay in the loan for 2+ years. Always include switching costs ($2K–$4K), potential LMI if above 80% LVR, and any cashback clawback in your calculation.",
  },
  {
    q: "What does it cost to refinance?",
    a: "Expect $300–$900 discharge fee from your current lender, $0–$600 application/establishment fee with the new lender, $300–$400 in government mortgage registration and discharge fees, plus a valuation (often free). For fixed-rate loans, break costs can add thousands more.",
  },
  {
    q: "What is a cashback clawback?",
    a: "Many lenders offer $2,000–$4,000 cashback for refinancing to them. If you refinance away within their clawback window (typically 2–4 years) they reclaim the cashback. Read the terms before chasing cashback offers.",
  },
  {
    q: "Will refinancing affect my credit score?",
    a: "Yes — each application creates a credit enquiry. Multiple enquiries in a short period can lower your score. To minimise the impact, get pre-qualified informally first and only formally apply with the lender you intend to use.",
  },
  {
    q: "Can I refinance to access equity?",
    a: "Yes — 'cash out' refinancing lets you increase the loan to access accumulated equity, often for renovations, an investment property deposit, or debt consolidation. Lenders scrutinise the purpose of cash-out funds and may require evidence (quotes, contracts).",
  },
];


const RefinanceGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/refinance" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Refinance Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Calculate potential savings from refinancing
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>When Should You Refinance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Consider refinancing when:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your current rate is 0.5%+ higher than available rates</li>
                <li>Your fixed rate term is ending</li>
                <li>You need better loan features (offset account, redraw)</li>
                <li>You want to consolidate debts</li>
                <li>You need to access equity for renovations or investments</li>
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
                <h4 className="font-semibold text-lg mb-4">Refinancing to Lower Rate</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Current Loan Balance:</span>
                    <span className="font-medium">$450,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Current Rate:</span>
                    <span className="font-medium">7.0%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">New Rate Available:</span>
                    <span className="font-medium">6.0%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Remaining Term:</span>
                    <span className="font-medium">25 years</span>
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Current Monthly Payment:</span>
                      <span className="font-medium">$3,181</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">New Monthly Payment:</span>
                      <span className="font-medium">$2,899</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-semibold">
                      <span>Monthly Savings:</span>
                      <span className="text-primary">$282</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-bold pt-2 border-t">
                      <span>Total Interest Saved:</span>
                      <span className="text-primary text-lg">$114,200</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Cost to Refinance:</strong> Approx. $1,500 in fees. Break-even in 5 months!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Costs to Consider</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Discharge Fees:</strong> $150-$500 to exit current loan
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Application Fees:</strong> $0-$700 (often waived)
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Valuation:</strong> $0-$300
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Break Costs:</strong> Can be $0-$10,000+ if exiting fixed rate early
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Refinance Savings</h3>
            <Link to="/calculators/refinance">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Refinance Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefinanceGuide;
