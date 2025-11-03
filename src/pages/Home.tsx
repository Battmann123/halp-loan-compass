import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calculator,
  Home as HomeIcon,
  TrendingUp,
  Shield,
  Users,
  Award,
  Building,
  GraduationCap,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-20 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            We HALP You Secure the Right Home Loan
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            Specialists in new properties, house & land packages, and off-the-plan developments across Australia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl">
                Apply Now
              </Button>
            </Link>
            <Link to="/calculators">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary shadow-xl">
                Use Calculators
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Value Props */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">New Property Specialists</h3>
                <p className="text-sm text-muted-foreground">House & land packages under 3 years</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <HomeIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">First Home Buyer Experts</h3>
                <p className="text-sm text-muted-foreground">5% deposit scheme, grants up to $45,000</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">School Zone Integration</h3>
                <p className="text-sm text-muted-foreground">Find loans in preferred catchments</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Migrant-Friendly Service</h3>
                <p className="text-sm text-muted-foreground">Expert guidance for overseas buyers</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Compare 40+ Lenders</h3>
                <p className="text-sm text-muted-foreground">Major banks & specialist financiers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose HALP */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose HALP for Your Home Loan?
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            At HALP, we don't just find you any home loan – we specialize in financing new properties, 
            house and land packages, and off-the-plan developments across Australia. With over 400,000 
            Australians newly eligible for the 5% deposit scheme and our unique school zone integration, 
            we're your trusted partner in the home buying journey.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="p-6">
                <Building className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">House & Land Package Finance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Construction-to-permanent loans for turnkey packages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Progress payment management during build phase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Single approval process for land and construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Flexible deposit structures from 5% with government assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">New Home & Off-the-Plan Loans</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>New home depreciation benefits for investors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Off-the-plan settlement flexibility (12-24 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Sunset clause protection and legal safeguards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Brand new property warranties and insurance benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <Calculator className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            13 Specialized Home Loan Calculators
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Australia's most comprehensive mortgage calculator suite, designed specifically for 
            house & land packages, new properties, and school zone purchases.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto shadow-xl">
            <Link to="/calculators" className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Explore All Calculators
            </Link>
          </Button>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who We Help</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <HomeIcon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">First Home Buyers</h3>
                <p className="text-sm text-muted-foreground mb-3">400,000+ newly eligible</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 5% deposit loans</li>
                  <li>• Grants up to $45,000</li>
                  <li>• Stamp duty exemptions</li>
                  <li>• Complete buying guides</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <Users className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Migrants & International</h3>
                <p className="text-sm text-muted-foreground mb-3">945,000+ annually</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Overseas income assessment</li>
                  <li>• Temporary visa lending</li>
                  <li>• FIRB application assistance</li>
                  <li>• Multi-language support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Property Investors</h3>
                <p className="text-sm text-muted-foreground mb-3">Maximize returns</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• New property tax benefits</li>
                  <li>• Portfolio growth strategies</li>
                  <li>• Interest-only options</li>
                  <li>• Cross-collateral strategies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <GraduationCap className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Growing Families</h3>
                <p className="text-sm text-muted-foreground mb-3">School zone focus</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• School catchment mapping</li>
                  <li>• Family home upgrades</li>
                  <li>• Flexible repayments</li>
                  <li>• Future expansion planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto text-center max-w-3xl">
          <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with licensed mortgage brokers through HALP. We'll match you with 
            the right finance solution for your house & land package or new property purchase.
          </p>
          <Link to="/apply">
            <Button size="lg" className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-accent shadow-xl">
              <DollarSign className="h-5 w-5 mr-2" />
              Apply for Pre-Approval
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
