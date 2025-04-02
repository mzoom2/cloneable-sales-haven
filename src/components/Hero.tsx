
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Hero = () => {
  // Updated to use the uploaded iPhone image
  const PHONE_IMAGE_URL = "/lovable-uploads/6b84953c-3f6f-4c0d-9196-0026598d3afe.png";
  const isMobile = useIsMobile();

  return (
    <section className="relative pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-[#262084] w-full">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        {/* Text content */}
        <div className={`w-full lg:w-1/2 pt-6 md:pt-12 lg:pt-16 space-y-4 md:space-y-6 text-white z-10 ${isMobile ? 'text-center' : ''}`}>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Welcome To Our Sales System
          </h1>
          <p className="text-base md:text-lg max-w-md leading-relaxed opacity-90 mx-auto lg:mx-0">
            The safest marketplace for used devices wholesale. Deepphone has the best deals on used devices.
          </p>
          
          <div className="pt-2 md:pt-4 flex justify-center lg:justify-start">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
              asChild
            >
              <Link to="/preregister">Register Now</Link>
            </Button>
          </div>
          
          {!isMobile && (
            <div className="space-y-5 pt-8">
              <h2 className="text-xl font-semibold">What can you do with our sales system?</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <span>Access the latest price list and stock list</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <span>Make an offer/bid online</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <span>Easily place orders online</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <span>Watch tracking videos shared by our clients</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">5</span>
                  </div>
                  <span>View the order shipment process videos</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">6</span>
                  </div>
                  <span>Apply to become our agent</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 mt-1 bg-red-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs font-bold">7</span>
                  </div>
                  <span>Review the resumes of our sales representatives</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Phone image - hide on mobile */}
        {!isMobile && (
          <div className="w-full lg:w-1/2 flex justify-center pt-8 lg:pt-0 z-10">
            <img 
              src={PHONE_IMAGE_URL} 
              alt="iPhone product display" 
              className="w-full max-w-md h-auto object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
