import React from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from '@/components/Title';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="About Us" />
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">About Us</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">About UE EPHONE</h1>
          
          <p className="text-gray-700 mb-4">
            Welcome to UE EPHONE, your trusted source for high-quality used iPhones and other mobile devices.
            We are committed to providing reliable products and exceptional customer service.
          </p>
          
          <p className="text-gray-700 mb-4">
            Our mission is to offer affordable and sustainable options for mobile technology, reducing electronic waste
            and promoting a circular economy.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Values</h2>
          
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Quality: We ensure all our devices undergo rigorous testing and certification.</li>
            <li>Sustainability: We are dedicated to reducing e-waste and promoting responsible consumption.</li>
            <li>Customer Satisfaction: We strive to exceed your expectations with every purchase.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
          
          <p className="text-gray-700 mb-4">
            If you have any questions or would like to learn more about our products and services, please don't hesitate
            to <a href="/contact" className="text-blue-500 hover:text-blue-700 underline">contact us</a>.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
