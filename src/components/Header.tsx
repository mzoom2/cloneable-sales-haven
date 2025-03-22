
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

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
          ? 'py-3 bg-white/90 dark:bg-black/90 shadow-sm backdrop-blur-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-primary">
            <span className="flex items-center">
              <span className="text-red-600 font-bold mr-1">UE</span>
              <span>EPHONE</span>
            </span>
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop List
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Videos
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Ordering Guide
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary/80 transition-colors">
            My Account
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white text-black border-gray-200 hover:bg-gray-100"
          >
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
