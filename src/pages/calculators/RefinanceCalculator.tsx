import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { RefreshCw, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const RefinanceCalculator = () => {
  const [currentLoan, setCurrentLoan] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [currentRepayment, setCurrentRepayment] = useState("");
  const [newRate, setNewRate] = useState("");
  const [refinanceCosts, setRefinanceCosts] = useState("3000");
  const [result, setResult] = useState<any>(null);

  const calculateRefinance = () => {
    const loan = parseFloat(currentLoan || "0");
    const oldRate = parseFloat(currentRate || "0") / 100 / 12;
    const newRateMonthly = parseFloat(newRate || "0") / 100 / 12;
    const oldRepayment = parseFloat(currentRepayment || "0");
    const costs = parseFloat(refinanceCosts || "0");

    // Assume 30 year term
    const numPayments = 30 * 12;

    // Calculate new repayment
    const newRepayment = loan * 
      (newRateMonthly * Math.pow(1 + newRateMonthly, numPayments)) / 
      (Math.pow(1 + newRateMonthly, numPayments) - 1);

    // Monthly savings
    const monthlySaving = oldRepayment - newRepayment;
    const annualSaving = monthlySaving * 12;

    // Break-even period (months)
    const breakEvenMonths = costs / monthlySaving;

    // 5 year savings
    const fiveYearSavings = (monthlySaving * 60) - costs;

    // Total interest saved over loan term (simplified)
    const oldTotalInterest = (oldRepayment * numPayments) - loan;
    const newTotalInterest = (newRepayment * numPayments) - loan;
    const lifetimeSavings = oldTotalInterest - newTotalInterest - costs;

    setResult({
      newRepayment,
      monthlySaving,
      annualSaving,
      breakEvenMonths,
      fiveYearSavings,
      lifetimeSavings,
      worthRefinancing: breakEvenMonths < 24 && monthlySaving > 0,
      refinanceCosts: costs,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <RefreshCw className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Refinance Calculator
          </h1>
          <p className="text-lg opacity-95">
            Compare refinancing benefits and break-even point
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Link to="/calculators">
              <Button variant="outline">← Back to All Calculators</Button>
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Current vs New Loan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/30 p-3 rounded">
                  <p className="text-xs font-semibold mb-2">Current Loan</p>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentLoan">Loan Balance ($)</Label>
                      <Input
                        id="currentLoan"
                        type="number"
                        value={currentLoan}
                        onChange={(e) => setCurrentLoan(e.target.value)}
                        placeholder="450000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentRate">Interest Rate (%)</Label>
                      <Input
                        id="currentRate"
                        type="number"
                        step="0.01"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(e.target.value)}
                        placeholder="6.50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentRepayment">Monthly Repayment ($)</Label>
                      <Input
                        id="currentRepayment"
                        type="number"
                        value={currentRepayment}
                        onChange={(e) => setCurrentRepayment(e.target.value)}
                        placeholder="3000"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-3 rounded">
                  <p className="text-xs font-semibold mb-2">New Loan Offer</p>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="newRate">New Interest Rate (%)</Label>
                      <Input
                        id="newRate"
                        type="number"
                        step="0.01"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        placeholder="5.99"
                      />
                    </div>
                    <div>
                      <Label htmlFor="refinanceCosts">Refinance Costs ($)</Label>
                      <Input
                        id="refinanceCosts"
                        type="number"
                        value={refinanceCosts}
                        onChange={(e) => setRefinanceCosts(e.target.value)}
                        placeholder="3000"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Discharge fee, application fee, valuation, legal
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={calculateRefinance} className="w-full">
                  Compare Refinance Options
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className={result.worthRefinancing ? "text-green-600" : "text-orange-600"}>
                    {result.worthRefinancing ? "✓ Worth Refinancing" : "⚠ Consider Carefully"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">New Monthly Repayment</p>
                      <p className="text-2xl font-bold">
                        ${result.newRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Saving</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${result.monthlySaving.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Break-even Period</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.breakEvenMonths.toFixed(1)} months
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Time to recover ${result.refinanceCosts.toLocaleString()} in costs
                    </p>
                  </div>

                  <div className="space-y-3 border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Savings</span>
                      <span className="font-semibold text-green-600">
                        ${result.annualSaving.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">5 Year Savings (net)</span>
                      <span className="font-semibold text-green-600">
                        ${result.fiveYearSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Lifetime Savings (30yr)</span>
                      <span className="font-semibold text-green-600">
                        ${result.lifetimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  {result.worthRefinancing ? (
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <p className="text-green-700 dark:text-green-400 font-semibold mb-2">
                        ✓ Refinancing Makes Sense
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Break-even in {result.breakEvenMonths.toFixed(0)} months</li>
                        <li>• Save ${result.monthlySaving.toFixed(0)}/month immediately</li>
                        <li>• Total ${result.lifetimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} savings over loan term</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                      <p className="text-orange-700 dark:text-orange-400 font-semibold mb-2">
                        ⚠ May Not Be Worth It
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Break-even takes {result.breakEvenMonths.toFixed(0)} months</li>
                        <li>• Consider if you're planning to move soon</li>
                        <li>• Ask about lower cost options</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>When to Refinance</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">Good Reasons to Refinance</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Interest rate 0.5%+ lower than current rate</li>
                    <li>• Break-even period under 2 years</li>
                    <li>• Access better features (offset, redraw)</li>
                    <li>• Consolidate debts at lower rates</li>
                    <li>• Release equity for renovations/investment</li>
                    <li>• Switch from variable to fixed (or vice versa)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">Be Careful If...</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• You plan to sell within 2 years</li>
                    <li>• Current loan has large break costs</li>
                    <li>• Savings don't cover refinance costs quickly</li>
                    <li>• You're near the end of your loan term</li>
                    <li>• Current loan has valuable features you'll lose</li>
                    <li>• Your property value has decreased significantly</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Typical Refinance Costs</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Discharge fee (current lender): $300-$400</li>
                  <li>• Application fee (new lender): $0-$900</li>
                  <li>• Valuation fee: $0-$300 (often waived)</li>
                  <li>• Legal/settlement fees: $800-$1,500</li>
                  <li>• Mortgage registration: $150-$200</li>
                  <li>• <strong>Total typical cost: $2,000-$4,000</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This calculator provides estimates only. Actual savings and costs vary based on your specific loan terms, 
                break costs, and individual circumstances. Always obtain a full comparison and consider all factors before refinancing.
              </p>
              <p>
                For personalized refinancing advice and competitive loan comparisons, please{" "}
                <Link to="/" className="text-primary hover:underline">contact our mortgage brokers</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefinanceCalculator;
