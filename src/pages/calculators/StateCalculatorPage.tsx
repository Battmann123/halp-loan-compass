import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ChevronRight, MapPin } from "lucide-react";
import StampDutyCalculator from "./StampDutyCalculator";
import GovernmentGrantsCalculator from "./GovernmentGrantsCalculator";
import {
  STATE_NAMES,
  STATE_AUTHORITY,
  STAMP_DUTY_BY_STATE,
  GRANTS_BY_STATE,
  type StateSlug,
} from "@/lib/seo/stateData";
import type { AusState } from "@/lib/engine";

const VALID_STATES: StateSlug[] = ["nsw", "vic", "qld", "wa", "sa", "tas", "act", "nt"];
const BASE_URL = "https://halp-loan-compass.lovable.app";

interface StateCalculatorPageProps {
  variant: "stamp-duty" | "government-grants";
  // Restrict to states this calculator has pages for
  allowedStates?: StateSlug[];
}

const CALCULATOR_LABEL = {
  "stamp-duty": "Stamp Duty Calculator",
  "government-grants": "Government Grants Calculator",
} as const;

const StateCalculatorPage = ({ variant, allowedStates = VALID_STATES }: StateCalculatorPageProps) => {
  const { state: stateParam } = useParams<{ state: string }>();
  const slug = (stateParam ?? "").toLowerCase() as StateSlug;

  if (!allowedStates.includes(slug)) {
    return <Navigate to={`/calculators/${variant}`} replace />;
  }

  const stateName = STATE_NAMES[slug];
  const authority = STATE_AUTHORITY[slug];
  const calcLabel = CALCULATOR_LABEL[variant];
  const copy = variant === "stamp-duty" ? STAMP_DUTY_BY_STATE[slug] : GRANTS_BY_STATE[slug];
  const highlights = variant === "stamp-duty" ? STAMP_DUTY_BY_STATE[slug].thresholdHighlights : GRANTS_BY_STATE[slug].highlights;

  const pageTitle =
    variant === "stamp-duty"
      ? `${stateName} Stamp Duty Calculator 2025 — Transfer Duty Rates & FHB Concessions`
      : `${stateName} First Home Buyer Grants Calculator — FHOG, Stamp Duty & 5% Deposit Scheme`;

  const pageDescription =
    variant === "stamp-duty"
      ? `Calculate ${stateName} stamp duty in seconds. Current 2025 transfer duty rates, first home buyer concessions, foreign purchaser surcharge and all upfront fees.`
      : `See every grant and concession available to first home buyers in ${stateName} — FHOG, stamp duty exemptions, Help to Buy, 5% deposit scheme and FHSS. Updated 2025.`;

  const canonical = `${BASE_URL}/calculators/${variant}/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${BASE_URL}/calculators` },
      { "@type": "ListItem", position: 3, name: calcLabel, item: `${BASE_URL}/calculators/${variant}` },
      { "@type": "ListItem", position: 4, name: stateName, item: canonical },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const otherStates = allowedStates.filter((s) => s !== slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link to="/calculators" className="hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Calculators
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={`/calculators/${variant}`} className="hover:text-primary">{calcLabel}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{stateName}</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">{stateName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {variant === "stamp-duty"
              ? `${stateName} Stamp Duty Calculator`
              : `${stateName} First Home Buyer Grants Calculator`}
          </h1>
          <p className="text-lg text-muted-foreground">{copy.intro}</p>
        </header>

        {/* Highlights */}
        <Card className="border-2 mb-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">
              Key {stateName} {variant === "stamp-duty" ? "duty" : "grant"} thresholds (2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Source:{" "}
              <a href={authority.url} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">
                {authority.name}
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Calculator */}
        <section aria-labelledby="calc-heading" className="mb-12">
          <h2 id="calc-heading" className="text-2xl font-bold mb-4">
            Calculate your {stateName} {variant === "stamp-duty" ? "stamp duty" : "grant entitlements"}
          </h2>
          {variant === "stamp-duty" ? (
            <StampDutyCalculator initialState={slug} lockState embedded />
          ) : (
            <GovernmentGrantsCalculator initialState={slug.toUpperCase() as AusState} lockState embedded />
          )}
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="text-2xl font-bold mb-4">
            {stateName} {variant === "stamp-duty" ? "stamp duty" : "first home buyer"} FAQs
          </h2>
          <Accordion type="single" collapsible className="border rounded-lg">
            {copy.faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="px-4">
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Other states */}
        <section aria-labelledby="other-heading" className="mb-8">
          <h2 id="other-heading" className="text-xl font-semibold mb-3">
            {calcLabel} for other states
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherStates.map((s) => (
              <Link
                key={s}
                to={`/calculators/${variant}/${s}`}
                className="px-3 py-1.5 text-sm rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {STATE_NAMES[s]}
              </Link>
            ))}
            <Link
              to={`/calculators/${variant}`}
              className="px-3 py-1.5 text-sm rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
            >
              All states
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StateCalculatorPage;
