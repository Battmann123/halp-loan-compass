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

      {/* Hero Section — white-led, family-friendly */}
      <section className="relative bg-gradient-to-b from-background to-secondary/40 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background border border-border rounded-full px-4 py-1.5 shadow-sm">
              <Award className="h-4 w-4 text-primary" />
              <span>30 Years Experience</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background border border-border rounded-full px-4 py-1.5 shadow-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Licensed & Trusted</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background border border-border rounded-full px-4 py-1.5 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Fast Approvals</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground max-w-4xl mx-auto">
            Your first home, <span className="text-primary">without the bank-speak.</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-muted-foreground">
            5% deposit options, grants up to $45,000, and 40+ lenders compared.
            We do the running around — you pick the keys.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link to="/apply">
              <Button size="lg" className="text-base px-8 py-6 h-auto shadow-md hover:shadow-lg">
                Get Pre-Approved
              </Button>
            </Link>
            <Link to="/apply">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto">
                Talk To A Broker
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border max-w-md mx-auto">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">House and Land Packages Pty Ltd</p>
            <p className="text-xs text-muted-foreground/70 mt-1">presents</p>
            <p className="text-sm font-semibold mt-2 tracking-wide text-foreground">HALP HOME LOANS & HALP FINANCE</p>
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
                <h3 className="font-semibold mb-2">House & Land, Made Simple</h3>
                <p className="text-sm text-muted-foreground">Brand-new homes: one approval, one settlement, land + build.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <HomeIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">First Home? Start Here.</h3>
                <p className="text-sm text-muted-foreground">5% deposit, $45K in grants, stamp duty exemptions explained.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Buy In The Right School Zone</h3>
                <p className="text-sm text-muted-foreground">Search by school catchment, then we sort the loan.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">New To Australia?</h3>
                <p className="text-sm text-muted-foreground">Temporary visa loans, FIRB help, brokers who speak your language.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">One Form. 40+ Lenders.</h3>
                <p className="text-sm text-muted-foreground">Big banks, small lenders, specialists — we compare, you choose.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            A clear path from "I think I want to buy" to keys in your hand.
          </p>

          <ol className="space-y-4">
            {[
              { n: "1", t: "Tell us about you", d: "5 minutes, online." },
              { n: "2", t: "We find your best 3 lenders", d: "Out of 40+ — matched to your situation." },
              { n: "3", t: "You get pre-approved", d: "So you know exactly what you can spend." },
              { n: "4", t: "Go house-hunting with a number you can trust", d: "No more guessing at open homes." },
              { n: "5", t: "We settle the loan, you get the keys", d: "We handle the paperwork end-to-end." },
            ].map((s) => (
              <li key={s.n}>
                <Card className="border-2">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{s.t}</h3>
                      <p className="text-sm text-muted-foreground">{s.d}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <Calculator className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How much can you actually afford?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Crunch the numbers in plain English. No sign-up, no email collected — just answers.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto shadow-xl">
            <Link to="/calculators" className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Run The Numbers
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
                <p className="text-sm text-muted-foreground mb-3">400,000+ newly eligible for the 5% deposit scheme</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 5% deposit loans</li>
                  <li>• Grants up to $45,000</li>
                  <li>• Stamp duty exemptions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <Users className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Non-Residents</h3>
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
                  <li>• Room to grow with the family</li>
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
            Ready when you are.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            A quick chat. We'll tell you what you can borrow, what grants you qualify for,
            and what your next move is. No pressure, no sales pitch.
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
