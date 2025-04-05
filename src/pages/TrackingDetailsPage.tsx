import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Title from '@/components/Title';

interface TrackingDetails {
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  shipDate: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  activities: {
    timestamp: string;
    location: string;
    status: string;
  }[];
}

const TrackingDetailsPage = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate fetching tracking details from an API
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockTrackingDetails: TrackingDetails = {
          trackingNumber: trackingNumber || '1234567890',
          status: 'In Transit',
          estimatedDelivery: '2024-07-30',
          shipDate: '2024-07-22',
          deliveryAddress: {
            street: '123 Highland',
            city: 'Kigali',
            state: 'City of Kigali',
            zip: '0000',
          },
          activities: [
            {
              timestamp: '2024-07-22 14:00',
              location: 'Kigali',
              status: 'Package Shipped',
            },
            {
              timestamp: '2024-07-23 08:00',
              location: 'NYSC',
              status: 'Arrived at Sort Facility',
            },
            {
              timestamp: '2024-07-24 19:00',
              location: 'NYSC',
              status: 'Departed Sort Facility',
            },
            {
              timestamp: '2024-07-26 09:00',
              location: 'Your City',
              status: 'Out for Delivery',
            },
          ],
        };

        setTrackingDetails(mockTrackingDetails);
      } catch (e) {
        setError('Failed to fetch tracking details.');
        console.error("Fetching error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingDetails();
  }, [trackingNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Title title="Tracking Details" />
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">Loading tracking details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Title title="Tracking Details" />
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!trackingDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Title title="Tracking Details" />
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">Tracking details not found.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Tracking Details" />
      <Header />

      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <Link to="/track" className="hover:text-primary">Track</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">Tracking Details</span>
          </div>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Tracking Details for #{trackingDetails.trackingNumber}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Order Status</h2>
              <p>Status: {trackingDetails.status}</p>
              <p>Estimated Delivery: {trackingDetails.estimatedDelivery}</p>
              <p>Ship Date: {trackingDetails.shipDate}</p>
            </div>
          </div>

          <div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
              <p>{trackingDetails.deliveryAddress.street}</p>
              <p>{trackingDetails.deliveryAddress.city}, {trackingDetails.deliveryAddress.state} {trackingDetails.deliveryAddress.zip}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Tracking Activities</h2>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {trackingDetails.activities.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {activity.timestamp}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {activity.location}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {activity.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <Button asChild>
            <Link to="/track">Back to Tracking</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackingDetailsPage;
