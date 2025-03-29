
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { getCurrentUser, logoutUser } from '@/utils/localStorageUtils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    setIsLoggedIn(!!currentUser);
  }, [location]);

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

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if we're on the contact page
  const isContactPage = location.pathname === '/contact';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isContactPage
            ? 'py-3 bg-white shadow-sm' 
            : 'py-4 bg-[#0c0027]'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="flex items-center">
                <span className="text-red-600 font-bold mr-1">UE</span>
                <span className={scrolled || isContactPage ? 'text-primary' : 'text-white'}>EPHONE</span>
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <Link 
              to="/" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/') 
                  ? (scrolled || isContactPage ? 'text-red-600' : 'text-white bg-[#2a2158] rounded') 
                  : (scrolled || isContactPage ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200')
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/about') 
                  ? (scrolled || isContactPage ? 'text-red-600' : 'text-white bg-[#2a2158] rounded') 
                  : (scrolled || isContactPage ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200')
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/shop-list" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/shop-list') 
                  ? (scrolled || isContactPage ? 'text-red-600' : 'text-white bg-[#2a2158] rounded') 
                  : (scrolled || isContactPage ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200')
              }`}
            >
              Inventory
            </Link>
            <Link 
              to="/ordering-guide" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/ordering-guide') 
                  ? (scrolled || isContactPage ? 'text-red-600' : 'text-white bg-[#2a2158] rounded') 
                  : (scrolled || isContactPage ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200')
              }`}
            >
              Support
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-2 font-medium transition-colors ${
                isActive('/contact') 
                  ? (scrolled || isContactPage ? 'text-red-600 font-bold' : 'text-white bg-[#2a2158] rounded') 
                  : (scrolled || isContactPage ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200')
              }`}
            >
              Contact Us
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isContactPage ? null : (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`relative ${!scrolled && !isContactPage && 'text-white hover:bg-white/10'}`}
                >
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    368
                  </span>
                </Button>
                
                {isLoggedIn ? (
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button 
                    variant={scrolled || isContactPage ? "outline" : "secondary"}
                    size="sm" 
                    className={scrolled || isContactPage ? "bg-white text-black border-gray-200 hover:bg-gray-100" : ""}
                    onClick={handleLogin}
                  >
                    Log in
                  </Button>
                )}
              </>
            )}
            
            {/* Hamburger Menu Button - Visible only on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${!scrolled && !isContactPage && 'text-white hover:bg-white/10'}`}
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
