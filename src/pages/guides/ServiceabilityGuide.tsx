import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import GuideFAQ from "@/components/GuideFAQ";
import GuideStatsBar from "@/components/GuideStatsBar";
import {
  Calculator,
  BookOpen,
  ArrowLeft,
  BarChart3,
  Percent,
  Wallet,
  Users,
  ShieldAlert,
} from "lucide-react";

const serviceabilityStats = [
  { icon: Percent, value: "+3%", label: "APRA stress-test buffer" },
  { icon: Wallet, value: "HEM", label: "Household Expenditure Measure floor" },
  { icon: ShieldAlert, value: "80%", label: "Income shading on bonus/overtime (typical)" },
  { icon: Users, value: "$100K+", label: "Variance between lenders for same profile" },
];

const serviceabilityFAQs = [
  {
    q: "What is loan serviceability?",
    a: "Serviceability is the lender's assessment of whether your income can comfortably cover the loan repayment plus your living expenses, existing debts, and a stress-test buffer. Pass and the loan is approvable; fail and the application is declined regardless of deposit size.",
  },
  {
    q: "What is the APRA stress-test buffer?",
    a: "Since October 2021 APRA has required lenders to assess loan repayments at the actual rate plus 3 percentage points. So at a 6.00% offered rate, the lender models repayments at 9.00% to ensure you can handle rate rises.",
  },
  {
    q: "What is HEM and how is it used?",
    a: "The Household Expenditure Measure (HEM) is a benchmark of minimum living expenses by household size, location and income. Lenders use the higher of HEM or your declared expenses. Understating expenses doesn't help — HEM will floor you.",
  },
  {
    q: "How is variable income (bonus, overtime, commission) treated?",
    a: "Most lenders shade variable income to 80% (some 60–100%) and require a 2-year history. Casual income often needs 12 months in the same role. Rental income is typically shaded to 75–80% to account for vacancies and expenses.",
  },
  {
    q: "Why do different lenders calculate serviceability so differently?",
    a: "Lenders use different living-expense floors, income shading percentages, debt-to-income ceilings, and treatment of HECS, child support and credit card limits. For the same applicant, borrowing capacity can vary $100K+ between lenders — which is why a broker matters.",
  },
];

const ServiceabilityGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Serviceability Guide 2026 — how lenders assess your loan capacity"
        description="How Australian lenders assess serviceability in 2026: the APRA 3% stress test buffer, HEM living expenses, income shading rules, and why borrowing capacity varies $100K+ between lenders."
        canonical="https://halp-loan-compass.lovable.app/guides/serviceability"
        keywords="serviceability calculator, APRA buffer, HEM, income shading, lender serviceability Australia"
      />
      <Navigation />
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/calculators/serviceability"
            className="inline-flex items-center text-white mb-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Serviceability Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              How lenders decide what you can really afford
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GuideStatsBar stats={serviceabilityStats} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                What is Serviceability?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Serviceability is the lender's test of whether your income can
                comfortably cover the proposed loan repayment, your existing
                debts, and your day-to-day living costs — with a buffer in case
                rates rise.
              </p>
              <p>
                Lenders assess at the actual interest rate plus a 3% APRA buffer.
                If the loan still services at that assessment rate after
                accounting for HEM-floored expenses and existing debts, it's
                approvable. If not, the application is declined regardless of how
                much deposit you have.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How lenders calculate it</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <div>
                    <strong>Net income:</strong> base salary plus shaded variable
                    income (bonus/overtime typically at 80%, rental at 75–80%).
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <div>
                    <strong>Subtract living expenses:</strong> the higher of HEM
                    or your declared expenses.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <div>
                    <strong>Subtract existing commitments:</strong> credit cards
                    (assessed on limit), personal loans, HECS, car loans, child
                    support.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <div>
                    <strong>Test at assessment rate:</strong> actual rate + 3%
                    buffer, over 30 years P&I.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <GuideFAQ items={serviceabilityFAQs} />

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Run a serviceability check</h3>
            <Link to="/calculators/serviceability">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent"
              >
                Use Serviceability Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceabilityGuide;
