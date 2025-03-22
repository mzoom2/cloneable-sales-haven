
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

// We'll use a placeholder for the phone image - you'd replace this with your actual asset
const PHONE_IMAGE_URL = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80";

const Hero = () => {
  const phoneRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate the mouse position as a percentage of the viewport
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      
      // Apply subtle rotation based on mouse position
      phoneRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * 5}deg) 
        rotateX(${-y * 5}deg)
      `;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-100/20 dark:bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        {/* Text content */}
        <div className="w-full lg:w-1/2 pt-12 lg:pt-20 space-y-6 animate-fade-in-up">
          <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-primary bg-primary/5 rounded-full">
            New Release
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            The Next Generation
            <span className="block font-light">Smartphone Experience</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Discover unparalleled performance and cutting-edge technology with the all new UEEPhone - designed to transform how you connect with the world.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="animated-button">
              Pre-order Now
            </Button>
            <Button variant="outline" className="animated-button">
              Learn More
            </Button>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="text-sm">2-Year Warranty</span>
            </div>
          </div>
        </div>
        
        {/* Phone image */}
        <div className="w-full lg:w-1/2 flex justify-center pt-12 lg:pt-0 perspective-container">
          <img 
            ref={phoneRef}
            src={PHONE_IMAGE_URL} 
            alt="UEEPhone smartphone" 
            className="perspective-element w-full max-w-md h-auto object-contain animate-fade-in delay-300 transition-transform cursor-pointer"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
          />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-subtle">
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
