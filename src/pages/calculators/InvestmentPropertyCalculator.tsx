import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const InvestmentPropertyCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [weeklyRent, setWeeklyRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("6.5");
  const [result, setResult] = useState<any>(null);

  const calculateInvestment = () => {
    const price = parseFloat(purchasePrice || "0");
    const rent = parseFloat(weeklyRent || "0");
    const depositAmount = parseFloat(deposit || "0");
    const rate = parseFloat(interestRate || "6.5") / 100;

    const loanAmount = price - depositAmount;
    const monthlyRate = rate / 12;
    const numPayments = 30 * 12;

    // Monthly repayment (P&I)
    const monthlyRepayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Income
    const annualRent = rent * 52;
    const monthlyRent = annualRent / 12;

    // Expenses (estimated)
    const councilRates = 150; // monthly
    const waterRates = 80; // monthly
    const insurance = 100; // monthly
    const maintenance = monthlyRent * 0.08; // 8% of rent
    const propertyManagement = monthlyRent * 0.07; // 7% of rent
    const strata = 0; // Assuming house

    const totalMonthlyExpenses = councilRates + waterRates + insurance + 
                                 maintenance + propertyManagement + strata;

    const monthlyCashFlow = monthlyRent - monthlyRepayment - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;

    // Rental yield
    const grossYield = (annualRent / price) * 100;
    const netYield = ((annualRent - (totalMonthlyExpenses * 12)) / price) * 100;

    // Tax benefits (simplified - assuming 37% marginal rate)
    const taxableIncome = annualRent - (totalMonthlyExpenses * 12) - (loanAmount * rate);
    const taxBenefit = taxableIncome < 0 ? Math.abs(taxableIncome) * 0.37 : 0;

    const netCashFlowAfterTax = annualCashFlow + taxBenefit;

    setResult({
      monthlyRent,
      monthlyRepayment,
      totalMonthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      grossYield,
      netYield,
      taxBenefit,
      netCashFlowAfterTax,
      loanAmount,
      positiveGeared: monthlyCashFlow > 0,
      expenseBreakdown: {
        councilRates,
        waterRates,
        insurance,
        maintenance,
        propertyManagement,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Building className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Investment Property Calculator
          </h1>
          <p className="text-lg opacity-95">
            Analyze rental returns and cash flow
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="650000"
                  />
                </div>

                <div>
                  <Label htmlFor="weeklyRent">Weekly Rent ($)</Label>
                  <Input
                    id="weeklyRent"
                    type="number"
                    value={weeklyRent}
                    onChange={(e) => setWeeklyRent(e.target.value)}
                    placeholder="550"
                  />
                </div>

                <div>
                  <Label htmlFor="deposit">Deposit ($)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="130000"
                  />
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                  />
                </div>

                <Button onClick={calculateInvestment} className="w-full">
                  Calculate Returns
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className={result.positiveGeared ? "text-green-600" : "text-orange-600"}>
                    {result.positiveGeared ? "Positively Geared" : "Negatively Geared"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Rent</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${result.monthlyRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Repayment</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${result.monthlyRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gross Yield</p>
                      <p className="text-2xl font-bold">
                        {result.grossYield.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Net Yield</p>
                      <p className="text-2xl font-bold">
                        {result.netYield.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Monthly Cash Flow</p>
                    <p className={`text-3xl font-bold ${result.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                      ${result.monthlyCashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Annual: ${result.annualCashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Monthly Expenses:</p>
                    <div className="space-y-1 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Council Rates</span>
                        <span>${result.expenseBreakdown.councilRates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water Rates</span>
                        <span>${result.expenseBreakdown.waterRates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance</span>
                        <span>${result.expenseBreakdown.insurance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance (8%)</span>
                        <span>${result.expenseBreakdown.maintenance.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Management (7%)</span>
                        <span>${result.expenseBreakdown.propertyManagement.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total</span>
                        <span>${result.totalMonthlyExpenses.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  {result.taxBenefit > 0 && (
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold mb-1">Tax Benefits (37% rate)</p>
                      <p className="text-xl font-bold text-green-600">
                        ${result.taxBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Net cash flow after tax: ${result.netCashFlowAfterTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Understanding Investment Property Returns</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Gross Yield:</strong> Annual rent ÷ property price</li>
                    <li><strong>Net Yield:</strong> Annual rent minus expenses ÷ property price</li>
                    <li><strong>Cash Flow:</strong> Rent minus all costs (repayments + expenses)</li>
                    <li><strong>Positive Gearing:</strong> Rent covers all costs</li>
                    <li><strong>Negative Gearing:</strong> Tax deductions offset losses</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Investment Strategy</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Capital Growth:</strong> Focus on property appreciation</li>
                    <li><strong>Cash Flow:</strong> Maximize rental income</li>
                    <li><strong>Tax Benefits:</strong> Leverage negative gearing deductions</li>
                    <li><strong>Balance:</strong> Combine growth and income</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This calculator provides estimates only. Actual returns vary based on location, property condition, 
                tenant quality, vacancy rates, and market conditions. Tax benefits depend on your individual tax situation.
              </p>
              <p>
                For personalized investment property advice and finance options, please{" "}
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

export default InvestmentPropertyCalculator;
