import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import {
  Calculator,
  DollarSign,
  Home,
  TrendingUp,
  TrendingDown,
  FileText,
  PiggyBank,
  Calendar,
  Percent,
  Building,
  RefreshCw,
  Scale,
  Receipt,
  Gift,
} from "lucide-react";

const calculatorCategories = [
  {
    name: "Loan Affordability & Repayment",
    icon: Calculator,
    calculators: [
      {
        id: "repayment",
        name: "Loan Repayment Calculator",
        description: "Calculate monthly, fortnightly, or weekly repayments",
        icon: Calculator,
      },
      {
        id: "borrowing-power",
        name: "Borrowing Power Calculator",
        description: "Discover how much you can borrow",
        icon: TrendingUp,
      },
      {
        id: "serviceability",
        name: "Loan Serviceability Calculator",
        description: "Assess your ability to service a loan",
        icon: Scale,
      },
    ],
  },
  {
    name: "Property Purchase Costs",
    icon: Home,
    calculators: [
      {
        id: "stamp-duty",
        name: "Stamp Duty Calculator",
        description: "Calculate stamp duty for all Australian states",
        icon: Receipt,
      },
      {
        id: "lmi",
        name: "LMI Calculator",
        description: "Calculate Lenders Mortgage Insurance costs",
        icon: FileText,
      },
      {
        id: "upfront-costs",
        name: "Upfront Costs Calculator",
        description: "Total costs to purchase a property",
        icon: DollarSign,
      },
      {
        id: "government-grants",
        name: "Government Grants Calculator",
        description: "Calculate available grants including 5% deposit scheme",
        icon: Gift,
      },
    ],
  },
  {
    name: "Investment & Tax",
    icon: TrendingUp,
    calculators: [
      {
        id: "investment-property",
        name: "Investment Property Calculator",
        description: "Analyze rental returns and cash flow",
        icon: Building,
      },
      {
        id: "negative-gearing",
        name: "Negative Gearing Calculator",
        description: "Calculate tax benefits of negatively geared properties",
        icon: TrendingDown,
      },
      {
        id: "capital-gains",
        name: "Capital Gains Tax Calculator",
        description: "Estimate CGT on property sales",
        icon: Percent,
      },
      {
        id: "depreciation",
        name: "Depreciation Calculator",
        description: "Calculate tax deductions for new properties",
        icon: Calendar,
      },
    ],
  },
  {
    name: "Comparison & Optimization",
    icon: RefreshCw,
    calculators: [
      {
        id: "refinance",
        name: "Refinance Calculator",
        description: "Compare refinancing benefits",
        icon: RefreshCw,
      },
      {
        id: "extra-repayments",
        name: "Extra Repayments Calculator",
        description: "See the impact of additional payments",
        icon: PiggyBank,
      },
      {
        id: "lender-comparison",
        name: "Lender Comparison Tool",
        description: "Compare 40+ lenders side by side",
        icon: Scale,
      },
    ],
  },
];

const Calculators = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Home Loan Calculators Australia",
    "description": "13 specialized mortgage calculators for Australian property buyers",
    "url": "https://halp-loan-compass.lovable.app/calculators"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="13 Home Loan Calculators Australia | Mortgage & Property Finance Tools"
        description="A comprehensive mortgage calculator suite. Calculate repayments, borrowing power, stamp duty, LMI, government grants, and investment returns. Specialized for house & land packages."
        keywords="home loan calculator, mortgage calculator Australia, stamp duty calculator, borrowing power calculator, LMI calculator, repayment calculator, investment property calculator"
        canonical="https://halp-loan-compass.lovable.app/calculators"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Calculator className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Home Loan Calculators Australia
          </h1>
          <p className="text-xl md:text-2xl opacity-95 mb-4">
            A comprehensive mortgage calculator suite
          </p>
          <p className="text-lg opacity-90">
            Specially designed for house & land packages, new properties, and school zone purchases
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              "13 Specialized Calculators",
              "Australian-Specific",
              "House & Land Focus",
              "School Zone Integration",
              "Investment Analysis",
              "Mobile Optimized",
            ].map((benefit) => (
              <div key={benefit} className="text-center">
                <div className="bg-primary/10 rounded-full w-3 h-3 mx-auto mb-2"></div>
                <p className="text-sm font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="prose max-w-none mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Property Dreams Into Financial Reality
            </h2>
            <p className="text-lg text-muted-foreground">
              HALP's calculator hub is Australia's most comprehensive collection of property and mortgage calculators, 
              specifically designed for our specialized focus on house & land packages, new properties, and school zone purchases. 
              Whether you're a first home buyer exploring the 5% deposit scheme, an investor analyzing new property tax benefits, 
              or a family searching for the perfect home in the right school catchment, our calculators provide the insights you need.
            </p>
          </div>

          {/* Calculator Categories */}
          {calculatorCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.calculators.map((calculator) => (
                  <Link key={calculator.id} to={`/calculators/${calculator.id}`}>
                    <Card className="h-full border-2 hover:border-primary transition-all hover:shadow-xl cursor-pointer group">
                      <CardContent className="p-6">
                        <calculator.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {calculator.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{calculator.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Different */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why HALP's Calculators Are Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-3">New Property Specialization</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Construction loan calculations</li>
                <li>• Progress payment scheduling</li>
                <li>• Depreciation benefits</li>
                <li>• Government grant integration</li>
              </ul>
            </div>

            <div className="text-center">
              <Home className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-3">School Zone Financial Planning</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Affordability in catchments</li>
                <li>• Property premium analysis</li>
                <li>• Long-term value projections</li>
                <li>• Family budget planning</li>
              </ul>
            </div>

            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-3">Australian Market Expertise</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Real-time stamp duty (all states)</li>
                <li>• Current LMI rates</li>
                <li>• Government grant eligibility</li>
                <li>• Market condition updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Need Help Choosing the Right Calculator?"
        description="Speak with a licensed mortgage broker to get personalized advice and accurate calculations for your situation."
        showCalculators={false}
      />

      <Footer />
    </div>
  );
};

export default Calculators;
