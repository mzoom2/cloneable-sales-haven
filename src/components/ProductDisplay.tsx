
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductCard = ({ title, imageSrc }: { title: string; imageSrc: string }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-center">
      <div className={`w-full ${isMobile ? 'h-40' : 'h-64'} bg-gray-100 rounded-lg mb-4 overflow-hidden`}>
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="text-lg font-medium text-center">{title}</h3>
    </div>
  );
};

const ProductDisplay = () => {
  const isMobile = useIsMobile();
  
  // Updated to use wholesale images
  const products = [
    {
      title: "Used iPhones, A Grade",
      imageSrc: "/lovable-uploads/f38cab13-f016-49bf-b6b8-985824c7bf99.png"
    },
    {
      title: "Used iPhones, A/A-mix Grade",
      imageSrc: "/lovable-uploads/2213ba6e-4049-4822-aec3-9945966ee6d5.png"
    },
    {
      title: "Premium iPhone Collection",
      imageSrc: "/lovable-uploads/75d557cf-c547-4786-ba5b-3857b2022bcd.png"
    }
  ];
  
  // Updated to use wholesale images
  const accessories = [
    "/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png",
    "/lovable-uploads/be05eb0d-d6ae-4c82-a3d9-671e71e89016.png",
    "/lovable-uploads/391c0f05-6d37-4158-9461-c1682ffa41f7.png"
  ];
  
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Product Display Videos/Photos</h2>
        
        <div className="flex justify-center mb-6 md:mb-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            View More
          </Button>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'} max-w-4xl mx-auto`}>
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              title={product.title} 
              imageSrc={product.imageSrc}
            />
          ))}
        </div>
        
        <hr className="my-10 md:my-16 border-gray-200" />
        
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">iPhone Accessories</h2>
        
        <div className="flex justify-center mb-6 md:mb-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            View More
          </Button>
        </div>
        
        {isMobile ? (
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={accessories[0]} 
                alt="iPhone accessories" 
                className="w-full h-56 object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {accessories.map((src, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img 
                  src={src} 
                  alt={`iPhone accessories ${index + 1}`} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
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
                src="/lovable-uploads/2213ba6e-4049-4822-aec3-9945966ee6d5.png" 
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
