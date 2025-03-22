
import { useEffect, useRef, useState } from 'react';

interface SpecItemProps {
  label: string;
  value: string;
}

const SpecItem = ({ label, value }: SpecItemProps) => (
  <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const ProductSpecs = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneImageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="specs" className="py-24 bg-gray-50/50 dark:bg-gray-900/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-50/30 dark:bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 transition-all duration-700 opacity-0 translate-y-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A closer look at the cutting-edge technology powering the UEEPhone.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Phone image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative perspective-container">
              <img 
                ref={phoneImageRef}
                src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80" 
                alt="UEEPhone" 
                className="perspective-element w-full max-w-md rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
          
          {/* Specs tabs */}
          <div className="w-full lg:w-1/2">
            <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('performance')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'performance' 
                    ? 'bg-white dark:bg-gray-900 shadow-sm' 
                    : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800'
                }`}
              >
                Performance
              </button>
              <button 
                onClick={() => setActiveTab('display')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'display' 
                    ? 'bg-white dark:bg-gray-900 shadow-sm' 
                    : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800'
                }`}
              >
                Display
              </button>
              <button 
                onClick={() => setActiveTab('camera')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'camera' 
                    ? 'bg-white dark:bg-gray-900 shadow-sm' 
                    : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800'
                }`}
              >
                Camera
              </button>
              <button 
                onClick={() => setActiveTab('battery')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'battery' 
                    ? 'bg-white dark:bg-gray-900 shadow-sm' 
                    : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800'
                }`}
              >
                Battery
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
              {activeTab === 'performance' && (
                <div className="space-y-0">
                  <SpecItem label="Processor" value="Octa-core 4nm UEE X16 Chip" />
                  <SpecItem label="RAM" value="12GB LPDDR5X" />
                  <SpecItem label="Storage" value="256GB / 512GB / 1TB" />
                  <SpecItem label="Operating System" value="UEE OS 15" />
                  <SpecItem label="GPU" value="UEE Adreno 740" />
                  <SpecItem label="Cooling System" value="Vapor Chamber Cooling" />
                  <SpecItem label="Connectivity" value="5G, Wi-Fi 6E, Bluetooth 5.3" />
                  <SpecItem label="GPS" value="Dual-frequency GPS, GLONASS, Galileo" />
                </div>
              )}
              
              {activeTab === 'display' && (
                <div className="space-y-0">
                  <SpecItem label="Screen Size" value='6.7" (170.3 mm)' />
                  <SpecItem label="Resolution" value="3200 x 1440 pixels" />
                  <SpecItem label="Technology" value="LTPO AMOLED" />
                  <SpecItem label="Refresh Rate" value="Adaptive 1-120Hz" />
                  <SpecItem label="Brightness" value="2000 nits (peak)" />
                  <SpecItem label="Protection" value="Ceramic Shield Glass" />
                  <SpecItem label="Features" value="HDR10+, Always-on display" />
                  <SpecItem label="Color Gamut" value="100% DCI-P3" />
                </div>
              )}
              
              {activeTab === 'camera' && (
                <div className="space-y-0">
                  <SpecItem label="Main Camera" value="50MP, f/1.4, OIS" />
                  <SpecItem label="Ultra-wide" value="48MP, f/2.0, 120° FOV" />
                  <SpecItem label="Telephoto" value="12MP, f/2.8, 5x optical zoom" />
                  <SpecItem label="Macro" value="5MP, f/2.4" />
                  <SpecItem label="Front Camera" value="32MP, f/2.2, Autofocus" />
                  <SpecItem label="Video" value="8K@30fps, 4K@60/120fps" />
                  <SpecItem label="Features" value="Night Mode, Smart HDR 4, Portrait Mode" />
                  <SpecItem label="Special Modes" value="Cinematic, Pro, Panorama" />
                </div>
              )}
              
              {activeTab === 'battery' && (
                <div className="space-y-0">
                  <SpecItem label="Capacity" value="5500 mAh" />
                  <SpecItem label="Fast Charging" value="68W wired, 50W wireless" />
                  <SpecItem label="Full Charge" value="30 minutes (wired)" />
                  <SpecItem label="Wireless Charging" value="Qi-compatible" />
                  <SpecItem label="Reverse Charging" value="15W" />
                  <SpecItem label="Power Management" value="AI Battery Optimizer" />
                  <SpecItem label="Standby Time" value="Up to 21 days" />
                  <SpecItem label="Video Playback" value="Up to 25 hours" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
