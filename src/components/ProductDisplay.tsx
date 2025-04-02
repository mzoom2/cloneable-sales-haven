
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
  
  // Updated to use real wholesale iPhone images
  const products = [
    {
      title: "Used iPhones, A Grade",
      imageSrc: "https://www.bulkmobiles.com/images/product/large/iphone-xs-max-unlocked-used-wholesale-bulk.jpg"
    },
    {
      title: "Used iPhones, A/A-mix Grade",
      imageSrc: "https://i0.wp.com/www.mytrendyphone.co.uk/images/Original-Used-Apple-iPhone-6S-Plus-16GB-Gold-01042020-01-p.jpg"
    },
    {
      title: "Premium iPhone Collection",
      imageSrc: "https://www.bulkmobiles.com/images/product/large/apple-iphone-7-plus-used-wholesale-bulk.jpg"
    }
  ];
  
  // Updated to use real wholesale accessories images
  const accessories = [
    "https://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/article_images/2020/08/best-usb-c-cables-grid.jpg",
    "https://www.bulkmobiles.com/images/product/large/wholesale-bulk-otter-box-cases.jpg",
    "https://www.bulkmobiles.com/images/product/large/wholesale-bulk-iphone-lcd-screen-digitizer.jpg"
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
                src="https://www.bulkmobiles.com/images/product/large/iphone-8-unlocked-used-wholesale-bulk.jpg" 
                alt="iPhone 12" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">iPhone 12 Series</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img 
                src="https://www.bulkmobiles.com/images/product/large/iphone-x-unlocked-used-wholesale-bulk.jpg" 
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
