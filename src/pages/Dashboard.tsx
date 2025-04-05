import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrentUser } from '@/utils/localStorageUtils';
import { getOffers } from '@/services/OfferService';
import { Offer } from '@/services/OfferService';
import Title from '@/components/Title';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
      // Load offers
      const userOffers = getOffers();
      setOffers(userOffers);
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Dashboard" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your recent purchase history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You have no recent orders.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setActiveTab('orders')}>View All Orders</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pending Offers</CardTitle>
                  <CardDescription>Offers awaiting response</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You have {offers.filter(o => o.status === 'pending').length} pending offers.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setActiveTab('offers')}>View All Offers</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                  <CardDescription>Your current account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Your account is active.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => navigate('/profile')}>View Profile</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Button onClick={() => navigate('/shop-list')}>Browse Products</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="offers">
            <Card>
              <CardHeader>
                <CardTitle>Your Offers</CardTitle>
                <CardDescription>Manage your product offers</CardDescription>
              </CardHeader>
              <CardContent>
                {offers.length > 0 ? (
                  <div className="space-y-4">
                    {offers.map((offer) => (
                      <div key={offer.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{offer.product}</h3>
                            <p className="text-sm text-gray-500">
                              Offered: {offer.offeredPrice} for {offer.offeredQuantity} units
                            </p>
                            <p className="text-sm text-gray-500">
                              Date: {offer.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            offer.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't made any offers yet.</p>
                    <Button onClick={() => navigate('/shop-list')}>Browse Products</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Email Notifications</h3>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-offers" className="rounded" />
                      <label htmlFor="email-offers">Receive offer updates via email</label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <input type="checkbox" id="email-orders" className="rounded" />
                      <label htmlFor="email-orders">Receive order status updates via email</label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Account Security</h3>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
