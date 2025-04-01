
// Define types for tracking
export interface TrackingEvent {
  status: string;
  date: string;
  time: string;
  location?: string;
  details?: string;
  isSignificant: boolean;
}

export interface TrackingStatus {
  trackingNumber: string;
  status: string;
  shipDate: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
  origin: string;
  destination: string;
  service: string;
  weight: string;
  events: TrackingEvent[];
}

// Mock tracking data generator
export const getTrackingData = (trackingNumber: string): TrackingStatus => {
  // This simulates different tracking statuses based on the tracking number
  switch (trackingNumber) {
    case 'UEP12345678':
      return {
        trackingNumber,
        status: 'In Transit',
        shipDate: 'May 15, 2023',
        estimatedDelivery: 'May 20, 2023',
        origin: 'Warehouse, New York, NY 10001',
        destination: 'Customer Address, Los Angeles, CA 90001',
        service: 'UEPhone Express Shipping',
        weight: '1.2 lbs (0.54 kg)',
        events: [
          {
            status: 'Departed sorting facility',
            date: 'May 17, 2023',
            time: '09:32 AM',
            location: 'Denver, CO',
            isSignificant: true
          },
          {
            status: 'Arrived at sorting facility',
            date: 'May 17, 2023',
            time: '03:45 AM',
            location: 'Denver, CO',
            isSignificant: false
          },
          {
            status: 'Departed',
            date: 'May 16, 2023',
            time: '08:15 PM',
            location: 'Chicago, IL',
            isSignificant: false
          },
          {
            status: 'Arrived at facility',
            date: 'May 16, 2023',
            time: '04:30 PM',
            location: 'Chicago, IL',
            isSignificant: false
          },
          {
            status: 'Shipped',
            date: 'May 15, 2023',
            time: '02:00 PM',
            location: 'New York, NY',
            details: 'Package was picked up by carrier',
            isSignificant: true
          },
          {
            status: 'Order processed',
            date: 'May 14, 2023',
            time: '10:45 AM',
            location: 'New York, NY',
            isSignificant: false
          },
          {
            status: 'Order received',
            date: 'May 13, 2023',
            time: '03:30 PM',
            isSignificant: true
          }
        ]
      };
    
    case 'UEP87654321':
      return {
        trackingNumber,
        status: 'Delivered',
        shipDate: 'May 10, 2023',
        deliveryDate: 'May 14, 2023',
        origin: 'Warehouse, Boston, MA 02108',
        destination: 'Customer Address, Miami, FL 33101',
        service: 'UEPhone Standard Shipping',
        weight: '1.8 lbs (0.82 kg)',
        events: [
          {
            status: 'Delivered',
            date: 'May 14, 2023',
            time: '02:15 PM',
            location: 'Miami, FL',
            details: 'Package was delivered to customer. Signature obtained.',
            isSignificant: true
          },
          {
            status: 'Out for delivery',
            date: 'May 14, 2023',
            time: '07:30 AM',
            location: 'Miami, FL',
            isSignificant: true
          },
          {
            status: 'At local facility',
            date: 'May 13, 2023',
            time: '08:45 PM',
            location: 'Miami, FL',
            isSignificant: false
          },
          {
            status: 'Arrived at regional hub',
            date: 'May 12, 2023',
            time: '11:20 AM',
            location: 'Orlando, FL',
            isSignificant: false
          },
          {
            status: 'Departed facility',
            date: 'May 11, 2023',
            time: '03:15 PM',
            location: 'Boston, MA',
            isSignificant: false
          },
          {
            status: 'Shipped',
            date: 'May 10, 2023',
            time: '01:45 PM',
            location: 'Boston, MA',
            isSignificant: true
          },
          {
            status: 'Order processed',
            date: 'May 09, 2023',
            time: '09:30 AM',
            location: 'Boston, MA',
            isSignificant: false
          }
        ]
      };
    
    case 'UEP11223344':
      return {
        trackingNumber,
        status: 'Processing',
        shipDate: 'May 17, 2023',
        estimatedDelivery: 'May 24, 2023',
        origin: 'Warehouse, Seattle, WA 98101',
        destination: 'Customer Address, Austin, TX 78701',
        service: 'UEPhone Standard Shipping',
        weight: '0.9 lbs (0.41 kg)',
        events: [
          {
            status: 'Processing',
            date: 'May 17, 2023',
            time: '11:20 AM',
            location: 'Seattle, WA',
            details: 'Package is being prepared for shipment',
            isSignificant: true
          },
          {
            status: 'Order processed',
            date: 'May 17, 2023',
            time: '08:15 AM',
            location: 'Seattle, WA',
            isSignificant: false
          },
          {
            status: 'Order received',
            date: 'May 16, 2023',
            time: '04:35 PM',
            isSignificant: true
          }
        ]
      };
    
    case 'UEP55667788':
      return {
        trackingNumber,
        status: 'Out for Delivery',
        shipDate: 'May 14, 2023',
        estimatedDelivery: 'May 18, 2023',
        origin: 'Warehouse, San Francisco, CA 94105',
        destination: 'Customer Address, Phoenix, AZ 85001',
        service: 'UEPhone Express Shipping',
        weight: '1.5 lbs (0.68 kg)',
        events: [
          {
            status: 'Out for delivery',
            date: 'May 18, 2023',
            time: '08:30 AM',
            location: 'Phoenix, AZ',
            details: 'Package is on vehicle for delivery',
            isSignificant: true
          },
          {
            status: 'Arrived at local facility',
            date: 'May 17, 2023',
            time: '10:45 PM',
            location: 'Phoenix, AZ',
            isSignificant: false
          },
          {
            status: 'Departed regional hub',
            date: 'May 16, 2023',
            time: '02:15 PM',
            location: 'Las Vegas, NV',
            isSignificant: false
          },
          {
            status: 'Arrived at regional hub',
            date: 'May 16, 2023',
            time: '09:20 AM',
            location: 'Las Vegas, NV',
            isSignificant: false
          },
          {
            status: 'Departed origin facility',
            date: 'May 15, 2023',
            time: '11:45 AM',
            location: 'San Francisco, CA',
            isSignificant: false
          },
          {
            status: 'Shipped',
            date: 'May 14, 2023',
            time: '03:30 PM',
            location: 'San Francisco, CA',
            isSignificant: true
          },
          {
            status: 'Order processed',
            date: 'May 14, 2023',
            time: '10:15 AM',
            isSignificant: false
          }
        ]
      };
    
    default:
      // For any other tracking number, return a "not found" status
      return {
        trackingNumber,
        status: 'Not Found',
        shipDate: '',
        origin: '',
        destination: '',
        service: '',
        weight: '',
        events: []
      };
  }
};
