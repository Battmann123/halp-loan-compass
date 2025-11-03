import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Shield, Clock, Award } from "lucide-react";

const Apply = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect with a Licensed Mortgage Broker
          </h1>
          <p className="text-xl opacity-95 mb-6">
            Expert guidance for house & land packages across Australia
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No Obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Licensed Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>24hr Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Free Consultation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <LeadForm source="apply-page" variant="full" />
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose HALP Home Loans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Specialist Expertise</h3>
              <p className="text-muted-foreground">
                We specialize in house & land packages, construction loans, and off-the-plan purchases across Australia.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Licensed Professionals</h3>
              <p className="text-muted-foreground">
                All brokers are fully licensed Australian Credit Representatives with years of experience.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Free Service</h3>
              <p className="text-muted-foreground">
                Our advice is free for you. We're paid by lenders, not by you, so there's no cost for our expertise.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Multiple Lenders</h3>
              <p className="text-muted-foreground">
                Access to a wide panel of lenders to find the best rates and products for your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Apply;
