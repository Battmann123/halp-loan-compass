import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Building, CheckCircle, Calculator, ArrowRight } from "lucide-react";

const ConstructionLoans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Building className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Construction Loans
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            Perfect for house & land packages and custom builds
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-6">What is a Construction Loan?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              A construction loan is specifically designed for building a new home, whether you're purchasing a house & land package 
              or undertaking a custom build. Unlike standard home loans where you receive the full amount upfront, construction loans 
              release funds in stages (progress payments) as your build reaches key milestones.
            </p>
          </div>

          {/* Key Features */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Progress Payments</h4>
                    <p className="text-sm text-muted-foreground">
                      Funds released at key construction stages: base, frame, lock-up, fixing, and completion
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Interest-Only Period</h4>
                    <p className="text-sm text-muted-foreground">
                      Pay only interest during construction (typically 6-12 months), on the amount drawn down
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Single Approval Process</h4>
                    <p className="text-sm text-muted-foreground">
                      One application covers both land purchase and construction costs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Fixed Price Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Lock in your build cost with a fixed-price building contract
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">How Construction Loans Work</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Pre-Approval</h4>
                    <p className="text-sm text-muted-foreground">
                      Get approved for your total loan amount (land + construction costs) before you purchase
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Land Settlement</h4>
                    <p className="text-sm text-muted-foreground">
                      First drawdown covers the land purchase and associated costs
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Construction Begins</h4>
                    <p className="text-sm text-muted-foreground">
                      Progress payments released at each stage: base (15%), frame (20%), lock-up (35%), fixing (20%), completion (10%)
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Final Settlement</h4>
                    <p className="text-sm text-muted-foreground">
                      Once complete, your loan converts to a standard home loan with principal and interest payments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Eligibility Criteria</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Minimum 5% deposit (10% preferred for better rates)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Fixed-price building contract with licensed builder</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Approved building plans and permits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Satisfactory credit history and income verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Builder must have appropriate insurance and warranty coverage</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Construction Loan</h3>
            <p className="text-muted-foreground mb-6">
              Use our calculators to estimate your borrowing power and repayments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/borrowing-power">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Borrowing Power Calculator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/calculators">
                <Button size="lg" variant="outline">
                  View All Calculators
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Ready to Start Your Construction Journey?"
        description="Connect with a licensed broker who specializes in construction loans and house & land packages."
      />

      <Footer />
    </div>
  );
};

export default ConstructionLoans;
