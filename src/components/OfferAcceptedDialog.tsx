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
import { ShoppingCart } from 'lucide-react';
import { StockItem } from '@/data/stockItems';
import ShippingAddressForm, { ShippingAddress } from './ShippingAddressForm';

const OfferAcceptedDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [offerId, setOfferId] = useState<string | null>(null);
  const [offer, setOffer] = useState<any>(null);
  const [useStoredAddress, setUseStoredAddress] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
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

  const handleProceed = () => {
    if (!offer) return;
    
    // If they chose to enter a new address but didn't complete it, show error
    if (showAddressForm) {
      const savedAddress = localStorage.getItem('shippingAddress');
      if (!savedAddress) {
        toast({
          title: "Incomplete address",
          description: "Please fill in all required address fields",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Create a mock stock item from the offer to add to cart - fixed to match StockItem interface
    const stockItem: StockItem = {
      id: parseInt(offer.productId),
      name: offer.product,
      price: parseFloat(offer.offeredPrice),
      quantity: offer.offeredQuantity,
      location: 'HongKong', // Default location since it's required
      grade: 'A+/A' // Default grade since it's required
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

  const handleAddressSubmit = (address: ShippingAddress) => {
    // Address is saved to localStorage in the ShippingAddressForm component
    setShowAddressForm(false);
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
              checked={useStoredAddress && !showAddressForm}
              onChange={() => {
                setUseStoredAddress(true);
                setShowAddressForm(false);
              }}
              className="h-4 w-4 text-purple-600"
            />
            <label htmlFor="useExisting">
              Use existing shipping address
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="useNew"
              name="addressOption"
              checked={showAddressForm}
              onChange={() => {
                setUseStoredAddress(false);
                setShowAddressForm(true);
              }}
              className="h-4 w-4 text-purple-600"
            />
            <label htmlFor="useNew">
              Enter a new shipping address
            </label>
          </div>

          {showAddressForm && (
            <ShippingAddressForm onAddressSubmit={handleAddressSubmit} />
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
