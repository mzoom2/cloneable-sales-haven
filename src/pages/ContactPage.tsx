
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section with Background */}
      <div className="relative bg-[#002147] pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="bg-[url('/lovable-uploads/5638b9bf-b3f9-4e48-8583-c302a6bc5bb1.png')] bg-cover bg-center h-full w-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-white text-center mt-16 mb-8 opacity-30">
            CONTACT US
          </h1>
        </div>
      </div>
      
      {/* Main Contact Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Red Contact Card */}
          <div className="bg-red-600 text-white rounded-lg shadow-xl p-8 md:p-12 mb-16 relative overflow-hidden -mt-24">
            <h2 className="text-3xl font-bold mb-6">Contact With Us</h2>
            <p className="text-xl mb-10">We will give you the help you need</p>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-center">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mr-6">
                  <Mail className="text-red-600" size={24} />
                </div>
                <span className="text-lg">info@ueephones.com</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mr-6">
                  <Phone className="text-red-600" size={24} />
                </div>
                <span className="text-lg">+85246297806</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mr-6">
                  <MapPin className="text-red-600" size={24} />
                </div>
                <span className="text-lg">No. DD98, LOT54, Kwu Tung North Road(Pak Shek Au Tunnel), Sheung Shui, N.T., Hong Kong</span>
              </div>
            </div>
            
            <div className="bg-white text-gray-700 p-4 rounded-lg">
              <p className="text-center">Your inquiry will be replied to within 24 hours, and we respect your privacy.</p>
            </div>
            
            {/* We are here badge */}
            <div className="absolute top-10 right-10">
              <div className="text-white text-center">
                <div className="italic text-xl mb-1">We are</div>
                <div className="text-2xl font-bold">here!</div>
              </div>
            </div>
            
            {/* Chat Icon */}
            <div className="absolute bottom-10 right-10">
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                <MessageCircle className="text-red-600" size={28} />
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="bg-gray-100 p-6 rounded-lg mb-16">
            <div className="text-center mb-4">
              <p className="text-gray-500">For privacy reasons Google Maps needs your permission to be loaded.</p>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md">
                I Accept
              </button>
            </div>
            <div className="h-[400px] bg-gray-200 rounded-lg"></div>
          </div>
          
          {/* Contact Form Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
            <form className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          
          {/* Contact Info Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ABOUT UEPHONES</h3>
              <p className="text-gray-600">
                UEPHONES is a professional used mobile phone supplier in Hong Kong. We sell to small retailers, repair shops, wholesalers, refurbishers, and smaller distributors around the globe, and up to a 6-month warranty is provided.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">BUY IN BULK</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Used iPhones</li>
                <li>• Used iPads</li>
                <li>• Apple Watch</li>
                <li>• Apple Airpods</li>
                <li>• Samsung Phones</li>
                <li>• Cell Phone Accessories</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">CONTACT INFO</h3>
              <p className="mb-3">
                <strong>Email:</strong> info@ueephones.com
              </p>
              <p className="mb-6">
                <strong>Address:</strong> No. DD98, LOT54, Kwu Tung North Road(Pak Shek Au Tunnel), Sheung Shui, N.T., Hong Kong
              </p>
              
              <div className="w-32 h-32 mx-auto md:mx-0">
                <img 
                  src="/placeholder.svg" 
                  alt="QR Code" 
                  className="w-full h-full"
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

export default ContactPage;
