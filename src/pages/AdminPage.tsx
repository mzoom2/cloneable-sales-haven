
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminStockList from '@/components/AdminStockList';
import AdminSettingsPanel from '@/components/AdminSettingsPanel';
import AdminChatPanel from '@/components/AdminChatPanel';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Admin Panel</h1>
          <p className="text-gray-600">Manage your inventory, store settings, and customer chats</p>
        </div>

        <Tabs defaultValue="stock" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="stock">Stock Management</TabsTrigger>
            <TabsTrigger value="settings">Store Settings</TabsTrigger>
            <TabsTrigger value="chat">Customer Chats</TabsTrigger>
          </TabsList>
          <TabsContent value="stock" className="p-4 bg-white rounded-lg shadow">
            <AdminStockList />
          </TabsContent>
          <TabsContent value="settings" className="p-4 bg-white rounded-lg shadow">
            <AdminSettingsPanel />
          </TabsContent>
          <TabsContent value="chat" className="p-4 bg-white rounded-lg shadow">
            <AdminChatPanel />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
