import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ConstructionLoans from "./pages/loan-types/ConstructionLoans";
import OffThePlanLoans from "./pages/loan-types/OffThePlanLoans";
import FirstHomeBuyerLoans from "./pages/loan-types/FirstHomeBuyerLoans";
import InvestmentLoans from "./pages/loan-types/InvestmentLoans";
import RefinanceLoans from "./pages/loan-types/RefinanceLoans";
import LowDocLoans from "./pages/loan-types/LowDocLoans";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/disclaimer" element={<Disclaimer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
