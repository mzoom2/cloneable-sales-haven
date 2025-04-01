
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getOfferById } from '@/services/OfferService';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StockItem } from '@/data/stockItems';
import { ShoppingCart } from 'lucide-react';

interface ShippingAddress {
  country: string;
  region: string;
  town: string;
  zipCode: string;
}

const OfferAcceptedDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [offerId, setOfferId] = useState<string | null>(null);
  const [offer, setOffer] = useState<any>(null);
  const [useStoredAddress, setUseStoredAddress] = useState(true);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    country: '',
    region: '',
    town: '',
    zipCode: ''
  });
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Check for offers that have been accepted
  useEffect(() => {
    // Function to check if there's a recently accepted offer
    const checkForAcceptedOffer = () => {
      const lastAcceptedOfferId = localStorage.getItem('lastAcceptedOffer');
      if (lastAcceptedOfferId) {
        const acceptedAt = new Date(localStorage.getItem('offerAcceptedAt') || '');
        const now = new Date();
        
        // If the offer was accepted in the last 10 minutes and dialog hasn't been shown yet
        const minutesSinceAcceptance = (now.getTime() - acceptedAt.getTime()) / (1000 * 60);
        
        if (minutesSinceAcceptance < 10) {
          const offer = getOfferById(lastAcceptedOfferId);
          if (offer && offer.status === 'accepted') {
            setOfferId(lastAcceptedOfferId);
            setOffer(offer);
            setOpen(true);
            // Mark this offer as shown
            localStorage.removeItem('lastAcceptedOffer');
          }
        } else {
          // Clear old acceptance records
          localStorage.removeItem('lastAcceptedOffer');
          localStorage.removeItem('offerAcceptedAt');
        }
      }
    };

    // Check immediately and then set up the event listener
    checkForAcceptedOffer();
    
    // Listen for real-time offer acceptance events
    const handleOfferAccepted = (event: CustomEvent) => {
      const acceptedOfferId = event.detail.offerId;
      const offer = getOfferById(acceptedOfferId);
      if (offer) {
        setOfferId(acceptedOfferId);
        setOffer(offer);
        setOpen(true);
      }
    };

    window.addEventListener('offerAccepted', handleOfferAccepted as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('offerAccepted', handleOfferAccepted as EventListener);
    };
  }, []);

  // Load previously saved shipping address if available
  useEffect(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setShippingAddress(parsedAddress);
      } catch (error) {
        console.error('Failed to parse saved shipping address', error);
      }
    }
  }, []);

  const handleProceed = () => {
    if (!offer) return;
    
    // If they chose a new address and it's not complete, show error
    if (!useStoredAddress && (!shippingAddress.country || !shippingAddress.region || !shippingAddress.town)) {
      toast({
        title: "Incomplete address",
        description: "Please fill in all required address fields",
        variant: "destructive"
      });
      return;
    }
    
    // Save shipping address for future use if it's new
    if (!useStoredAddress) {
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }
    
    // Create a mock stock item from the offer to add to cart
    const stockItem: StockItem = {
      id: parseInt(offer.productId),
      name: offer.product,
      price: parseFloat(offer.offeredPrice),
      category: "",
      description: `Accepted offer: ${offer.product}`,
      available: offer.offeredQuantity
    };
    
    // Add the accepted offer to cart
    addToCart(stockItem, offer.offeredQuantity);
    
    toast({
      title: "Offer added to cart",
      description: "Your accepted offer has been added to your cart"
    });
    
    setOpen(false);
    navigate('/cart');
  };

  if (!offer) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg text-green-600">
            Great news! Your offer has been accepted
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your offer for <span className="font-semibold">{offer?.product}</span> at{" "}
            <span className="font-semibold">${offer?.offeredPrice}</span> for{" "}
            <span className="font-semibold">{offer?.offeredQuantity} items</span> has been accepted.
            Would you like to proceed with the purchase?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="useExisting"
              name="addressOption"
              checked={useStoredAddress}
              onChange={() => setUseStoredAddress(true)}
              className="h-4 w-4 text-purple-600"
            />
            <Label htmlFor="useExisting">
              Use existing shipping address
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="useNew"
              name="addressOption"
              checked={!useStoredAddress}
              onChange={() => setUseStoredAddress(false)}
              className="h-4 w-4 text-purple-600"
            />
            <Label htmlFor="useNew">
              Enter a new shipping address
            </Label>
          </div>

          {!useStoredAddress && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="country" className="block text-sm mb-1">
                  Country / region <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  placeholder="Enter country"
                />
              </div>
              
              <div>
                <Label htmlFor="region" className="block text-sm mb-1">
                  Region <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="region"
                  value={shippingAddress.region}
                  onChange={(e) => setShippingAddress({...shippingAddress, region: e.target.value})}
                  placeholder="Enter state/province/region"
                />
              </div>
              
              <div>
                <Label htmlFor="town" className="block text-sm mb-1">
                  Town / District <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="town"
                  value={shippingAddress.town}
                  onChange={(e) => setShippingAddress({...shippingAddress, town: e.target.value})}
                  placeholder="Enter town or district"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode" className="block text-sm mb-1">
                  Postcode / ZIP (optional)
                </Label>
                <Input
                  id="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                  placeholder="Enter postcode or ZIP"
                />
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Maybe later</AlertDialogCancel>
          <AlertDialogAction onClick={handleProceed} className="bg-purple-600 hover:bg-purple-700">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Proceed to Cart
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OfferAcceptedDialog;
