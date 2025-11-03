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
  const [propertyType, setPropertyType] = useState<"primary" | "investment">("primary");
  const [foreignPurchaser, setForeignPurchaser] = useState(false);
  const [propertyCategory, setPropertyCategory] = useState<"new" | "established" | "vacant">("established");

  const calculateFees = () => {
    let stampDuty = 0;
    let concession = 0;
    let mortgageRegistrationFee = 0;
    let transferFee = 0;
    let foreignPurchaserSurcharge = 0;
    
    // Calculate stamp duty based on state
    switch (state) {
      case "nsw":
        // NSW Stamp Duty (Effective 1 July 2025)
        if (propertyValue <= 17000) {
          stampDuty = Math.max(20, propertyValue * 0.0125);
        } else if (propertyValue <= 37000) {
          stampDuty = 212 + (propertyValue - 17000) * 0.015;
        } else if (propertyValue <= 99000) {
          stampDuty = 512 + (propertyValue - 37000) * 0.0175;
        } else if (propertyValue <= 372000) {
          stampDuty = 1597 + (propertyValue - 99000) * 0.035;
        } else if (propertyValue <= 1240000) {
          stampDuty = 11152 + (propertyValue - 372000) * 0.045;
        } else {
          stampDuty = 50212 + (propertyValue - 1240000) * 0.055;
        }
        // First Home Buyer concession NSW (rules from 1 July 2023)
        if (firstHomeBuyer && propertyType === "primary") {
          if (propertyCategory === "vacant") {
            // Vacant land: Full exemption up to $350k
            if (propertyValue <= 350000) {
              concession = stampDuty;
              stampDuty = 0;
            } else if (propertyValue <= 450000) {
              // Concessional rate between $350k-$450k for vacant land
              const concessionAmount = (propertyValue - 350000);
              stampDuty = concessionAmount * 0.002293;
              concession = 0;
            }
          } else {
            // New AND Existing homes: Full exemption up to $800k (as of 1 July 2023)
            if (propertyValue <= 800000) {
              concession = stampDuty;
              stampDuty = 0;
            } else if (propertyValue <= 1000000) {
              // Concessional rate between $800k-$1M
              const concessionAmount = (propertyValue - 800000);
              stampDuty = concessionAmount * 0.002293;
              concession = 0;
            }
          }
        }
        // Foreign purchaser surcharge NSW (8% additional)
        if (foreignPurchaser) {
          foreignPurchaserSurcharge = propertyValue * 0.08;
        }
        mortgageRegistrationFee = 157;
        transferFee = 143;
        break;

      case "vic":
        // Victoria Stamp Duty
        if (propertyValue <= 25000) {
          stampDuty = propertyValue * 0.014;
        } else if (propertyValue <= 130000) {
          stampDuty = 350 + (propertyValue - 25000) * 0.024;
        } else if (propertyValue <= 960000) {
          stampDuty = 2870 + (propertyValue - 130000) * 0.06;
        } else {
          stampDuty = 52670 + (propertyValue - 960000) * 0.055;
        }
        // First Home Buyer concession VIC
        if (firstHomeBuyer && propertyType === "primary") {
          if (propertyValue <= 600000) {
            concession = stampDuty;
            stampDuty = 0;
          } else if (propertyValue <= 750000) {
            const fullDuty = stampDuty;
            concession = fullDuty * ((750000 - propertyValue) / 150000);
            stampDuty = fullDuty - concession;
          }
        }
        // Foreign purchaser surcharge VIC (8% additional)
        if (foreignPurchaser) {
          foreignPurchaserSurcharge = propertyValue * 0.08;
        }
        mortgageRegistrationFee = 122.90;
        transferFee = 1974;
        break;

      case "qld":
        // Queensland Stamp Duty
        if (propertyValue <= 5000) {
          stampDuty = 0;
        } else if (propertyValue <= 75000) {
          stampDuty = (propertyValue - 5000) * 0.015;
        } else if (propertyValue <= 540000) {
          stampDuty = 1050 + (propertyValue - 75000) * 0.035;
        } else if (propertyValue <= 1000000) {
          stampDuty = 17325 + (propertyValue - 540000) * 0.045;
        } else {
          stampDuty = 38025 + (propertyValue - 1000000) * 0.0575;
        }
        // First Home Buyer concession QLD
        if (firstHomeBuyer && propertyType === "primary") {
          if (propertyValue <= 500000) {
            concession = stampDuty;
            stampDuty = 0;
          } else if (propertyValue <= 550000) {
            const fullDuty = stampDuty;
            concession = fullDuty * ((550000 - propertyValue) / 50000);
            stampDuty = fullDuty - concession;
          }
        }
        // Foreign purchaser surcharge QLD (7% additional)
        if (foreignPurchaser) {
          foreignPurchaserSurcharge = propertyValue * 0.07;
        }
        mortgageRegistrationFee = 198.60;
        transferFee = propertyValue <= 180000 ? 207.45 : 9064.50;
        break;

      case "sa":
        // South Australia Stamp Duty
        if (propertyValue <= 12000) {
          stampDuty = propertyValue * 0.01;
        } else if (propertyValue <= 30000) {
          stampDuty = 120 + (propertyValue - 12000) * 0.02;
        } else if (propertyValue <= 50000) {
          stampDuty = 480 + (propertyValue - 30000) * 0.03;
        } else if (propertyValue <= 100000) {
          stampDuty = 1080 + (propertyValue - 50000) * 0.035;
        } else if (propertyValue <= 200000) {
          stampDuty = 2830 + (propertyValue - 100000) * 0.04;
        } else if (propertyValue <= 250000) {
          stampDuty = 6830 + (propertyValue - 200000) * 0.0425;
        } else if (propertyValue <= 300000) {
          stampDuty = 8955 + (propertyValue - 250000) * 0.045;
        } else if (propertyValue <= 500000) {
          stampDuty = 11205 + (propertyValue - 300000) * 0.0475;
        } else {
          stampDuty = 20705 + (propertyValue - 500000) * 0.055;
        }
        // First Home Buyer concession SA
        if (firstHomeBuyer && propertyType === "primary" && propertyValue <= 650000) {
          concession = stampDuty;
          stampDuty = 0;
        }
        // Foreign purchaser surcharge SA (7% additional)
        if (foreignPurchaser) {
          foreignPurchaserSurcharge = propertyValue * 0.07;
        }
        mortgageRegistrationFee = 183;
        transferFee = 225;
        break;

      case "wa":
        // Western Australia Stamp Duty
        if (propertyValue <= 120000) {
          stampDuty = propertyValue * 0.019;
        } else if (propertyValue <= 150000) {
          stampDuty = 2280 + (propertyValue - 120000) * 0.029;
        } else if (propertyValue <= 360000) {
          stampDuty = 3150 + (propertyValue - 150000) * 0.038;
        } else if (propertyValue <= 725000) {
          stampDuty = 11130 + (propertyValue - 360000) * 0.049;
        } else {
          stampDuty = 29015 + (propertyValue - 725000) * 0.051;
        }
        // First Home Buyer concession WA
        if (firstHomeBuyer && propertyType === "primary") {
          if (propertyValue <= 430000) {
            concession = stampDuty;
            stampDuty = 0;
          } else if (propertyValue <= 530000) {
            const fullDuty = stampDuty;
            concession = fullDuty * ((530000 - propertyValue) / 100000);
            stampDuty = fullDuty - concession;
          }
        }
        // Foreign purchaser surcharge WA (7% additional)
        if (foreignPurchaser) {
          foreignPurchaserSurcharge = propertyValue * 0.07;
        }
        mortgageRegistrationFee = 192.50;
        transferFee = 205.30;
        break;

      case "tas":
        // Tasmania Stamp Duty
        if (propertyValue <= 3000) {
          stampDuty = 50;
        } else if (propertyValue <= 25000) {
          stampDuty = 50 + (propertyValue - 3000) * 0.0175;
        } else if (propertyValue <= 75000) {
          stampDuty = 435 + (propertyValue - 25000) * 0.022;
        } else if (propertyValue <= 200000) {
          stampDuty = 1535 + (propertyValue - 75000) * 0.035;
        } else if (propertyValue <= 375000) {
          stampDuty = 5910 + (propertyValue - 200000) * 0.04;
        } else if (propertyValue <= 725000) {
          stampDuty = 12910 + (propertyValue - 375000) * 0.0425;
        } else {
          stampDuty = 27785 + (propertyValue - 725000) * 0.045;
        }
        // First Home Buyer concession TAS
        if (firstHomeBuyer && propertyType === "primary" && propertyValue <= 600000) {
          const reduction = Math.min(stampDuty, 8640);
          concession = reduction;
          stampDuty = Math.max(0, stampDuty - reduction);
        }
        mortgageRegistrationFee = 158.20;
        transferFee = 232.80;
        break;

      case "nt":
        // Northern Territory Stamp Duty
        if (propertyValue <= 525000) {
          stampDuty = propertyValue * 0.0665 + 15;
        } else if (propertyValue <= 3000000) {
          stampDuty = 0.0465 * propertyValue + 1065;
        } else {
          stampDuty = 0.0565 * propertyValue - 28935;
        }
        // First Home Buyer concession NT
        if (firstHomeBuyer && propertyType === "primary" && propertyValue <= 650000) {
          const reduction = Math.min(stampDuty, 7019.40);
          concession = reduction;
          stampDuty = Math.max(0, stampDuty - reduction);
        }
        mortgageRegistrationFee = 149;
        transferFee = 149;
        break;

      case "act":
        // ACT uses annual rates system instead of stamp duty for most properties
        // Calculating nominal transfer duty
        if (propertyValue <= 260000) {
          stampDuty = 0;
        } else if (propertyValue <= 300000) {
          stampDuty = (propertyValue - 260000) * 0.02;
        } else if (propertyValue <= 500000) {
          stampDuty = 800 + (propertyValue - 300000) * 0.035;
        } else if (propertyValue <= 750000) {
          stampDuty = 7800 + (propertyValue - 500000) * 0.0435;
        } else if (propertyValue <= 1000000) {
          stampDuty = 18675 + (propertyValue - 750000) * 0.0465;
        } else if (propertyValue <= 1455000) {
          stampDuty = 30300 + (propertyValue - 1000000) * 0.0495;
        } else {
          stampDuty = 52822.50 + (propertyValue - 1455000) * 0.0595;
        }
        // First Home Buyer concession ACT (exempt from duty)
        if (firstHomeBuyer && propertyType === "primary" && propertyValue <= 1500000) {
          concession = stampDuty;
          stampDuty = 0;
        }
        mortgageRegistrationFee = 170;
        transferFee = 454;
        break;
    }
    
    const totalFees = Math.round(stampDuty + foreignPurchaserSurcharge + mortgageRegistrationFee + transferFee);
    
    return {
      stampDuty: Math.round(stampDuty),
      concession: Math.round(concession),
      foreignPurchaserSurcharge: Math.round(foreignPurchaserSurcharge),
      mortgageRegistrationFee: Math.round(mortgageRegistrationFee),
      transferFee: Math.round(transferFee),
      totalFees
    };
  };

  const results = calculateFees();

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
