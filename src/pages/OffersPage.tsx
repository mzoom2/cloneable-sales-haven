
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Offer {
  id: string;
  product: string;
  offeredPrice: string;
  offeredQuantity: number;
  status: "pending" | "accepted" | "rejected";
}

// Sample offers data
const sampleOffers: Offer[] = [
  {
    id: '1',
    product: 'Unlocked iPhone 15 Pro 256GB Mix Color (e-sim) (A+/A Grade)',
    offeredPrice: '$6.00',
    offeredQuantity: 1,
    status: 'pending'
  },
  {
    id: '2',
    product: 'iPhone 14 Pro Max 128GB Unlocked (A Grade)',
    offeredPrice: '$550.00',
    offeredQuantity: 2,
    status: 'accepted'
  },
  {
    id: '3',
    product: 'Samsung Galaxy S22 Ultra 256GB (B+ Grade)',
    offeredPrice: '$320.00',
    offeredQuantity: 3,
    status: 'rejected'
  }
];

const OffersPage = () => {
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
            {sampleOffers.length > 0 ? (
              sampleOffers.map((offer) => (
                <TableRow key={offer.id} className="border-t border-b hover:bg-gray-50">
                  <TableCell className="font-medium py-4">{offer.product}</TableCell>
                  <TableCell className="text-right">{offer.offeredPrice}</TableCell>
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
