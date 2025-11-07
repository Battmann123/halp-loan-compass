import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PiggyBank, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const ExtraRepaymentsCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [paymentType, setPaymentType] = useState("principal-interest");
  const [extraPayment, setExtraPayment] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [result, setResult] = useState<any>(null);

  const calculateExtraRepayments = () => {
    const principal = parseFloat(loanAmount || "0");
    const annualRate = parseFloat(interestRate || "0") / 100;
    const years = parseInt(loanTerm || "30");
    const extra = parseFloat(extraPayment || "0");

    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;

    // Calculate regular repayment based on payment type
    let regularRepayment;
    if (paymentType === "interest-only") {
      // Interest-only: only pay the interest
      regularRepayment = principal * monthlyRate;
    } else {
      // Principal & Interest: standard amortization
      regularRepayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    // Convert extra payment to monthly equivalent
    let extraMonthly = 0;
    switch (frequency) {
      case "weekly":
        extraMonthly = (extra * 52) / 12;
        break;
      case "fortnightly":
        extraMonthly = (extra * 26) / 12;
        break;
      case "monthly":
        extraMonthly = extra;
        break;
      case "yearly":
        extraMonthly = extra / 12;
        break;
    }

    // Calculate loan with extra repayments
    let balance = principal;
    let monthsPaid = 0;
    let totalInterestWithExtra = 0;

    while (balance > 0 && monthsPaid < numPayments) {
      const interestCharge = balance * monthlyRate;
      
      if (paymentType === "interest-only") {
        // For interest-only, regular payment is just interest, extra goes to principal
        const principalPayment = extraMonthly;
        totalInterestWithExtra += interestCharge;
        balance -= principalPayment;
      } else {
        // For P&I, both regular and extra reduce principal
        const principalPayment = regularRepayment + extraMonthly - interestCharge;
        totalInterestWithExtra += interestCharge;
        balance -= principalPayment;
      }
      
      monthsPaid++;
      if (balance < 0) balance = 0;
    }

    // Calculate without extra repayments
    let totalInterestRegular;
    if (paymentType === "interest-only") {
      // Interest-only without extra payments: pay interest forever, principal never reduces
      totalInterestRegular = regularRepayment * numPayments;
    } else {
      totalInterestRegular = (regularRepayment * numPayments) - principal;
    }

    // Savings
    const interestSaved = totalInterestRegular - totalInterestWithExtra;
    const monthsSaved = numPayments - monthsPaid;
    const yearsSaved = monthsSaved / 12;

    // Total amount paid
    const totalPaidWithExtra = principal + totalInterestWithExtra;
    const totalPaidRegular = principal + totalInterestRegular;

    setResult({
      regularRepayment,
      extraMonthly,
      newRepayment: regularRepayment + extraMonthly,
      interestSaved,
      yearsSaved,
      monthsSaved,
      newLoanTerm: monthsPaid / 12,
      totalInterestRegular,
      totalInterestWithExtra,
      totalPaidRegular,
      totalPaidWithExtra,
      percentageSaved: (interestSaved / totalInterestRegular) * 100,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <PiggyBank className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Extra Repayments Calculator
          </h1>
          <p className="text-lg opacity-95">
            See the impact of additional payments on your loan
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
                  Loan & Extra Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="500000"
                  />
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                  />
                </div>

                <div>
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                      <SelectItem value="30">30 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>I'll be paying:</Label>
                  <RadioGroup value={paymentType} onValueChange={setPaymentType} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="principal-interest" id="principal-interest" />
                      <Label htmlFor="principal-interest" className="font-normal cursor-pointer">
                        Principal & Interest
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="interest-only" id="interest-only" />
                      <Label htmlFor="interest-only" className="font-normal cursor-pointer">
                        Interest Only
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-primary/10 p-3 rounded">
                  <p className="text-xs font-semibold mb-3">Extra Repayment</p>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="extraPayment">Extra Payment Amount ($)</Label>
                      <Input
                        id="extraPayment"
                        type="number"
                        value={extraPayment}
                        onChange={(e) => setExtraPayment(e.target.value)}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Payment Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="fortnightly">Fortnightly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={calculateExtraRepayments} className="w-full">
                  Calculate Impact
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Massive Savings!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Interest Saved</p>
                    <p className="text-4xl font-bold text-green-600">
                      ${result.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      That's {result.percentageSaved.toFixed(1)}% less interest!
                    </p>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
                    <p className="text-4xl font-bold text-primary">
                      {result.yearsSaved.toFixed(1)} years
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Pay off {result.monthsSaved} months earlier!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Regular Repayment</p>
                      <p className="text-xl font-bold">
                        ${result.regularRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">New Repayment</p>
                      <p className="text-xl font-bold text-primary">
                        ${result.newRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extra payment (monthly equiv.)</span>
                      <span className="font-semibold text-green-600">
                        ${result.extraMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New loan term</span>
                      <span className="font-semibold">
                        {result.newLoanTerm.toFixed(1)} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total interest (regular)</span>
                      <span className="font-semibold text-red-600">
                        ${result.totalInterestRegular.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total interest (with extra)</span>
                      <span className="font-semibold text-green-600">
                        ${result.totalInterestWithExtra.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-secondary/30 p-3 rounded text-center">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid Over Life of Loan</p>
                    <div className="flex justify-around items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Regular</p>
                        <p className="text-lg font-bold">
                          ${(result.totalPaidRegular / 1000).toFixed(0)}k
                        </p>
                      </div>
                      <div className="text-2xl">→</div>
                      <div>
                        <p className="text-xs text-muted-foreground">With Extra</p>
                        <p className="text-lg font-bold text-green-600">
                          ${(result.totalPaidWithExtra / 1000).toFixed(0)}k
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Strategies for Extra Repayments</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">The Impact is Huge</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Extra $100/week = years off your loan</li>
                    <li>• Early payments save the most interest</li>
                    <li>• Small amounts add up dramatically</li>
                    <li>• Even irregular payments help</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Smart Ways to Pay Extra</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Use tax refunds for lump sums</li>
                    <li>• Round up repayments ($2,847 → $3,000)</li>
                    <li>• Pay bonuses straight to loan</li>
                    <li>• Maintain old repayment after rate drops</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Check Your Loan</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Variable loans usually allow extras</li>
                    <li>• Fixed loans may have limits</li>
                    <li>• Some have redraw facilities</li>
                    <li>• Offset accounts = flexible alternative</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Quick Tips</h3>
                <ul className="space-y-1 text-sm">
                  <li>💡 <strong>Pay fortnightly instead of monthly:</strong> Make 26 payments (13 months worth) vs 12 payments per year</li>
                  <li>💡 <strong>Start early:</strong> Extra payments in the first 5 years have the biggest impact</li>
                  <li>💡 <strong>Use windfalls wisely:</strong> Tax returns, bonuses, and inheritances can shave years off</li>
                  <li>💡 <strong>Increase with pay rises:</strong> Keep lifestyle constant, put raises to loan</li>
                  <li>💡 <strong>Consider an offset:</strong> Keep emergency funds accessible while reducing interest</li>
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
                This calculator provides estimates only. Check your loan contract for any restrictions on extra repayments, 
                particularly for fixed-rate loans which may have annual limits or penalties.
              </p>
              <p>
                For advice on loan features and strategies to pay off your mortgage faster, please{" "}
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

export default ExtraRepaymentsCalculator;
