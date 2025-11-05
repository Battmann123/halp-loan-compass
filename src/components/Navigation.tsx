import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Home, BookOpen, Menu, X, GitCompare, HelpCircle, FileText, Handshake } from "lucide-react";
import { useState } from "react";
import halpLogo from "@/assets/halp-home-loans-logo.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src={halpLogo} alt="HALP Home Loans" className="h-12 md:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/calculators" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <Calculator className="h-4 w-4" />
              <span className="font-medium">Calculators</span>
            </Link>
            <Link to="/loan-types" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Loan Types</span>
            </Link>
            <Link to="/calculators/lender-comparison" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <GitCompare className="h-4 w-4" />
              <span className="font-medium">Compare Loans</span>
            </Link>
            <Link to="/sponsors" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <Handshake className="h-4 w-4" />
              <span className="font-medium">Sponsors</span>
            </Link>
            <Link to="/faq" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span className="font-medium">FAQ's</span>
            </Link>
            <Link to="/guides" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Guides</span>
            </Link>
            <Link to="/apply">
              <Button variant="default" size="lg" className="bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/calculators" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Calculator className="h-4 w-4" />
              <span className="font-medium">Calculators</span>
            </Link>
            <Link 
              to="/loan-types" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Loan Types</span>
            </Link>
            <Link 
              to="/calculators/lender-comparison" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GitCompare className="h-4 w-4" />
              <span className="font-medium">Compare Loans</span>
            </Link>
            <Link 
              to="/sponsors" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Handshake className="h-4 w-4" />
              <span className="font-medium">Sponsors</span>
            </Link>
            <Link 
              to="/faq" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HelpCircle className="h-4 w-4" />
              <span className="font-medium">FAQ's</span>
            </Link>
            <Link 
              to="/guides" 
              className="flex items-center space-x-2 px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="h-4 w-4" />
              <span className="font-medium">Guides</span>
            </Link>
            <div className="px-4">
              <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" size="lg" className="w-full bg-gradient-to-r from-primary to-accent shadow-lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
