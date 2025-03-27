
import React from 'react';
import { Button } from '@/components/ui/button';
import { StockItem } from '@/data/stockItems';

interface StockItemCardProps {
  item: StockItem;
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item }) => {
  return (
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
            <Button className="bg-indigo-600 hover:bg-indigo-700">Buy</Button>
            <Button variant="outline" className="bg-gray-100">Offer</Button>
          </div>
          
          <p className="text-sm text-right self-end">{item.location}</p>
        </div>
      </div>
    </div>
  );
};

export default StockItemCard;
