import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import BecomeAgent from '@/components/BecomeAgent';
import Title from '@/components/Title';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Home" />
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <BecomeAgent />
      <Footer />
    </div>
  );
};

export default Index;
