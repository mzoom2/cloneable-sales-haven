
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getOffers, removeOffer, Offer } from '@/services/OfferService';
import { toast } from '@/hooks/use-toast';

const OffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Load offers from localStorage
    const userOffers = getOffers();
    setOffers(userOffers);
  }, []);

  const handleRemoveOffer = (offerId: string) => {
    removeOffer(offerId);
    setOffers(offers.filter(offer => offer.id !== offerId));
    toast({
      title: "Offer removed",
      description: "Your offer has been removed successfully"
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Tab navigation */}
        <div className="flex mb-8 border-b">
          <Link 
            to="/cart" 
            className="py-3 px-6 text-gray-600 hover:text-gray-800"
          >
            Cart
          </Link>
          <Link 
            to="/offers" 
            className="py-3 px-6 text-purple-600 font-medium border-b-2 border-purple-600"
          >
            Offers
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-[#1a0050] mb-8">Your Offers</h1>
        
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Product</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Offered Price</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Offered Quantity</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Offer Status</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length > 0 ? (
              offers.map((offer) => (
                <TableRow key={offer.id} className="border-t border-b hover:bg-gray-50">
                  <TableCell className="font-medium py-4">{offer.product}</TableCell>
                  <TableCell className="text-right">${offer.offeredPrice}</TableCell>
                  <TableCell className="text-center">{offer.offeredQuantity}</TableCell>
                  <TableCell className="text-center">
                    <span 
                      className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${
                        offer.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                        offer.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleRemoveOffer(offer.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-gray-500 text-lg">You haven't made any offers yet.</p>
                  <Link to="/shop-list">
                    <Button className="mt-4">Browse Products</Button>
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Currency selector */}
        <div className="fixed right-0 top-32 bg-white shadow-lg rounded-l-md overflow-hidden">
          <div className="bg-[#1a5089] text-white p-3 font-medium">USD $</div>
          <div className="bg-[#1a0050] text-white p-3 font-medium">EUR €</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OffersPage;
