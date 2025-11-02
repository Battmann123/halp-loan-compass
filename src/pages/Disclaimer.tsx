import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold">Disclaimer & Important Information</h1>
        </div>

        <Card className="border-2">
          <CardContent className="pt-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">General Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                This website is operated by House and Land Packages Pty Ltd (ABN: [Your ABN]) trading as 
                HALP Home Loans. We are a lead generation service that connects potential borrowers with 
                licensed Australian Credit Representatives and mortgage brokers.
              </p>
              <p className="text-muted-foreground">
                HALP Home Loans is not a credit provider or mortgage broker. We do not provide credit 
                assistance, financial advice, or make credit decisions. All loan applications and credit 
                decisions are made by licensed third-party mortgage brokers and lenders.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Calculator Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                All calculators provided on this website are for general information and estimation purposes 
                only. They do not constitute financial advice, credit assistance, or a guarantee of loan 
                approval or specific loan terms.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Calculator results are based on the information provided and use simplified calculations
                </li>
                <li>
                  Actual loan repayments, interest rates, fees, and charges may vary significantly
                </li>
                <li>
                  Stamp duty, LMI, and grant calculations are estimates and subject to change
                </li>
                <li>
                  Government grant eligibility and amounts vary by state and are subject to change
                </li>
                <li>
                  Individual circumstances, credit history, and lender policies significantly affect outcomes
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Financial Advice Disclaimer</h2>
              <p className="text-muted-foreground">
                The information provided on this website is general in nature and does not take into account 
                your personal financial situation, needs, or objectives. Before making any financial decision 
                or applying for a loan, you should:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>Consider your financial position and requirements</li>
                <li>Read all relevant product disclosure statements and terms and conditions</li>
                <li>Seek independent financial, legal, and tax advice</li>
                <li>Speak with a licensed mortgage broker or financial adviser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Accuracy of Information</h2>
              <p className="text-muted-foreground mb-4">
                While we strive to ensure all information on this website is accurate and current, we make 
                no warranties or representations about:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The accuracy, reliability, or completeness of any information</li>
                <li>The suitability of information for any particular purpose</li>
                <li>The currency of interest rates, fees, charges, or government policies</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Interest rates, fees, charges, government grants, and lending policies change frequently. 
                Always verify current rates and policies with licensed lenders or mortgage brokers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Government Grants & Schemes</h2>
              <p className="text-muted-foreground mb-4">
                Information about government grants (including First Home Owner Grants, stamp duty 
                concessions, and the Home Guarantee Scheme) is subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Specific eligibility criteria that must be met</li>
                <li>Application processes and approval requirements</li>
                <li>Limited availability (e.g., Home Guarantee Scheme places)</li>
                <li>Changes in government policy without notice</li>
                <li>State and territory variations</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Grant estimates do not guarantee approval. You must meet all eligibility requirements 
                and apply through appropriate government channels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground">
                HALP connects you with licensed mortgage brokers who operate independently. We are not 
                responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>The advice, services, or actions of third-party brokers or lenders</li>
                <li>Loan approval decisions or terms offered by lenders</li>
                <li>Delays, errors, or issues in the loan application process</li>
                <li>The quality or outcome of services provided by third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Liability Limitation</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, HALP Home Loans and House and Land Packages Pty Ltd:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>
                  Exclude all liability for any loss, damage, or expense arising from use of this website
                </li>
                <li>
                  Make no warranties about the uninterrupted operation of this website
                </li>
                <li>
                  Are not liable for decisions made based on information from this website
                </li>
                <li>
                  Are not responsible for third-party website content or services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Privacy & Data</h2>
              <p className="text-muted-foreground">
                We collect and handle personal information in accordance with the Privacy Act 1988 (Cth) 
                and Australian Privacy Principles. When you submit your details through our website, you 
                consent to us sharing your information with licensed mortgage brokers who may contact you 
                to discuss your home loan needs. Please refer to our Privacy Policy for full details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Lending Criteria</h2>
              <p className="text-muted-foreground">
                All loan applications are subject to lender approval and lending criteria. Factors 
                affecting loan approval include but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>Credit history and credit score</li>
                <li>Employment status and income verification</li>
                <li>Existing debts and financial commitments</li>
                <li>Property type, location, and valuation</li>
                <li>Deposit amount and source of funds</li>
              </ul>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have questions about this disclaimer or any information on this website, 
                please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>House and Land Packages Pty Ltd</p>
                <p>Trading as: HALP Home Loans</p>
                <p>Email: info@halp.com.au</p>
                <p>Website: www.halp.com.au</p>
              </div>
            </section>

            <section className="bg-muted/50 p-6 rounded-lg mt-6">
              <p className="text-sm text-muted-foreground font-medium">
                Last Updated: November 2024
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This disclaimer may be updated from time to time. Continued use of this website 
                constitutes acceptance of any updates to this disclaimer.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;
