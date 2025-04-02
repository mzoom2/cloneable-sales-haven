import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StockItem } from '@/data/stockItems';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { addOffer } from '@/services/OfferService';
import { useIsMobile } from '@/hooks/use-mobile';

interface StockItemCardProps {
  item: StockItem;
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item }) => {
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [offerQuantity, setOfferQuantity] = useState(1);
  const [offerPrice, setOfferPrice] = useState('');
  const { addToCart } = useCart();
  const isMobile = useIsMobile();

  const handleBuyClick = () => {
    setBuyDialogOpen(true);
  };

  const handleOfferClick = () => {
    setOfferDialogOpen(true);
  };

  const handleBuy = () => {
    addToCart(item, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${item.name} has been added to your cart`,
    });
    setBuyDialogOpen(false);
    setQuantity(1); // Reset quantity for next time
  };

  const handleOffer = () => {
    if (!offerPrice || parseFloat(offerPrice) <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price for your offer",
        variant: "destructive"
      });
      return;
    }

    // Add the offer to localStorage
    addOffer(item, offerQuantity, offerPrice);

    toast({
      title: "Offer submitted",
      description: `Your offer for ${offerQuantity} x ${item.name} at $${offerPrice} has been submitted`,
    });
    
    setOfferDialogOpen(false);
    setOfferPrice('');
    setOfferQuantity(1);
  };

  return (
    <>
      <div className="border rounded-md mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4">
            <h3 className="text-lg font-medium mb-4">{item.name}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Item</p>
                <p className="font-medium">GSM Unlocked</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{item.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-row justify-between' : 'flex-col md:w-48'} p-4 gap-3 bg-gray-50 md:bg-transparent`}>
            <div className={`${isMobile ? '' : 'mb-auto'} text-right`}>
              <span className="font-medium text-blue-700">{item.grade}</span>
            </div>
            
            <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'} gap-2`}>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 w-full"
                onClick={handleBuyClick}
                size={isMobile ? "sm" : "default"}
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="bg-gray-100 w-full"
                onClick={handleOfferClick}
                size={isMobile ? "sm" : "default"}
              >
                Offer
              </Button>
            </div>
            
            <p className="text-sm text-right self-end">{item.location}</p>
          </div>
        </div>
      </div>

      {/* Buy Dialog */}
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent className="bg-white p-6 max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1a0050] mb-3">Add to Cart</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a0050]">
              {item.name}
            </h2>
            
            <p className="text-lg font-semibold">
              GSM Unlocked
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">Available Quantity</p>
                <p className="text-lg font-medium">{item.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">List Price</p>
                <p className="text-lg font-medium">${item.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-gray-700 font-medium">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={item.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
              />
            </div>
            
            <div className="flex flex-col space-y-3 pt-4">
              <Button 
                onClick={handleBuy}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3"
              >
                ADD TO CART
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setBuyDialogOpen(false)}
                className="w-full border-2 border-gray-300 text-black font-medium py-3"
              >
                CANCEL
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Offer Dialog */}
      <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
        <DialogContent className="bg-white p-6 max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1a0050] mb-3">Make an offer</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a0050]">
              {item.name}
            </h2>
            
            <p className="text-lg font-semibold">
              GSM Unlocked
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">Available Quantity</p>
                <p className="text-lg font-medium">{item.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">List Price</p>
                <p className="text-lg font-medium">${item.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="offerQuantity" className="block text-gray-700 font-medium">
                Offer Quantity:
              </label>
              <Input
                id="offerQuantity"
                type="number"
                min="1"
                max={item.quantity}
                value={offerQuantity}
                onChange={(e) => setOfferQuantity(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="offerPrice" className="block text-gray-700 font-medium">
                Offer Price:
              </label>
              <Input
                id="offerPrice"
                type="text"
                placeholder="Offer price"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            
            <div className="flex flex-col space-y-3 pt-4">
              <Button 
                onClick={handleOffer}
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4ef3] text-white font-medium py-3"
              >
                ADD OFFER TO CART
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setOfferDialogOpen(false)}
                className="w-full border-2 border-gray-300 text-black font-medium py-3"
              >
                CANCEL
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StockItemCard;
