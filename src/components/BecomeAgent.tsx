
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const BecomeAgent = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 md:py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-8 md:mb-12 text-center">Become an Agent</h2>
        
        <div className={`flex flex-col ${isMobile ? 'gap-6' : 'md:flex-row items-center gap-8'} max-w-5xl mx-auto`}>
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <h3 className="text-lg font-medium">What you can benefit from becoming an agent?</h3>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-2">
                <span className="font-bold text-gray-700">1.</span>
                <span>In-Depth Product Knowledge</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold text-gray-700">2.</span>
                <span>Access to the Latest Information</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold text-gray-700">3.</span>
                <span>Exclusive Offers and Discounts</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold text-gray-700">4.</span>
                <span>Direct Support from Our Team</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 italic">
              In general, We handle everything else while you take charge of sales.
            </p>
            
            <div className="pt-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6" asChild>
                <Link to="/preregister">Apply Now</Link>
              </Button>
            </div>
          </div>
          
          {!isMobile && (
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1560438718-eb61ede255eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                alt="Business handshake" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BecomeAgent;
