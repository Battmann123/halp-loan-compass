import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function InvestmentPropertyCalculator() {
  // Property and Loan Details
  const [purchasePrice, setPurchasePrice] = useState<number>(500000);
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [repaymentType, setRepaymentType] = useState<string>("interest-only");
  
  // Income Details
  const [weeklyRent, setWeeklyRent] = useState<number>(500);
  const [annualSalary, setAnnualSalary] = useState<number>(80000);
  const [rentalIncrease, setRentalIncrease] = useState<number>(2.5);
  
  // Annual Expenses
  const [councilRates, setCouncilRates] = useState<number>(1500);
  const [strataFees, setStrataFees] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(800);
  const [propertyManagement, setPropertyManagement] = useState<number>(2600);
  const [repairsMaintenance, setRepairsMaintenance] = useState<number>(1000);
  const [landTax, setLandTax] = useState<number>(0);
  const [waterRates, setWaterRates] = useState<number>(800);
  const [depreciation, setDepreciation] = useState<number>(0);
  const [inflation, setInflation] = useState<number>(2.0);
  
  const [result, setResult] = useState<any>(null);

  const calculateInvestment = () => {
    const annualRent = weeklyRent * 52;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly repayment
    let monthlyRepayment;
    if (repaymentType === "interest-only") {
      monthlyRepayment = loanAmount * monthlyInterestRate;
    } else {
      monthlyRepayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    const annualRepayment = monthlyRepayment * 12;
    
    // Total annual expenses
    const totalExpenses = councilRates + strataFees + insurance + propertyManagement + 
                         repairsMaintenance + landTax + waterRates + depreciation;
    const totalCosts = annualRepayment + totalExpenses - depreciation; // Depreciation is non-cash
    
    // Cash flow
    const annualCashFlow = annualRent - totalCosts;
    const monthlyCashFlow = annualCashFlow / 12;
    const weeklyCashFlow = annualCashFlow / 52;
    
    // Yields
    const grossYield = (annualRent / purchasePrice) * 100;
    const netYield = ((annualRent - totalExpenses) / purchasePrice) * 100;
    
    // Tax calculation (Australian tax brackets 2024-25)
    const calculateTax = (income: number) => {
      if (income <= 18200) return 0;
      if (income <= 45000) return (income - 18200) * 0.19;
      if (income <= 120000) return 5092 + (income - 45000) * 0.325;
      if (income <= 180000) return 29467 + (income - 120000) * 0.37;
      return 51667 + (income - 180000) * 0.45;
    };
    
    const taxWithoutProperty = calculateTax(annualSalary);
    const deductibleExpenses = totalExpenses + annualRepayment; // All deductible for investment
    const taxableIncomeWithProperty = annualSalary + annualRent - deductibleExpenses;
    const taxWithProperty = calculateTax(taxableIncomeWithProperty);
    const taxBenefit = taxWithoutProperty - taxWithProperty;
    
    const cashFlowAfterTax = annualCashFlow + taxBenefit;
    const monthlyCashFlowAfterTax = cashFlowAfterTax / 12;
    
    // Multi-year projections
    const projections = [];
    for (let year of [1, 5, 10, 30]) {
      const rentYear = annualRent * Math.pow(1 + rentalIncrease / 100, year - 1);
      const expensesYear = totalExpenses * Math.pow(1 + inflation / 100, year - 1);
      const cashFlowYear = rentYear - annualRepayment - expensesYear + depreciation;
      projections.push({ year, rent: rentYear, expenses: expensesYear, cashFlow: cashFlowYear });
    }
    
    // Capital growth estimate (5% p.a.)
    const capitalGrowthRate = 0.05;
    const yearOneGrowth = purchasePrice * capitalGrowthRate;
    const fiveYearValue = purchasePrice * Math.pow(1 + capitalGrowthRate, 5);
    const tenYearValue = purchasePrice * Math.pow(1 + capitalGrowthRate, 10);
    
    setResult({
      annualRent,
      monthlyRepayment,
      annualRepayment,
      totalExpenses,
      totalCosts,
      annualCashFlow,
      monthlyCashFlow,
      weeklyCashFlow,
      grossYield,
      netYield,
      yearOneGrowth,
      fiveYearValue,
      tenYearValue,
      taxBenefit,
      cashFlowAfterTax,
      monthlyCashFlowAfterTax,
      loanAmount,
      projections,
      taxWithoutProperty,
      taxWithProperty
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
            <h1 className="text-4xl font-bold mb-4">Investment Property Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Estimate income, expenses, and returns for your investment property
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Property & Mortgage Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Price</label>
                    <Input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount</label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Repayment Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="interest-only"
                          checked={repaymentType === "interest-only"}
                          onChange={(e) => setRepaymentType(e.target.value)}
                          className="mr-2"
                        />
                        Interest Only
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="principal-interest"
                          checked={repaymentType === "principal-interest"}
                          onChange={(e) => setRepaymentType(e.target.value)}
                          className="mr-2"
                        />
                        Principal & Interest
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Income Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Weekly Rental Income ($)</label>
                    <Input
                      type="number"
                      value={weeklyRent}
                      onChange={(e) => setWeeklyRent(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Annual Salary / Other Taxable Income ($)</label>
                    <Input
                      type="number"
                      value={annualSalary}
                      onChange={(e) => setAnnualSalary(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Annual Rental Increase (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={rentalIncrease}
                      onChange={(e) => setRentalIncrease(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Annual Cash Expenses</h3>
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
                      value={propertyManagement}
                      onChange={(e) => setPropertyManagement(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Repairs & Maintenance ($)</label>
                    <Input
                      type="number"
                      value={repairsMaintenance}
                      onChange={(e) => setRepairsMaintenance(Number(e.target.value))}
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
                    <label className="block text-sm font-medium mb-2">Water Rates ($)</label>
                    <Input
                      type="number"
                      value={waterRates}
                      onChange={(e) => setWaterRates(Number(e.target.value))}
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
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Inflation Rate (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={inflation}
                      onChange={(e) => setInflation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
              
              <Button onClick={calculateInvestment} className="w-full" size="lg">
                Calculate Investment Returns
              </Button>
            </div>
            
            {result && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Repayments ({repaymentType === "interest-only" ? "Interest only" : "P&I"})</p>
                      <p className="text-2xl font-bold">${result.annualRepayment.toLocaleString()} / year</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Property Income</p>
                      <p className="text-2xl font-bold">${result.annualRent.toLocaleString()} / year</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Other Taxable Income</p>
                      <p className="text-2xl font-bold">${annualSalary.toLocaleString()} / year</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Weekly Cash Flow</p>
                      <p className={`text-2xl font-bold ${result.weeklyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(result.weeklyCashFlow).toFixed(2)}
                        {result.weeklyCashFlow >= 0 ? ' surplus' : ' shortfall'}
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Multi-Year Projections</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2"></th>
                          {result.projections.map((p: any) => (
                            <th key={p.year} className="text-right py-2">Year {p.year}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Annual rental income</td>
                          {result.projections.map((p: any) => (
                            <td key={p.year} className="text-right py-2">${p.rent.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Annual repayments</td>
                          {result.projections.map((p: any) => (
                            <td key={p.year} className="text-right py-2">${result.annualRepayment.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Annual cash expenses</td>
                          {result.projections.map((p: any) => (
                            <td key={p.year} className="text-right py-2">${p.expenses.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="border-b font-semibold">
                          <td className="py-2">Pre-tax cash flow</td>
                          {result.projections.map((p: any) => (
                            <td key={p.year} className={`text-right py-2 ${p.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${Math.abs(p.cashFlow).toLocaleString()}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Tax Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span>Tax without property</span>
                      <span className="font-medium">${result.taxWithoutProperty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span>Tax with property</span>
                      <span className="font-medium">${result.taxWithProperty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950 rounded">
                      <span className="font-semibold">Annual tax benefit</span>
                      <span className="font-bold text-green-600">${result.taxBenefit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span>Monthly cash flow (after tax)</span>
                      <span className={`font-medium ${result.monthlyCashFlowAfterTax >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(result.monthlyCashFlowAfterTax).toLocaleString()}
                        {result.monthlyCashFlowAfterTax >= 0 ? ' surplus' : ' shortfall'}
                      </span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Investment Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Gross Rental Yield</span>
                      <span className="font-medium">{result.grossYield.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Rental Yield</span>
                      <span className="font-medium">{result.netYield.toFixed(2)}%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Estimated Year 1 Capital Growth (5% p.a.)</span>
                      <span className="font-medium">${result.yearOneGrowth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated 5-Year Property Value</span>
                      <span className="font-medium">${Math.round(result.fiveYearValue).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated 10-Year Property Value</span>
                      <span className="font-medium">${Math.round(result.tenYearValue).toLocaleString()}</span>
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
            <h3 className="text-lg font-semibold mb-4">Understanding Key Metrics</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Rental Yield</h4>
                <p className="text-muted-foreground mb-2">
                  Measures the return on investment from rental income as a percentage of the property value.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Gross Yield:</strong> Annual rent ÷ property price</li>
                  <li><strong>Net Yield:</strong> (Annual rent - expenses) ÷ property price</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Cash Flow</h4>
                <p className="text-muted-foreground mb-2">
                  The difference between rental income and all property costs including loan repayments and expenses.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Positive:</strong> Income exceeds costs</li>
                  <li><strong>Negative:</strong> Costs exceed income (may benefit from tax deductions)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Capital Growth</h4>
                <p className="text-muted-foreground">
                  The increase in property value over time. Historical averages in Australian capital cities have been around 5-7% per annum, though this varies significantly by location and market conditions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Total Return</h4>
                <p className="text-muted-foreground">
                  Combines both rental income (cash flow) and capital growth to give a complete picture of investment performance. Successful property investment considers both factors.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 mt-6 bg-muted">
            <h3 className="text-lg font-semibold mb-2">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              This calculator provides estimates only and should not be considered financial advice. Actual costs, returns, and tax implications vary based on individual circumstances, property location, market conditions, and current tax laws. Tax calculations use 2024-25 Australian tax brackets as a guide. For personalized advice, please consult with a qualified mortgage broker, accountant, or financial adviser.
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
