import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { organizationSchema, serviceSchema } from "@/lib/structuredData";
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, serviceSchema]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="House & Land Package Finance Specialists | Australian Mortgage Calculators"
        description="Expert home loan solutions for house & land packages, new properties, and first home buyers in Australia. 13 specialized mortgage calculators, 5% deposit scheme, and government grants up to $45,000."
        keywords="house and land packages, home loans Australia, mortgage calculator, first home buyer, construction loans, 5% deposit, government grants, stamp duty calculator"
        canonical="https://halp-loan-compass.lovable.app/"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-20 px-4">
        <div className="container mx-auto text-center text-white">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Award className="h-5 w-5" />
              <span>30 Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Shield className="h-5 w-5" />
              <span>Licensed & Trusted</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <CheckCircle2 className="h-5 w-5" />
              <span>Fast Approvals</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Home Loan <span className="text-secondary">Specialists</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            HALP Home Loans brings 30 years of expertise to help you secure your dream home. 
            Specialists in first home buyers, house & land packages, overseas buyers, and government grants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/apply">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl">
                Get Pre-Approved
              </Button>
            </Link>
            <Link to="/apply">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary shadow-xl">
                Contact Tim Egan
              </Button>
            </Link>
          </div>

          {/* Company Branding */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-70 uppercase tracking-wider">House and Land Packages Pty Ltd</p>
            <p className="text-xs opacity-60 mt-1">presents</p>
            <p className="text-lg font-semibold mt-2 tracking-wide">HALP HOME LOANS & HALP FINANCE</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            30 Years of Trusted <span className="text-primary">Home Loan Expertise</span>
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            We're a family-oriented team who understand that buying a home is one of life's biggest decisions. 
            Whether you're a first home buyer, growing family, or seasoned investor – we're here to HALP 
            every step of the way with honest advice and genuine care for your financial future.
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
            A comprehensive mortgage calculator suite, designed specifically for 
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
          <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's HALP You Into Your Dream Home
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our friendly team is ready to guide you through every step of your home loan journey. 
            No jargon, no pressure – just honest advice from people who genuinely care about helping 
            Australian families achieve their property dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-accent shadow-xl">
                <DollarSign className="h-5 w-5 mr-2" />
                Get Pre-Approved Today
              </Button>
            </Link>
            <a href="tel:+61XXXXXXXXX">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                Call Our Team
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
