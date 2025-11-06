import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DollarSign, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const UpfrontCostsCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [state, setState] = useState("NSW");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState("no");
  const [result, setResult] = useState<any>(null);

  const calculateStampDuty = (value: number, state: string, isFirstHome: boolean) => {
    // Calculate stamp duty using tiered brackets (accurate as of 2024)
    let stampDuty = 0;
    
    console.log("calculateStampDuty called with:", { value, state, isFirstHome });

    switch(state) {
      case "NSW":
        // First Home Buyer exemptions
        if (isFirstHome && value <= 800000) {
          return 0;
        }
        // NSW has tiered rates
        if (value <= 14000) {
          stampDuty = value * 0.0125;
        } else if (value <= 32000) {
          stampDuty = 175 + (value - 14000) * 0.015;
        } else if (value <= 85000) {
          stampDuty = 445 + (value - 32000) * 0.0175;
        } else if (value <= 319000) {
          stampDuty = 1372.50 + (value - 85000) * 0.035;
        } else if (value <= 1064000) {
          stampDuty = 9562.50 + (value - 319000) * 0.045;
        } else if (value <= 3177000) {
          stampDuty = 43087.50 + (value - 1064000) * 0.055;
        } else {
          stampDuty = 159302.50 + (value - 3177000) * 0.07;
        }
        break;

      case "VIC":
        // First Home Buyer exemptions (new homes only)
        if (isFirstHome && value <= 600000) {
          console.log("VIC: First home buyer exemption applied");
          return 0;
        }
        // Victoria tiered rates (as per SRO official rates)
        if (value <= 25000) {
          stampDuty = value * 0.014;
        } else if (value <= 130000) {
          stampDuty = 350 + (value - 25000) * 0.024;
        } else if (value <= 960000) {
          stampDuty = 2870 + (value - 130000) * 0.06;
        } else if (value <= 2000000) {
          stampDuty = value * 0.055;
        } else {
          stampDuty = 110000 + (value - 2000000) * 0.065;
        }
        console.log("VIC: Calculated stamp duty:", stampDuty);
        break;

      case "QLD":
        // Queensland tiered rates
        if (value <= 5000) {
          stampDuty = 0;
        } else if (value <= 75000) {
          stampDuty = (value - 5000) * 0.015;
        } else if (value <= 540000) {
          stampDuty = 1050 + (value - 75000) * 0.035;
        } else if (value <= 1000000) {
          stampDuty = 17325 + (value - 540000) * 0.045;
        } else {
          stampDuty = 38025 + (value - 1000000) * 0.0575;
        }
        break;

      case "SA":
        // South Australia tiered rates
        if (value <= 12000) {
          stampDuty = value * 0.01;
        } else if (value <= 30000) {
          stampDuty = 120 + (value - 12000) * 0.02;
        } else if (value <= 50000) {
          stampDuty = 480 + (value - 30000) * 0.03;
        } else if (value <= 100000) {
          stampDuty = 1080 + (value - 50000) * 0.035;
        } else if (value <= 200000) {
          stampDuty = 2830 + (value - 100000) * 0.04;
        } else if (value <= 250000) {
          stampDuty = 6830 + (value - 200000) * 0.0425;
        } else if (value <= 300000) {
          stampDuty = 8955 + (value - 250000) * 0.045;
        } else if (value <= 500000) {
          stampDuty = 11205 + (value - 300000) * 0.0475;
        } else {
          stampDuty = 20705 + (value - 500000) * 0.055;
        }
        break;

      case "WA":
        // Western Australia tiered rates
        if (value <= 120000) {
          stampDuty = value * 0.019;
        } else if (value <= 150000) {
          stampDuty = 2280 + (value - 120000) * 0.028;
        } else if (value <= 360000) {
          stampDuty = 3120 + (value - 150000) * 0.038;
        } else if (value <= 725000) {
          stampDuty = 11100 + (value - 360000) * 0.049;
        } else {
          stampDuty = 28985 + (value - 725000) * 0.051;
        }
        break;

      case "TAS":
        // Tasmania tiered rates
        if (value <= 3000) {
          stampDuty = 50;
        } else if (value <= 25000) {
          stampDuty = 50 + (value - 3000) * 0.0175;
        } else if (value <= 75000) {
          stampDuty = 435 + (value - 25000) * 0.025;
        } else if (value <= 200000) {
          stampDuty = 1685 + (value - 75000) * 0.035;
        } else if (value <= 375000) {
          stampDuty = 6060 + (value - 200000) * 0.04;
        } else if (value <= 725000) {
          stampDuty = 13060 + (value - 375000) * 0.0425;
        } else {
          stampDuty = 27935 + (value - 725000) * 0.045;
        }
        break;

      case "NT":
        // Northern Territory - flat rates based on value
        if (value <= 525000) {
          stampDuty = value * 0.0672;
        } else if (value <= 3000000) {
          stampDuty = value * 0.0492;
        } else {
          stampDuty = 147600 + (value - 3000000) * 0.0575;
        }
        break;

      case "ACT":
        // ACT tiered rates
        if (value <= 200000) {
          stampDuty = (value / 200000) * (value / 200000) * 9340;
        } else if (value <= 300000) {
          stampDuty = 9340 + ((value - 200000) / 100000) * ((value - 200000) / 100000) * 6950;
        } else if (value <= 500000) {
          stampDuty = 16290 + ((value - 300000) / 200000) * ((value - 300000) / 200000) * 14890;
        } else if (value <= 750000) {
          stampDuty = 31180 + ((value - 500000) / 250000) * ((value - 500000) / 250000) * 20970;
        } else if (value <= 1000000) {
          stampDuty = 52150 + ((value - 750000) / 250000) * ((value - 750000) / 250000) * 27755;
        } else if (value <= 1455000) {
          stampDuty = 79905 + (value - 1000000) * 0.044;
        } else {
          stampDuty = 99925 + (value - 1455000) * 0.058;
        }
        break;

      default:
        stampDuty = value * 0.04;
    }

    console.log("calculateStampDuty returning:", stampDuty);
    return Math.round(stampDuty);
  };

  const calculateCosts = () => {
    const value = parseFloat(propertyValue || "0");
    const deposit = parseFloat(depositAmount || "0");
    const isFirstHome = firstHomeBuyer === "yes";

    const stampDuty = calculateStampDuty(value, state, isFirstHome);
    const legalFees = 2000; // Average conveyancing fees
    const buildingInspection = 600;
    const pestInspection = 300;
    const loanApplicationFee = 600;
    const valuationFee = 400;
    const titleSearch = 150;
    const transferFee = 200;
    
    // LMI calculation with proper LVR-based rates
    const loanAmount = value - deposit;
    const lvr = (loanAmount / value) * 100;
    let lmi = 0;
    
    if (lvr > 80) {
      // Use tiered LMI rates based on LVR and loan amount (matching LMICalculator logic)
      const isLowLoan = loanAmount <= 300000;
      const isMidLoan = loanAmount > 300000 && loanAmount <= 600000;
      const isHighLoan = loanAmount > 600000 && loanAmount <= 1000000;
      
      let lmiRate = 0;
      
      if (lvr <= 85) {
        lmiRate = isLowLoan ? 0.0086 : isMidLoan ? 0.0106 : 0.0134;
      } else if (lvr <= 90) {
        lmiRate = isLowLoan ? 0.0156 : isMidLoan ? 0.0187 : 0.0231;
      } else if (lvr <= 95) {
        lmiRate = isLowLoan ? 0.0264 : isMidLoan ? 0.033 : 0.0443;
      } else {
        lmiRate = isLowLoan ? 0.0264 : isMidLoan ? 0.033 : 0.0443;
      }
      
      lmi = loanAmount * lmiRate;
    }

    const totalUpfront = stampDuty + legalFees + buildingInspection + pestInspection + 
                        loanApplicationFee + valuationFee + titleSearch + transferFee;
    
    const totalWithDeposit = totalUpfront + deposit;
    const totalWithLMI = totalUpfront + lmi;

    setResult({
      stampDuty,
      legalFees,
      buildingInspection,
      pestInspection,
      loanApplicationFee,
      valuationFee,
      titleSearch,
      transferFee,
      lmi,
      deposit,
      lvr,
      loanAmount,
      totalUpfront,
      totalWithDeposit,
      totalWithLMI,
      propertyValue: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <DollarSign className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Upfront Costs Calculator
          </h1>
          <p className="text-lg opacity-95">
            Calculate total costs to purchase a property
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
                  <Label htmlFor="depositAmount">Deposit Amount ($)</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="65000"
                  />
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
                  <Label htmlFor="firstHomeBuyer">First Home Buyer?</Label>
                  <Select value={firstHomeBuyer} onValueChange={setFirstHomeBuyer}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateCosts} className="w-full">
                  Calculate Upfront Costs
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Stamp Duty</span>
                      <span className="font-semibold">${result.stampDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Legal/Conveyancing</span>
                      <span className="font-semibold">${result.legalFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Building Inspection</span>
                      <span className="font-semibold">${result.buildingInspection.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Pest Inspection</span>
                      <span className="font-semibold">${result.pestInspection.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Loan Application Fee</span>
                      <span className="font-semibold">${result.loanApplicationFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Valuation Fee</span>
                      <span className="font-semibold">${result.valuationFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Title Search</span>
                      <span className="font-semibold">${result.titleSearch.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Transfer Fee</span>
                      <span className="font-semibold">${result.transferFee.toLocaleString()}</span>
                    </div>
                    {result.lmi > 0 && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">LMI (LVR: {result.lvr.toFixed(1)}%)</span>
                        <span className="font-semibold text-orange-600">${result.lmi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Total Upfront Costs</span>
                      <span className="text-2xl font-bold text-primary">
                        ${result.totalUpfront.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>With Deposit ({((result.deposit / result.propertyValue) * 100).toFixed(1)}%)</span>
                      <span className="font-semibold">
                        ${result.totalWithDeposit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    {result.lmi > 0 && (
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>Including LMI</span>
                        <span className="font-semibold">
                          ${result.totalWithLMI.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground mt-4 space-y-1">
                    <p>💡 Budget an additional $2,000-$5,000 for:</p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Moving costs</li>
                      <li>Connection fees (utilities)</li>
                      <li>Council rates adjustment</li>
                      <li>Insurance</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Understanding Upfront Costs</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">What's Included?</h3>
              <p>When buying a property, you'll need to budget for several upfront costs beyond your deposit:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold">Government Fees</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Stamp duty (largest cost)</li>
                    <li>• Transfer fees</li>
                    <li>• Title search fees</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Professional Services</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Conveyancing/legal fees</li>
                    <li>• Building & pest inspections</li>
                    <li>• Property valuation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Lender Fees</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Loan application fee</li>
                    <li>• LMI (if deposit &lt; 20%)</li>
                    <li>• Mortgage registration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Moving In</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Moving costs</li>
                    <li>• Utility connections</li>
                    <li>• Insurance</li>
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
                This calculator provides estimates based on current government stamp duty rates as of 2024. 
                Actual costs may vary based on specific circumstances, property type, and any additional state-based 
                concessions or exemptions that may apply.
              </p>
              <p>
                Professional fees and lender costs are industry averages and may differ between providers.
                For accurate cost estimates and personalized advice, please{" "}
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

export default UpfrontCostsCalculator;
