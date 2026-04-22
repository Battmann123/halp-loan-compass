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
import { calculateStampDuty, type AusState, type PropertyCategory } from "@/lib/calculations";

const StampDutyCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("650000");
  const [state, setState] = useState("nsw");
  const [firstHomeBuyer, setFirstHomeBuyer] = useState(true);
  const [propertyType, setPropertyType] = useState<"primary" | "investment">("primary");
  const [foreignPurchaser, setForeignPurchaser] = useState(false);
  const [propertyCategory, setPropertyCategory] = useState<"new" | "established" | "vacant">("established");

  const result = calculateStampDuty({
    value: Number(propertyValue) || 0,
    state: state.toUpperCase() as AusState,
    isFirstHomeBuyer: firstHomeBuyer,
    occupancy: propertyType === "primary" ? "owner-occupier" : "investor",
    category: propertyCategory as PropertyCategory,
    foreignPurchaser,
  });

  const results = {
    stampDuty: result.duty,
    concession: result.concession,
    foreignPurchaserSurcharge: result.foreignSurcharge,
    mortgageRegistrationFee: result.mortgageRegistrationFee,
    transferFee: result.transferFee,
    totalFees: result.total,
  };

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
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="pl-7"
                    placeholder="0"
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

              <div>
                <Label>First Home Buyer</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="firstHomeBuyerYes"
                      checked={firstHomeBuyer === true}
                      onChange={() => setFirstHomeBuyer(true)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="firstHomeBuyerYes" className="cursor-pointer font-normal">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="firstHomeBuyerNo"
                      checked={firstHomeBuyer === false}
                      onChange={() => setFirstHomeBuyer(false)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="firstHomeBuyerNo" className="cursor-pointer font-normal">
                      No
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select value={propertyType} onValueChange={(value: "primary" | "investment") => setPropertyType(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Residence</SelectItem>
                    <SelectItem value="investment">Investment Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="propertyCategory">Property Category</Label>
                <Select value={propertyCategory} onValueChange={(value: "new" | "established" | "vacant") => setPropertyCategory(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Home</SelectItem>
                    <SelectItem value="established">Established Home</SelectItem>
                    <SelectItem value="vacant">Vacant Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Foreign Purchaser</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="foreignPurchaserYes"
                      checked={foreignPurchaser === true}
                      onChange={() => setForeignPurchaser(true)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="foreignPurchaserYes" className="cursor-pointer font-normal">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="foreignPurchaserNo"
                      checked={foreignPurchaser === false}
                      onChange={() => setForeignPurchaser(false)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="foreignPurchaserNo" className="cursor-pointer font-normal">
                      No
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Fee Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.concession > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                    🎉 First Home Buyer Concession Applied!
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Saving: ${results.concession.toLocaleString()}
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
                <p className="text-sm opacity-90 mb-2">Total Government Fees</p>
                <p className="text-4xl font-bold">${results.totalFees.toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Mortgage Registration Fee</span>
                  <span className="font-semibold">${results.mortgageRegistrationFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Transfer Fee</span>
                  <span className="font-semibold">${results.transferFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Stamp Duty</span>
                  <span className="font-semibold">${results.stampDuty.toLocaleString()}</span>
                </div>

                {results.foreignPurchaserSurcharge > 0 && (
                  <div className="flex justify-between items-center py-3 border-b bg-orange-50 dark:bg-orange-900/20 -mx-4 px-4">
                    <span className="text-orange-600 dark:text-orange-400 font-medium">Foreign Purchaser Surcharge</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      ${results.foreignPurchaserSurcharge.toLocaleString()}
                    </span>
                  </div>
                )}

                {results.concession > 0 && (
                  <div className="flex justify-between items-center py-3 border-b bg-green-50 dark:bg-green-900/20 -mx-4 px-4">
                    <span className="text-green-600 dark:text-green-400 font-medium">Concession Savings</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      -${results.concession.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 pt-4 border-t-2">
                  <span className="font-bold">Total Government Fees</span>
                  <span className="font-bold text-lg">${results.totalFees.toLocaleString()}</span>
                </div>
              </div>
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

        {/* Official Sources */}
        <Card className="mt-8 border-2 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📚</span> Official Government Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All calculations are based on official government rates and regulations:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">New South Wales</h3>
                <a 
                  href="https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  NSW Revenue - Transfer Duty
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Victoria</h3>
                <a 
                  href="https://www.sro.vic.gov.au/duty" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  State Revenue Office Victoria
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Queensland</h3>
                <a 
                  href="https://www.qld.gov.au/housing/buying-owning-home/advice-buying-home/transfer-duty" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  Queensland Government - Transfer Duty
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">South Australia</h3>
                <a 
                  href="https://www.revenuesa.sa.gov.au/taxes-and-duties/stamp-duty/stamp-duty-on-conveyances" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  RevenueSA - Stamp Duty on Conveyances
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Western Australia</h3>
                <a 
                  href="https://www.wa.gov.au/service/financial-services/taxation/transfer-duty-property" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  WA Government - Transfer Duty
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Tasmania</h3>
                <a 
                  href="https://www.sro.tas.gov.au/property-taxes/duty/property-conveyance-duty" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  State Revenue Office Tasmania
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Northern Territory</h3>
                <a 
                  href="https://territorystories.nt.gov.au/10070/990618/0/151" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  NT Territory Revenue Office
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Australian Capital Territory</h3>
                <a 
                  href="https://www.revenue.act.gov.au/duties" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline block"
                >
                  ACT Revenue Office - Duties
                </a>
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
