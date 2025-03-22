
import { Button } from "@/components/ui/button";

const BecomeAgent = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">Become an Agent</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-lg font-medium">What you can benefit from becoming an agent?</h3>
            
            <div className="space-y-4">
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
                <span>...</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 italic">
              In general, We handle everything else while you take charge of sales.
            </p>
            
            <div className="pt-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                Apply Now
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1560438718-eb61ede255eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
              alt="Business handshake" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAgent;
