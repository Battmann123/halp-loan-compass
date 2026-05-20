import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import { Calculator, BookOpen, ArrowLeft, DollarSign, MapPin, Home, Percent, Globe } from "lucide-react";

const stampDutyStats = [
  { icon: Home, value: "$800K", label: "NSW FHB exempt threshold (new homes)" },
  { icon: Percent, value: "$0", label: "QLD stamp duty on new homes (no cap)" },
  { icon: DollarSign, value: "$25K+", label: "Typical FHB saving on a $650K purchase" },
  { icon: Globe, value: "7–8%", label: "Foreign buyer surcharge most states" },
];

const stampDutyFAQs = [
  {
    q: "Do first home buyers pay stamp duty in NSW?",
    a: "No — eligible NSW first home buyers pay zero stamp duty on new or established homes up to $800,000, with concessions tapering up to $1,000,000. The property must be your principal place of residence and you must live in it within 12 months of settlement.",
  },
  {
    q: "What is the VIC first home buyer stamp duty exemption?",
    a: "Victorian first home buyer owner-occupiers get a full stamp duty exemption on properties up to $600,000, with concessions on a sliding scale up to $750,000. The off-the-plan duty concession has been extended to 20 October 2026.",
  },
  {
    q: "Does Queensland charge stamp duty on new homes?",
    a: "From 1 May 2025 Queensland charges zero stamp duty on new homes and vacant land bought by first home buyers, with no price cap. Established homes still attract duty but FHBs are exempt up to $700,000 and receive concessions up to $800,000.",
  },
  {
    q: "Has South Australia abolished stamp duty?",
    a: "SA has abolished stamp duty for eligible first home buyers on new homes and vacant land, with no price cap from 6 June 2024. Established home FHBs may still receive concessions.",
  },
  {
    q: "When is stamp duty payable?",
    a: "Stamp duty is generally payable within 3 months of settlement in most states (NSW, VIC, QLD), though some states require it at or before settlement. Your conveyancer or solicitor usually arranges payment as part of settlement funds.",
  },
  {
    q: "Do foreign buyers pay extra stamp duty in Australia?",
    a: "Yes — most states apply a foreign purchaser surcharge of 7%–8% on top of standard duty. Permanent residents and Australian citizens are exempt from the surcharge, and some temporary visa holders may qualify for exemptions in specific states.",
  },
];

const StampDutyGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Stamp Duty Guide 2026 — NSW, VIC, QLD, SA, WA, TAS, ACT, NT"
        description="State-by-state Australian stamp duty rules updated for 2026. First home buyer exemptions, thresholds, foreign surcharges and off-the-plan concessions for every state and territory."
        canonical="https://halp-loan-compass.lovable.app/guides/stamp-duty"
        keywords="stamp duty calculator, NSW stamp duty, VIC stamp duty, QLD stamp duty, first home buyer stamp duty exemption, transfer duty Australia"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/stamp-duty" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Stamp Duty Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Understanding stamp duty across all Australian states
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          {/* What It Does */}
          <Card>
            <CardHeader>
              <CardTitle>What is Stamp Duty?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Stamp duty (also called transfer duty) is a state government tax on property purchases. 
                It's one of the largest upfront costs when buying property, typically ranging from $10,000 
                to $50,000+ depending on the property price and location.
              </p>
              <p>
                This calculator helps you estimate stamp duty costs for all Australian states and territories, 
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Standard stamp duty rates for each state</li>
                <li>First home buyer concessions and exemptions</li>
                <li>New vs established property differences</li>
                <li>Foreign buyer surcharges</li>
                <li>Off-the-plan purchase concessions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step by Step */}
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Select Your State</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose the state or territory where you're purchasing. Stamp duty rates and concessions 
                      vary significantly between states.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Enter Property Price</h4>
                    <p className="text-sm text-muted-foreground">
                      Input the purchase price of the property. For house & land packages, use the total 
                      contract price (land + construction).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Specify Buyer Status</h4>
                    <p className="text-sm text-muted-foreground">
                      Indicate if you're a first home buyer and whether you're an Australian citizen/permanent 
                      resident. This affects eligibility for concessions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Property Type</h4>
                    <p className="text-sm text-muted-foreground">
                      Select whether it's a new or established property. New properties often qualify for 
                      additional concessions or exemptions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-semibold mb-2">Review Calculations</h4>
                    <p className="text-sm text-muted-foreground">
                      See your stamp duty amount and any concessions you qualify for. Budget this amount 
                      along with other settlement costs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* State-by-State Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                State-by-State Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">New South Wales (NSW)</h4>
                <div className="text-sm space-y-1">
                  <p><strong>First Home Buyer Threshold:</strong> Full exemption up to $800,000 (new homes only)</p>
                  <p><strong>Standard Rate:</strong> Scales from 1.25% to 7% based on property value</p>
                  <p><strong>Foreign Buyer Surcharge:</strong> 8%</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Victoria (VIC)</h4>
                <div className="text-sm space-y-1">
                  <p><strong>First Home Buyer:</strong> Full exemption up to $600,000, concessions to $750,000</p>
                  <p><strong>Standard Rate:</strong> Ranges from 1.4% to 6.5%</p>
                  <p><strong>Foreign Buyer Surcharge:</strong> 8%</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Queensland (QLD)</h4>
                <div className="text-sm space-y-1">
                  <p><strong>First Home Buyer:</strong> Full exemption up to $500,000, concessions to $550,000</p>
                  <p><strong>Standard Rate:</strong> 1.5% to 6.75%</p>
                  <p><strong>Foreign Buyer Surcharge:</strong> 8%</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Western Australia (WA)</h4>
                <div className="text-sm space-y-1">
                  <p><strong>First Home Buyer:</strong> Transfer duty rebate available up to $430,000</p>
                  <p><strong>Standard Rate:</strong> 1.9% to 6.68%</p>
                  <p><strong>Foreign Buyer Surcharge:</strong> 7%</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">South Australia (SA)</h4>
                <div className="text-sm space-y-1">
                  <p><strong>First Home Buyer:</strong> Full exemption up to $650,000 (new homes)</p>
                  <p><strong>Standard Rate:</strong> 1% to 6.5%</p>
                  <p><strong>Foreign Buyer Surcharge:</strong> 7%</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Tasmania (TAS)</h4>
                <div className="text-sm space-y-1">
                  <p><strong>First Home Buyer:</strong> 50% concession up to $500,000</p>
                  <p><strong>Standard Rate:</strong> 1.75% to 8%</p>
                  <p><strong>Foreign Buyer Surcharge:</strong> 8%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Real-World Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Example 1 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 1: First Home Buyer in NSW</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Type:</span>
                    <span className="font-medium">New apartment (off-the-plan)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Purchase Price:</span>
                    <span className="font-medium">$650,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">First Home Buyer:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Standard Stamp Duty:</span>
                      <span className="font-medium line-through">$25,740</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">FHB Concession:</span>
                      <span className="font-bold text-primary">$0 (Full exemption)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <span className="text-muted-foreground"><strong>Total Saved:</strong></span>
                      <span className="font-bold text-primary">$25,740</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 2: Upgrader in Victoria</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Type:</span>
                    <span className="font-medium">Established house</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Purchase Price:</span>
                    <span className="font-medium">$900,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">First Home Buyer:</span>
                    <span className="font-medium">No</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground"><strong>Stamp Duty Payable:</strong></span>
                      <span className="font-bold text-primary">$48,070</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Note:</strong> This significant cost should be factored into your deposit and 
                      settlement funds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 3: House & Land Package in QLD</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Type:</span>
                    <span className="font-medium">House & land package</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Total Price:</span>
                    <span className="font-medium">$520,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">First Home Buyer:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Standard Stamp Duty:</span>
                      <span className="font-medium line-through">$8,925</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">FHB Concession:</span>
                      <span className="font-medium">-$4,463</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <span className="text-muted-foreground"><strong>Stamp Duty Payable:</strong></span>
                      <span className="font-bold text-primary">$4,462</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Tip:</strong> QLD offers partial concessions for properties between $500,000-$550,000.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Tips to Minimize Stamp Duty</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Buy New as First Home Buyer:</strong> New properties typically offer the best 
                    stamp duty concessions for first home buyers across all states.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Consider Property Price Thresholds:</strong> In some states, staying just under 
                    a threshold can save tens of thousands in stamp duty.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Check Eligibility Carefully:</strong> Ensure you meet all criteria for concessions, 
                    including residency requirements and property use (principal place of residence).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Budget for Settlement:</strong> Include stamp duty in your upfront costs along with 
                    legal fees, inspections, and removalists.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Research Regional Incentives:</strong> Some states offer additional concessions for 
                    properties in regional areas.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          <GuideFAQ items={stampDutyFAQs} />

          {/* CTA */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Stamp Duty</h3>
            <p className="text-muted-foreground mb-6">
              Get accurate stamp duty estimates for your state
            </p>
            <Link to="/calculators/stamp-duty">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Stamp Duty Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StampDutyGuide;
