
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUserOffers, acceptOffer, rejectOffer, UserOffer } from '@/services/OfferService';
import { useAuth } from '@/contexts/AuthContext';
import Title from '@/components/Title';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/currencyUtils';
import { useCurrency } from '@/contexts/CurrencyContext';
import OfferAcceptedDialog from '@/components/OfferAcceptedDialog';

type OfferStatus = 'pending' | 'accepted' | 'rejected';

const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState<UserOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<UserOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OfferStatus>('pending');
  const [activeOffer, setActiveOffer] = useState<UserOffer | null>(null);
  const [isAcceptedDialogOpen, setIsAcceptedDialogOpen] = useState(false);
  const { user } = useAuth();
  const { updateCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currency, formatPrice } = useCurrency();

  useEffect(() => {
    const fetchOffers = async () => {
      if (user) {
        try {
          const userOffers = await getUserOffers(user.id);
          setOffers(userOffers);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch offers:', error);
          setIsLoading(false);
        }
      } else {
        // Redirect to login if no user
        navigate('/login');
      }
    };

    fetchOffers();
  }, [user, navigate]);

  useEffect(() => {
    if (offers.length > 0) {
      setFilteredOffers(offers.filter(offer => offer.status === statusFilter));
    }
  }, [offers, statusFilter]);

  const handleAcceptOffer = async (offer: UserOffer) => {
    try {
      const success = await acceptOffer(offer.id);
      if (success) {
        // Update local state
        const updatedOffers = offers.map(o => 
          o.id === offer.id ? { ...o, status: 'accepted' as const } : o
        );
        setOffers(updatedOffers);
        
        setActiveOffer(offer);
        setIsAcceptedDialogOpen(true);
        
        // Add to cart
        updateCart({
          ...offer.product,
          quantity: offer.quantity,
          price: offer.price / offer.quantity, // Per unit price
          imageUrl: offer.product.images.main
        });
        
        toast({
          title: "Offer accepted",
          description: `You've accepted the offer for ${offer.product.name}.`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to accept offer",
        description: "There was an error accepting the offer. Please try again.",
      });
    }
  };

  const handleRejectOffer = async (offerId: number) => {
    try {
      const success = await rejectOffer(offerId);
      if (success) {
        // Update local state
        const updatedOffers = offers.map(o => 
          o.id === offerId ? { ...o, status: 'rejected' as const } : o
        );
        setOffers(updatedOffers);
        
        toast({
          title: "Offer rejected",
          description: "The offer has been rejected.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to reject offer",
        description: "There was an error rejecting the offer. Please try again.",
      });
    }
  };

  const handleFilterChange = (newStatus: OfferStatus) => {
    setStatusFilter(newStatus);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="My Offers" />
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Offers</h1>
          
          {/* Status filter tabs */}
          <div className="flex border-b mb-8">
            <button
              className={`px-6 py-3 font-medium ${
                statusFilter === 'pending' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => handleFilterChange('pending')}
            >
              Pending
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                statusFilter === 'accepted' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => handleFilterChange('accepted')}
            >
              Accepted
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                statusFilter === 'rejected' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => handleFilterChange('rejected')}
            >
              Rejected
            </button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your offers...</p>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h2 className="mt-4 text-xl font-semibold text-gray-700">No {statusFilter} offers</h2>
              <p className="mt-2 text-gray-500">
                {statusFilter === 'pending' ? "You don't have any pending offers at the moment." :
                 statusFilter === 'accepted' ? "You haven't accepted any offers yet." :
                 "You haven't rejected any offers yet."}
              </p>
              {statusFilter !== 'pending' && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => handleFilterChange('pending')}
                >
                  View Pending Offers
                </Button>
              )}
              <Button
                variant="default"
                className="mt-4 ml-2"
                onClick={() => navigate('/shop-list')}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                      {offer.product.images?.main ? (
                        <img 
                          src={offer.product.images.main} 
                          alt={offer.product.name} 
                          className="max-w-full max-h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">No Image</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{offer.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {offer.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Original Price:</span>
                      <span className="font-medium">
                        {formatCurrency(offer.product.price * offer.quantity, currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Your Offer:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(offer.price, currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>Savings:</span>
                      <span>
                        {formatCurrency((offer.product.price * offer.quantity) - offer.price, currency)}
                        {' '}
                        ({Math.round(((offer.product.price * offer.quantity) - offer.price) / (offer.product.price * offer.quantity) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Date:</span>
                      <span>{new Date(offer.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {statusFilter === 'pending' && (
                    <div className="p-4 bg-white border-t flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-[48%]"
                        onClick={() => handleRejectOffer(offer.id)}
                      >
                        Reject
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        className="w-[48%]"
                        onClick={() => handleAcceptOffer(offer)}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                  
                  {statusFilter === 'accepted' && (
                    <div className="p-4 bg-green-50 border-t text-center text-green-700 font-medium">
                      Offer Accepted
                    </div>
                  )}
                  
                  {statusFilter === 'rejected' && (
                    <div className="p-4 bg-gray-50 border-t text-center text-gray-500 font-medium">
                      Offer Rejected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {activeOffer && (
        <OfferAcceptedDialog 
          open={isAcceptedDialogOpen} 
          offer={activeOffer}
          onClose={() => setIsAcceptedDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default OffersPage;
