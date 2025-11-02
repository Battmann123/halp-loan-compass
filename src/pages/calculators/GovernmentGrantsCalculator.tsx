import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Gift, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const GovernmentGrantsCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(650000);
  const [state, setState] = useState("nsw");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState(true);
  const [newProperty, setNewProperty] = useState(true);
  const [deposit, setDeposit] = useState(50000);

  const calculateGrants = () => {
    let fhog = 0;
    let depositScheme = false;
    let stampDutyExemption = 0;
    let totalGrants = 0;

    // NSW Example
    if (state === "nsw") {
      // First Home Owner Grant - new homes only
      if (firstHomeBuyer && newProperty && propertyValue <= 800000) {
        fhog = 10000;
      }

      // Stamp Duty exemption for new homes
      if (firstHomeBuyer && newProperty && propertyValue <= 800000) {
        // Simplified calculation
        stampDutyExemption = propertyValue * 0.04; // Approximate
      }

      // 5% Deposit Scheme eligibility
      const depositPercentage = (deposit / propertyValue) * 100;
      if (firstHomeBuyer && depositPercentage >= 5 && depositPercentage < 20 && propertyValue <= 800000) {
        depositScheme = true;
      }
    }

    // Victoria
    if (state === "vic") {
      if (firstHomeBuyer && newProperty && propertyValue <= 750000) {
        fhog = 10000;
      }
      if (firstHomeBuyer && propertyValue <= 600000) {
        stampDutyExemption = propertyValue * 0.055;
      }
    }

    // Queensland
    if (state === "qld") {
      if (firstHomeBuyer && newProperty && propertyValue <= 750000) {
        fhog = 30000; // QLD has higher grant
      }
      if (firstHomeBuyer && propertyValue <= 500000) {
        stampDutyExemption = propertyValue * 0.035;
      }
    }

    totalGrants = fhog + stampDutyExemption;

    return {
      fhog,
      stampDutyExemption: Math.round(stampDutyExemption),
      depositScheme,
      totalGrants: Math.round(totalGrants),
      depositPercentage: ((deposit / propertyValue) * 100).toFixed(1),
    };
  };

  const results = calculateGrants();

  const getStateGrantDetails = () => {
    const details = {
      nsw: {
        fhog: 10000,
        limit: 800000,
        stampLimit: 800000,
        depositScheme: 800000,
      },
      vic: {
        fhog: 10000,
        limit: 750000,
        stampLimit: 600000,
        depositScheme: 800000,
      },
      qld: {
        fhog: 30000,
        limit: 750000,
        stampLimit: 500000,
        depositScheme: 800000,
      },
      sa: {
        fhog: 15000,
        limit: 650000,
        stampLimit: 650000,
        depositScheme: 800000,
      },
      wa: {
        fhog: 10000,
        limit: 750000,
        stampLimit: 430000,
        depositScheme: 800000,
      },
      tas: {
        fhog: 20000,
        limit: 750000,
        stampLimit: 600000,
        depositScheme: 800000,
      },
      nt: {
        fhog: 10000,
        limit: 650000,
        stampLimit: 650000,
        depositScheme: 800000,
      },
      act: {
        fhog: 0,
        limit: 0,
        stampLimit: 0,
        depositScheme: 800000,
      },
    };
    return details[state as keyof typeof details];
  };

  const stateDetails = getStateGrantDetails();

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
            <Gift className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Government Grants Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Calculate available grants and benefits including the 5% deposit scheme
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="propertyValue">Property Purchase Price</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="deposit">Your Deposit Amount</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="deposit"
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Deposit percentage: {results.depositPercentage}%
                </p>
              </div>

              <div>
                <Label htmlFor="state">State/Territory</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nsw">New South Wales</SelectItem>
                    <SelectItem value="vic">Victoria</SelectItem>
                    <SelectItem value="qld">Queensland</SelectItem>
                    <SelectItem value="sa">South Australia</SelectItem>
                    <SelectItem value="wa">Western Australia</SelectItem>
                    <SelectItem value="tas">Tasmania</SelectItem>
                    <SelectItem value="nt">Northern Territory</SelectItem>
                    <SelectItem value="act">Australian Capital Territory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="firstHomeBuyer" 
                    checked={firstHomeBuyer}
                    onCheckedChange={(checked) => setFirstHomeBuyer(checked as boolean)}
                  />
                  <Label htmlFor="firstHomeBuyer" className="cursor-pointer">
                    I am a First Home Buyer
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newProperty" 
                    checked={newProperty}
                    onCheckedChange={(checked) => setNewProperty(checked as boolean)}
                  />
                  <Label htmlFor="newProperty" className="cursor-pointer">
                    Purchasing a New Property
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Your Potential Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
                <p className="text-sm opacity-90 mb-2">Total Grants & Savings</p>
                <p className="text-4xl font-bold">${results.totalGrants.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                {results.fhog > 0 && (
                  <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">First Home Owner Grant</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">${results.fhog.toLocaleString()}</p>
                  </div>
                )}

                {results.stampDutyExemption > 0 && (
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Stamp Duty Exemption</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">${results.stampDutyExemption.toLocaleString()}</p>
                  </div>
                )}

                {results.depositScheme && (
                  <div className="bg-white p-4 rounded-lg border-2 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="font-semibold">5% Deposit Scheme Eligible</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You may be eligible for the First Home Guarantee scheme, allowing you to purchase 
                      with as little as 5% deposit without paying LMI.
                    </p>
                  </div>
                )}

                {!firstHomeBuyer && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      ℹ️ These grants are generally only available to first home buyers. 
                      Select "First Home Buyer" to see available benefits.
                    </p>
                  </div>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                Apply for Pre-Approval
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 5% Deposit Scheme Details */}
        <Card className="mt-8 border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Australian Government 5% Deposit Scheme (Home Guarantee Scheme)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The Home Guarantee Scheme (formerly First Home Loan Deposit Scheme) helps eligible first home 
              buyers purchase a home with as little as 5% deposit, without paying Lenders Mortgage Insurance (LMI).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Eligibility Requirements
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                  <li>• Must be an Australian citizen (18+ years)</li>
                  <li>• First home buyer (never owned property)</li>
                  <li>• Minimum 5% genuine savings deposit</li>
                  <li>• Property value under $800,000 (most states)</li>
                  <li>• Must move in within 12 months</li>
                  <li>• Income limits may apply</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Key Benefits
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                  <li>• Purchase with just 5% deposit</li>
                  <li>• No Lenders Mortgage Insurance (save $20,000-$30,000)</li>
                  <li>• Government guarantee up to 15% of property value</li>
                  <li>• Available for new and existing properties</li>
                  <li>• 50,000 places available annually</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-3">Property Price Caps by Location</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Sydney</p>
                  <p className="font-semibold">$900,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Melbourne</p>
                  <p className="font-semibold">$800,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Brisbane</p>
                  <p className="font-semibold">$700,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Adelaide</p>
                  <p className="font-semibold">$600,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Perth</p>
                  <p className="font-semibold">$600,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hobart</p>
                  <p className="font-semibold">$600,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Canberra</p>
                  <p className="font-semibold">$800,000</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Regional</p>
                  <p className="font-semibold">$500,000+</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* State Grants Comparison */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>State-by-State Government Grants (2024-25)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-semibold">State</th>
                    <th className="text-right py-3 font-semibold">FHOG Amount</th>
                    <th className="text-right py-3 font-semibold">Price Limit</th>
                    <th className="text-right py-3 font-semibold">Property Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3">NSW</td>
                    <td className="text-right py-3">$10,000</td>
                    <td className="text-right py-3">$800,000</td>
                    <td className="text-right py-3">New only</td>
                  </tr>
                  <tr>
                    <td className="py-3">VIC</td>
                    <td className="text-right py-3">$10,000</td>
                    <td className="text-right py-3">$750,000</td>
                    <td className="text-right py-3">New only</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="py-3">QLD</td>
                    <td className="text-right py-3 font-semibold text-primary">$30,000</td>
                    <td className="text-right py-3">$750,000</td>
                    <td className="text-right py-3">New only</td>
                  </tr>
                  <tr>
                    <td className="py-3">SA</td>
                    <td className="text-right py-3">$15,000</td>
                    <td className="text-right py-3">$650,000</td>
                    <td className="text-right py-3">New only</td>
                  </tr>
                  <tr>
                    <td className="py-3">WA</td>
                    <td className="text-right py-3">$10,000</td>
                    <td className="text-right py-3">$750,000</td>
                    <td className="text-right py-3">New only</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="py-3">TAS</td>
                    <td className="text-right py-3 font-semibold text-primary">$20,000</td>
                    <td className="text-right py-3">$750,000</td>
                    <td className="text-right py-3">New only</td>
                  </tr>
                  <tr>
                    <td className="py-3">NT</td>
                    <td className="text-right py-3">$10,000</td>
                    <td className="text-right py-3">$650,000</td>
                    <td className="text-right py-3">New/existing</td>
                  </tr>
                  <tr>
                    <td className="py-3">ACT</td>
                    <td className="text-right py-3">N/A</td>
                    <td className="text-right py-3">N/A</td>
                    <td className="text-right py-3">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              * Rates current as of 2024-25. Additional regional grants and schemes may be available. 
              Queensland and Tasmania offer the highest First Home Owner Grants in Australia.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Important Disclaimer:</strong> Government grants and schemes are subject to eligibility 
              criteria, application processes, and may change without notice. The Home Guarantee Scheme has 
              limited places available each financial year (50,000 nationally). Grant amounts, property price 
              caps, and eligibility requirements vary by state and are updated regularly. This calculator 
              provides estimates only and does not guarantee grant approval. You must meet all eligibility 
              criteria and apply through appropriate channels. Please contact a licensed mortgage broker 
              through HALP for current information and assistance with grant applications.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default GovernmentGrantsCalculator;
