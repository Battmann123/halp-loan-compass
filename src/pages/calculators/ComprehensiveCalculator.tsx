import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Calculator, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalculationResult {
  // Loan Repayment
  monthlyRepayment: number;
  fortnightlyRepayment: number;
  weeklyRepayment: number;
  totalInterest: number;
  totalPayable: number;
  
  // Borrowing Power
  maxLoanAmount: number;
  estimatedPropertyValue: number;
  
  // Serviceability
  monthlyIncome: number;
  monthlyCommitments: number;
  surplusIncome: number;
  serviceabilityRatio: number;
  serviceabilityPasses: boolean;
  
  // Stamp Duty
  stampDuty: number;
  transferFee: number;
  mortgageRegistration: number;
  totalStampDutyCosts: number;
  
  // LMI
  lmiRequired: boolean;
  lmiCost: number;
  lvr: number;
  
  // Upfront Costs
  deposit: number;
  buildingInspection: number;
  conveyancing: number;
  totalUpfrontCosts: number;
  
  // Government Grants
  eligibleForFHOG: boolean;
  fhogAmount: number;
  eligibleForFHBScheme: boolean;
  depositWithGrants: number;
}

const ComprehensiveCalculator = () => {
  // Property Details
  const [propertyValue, setPropertyValue] = useState("650000");
  const [state, setState] = useState("NSW");
  const [propertyType, setPropertyType] = useState("existing");
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState("yes");
  
  // Loan Details
  const [deposit, setDeposit] = useState("130000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [repaymentType, setRepaymentType] = useState("principal-interest");
  
  // Income Details
  const [annualIncome, setAnnualIncome] = useState("120000");
  const [otherIncome, setOtherIncome] = useState("0");
  const [livingExpenses, setLivingExpenses] = useState("3000");
  const [otherLoanRepayments, setOtherLoanRepayments] = useState("0");
  const [creditCardLimits, setCreditCardLimits] = useState("0");
  const [dependents, setDependents] = useState("0");
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateStampDuty = (value: number, state: string, isFirstHome: boolean): number => {
    let duty = 0;
    
    if (state === "NSW") {
      // First Home Buyer Exemption
      if (isFirstHome && value <= 800000) return 0;
      
      // NSW rates (2024-2025)
      if (value <= 17000) {
        duty = Math.max((value / 100) * 1.25, 20);
      } else if (value <= 37000) {
        duty = 212 + ((value - 17000) / 100) * 1.5;
      } else if (value <= 99000) {
        duty = 512 + ((value - 37000) / 100) * 1.75;
      } else if (value <= 372000) {
        duty = 1597 + ((value - 99000) / 100) * 3.5;
      } else if (value <= 1240000) {
        duty = 11152 + ((value - 372000) / 100) * 4.5;
      } else if (value <= 3721000) {
        duty = 50212 + ((value - 1240000) / 100) * 5.5;
      } else {
        duty = 186667 + ((value - 3721000) / 100) * 7.0;
      }
    } else if (state === "VIC") {
      // First Home Buyer Exemption
      if (isFirstHome && value <= 600000) return 0;
      
      if (value <= 25000) {
        duty = value * 0.014;
      } else if (value <= 130000) {
        duty = 350 + (value - 25000) * 0.024;
      } else if (value <= 440000) {
        duty = 2870 + (value - 130000) * 0.05;
      } else if (value <= 550000) {
        duty = 18370 + (value - 440000) * 0.06;
      } else if (value <= 960000) {
        duty = 24970 + (value - 550000) * 0.06;
      } else {
        duty = 49070 + (value - 960000) * 0.055;
      }
    } else if (state === "QLD") {
      // First Home Buyer Concession
      if (isFirstHome && value <= 500000) return 0;
      
      if (value <= 5000) {
        duty = 0;
      } else if (value <= 75000) {
        duty = (value - 5000) * 0.015;
      } else if (value <= 540000) {
        duty = 1050 + (value - 75000) * 0.035;
      } else if (value <= 1000000) {
        duty = 17325 + (value - 540000) * 0.045;
      } else {
        duty = 38025 + (value - 1000000) * 0.0575;
      }
    } else if (state === "WA") {
      // First Home Buyer Exemption
      if (isFirstHome && value <= 430000) return 0;
      
      if (value <= 120000) {
        duty = value * 0.019;
      } else if (value <= 150000) {
        duty = 2280 + (value - 120000) * 0.029;
      } else if (value <= 360000) {
        duty = 3150 + (value - 150000) * 0.039;
      } else if (value <= 725000) {
        duty = 11340 + (value - 360000) * 0.049;
      } else {
        duty = 29225 + (value - 725000) * 0.051;
      }
    } else if (state === "SA") {
      // First Home Buyer Exemption
      if (isFirstHome && value <= 650000) return 0;
      
      if (value <= 12000) {
        duty = value * 0.01;
      } else if (value <= 30000) {
        duty = 120 + (value - 12000) * 0.02;
      } else if (value <= 50000) {
        duty = 480 + (value - 30000) * 0.03;
      } else if (value <= 100000) {
        duty = 1080 + (value - 50000) * 0.035;
      } else if (value <= 200000) {
        duty = 2830 + (value - 100000) * 0.04;
      } else if (value <= 250000) {
        duty = 6830 + (value - 200000) * 0.04;
      } else if (value <= 300000) {
        duty = 8830 + (value - 250000) * 0.045;
      } else if (value <= 500000) {
        duty = 11080 + (value - 300000) * 0.0475;
      } else {
        duty = 20580 + (value - 500000) * 0.055;
      }
    } else if (state === "TAS") {
      // First Home Buyer Exemption
      if (isFirstHome && value <= 600000) return 0;
      
      if (value <= 3000) {
        duty = 50;
      } else if (value <= 25000) {
        duty = 50 + (value - 3000) * 0.0175;
      } else if (value <= 75000) {
        duty = 435 + (value - 25000) * 0.022;
      } else if (value <= 200000) {
        duty = 1535 + (value - 75000) * 0.035;
      } else if (value <= 375000) {
        duty = 5910 + (value - 200000) * 0.04;
      } else if (value <= 725000) {
        duty = 12910 + (value - 375000) * 0.0425;
      } else {
        duty = 27785 + (value - 725000) * 0.045;
      }
    } else if (state === "ACT") {
      // ACT uses a different system - simplified for this calculator
      if (value <= 260000) {
        duty = (value / 100) * 0.67;
      } else if (value <= 300000) {
        duty = 1742 + ((value - 260000) / 100) * 2.2;
      } else if (value <= 500000) {
        duty = 2622 + ((value - 300000) / 100) * 3.4;
      } else if (value <= 750000) {
        duty = 9422 + ((value - 500000) / 100) * 4.32;
      } else if (value <= 1000000) {
        duty = 20222 + ((value - 750000) / 100) * 5.9;
      } else if (value <= 1455000) {
        duty = 34972 + ((value - 1000000) / 100) * 6.4;
      } else {
        duty = 64092 + ((value - 1455000) / 100) * 4.54;
      }
    } else if (state === "NT") {
      // NT rates
      duty = (value / 1000) * 4.95 + 15;
      if (value <= 525000) {
        duty *= 0.7; // Concession
      }
    }
    
    return Math.round(duty);
  };

  const calculateLMI = (loanAmount: number, propertyValue: number): { required: boolean; cost: number; lvr: number } => {
    const lvr = (loanAmount / propertyValue) * 100;
    
    if (lvr <= 80) {
      return { required: false, cost: 0, lvr };
    }
    
    // LMI calculation based on LVR
    let lmiRate = 0;
    if (lvr <= 85) lmiRate = 0.017;
    else if (lvr <= 90) lmiRate = 0.024;
    else if (lvr <= 95) lmiRate = 0.036;
    
    const lmiCost = Math.round(loanAmount * lmiRate);
    
    return { required: true, cost: lmiCost, lvr };
  };

  const calculateMonthlyRepayment = (principal: number, annualRate: number, years: number, type: string): number => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    
    if (type === "interest-only") {
      return principal * monthlyRate;
    }
    
    if (monthlyRate === 0) return principal / numPayments;
    
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const calculateComprehensive = () => {
    const propValue = parseFloat(propertyValue) || 0;
    const depositAmount = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 30;
    const income = parseFloat(annualIncome) || 0;
    const otherInc = parseFloat(otherIncome) || 0;
    const expenses = parseFloat(livingExpenses) || 0;
    const otherLoans = parseFloat(otherLoanRepayments) || 0;
    const creditLimits = parseFloat(creditCardLimits) || 0;
    const numDependents = parseInt(dependents) || 0;
    
    const loanAmount = propValue - depositAmount;
    const isFirstHome = isFirstHomeBuyer === "yes";
    
    // 1. LOAN REPAYMENT CALCULATIONS
    const monthlyRepay = calculateMonthlyRepayment(loanAmount, rate, term, repaymentType);
    const fortnightlyRepay = (monthlyRepay * 12) / 26;
    const weeklyRepay = (monthlyRepay * 12) / 52;
    const totalPayable = monthlyRepay * term * 12;
    const totalInt = totalPayable - loanAmount;
    
    // 2. BORROWING POWER CALCULATIONS
    const monthlyInc = (income + otherInc) / 12;
    const monthlyExp = expenses || (monthlyInc * 0.3);
    const creditCardBuffer = creditLimits * 0.03;
    const monthlyCommit = otherLoans + creditCardBuffer;
    const surplus = monthlyInc - monthlyExp - monthlyCommit;
    
    const assessmentRate = 8.0;
    const maxMonthlyRepay = monthlyInc * 0.3;
    const assessmentMonthlyRate = assessmentRate / 100 / 12;
    const numPayments = 30 * 12;
    const maxLoan = maxMonthlyRepay * (Math.pow(1 + assessmentMonthlyRate, numPayments) - 1) / 
                    (assessmentMonthlyRate * Math.pow(1 + assessmentMonthlyRate, numPayments));
    const estimatedPropValue = maxLoan / 0.8;
    
    // 3. SERVICEABILITY CALCULATIONS
    const dependentCosts = numDependents * 150;
    const totalMonthlyCommit = monthlyExp + monthlyCommit + dependentCosts;
    const serviceSurplus = monthlyInc - totalMonthlyCommit;
    const serviceRatio = (totalMonthlyCommit / monthlyInc) * 100;
    const servicePasses = serviceRatio <= 70 && serviceSurplus >= 500;
    
    // 4. STAMP DUTY CALCULATIONS
    const stampDutyAmount = calculateStampDuty(propValue, state, isFirstHome);
    const transferFeeAmount = state === "NSW" ? 165.40 : state === "VIC" ? 119.90 : 150;
    const mortgageReg = 150;
    const totalStampDuty = stampDutyAmount + transferFeeAmount + mortgageReg;
    
    // 5. LMI CALCULATIONS
    const lmiData = calculateLMI(loanAmount, propValue);
    
    // 6. UPFRONT COSTS CALCULATIONS
    const buildingInsp = 500;
    const convey = 1500;
    const totalUpfront = depositAmount + totalStampDuty + lmiData.cost + buildingInsp + convey;
    
    // 7. GOVERNMENT GRANTS
    const isNewProperty = propertyType === "new";
    const eligibleFHOG = isFirstHome && isNewProperty && propValue <= 750000;
    const fhogAmt = eligibleFHOG ? 10000 : 0;
    const eligibleFHB = isFirstHome && propValue <= 800000;
    const depositWithGrant = depositAmount + fhogAmt;
    
    setResult({
      monthlyRepayment: monthlyRepay,
      fortnightlyRepayment: fortnightlyRepay,
      weeklyRepayment: weeklyRepay,
      totalInterest: totalInt,
      totalPayable: totalPayable,
      maxLoanAmount: maxLoan,
      estimatedPropertyValue: estimatedPropValue,
      monthlyIncome: monthlyInc,
      monthlyCommitments: totalMonthlyCommit,
      surplusIncome: serviceSurplus,
      serviceabilityRatio: serviceRatio,
      serviceabilityPasses: servicePasses,
      stampDuty: stampDutyAmount,
      transferFee: transferFeeAmount,
      mortgageRegistration: mortgageReg,
      totalStampDutyCosts: totalStampDuty,
      lmiRequired: lmiData.required,
      lmiCost: lmiData.cost,
      lvr: lmiData.lvr,
      deposit: depositAmount,
      buildingInspection: buildingInsp,
      conveyancing: convey,
      totalUpfrontCosts: totalUpfront,
      eligibleForFHOG: eligibleFHOG,
      fhogAmount: fhogAmt,
      eligibleForFHBScheme: eligibleFHB,
      depositWithGrants: depositWithGrant,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Comprehensive Property Finance Calculator",
    description: "All-in-one property finance planning tool combining loan affordability and purchase cost calculations",
    url: "https://halp-loan-compass.lovable.app/calculators/comprehensive",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="All-in-One Property Finance Calculator | Comprehensive Home Loan Planning Tool"
        description="Complete property finance planning tool. Calculate loan repayments, borrowing power, serviceability, stamp duty, LMI, upfront costs, and government grants all in one place."
        keywords="comprehensive mortgage calculator, property finance calculator, all-in-one home loan calculator, Australian property calculator"
        canonical="https://halp-loan-compass.lovable.app/calculators/comprehensive"
        structuredData={structuredData}
      />
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/calculators" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Calculators
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Comprehensive Property Finance Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            All-in-one property finance planning tool that calculates loan affordability, repayments, 
            and all purchase costs in a single comprehensive analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Property Details */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Value</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    placeholder="e.g., 650000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Territory</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger id="state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">New South Wales</SelectItem>
                      <SelectItem value="VIC">Victoria</SelectItem>
                      <SelectItem value="QLD">Queensland</SelectItem>
                      <SelectItem value="WA">Western Australia</SelectItem>
                      <SelectItem value="SA">South Australia</SelectItem>
                      <SelectItem value="TAS">Tasmania</SelectItem>
                      <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                      <SelectItem value="NT">Northern Territory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <RadioGroup value={propertyType} onValueChange={setPropertyType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="existing" />
                      <Label htmlFor="existing" className="font-normal cursor-pointer">
                        Existing Property
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new" className="font-normal cursor-pointer">
                        New Property
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Are you a first home buyer?</Label>
                  <RadioGroup value={isFirstHomeBuyer} onValueChange={setIsFirstHomeBuyer}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="fhb-yes" />
                      <Label htmlFor="fhb-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="fhb-no" />
                      <Label htmlFor="fhb-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Loan Details */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="deposit">Deposit Amount</Label>
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="e.g., 130000"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 6.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger id="loanTerm">
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

                <div className="space-y-2">
                  <Label>Repayment Type</Label>
                  <RadioGroup value={repaymentType} onValueChange={setRepaymentType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="principal-interest" id="pi" />
                      <Label htmlFor="pi" className="font-normal cursor-pointer">
                        Principal & Interest
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="interest-only" id="io" />
                      <Label htmlFor="io" className="font-normal cursor-pointer">
                        Interest Only
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Income & Expenses */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Income & Expenses</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (before tax)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="e.g., 85000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherIncome">Other Annual Income</Label>
                  <Input
                    id="otherIncome"
                    type="number"
                    placeholder="e.g., 10000"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="livingExpenses">Monthly Living Expenses</Label>
                  <Input
                    id="livingExpenses"
                    type="number"
                    placeholder="e.g., 3000"
                    value={livingExpenses}
                    onChange={(e) => setLivingExpenses(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherLoanRepayments">Other Monthly Loan Repayments</Label>
                  <Input
                    id="otherLoanRepayments"
                    type="number"
                    placeholder="e.g., 500"
                    value={otherLoanRepayments}
                    onChange={(e) => setOtherLoanRepayments(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditCardLimits">Total Credit Card Limits</Label>
                  <Input
                    id="creditCardLimits"
                    type="number"
                    placeholder="e.g., 10000"
                    value={creditCardLimits}
                    onChange={(e) => setCreditCardLimits(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Select value={dependents} onValueChange={setDependents}>
                    <SelectTrigger id="dependents">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Button onClick={calculateComprehensive} className="w-full" size="lg">
              Calculate Complete Analysis
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {result && (
              <Card className="sticky top-4">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-6">Comprehensive Analysis Results</h3>
                  
                  <Tabs defaultValue="repayments" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="repayments">Repayments</TabsTrigger>
                      <TabsTrigger value="affordability">Affordability</TabsTrigger>
                      <TabsTrigger value="costs">Costs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="repayments" className="space-y-4">
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Monthly Repayment</p>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(result.monthlyRepayment)}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/50 p-3 rounded">
                          <p className="text-xs text-muted-foreground mb-1">Fortnightly</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(result.fortnightlyRepayment)}
                          </p>
                        </div>
                        <div className="bg-secondary/50 p-3 rounded">
                          <p className="text-xs text-muted-foreground mb-1">Weekly</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(result.weeklyRepayment)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Interest</span>
                          <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Payable</span>
                          <span className="font-semibold">{formatCurrency(result.totalPayable)}</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="affordability" className="space-y-4">
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Maximum Loan Amount</p>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(result.maxLoanAmount)}
                        </p>
                      </div>

                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Estimated Property Value</p>
                        <p className="text-xl font-semibold">
                          {formatCurrency(result.estimatedPropertyValue)}
                        </p>
                      </div>

                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Income</span>
                          <span className="font-semibold">{formatCurrency(result.monthlyIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Commitments</span>
                          <span className="font-semibold">{formatCurrency(result.monthlyCommitments)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Surplus Income</span>
                          <span className="font-semibold">{formatCurrency(result.surplusIncome)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-muted-foreground">Serviceability Test</span>
                          <span className={`font-bold ${result.serviceabilityPasses ? 'text-green-600' : 'text-red-600'}`}>
                            {result.serviceabilityPasses ? '✓ PASS' : '✗ FAIL'}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Serviceability Ratio: {result.serviceabilityRatio.toFixed(1)}%
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="costs" className="space-y-4">
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Upfront Costs</p>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(result.totalUpfrontCosts)}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deposit</span>
                          <span className="font-semibold">{formatCurrency(result.deposit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stamp Duty</span>
                          <span className="font-semibold">{formatCurrency(result.stampDuty)}</span>
                        </div>
                        {result.lmiRequired && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">LMI Cost (LVR: {result.lvr.toFixed(1)}%)</span>
                            <span className="font-semibold">{formatCurrency(result.lmiCost)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Building Inspection</span>
                          <span className="font-semibold">{formatCurrency(result.buildingInspection)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conveyancing</span>
                          <span className="font-semibold">{formatCurrency(result.conveyancing)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transfer & Registration</span>
                          <span className="font-semibold">
                            {formatCurrency(result.transferFee + result.mortgageRegistration)}
                          </span>
                        </div>
                      </div>

                      {(result.eligibleForFHOG || result.eligibleForFHBScheme) && (
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">
                            Government Assistance Available
                          </p>
                          {result.eligibleForFHOG && (
                            <p className="text-sm text-green-700 dark:text-green-400">
                              • First Home Owner Grant: {formatCurrency(result.fhogAmount)}
                            </p>
                          )}
                          {result.eligibleForFHBScheme && (
                            <p className="text-sm text-green-700 dark:text-green-400">
                              • Eligible for First Home Buyer Stamp Duty concessions
                            </p>
                          )}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">What This Calculator Includes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Complete loan repayment calculations (monthly, fortnightly, weekly)</li>
                <li>✓ Borrowing power analysis based on your income</li>
                <li>✓ Serviceability assessment using bank criteria</li>
                <li>✓ Stamp duty for all Australian states and territories</li>
                <li>✓ Lenders Mortgage Insurance (LMI) calculations</li>
                <li>✓ All upfront purchase costs and fees</li>
                <li>✓ Government grants and first home buyer concessions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Important Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                This calculator provides estimates only and should not be relied upon as financial advice. 
                Actual loan approval, interest rates, fees, and government grant eligibility depend on your 
                individual circumstances and lender policies. Stamp duty rates and government schemes are 
                subject to change. Always consult with a licensed mortgage broker or financial advisor before 
                making property purchase decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComprehensiveCalculator;
