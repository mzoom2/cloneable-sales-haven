import React from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from '@/components/Title';

const OrderingGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Ordering Guide" />
      <Header />
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Ordering Guide</span>
          </div>
        </div>
      </div>
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            Ordering Guide
          </h1>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              How to Place an Order
            </h2>
            <ol className="list-decimal pl-5 text-gray-600">
              <li className="mb-2">
                Browse our <a href="/shop-list" className="text-blue-500 hover:underline">Stock List</a> to find the products you need.
              </li>
              <li className="mb-2">
                Add the desired items to your cart.
              </li>
              <li className="mb-2">
                Proceed to checkout and provide your shipping and payment information.
              </li>
              <li className="mb-2">
                Review your order and confirm.
              </li>
              <li className="mb-2">
                You will receive an order confirmation email with tracking information once your order is shipped.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Payment Options
            </h2>
            <p className="text-gray-600">
              We accept the following payment methods:
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li className="mb-1">Credit Cards (Visa, MasterCard, American Express)</li>
              <li className="mb-1">PayPal</li>
              <li className="mb-1">Bank Transfers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Shipping Information
            </h2>
            <p className="text-gray-600">
              We ship worldwide. Shipping costs and delivery times vary depending on your location.
            </p>
            <p className="text-gray-600">
              You can find more details on our <a href="/shipping-policy" className="text-blue-500 hover:underline">Shipping Policy</a> page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Returns & Exchanges
            </h2>
            <p className="text-gray-600">
              If you are not satisfied with your purchase, you can return it within 30 days for a refund or exchange.
            </p>
            <p className="text-gray-600">
              Please see our <a href="/returns-policy" className="text-blue-500 hover:underline">Returns Policy</a> page for more information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions or need assistance, please don't hesitate to <a href="/contact" className="text-blue-500 hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderingGuide;
