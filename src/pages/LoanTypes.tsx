import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import {
  Building,
  Home,
  TrendingUp,
  RefreshCw,
  Users,
  DollarSign,
  Shield,
  Zap,
} from "lucide-react";

const loanTypes = [
  {
    id: "construction",
    name: "Construction Loans",
    description: "Perfect for house & land packages and custom builds",
    icon: Building,
    benefits: [
      "Progress payments released at key milestones",
      "Interest-only during construction (up to 12 months)",
      "Single approval for land and build",
      "Builder completion guarantees",
    ],
  },
  {
    id: "off-the-plan",
    name: "Off-the-Plan Loans",
    description: "Specialized financing for apartment and townhouse developments",
    icon: Home,
    benefits: [
      "Extended settlement periods (12-24 months)",
      "Deposit protection through licensed conveyancing",
      "Sunset clause guidance and legal protection",
      "Price lock-in advantage during market growth",
    ],
  },
  {
    id: "first-home-buyer",
    name: "First Home Buyer Loans",
    description: "400,000+ Australians newly eligible for 5% deposit scheme",
    icon: Users,
    benefits: [
      "5% deposit with government backing",
      "First Home Owner Grants up to $45,000",
      "Stamp duty exemptions and concessions",
      "Shared equity schemes and family guarantees",
    ],
  },
  {
    id: "investment",
    name: "Investment Property Loans",
    description: "Maximize returns on new property investments",
    icon: TrendingUp,
    benefits: [
      "Maximum depreciation allowances for new properties",
      "Interest-only options during construction",
      "Tax-deductible interest payments",
      "Portfolio growth strategies",
    ],
  },
  {
    id: "refinance",
    name: "Refinance Loans",
    description: "Better rates and terms for existing homeowners",
    icon: RefreshCw,
    benefits: [
      "Rate reduction opportunities",
      "Debt consolidation options",
      "Access home equity for renovations",
      "Switch to construction loan for extensions",
    ],
  },
  {
    id: "low-doc",
    name: "Low Doc Loans",
    description: "For self-employed and small business owners",
    icon: Shield,
    benefits: [
      "Simplified income verification",
      "ABN statements accepted",
      "BAS statements as proof of income",
      "Accountant declarations",
    ],
  },
];

const LoanTypes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Building className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Home Loan Types & Solutions
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            Find the perfect financing solution for your property purchase
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="prose max-w-none mb-12 text-center">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              HALP specializes in financing new properties, house & land packages, and off-the-plan developments. 
              Whether you're a first home buyer, property investor, or growing family, we have the right loan 
              solution for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {loanTypes.map((loanType) => (
              <Card key={loanType.id} className="border-2 hover:border-primary transition-all group">
                <CardContent className="p-8">
                  <loanType.icon className="h-14 w-14 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{loanType.name}</h3>
                  <p className="text-muted-foreground mb-6">{loanType.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {loanType.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={`/loan-types/${loanType.id}`}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Learn More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto text-center max-w-3xl">
          <DollarSign className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Not Sure Which Loan Type is Right for You?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our licensed mortgage brokers will help you find the perfect loan solution 
            for your specific circumstances and property goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent shadow-xl">
                Speak to a Broker
              </Button>
            </Link>
            <Link to="/calculators">
              <Button size="lg" variant="outline">
                Use Our Calculators
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoanTypes;
