import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import {
  Calculator,
  BookOpen,
  ArrowLeft,
  Scale,
  Banknote,
  Sliders,
  Users,
} from "lucide-react";

const lenderStats = [
  { icon: Scale, value: "40+", label: "Lenders compared on rate, fees and policy" },
  { icon: Banknote, value: "0.20–0.40%", label: "Typical investor vs owner-occupier rate gap" },
  { icon: Sliders, value: "Offset", label: "Feature with the largest interest impact" },
  { icon: Users, value: "Self-emp.", label: "Specialist lenders for tricky income" },
];

const lenderFAQs = [
  {
    q: "What should I compare beyond the interest rate?",
    a: "Comparison rate (rate plus fees over the loan term), upfront and ongoing fees, offset/redraw availability, ability to split fixed and variable, repayment frequency options, extra repayment caps on fixed loans, cashback offers, and approval policies for your specific situation.",
  },
  {
    q: "What is a comparison rate and why does it matter?",
    a: "The comparison rate combines the interest rate with most fees to give a single figure that's easier to compare between lenders. By law it's calculated on a $150,000 loan over 25 years, so it's a rough guide — but it does reveal lenders advertising a low headline rate with high fees.",
  },
  {
    q: "Are big-four banks always best?",
    a: "Not necessarily. Smaller banks, mutuals and non-bank lenders often beat the big four on rate and offer more flexible policy for self-employed borrowers, casual income, or temporary visa holders. The big four can be better for complex multi-property portfolios.",
  },
  {
    q: "When does a specialist lender make sense?",
    a: "Specialist lenders cater to non-standard situations: self-employed without two years of returns, temporary visa holders, recent credit events, non-residents, or unique property types (rural, small unit, off-the-plan). Rates are higher but approval is achievable where mainstream banks decline.",
  },
  {
    q: "Should I chase a cashback offer?",
    a: "Cashback ($2K–$4K) is great, but always model the all-in cost including the rate over the next 2–3 years. A loan with 0.20% higher rate but $4,000 cashback often costs more than a no-cashback loan on a $700K+ balance after just 2 years.",
  },
];

const LenderComparisonGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Lender Comparison Guide 2026 — how to pick the right home loan"
        description="A practical framework for comparing Australian home loan lenders: rates, comparison rates, offset, redraw, splits, cashback, specialist lenders for self-employed and non-residents."
        canonical="https://halp-loan-compass.lovable.app/guides/lender-comparison"
        keywords="best home loan Australia, compare home loans, comparison rate, offset account, cashback home loan, specialist lender"
      />
      <Navigation />
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/calculators/lender-comparison"
            className="inline-flex items-center text-white mb-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Lender Comparison Guide
            </h1>
            <p className="text-lg opacity-95">
              The features and fees that actually move the cost needle
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GuideStatsBar stats={lenderStats} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                What to actually compare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Rate & comparison rate:</strong> headline rate plus
                    fees rolled in. Watch for low rates with high ongoing fees.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Offset & redraw:</strong> offset is more flexible
                    but often costs ~$10/month in a package fee. On a $500K+
                    loan it pays for itself many times over.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Split capability:</strong> fix part of the loan and
                    keep part variable for flexibility.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Policy fit:</strong> some lenders are friendlier to
                    self-employed, temporary visa holders or non-residents.
                    Rate is irrelevant if you can't get approved.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Cashback clawback:</strong> 2–4 year window during
                    which the cashback is repayable if you refinance away.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <GuideFAQ items={lenderFAQs} />

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Compare lenders side-by-side</h3>
            <Link to="/calculators/lender-comparison">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent"
              >
                Use Lender Comparison Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LenderComparisonGuide;
