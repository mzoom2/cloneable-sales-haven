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
import { Skeleton } from '@/components/ui/skeleton';
import Title from '@/components/Title';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stock");
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  // Check API connection on page load and when retrying
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        console.log(`Connection attempt #${connectionAttempts + 1} to ${API_BASE_URL}`);
        setApiStatus('loading');
        setErrorMessage('');
        
        const isConnected = await debugApiConnection();
        
        setApiStatus(isConnected ? 'connected' : 'error');
        if (!isConnected) {
          setErrorMessage('Could not connect to the API server. Please check your backend configuration and ensure CORS is properly configured.');
        }
      } catch (error) {
        console.error('Error checking API connection:', error);
        setApiStatus('error');
        setErrorMessage('Error checking API connection: ' + (error instanceof Error ? error.message : String(error)));
      }
    };

    checkApiConnection();
  }, [connectionAttempts]);

  const handleRetryConnection = () => {
    setConnectionAttempts(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Title title="Admin Panel" />
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
              <div className="space-y-2">
                <p>Attempting to connect to API server at {API_BASE_URL}</p>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-4 rounded-full bg-yellow-200" />
                  <span>Testing connection...</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {apiStatus === 'error' && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertTitle>API Connection Error</AlertTitle>
            <AlertDescription>
              <div className="space-y-4">
                <p>{errorMessage}</p>
                <p>Current API URL: {API_BASE_URL}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Troubleshooting steps:</p>
                  <ol className="list-decimal pl-5">
                    <li>Ensure your backend server is running at the URL above</li>
                    <li>Check CORS settings on your backend to allow requests from {window.location.origin}</li>
                    <li>Verify your network connectivity</li>
                    <li>If using HTTPS frontend, ensure your backend also uses HTTPS</li>
                  </ol>
                </div>
                <Button 
                  onClick={handleRetryConnection} 
                  className="mt-2 bg-red-500 hover:bg-red-600"
                >
                  Retry Connection
                </Button>
              </div>
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
