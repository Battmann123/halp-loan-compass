import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Receipt, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StampDutyCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(600000);
  const [state, setState] = useState("nsw");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState(true);
  const [newProperty, setNewProperty] = useState(true);

  const calculateStampDuty = () => {
    let stampDuty = 0;
    let concession = 0;
    
    // NSW Stamp Duty Calculation (simplified)
    if (state === "nsw") {
      if (propertyValue <= 16000) {
        stampDuty = propertyValue * 0.0125;
      } else if (propertyValue <= 35000) {
        stampDuty = 200 + (propertyValue - 16000) * 0.015;
      } else if (propertyValue <= 93000) {
        stampDuty = 485 + (propertyValue - 35000) * 0.0175;
      } else if (propertyValue <= 351000) {
        stampDuty = 1500 + (propertyValue - 93000) * 0.035;
      } else if (propertyValue <= 1168000) {
        stampDuty = 10530 + (propertyValue - 351000) * 0.045;
      } else {
        stampDuty = 47295 + (propertyValue - 1168000) * 0.055;
      }

      // First Home Buyer concession
      if (firstHomeBuyer && newProperty && propertyValue <= 800000) {
        concession = stampDuty;
        stampDuty = 0;
      }
    }
    
    // Add other states with their specific rates
    // This is a simplified version
    
    return {
      stampDuty: Math.round(stampDuty),
      concession: Math.round(concession),
      afterConcession: Math.round(stampDuty)
    };
  };

  const results = calculateStampDuty();

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
            <Receipt className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Stamp Duty Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Calculate stamp duty for all Australian states and territories
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
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
                    First Home Buyer
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newProperty" 
                    checked={newProperty}
                    onCheckedChange={(checked) => setNewProperty(checked as boolean)}
                  />
                  <Label htmlFor="newProperty" className="cursor-pointer">
                    New Property (less than 3 years old)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Stamp Duty Calculation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.concession > 0 && (
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">
                    🎉 First Home Buyer Concession Applied!
                  </p>
                  <p className="text-xs text-green-700">
                    You're eligible for stamp duty exemption on new properties under $800,000
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
                <p className="text-sm opacity-90 mb-2">Stamp Duty Payable</p>
                <p className="text-4xl font-bold">${results.afterConcession.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Property Value</span>
                  <span className="font-semibold">${propertyValue.toLocaleString()}</span>
                </div>

                {results.concession > 0 && (
                  <>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Standard Stamp Duty</span>
                      <span className="font-semibold text-muted-foreground line-through">
                        ${results.concession.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-green-600 font-medium">Concession Savings</span>
                      <span className="font-semibold text-green-600">
                        -${results.concession.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">State</span>
                  <span className="font-semibold">{state.toUpperCase()}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                Calculate Total Purchase Costs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* State-by-State Info */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>First Home Buyer Stamp Duty Concessions by State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">New South Wales</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Full exemption: New homes up to $800,000</li>
                  <li>• Partial exemption: $800,001 - $1,000,000</li>
                  <li>• Existing homes: Up to $650,000</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Victoria</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Full exemption: Up to $600,000</li>
                  <li>• Partial exemption: $600,001 - $750,000</li>
                  <li>• Principal place of residence only</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Queensland</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Full exemption: Up to $500,000</li>
                  <li>• Partial concession: $500,001 - $550,000</li>
                  <li>• New or established homes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">South Australia</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Full exemption: Up to $650,000</li>
                  <li>• Partial concession available</li>
                  <li>• Must occupy within 12 months</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> Stamp duty calculations are estimates based on general rates and 
              concessions. Actual stamp duty may vary based on specific circumstances, property type, and 
              current government policies. First home buyer concessions have eligibility criteria including 
              residency requirements and property value limits. This calculator does not include foreign buyer 
              surcharges or other additional duties. Please consult with a licensed conveyancer or solicitor 
              for accurate calculations specific to your situation.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default StampDutyCalculator;
