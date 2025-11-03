import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, BookOpen, ArrowLeft, Gift, DollarSign } from "lucide-react";

const GovernmentGrantsGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/government-grants" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Government Grants Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Comprehensive guide to first home buyer grants and the 5% deposit scheme
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
              <CardTitle>Available Government Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Australian Government and state governments offer significant financial support to help 
                first home buyers enter the property market. This calculator helps you determine eligibility and amounts for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Home Guarantee Scheme (5% Deposit):</strong> Buy with just 5% deposit, avoiding LMI ($10,000-$30,000+ saving)</li>
                <li><strong>First Home Owner Grants:</strong> Cash grants up to $30,000 (varies by state)</li>
                <li><strong>Stamp Duty Concessions:</strong> Full or partial exemptions saving $10,000-$50,000+</li>
                <li><strong>Shared Equity Schemes:</strong> Government contributes up to 40% of purchase price</li>
                <li><strong>Regional Home Guarantee:</strong> 5% deposit for regional buyers with expanded income caps</li>
              </ul>
            </CardContent>
          </Card>

          {/* Home Guarantee Scheme */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Home Guarantee Scheme (5% Deposit) - Recently Expanded
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="font-semibold mb-2">Over 400,000 Australians Now Eligible!</p>
                <p className="text-sm text-muted-foreground">
                  The government recently expanded income thresholds, making the 5% deposit scheme 
                  accessible to many more first home buyers.
                </p>
              </div>
              
              <h4 className="font-semibold">Eligibility Criteria:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Income Limits:</strong> $125,000 for singles, $200,000 for couples (increased from $90k/$120k)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Deposit:</strong> Minimum 5% genuine savings</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>First Home Buyer:</strong> Never owned property before</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Citizenship:</strong> Australian citizen or permanent resident</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Owner-Occupied:</strong> Must live in property for at least 12 months</span>
                </li>
              </ul>

              <h4 className="font-semibold mt-4">Property Price Caps by Region:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-secondary/20 rounded p-3">
                  <p className="font-medium">Sydney</p>
                  <p className="text-muted-foreground">$1,000,000</p>
                </div>
                <div className="bg-secondary/20 rounded p-3">
                  <p className="font-medium">Melbourne, Brisbane, Perth, Adelaide</p>
                  <p className="text-muted-foreground">$800,000</p>
                </div>
                <div className="bg-secondary/20 rounded p-3">
                  <p className="font-medium">Regional NSW, VIC, QLD, WA, SA</p>
                  <p className="text-muted-foreground">$600,000 - $750,000</p>
                </div>
                <div className="bg-secondary/20 rounded p-3">
                  <p className="font-medium">Tasmania, NT, ACT</p>
                  <p className="text-muted-foreground">$600,000 - $750,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* State Grants */}
          <Card>
            <CardHeader>
              <CardTitle>First Home Owner Grants by State</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">New South Wales</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Grant:</strong> $10,000 for new homes</p>
                  <p><strong>Property Cap:</strong> $800,000</p>
                  <p><strong>Stamp Duty:</strong> Full exemption up to $800,000 (new homes)</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Victoria</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Grant:</strong> $10,000 for new homes in metro, $20,000 regional</p>
                  <p><strong>Property Cap:</strong> $750,000</p>
                  <p><strong>Stamp Duty:</strong> Full exemption up to $600,000, concessions to $750,000</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Queensland</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Grant:</strong> $30,000 for new homes under $750,000</p>
                  <p><strong>Property Cap:</strong> $750,000</p>
                  <p><strong>Stamp Duty:</strong> Full exemption up to $500,000, concessions to $550,000</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Western Australia</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Grant:</strong> $10,000 for new homes</p>
                  <p><strong>Property Cap:</strong> $750,000</p>
                  <p><strong>Stamp Duty:</strong> Transfer duty relief available</p>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">South Australia</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Grant:</strong> $15,000 for new homes</p>
                  <p><strong>Property Cap:</strong> $650,000</p>
                  <p><strong>Stamp Duty:</strong> Full exemption for new homes up to $650,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step by Step */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use the Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Select Your State</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose where you're purchasing as grants and concessions vary significantly between states
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Enter Property Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Input purchase price and specify if it's a new or established property
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Provide Income Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter your income (or combined income for couples) to check Home Guarantee Scheme eligibility
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Review Eligibility & Savings</h4>
                    <p className="text-sm text-muted-foreground">
                      See what grants you qualify for and your total potential savings
                    </p>
                  </div>
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
                <h4 className="font-semibold text-lg mb-4">Example 1: Sydney First Home Buyer</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property:</span>
                    <span className="font-medium">New apartment, $750,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Income:</span>
                    <span className="font-medium">$115,000 (single)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit:</span>
                    <span className="font-medium">$37,500 (5%)</span>
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">First Home Owner Grant:</span>
                      <span className="font-medium">$10,000</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Stamp Duty Saved:</span>
                      <span className="font-medium">$30,090</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">LMI Saved (via 5% scheme):</span>
                      <span className="font-medium">$18,500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <span className="font-semibold">Total Savings:</span>
                      <span className="font-bold text-primary text-lg">$58,590</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 2: Queensland Couple</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property:</span>
                    <span className="font-medium">House & land, $580,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Combined Income:</span>
                    <span className="font-medium">$180,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit:</span>
                    <span className="font-medium">$29,000 (5%)</span>
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">First Home Owner Grant:</span>
                      <span className="font-medium">$30,000</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Stamp Duty Saved:</span>
                      <span className="font-medium">$5,435</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">LMI Saved (via 5% scheme):</span>
                      <span className="font-medium">$14,900</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <span className="font-semibold">Total Savings:</span>
                      <span className="font-bold text-primary text-lg">$50,335</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Note:</strong> The generous $30,000 QLD grant can significantly boost your deposit!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Maximizing Your Government Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Apply Early for Home Guarantee Scheme:</strong> Places are limited and allocated 
                    on a first-come basis. Pre-approval is recommended.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Choose New Properties:</strong> Maximum grants and concessions typically apply 
                    to new homes, not established ones.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Check Income Before Overtime:</strong> Ensure your base income qualifies before 
                    considering variable income.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Consider Regional Areas:</strong> Some states offer higher grants and lower 
                    property price caps for regional purchases.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Work with Specialist Brokers:</strong> Not all lenders participate in government 
                    schemes - get expert guidance.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Government Support</h3>
            <p className="text-muted-foreground mb-6">
              See what grants and schemes you qualify for
            </p>
            <Link to="/calculators/government-grants">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Government Grants Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GovernmentGrantsGuide;
