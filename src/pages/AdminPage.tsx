
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminStockList from '@/components/AdminStockList';
import AdminSettingsPanel from '@/components/AdminSettingsPanel';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stock");

  // Check if user is an admin (in a real app, this would check a role from your auth system)
  const isAdmin = user?.email === "admin@example.com"; // This is just for demo purposes

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/admin' } });
      toast({
        title: "Login Required",
        description: "You must be logged in to view the admin panel",
        variant: "destructive"
      });
    } else if (!isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Admin Panel</h1>
          <p className="text-gray-600">Manage your inventory and store settings</p>
        </div>

        <Tabs defaultValue="stock" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="stock">Stock Management</TabsTrigger>
            <TabsTrigger value="settings">Store Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="stock" className="p-4 bg-white rounded-lg shadow">
            <AdminStockList />
          </TabsContent>
          <TabsContent value="settings" className="p-4 bg-white rounded-lg shadow">
            <AdminSettingsPanel />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
