
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Truck, Package, MapPin, Clock, 
  CheckCircle2, AlertCircle, ArrowLeft,
  Calendar, ChevronDown, ChevronUp, Printer
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { TrackingStatus, TrackingEvent, getTrackingData } from '@/utils/trackingUtils';

const TrackingDetailsPage = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [trackingData, setTrackingData] = useState<TrackingStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadTrackingData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          if (trackingNumber) {
            const data = getTrackingData(trackingNumber);
            setTrackingData(data);
            setIsLoading(false);
          }
        }, 1500);
      } catch (error) {
        toast({
          title: "Error loading tracking information",
          description: "We couldn't load the tracking details. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    loadTrackingData();
  }, [trackingNumber, toast]);
  
  // Get status progress percentage
  const getProgressPercentage = () => {
    if (!trackingData) return 0;
    
    const statusMap: Record<string, number> = {
      'Order Received': 10,
      'Processing': 25,
      'Shipped': 40,
      'In Transit': 60,
      'Out for Delivery': 80,
      'Delivered': 100,
      'Exception': 60, // For exception cases, show partial progress
    };
    
    return statusMap[trackingData.status] || 0;
  };
  
  // Get status icon
  const getStatusIcon = () => {
    if (!trackingData) return <Clock />;
    
    const iconMap: Record<string, JSX.Element> = {
      'Order Received': <Package className="h-8 w-8" />,
      'Processing': <Package className="h-8 w-8" />,
      'Shipped': <Truck className="h-8 w-8" />,
      'In Transit': <Truck className="h-8 w-8" />,
      'Out for Delivery': <Truck className="h-8 w-8" />,
      'Delivered': <CheckCircle2 className="h-8 w-8" />,
      'Exception': <AlertCircle className="h-8 w-8" />,
    };
    
    return iconMap[trackingData.status] || <Clock className="h-8 w-8" />;
  };
  
  // Get color based on status
  const getStatusColor = () => {
    if (!trackingData) return 'gray';
    
    const colorMap: Record<string, string> = {
      'Order Received': 'text-blue-600',
      'Processing': 'text-blue-600',
      'Shipped': 'text-blue-600',
      'In Transit': 'text-blue-600',
      'Out for Delivery': 'text-orange-500',
      'Delivered': 'text-green-500',
      'Exception': 'text-red-500',
    };
    
    return colorMap[trackingData.status] || 'text-gray-500';
  };
  
  // Events to show (all or limited)
  const eventsToShow = trackingData?.events ? 
    (showAllUpdates ? trackingData.events : trackingData.events.slice(0, 3)) : 
    [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/track" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tracking
          </Link>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
              <p className="mt-4 text-gray-500">Loading tracking information...</p>
            </div>
          ) : trackingData ? (
            <div className="space-y-6">
              {/* Summary card */}
              <div className="bg-white shadow-md rounded-lg p-6 border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-bold">Tracking Number: {trackingNumber}</h1>
                    <p className="text-sm text-gray-500">Shipped on {trackingData.shipDate}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Printer className="h-3 w-3 mr-1" />
                      Print
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center mt-6 mb-2">
                  <div className={`mr-4 ${getStatusColor()}`}>
                    {getStatusIcon()}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <h2 className={`text-xl font-semibold ${getStatusColor()}`}>
                      {trackingData.status}
                    </h2>
                    <p className="text-sm mt-1">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {trackingData.estimatedDelivery 
                        ? `Estimated delivery: ${trackingData.estimatedDelivery}` 
                        : trackingData.status === 'Delivered' 
                        ? `Delivered on ${trackingData.deliveryDate}`
                        : 'Delivery date unavailable'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Progress value={getProgressPercentage()} className="h-2 mb-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Order Placed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
              
              {/* Shipping details */}
              <div className="bg-white shadow-md rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Ship From</h3>
                    <p className="text-sm">{trackingData.origin}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Ship To</h3>
                    <p className="text-sm">{trackingData.destination}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Service</h3>
                    <p className="text-sm">{trackingData.service}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Weight</h3>
                    <p className="text-sm">{trackingData.weight}</p>
                  </div>
                </div>
              </div>
              
              {/* Tracking history */}
              <div className="bg-white shadow-md rounded-lg p-6 border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Tracking History</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAllUpdates(!showAllUpdates)}
                    className="text-xs"
                  >
                    {showAllUpdates ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show All
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {eventsToShow.map((event, index) => (
                    <div key={index} className="relative pl-8 pb-4">
                      {/* Timeline connector */}
                      {index !== eventsToShow.length - 1 && (
                        <div className="absolute left-[11px] top-5 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      {/* Status dot */}
                      <div className={`absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-white 
                        ${event.isSignificant ? 'bg-purple-600' : 'bg-gray-300'}`}>
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm">{event.status}</p>
                        <div className="flex text-xs text-gray-500 mt-1 gap-3">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </span>
                          {event.location && (
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </span>
                          )}
                        </div>
                        {event.details && (
                          <p className="text-xs text-gray-600 mt-1">{event.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {!showAllUpdates && trackingData.events.length > 3 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowAllUpdates(true)}
                      className="text-xs w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show {trackingData.events.length - 3} more updates
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Travel route map placeholder */}
              <div className="bg-white shadow-md rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-4">Travel Route</h2>
                <div className="bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive map view coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow-md rounded-lg p-6 border">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold">Tracking Information Not Found</h2>
              <p className="mt-2 text-gray-500">We couldn't find information for tracking number {trackingNumber}.</p>
              <p className="mt-1 text-gray-500">Please verify the tracking number and try again.</p>
              <Button className="mt-6" asChild>
                <Link to="/track">Try Another Tracking Number</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackingDetailsPage;
