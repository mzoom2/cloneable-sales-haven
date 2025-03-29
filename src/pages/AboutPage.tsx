
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
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
            ABOUT US
          </h1>
        </div>
      </div>
      
      {/* Main About Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">About UEPHONE</h2>
            <p className="text-lg mb-6">
              UEPHONE is a professional used mobile phone supplier in Hong Kong. We sell to small retailers, repair shops, 
              wholesalers, refurbishers, and smaller distributors around the globe, and up to a 6-month warranty is provided.
            </p>
            <p className="text-lg mb-6">
              Established with a vision to provide quality refurbished devices, our company has grown to become a trusted 
              name in the industry. We pride ourselves on our thorough testing processes and quality control standards.
            </p>
            <p className="text-lg mb-6">
              Our team consists of experts who carefully inspect and refurbish each device to ensure it meets our high 
              standards before being made available to our customers.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutPage;
