
import { Button } from "@/components/ui/button";

const ProductCard = ({ title, imageSrc }: { title: string; imageSrc: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
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
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Product Display Videos/Photos</h2>
        
        <div className="flex justify-center mb-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            View More
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <ProductCard 
            title="Used iPhones, A Grade" 
            imageSrc="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
          />
          
          <ProductCard 
            title="Used iPhones, A/A-mix Grade" 
            imageSrc="https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
          />
          
          <ProductCard 
            title="A++ Grade iPhones" 
            imageSrc="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
          />
        </div>
        
        <hr className="my-16 border-gray-200" />
        
        <h2 className="text-2xl font-bold text-center mb-8">Order Shipment Videos/Photos</h2>
        
        <div className="flex justify-center mb-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            View More
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
              alt="Shipment package" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
              alt="Shipping process" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
              alt="Delivery packages" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform"
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-4 space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
        
        <hr className="my-16 border-gray-200" />
        
        <h2 className="text-2xl font-bold text-center mb-12">Product Testing Videos</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                alt="iPhone" 
                className="w-20 h-auto"
              />
            </div>
            <h3 className="text-xl font-medium">iPhone</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                alt="Samsung Phones" 
                className="w-20 h-auto"
              />
            </div>
            <h3 className="text-xl font-medium">Samsung Phones</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
