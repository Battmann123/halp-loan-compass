import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Calculator, MessageSquare } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  showCalculators?: boolean;
}

const CTASection = ({ 
  title = "Ready to Get Started?",
  description = "Connect with a licensed mortgage broker for expert guidance on your home loan journey.",
  showCalculators = true 
}: CTASectionProps) => {
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Speak with a Broker</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized advice from licensed experts
                </p>
                <Link to="/apply">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {showCalculators && (
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Use Our Calculators</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore different scenarios and plan ahead
                  </p>
                  <Link to="/calculators">
                    <Button variant="outline" className="w-full">View Calculators</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Call Us Direct</h3>
                <p className="text-sm text-muted-foreground">
                  1300 HALP LOANS (1300 4257 5626)
                </p>
                <a href="tel:1300425756626">
                  <Button variant="outline" className="w-full">Call Now</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            No obligation. Free consultation. Licensed Australian Credit Representatives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
