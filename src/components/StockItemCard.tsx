
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { StockItem } from '@/data/stockItems';
import { useCurrency } from '@/contexts/CurrencyContext';
import { ShoppingCart, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MakeOfferDialog from './MakeOfferDialog';

interface StockItemCardProps {
  item: StockItem;
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item }) => {
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { formatPrice, convertPrice } = useCurrency();

  // Format item data
  const formattedPrice = formatPrice(convertPrice(item.price));

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    addToCart(item, 1);
    toast({
      title: "Added to cart",
      description: `${item.name} added to your cart`,
    });
  };

  // Navigate to product detail page
  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };

  // Handle make offer click
  const handleMakeOffer = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setOfferDialogOpen(true);
  };

  return (
    <>
      <Card 
        className="overflow-hidden transition-all cursor-pointer hover:shadow-md"
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Product image */}
            <div className="bg-slate-100 flex items-center justify-center w-full sm:w-40 h-40 shrink-0">
              <img 
                src={`https://placehold.co/400x400?text=${item.name}`} 
                alt={item.name} 
                className="object-contain h-32 w-32"
              />
            </div>
            
            {/* Product details */}
            <div className="flex-grow flex flex-col p-4">
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <div className="text-lg font-bold">{formattedPrice}</div>
                </div>
                
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-normal">
                    {item.grade}
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    {item.location}
                  </Badge>
                  {item.quantity > 10 ? (
                    <Badge className="bg-green-600">In Stock</Badge>
                  ) : item.quantity > 0 ? (
                    <Badge className="bg-amber-500">Low Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  Quantity available: {item.quantity}
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button 
                  className="flex-1"
                  variant="default" 
                  size="sm" 
                  onClick={handleAddToCart}
                  disabled={item.quantity === 0}
                >
                  <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
                </Button>
                <Button 
                  className="flex-1"
                  variant="outline" 
                  size="sm" 
                  onClick={handleMakeOffer}
                >
                  <Tag className="mr-1 h-4 w-4" /> Make Offer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offer Dialog */}
      <MakeOfferDialog 
        open={offerDialogOpen} 
        onOpenChange={setOfferDialogOpen} 
        stockItem={item}
      />
    </>
  );
};

export default StockItemCard;
