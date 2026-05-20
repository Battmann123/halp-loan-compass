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
  TrendingUp,
  Calendar,
  PiggyBank,
  Clock,
} from "lucide-react";

const extraStats = [
  { icon: Calendar, value: "Fortnightly", label: "= 13 monthly equivalents per year" },
  { icon: Clock, value: "4–5 yrs", label: "Saved by paying fortnightly vs monthly" },
  { icon: TrendingUp, value: "$60K+", label: "Interest saved by $200/mo extra ($500K loan)" },
  { icon: PiggyBank, value: "Day 1", label: "When extra repayments are most powerful" },
];

const extraFAQs = [
  {
    q: "How much do extra repayments really save?",
    a: "On a $500,000 loan at 6.00% over 30 years, an extra $200 per month saves approximately $99,000 in interest and shortens the loan by 5 years 8 months. An extra $500 per month saves around $200,000 in interest and shortens the loan by 10+ years.",
  },
  {
    q: "Why does paying fortnightly save so much?",
    a: "If your monthly repayment is $3,000 and you pay $1,500 every fortnight, you make 26 payments per year — equivalent to 13 monthly payments instead of 12. That extra payment is applied directly to the principal, compounding over the life of the loan.",
  },
  {
    q: "Is it better to make extra repayments or use an offset account?",
    a: "Both save the same amount of interest. The difference: extra repayments reduce the loan balance directly (you'd need to redraw to access them), while offset keeps funds in a transaction account you can use at any time. Offset is better for liquidity, extra repayments are simpler.",
  },
  {
    q: "Can I make extra repayments on a fixed-rate loan?",
    a: "Most fixed-rate loans allow $10,000–$30,000 in extra repayments per year (lender dependent). Paying more than the cap or fully discharging the loan early often triggers break costs, which can be significant if rates have fallen.",
  },
  {
    q: "Should I prioritise extra repayments or investing?",
    a: "It depends on your after-tax return comparison. Paying off a home loan at 6.0% is a guaranteed 6.0% after-tax return — equivalent to roughly 9.0% pre-tax for someone in the 32.5% bracket. Investing might out-earn that over the long term, but with risk. Many advisers suggest a balance once an emergency fund is in place.",
  },
];

const ExtraRepaymentsGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Extra Repayments Guide — save years and thousands on your home loan"
        description="How extra repayments compound: weekly vs fortnightly vs monthly, offset vs extra repayments, fixed-rate caps, and worked examples showing $60K–$200K of interest savings."
        canonical="https://halp-loan-compass.lovable.app/guides/extra-repayments"
        keywords="extra repayments calculator, fortnightly repayments savings, offset vs extra repayments, pay off mortgage faster"
      />
      <Navigation />
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/calculators/extra-repayments"
            className="inline-flex items-center text-white mb-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Extra Repayments Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              How small extra payments shave years and thousands off your mortgage
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GuideStatsBar stats={extraStats} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                The power of compounding extra repayments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Every extra dollar paid against your loan principal reduces the
                base on which future interest is calculated. The earlier you
                make those extra payments, the longer they compound — which is
                why $100/month extra from year 1 saves far more than the same
                $100/month from year 10.
              </p>
              <p>
                Three high-impact, low-effort moves: switch from monthly to
                fortnightly, redirect tax returns straight onto the loan, and
                round up your repayment to the nearest $100.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Worked examples on a $500K loan @ 6.00% / 30 yrs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>+$100/mo:</strong> saves ~$54,000 interest, shaves
                    ~3 yrs.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>+$200/mo:</strong> saves ~$99,000 interest, shaves
                    ~5 yrs 8 months.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>+$500/mo:</strong> saves ~$200,000+ interest, shaves
                    10+ yrs.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Fortnightly half-payments:</strong> saves ~$80,000
                    interest, shaves ~4–5 yrs at zero effort.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <GuideFAQ items={extraFAQs} />

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">See your own numbers</h3>
            <Link to="/calculators/extra-repayments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent"
              >
                Use Extra Repayments Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExtraRepaymentsGuide;
