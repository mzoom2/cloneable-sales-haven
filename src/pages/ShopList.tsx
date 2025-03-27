
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/localStorageUtils";

const ShopList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    setIsLoggedIn(!!currentUser);
  }, []);
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Stock List</span>
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
      <div className="flex-grow container mx-auto px-4 py-16">
        {isLoggedIn ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Stock List</h1>
            <p className="mb-4 text-lg text-gray-700">Welcome to your exclusive stock list.</p>
            
            {/* This is where actual stock list content would go */}
            <div className="bg-white rounded-lg shadow p-6 mt-4">
              <p className="text-gray-500 italic">Your personalized stock list will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1a0050] mb-8">
              Please login to view stock list.
            </h1>
            
            <div className="flex justify-center">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="lg"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopList;
