
import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from '@/contexts/CartContext';
import { StockItem } from '@/data/stockItems';
import { useToast } from "@/hooks/use-toast"

interface OfferAcceptedDialogProps {
  item: StockItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const OfferAcceptedDialog: React.FC<OfferAcceptedDialogProps> = ({ item, open, setOpen }) => {
  const [offerAmount, setOfferAmount] = useState<number>(item.price);
  const { addToCart } = useCart();
  const { toast } = useToast()

  useEffect(() => {
    if (item) {
      setOfferAmount(item.price);
    }
  }, [item]);

  const handleAcceptOffer = () => {
    if (offerAmount <= 0 || offerAmount > item.price) {
      toast({
        title: "Invalid Offer Amount",
        description: "Please enter a valid offer amount.",
        variant: "destructive",
      })
      return;
    }

    addToCart({
      ...item,
      price: offerAmount,
      quantity: 1
    }, 1);

    toast({
      title: "Offer Accepted!",
      description: `Offer of $${offerAmount} accepted for ${item.name}. Item added to cart.`,
    })
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Accept Offer</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the amount you'd like to offer for this item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-2">
          <label htmlFor="offer" className="text-right inline-block w-full">
            Offer Amount:
          </label>
          <Input
            type="number"
            id="offer"
            value={offerAmount}
            onChange={(e) => setOfferAmount(Number(e.target.value))}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAcceptOffer}>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OfferAcceptedDialog;
