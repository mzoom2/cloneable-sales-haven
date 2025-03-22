
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 dark:bg-black/80 shadow-sm backdrop-blur-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">UEE</span>
          <span className="text-2xl font-light">Phone</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Features
          </a>
          <a href="#specs" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Specifications
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Pricing
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Contact
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:flex"
          >
            Sign In
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="animated-button"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
