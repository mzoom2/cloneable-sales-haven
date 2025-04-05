import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Title from '@/components/Title';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="About Us" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">About Us</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to UEEphone, your trusted source for high-quality used iPhones, Samsung phones, and cell phone accessories.
          We are dedicated to providing reliable products and excellent customer service.
        </p>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make technology affordable and accessible to everyone. We carefully inspect and certify each device
            to ensure it meets our strict quality standards.
          </p>
        </section>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-600 leading-relaxed">
            <li>Wide selection of iPhones and Samsung phones</li>
            <li>Certified and inspected devices</li>
            <li>Competitive prices</li>
            <li>Excellent customer support</li>
            <li>Fast and reliable shipping</li>
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">Our Team</h2>
          <p className="text-gray-600 leading-relaxed">
            We are a team of passionate individuals with years of experience in the mobile technology industry.
            Our goal is to provide you with the best possible shopping experience.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
