import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const LMICalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [deposit, setDeposit] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateLMI = () => {
    const property = parseFloat(propertyValue || "0");
    const depositAmount = parseFloat(deposit || "0");
    const loanAmount = property - depositAmount;
    const lvr = (loanAmount / property) * 100;

    // LMI is typically required for LVR > 80%
    let lmiAmount = 0;
    
    if (lvr > 80) {
      // LMI calculation (simplified tiered approach)
      // These are approximate rates - actual rates vary by lender
      if (lvr <= 85) {
        lmiAmount = loanAmount * 0.0084; // 0.84%
      } else if (lvr <= 90) {
        lmiAmount = loanAmount * 0.0228; // 2.28%
      } else if (lvr <= 95) {
        lmiAmount = loanAmount * 0.0368; // 3.68%
      } else {
        lmiAmount = loanAmount * 0.045; // 4.5%
      }
    }

    const totalLoanWithLMI = loanAmount + lmiAmount;
    const newLVR = (totalLoanWithLMI / property) * 100;

    setResult({
      propertyValue: property,
      deposit: depositAmount,
      loanAmount,
      lvr,
      lmiRequired: lvr > 80,
      lmiAmount,
      totalLoanWithLMI,
      newLVR,
      depositPercentage: (depositAmount / property) * 100,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <FileText className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Lenders Mortgage Insurance (LMI) Calculator
          </h1>
          <p className="text-lg opacity-95">
            Calculate LMI costs for deposits under 20%
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
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyValue">Property Value ($)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    placeholder="650000"
                  />
                </div>

                <div>
                  <Label htmlFor="deposit">Deposit Amount ($)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="65000"
                  />
                </div>

                <Button onClick={calculateLMI} className="w-full">
                  Calculate LMI
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {result.lmiRequired ? "LMI Required" : "No LMI Required"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="text-2xl font-bold">
                        ${result.loanAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deposit %</p>
                      <p className="text-2xl font-bold">
                        {result.depositPercentage.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LVR</p>
                      <p className="text-2xl font-bold">
                        {result.lvr.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LMI Amount</p>
                      <p className={`text-2xl font-bold ${result.lmiRequired ? 'text-orange-600' : 'text-green-600'}`}>
                        ${result.lmiAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  {result.lmiRequired && (
                    <>
                      <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Loan (inc. LMI)</p>
                        <p className="text-3xl font-bold text-orange-600">
                          ${result.totalLoanWithLMI.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          New LVR: {result.newLVR.toFixed(1)}%
                        </p>
                      </div>

                      <div className="text-sm space-y-2">
                        <p className="font-semibold">Ways to Avoid LMI:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Save a 20% deposit</li>
                          <li>Use a family guarantee</li>
                          <li>First home buyer schemes (5% deposit)</li>
                          <li>Professional package discounts</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {!result.lmiRequired && (
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <p className="text-green-700 dark:text-green-400 font-semibold">
                        ✓ No LMI required with 20%+ deposit
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        You have saved approximately ${(result.loanAmount * 0.03).toLocaleString(undefined, { maximumFractionDigits: 0 })} 
                        by having a 20% deposit.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Understanding LMI</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">What is LMI?</h3>
              <p>
                Lenders Mortgage Insurance (LMI) is a one-off premium that protects the lender (not you) if you're unable 
                to repay your loan. It's typically required when your deposit is less than 20% of the property value (LVR &gt; 80%).
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-4">How is LMI Calculated?</h3>
              <p>LMI costs vary based on:</p>
              <ul className="space-y-1">
                <li>Loan-to-Value Ratio (LVR)</li>
                <li>Loan amount</li>
                <li>Property type (owner-occupied vs investment)</li>
                <li>Employment type</li>
                <li>Lender chosen</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2 mt-4">Can You Add LMI to Your Loan?</h3>
              <p>
                Yes! Most lenders allow you to add LMI to your home loan rather than paying it upfront. This is called 
                "capitalizing" the LMI. While this means you pay interest on the LMI over the life of your loan, it allows 
                you to purchase sooner.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This calculator provides estimates only. Actual LMI costs vary significantly between lenders and depend on 
                many factors. LMI rates shown are indicative only.
              </p>
              <p>
                For accurate LMI quotes and to explore options for reducing or avoiding LMI, please{" "}
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

export default LMICalculator;
