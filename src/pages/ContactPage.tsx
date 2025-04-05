import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Title from '@/components/Title';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Contact Us" />
      <Header />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
