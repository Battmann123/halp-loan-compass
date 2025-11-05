import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TrendingUp, Globe, Award, Users } from "lucide-react";
import SEO from "@/components/SEO";

const Sponsors = () => {
  const domains = [
    { category: "House And Land Packages", domains: ["halp.com.au", "halp.net.au", "halp.au", "landandhousepackages.com.au", "houseandlandpackages.co", "houselandpackages.com", "landandhousepackages.au", "landandhousepackages.com", "lahp.com.au"] },
    { category: "HALP Home Loans", domains: ["halphomeloans.com.au", "halploans.com.au", "halpfinance.com.au", "granthomeloans.com.au"] },
    { category: "Boutique Developments", domains: ["boutiquedevelopments.com.au", "boutiquedevelopments.net.au", "boutiquedevelopments.co", "boutiquedevelopments.com", "boutiquedevelopments.net", "boutiquedevelopments.au"] },
    { category: "Off Market Property", domains: ["offmarketproperty.com.au", "offmarketrealestate.com.au"] },
    { category: "Buying Off Plan", domains: ["buyingoffplan.com.au"] }
  ];

  const rankings = [
    { site: "boutiquedevelopments.com.au", ranking: "#2 Google ranking", keywords: "High-value property keywords" },
    { site: "halp.com.au", ranking: "Top rankings", keywords: "Victorian 'House And Land Packages'" }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "25+ Premium Domains",
      description: "Comprehensive keyword coverage across the Australian property market"
    },
    {
      icon: TrendingUp,
      title: "Proven SEO Performance",
      description: "#2 Google ranking for boutiquedevelopments.com.au with strong organic traffic"
    },
    {
      icon: Users,
      title: "High-Intent Audience",
      description: "Property buyers at critical decision-making stages with financing needs"
    },
    {
      icon: Award,
      title: "Exclusive Branding Opportunity",
      description: "Own the HALP Home Loans section and Mortgage Calculator across all properties"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Sponsorship Opportunities"
        description="Sponsor the HALP Home Loans and Mortgage Calculator sections across our premium Australian property website portfolio. Reach high-intent property buyers."
        keywords="property website sponsorship, mortgage calculator branding, real estate advertising, home loan partnerships"
      />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Sponsorship Opportunities
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Partner with Australia's premier property website portfolio and reach high-intent property buyers
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge variant="secondary" className="text-base px-4 py-2">25+ Premium Domains</Badge>
                <Badge variant="secondary" className="text-base px-4 py-2">#2 Google Ranking</Badge>
                <Badge variant="secondary" className="text-base px-4 py-2">High-Intent Traffic</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsorship Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Exclusive Ownership Opportunities</CardTitle>
                  <CardDescription>
                    Position your brand at the heart of Australia's property financing journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-2">HALP Home Loans Section</h3>
                    <p className="text-muted-foreground">
                      Exclusive branding and content ownership across our entire property portfolio including halp.com.au, boutiquedevelopments.com.au, and all associated domains. Your brand becomes the trusted finance partner for our audience.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-2">Mortgage Calculator Integration</h3>
                    <p className="text-muted-foreground">
                      Featured integration on our WordPress-themed property listings powered by Houzez, plus all calculator tools across our network. Capture leads at the critical moment of decision-making.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-2">Multi-Platform Presence</h3>
                    <p className="text-muted-foreground">
                      Your branding across all our websites including property listings, calculators, guides, and educational content. Maximum visibility to engaged property buyers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {benefit.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Google Rankings */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Proven SEO Performance</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {rankings.map((ranking, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl">{ranking.site}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="default" className="text-base">{ranking.ranking}</Badge>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        <span className="font-semibold">Top Keywords:</span> {ranking.keywords}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Domain Portfolio */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Domain Portfolio</h2>
              <div className="space-y-6">
                {domains.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl">{category.category}</CardTitle>
                      <CardDescription>
                        {category.domains.length} premium domains
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.domains.map((domain, domainIndex) => (
                          <Badge key={domainIndex} variant="outline" className="text-sm">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Partner with Us?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contact us to discuss exclusive sponsorship opportunities tailored to your organization
              </p>
              <Button size="lg" asChild>
                <Link to="/apply">Contact Us for Partnership Details</Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Ideal for major banks, non-bank lenders, and mortgage broking firms
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsors;
