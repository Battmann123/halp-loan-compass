import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CTASection from "@/components/CTASection";
import { TrendingUp, Shield, Users, Package } from "lucide-react";

const InterestRates = () => {
  const rateData = [
    {
      loanType: "Owner Occupier (P&I)",
      variableRate: "6.09% - 6.89%",
      fixedRate: "5.89% - 6.69%",
      comparisonRate: "6.15% - 6.95%"
    },
    {
      loanType: "Investment (P&I)",
      variableRate: "6.39% - 7.19%",
      fixedRate: "6.19% - 6.99%",
      comparisonRate: "6.45% - 7.25%"
    },
    {
      loanType: "Interest Only",
      variableRate: "6.89% - 7.49%",
      fixedRate: "6.69% - 7.29%",
      comparisonRate: "6.95% - 7.55%"
    },
    {
      loanType: "Construction Loans",
      variableRate: "6.29% - 7.09%",
      fixedRate: "6.09% - 6.89%",
      comparisonRate: "6.35% - 7.15%"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "40+ lender network",
      description: "including major banks and non-bank lenders"
    },
    {
      icon: Shield,
      title: "Exclusive broker rates",
      description: "not available direct to public"
    },
    {
      icon: TrendingUp,
      title: "New property specialist rates",
      description: "for houses under 3 years"
    },
    {
      icon: Package,
      title: "Package deals",
      description: "with offset accounts and fee waivers"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Interest Rates & Comparison
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Current Rate Guide (Updated Monthly)
              </p>
            </div>
          </div>
        </section>

        {/* Rates Table Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Current Rate Guide (Updated Monthly)</CardTitle>
                <CardDescription>
                  *Rates are indicative and vary by lender and borrower profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Loan Type</TableHead>
                        <TableHead className="font-semibold">Variable Rate*</TableHead>
                        <TableHead className="font-semibold">Fixed Rate*</TableHead>
                        <TableHead className="font-semibold">Comparison Rate*</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rateData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.loanType}</TableCell>
                          <TableCell>{row.variableRate}</TableCell>
                          <TableCell>{row.fixedRate}</TableCell>
                          <TableCell>{row.comparisonRate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rate Comparison Benefits */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Rate Comparison Benefits</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default InterestRates;
