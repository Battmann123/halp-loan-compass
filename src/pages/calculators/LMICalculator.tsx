import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LMICalculator = () => {
  const { toast } = useToast();
  const [propertyValue, setPropertyValue] = useState("650000");
  const [deposit, setDeposit] = useState("65000");
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState<string>("yes");
  const [occupancyType, setOccupancyType] = useState<string>("owner-occupier");
  const [state, setState] = useState<string>("NSW");
  const [result, setResult] = useState<any>(null);

  const calculateLMI = () => {
    const property = parseFloat(propertyValue);
    const depositAmount = parseFloat(deposit);
    
    // Validate inputs
    if (!propertyValue || !deposit) {
      toast({
        title: "Missing Information",
        description: "Please enter both property value and deposit amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(property) || isNaN(depositAmount) || property <= 0 || depositAmount < 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for property value and deposit.",
        variant: "destructive",
      });
      return;
    }
    
    if (depositAmount > property) {
      toast({
        title: "Invalid Deposit",
        description: "Deposit cannot be greater than property value.",
        variant: "destructive",
      });
      return;
    }
    
    const loanAmount = property - depositAmount;
    const lvr = (loanAmount / property) * 100;
    const depositPercentage = (depositAmount / property) * 100;

    // LMI is typically required for LVR > 80%
    let lmiAmount = 0;
    let lmiWaivedByScheme = false;
    
    // Check if eligible for First Home Guarantee or similar schemes
    // First Home Guarantee allows 5% deposit without LMI for eligible buyers
    if (isFirstHomeBuyer === "yes" && occupancyType === "owner-occupier") {
      if (depositPercentage >= 5 && depositPercentage < 20) {
        // Potentially eligible for First Home Guarantee
        lmiWaivedByScheme = true;
      }
    }
    
    if (lvr > 80) {
      // More accurate LMI calculation based on Australian lender rates
      // Rates vary by LVR, loan amount, and borrower type
      let lmiRate = 0;
      
      // Determine loan amount tier
      const isLowLoan = loanAmount <= 300000;
      const isMidLoan = loanAmount > 300000 && loanAmount <= 600000;
      const isHighLoan = loanAmount > 600000 && loanAmount <= 1000000;
      const isVeryHighLoan = loanAmount > 1000000;
      
      // Adjust rates for first home buyers (typically 10-15% lower)
      const fhbDiscount = isFirstHomeBuyer === "yes" ? 0.9 : 1.0;
      
      // Adjust rates for investors (typically 10-20% higher)
      const investorMultiplier = occupancyType === "investor" ? 1.15 : 1.0;
      
      // Calculate base rate based on LVR tiers (approximating QBE/Genworth rates)
      if (lvr <= 81) {
        lmiRate = isLowLoan ? 0.0053 : isMidLoan ? 0.0056 : isHighLoan ? 0.0077 : 0.0089;
      } else if (lvr <= 82) {
        lmiRate = isLowLoan ? 0.0053 : isMidLoan ? 0.0056 : isHighLoan ? 0.0077 : 0.0089;
      } else if (lvr <= 83) {
        lmiRate = isLowLoan ? 0.0065 : isMidLoan ? 0.0084 : isHighLoan ? 0.0108 : 0.0108;
      } else if (lvr <= 84) {
        lmiRate = isLowLoan ? 0.0065 : isMidLoan ? 0.0084 : isHighLoan ? 0.0108 : 0.011;
      } else if (lvr <= 85) {
        lmiRate = isLowLoan ? 0.0086 : isMidLoan ? 0.0106 : isHighLoan ? 0.0134 : 0.0134;
      } else if (lvr <= 86) {
        lmiRate = isLowLoan ? 0.0089 : isMidLoan ? 0.0107 : isHighLoan ? 0.0134 : 0.0139;
      } else if (lvr <= 87) {
        lmiRate = isLowLoan ? 0.0103 : isMidLoan ? 0.0127 : isHighLoan ? 0.0155 : 0.0155;
      } else if (lvr <= 88) {
        lmiRate = isLowLoan ? 0.0103 : isMidLoan ? 0.0127 : isHighLoan ? 0.016 : 0.0179;
      } else if (lvr <= 89) {
        lmiRate = isLowLoan ? 0.013 : isMidLoan ? 0.0171 : isHighLoan ? 0.0215 : 0.0227;
      } else if (lvr <= 90) {
        lmiRate = isLowLoan ? 0.0156 : isMidLoan ? 0.0187 : isHighLoan ? 0.0231 : 0.0265;
      } else if (lvr <= 91) {
        lmiRate = isLowLoan ? 0.0202 : isMidLoan ? 0.0265 : isHighLoan ? 0.0353 : 0.0353;
      } else if (lvr <= 92) {
        lmiRate = isLowLoan ? 0.0202 : isMidLoan ? 0.0265 : isHighLoan ? 0.0353 : 0.0353;
      } else if (lvr <= 93) {
        lmiRate = isLowLoan ? 0.0228 : isMidLoan ? 0.0298 : isHighLoan ? 0.0381 : 0.0407;
      } else if (lvr <= 94) {
        lmiRate = isLowLoan ? 0.0253 : isMidLoan ? 0.0298 : isHighLoan ? 0.0419 : 0.0438;
      } else if (lvr <= 95) {
        lmiRate = isLowLoan ? 0.0264 : isMidLoan ? 0.033 : isHighLoan ? 0.0443 : 0.0457;
      } else {
        // Above 95% LVR - use highest tier
        lmiRate = isLowLoan ? 0.0264 : isMidLoan ? 0.033 : isHighLoan ? 0.0443 : 0.0457;
      }
      
      // Apply adjustments
      lmiRate = lmiRate * fhbDiscount * investorMultiplier;
      lmiAmount = loanAmount * lmiRate;
    }

    // Add stamp duty on LMI (varies by state)
    let lmiStampDuty = 0;
    let lmiStampDutyRate = 0;
    
    if (lmiAmount > 0 && !lmiWaivedByScheme) {
      switch(state) {
        case "NSW":
          lmiStampDutyRate = 0; // No stamp duty on LMI in NSW
          break;
        case "VIC":
          lmiStampDutyRate = 0.10;
          break;
        case "QLD":
          lmiStampDutyRate = 0.09;
          break;
        case "SA":
          lmiStampDutyRate = 0.11;
          break;
        case "WA":
          lmiStampDutyRate = 0.10;
          break;
        case "TAS":
          lmiStampDutyRate = 0.10;
          break;
        case "NT":
          lmiStampDutyRate = 0.10;
          break;
        case "ACT":
          lmiStampDutyRate = 0; // Abolished
          break;
        default:
          lmiStampDutyRate = 0;
      }
      lmiStampDuty = lmiAmount * lmiStampDutyRate;
    }

    const totalLMICost = lmiAmount + lmiStampDuty;
    const totalLoanWithLMI = loanAmount + totalLMICost;
    const newLVR = (totalLoanWithLMI / property) * 100;

    setResult({
      propertyValue: property,
      deposit: depositAmount,
      loanAmount,
      lvr,
      lmiRequired: lvr > 80 && !lmiWaivedByScheme,
      lmiAmount: lmiWaivedByScheme ? 0 : lmiAmount,
      lmiAmountWithoutScheme: lmiAmount,
      lmiStampDuty: lmiWaivedByScheme ? 0 : lmiStampDuty,
      lmiStampDutyRate,
      totalLMICost: lmiWaivedByScheme ? 0 : totalLMICost,
      totalLoanWithLMI: lmiWaivedByScheme ? loanAmount : totalLoanWithLMI,
      newLVR: lmiWaivedByScheme ? lvr : newLVR,
      depositPercentage,
      isFirstHomeBuyer,
      occupancyType,
      state,
      lmiWaivedByScheme,
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
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  {propertyValue && deposit && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Deposit: {((parseFloat(deposit) / parseFloat(propertyValue)) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSW">New South Wales</SelectItem>
                      <SelectItem value="VIC">Victoria</SelectItem>
                      <SelectItem value="QLD">Queensland</SelectItem>
                      <SelectItem value="SA">South Australia</SelectItem>
                      <SelectItem value="WA">Western Australia</SelectItem>
                      <SelectItem value="TAS">Tasmania</SelectItem>
                      <SelectItem value="NT">Northern Territory</SelectItem>
                      <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={occupancyType} onValueChange={setOccupancyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner-occupier">Owner Occupier</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="firstHomeBuyer">First Home Buyer?</Label>
                  <Select value={isFirstHomeBuyer} onValueChange={setIsFirstHomeBuyer}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
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
                    {result.lmiWaivedByScheme 
                      ? "LMI May Be Waived - First Home Guarantee" 
                      : result.lmiRequired 
                        ? "LMI Required" 
                        : "No LMI Required"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.lmiWaivedByScheme && (
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg mb-4">
                      <p className="text-green-700 dark:text-green-400 font-semibold mb-2">
                        ✓ You may be eligible for the First Home Guarantee!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        As a first home buyer with a 5%+ deposit purchasing an owner-occupied property, 
                        you may qualify for the Australian Government's First Home Guarantee scheme, which waives LMI.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Without this scheme, your LMI would be approximately ${result.lmiAmountWithoutScheme.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  )}

                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground mb-1">LVR Ratio</p>
                    <p className="text-3xl font-bold">
                      {result.lvr.toFixed(1)}%
                    </p>
                  </div>

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
                      <p className="text-sm text-muted-foreground">LMI Premium</p>
                      <p className={`text-2xl font-bold ${result.lmiRequired ? 'text-orange-600' : 'text-green-600'}`}>
                        ${result.lmiAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    {result.lmiStampDuty > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {result.state} Stamp Duty on LMI ({(result.lmiStampDutyRate * 100).toFixed(0)}%)
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          ${result.lmiStampDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    )}
                    {result.totalLMICost > result.lmiAmount && (
                      <div>
                        <p className="text-sm text-muted-foreground">Total LMI Cost</p>
                        <p className="text-2xl font-bold text-orange-600">
                          ${result.totalLMICost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="text-lg font-semibold">
                        {result.occupancyType === "owner-occupier" ? "Owner Occupier" : "Investor"}
                      </p>
                    </div>
                  </div>

                  {result.lmiRequired && (
                    <>
                      <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Loan (inc. LMI{result.lmiStampDuty > 0 ? ' + Stamp Duty' : ''})</p>
                        <p className="text-3xl font-bold text-orange-600">
                          ${result.totalLoanWithLMI.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          New LVR: {result.newLVR.toFixed(1)}%
                        </p>
                        {result.lmiStampDuty > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Includes {result.state} stamp duty on LMI: ${result.lmiStampDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        )}
                      </div>

                      <div className="text-sm space-y-2">
                        <p className="font-semibold">Ways to Avoid LMI:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>First Home Guarantee scheme (5% deposit, no LMI)</li>
                          <li>Save a 20% deposit</li>
                          <li>Use a family guarantee</li>
                          <li>Professional package discounts (doctors, lawyers, etc.)</li>
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

              <h3 className="text-lg font-semibold mb-2 mt-4">First Home Guarantee - Avoid LMI</h3>
              <p>
                The Australian Government's First Home Guarantee allows eligible first home buyers to purchase with as little 
                as a 5% deposit without paying LMI. The government guarantees up to 15% of the property value, protecting the lender.
              </p>
              <p className="mt-2">
                <strong>Eligibility criteria include:</strong>
              </p>
              <ul className="space-y-1 mt-2">
                <li>• Must be an Australian citizen aged 18+</li>
                <li>• Never owned property in Australia before</li>
                <li>• Purchasing an owner-occupied home</li>
                <li>• Property value must be under regional price caps</li>
                <li>• Meet income limits (currently $125k for singles, $200k for couples)</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact a mortgage broker to check your eligibility and apply for this valuable scheme.
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
