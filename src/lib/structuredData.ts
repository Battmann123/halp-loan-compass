// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "HALP Home Loans",
  "legalName": "House and Land Packages Pty Ltd",
  "url": "https://halp-loan-compass.lovable.app",
  "logo": "https://halp-loan-compass.lovable.app/halp-logo.png",
  "description": "Expert home loan solutions for house & land packages, new properties, and first home buyers across Australia",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AU"
  },
  "sameAs": [],
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  }
};

// Service Schema for Home Loans
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Mortgage Brokerage",
  "provider": {
    "@type": "FinancialService",
    "name": "HALP Home Loans"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Home Loan Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "House & Land Package Finance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "First Home Buyer Loans"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Construction Loans"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Investment Property Loans"
        }
      }
    ]
  }
};

// Breadcrumb Schema Generator
export const generateBreadcrumb = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://halp-loan-compass.lovable.app${item.url}`
  }))
});

// FAQ Schema Generator
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Calculator Schema
export const calculatorSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AUD"
  },
  "description": description,
  "url": url,
  "provider": {
    "@type": "Organization",
    "name": "HALP Home Loans"
  }
});

// Article Schema for Guides
export const generateArticleSchema = (title: string, description: string, url: string, datePublished: string, dateModified: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": url,
  "datePublished": datePublished,
  "dateModified": dateModified,
  "author": {
    "@type": "Organization",
    "name": "HALP Home Loans"
  },
  "publisher": {
    "@type": "Organization",
    "name": "HALP Home Loans",
    "logo": {
      "@type": "ImageObject",
      "url": "https://halp-loan-compass.lovable.app/halp-logo.png"
    }
  }
});
