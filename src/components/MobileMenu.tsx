
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Facebook, Twitter, Linkedin, Instagram, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div 
      className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Log in / Sign Up</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:bg-transparent hover:text-gray-700">
            <X size={24} />
          </Button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-auto">
          <ul className="p-4 space-y-4">
            <li>
              <Link 
                to="/" 
                className="block py-3 px-4 text-[#6c5ce7] bg-[#f3f0ff] rounded-md font-medium"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/shop-list" 
                className="block py-3 px-4 text-gray-800 font-medium"
                onClick={onClose}
              >
                Stock List
              </Link>
            </li>
            <li>
              <Link 
                to="/videos" 
                className="block py-3 px-4 text-gray-800 font-medium"
                onClick={onClose}
              >
                <div className="flex items-center justify-between">
                  <span>Videos</span>
                  <ChevronRight size={20} />
                </div>
              </Link>
            </li>
            <li>
              <Link 
                to="/ordering-guide" 
                className="block py-3 px-4 text-gray-800 font-medium"
                onClick={onClose}
              >
                Ordering Guide
              </Link>
            </li>
            <li>
              <Link 
                to="/account" 
                className="block py-3 px-4 text-gray-800 font-medium"
                onClick={onClose}
              >
                My account
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Contact Information */}
        <div className="border-t p-4 space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">Call us</h3>
            <a href="tel:+1123456789" className="text-[#6c5ce7] font-medium block">+&#40;1&#41; 123 456 789</a>
            <p className="text-gray-600 my-2">329 Queensberry Street, North Melbourne</p>
            <p className="text-gray-600">VIC 3051, Australia.</p>
            <a href="mailto:hi@educrat.com" className="text-gray-600 block mt-2">hi@educrat.com</a>
          </div>
          
          {/* Social Media Links */}
          <div className="flex space-x-6 pt-2">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        {/* Currency Selector */}
        <div className="flex flex-col absolute top-1/3 right-0">
          <button className="bg-blue-700 text-white py-2 px-4 font-medium">
            USD $
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 font-medium">
            EUR €
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
