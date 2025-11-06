import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Scale, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const LenderComparisonCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [loanType, setLoanType] = useState("variable");
  const [showComparison, setShowComparison] = useState(false);

  // Sample lender data (in real implementation, this would come from an API)
  const allLenders = [
    {
      name: "Commonwealth Bank",
      rate: 6.24,
      comparisonRate: 6.31,
      offset: true,
      redraw: true,
      applicationFee: 600,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Split loans", "Mobile app"],
      rating: 4.5,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "Westpac",
      rate: 6.29,
      comparisonRate: 6.35,
      offset: true,
      redraw: true,
      applicationFee: 600,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Rate lock", "Lifestyle benefits"],
      rating: 4.3,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "ANZ",
      rate: 6.19,
      comparisonRate: 6.27,
      offset: true,
      redraw: true,
      applicationFee: 0,
      monthlyFee: 15,
      features: ["Offset account", "Redraw", "Break fee cashback", "Mobile app"],
      rating: 4.4,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "NAB",
      rate: 6.34,
      comparisonRate: 6.39,
      offset: true,
      redraw: true,
      applicationFee: 600,
      monthlyFee: 0,
      features: ["Offset account", "Redraw", "No monthly fee", "Extra repayments"],
      rating: 4.2,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "Macquarie Bank",
      rate: 5.99,
      comparisonRate: 6.08,
      offset: true,
      redraw: false,
      applicationFee: 0,
      monthlyFee: 0,
      features: ["Offset account", "No fees", "Online only", "Fast approval"],
      rating: 4.6,
      loanTypes: ["variable", "fixed", "split", "investment"],
    },
    {
      name: "ING",
      rate: 6.09,
      comparisonRate: 6.14,
      offset: false,
      redraw: true,
      applicationFee: 0,
      monthlyFee: 0,
      features: ["No fees", "Redraw", "Extra repayments", "Online banking"],
      rating: 4.5,
      loanTypes: ["variable", "fixed", "firstHome"],
    },
    {
      name: "Suncorp Bank",
      rate: 6.15,
      comparisonRate: 6.22,
      offset: true,
      redraw: true,
      applicationFee: 400,
      monthlyFee: 8,
      features: ["Offset account", "Redraw", "Insurance discounts", "Extra repayments"],
      rating: 4.3,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "Bank of Queensland",
      rate: 6.27,
      comparisonRate: 6.33,
      offset: true,
      redraw: true,
      applicationFee: 0,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Regional expertise", "Mobile app"],
      rating: 4.1,
      loanTypes: ["variable", "fixed", "split", "investment"],
    },
    {
      name: "Bankwest",
      rate: 6.12,
      comparisonRate: 6.19,
      offset: true,
      redraw: true,
      applicationFee: 600,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Extra repayments", "Split loans"],
      rating: 4.4,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "UBank",
      rate: 5.94,
      comparisonRate: 6.04,
      offset: false,
      redraw: true,
      applicationFee: 0,
      monthlyFee: 0,
      features: ["No fees", "Redraw", "Online banking", "Fast approval"],
      rating: 4.5,
      loanTypes: ["variable", "fixed", "firstHome"],
    },
    {
      name: "Adelaide Bank",
      rate: 6.31,
      comparisonRate: 6.38,
      offset: true,
      redraw: true,
      applicationFee: 350,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Local service", "Extra repayments"],
      rating: 4.2,
      loanTypes: ["variable", "fixed", "split", "investment"],
    },
    {
      name: "Bendigo Bank",
      rate: 6.28,
      comparisonRate: 6.35,
      offset: true,
      redraw: true,
      applicationFee: 600,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Community banking", "Mobile app"],
      rating: 4.3,
      loanTypes: ["variable", "fixed", "split", "investment", "firstHome"],
    },
    {
      name: "AMP Bank",
      rate: 6.17,
      comparisonRate: 6.24,
      offset: true,
      redraw: true,
      applicationFee: 600,
      monthlyFee: 10,
      features: ["Offset account", "Redraw", "Extra repayments", "Fast settlement"],
      rating: 4.2,
      loanTypes: ["variable", "fixed", "split", "investment"],
    },
    {
      name: "Athena Home Loans",
      rate: 5.89,
      comparisonRate: 5.97,
      offset: false,
      redraw: true,
      applicationFee: 0,
      monthlyFee: 0,
      features: ["No fees", "Digital only", "Rate tracker", "Fast approval"],
      rating: 4.7,
      loanTypes: ["variable", "firstHome"],
    },
    {
      name: "Pepper Money",
      rate: 6.45,
      comparisonRate: 6.52,
      offset: false,
      redraw: true,
      applicationFee: 995,
      monthlyFee: 12,
      features: ["Alt-doc loans", "Redraw", "Self-employed", "Flexible criteria"],
      rating: 4.0,
      loanTypes: ["variable", "investment"],
    },
  ];

  // Filter lenders based on selected loan type
  const lenders = allLenders.filter(lender => lender.loanTypes.includes(loanType));

  const calculateRepayment = (rate: number) => {
    const principal = parseFloat(loanAmount || "500000");
    const monthlyRate = rate / 100 / 12;
    const numPayments = 30 * 12;
    
    return principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const sortedLenders = [...lenders].sort((a, b) => a.rate - b.rate);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <Scale className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Lender Comparison Tool
          </h1>
          <p className="text-lg opacity-95">
            Compare 40+ Australian lenders side by side
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <Link to="/calculators">
              <Button variant="outline">← Back to All Calculators</Button>
            </Link>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Loan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="500000"
                  />
                </div>
                <div>
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select value={loanType} onValueChange={setLoanType}>
                    <SelectTrigger id="loanType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="variable">Variable Rate</SelectItem>
                      <SelectItem value="fixed">Fixed Rate</SelectItem>
                      <SelectItem value="split">Split Loan</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                      <SelectItem value="firstHome">First Home Buyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => setShowComparison(true)}>
                  Compare Lenders
                </Button>
              </div>
            </CardContent>
          </Card>

          {showComparison && (
            <>
              <div className="mb-6 flex gap-2 items-center text-sm text-muted-foreground">
                <span>Showing top lenders for ${parseFloat(loanAmount).toLocaleString()} loan</span>
                <Badge variant="secondary">Updated Daily</Badge>
              </div>

              <div className="grid gap-6">
                {sortedLenders.map((lender, index) => {
                  const monthlyRepayment = calculateRepayment(lender.rate);
                  const lowestRate = index === 0;

                  return (
                    <Card key={index} className={lowestRate ? "border-primary border-2" : ""}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {lender.name}
                              {lowestRate && <Badge className="bg-green-600">Lowest Rate</Badge>}
                            </CardTitle>
                            <div className="flex gap-4 mt-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Interest Rate</p>
                                <p className="text-2xl font-bold text-primary">{lender.rate}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Comparison Rate</p>
                                <p className="text-lg font-semibold">{lender.comparisonRate}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Monthly Repayment</p>
                                <p className="text-lg font-semibold">
                                  ${monthlyRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-500 text-xl mb-1">
                              {"★".repeat(Math.floor(lender.rating))}{"☆".repeat(5 - Math.floor(lender.rating))}
                            </div>
                            <p className="text-xs text-muted-foreground">{lender.rating}/5.0</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm font-semibold mb-2">Fees</p>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Application</span>
                                <span className="font-medium">
                                  {lender.applicationFee === 0 ? (
                                    <span className="text-green-600">$0</span>
                                  ) : (
                                    `$${lender.applicationFee}`
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Monthly</span>
                                <span className="font-medium">
                                  {lender.monthlyFee === 0 ? (
                                    <span className="text-green-600">$0</span>
                                  ) : (
                                    `$${lender.monthlyFee}`
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold mb-2">Key Features</p>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                {lender.offset ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span>Offset Account</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {lender.redraw ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span>Redraw Facility</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold mb-2">Additional Features</p>
                            <div className="flex flex-wrap gap-1">
                              {lender.features.map((feature, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex gap-2">
                          <Link to="/apply" className="flex-1">
                            <Button className="w-full">Get This Rate</Button>
                          </Link>
                          <Link to="/apply" className="flex-1">
                            <Button variant="outline" className="w-full">More Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Understanding Comparison Rates</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    The <strong>comparison rate</strong> helps you understand the true cost of a loan by combining 
                    the interest rate with most fees and charges. It's calculated on a $150,000 loan over 25 years.
                  </p>
                  <p className="mt-4">
                    <strong>Important:</strong> Your actual rate and fees may differ based on your loan amount, 
                    property value, deposit size, and individual circumstances. The comparison rate doesn't include 
                    all fees (e.g., redraw fees, early exit fees).
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Why Use a Mortgage Broker?</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Broker Benefits</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Access to 40+ lenders (not just the big 4)</li>
                    <li>✓ Better rates through wholesale channels</li>
                    <li>✓ Expert matching to your situation</li>
                    <li>✓ Free service (lenders pay us)</li>
                    <li>✓ Handle all paperwork and applications</li>
                    <li>✓ Pre-approval expertise</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Going Direct</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Limited to one lender's products</li>
                    <li>• May miss better deals elsewhere</li>
                    <li>• Advertised rates vs actual rates differ</li>
                    <li>• Time-consuming to compare multiple banks</li>
                    <li>• Each application affects credit score</li>
                    <li>• No independent advice</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-primary/10 p-4 rounded-lg">
                <p className="font-semibold mb-2">Let us do the hard work!</p>
                <p className="text-sm">
                  Our brokers compare all major lenders, negotiate on your behalf, and find features that 
                  match your needs - not just the lowest rate. We'll even handle the entire application process.
                </p>
                <Link to="/">
                  <Button className="mt-4">Get Your Free Comparison</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Rates and fees shown are indicative only and change daily. Actual rates depend on your loan amount, 
                deposit, credit history, employment, and property. Not all applicants will qualify for advertised rates.
              </p>
              <p>
                For current rates and a personalized comparison, please{" "}
                <Link to="/" className="text-primary hover:underline">contact our mortgage brokers</Link> for a free consultation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LenderComparisonCalculator;
