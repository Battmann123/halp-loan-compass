import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BorrowingPowerCalculator = () => {
  const [numApplicants, setNumApplicants] = useState("one");
  const [loanPurpose, setLoanPurpose] = useState("live");
  const [depositFunds, setDepositFunds] = useState(0);
  const [buyingState, setBuyingState] = useState("VIC");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState("no");
  const [payingRent, setPayingRent] = useState("no");
  const [rentAmount, setRentAmount] = useState(0);
  const [income, setIncome] = useState(100000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [expenses, setExpenses] = useState(3000);
  const [debts, setDebts] = useState(500);
  const [dependents, setDependents] = useState(0);

  const calculateBorrowingPower = () => {
    const totalIncome = income + otherIncome;
    const monthlyIncome = totalIncome / 12;
    const totalExpenses = expenses + debts;
    
    // Simple calculation: Net income after expenses * multiplier
    // Real lenders use more complex assessments
    const netIncome = monthlyIncome - totalExpenses;
    const borrowingCapacity = netIncome * 12 * 5.5; // Simplified multiplier
    
    // Adjust for dependents
    const adjustedCapacity = borrowingCapacity - (dependents * 50000);

    return Math.max(0, adjustedCapacity);
  };

  const borrowingPower = calculateBorrowingPower();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to All Calculators
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Borrowing Power Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover how much you could potentially borrow for your home loan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">How many people are applying?</Label>
                <RadioGroup value={numApplicants} onValueChange={setNumApplicants} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one" id="one" />
                    <Label htmlFor="one" className="cursor-pointer">Just me</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="two" id="two" />
                    <Label htmlFor="two" className="cursor-pointer">Two of us</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">What is the purpose of this loan?</Label>
                <RadioGroup value={loanPurpose} onValueChange={setLoanPurpose} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="live" id="live" />
                    <Label htmlFor="live" className="cursor-pointer">To live in</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="invest" id="invest" />
                    <Label htmlFor="invest" className="cursor-pointer">To invest</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="depositFunds">Total funds available for your deposit?</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="depositFunds"
                    type="number"
                    value={depositFunds}
                    onChange={(e) => setDepositFunds(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="buyingState">What state are you looking to buy?</Label>
                <Select value={buyingState} onValueChange={setBuyingState}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIC">VIC</SelectItem>
                    <SelectItem value="NSW">NSW</SelectItem>
                    <SelectItem value="QLD">QLD</SelectItem>
                    <SelectItem value="SA">SA</SelectItem>
                    <SelectItem value="WA">WA</SelectItem>
                    <SelectItem value="TAS">TAS</SelectItem>
                    <SelectItem value="NT">NT</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Are you a first home buyer?</Label>
                <RadioGroup value={firstHomeBuyer} onValueChange={setFirstHomeBuyer} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="fhb-yes" />
                    <Label htmlFor="fhb-yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fhb-no" />
                    <Label htmlFor="fhb-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="income">Annual Income (before tax)</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="otherIncome">Other Annual Income</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="otherIncome"
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Rental income, dividends, etc.</p>
              </div>

              <div>
                <Label htmlFor="expenses">Monthly Living Expenses</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="expenses"
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="debts">Monthly Debt Repayments</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="debts"
                    type="number"
                    value={debts}
                    onChange={(e) => setDebts(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Credit cards, car loans, personal loans</p>
              </div>

              <div>
                <Label htmlFor="dependents">Number of Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  value={dependents}
                  onChange={(e) => setDependents(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Will you be paying rent after taking out this loan?</Label>
                <RadioGroup value={payingRent} onValueChange={setPayingRent} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="rent-yes" />
                    <Label htmlFor="rent-yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="rent-no" />
                    <Label htmlFor="rent-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {payingRent === "yes" && (
                <div>
                  <Label htmlFor="rentAmount">How much rent per month?</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="rentAmount"
                      type="number"
                      value={rentAmount}
                      onChange={(e) => setRentAmount(Number(e.target.value))}
                      className="pl-7"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Your Estimated Borrowing Power</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-lg text-white text-center">
                <p className="text-sm opacity-90 mb-2">You could potentially borrow</p>
                <p className="text-5xl font-bold mb-2">${borrowingPower.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                <p className="text-sm opacity-90">Based on your income and expenses</p>
              </div>

              <div className="space-y-4 bg-white p-4 rounded-lg">
                <h3 className="font-semibold">What this means:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>This is an estimate only - actual borrowing capacity varies by lender</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>With 20% deposit: ${(borrowingPower * 1.25).toLocaleString(undefined, {maximumFractionDigits: 0})} property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>With 10% deposit: ${(borrowingPower * 1.11).toLocaleString(undefined, {maximumFractionDigits: 0})} property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>With 5% deposit: ${(borrowingPower * 1.05).toLocaleString(undefined, {maximumFractionDigits: 0})} property</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                Get Pre-Approval
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>How to Use This Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-3">Tips for Accurate Results:</h3>
            <ol className="space-y-3">
              <li>
                <strong>Income:</strong> Include your gross (before tax) annual salary. If applying jointly, 
                add both incomes together.
              </li>
              <li>
                <strong>Other Income:</strong> Include any regular additional income like rental income, 
                bonuses, or investment returns.
              </li>
              <li>
                <strong>Living Expenses:</strong> Be realistic about monthly costs including groceries, 
                utilities, transport, and lifestyle expenses.
              </li>
              <li>
                <strong>Debt Repayments:</strong> Include minimum monthly payments on all debts including 
                credit cards, car loans, and personal loans.
              </li>
              <li>
                <strong>Dependents:</strong> Children and other financial dependents affect your borrowing capacity.
              </li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-3">Factors That Affect Borrowing Power:</h3>
            <ul className="space-y-2">
              <li>Your credit score and credit history</li>
              <li>Employment type and job stability</li>
              <li>The type of property you're purchasing</li>
              <li>Current interest rates and lending policies</li>
              <li>The loan-to-value ratio (LVR) you're seeking</li>
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Important Disclaimer:</strong> This calculator provides a simplified estimate of borrowing 
              capacity. Actual lending decisions are made by financial institutions based on comprehensive 
              assessment of your financial situation, including credit history, employment stability, and specific 
              lender policies. Different lenders have different criteria and may offer different amounts. The results 
              should not be considered financial advice or a guarantee of loan approval. For an accurate assessment, 
              please contact a licensed mortgage broker through HALP.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BorrowingPowerCalculator;
