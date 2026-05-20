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
  Coins,
  Percent,
  Home,
  Calendar,
} from "lucide-react";

const cgtStats = [
  { icon: Percent, value: "50%", label: "CGT discount for individuals holding 12+ mths" },
  { icon: Home, value: "$0", label: "CGT on a true main residence (6-year rule applies)" },
  { icon: Calendar, value: "12 mths", label: "Minimum holding period for 50% discount" },
  { icon: Coins, value: "Marginal", label: "Net gain added to taxable income for the year" },
];

const cgtFAQs = [
  {
    q: "How is capital gains tax calculated on Australian property?",
    a: "CGT = (sale price − cost base) × your marginal tax rate. Individuals who hold the asset 12+ months apply a 50% discount to the gain before adding it to taxable income. Cost base includes purchase price, stamp duty, legal fees, capital improvements, and selling costs (agent commission, marketing).",
  },
  {
    q: "Is my main residence exempt from CGT?",
    a: "Generally yes — the main residence exemption removes CGT on your principal place of residence, provided you have lived there and never used it to produce income. If you rent it out, you can still claim the exemption for up to 6 years using the 'six-year rule', provided you don't claim another main residence during that period.",
  },
  {
    q: "What is the 50% CGT discount?",
    a: "If you're an individual (or a trust distributing to individuals) and you've owned the asset for at least 12 months, you only pay tax on half of the capital gain. Companies do not get the discount. SMSFs get a 33.33% discount.",
  },
  {
    q: "When does CGT have to be paid?",
    a: "CGT is reported in your income tax return for the financial year in which the contract of sale was signed (not settled). If you sign on 28 June 2026, the CGT goes in your 2025–26 return. Plan timing carefully near 30 June.",
  },
  {
    q: "Can I offset capital losses against gains?",
    a: "Yes — capital losses (including losses from prior years carried forward) offset capital gains before the 50% discount is applied. You can't use capital losses to offset normal income, but they can be carried forward indefinitely until you have a gain to offset.",
  },
];

const CapitalGainsGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Capital Gains Tax Guide 2026 — CGT on Australian property"
        description="How CGT works on Australian property sales: the 50% discount for 12+ months holding, main residence exemption, the 6-year rule, cost-base inclusions and timing strategies to minimise tax."
        canonical="https://halp-loan-compass.lovable.app/guides/capital-gains"
        keywords="capital gains tax Australia, CGT property, 50% CGT discount, main residence exemption, 6 year rule"
      />
      <Navigation />
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/calculators/capital-gains"
            className="inline-flex items-center text-white mb-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Capital Gains Tax Calculator Guide
            </h1>
            <p className="text-lg opacity-95">
              CGT on Australian property, in plain English
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <GuideStatsBar stats={cgtStats} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                The basics of CGT on property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Capital gains tax applies when you sell a property for more than
                its cost base. The tax is calculated by adding the discounted
                net gain to your taxable income for the year — there is no
                separate CGT rate.
              </p>
              <p>
                The two largest levers are the 12-month holding rule (which
                halves the gain for individuals) and the main residence
                exemption (which removes CGT entirely on a property you've
                genuinely lived in).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What sits in the cost base</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>Purchase price plus stamp duty and legal/conveyancing fees</div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>Capital improvements (kitchen, extension, granny flat)</div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>Holding costs for non-income-producing periods (rates, interest, insurance)</div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>Selling costs (agent commission, marketing, legal)</div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong>Reduced by:</strong> any Division 40 depreciation
                    claimed during ownership.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <GuideFAQ items={cgtFAQs} />

          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Estimate your CGT</h3>
            <Link to="/calculators/capital-gains">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent"
              >
                Use Capital Gains Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CapitalGainsGuide;
