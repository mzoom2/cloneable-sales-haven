
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCurrentUser } from "@/utils/localStorageUtils";
import Title from '@/components/Title';

const Account = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleRegister = () => {
    navigate('/pre-register');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="My Account" />
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">My Account</span>
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
      <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1a0050] mb-8">
            My Account
          </h1>
          
          <div className="space-y-6">
            <p className="text-center text-gray-600 mb-6">
              Please sign in to access your account dashboard or create a new account.
            </p>
            
            <div className="grid gap-4">
              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-base"
              >
                Sign In
              </Button>
              
              <Button 
                onClick={handleRegister}
                variant="outline"
                className="w-full py-6 text-base"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
