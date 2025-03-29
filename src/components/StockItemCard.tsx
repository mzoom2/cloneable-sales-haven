
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StockItem } from '@/data/stockItems';
import { toast } from '@/hooks/use-toast';

interface StockItemCardProps {
  item: StockItem;
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item }) => {
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleBuyClick = () => {
    setBuyDialogOpen(true);
  };

  const handleBuy = () => {
    // Here you would implement the actual purchase logic
    toast({
      title: "Purchase successful",
      description: `You have purchased ${quantity} x ${item.name}`,
    });
    setBuyDialogOpen(false);
  };

  return (
    <>
      <div className="border rounded-md mb-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4">
            <h3 className="text-lg font-medium mb-4">{item.name}</h3>
            
            <div className="grid grid-cols-3 gap-4">
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
          
          <div className="flex flex-row md:flex-col md:w-40 p-4 items-center justify-end gap-3">
            <div className="mb-auto text-right">
              <span className="font-medium text-blue-700">{item.grade}</span>
            </div>
            
            <div className="flex flex-row gap-2">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={handleBuyClick}
              >
                Buy
              </Button>
              <Button variant="outline" className="bg-gray-100">Offer</Button>
            </div>
            
            <p className="text-sm text-right self-end">{item.location}</p>
          </div>
        </div>
      </div>

      {/* Buy Dialog */}
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent className="bg-white p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1a0050] mb-3">Buy</DialogTitle>
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
                BUY
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
    </>
  );
};

export default StockItemCard;
