import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const DepreciationCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [propertyType, setPropertyType] = useState("house");
  const [fitoutValue, setFitoutValue] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateDepreciation = () => {
    const value = parseFloat(propertyValue || "0");
    const age = parseFloat(buildingAge || "0");
    const fitout = parseFloat(fitoutValue || "0");

    // Building Value (40-60% of property value depending on type)
    const buildingPercent = propertyType === "apartment" ? 0.6 : 0.5;
    const buildingValue = value * buildingPercent;
    const landValue = value - buildingValue;

    // Capital Works Deduction (Division 43) - 2.5% per year for 40 years
    // Only available for properties built after Sept 1987
    const eligibleForCapitalWorks = age < 40;
    const capitalWorksRate = 0.025;
    const capitalWorksDeduction = eligibleForCapitalWorks ? buildingValue * capitalWorksRate : 0;

    // Plant & Equipment (Division 40) - varies by item age
    // Estimate based on fitout value or 10% of building value
    const plantEquipmentValue = fitout > 0 ? fitout : buildingValue * 0.1;
    
    // Average depreciation rate for plant & equipment (typically 5-20 years)
    // New property: ~15% first year, declining
    // Older property: much less or zero
    let plantEquipmentRate = 0;
    if (age <= 1) plantEquipmentRate = 0.15;
    else if (age <= 5) plantEquipmentRate = 0.10;
    else if (age <= 10) plantEquipmentRate = 0.05;
    else plantEquipmentRate = 0;

    const plantEquipmentDeduction = plantEquipmentValue * plantEquipmentRate;

    // Total first year depreciation
    const totalFirstYear = capitalWorksDeduction + plantEquipmentDeduction;

    // 10 year projection
    const tenYearTotal = (capitalWorksDeduction * 10) + 
                         (plantEquipmentDeduction * 5); // P&E declines faster

    // Tax benefit (assuming 37% marginal rate)
    const taxRate = 0.37;
    const firstYearTaxBenefit = totalFirstYear * taxRate;
    const tenYearTaxBenefit = tenYearTotal * taxRate;

    setResult({
      buildingValue,
      landValue,
      eligibleForCapitalWorks,
      capitalWorksDeduction,
      plantEquipmentValue,
      plantEquipmentDeduction,
      totalFirstYear,
      tenYearTotal,
      firstYearTaxBenefit,
      tenYearTaxBenefit,
      propertyAge: age,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Calendar className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Property Depreciation Calculator
          </h1>
          <p className="text-lg opacity-95">
            Calculate tax deductions for investment properties
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
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment/Unit</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="buildingAge">Building Age (years)</Label>
                  <Input
                    id="buildingAge"
                    type="number"
                    value={buildingAge}
                    onChange={(e) => setBuildingAge(e.target.value)}
                    placeholder="2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    0 for brand new, or years since construction
                  </p>
                </div>

                <div>
                  <Label htmlFor="fitoutValue">Fitout/Renovations Value ($)</Label>
                  <Input
                    id="fitoutValue"
                    type="number"
                    value={fitoutValue}
                    onChange={(e) => setFitoutValue(e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave blank if unknown - we'll estimate
                  </p>
                </div>

                <Button onClick={calculateDepreciation} className="w-full">
                  Calculate Depreciation
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Depreciation Deductions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Building Value</p>
                      <p className="text-xl font-bold">
                        ${result.buildingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Land Value</p>
                      <p className="text-xl font-bold">
                        ${result.landValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Capital Works (Div 43)</span>
                      <span className="font-semibold">
                        ${result.capitalWorksDeduction.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                      </span>
                    </div>
                    {!result.eligibleForCapitalWorks && (
                      <p className="text-xs text-orange-600">
                        ⚠ Building may be too old for capital works deductions (pre-1987)
                      </p>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Plant & Equipment (Div 40)</span>
                      <span className="font-semibold">
                        ${result.plantEquipmentDeduction.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                      </span>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">First Year Deduction</p>
                    <p className="text-3xl font-bold text-primary">
                      ${result.totalFirstYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">First Year Tax Saving (37%)</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${result.firstYearTaxBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">10 Year Total Deductions</span>
                      <span className="font-semibold">
                        ${result.tenYearTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">10 Year Tax Savings</span>
                      <span className="font-semibold text-green-600">
                        ${result.tenYearTaxBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  {result.propertyAge > 10 && (
                    <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded text-sm">
                      <p className="text-orange-700 dark:text-orange-400">
                        ⚠ Older properties have limited depreciation benefits. Consider a professional 
                        depreciation schedule for accurate deductions.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Understanding Property Depreciation</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Division 43 - Capital Works</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Rate:</strong> 2.5% per year for 40 years</li>
                    <li><strong>What:</strong> Building structure and fixed items</li>
                    <li><strong>Eligibility:</strong> Properties built after Sept 1987</li>
                    <li><strong>Includes:</strong> Walls, roof, floors, built-in wardrobes</li>
                    <li><strong>Note:</strong> Cannot depreciate land value</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Division 40 - Plant & Equipment</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Rate:</strong> 5-20% depending on item age</li>
                    <li><strong>What:</strong> Removable items and fixtures</li>
                    <li><strong>Includes:</strong> Appliances, carpets, blinds, hot water</li>
                    <li><strong>Best for:</strong> New or recently renovated properties</li>
                    <li><strong>Note:</strong> Higher deductions in early years</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Maximize Your Deductions</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Get a professional Quantity Surveyor report (typically $600-$900)</li>
                  <li>• New properties have the highest depreciation benefits</li>
                  <li>• Keep renovation receipts - they can extend depreciation claims</li>
                  <li>• Depreciation starts from settlement date, not purchase date</li>
                  <li>• Can backdate claims for up to 2 previous financial years</li>
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
                This calculator provides estimates only. Actual depreciation deductions require a professional 
                Quantity Surveyor's report. Tax benefits depend on your individual marginal tax rate and circumstances.
              </p>
              <p>
                Always consult with a qualified tax advisor or accountant. For investment property finance advice, 
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

export default DepreciationCalculator;
