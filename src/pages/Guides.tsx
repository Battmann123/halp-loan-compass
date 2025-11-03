import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, TrendingUp, Home, Building, Percent, DollarSign, PiggyBank, BarChart3, Calendar, RefreshCw, Coins, Scale } from "lucide-react";

const Guides = () => {
  const guides = [
    {
      title: "Loan Repayment Guide",
      description: "Master your mortgage repayments with our comprehensive guide covering calculation methods, payment strategies, and money-saving tips.",
      icon: Calculator,
      link: "/guides/repayment"
    },
    {
      title: "Borrowing Power Guide",
      description: "Understand how lenders calculate your borrowing capacity and learn strategies to maximize your loan potential.",
      icon: TrendingUp,
      link: "/guides/borrowing-power"
    },
    {
      title: "Stamp Duty Guide",
      description: "Navigate stamp duty costs across Australian states and territories with examples and savings strategies.",
      icon: Home,
      link: "/guides/stamp-duty"
    },
    {
      title: "Government Grants Guide",
      description: "Discover available government assistance schemes, eligibility criteria, and how to maximize your benefits.",
      icon: DollarSign,
      link: "/guides/government-grants"
    },
    {
      title: "Investment Property Guide",
      description: "Learn how to analyze investment opportunities, calculate returns, and structure your property portfolio.",
      icon: Building,
      link: "/guides/investment-property"
    },
    {
      title: "Refinance Guide",
      description: "Determine if refinancing is right for you with our detailed analysis of costs, benefits, and timing strategies.",
      icon: RefreshCw,
      link: "/guides/refinance"
    },
    {
      title: "Depreciation Guide",
      description: "Maximize tax benefits through property depreciation schedules and learn what items qualify for deductions.",
      icon: Percent,
      link: "/guides/depreciation"
    },
    {
      title: "LMI Guide",
      description: "Understand Lenders Mortgage Insurance costs, when it applies, and strategies to avoid or minimize it.",
      icon: Shield,
      link: "/guides/lmi"
    },
    {
      title: "Upfront Costs Guide",
      description: "Plan your property purchase budget with a complete breakdown of initial costs and fees.",
      icon: PiggyBank,
      link: "/guides/upfront-costs"
    },
    {
      title: "Serviceability Guide",
      description: "Learn how lenders assess your ability to service a loan and improve your approval chances.",
      icon: BarChart3,
      link: "/guides/serviceability"
    },
    {
      title: "Capital Gains Guide",
      description: "Navigate capital gains tax implications when selling investment properties with practical examples.",
      icon: Coins,
      link: "/guides/capital-gains"
    },
    {
      title: "Extra Repayments Guide",
      description: "Discover how extra payments can save thousands in interest and years off your mortgage.",
      icon: Calendar,
      link: "/guides/extra-repayments"
    },
    {
      title: "Lender Comparison Guide",
      description: "Compare features, rates, and fees across different lenders to find the best fit for your needs.",
      icon: Scale,
      link: "/guides/lender-comparison"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Comprehensive Home Loan Guides
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert guides to help you understand every aspect of home loans, from repayments to refinancing
              </p>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {guides.map((guide, index) => (
                <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Link to={guide.link}>
                      <Button variant="outline" className="w-full">
                        Read Guide
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our expert brokers are here to help you navigate your home loan journey
              </p>
              <Link to="/apply">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Connect with a Broker
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Shield icon import
import { Shield } from "lucide-react";

export default Guides;
