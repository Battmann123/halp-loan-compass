import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { organizationSchema, serviceSchema } from "@/lib/structuredData";
import halpHero from "@/assets/halp-hero.png.asset.json";
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
          <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/[0.04] blur-[80px]" />
          <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/[0.04] blur-[80px]" />
        </div>

        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1] text-foreground">
                Need <span className="text-primary">HALP</span> with your first home loan?
              </h1>
              <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-xl lg:max-w-none">
                5% deposit options, grants up to $45,000, and 40+ lenders compared.
                We do the running around — you pick the keys.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/apply">
                  <Button size="lg" className="text-base px-8 py-6 h-auto shadow-md hover:shadow-lg">
                    Get Pre-Approved
                  </Button>
                </Link>
                <Link to="/apply">
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto border-2">
                    Talk To A Broker
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute w-[90%] h-[90%] rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <img
                src={halpHero.url}
                alt="HALP Home Loans broker helping a happy young couple secure their first home"
                className="relative w-full h-auto object-contain drop-shadow-xl"
                loading="eager"
              />
            </div>
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
      <section className="py-16 px-4 bg-foreground text-background">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
            <Calculator className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How much can you actually afford?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-background/70 max-w-2xl mx-auto">
            Crunch the numbers in plain English. No sign-up, no email collected — just answers.
          </p>
          <Button asChild size="lg" className="text-base px-8 py-6 h-auto">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Button size="lg" className="text-base px-8 py-6 h-auto shadow-md">
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
