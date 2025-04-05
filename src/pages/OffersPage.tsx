import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUserOffers, acceptOffer, rejectOffer, UserOffer } from '@/services/OfferService';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Check, X, AlertTriangle, Clock, Loader2 } from 'lucide-react';
import Title from '@/components/Title';

interface OfferItemProps {
  offer: UserOffer;
  onAccept: (offerId: string) => void;
  onReject: (offerId: string) => void;
  isAccepting: string | null;
  isRejecting: string | null;
}

const OfferItem: React.FC<OfferItemProps> = ({ offer, onAccept, onReject, isAccepting, isRejecting }) => {
  const { currency } = useCurrency();

  const getCurrencySymbol = (currencyCode: string) => {
    return currencyCode === 'EUR' ? '€' : '$';
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Offer for {offer.item_name}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2">
            {offer.status === 'pending' && <Clock className="h-4 w-4 text-gray-500" />}
            {offer.status === 'accepted' && <Check className="h-4 w-4 text-green-500" />}
            {offer.status === 'rejected' && <X className="h-4 w-4 text-red-500" />}
            {offer.status === 'expired' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
            <span>Status: {offer.status}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Item ID: {offer.item_id}</p>
        <p>Your Offer: {getCurrencySymbol(currency)}{offer.offer_price}</p>
        <p>Item Grade: {offer.item_grade}</p>
        <p>Quantity: {offer.item_quantity}</p>
        <p>Offer Date: {new Date(offer.offer_date).toLocaleDateString()}</p>
        {offer.status === 'rejected' && offer.rejection_reason && (
          <div className="mt-2">
            <Badge variant="destructive">Rejection Reason</Badge>
            <p className="text-sm text-gray-500">{offer.rejection_reason}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {offer.status === 'pending' && (
          <>
            <Button
              variant="ghost"
              onClick={() => onReject(offer.offer_id)}
              disabled={isRejecting === offer.offer_id}
            >
              {isRejecting === offer.offer_id ? (
                <>
                  Rejecting <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" /> Reject
                </>
              )}
            </Button>
            <Button
              onClick={() => onAccept(offer.offer_id)}
              disabled={isAccepting === offer.offer_id}
            >
              {isAccepting === offer.offer_id ? (
                <>
                  Accepting <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Accept
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

const OffersPage = () => {
  const [offers, setOffers] = useState<UserOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "rejected">("pending");
  const [isAccepting, setIsAccepting] = useState<string | null>(null);
  const [isRejecting, setIsRejecting] = useState<string | null>(null);
  const { currency } = useCurrency();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOffers();
    }
  }, [activeTab, user, currency]);

  const loadOffers = async () => {
    setLoading(true);
    try {
      if (!user) {
        console.error("User not logged in");
        toast({
          title: "Error",
          description: "User not logged in",
          variant: "destructive",
        });
        return;
      }
      const data = await getUserOffers(user.email, currency);
      setOffers(data);
    } catch (error) {
      console.error("Failed to load offers:", error);
      toast({
        title: "Error",
        description: "Failed to load offers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async (offerId: string) => {
    setIsAccepting(offerId);
    try {
      await acceptOffer(offerId);
      setOffers(prevOffers =>
        prevOffers.map(offer =>
          offer.offer_id === offerId ? { ...offer, status: 'accepted' } : offer
        )
      );
      toast({
        title: "Offer Accepted",
        description: "You have accepted the offer.",
      });
    } catch (error) {
      console.error("Failed to accept offer:", error);
      toast({
        title: "Error",
        description: "Failed to accept offer",
        variant: "destructive",
      });
    } finally {
      setIsAccepting(null);
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    setIsRejecting(offerId);
    try {
      await rejectOffer(offerId);
      setOffers(prevOffers =>
        prevOffers.map(offer =>
          offer.offer_id === offerId ? { ...offer, status: 'rejected' } : offer
        )
      );
      toast({
        title: "Offer Rejected",
        description: "You have rejected the offer.",
      });
    } catch (error) {
      console.error("Failed to reject offer:", error);
      toast({
        title: "Error",
        description: "Failed to reject offer",
        variant: "destructive",
      });
    } finally {
      setIsRejecting(null);
    }
  };

  const filteredOffers = offers.filter(offer => offer.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Your Offers" />
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Your Offers</h1>
          <p className="text-gray-600">Manage your offers and track their status</p>
        </div>

        <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="p-4 bg-white rounded-lg shadow">
            {loading ? (
              <div className="text-center text-gray-500">Loading offers...</div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center text-gray-500">No pending offers.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOffers.map(offer => (
                  <OfferItem
                    key={offer.offer_id}
                    offer={offer}
                    onAccept={handleAcceptOffer}
                    onReject={handleRejectOffer}
                    isAccepting={isAccepting}
                    isRejecting={isRejecting}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="accepted" className="p-4 bg-white rounded-lg shadow">
            {loading ? (
              <div className="text-center text-gray-500">Loading offers...</div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center text-gray-500">No accepted offers.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOffers.map(offer => (
                  <OfferItem
                    key={offer.offer_id}
                    offer={offer}
                    onAccept={handleAcceptOffer}
                    onReject={handleRejectOffer}
                    isAccepting={isAccepting}
                    isRejecting={isRejecting}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="rejected" className="p-4 bg-white rounded-lg shadow">
            {loading ? (
              <div className="text-center text-gray-500">Loading offers...</div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center text-gray-500">No rejected offers.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOffers.map(offer => (
                  <OfferItem
                    key={offer.offer_id}
                    offer={offer}
                    onAccept={handleAcceptOffer}
                    onReject={handleRejectOffer}
                    isAccepting={isAccepting}
                    isRejecting={isRejecting}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;
