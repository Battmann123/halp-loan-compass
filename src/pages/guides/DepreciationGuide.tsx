import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import { Calculator, BookOpen, ArrowLeft, TrendingDown, DollarSign, Percent, Hammer, Sofa } from "lucide-react";

const depreciationStats = [
  { icon: Percent, value: "2.5%", label: "Div 43 capital works rate over 40 years" },
  { icon: Hammer, value: "$5K–$15K", label: "Typical Year 1 deduction on a new build" },
  { icon: Sofa, value: "Div 40", label: "Plant & equipment depreciation rates vary" },
  { icon: TrendingDown, value: "9 May 2017", label: "Cut-off for P&E claims on second-hand homes" },
];

const depreciationFAQs = [
  {
    q: "What is property depreciation?",
    a: "Depreciation is a non-cash tax deduction reflecting the wear and tear of a building and its assets. It comes in two streams: Division 43 capital works (the building structure, depreciated at 2.5% per year over 40 years for buildings built after 16 September 1987) and Division 40 plant and equipment (carpets, blinds, appliances, etc.).",
  },
  {
    q: "Can I claim depreciation on a second-hand property?",
    a: "For residential property bought after 9 May 2017, you generally cannot claim Division 40 plant and equipment on second-hand items — only on items you install yourself. Division 43 capital works is still claimable. Commercial property and new residential are unaffected by this rule.",
  },
  {
    q: "Do I need a quantity surveyor's depreciation schedule?",
    a: "Yes — to maximise legitimate deductions you need a tax-deductible depreciation schedule prepared by a qualified quantity surveyor. They typically cost $600–$800 once-off and routinely uncover $5,000+ in first-year deductions, especially on newer properties.",
  },
  {
    q: "How much depreciation can I expect on a new build?",
    a: "A new $600K investment property often produces $8,000–$15,000 in deductions in year one (combined Div 40 and Div 43), tapering over time. Older properties usually produce $2,000–$5,000 per year of Div 43 only.",
  },
  {
    q: "How does depreciation affect capital gains tax?",
    a: "Division 40 deductions reduce your cost base for CGT — so depreciation is effectively recouped at sale. However, you get the benefit of the deduction now and the cost later (often at a 50% CGT discount), so it remains a net win in most cases.",
  },
];


const DepreciationGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Depreciation Guide 2026 — Division 40 & 43 for property investors"
        description="How property depreciation works in Australia: Division 43 capital works at 2.5% over 40 years, Division 40 plant and equipment, the 9 May 2017 second-hand rule, and how to maximise claims."
        canonical="https://halp-loan-compass.lovable.app/guides/depreciation"
        keywords="property depreciation Australia, Division 40, Division 43, quantity surveyor depreciation schedule, investment property tax"
      />
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/depreciation" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Depreciation Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              Maximize tax deductions on investment properties
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GuideStatsBar stats={depreciationStats} />

          
          <Card>
            <CardHeader>
              <CardTitle>What is Property Depreciation?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Depreciation allows you to claim tax deductions for the wear and tear of your investment 
                property's structure and fixtures over time. This is one of the most valuable tax benefits 
                for property investors.
              </p>
              <p className="font-semibold">Two Types of Depreciation:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Capital Works (Division 43):</strong> Building structure at 2.5% per year over 40 years</li>
                <li><strong>Plant & Equipment (Division 40):</strong> Removable items like carpets, blinds, appliances</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Real-World Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">New Apartment Built in 2023</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Property Value:</span>
                    <span className="font-medium">$550,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Construction Cost:</span>
                    <span className="font-medium">$400,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Year Built:</span>
                    <span className="font-medium">2023</span>
                  </div>
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <p className="font-semibold">Annual Depreciation Claims:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Year 1:</span>
                      <span className="font-medium">$18,500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Year 2:</span>
                      <span className="font-medium">$16,200</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Year 3:</span>
                      <span className="font-medium">$14,800</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Year 5:</span>
                      <span className="font-medium">$12,500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t font-bold">
                      <span>5-Year Total:</span>
                      <span className="text-primary text-lg">$72,000</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <span>Tax Refund @ 37%:</span>
                      <span className="font-bold text-primary">$26,640</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Depreciation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Get a Quantity Surveyor Report:</strong> Essential for maximizing claims. Costs $400-$700 
                    but typically returns $10,000+ in extra deductions.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>New Properties = Best Returns:</strong> Newer properties have higher depreciation. 
                    Properties built after 1985 can claim capital works.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Second-Hand Asset Rules:</strong> Since 2017, plant & equipment depreciation is limited 
                    for established properties (capital works still available).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Keep Renovation Records:</strong> Improvements and renovations create new depreciation 
                    opportunities, even on older properties.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Depreciation</h3>
            <Link to="/calculators/depreciation">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Use Depreciation Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepreciationGuide;
