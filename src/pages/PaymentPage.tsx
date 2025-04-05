import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Title from '@/components/Title';

const PaymentPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Payment" />
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Payment Options</h1>
        <p>This is the payment page. You can integrate various payment methods here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
