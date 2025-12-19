import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { calculatorSchema, generateBreadcrumb } from "@/lib/structuredData";
import { Calculator, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RepaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("600000");
  const [repaymentType, setRepaymentType] = useState("principal-interest");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");

  const calculateRepayments = () => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(interestRate) || 0;
    const term = Number(loanTerm) || 1;
    
    // Handle edge cases to prevent NaN
    if (principal <= 0 || rate <= 0 || term <= 0) {
      return {
        repayment: "0.00",
        totalPayments: "0.00",
        totalInterest: "0.00",
        paymentsPerYear: 12,
      };
    }
    
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    let monthlyRepayment;
    let totalPayments;
    let totalInterest;

    if (repaymentType === "interest-only") {
      // Interest only calculation
      monthlyRepayment = principal * monthlyRate;
      totalPayments = monthlyRepayment * numberOfPayments;
      totalInterest = totalPayments; // All payments are interest
    } else {
      // Principal & Interest calculation
      if (monthlyRate === 0) {
        monthlyRepayment = principal / numberOfPayments;
      } else {
        monthlyRepayment =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }
      totalPayments = monthlyRepayment * numberOfPayments;
      totalInterest = totalPayments - principal;
    }

    // Adjust for payment frequency
    let repayment = monthlyRepayment;
    let paymentsPerYear = 12;

    if (paymentFrequency === "fortnightly") {
      repayment = (monthlyRepayment * 12) / 26;
      paymentsPerYear = 26;
    } else if (paymentFrequency === "weekly") {
      repayment = (monthlyRepayment * 12) / 52;
      paymentsPerYear = 52;
    }

    return {
      repayment: isNaN(repayment) ? "0.00" : repayment.toFixed(2),
      totalPayments: isNaN(totalPayments) ? "0.00" : totalPayments.toFixed(2),
      totalInterest: isNaN(totalInterest) ? "0.00" : totalInterest.toFixed(2),
      paymentsPerYear,
    };
  };

  const results = calculateRepayments();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      calculatorSchema(
        "Home Loan Repayment Calculator",
        "Calculate your monthly, fortnightly, or weekly home loan repayments for house & land packages and new properties in Australia",
        "https://halp-loan-compass.lovable.app/calculators/repayment"
      ),
      generateBreadcrumb([
        { name: "Home", url: "/" },
        { name: "Calculators", url: "/calculators" },
        { name: "Repayment Calculator", url: "/calculators/repayment" }
      ])
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Home Loan Repayment Calculator Australia | Monthly, Fortnightly & Weekly"
        description="Free Australian home loan repayment calculator. Calculate monthly, fortnightly or weekly mortgage repayments for house & land packages. Compare payment frequencies and total interest costs."
        keywords="home loan repayment calculator, mortgage repayment calculator, monthly repayment calculator, fortnightly repayment, weekly repayment, loan calculator Australia"
        canonical="https://halp-loan-compass.lovable.app/calculators/repayment"
        structuredData={structuredData}
      />
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to All Calculators
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Loan Repayment Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly, fortnightly, or weekly home loan repayments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="loanAmount"
                    type="text"
                    inputMode="numeric"
                    value={loanAmount ? Number(loanAmount).toLocaleString() : ""}
                    onChange={(e) => setLoanAmount(e.target.value.replace(/,/g, ""))}
                    className="pl-7"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">I'll be paying</Label>
                <RadioGroup value={repaymentType} onValueChange={setRepaymentType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="principal-interest" id="principal-interest" />
                    <Label htmlFor="principal-interest" className="cursor-pointer">Principal & Interest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="interest-only" id="interest-only" />
                    <Label htmlFor="interest-only" className="cursor-pointer">Interest only</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                <div className="relative mt-2">
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="mt-2"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="frequency">Payment Frequency</Label>
                <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Your Repayments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
                <p className="text-sm opacity-90 mb-2">
                  {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Repayment
                </p>
                <p className="text-4xl font-bold">${Number(results.repayment).toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-semibold text-lg">
                    ${Number(results.totalInterest).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Total Amount Paid</span>
                  <span className="font-semibold text-lg">
                    ${Number(results.totalPayments).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Number of Payments</span>
                  <span className="font-semibold text-lg">{(Number(loanTerm) || 0) * results.paymentsPerYear}</span>
                </div>
              </div>

              <Link to="/apply">
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Apply for This Loan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>How to Use This Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ol className="space-y-3">
              <li>
                <strong>Enter Loan Amount:</strong> The total amount you wish to borrow (e.g., $600,000 for a typical house & land package)
              </li>
              <li>
                <strong>Set Interest Rate:</strong> Your expected interest rate (typically 6-7% for new properties)
              </li>
              <li>
                <strong>Choose Loan Term:</strong> Most common is 30 years, but you can select 15, 20, or 25 years
              </li>
              <li>
                <strong>Select Payment Frequency:</strong> Choose monthly, fortnightly, or weekly payments. 
                Fortnightly and weekly payments can save interest over time.
              </li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-3">Best For:</h3>
            <ul className="space-y-2">
              <li>First home buyers determining affordability</li>
              <li>Existing homeowners considering refinancing</li>
              <li>Property upgraders planning their next purchase</li>
              <li>Investors analyzing cash flow for new properties</li>
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This calculator provides estimates only. Actual loan repayments may vary 
              based on individual circumstances, lender fees, and interest rate changes. Results are for 
              illustrative purposes and should not be considered financial advice. Please consult with a 
              licensed mortgage broker through HALP for accurate quotes tailored to your situation.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default RepaymentCalculator;
