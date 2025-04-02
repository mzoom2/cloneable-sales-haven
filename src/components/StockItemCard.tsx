
import React from 'react';
import { Button } from "@/components/ui/button";
import { StockItem } from "@/data/stockItems";
import { Link } from 'react-router-dom';
import { useCurrency } from '@/contexts/CurrencyContext';

interface StockItemCardProps {
  item: StockItem;
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item }) => {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row md:items-center">
        {/* Product image */}
        <div className="w-full md:w-24 h-24 bg-gray-100 flex items-center justify-center rounded mb-4 md:mb-0 md:mr-6">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="max-w-full max-h-full object-contain" 
            />
          ) : (
            <div className="text-gray-400 text-xs text-center">No image</div>
          )}
        </div>
        
        {/* Product details */}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{item.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2">
            <div>
              <span className="text-gray-500 text-sm">Price:</span> 
              <span className="ml-1 font-semibold">{formatPrice(item.price)}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Location:</span> 
              <span className="ml-1">{item.location}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Grade:</span> 
              <span className="ml-1">{item.grade}</span>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:flex-row md:items-center gap-2">
          <Link to={`/product/${item.id}`}>
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              Details
            </Button>
          </Link>
          <Link to={`/purchase/${item.id}`}>
            <Button size="sm" className="w-full md:w-auto">
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StockItemCard;
