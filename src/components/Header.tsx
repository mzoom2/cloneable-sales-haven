
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-3 bg-white/90 dark:bg-black/90 shadow-sm backdrop-blur-lg' 
            : 'py-4 bg-[#0c0027]'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="flex items-center">
                <span className="text-red-600 font-bold mr-1">UE</span>
                <span className={scrolled ? 'text-primary' : 'text-white'}>EPHONE</span>
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <Link 
              to="/" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/') 
                  ? 'text-white bg-[#2a2158] rounded' 
                  : (scrolled ? 'text-gray-700 hover:text-primary/80' : 'text-white hover:text-gray-200')
              }`}
            >
              Home
            </Link>
            <Link 
              to="/shop-list" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/shop-list') 
                  ? 'text-white bg-[#2a2158] rounded' 
                  : (scrolled ? 'text-gray-700 hover:text-primary/80' : 'text-white hover:text-gray-200')
              }`}
            >
              Stock List
            </Link>
            <div className="px-4 py-2 font-medium cursor-pointer flex items-center gap-1 transition-colors">
              <span className={scrolled ? 'text-gray-700' : 'text-white'}>Videos</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <Link 
              to="/ordering-guide" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/ordering-guide') 
                  ? 'text-white bg-[#2a2158] rounded' 
                  : (scrolled ? 'text-gray-700 hover:text-primary/80' : 'text-white hover:text-gray-200')
              }`}
            >
              Ordering Guide
            </Link>
            <Link 
              to="/account" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/account') 
                  ? 'text-white bg-[#2a2158] rounded' 
                  : (scrolled ? 'text-gray-700 hover:text-primary/80' : 'text-white hover:text-gray-200')
              }`}
            >
              My Account
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className={`relative ${!scrolled && 'text-white hover:bg-white/10'}`}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                368
              </span>
            </Button>
            <Button 
              variant={scrolled ? "outline" : "secondary"}
              size="sm" 
              className={scrolled ? "bg-white text-black border-gray-200 hover:bg-gray-100" : ""}
              onClick={handleLogin}
            >
              Log in
            </Button>
            
            {/* Hamburger Menu Button - Visible only on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${!scrolled && 'text-white hover:bg-white/10'}`}
              onClick={toggleMobileMenu}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
