
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StockItem } from "@/data/stockItems";
import { addOffer } from "@/services/OfferService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stockItem: StockItem;
}

const MakeOfferDialog: React.FC<MakeOfferDialogProps> = ({
  open,
  onOpenChange,
  stockItem
}) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stockItem.price * 0.9); // Default offer is 90% of original price
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPrice(value);
    }
  };

  const handleSubmitOffer = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "You need to log in to make an offer",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Make sure we have valid quantity and price
    if (quantity <= 0 || price <= 0) {
      toast({
        title: "Invalid offer",
        description: "Please enter a valid quantity and price",
        variant: "destructive"
      });
      return;
    }

    // Submit the offer
    try {
      addOffer(stockItem, quantity, price.toString());
      toast({
        title: "Offer submitted",
        description: "Your offer has been submitted successfully. You'll be notified when there's a response.",
      });
      onOpenChange(false);
      navigate('/offers');
    } catch (error) {
      console.error('Error submitting offer:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your offer. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Calculate savings
  const originalTotal = stockItem.price * quantity;
  const offerTotal = price * quantity;
  const savings = originalTotal - offerTotal;
  const savingsPercentage = (savings / originalTotal) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Submit your offer for {stockItem.name}. We'll review and respond shortly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between text-sm pb-2 border-b">
            <span className="text-gray-500">Original price:</span>
            <span className="font-medium">${stockItem.price.toFixed(2)}</span>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={stockItem.quantity}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <p className="text-xs text-gray-500">Available: {stockItem.quantity}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Your offer price (per unit)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="pl-8"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total original price:</span>
              <span className="font-medium">${originalTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Your offer total:</span>
              <span className="font-medium">${offerTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600 font-medium pt-1 border-t">
              <span>Your savings:</span>
              <span>${savings.toFixed(2)} ({savingsPercentage.toFixed(1)}%)</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            Offers are typically reviewed within 24 hours. If accepted, 
            you'll receive a notification and the item will be reserved for you.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmitOffer}>Submit Offer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MakeOfferDialog;
