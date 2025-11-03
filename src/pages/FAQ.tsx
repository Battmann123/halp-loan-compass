import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CTASection from "@/components/CTASection";

const FAQ = () => {
  const faqCategories = [
    {
      category: "General Home Loans",
      questions: [
        {
          question: "What deposit do I need for a home loan?",
          answer: "With the 5% deposit scheme, eligible first home buyers can purchase with just 5% deposit (government guarantees the remaining 15%). Standard loans typically require 10-20% deposit depending on your situation and lender."
        },
        {
          question: "How much can I borrow?",
          answer: "Generally, you can borrow 4-6 times your annual income, but this depends on your expenses, credit history, and chosen lender. Our borrowing power calculator provides personalized estimates."
        },
        {
          question: "What's the difference between variable and fixed rates?",
          answer: "Variable rates can change with market conditions but often start lower. Fixed rates provide certainty for 1-5 years. Many borrowers choose a split loan combining both options."
        }
      ]
    },
    {
      category: "House & Land Packages",
      questions: [
        {
          question: "How do construction loans work?",
          answer: "You pay interest only on funds drawn down during construction, with progress payments released at key milestones (slab, frame, lockup, practical completion). Full principal and interest payments begin after completion."
        },
        {
          question: "What if my build is delayed?",
          answer: "Construction loans typically allow 12 months to complete. Extensions are usually available, and we work with builders to minimize delays and coordinate alternative accommodation if needed."
        },
        {
          question: "Can I make changes during construction?",
          answer: "Minor changes are usually possible during early stages, but may impact loan approval amounts and settlement timing. Major changes require lender re-assessment."
        }
      ]
    },
    {
      category: "School Zones",
      questions: [
        {
          question: "How accurate is your school zone data?",
          answer: "We source directly from state education departments and update boundaries annually. Our system shows official catchment boundaries, not approximate distances like other platforms."
        },
        {
          question: "What if school zones change after I buy?",
          answer: "School zone changes are rare but possible. We provide historical data and trend analysis to help identify stable catchments. Property values in good school zones typically maintain premium positioning regardless."
        },
        {
          question: "Do private schools affect property values?",
          answer: "Yes, proximity to quality private schools also influences property values. Our data includes both public and private school locations with performance metrics."
        }
      ]
    },
    {
      category: "First Home Buyers",
      questions: [
        {
          question: "What government grants am I eligible for?",
          answer: "This varies by state, income, and property type. Our calculator assesses your eligibility across all available schemes including First Home Owner Grants, stamp duty concessions, and the 5% deposit scheme."
        },
        {
          question: "Do I need lenders mortgage insurance (LMI)?",
          answer: "LMI is typically required for loans over 80% LVR, but the 5% deposit scheme waives this requirement. We can also arrange lender-paid LMI options in some cases."
        },
        {
          question: "Should I buy new or established property?",
          answer: "New properties offer depreciation benefits, warranties, lower maintenance costs, and energy efficiency. Established properties may offer more location choices and immediate settlement. We help you weigh these factors based on your goals."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about home loans, financing, and the HALP process
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, questionIndex) => (
                        <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                          <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
