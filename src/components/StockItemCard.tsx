
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StockItem } from "@/data/stockItems";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { ShoppingCart, Plus, Minus, Check, X, Store, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useCurrency } from '@/contexts/CurrencyContext';
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface StockItemCardProps {
  item: StockItem;
}

export default function StockItemCard({ item }: StockItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice, convertPrice } = useCurrency();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(item, quantity);
      setIsAdded(true);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${item.name} added to your cart`,
      });
      
      // Reset the "Added" state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };
  
  const handleViewDetails = () => {
    navigate(`/product/${item.id}`);
  };
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const stockStatus = item.quantity > 10 
    ? { text: "In Stock", color: "bg-green-500" }
    : item.quantity > 0 
    ? { text: "Low Stock", color: "bg-yellow-500" }
    : { text: "Out of Stock", color: "bg-red-500" };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Product Info */}
          <div className="md:col-span-8 p-4 cursor-pointer" onClick={handleViewDetails}>
            <h3 className="font-medium text-lg mb-1">{item.name}</h3>
            
            <div className="text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="rounded-sm">
                  {item.grade}
                </Badge>
                <div className="flex items-center">
                  <Store size={14} className="mr-1" />
                  {item.location}
                </div>
                <div className={`h-2 w-2 rounded-full ${stockStatus.color}`} />
                <span>
                  {stockStatus.text}
                </span>
              </div>
            </div>
            
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-2 text-sm">
                <div className="text-gray-600">Quantity Available:</div>
                <div>{item.quantity}</div>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-gray-600">Unit Price:</div>
                <div className="font-semibold">{formatPrice(convertPrice(item.price))}</div>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-gray-600">Warranty:</div>
                <div>12 Months</div>
              </div>
            </div>
          </div>
          
          {/* Action Panel */}
          <div className="md:col-span-4 bg-gray-50 p-4 flex flex-col justify-between">
            <div>
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(convertPrice(item.price))}
                </div>
                <div className="text-xs text-gray-400">Per Unit</div>
              </div>
              
              {/* Quantity selector */}
              <div className="flex items-center justify-center mb-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-l-md rounded-r-none h-9 w-9"
                  onClick={handleDecrement}
                >
                  <Minus size={14} />
                </Button>
                <div className="h-9 px-3 flex items-center justify-center border-y w-16">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-r-md rounded-l-none h-9 w-9"
                  onClick={handleIncrement}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full flex items-center justify-center gap-2"
                disabled={isAdded || item.quantity === 0}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={16} /> Added
                  </>
                ) : item.quantity === 0 ? (
                  <>
                    <X size={16} /> Out of Stock
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Add to Cart
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleViewDetails}
              >
                <Info size={16} /> View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
