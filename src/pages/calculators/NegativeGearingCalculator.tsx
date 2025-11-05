import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NegativeGearingCalculator() {
  // Loan Details
  const [propertyPrice, setPropertyPrice] = useState<number>(600000);
  const [loanAmount, setLoanAmount] = useState<number>(450000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(5.0);
  const [loanType, setLoanType] = useState<string>("principal-interest");
  
  // Income
  const [preTaxSalary, setPreTaxSalary] = useState<number>(90000);
  const [weeklyRent, setWeeklyRent] = useState<number>(550);
  
  // Annual Expenses
  const [councilRates, setCouncilRates] = useState<number>(1800);
  const [waterRates, setWaterRates] = useState<number>(900);
  const [landTax, setLandTax] = useState<number>(0);
  const [strataFees, setStrataFees] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(1000);
  const [propertyManager, setPropertyManager] = useState<number>(2860);
  const [repairsMaintenance, setRepairsMaintenance] = useState<number>(1500);
  const [depreciation, setDepreciation] = useState<number>(5000);
  
  const [result, setResult] = useState<any>(null);

  const calculateNegativeGearing = () => {
    const annualRent = weeklyRent * 52;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly repayment
    let monthlyRepayment;
    if (loanType === "interest-only") {
      monthlyRepayment = loanAmount * monthlyInterestRate;
    } else {
      monthlyRepayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    const annualRepayment = monthlyRepayment * 12;
    
    // Total expenses (including depreciation for tax purposes)
    const totalExpenses = councilRates + waterRates + landTax + strataFees + 
                         insurance + propertyManager + repairsMaintenance + 
                         depreciation + annualRepayment;
    
    // Cash expenses (excluding depreciation - it's non-cash)
    const cashExpenses = totalExpenses - depreciation;
    
    // Pre-tax cash flow
    const preTaxCashFlow = annualRent - cashExpenses;
    
    // Australian tax calculation (2024-25 brackets)
    const calculateTax = (income: number) => {
      if (income <= 18200) return 0;
      if (income <= 45000) return (income - 18200) * 0.19;
      if (income <= 120000) return 5092 + (income - 45000) * 0.325;
      if (income <= 180000) return 29467 + (income - 120000) * 0.37;
      return 51667 + (income - 180000) * 0.45;
    };
    
    // Tax without property
    const taxWithoutProperty = calculateTax(preTaxSalary);
    
    // Tax with property (deduct all expenses including depreciation)
    const taxableIncomeWithProperty = preTaxSalary + annualRent - totalExpenses;
    const taxWithProperty = calculateTax(taxableIncomeWithProperty);
    
    // Tax benefit
    const taxBenefit = taxWithoutProperty - taxWithProperty;
    
    // After-tax cash flow
    const afterTaxCashFlow = preTaxCashFlow + taxBenefit;
    
    // Determine if positively or negatively geared
    const isNegativelyGeared = preTaxCashFlow < 0;
    const gearingStatus = isNegativelyGeared ? "negatively geared" : "positively geared";
    
    // Message based on gearing
    let message = "";
    if (isNegativelyGeared) {
      message = `Your investment property is ${gearingStatus}. You can claim a tax deduction of $${Math.abs(preTaxCashFlow).toLocaleString()} from your taxable income, resulting in a tax benefit of $${taxBenefit.toLocaleString()} per year.`;
    } else {
      message = `Your investment property is ${gearingStatus} as your rental income can cover your expenses. You won't be able to make any deductions from your taxable income and you'll be paying $${Math.abs(taxBenefit).toLocaleString()} more in personal income tax per year.`;
    }
    
    setResult({
      annualRent,
      totalExpenses,
      cashExpenses,
      preTaxCashFlow,
      taxBenefit,
      afterTaxCashFlow,
      taxWithoutProperty,
      taxWithProperty,
      isNegativelyGeared,
      gearingStatus,
      message,
      monthlyRepayment,
      annualRepayment
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          to="/calculators" 
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Calculators
        </Link>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Negative Gearing Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate the tax benefits of owning a negatively geared investment property
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Price ($)</label>
                    <Input
                      type="number"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount ($)</label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      max={2000000}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max $2,000,000</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      max={30}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max 30 years</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Type of Loan</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="principal-interest"
                          checked={loanType === "principal-interest"}
                          onChange={(e) => setLoanType(e.target.value)}
                          className="mr-2"
                        />
                        Principal & Interest
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="interest-only"
                          checked={loanType === "interest-only"}
                          onChange={(e) => setLoanType(e.target.value)}
                          className="mr-2"
                        />
                        Interest Only
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Income</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pre-Tax Annual Salary ($)</label>
                    <Input
                      type="number"
                      value={preTaxSalary}
                      onChange={(e) => setPreTaxSalary(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Weekly Rental Income ($)</label>
                    <Input
                      type="number"
                      value={weeklyRent}
                      onChange={(e) => setWeeklyRent(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Annual Expenses</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Council Rates ($)</label>
                    <Input
                      type="number"
                      value={councilRates}
                      onChange={(e) => setCouncilRates(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Water Rates ($)</label>
                    <Input
                      type="number"
                      value={waterRates}
                      onChange={(e) => setWaterRates(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Land Tax ($)</label>
                    <Input
                      type="number"
                      value={landTax}
                      onChange={(e) => setLandTax(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Strata Fees ($)</label>
                    <Input
                      type="number"
                      value={strataFees}
                      onChange={(e) => setStrataFees(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Insurance ($)</label>
                    <Input
                      type="number"
                      value={insurance}
                      onChange={(e) => setInsurance(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Manager Fees ($)</label>
                    <Input
                      type="number"
                      value={propertyManager}
                      onChange={(e) => setPropertyManager(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Repairs and Maintenance ($)</label>
                    <Input
                      type="number"
                      value={repairsMaintenance}
                      onChange={(e) => setRepairsMaintenance(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Depreciation ($)</label>
                    <Input
                      type="number"
                      value={depreciation}
                      onChange={(e) => setDepreciation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
              
              <Button onClick={calculateNegativeGearing} className="w-full" size="lg">
                Calculate Tax Benefit
              </Button>
            </div>
            
            {result && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="text-center mb-6">
                    <h3 className={`text-4xl font-bold mb-4 ${result.isNegativelyGeared ? 'text-green-600' : 'text-orange-600'}`}>
                      ${Math.abs(result.taxBenefit).toLocaleString()}
                    </h3>
                    <p className="text-muted-foreground">{result.message}</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span>Rental Income</span>
                      <span className="font-medium">${result.annualRent.toLocaleString()} / year</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span>Total Expenses</span>
                      <span className="font-medium">${result.totalExpenses.toLocaleString()} / year</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span>Pre-Tax Cash Flow</span>
                      <span className={`font-medium ${result.preTaxCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(result.preTaxCashFlow).toLocaleString()} / year
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950 rounded">
                      <span className="font-semibold">Tax Benefit</span>
                      <span className="font-bold text-green-600">${result.taxBenefit.toLocaleString()} / year</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Tax Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Tax without property</span>
                      <span className="font-medium">${result.taxWithoutProperty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax with property</span>
                      <span className="font-medium">${result.taxWithProperty.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Tax savings</span>
                      <span className="text-green-600">${result.taxBenefit.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Cash Flow Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Annual rental income</span>
                      <span className="font-medium">${result.annualRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual repayments</span>
                      <span className="font-medium">-${result.annualRepayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other cash expenses</span>
                      <span className="font-medium">-${(result.cashExpenses - result.annualRepayment).toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Pre-tax cash flow</span>
                      <span className={`font-medium ${result.preTaxCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(result.preTaxCashFlow).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Add: Tax benefit</span>
                      <span className="font-medium text-green-600">+${result.taxBenefit.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>After-tax cash flow</span>
                      <span className={result.afterTaxCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${Math.abs(result.afterTaxCashFlow).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>
                
                <Button className="w-full" size="lg">
                  Apply for Investment Loan
                </Button>
              </div>
            )}
          </div>
          
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">What is Negative Gearing?</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Negative gearing occurs when the costs of owning an investment property (including loan interest, maintenance, and other expenses) exceed the rental income you receive. This creates a tax-deductible loss that can reduce your overall taxable income.
              </p>
              <p>
                For example, if your annual expenses are $35,000 but you only receive $28,600 in rent, you have a $6,400 loss. This loss can be offset against your salary income, potentially reducing your tax bill.
              </p>
              <p className="font-semibold">
                Key Benefits of Negative Gearing:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Tax deductions on all property-related expenses</li>
                <li>Potential for long-term capital growth</li>
                <li>Ability to claim depreciation on building and fixtures</li>
                <li>Reduced taxable income leading to lower tax obligations</li>
              </ul>
            </div>
          </Card>
          
          <Card className="p-6 mt-6 bg-muted">
            <h3 className="text-lg font-semibold mb-2">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              This calculator provides estimates only and should not be considered financial advice. Tax laws are complex and individual circumstances vary significantly. Always consult with a qualified tax professional, accountant, or financial adviser before making investment property decisions. The calculator uses current Australian tax rates and assumes standard deduction rules.
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
