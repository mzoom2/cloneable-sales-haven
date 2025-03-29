
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Shield, Clock, Truck } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section with Background */}
      <div className="relative bg-black pt-24 pb-16">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-12 mb-8">
            UEPHONE in Brief
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-white">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-red-600 rounded-full w-2 h-2 flex-shrink-0"></div>
                  <span>Year Established: 2012</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-red-600 rounded-full w-2 h-2 flex-shrink-0"></div>
                  <span>Business Type: Wholesale only</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-red-600 rounded-full w-2 h-2 flex-shrink-0"></div>
                  <span>Monthly Sales Volume: 10,000-40,000pcs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-red-600 rounded-full w-2 h-2 flex-shrink-0"></div>
                  <span>Location: Hong Kong</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-red-600 rounded-full w-2 h-2 flex-shrink-0"></div>
                  <span>Supply Chain: used cell phones and cell phone accessories</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-red-600 rounded-full w-2 h-2 flex-shrink-0"></div>
                  <span>Featured Service: cell phone repair service and cell phone recycling service for Apple and Samsung.</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black bg-opacity-70 p-4 border border-gray-800 rounded-lg text-center text-white flex flex-col items-center">
                <div className="mb-3 text-red-600">
                  <img src="/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png" alt="iPhone" className="w-20 h-auto mx-auto" />
                </div>
                <h3 className="font-medium mb-2">MOQ: 10 pcs for all phones</h3>
              </div>
              
              <div className="bg-black bg-opacity-70 p-4 border border-gray-800 rounded-lg text-center text-white flex flex-col items-center">
                <div className="mb-3 text-red-600">
                  <div className="bg-red-600 p-2 rounded-full inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium mb-2">Price: Tiered pricing is provided according to quantity/amount.</h3>
              </div>
              
              <div className="bg-black bg-opacity-70 p-4 border border-gray-800 rounded-lg text-center text-white flex flex-col items-center">
                <div className="mb-3 text-red-600">
                  <div className="bg-red-600 p-2 rounded-full inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M15 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M19.32 14.9 16.3 7.34a1.5 1.5 0 0 0-2.16-.88C8.87 9.45 8.87 14.56 14.14 17.5c1.73.95 3.17.42 3.83-.47l1.35-2.12Z" />
                      <path d="M9.7 17.5c-5.27-2.93-5.27-8.05 0-11.04a1.5 1.5 0 0 1 2.16.88l3.03 7.56" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium mb-2">Payment: Bank Transfer, Western Union, USDT, Moneygram, Cash</h3>
              </div>
              
              <div className="bg-black bg-opacity-70 p-4 border border-gray-800 rounded-lg text-center text-white flex flex-col items-center">
                <div className="mb-3 text-red-600">
                  <div className="bg-red-600 p-2 rounded-full inline-block">
                    <Truck className="text-white" />
                  </div>
                </div>
                <h3 className="font-medium mb-2">Delivery Time: Orders typically arrive within 2-3 working days from France inventory.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image and Description Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png" 
                alt="UEPHONE Warehouse" 
                className="w-full h-auto rounded-lg shadow-lg" 
              />
            </div>
            <div>
              <p className="text-lg mb-6">
                UEPHONE is a professional used cell phone wholesale supplier in Hong Kong since 2012. While the bulk of our inventory is made up of used iPhones, Samsung phones, iPads, and Apple Watches. We have a branch in France with a stock of over 1,000 used iPhones in very good condition in France.
              </p>
              <p className="text-lg mb-6">
                We sell to small retailers, repair shops, wholesalers, refurbishers, and smaller distributors around the globe.
              </p>
              <p className="text-lg mb-6">
                We are committed to delivering one-stop solutions covering used cell phone wholesale, cell phone accessories wholesale, cell phone repair services as well as cell phone recycling services for cell phone distributors, wholesalers, refurbishment factories, repair facilities, as well as online retailers.
              </p>
              <p className="text-lg mb-6">
                Our priority is supplying only top-quality products. Our values are simple: aim to offer our customers the most competitive price & excellent customer service & best quality. Finally, achieve long-term & stable win-win cooperation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png" 
                alt="Quality Guarantee" 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <h3 className="text-xl font-bold mb-4">Quality Guarantee</h3>
              <p className="text-gray-700">
                UEPHONE provides up to a 6-month warranty (Long-term cooperation, long-term warranty) for cell phones, supporting return for refurbishment or replacement within 15 days of the parcel delivery date.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png" 
                alt="Fast Delivery" 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
              <p className="text-gray-700">
                Consistent inventory of cell phones in both Hong Kong and France. We have a branch in France with a stock of over 1,000 used iPhones in very good condition. Our France inventory can be delivered to most European countries with orders typically arriving within 2-3 working days.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img 
                src="/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png" 
                alt="Hassle Free Service" 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <h3 className="text-xl font-bold mb-4">Hassle Free Service</h3>
              <p className="text-gray-700">
                Fast and secure logistics solutions, quick after-sales support, and a sales representative ensure you stay updated on stock and never miss a price drop.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-[#002147] text-white relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Are You Looking For Cell Phone Wholesale Supplier?</h2>
          <p className="mb-8 text-lg">Your inquiry will be replied to within 24 hours and we respect your privacy.</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-md text-lg font-medium">
            Start Buying
          </Button>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">About UEPHONE</h3>
              <p className="text-gray-700 mb-4">
                UEPHONE is a professional used mobile phone supplier in Hong Kong. We sell to small retailers, repair shops, wholesalers, refurbishers, and smaller distributors around the globe and up to a 6-month warranty is provided.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">Buy in Bulk</h3>
              <ul className="space-y-2">
                <li className="text-gray-700 hover:text-red-600 cursor-pointer">
                  › Used iPhones
                </li>
                <li className="text-gray-700 hover:text-red-600 cursor-pointer">
                  › Used iPads
                </li>
                <li className="text-gray-700 hover:text-red-600 cursor-pointer">
                  › Apple Watch
                </li>
                <li className="text-gray-700 hover:text-red-600 cursor-pointer">
                  › Apple Airpods
                </li>
                <li className="text-gray-700 hover:text-red-600 cursor-pointer">
                  › Samsung Phones
                </li>
                <li className="text-gray-700 hover:text-red-600 cursor-pointer">
                  › Cell Phone Accessories
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">Contact Info</h3>
              <p className="text-gray-700 mb-2">
                Email: info@uephone.com
              </p>
              <p className="text-gray-700">
                Address: No. D098, LG1-04, Kwu Tung North Road(Pak Shek Au Tunnel), Sheung Shui, N.T., Hong Kong
              </p>
              <div className="mt-4">
                <img 
                  src="/lovable-uploads/8b0759ae-90d5-4f0a-9807-77c8d6da0e8d.png" 
                  alt="QR Code" 
                  className="w-32 h-32" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutPage;
