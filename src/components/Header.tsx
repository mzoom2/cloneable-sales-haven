import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { getCurrentUser, logoutUser } from '@/utils/localStorageUtils';
import CartDropdown from './CartDropdown';
import { useCart } from '@/contexts/CartContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  
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

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToOffers = () => {
    navigate('/offers');
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
            
            {/* Inventory Navigation Menu with Dropdown */}
            <NavigationMenu className="p-0">
              <NavigationMenuList className="space-x-0">
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`p-0 px-4 py-2 bg-transparent font-medium hover:bg-transparent ${
                      isActive('/shop-list') 
                        ? (scrolled || isContactPage ? 'text-red-600' : 'text-white bg-[#2a2158] rounded') 
                        : (scrolled || isContactPage ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200')
                    }`}
                  >
                    Inventory
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 gap-0 min-w-[800px] p-4">
                      {/* Used iPhones Column */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Used iPhones</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/shop-list?category=iphone&model=16" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 16/16 Plus/16 Pro/16 Pro Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=15" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 15/15 Plus/15 Pro/15 Pro Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=14" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 14/14 Plus/14 Pro/14 Pro Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=13" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 13/13 Mini/13 Pro/13 Pro Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=12" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 12/12 Mini/12 Pro/12 Pro Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=11" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 11/11 Pro/11 Pro Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=X" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone X/XR/XS/XS Max
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=8" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone 8/8 Plus
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=iphone&model=europe" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Wholesale iPhone from Europe
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=ipad" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Used iPads
                            </Link>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Samsung Phones Column */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Samsung Phones</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/shop-list?category=samsung&model=s24" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S24/S24+/S24 Ultra
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s23" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S23/S23+/S23 Ultra
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s22" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S22/S22+/S22 Ultra
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s21" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S21/S21+/S21 Ultra
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s20" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S20/S20+/S20 Ultra
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s10" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S10/S10+/S10e
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s9" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S9/S9+
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=s8" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy S8/S8+
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=samsung&model=note" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Galaxy Note 10/Note 10+
                            </Link>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Cell Phone Accessories Column */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Cell Phone Accessories</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/shop-list?category=accessories&type=iphone-parts" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> iPhone Parts
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=accessories&type=samsung-parts" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Samsung Parts
                            </Link>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Services Column */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-3">Service</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/shop-list?category=service&type=repair" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Cell Phone Repairing
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list?category=service&type=recycling" className="text-sm hover:text-red-600 flex items-center">
                              <span className="text-red-600 mr-2">►</span> Cell Phone Recycling
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={`relative ${!scrolled && !isContactPage && 'text-white hover:bg-white/10'}`}
                    >
                      <ShoppingCart size={20} />
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none" align="end">
                    <div className="min-w-[300px]">
                      <div className="flex border-b">
                        <button
                          className="py-3 px-6 font-medium flex-1 text-center border-b-2 border-purple-600"
                          onClick={goToCart}
                        >
                          Cart
                        </button>
                        <button
                          className="py-3 px-6 font-medium flex-1 text-center"
                          onClick={goToOffers}
                        >
                          Offers
                        </button>
                      </div>
                      <div className="p-4 text-center">
                        <p className="mb-4">You have {getTotalItems()} item(s) in your cart</p>
                        <div className="flex justify-between gap-2">
                          <Button variant="outline" className="flex-1" onClick={goToCart}>
                            View Cart
                          </Button>
                          <Button className="flex-1" onClick={goToOffers}>
                            Offers
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
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
      
      {/* Cart Dropdown - now only for the full view */}
      <CartDropdown isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
