import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Percent, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const CapitalGainsCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchaseCosts, setPurchaseCosts] = useState("");
  const [saleCosts, setSaleCosts] = useState("");
  const [ownershipYears, setOwnershipYears] = useState("");
  const [taxableIncome, setTaxableIncome] = useState("");
  const [propertyType, setPropertyType] = useState("investment");
  const [result, setResult] = useState<any>(null);

  const calculateCGT = () => {
    const purchase = parseFloat(purchasePrice || "0");
    const sale = parseFloat(salePrice || "0");
    const buyCosts = parseFloat(purchaseCosts || "0");
    const sellCosts = parseFloat(saleCosts || "0");
    const years = parseFloat(ownershipYears || "0");
    const income = parseFloat(taxableIncome || "0");

    // Calculate capital gain
    const costBase = purchase + buyCosts;
    const capitalProceeds = sale - sellCosts;
    const capitalGain = capitalProceeds - costBase;

    // CGT discount (50% if held > 12 months)
    const cgtDiscount = years >= 1 ? 0.5 : 0;
    const discountedGain = capitalGain * (1 - cgtDiscount);

    // Main residence exemption
    const isMainResidence = propertyType === "owner-occupied";
    const taxableGain = isMainResidence ? 0 : discountedGain;

    // Calculate tax based on marginal rate
    let marginalRate = 0;
    if (income <= 18200) marginalRate = 0;
    else if (income <= 45000) marginalRate = 0.19;
    else if (income <= 120000) marginalRate = 0.325;
    else if (income <= 180000) marginalRate = 0.37;
    else marginalRate = 0.45;

    const cgtPayable = taxableGain * marginalRate;
    const netProfit = capitalGain - cgtPayable;

    setResult({
      capitalGain,
      cgtDiscount: cgtDiscount * 100,
      discountedGain,
      taxableGain,
      marginalRate: marginalRate * 100,
      cgtPayable,
      netProfit,
      costBase,
      capitalProceeds,
      isMainResidence,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Percent className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Capital Gains Tax Calculator
          </h1>
          <p className="text-lg opacity-95">
            Estimate CGT on property sales
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
                  Property Sale Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment">Investment Property</SelectItem>
                      <SelectItem value="owner-occupied">Main Residence (PPR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="purchasePrice">Original Purchase Price ($)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="450000"
                  />
                </div>

                <div>
                  <Label htmlFor="salePrice">Sale Price ($)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="650000"
                  />
                </div>

                <div>
                  <Label htmlFor="purchaseCosts">Purchase Costs ($)</Label>
                  <Input
                    id="purchaseCosts"
                    type="number"
                    value={purchaseCosts}
                    onChange={(e) => setPurchaseCosts(e.target.value)}
                    placeholder="25000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Stamp duty, legal fees, inspections
                  </p>
                </div>

                <div>
                  <Label htmlFor="saleCosts">Sale Costs ($)</Label>
                  <Input
                    id="saleCosts"
                    type="number"
                    value={saleCosts}
                    onChange={(e) => setSaleCosts(e.target.value)}
                    placeholder="15000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Agent fees, legal fees, marketing
                  </p>
                </div>

                <div>
                  <Label htmlFor="ownershipYears">Years Owned</Label>
                  <Input
                    id="ownershipYears"
                    type="number"
                    step="0.1"
                    value={ownershipYears}
                    onChange={(e) => setOwnershipYears(e.target.value)}
                    placeholder="5"
                  />
                </div>

                <div>
                  <Label htmlFor="taxableIncome">Annual Taxable Income ($)</Label>
                  <Input
                    id="taxableIncome"
                    type="number"
                    value={taxableIncome}
                    onChange={(e) => setTaxableIncome(e.target.value)}
                    placeholder="90000"
                  />
                </div>

                <Button onClick={calculateCGT} className="w-full">
                  Calculate CGT
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {result.isMainResidence ? "Main Residence Exemption" : "CGT Calculation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.isMainResidence ? (
                    <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg text-center">
                      <p className="text-green-700 dark:text-green-400 text-lg font-semibold mb-2">
                        ✓ No CGT Payable
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your main residence (Principal Place of Residence) is exempt from Capital Gains Tax in Australia.
                      </p>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-1">Capital Gain</p>
                        <p className="text-3xl font-bold text-green-600">
                          ${result.capitalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Tax-free profit</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Cost Base</span>
                          <span className="font-semibold">${result.costBase.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Capital Proceeds</span>
                          <span className="font-semibold">${result.capitalProceeds.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Capital Gain</span>
                          <span className="font-semibold text-green-600">${result.capitalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        {result.cgtDiscount > 0 && (
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">CGT Discount ({result.cgtDiscount}%)</span>
                            <span className="font-semibold text-green-600">
                              -${(result.capitalGain - result.discountedGain).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Taxable Gain</span>
                          <span className="font-semibold">${result.taxableGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Marginal Tax Rate</span>
                          <span className="font-semibold">{result.marginalRate.toFixed(0)}%</span>
                        </div>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">CGT Payable</p>
                        <p className="text-3xl font-bold text-orange-600">
                          ${result.cgtPayable.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>

                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Net Profit After Tax</p>
                        <p className="text-3xl font-bold text-primary">
                          ${result.netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>

                      {result.cgtDiscount > 0 && (
                        <div className="text-sm text-green-600 dark:text-green-400">
                          ✓ You saved ${(result.capitalGain - result.discountedGain).toLocaleString(undefined, { maximumFractionDigits: 0 })} with the 50% CGT discount
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Understanding Capital Gains Tax</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">CGT Basics</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Cost Base:</strong> Purchase price + costs (stamp duty, legal, improvements)</li>
                    <li><strong>Capital Proceeds:</strong> Sale price - selling costs</li>
                    <li><strong>Capital Gain:</strong> Proceeds - Cost Base</li>
                    <li><strong>50% Discount:</strong> If held for 12+ months</li>
                    <li><strong>Main Residence:</strong> Fully exempt if your home</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tax Rates (2024-25)</h3>
                  <ul className="space-y-2 text-sm">
                    <li>$0 - $18,200: 0%</li>
                    <li>$18,201 - $45,000: 19%</li>
                    <li>$45,001 - $120,000: 32.5%</li>
                    <li>$120,001 - $180,000: 37%</li>
                    <li>$180,001+: 45%</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Plus Medicare Levy (2%)
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Strategies to Reduce CGT</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Hold property for 12+ months to get 50% discount</li>
                  <li>• Use main residence exemption if possible</li>
                  <li>• Time the sale in a lower income year</li>
                  <li>• Keep records of all improvements to increase cost base</li>
                  <li>• Consider partial exemptions for part main residence use</li>
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
                This calculator provides estimates only and should not be used for tax planning. Actual CGT calculations 
                can be complex and depend on many factors including partial exemptions, property improvements, and changes in usage.
              </p>
              <p>
                Always consult with a qualified tax advisor or accountant for accurate CGT advice. For property finance advice, 
                please <Link to="/" className="text-primary hover:underline">contact our mortgage brokers</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CapitalGainsCalculator;
