import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, BookOpen, ArrowLeft } from "lucide-react";

const ExtraRepaymentsGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/extra-repayments" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Extra Repayments Calculator Guide</h1>
            <p className="text-lg opacity-95">See how extra payments reduce your loan faster</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <Card>
            <CardHeader><CardTitle>Power of Extra Repayments</CardTitle></CardHeader>
            <CardContent>
              <p>Making extra repayments can save tens of thousands in interest and years off your loan. Even $100/month extra makes a significant difference over 30 years.</p>
            </CardContent>
          </Card>
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your Savings</h3>
            <Link to="/calculators/extra-repayments"><Button size="lg" className="bg-gradient-to-r from-primary to-accent">Use Extra Repayments Calculator</Button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ExtraRepaymentsGuide;
