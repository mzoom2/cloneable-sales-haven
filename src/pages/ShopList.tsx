
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const ShopList = () => {
  // In a real app, this would be based on authentication state
  const isLoggedIn = false;
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Stock List</span>
          </div>
        </div>
      </div>
      
      {/* Currency selector - fixed to right side */}
      <div className="fixed right-0 top-1/3 z-40">
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
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopList;
