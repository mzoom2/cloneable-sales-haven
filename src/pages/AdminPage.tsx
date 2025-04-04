
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminStockList from '@/components/AdminStockList';
import AdminSettingsPanel from '@/components/AdminSettingsPanel';
import AdminChatPanel from '@/components/AdminChatPanel';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { API_BASE_URL, debugApiConnection } from '@/config/api';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stock");
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Check API connection on page load
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setApiStatus('loading');
        const isConnected = await debugApiConnection();
        setApiStatus(isConnected ? 'connected' : 'error');
        if (!isConnected) {
          setErrorMessage('Could not connect to the API server. Please check your backend configuration.');
        }
      } catch (error) {
        console.error('Error checking API connection:', error);
        setApiStatus('error');
        setErrorMessage('Error checking API connection: ' + (error instanceof Error ? error.message : String(error)));
      }
    };

    checkApiConnection();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Admin Panel</h1>
          <p className="text-gray-600">Manage your inventory, store settings, and customer chats</p>
        </div>

        {apiStatus === 'loading' && (
          <Alert className="mb-4 bg-yellow-50 border-yellow-200">
            <AlertTitle>Connecting to backend...</AlertTitle>
            <AlertDescription>
              Attempting to connect to API server at {API_BASE_URL}
            </AlertDescription>
          </Alert>
        )}

        {apiStatus === 'error' && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertTitle>API Connection Error</AlertTitle>
            <AlertDescription>
              <p>{errorMessage}</p>
              <p className="mt-2">Current API URL: {API_BASE_URL}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-2 bg-red-500 hover:bg-red-600"
              >
                Retry Connection
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {apiStatus === 'connected' && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertTitle>Connected to API Server</AlertTitle>
            <AlertDescription>
              Successfully connected to {API_BASE_URL}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="stock" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="stock">Stock Management</TabsTrigger>
            <TabsTrigger value="settings">Store Settings</TabsTrigger>
            <TabsTrigger value="chat">Customer Chats</TabsTrigger>
          </TabsList>
          <TabsContent value="stock" className="p-4 bg-white rounded-lg shadow">
            {apiStatus === 'connected' ? (
              <AdminStockList />
            ) : (
              <div className="p-4 text-center text-gray-500">
                Waiting for API connection to display stock items...
              </div>
            )}
          </TabsContent>
          <TabsContent value="settings" className="p-4 bg-white rounded-lg shadow">
            {apiStatus === 'connected' ? (
              <AdminSettingsPanel />
            ) : (
              <div className="p-4 text-center text-gray-500">
                Waiting for API connection to display settings...
              </div>
            )}
          </TabsContent>
          <TabsContent value="chat" className="p-4 bg-white rounded-lg shadow">
            {apiStatus === 'connected' ? (
              <AdminChatPanel />
            ) : (
              <div className="p-4 text-center text-gray-500">
                Waiting for API connection to display chats...
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
