import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Scale, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceabilityCalculator = () => {
  const [income, setIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [existingLoans, setExistingLoans] = useState("");
  const [dependents, setDependents] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateServiceability = () => {
    const totalIncome = parseFloat(income || "0") + parseFloat(otherIncome || "0");
    const monthlyIncome = totalIncome / 12;
    const monthlyExpenses = parseFloat(expenses || "0");
    const monthlyLoans = parseFloat(existingLoans || "0");
    const dependentCount = parseInt(dependents || "0");
    
    // Basic living expenses per dependent (HEM guidelines)
    const dependentExpenses = dependentCount * 800;
    
    // Total monthly commitments
    const totalCommitments = monthlyExpenses + monthlyLoans + dependentExpenses;
    
    // Available income for loan servicing (surplus)
    const surplus = monthlyIncome - totalCommitments;
    
    // Assessment rate (typically 3% buffer above actual rate)
    const assessmentRate = 0.08; // 8% assessment rate
    const monthlyAssessmentRate = assessmentRate / 12;
    
    // Loan term assumption (30 years)
    const loanTermYears = 30;
    const numberOfPayments = loanTermYears * 12;
    
    // Maximum monthly repayment capacity (use the lower of surplus or 30% of gross income)
    const maxRepaymentFromIncome = monthlyIncome * 0.3;
    const maxRepayment = Math.min(surplus, maxRepaymentFromIncome);
    
    // Calculate maximum loan amount using loan repayment formula
    // P = M × [1 - (1 + r)^-n] / r
    const maxLoanAmount = maxRepayment > 0 
      ? maxRepayment * (1 - Math.pow(1 + monthlyAssessmentRate, -numberOfPayments)) / monthlyAssessmentRate
      : 0;
    
    // Serviceability ratio
    const serviceabilityRatio = (totalCommitments / monthlyIncome) * 100;
    
    setResult({
      monthlyIncome,
      totalCommitments,
      surplus: Math.max(0, surplus),
      maxRepayment: Math.max(0, maxRepayment),
      maxLoanAmount: Math.max(0, maxLoanAmount),
      serviceabilityRatio,
      passesTest: surplus > 0 && serviceabilityRatio < 70,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Scale className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Loan Serviceability Calculator
          </h1>
          <p className="text-lg opacity-95">
            Assess your ability to service a home loan
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
                  Your Income & Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="income">Annual Gross Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="120000"
                  />
                </div>

                <div>
                  <Label htmlFor="otherIncome">Other Annual Income ($)</Label>
                  <Input
                    id="otherIncome"
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="expenses">Monthly Living Expenses ($)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    placeholder="3000"
                  />
                </div>

                <div>
                  <Label htmlFor="existingLoans">Existing Monthly Loan Repayments ($)</Label>
                  <Input
                    id="existingLoans"
                    type="number"
                    value={existingLoans}
                    onChange={(e) => setExistingLoans(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <Button onClick={calculateServiceability} className="w-full">
                  Calculate Serviceability
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className={result.passesTest ? "text-green-600" : "text-orange-600"}>
                    {result.passesTest ? "✓ Passes Serviceability" : "⚠ May Need Review"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Income</p>
                      <p className="text-2xl font-bold">
                        ${result.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Commitments</p>
                      <p className="text-2xl font-bold">
                        ${result.totalCommitments.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Surplus</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${result.surplus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Serviceability Ratio</p>
                      <p className="text-2xl font-bold">
                        {result.serviceabilityRatio.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Maximum Loan Amount</p>
                    <p className="text-3xl font-bold text-primary">
                      ${result.maxLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Assessment Summary:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Lenders typically assess at 8% interest rate</li>
                      <li>Ideal serviceability ratio is below 70%</li>
                      <li>Your ratio: {result.serviceabilityRatio.toFixed(1)}%</li>
                      <li>Maximum safe repayment: ${result.maxRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/month</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Use This Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ol className="space-y-2">
                <li>Enter your total annual gross income (before tax)</li>
                <li>Add any other income (rental, bonuses, etc.)</li>
                <li>Input your monthly living expenses</li>
                <li>Include existing loan repayments (car loans, credit cards, etc.)</li>
                <li>Add number of dependents</li>
              </ol>
              <p className="mt-4">
                The calculator uses lender serviceability assessment criteria to determine if you can comfortably service a loan. 
                Lenders typically assess at a higher rate (around 8%) than the actual loan rate to ensure you can still afford 
                repayments if rates increase.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This calculator provides estimates only and should not be relied upon for financial decisions. 
                Actual serviceability assessments vary between lenders and depend on many factors including credit history, 
                employment stability, and individual lender policies.
              </p>
              <p>
                For accurate serviceability assessment and personalized advice, please{" "}
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

export default ServiceabilityCalculator;
