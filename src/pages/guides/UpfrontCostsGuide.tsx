import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, BookOpen, ArrowLeft, Wallet, DollarSign } from "lucide-react";

const UpfrontCostsGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/upfront-costs" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Upfront Costs Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Complete breakdown of all buying costs
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>Beyond the Deposit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Many first-time buyers focus only on saving the deposit, but there are significant additional 
                costs involved in purchasing property. This calculator helps you budget for ALL upfront expenses:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Stamp duty (transfer duty)</li>
                <li>Legal and conveyancing fees</li>
                <li>Building and pest inspections</li>
                <li>Lenders Mortgage Insurance (if under 20% deposit)</li>
                <li>Loan application and valuation fees</li>
                <li>Moving and initial setup costs</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Complete Cost Breakdown Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Buying a $650,000 Property in NSW</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Purchase Price:</span>
                    <span className="font-medium">$650,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (10%):</span>
                    <span className="font-medium">$65,000</span>
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <p className="font-semibold">Additional Costs:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Stamp Duty:</span>
                      <span className="font-medium">$25,740</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">LMI (90% LVR):</span>
                      <span className="font-medium">$18,500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Conveyancing:</span>
                      <span className="font-medium">$1,800</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Building Inspection:</span>
                      <span className="font-medium">$500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Pest Inspection:</span>
                      <span className="font-medium">$350</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Loan Fees:</span>
                      <span className="font-medium">$600</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Moving Costs:</span>
                      <span className="font-medium">$2,000</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t font-bold">
                      <span>Total Additional Costs:</span>
                      <span className="text-primary">$49,490</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t text-lg font-bold">
                      <span>TOTAL CASH NEEDED:</span>
                      <span className="text-primary">$114,490</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Important:</strong> You need significantly more than just the deposit! Plan to have 
                      17-20% of the property price in cash.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-secondary/20 rounded p-4">
                <h4 className="font-semibold mb-2">Government Charges</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Stamp Duty: 3-7% of property value (varies by state)</li>
                  <li>• Title Transfer Fee: $150-$500</li>
                  <li>• Mortgage Registration: $150-$200</li>
                </ul>
              </div>

              <div className="bg-secondary/20 rounded p-4">
                <h4 className="font-semibold mb-2">Professional Fees</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Conveyancing/Legal: $1,200-$2,500</li>
                  <li>• Building Inspection: $400-$600</li>
                  <li>• Pest Inspection: $250-$500</li>
                  <li>• Strata Report (apartments): $200-$350</li>
                </ul>
              </div>

              <div className="bg-secondary/20 rounded p-4">
                <h4 className="font-semibold mb-2">Lender Costs</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Application Fee: $0-$700 (often waived)</li>
                  <li>• Valuation Fee: $0-$300</li>
                  <li>• LMI: $2,000-$30,000+ (if under 20% deposit)</li>
                </ul>
              </div>

              <div className="bg-secondary/20 rounded p-4">
                <h4 className="font-semibold mb-2">Moving & Setup</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Removalists: $500-$3,000</li>
                  <li>• Connection Fees (utilities): $300-$500</li>
                  <li>• Initial Furniture/Appliances: Variable</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Money-Saving Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>First Home Buyer Grants:</strong> Can cover most of your stamp duty and add to deposit
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>20% Deposit:</strong> Eliminates LMI, saving $10,000-$30,000+
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Use a Broker:</strong> Can negotiate fee waivers and find better deals (free service)
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Shop Around:</strong> Get quotes from multiple conveyancers and inspectors
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate All Your Upfront Costs</h3>
            <Link to="/calculators/upfront-costs">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Upfront Costs Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UpfrontCostsGuide;
