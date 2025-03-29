
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  expiryDate: string;
  code: string;
}

// Sample offers data
const sampleOffers: Offer[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Get 15% off on all iPhone models',
    discount: '15% off',
    expiryDate: '2023-08-31',
    code: 'SUMMER15'
  },
  {
    id: '2',
    title: 'Back to School',
    description: 'Buy a phone, get a case free',
    discount: 'Free case',
    expiryDate: '2023-09-15',
    code: 'SCHOOL23'
  },
  {
    id: '3',
    title: 'Bulk Purchase Discount',
    description: 'Buy 10 or more phones and get 20% off',
    discount: '20% off',
    expiryDate: '2023-12-31',
    code: 'BULK20'
  }
];

const OffersPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-10 mt-10">Special Offers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleOffers.length > 0 ? (
            sampleOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{offer.title}</CardTitle>
                  <CardDescription>{offer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Discount:</span>
                      <span className="text-green-600 font-bold">{offer.discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Code:</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{offer.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Expires:</span>
                      <span>{new Date(offer.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full mt-4">Apply to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No offers available</h3>
              <p className="text-gray-500">Check back later for new discounts and promotions.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OffersPage;
