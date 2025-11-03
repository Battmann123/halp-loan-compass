import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, BookOpen, ArrowLeft } from "lucide-react";

const CapitalGainsGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/calculators/capital-gains" className="inline-flex items-center text-white mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Calculator
          </Link>
          <div className="text-center text-white">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Capital Gains Tax Calculator Guide</h1>
            <p className="text-lg opacity-95">Calculate CGT on investment property sales</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <Card>
            <CardHeader><CardTitle>Capital Gains Tax (CGT)</CardTitle></CardHeader>
            <CardContent>
              <p>CGT applies when you sell an investment property for more than you paid. Hold for 12+ months to receive 50% CGT discount. Your main residence is CGT-exempt.</p>
            </CardContent>
          </Card>
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your CGT</h3>
            <Link to="/calculators/capital-gains"><Button size="lg" className="bg-gradient-to-r from-primary to-accent">Use CGT Calculator</Button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CapitalGainsGuide;
