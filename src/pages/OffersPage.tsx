import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Offer, getOffers, removeOffer, updateOfferStatus } from '@/services/OfferService';
import { getCurrentUser } from '@/utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Title from '@/components/Title';

const OffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: addDays(new Date(), 0),
  })
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const fetchOffers = () => {
      try {
        setLoading(true);
        const offersData = getOffers();
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
        toast({
          title: "Error",
          description: "Failed to load offers",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOffers();
  }, []);
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    setIsLoggedIn(!!currentUser);
  }, []);
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleRemoveOffer = (offerId: string) => {
    removeOffer(offerId);
    setOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerId));
    toast({
      title: "Success",
      description: "Offer removed successfully",
    });
  };
  
  const handleAcceptOffer = (offerId: string) => {
    const updatedOffer = updateOfferStatus(offerId, "accepted");
    if (updatedOffer) {
      setOffers(prevOffers =>
        prevOffers.map(offer =>
          offer.id === offerId ? { ...offer, status: "accepted" } : offer
        )
      );
      toast({
        title: "Success",
        description: "Offer accepted!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to accept offer",
        variant: "destructive"
      });
    }
  };
  
  const handleRejectOffer = (offerId: string) => {
    const updatedOffer = updateOfferStatus(offerId, "rejected");
    if (updatedOffer) {
      setOffers(prevOffers =>
        prevOffers.map(offer =>
          offer.id === offerId ? { ...offer, status: "rejected" } : offer
        )
      );
      toast({
        title: "Offer Rejected",
        description: "Offer rejected successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to reject offer",
        variant: "destructive"
      });
    }
  };
  
  // Filter offers based on date range
  const filteredOffers = offers.filter(offer => {
    if (!date?.from || !date?.to) return true;
    const offerDate = new Date(offer.createdAt);
    return offerDate >= date.from && offerDate <= date.to;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Offers" />
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Offers</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : isLoggedIn ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Your Offers</h1>
              
              {/* Date Range Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={isMobile ? 1 : 2}
                    pagedNavigation
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {filteredOffers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Product</TableHead>
                      <TableHead>Offered Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.product}</TableCell>
                        <TableCell>{offer.offeredPrice}</TableCell>
                        <TableCell>{offer.offeredQuantity}</TableCell>
                        <TableCell>{offer.status}</TableCell>
                        <TableCell>{new Date(offer.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          {offer.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAcceptOffer(offer.id)}
                              >
                                Accept
                              </Button>
                              <Button 
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRejectOffer(offer.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveOffer(offer.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">No offers available in the selected date range.</p>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1a0050] mb-8">
              Please login to view your offers.
            </h1>
            
            <div className="flex justify-center">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="lg"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default OffersPage;
