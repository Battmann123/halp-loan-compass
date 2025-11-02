import { Link } from "react-router-dom";
import halpIcon from "@/assets/halp-icon.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={halpIcon} alt="HALP" className="h-12" />
            <p className="text-sm text-muted-foreground">
              Expert home loan solutions for house & land packages across Australia
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/calculators" className="hover:text-primary transition-colors">All Calculators</Link></li>
              <li><Link to="/calculators/repayment" className="hover:text-primary transition-colors">Repayment Calculator</Link></li>
              <li><Link to="/calculators/borrowing-power" className="hover:text-primary transition-colors">Borrowing Power</Link></li>
              <li><Link to="/calculators/stamp-duty" className="hover:text-primary transition-colors">Stamp Duty</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Loan Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/loan-types" className="hover:text-primary transition-colors">All Loan Types</Link></li>
              <li><Link to="/loan-types/construction" className="hover:text-primary transition-colors">Construction Loans</Link></li>
              <li><Link to="/loan-types/first-home-buyer" className="hover:text-primary transition-colors">First Home Buyer</Link></li>
              <li><Link to="/loan-types/investment" className="hover:text-primary transition-colors">Investment Loans</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} House and Land Packages Pty Ltd. Trading as HALP Home Loans.</p>
          <p className="mt-2">ABN: [Your ABN] | Australian Credit Licence: [Your ACL]</p>
          <p className="mt-2 text-xs">
            This website is operated by House and Land Packages Pty Ltd, a lead generator for licensed Australian Credit Representatives.
            All loan applications are subject to credit approval by licensed mortgage brokers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
