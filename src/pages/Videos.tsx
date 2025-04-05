import React from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from '@/components/Title';

const Videos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Videos" />
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Videos</h1>
        <p>This is the videos page.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Videos;
