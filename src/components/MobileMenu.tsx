import { useEffect, useState } from 'react';
import { X, ChevronsRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { getCurrentUser, logoutUser } from '@/utils/localStorageUtils';
import { useCurrency } from '@/contexts/CurrencyContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currency, setCurrency } = useCurrency();
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    setIsLoggedIn(!!currentUser);
  }, []);
  
  // Handle login button click
  const handleLogin = () => {
    onClose();
    navigate('/login');
  };
  
  // Handle logout button click
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    onClose();
    navigate('/');
  };
  
  // Toggle submenu
  const toggleSubmenu = (key: string) => {
    setIsSubmenuOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Close menu when a link is clicked
  const handleLinkClick = (path: string) => {
    onClose();
    navigate(path);
  };
  
  // Determine if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Menu variants for animation
  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };
  
  // Item variants for animation
  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - using dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Menu panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-lg flex flex-col"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <p className="font-semibold text-lg">Menu</p>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={24} />
              </Button>
            </div>
            
            {/* Currency selector */}
            <div className="px-4 py-3 border-b">
              <p className="font-medium mb-2">Select Currency</p>
              <div className="flex space-x-2">
                <Button 
                  variant={currency === 'USD' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrency('USD')}
                  className="flex-1"
                >
                  USD ($)
                </Button>
                <Button 
                  variant={currency === 'EUR' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrency('EUR')}
                  className="flex-1"
                >
                  EUR (€)
                </Button>
              </div>
            </div>
            
            {/* Menu items */}
            <div className="flex-1 overflow-y-auto">
              <motion.nav className="flex flex-col">
                {/* Main pages */}
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/')}
                >
                  Home
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/shop-list') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/shop-list')}
                >
                  Stock List
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/videos') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/videos')}
                >
                  Videos
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/ordering-guide') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/ordering-guide')}
                >
                  Ordering Guide
                </motion.div>
                
                {/* Account related */}
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/account') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/account')}
                >
                  My Account
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/cart') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/cart')}
                >
                  Cart
                </motion.div>
                
                {/* Inventory with submenu */}
                <motion.div variants={itemVariants} className="border-b">
                  <div 
                    className="p-4 flex justify-between items-center"
                    onClick={() => toggleSubmenu('inventory')}
                  >
                    <span>Inventory</span>
                    <ChevronsRight 
                      size={18} 
                      className={`transition-transform ${isSubmenuOpen.inventory ? 'rotate-90' : ''}`}
                    />
                  </div>
                  
                  {/* Submenu for inventory */}
                  {isSubmenuOpen.inventory && (
                    <div className="bg-gray-50 py-2">
                      <div 
                        className="px-6 py-2 hover:bg-gray-100"
                        onClick={() => handleLinkClick('/shop-list?category=iphone')}
                      >
                        iPhones
                      </div>
                      <div 
                        className="px-6 py-2 hover:bg-gray-100"
                        onClick={() => handleLinkClick('/shop-list?category=samsung')}
                      >
                        Samsung
                      </div>
                      <div 
                        className="px-6 py-2 hover:bg-gray-100"
                        onClick={() => handleLinkClick('/shop-list?category=accessories')}
                      >
                        Accessories
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {/* Other pages */}
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/about') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/about')}
                >
                  About Us
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className={`p-4 border-b ${isActive('/contact') && 'bg-gray-100'}`}
                  onClick={() => handleLinkClick('/contact')}
                >
                  Contact Us
                </motion.div>
              </motion.nav>
            </div>
            
            {/* Footer with login/logout */}
            <div className="p-4 border-t">
              {isLoggedIn ? (
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="default"
                  className="w-full"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
