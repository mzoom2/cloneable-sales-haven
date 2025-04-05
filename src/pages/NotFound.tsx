
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center bg-slate-50 py-16">
        <div className="max-w-md w-full px-6 py-10 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
          <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          
          <p className="text-gray-600 mb-6">
            The page you're looking for at <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{location.pathname}</span> doesn't exist or has been moved.
          </p>
          
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
