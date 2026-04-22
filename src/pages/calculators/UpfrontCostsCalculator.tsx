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
import { calculateStampDuty, calculateLmi, type AusState, type PropertyCategory } from "@/lib/calculations";

const UpfrontCostsCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("650000");
  const [depositAmount, setDepositAmount] = useState("130000");
  const [state, setState] = useState("NSW");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState("yes");
  const [propertyType, setPropertyType] = useState("owner-occupier");
  const [result, setResult] = useState<any>(null);

  const calculateCosts = () => {
    const value = parseFloat(propertyValue || "0");
    const deposit = parseFloat(depositAmount || "0");
    const isFirstHome = firstHomeBuyer === "yes";
    const occupancy = propertyType === "investor" ? "investor" : "owner-occupier";

    // Use shared stamp duty helper (assumes "established" by default for upfront calc).
    const sd = calculateStampDuty({
      value,
      state: state as AusState,
      isFirstHomeBuyer: isFirstHome,
      occupancy,
      category: "established" as PropertyCategory,
    });
    const stampDuty = sd.duty;

    const legalFees = 2000;
    const buildingInspection = 600;
    const pestInspection = 300;
    const loanApplicationFee = 600;
    const valuationFee = 400;
    const titleSearch = 150;
    const transferFee = sd.transferFee;

    const loanAmount = value - deposit;
    const lvr = value > 0 ? (loanAmount / value) * 100 : 0;
    const lmiResult = calculateLmi({
      loanAmount,
      propertyValue: value,
      isFirstHomeBuyer: isFirstHome,
      occupancy,
      state: state as AusState,
    });
    const lmi = lmiResult.premium;
    const lmiStampDuty = lmiResult.stampDutyOnLmi;
    const totalLMI = lmiResult.total;

    const totalUpfront = stampDuty + legalFees + buildingInspection + pestInspection +
                        loanApplicationFee + valuationFee + titleSearch + transferFee;

    const totalWithDeposit = totalUpfront + deposit;
    const totalWithLMI = totalUpfront + totalLMI;

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
      lmiStampDuty,
      totalLMI,
      deposit,
      lvr,
      loanAmount,
      totalUpfront,
      totalWithDeposit,
      totalWithLMI,
      propertyValue: value,
      propertyType,
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
                  {propertyValue && depositAmount && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Deposit: {((parseFloat(depositAmount) / parseFloat(propertyValue)) * 100).toFixed(1)}%
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
                  <Select value={propertyType} onValueChange={setPropertyType}>
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
                      <>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">LMI Premium (LVR: {result.lvr.toFixed(1)}%)</span>
                          <span className="font-semibold text-orange-600">${result.lmi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        {result.lmiStampDuty > 0 && (
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">{state} Stamp Duty on LMI</span>
                            <span className="font-semibold text-orange-600">${result.lmiStampDuty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground font-semibold">Total LMI Cost</span>
                          <span className="font-semibold text-orange-600">${result.totalLMI.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      </>
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
                    {result.totalLMI > 0 && (
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>Including LMI{result.lmiStampDuty > 0 ? ' + Stamp Duty' : ''}</span>
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
