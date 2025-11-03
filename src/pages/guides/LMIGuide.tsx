import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, BookOpen, ArrowLeft, Shield, DollarSign } from "lucide-react";

const LMIGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/lmi" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Lenders Mortgage Insurance (LMI) Guide
            </h1>
            <p className="text-lg opacity-95">
              Understanding and calculating LMI costs
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>What is LMI?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Lenders Mortgage Insurance (LMI) protects the lender (not you) if you default on your loan. 
                It's typically required when you borrow more than 80% of the property value (less than 20% deposit).
              </p>
              <p className="font-semibold text-destructive">Important: LMI protects the lender, NOT you.</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Required for deposits under 20%</li>
                <li>One-time premium (can be added to loan)</li>
                <li>Costs range from $2,000 to $30,000+</li>
                <li>Non-refundable and non-transferable</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                LMI Cost Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 1: 10% Deposit</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Price:</span>
                    <span className="font-medium">$600,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (10%):</span>
                    <span className="font-medium">$60,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">$540,000 (90% LVR)</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span>Estimated LMI:</span>
                      <span className="text-primary text-lg">$16,200</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Example 2: 15% Deposit</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Price:</span>
                    <span className="font-medium">$600,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Deposit (15%):</span>
                    <span className="font-medium">$90,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">$510,000 (85% LVR)</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-2 font-bold">
                      <span>Estimated LMI:</span>
                      <span className="text-primary text-lg">$8,900</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded p-3 mt-3">
                    <p className="text-xs">
                      <strong>Savings:</strong> An extra 5% deposit saves $7,300 in LMI!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ways to Avoid LMI</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Save 20% Deposit:</strong> The most straightforward way to avoid LMI entirely
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Home Guarantee Scheme:</strong> First home buyers can use 5% deposit without LMI 
                    (income limits apply)
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Family Guarantee:</strong> Parents use equity in their home to guarantee part of your loan
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Professional Packages:</strong> Some lenders waive LMI for doctors, lawyers, accountants 
                    with deposits as low as 10%
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LMI vs Waiting to Save</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Should you pay LMI to buy now, or wait to save a 20% deposit? Consider:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <strong>Buy Now if:</strong> Property prices are rising faster than you can save, 
                    or rent is high and LMI will be recovered through capital growth
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <strong>Wait if:</strong> Market is stable, you can save the extra deposit within 12-24 months, 
                    or you want lower repayments
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your LMI</h3>
            <Link to="/calculators/lmi">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use LMI Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LMIGuide;
