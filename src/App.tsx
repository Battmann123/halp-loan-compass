import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import LoanTypes from "./pages/LoanTypes";
import RepaymentCalculator from "./pages/calculators/RepaymentCalculator";
import BorrowingPowerCalculator from "./pages/calculators/BorrowingPowerCalculator";
import StampDutyCalculator from "./pages/calculators/StampDutyCalculator";
import GovernmentGrantsCalculator from "./pages/calculators/GovernmentGrantsCalculator";
import ServiceabilityCalculator from "./pages/calculators/ServiceabilityCalculator";
import LMICalculator from "./pages/calculators/LMICalculator";
import UpfrontCostsCalculator from "./pages/calculators/UpfrontCostsCalculator";
import InvestmentPropertyCalculator from "./pages/calculators/InvestmentPropertyCalculator";
import CapitalGainsCalculator from "./pages/calculators/CapitalGainsCalculator";
import DepreciationCalculator from "./pages/calculators/DepreciationCalculator";
import RefinanceCalculator from "./pages/calculators/RefinanceCalculator";
import ExtraRepaymentsCalculator from "./pages/calculators/ExtraRepaymentsCalculator";
import LenderComparisonCalculator from "./pages/calculators/LenderComparisonCalculator";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Apply from "./pages/Apply";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ConstructionLoans from "./pages/loan-types/ConstructionLoans";
import OffThePlanLoans from "./pages/loan-types/OffThePlanLoans";
import FirstHomeBuyerLoans from "./pages/loan-types/FirstHomeBuyerLoans";
import InvestmentLoans from "./pages/loan-types/InvestmentLoans";
import RefinanceLoans from "./pages/loan-types/RefinanceLoans";
import LowDocLoans from "./pages/loan-types/LowDocLoans";
import RepaymentGuide from "./pages/guides/RepaymentGuide";
import BorrowingPowerGuide from "./pages/guides/BorrowingPowerGuide";
import StampDutyGuide from "./pages/guides/StampDutyGuide";
import GovernmentGrantsGuide from "./pages/guides/GovernmentGrantsGuide";
import InvestmentPropertyGuide from "./pages/guides/InvestmentPropertyGuide";
import RefinanceGuide from "./pages/guides/RefinanceGuide";
import DepreciationGuide from "./pages/guides/DepreciationGuide";
import LMIGuide from "./pages/guides/LMIGuide";
import UpfrontCostsGuide from "./pages/guides/UpfrontCostsGuide";
import ServiceabilityGuide from "./pages/guides/ServiceabilityGuide";
import CapitalGainsGuide from "./pages/guides/CapitalGainsGuide";
import ExtraRepaymentsGuide from "./pages/guides/ExtraRepaymentsGuide";
import LenderComparisonGuide from "./pages/guides/LenderComparisonGuide";
import FAQ from "./pages/FAQ";
import Guides from "./pages/Guides";
import Sponsors from "./pages/Sponsors";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/repayment" element={<RepaymentCalculator />} />
          <Route path="/calculators/borrowing-power" element={<BorrowingPowerCalculator />} />
          <Route path="/calculators/stamp-duty" element={<StampDutyCalculator />} />
          <Route path="/calculators/government-grants" element={<GovernmentGrantsCalculator />} />
          <Route path="/calculators/serviceability" element={<ServiceabilityCalculator />} />
          <Route path="/calculators/lmi" element={<LMICalculator />} />
          <Route path="/calculators/upfront-costs" element={<UpfrontCostsCalculator />} />
          <Route path="/calculators/investment-property" element={<InvestmentPropertyCalculator />} />
          <Route path="/calculators/capital-gains" element={<CapitalGainsCalculator />} />
          <Route path="/calculators/depreciation" element={<DepreciationCalculator />} />
          <Route path="/calculators/refinance" element={<RefinanceCalculator />} />
          <Route path="/calculators/extra-repayments" element={<ExtraRepaymentsCalculator />} />
          <Route path="/calculators/lender-comparison" element={<LenderComparisonCalculator />} />
          <Route path="/loan-types" element={<LoanTypes />} />
          <Route path="/loan-types/construction" element={<ConstructionLoans />} />
          <Route path="/loan-types/off-the-plan" element={<OffThePlanLoans />} />
          <Route path="/loan-types/first-home-buyer" element={<FirstHomeBuyerLoans />} />
          <Route path="/loan-types/investment" element={<InvestmentLoans />} />
          <Route path="/loan-types/refinance" element={<RefinanceLoans />} />
          <Route path="/loan-types/low-doc" element={<LowDocLoans />} />
          <Route path="/guides/repayment" element={<RepaymentGuide />} />
          <Route path="/guides/borrowing-power" element={<BorrowingPowerGuide />} />
          <Route path="/guides/stamp-duty" element={<StampDutyGuide />} />
          <Route path="/guides/government-grants" element={<GovernmentGrantsGuide />} />
          <Route path="/guides/investment-property" element={<InvestmentPropertyGuide />} />
          <Route path="/guides/refinance" element={<RefinanceGuide />} />
          <Route path="/guides/depreciation" element={<DepreciationGuide />} />
          <Route path="/guides/lmi" element={<LMIGuide />} />
          <Route path="/guides/upfront-costs" element={<UpfrontCostsGuide />} />
          <Route path="/guides/serviceability" element={<ServiceabilityGuide />} />
          <Route path="/guides/capital-gains" element={<CapitalGainsGuide />} />
          <Route path="/guides/extra-repayments" element={<ExtraRepaymentsGuide />} />
          <Route path="/guides/lender-comparison" element={<LenderComparisonGuide />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
