
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const ProductCard = ({ title, imageSrc, id = "1" }: { title: string; imageSrc: string; id?: string }) => {
  const isMobile = useIsMobile();
  
  return (
    <Link to={`/product/${id}`} className="block hover:no-underline">
      <div className="flex flex-col items-center group">
        <div className={`w-full ${isMobile ? 'h-40' : 'h-64'} bg-gray-100 rounded-lg mb-4 overflow-hidden`}>
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-lg font-medium text-center text-gray-800 group-hover:text-indigo-600 transition-colors">{title}</h3>
      </div>
    </Link>
  );
};

const ProductDisplay = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 md:py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Product Display Videos/Photos</h2>
        
        <div className="flex justify-center mb-6 md:mb-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6" asChild>
            <Link to="/shop-list">View More</Link>
          </Button>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'} max-w-4xl mx-auto`}>
          <ProductCard 
            title="Used iPhones, A Grade" 
            imageSrc="/lovable-uploads/f38cab13-f016-49bf-b6b8-985824c7bf99.png"
            id="1"
          />
          
          <ProductCard 
            title="Used iPhones, A/A-mix Grade" 
            imageSrc="/lovable-uploads/6b84953c-3f6f-4c0d-9196-0026598d3afe.png"
            id="2"
          />
          
          <ProductCard 
            title="Premium iPhone Collection" 
            imageSrc="/lovable-uploads/75d557cf-c547-4786-ba5b-3857b2022bcd.png"
            id="3"
          />
        </div>
        
        <hr className="my-10 md:my-16 border-gray-200" />
        
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">iPhone Accessories</h2>
        
        <div className="flex justify-center mb-6 md:mb-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6" asChild>
            <Link to="/shop-list">View More</Link>
          </Button>
        </div>
        
        {isMobile ? (
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/f38cab13-f016-49bf-b6b8-985824c7bf99.png" 
                alt="iPhone accessories" 
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/f38cab13-f016-49bf-b6b8-985824c7bf99.png" 
                alt="iPhone accessories" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/6b84953c-3f6f-4c0d-9196-0026598d3afe.png" 
                alt="iPhone models" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/75d557cf-c547-4786-ba5b-3857b2022bcd.png" 
                alt="iPhone retail display" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-center mt-4 space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
        
        <hr className="my-10 md:my-16 border-gray-200" />
        
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-12">Featured iPhone Models</h2>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'} max-w-4xl mx-auto`}>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img 
                src="/lovable-uploads/f38cab13-f016-49bf-b6b8-985824c7bf99.png" 
                alt="iPhone 12" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">iPhone 12 Series</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img 
                src="/lovable-uploads/6b84953c-3f6f-4c0d-9196-0026598d3afe.png" 
                alt="iPhone Pro Models" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">iPhone Pro Models</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
