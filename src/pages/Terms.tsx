import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg opacity-95">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                By accessing and using this website, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>HALP Home Loans operates as a lead generation service that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provides mortgage calculators and educational resources</li>
                <li>Connects users with licensed Australian Credit Representatives</li>
                <li>Facilitates communication between users and mortgage brokers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculator Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                While we strive for accuracy, our calculators provide estimates only. Actual loan terms, rates,
                and costs may vary. Always consult with a licensed mortgage broker for accurate financial advice
                specific to your situation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>No Financial Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This website provides general information only and does not constitute financial advice.
                All loan applications are subject to credit approval by licensed mortgage brokers and lenders.
                You should obtain professional advice before making any financial decisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Relationship</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                House and Land Packages Pty Ltd receives referral fees from licensed Australian Credit
                Representatives for introductions made through this website. This does not affect the cost
                of services to you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>When using our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of any account credentials</li>
                <li>Not misuse or attempt to harm our services</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To the extent permitted by law, House and Land Packages Pty Ltd shall not be liable for any
                indirect, incidental, special, or consequential damages arising from your use of this website
                or services provided through it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the website after
                changes constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                For questions about these Terms of Service:<br />
                Email: legal@halphomeloans.com.au<br />
                Phone: 1300 HALP LOANS (1300 4257 5626)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
