
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from '@/components/Title';

const PreRegister = () => {
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType) {
      // Store the user type in session/local storage if needed
      // localStorage.setItem('userType', userType);
      
      // Navigate to the registration page
      navigate('/register', { state: { userType } });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Pre-Registration" />
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">Pre-Registration</span>
          </div>
        </div>
      </div>
      
      {/* Currency selector - fixed to right side, positioned higher */}
      <div className="fixed right-0 top-1/4 z-40">
        <div className="flex flex-col">
          <button className="bg-blue-700 text-white py-2 px-4 font-medium">
            USD $
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 font-medium">
            EUR €
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-gray-700 text-xl mb-6 font-medium">
            Before you create an account, tell us more about you.
          </h1>
          
          <form onSubmit={handleSubmit}>
            <RadioGroup value={userType} onValueChange={setUserType} className="space-y-5">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="business" id="business" className="mt-1" />
                <Label htmlFor="business" className="text-gray-700 font-normal cursor-pointer">
                  I have a wholesale or retail business.
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="personal" id="personal" className="mt-1" />
                <Label htmlFor="personal" className="text-gray-700 font-normal cursor-pointer">
                  I don't have a wholesale or retail business. I'm looking to buy a phone or phones for personal use.
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="starting" id="starting" className="mt-1" />
                <Label htmlFor="starting" className="text-gray-700 font-normal cursor-pointer">
                  I'm looking into starting a wholesale or retail business.
                </Label>
              </div>
            </RadioGroup>
            
            <p className="text-gray-600 text-sm mt-4 mb-8">
              Select the choice that best describes you.
            </p>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!userType}
                className="bg-teal-500 hover:bg-teal-600 text-white px-10"
              >
                Go
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PreRegister;
