
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

interface StoreSettings {
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber: string;
  swiftCode: string;
}

const AdminSettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>({
    bankName: '',
    accountNumber: '',
    accountName: '',
    routingNumber: '',
    swiftCode: ''
  });

  useEffect(() => {
    // Load settings from localStorage (in a real app, this would be from your API)
    const storedSettings = localStorage.getItem('storeSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would be an API call to save settings
    localStorage.setItem('storeSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings Saved",
      description: "Your store settings have been updated successfully",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store Settings</h2>
      <p className="text-gray-500 mb-6">Configure your store payment settings</p>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Bank Transfer Information</h3>
          <p className="text-sm text-blue-600">
            These details will be shown to customers who choose to pay via bank transfer.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              name="bankName"
              value={settings.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName">Account Holder Name</Label>
            <Input
              id="accountName"
              name="accountName"
              value={settings.accountName}
              onChange={handleChange}
              placeholder="Enter account holder name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={settings.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number</Label>
            <Input
              id="routingNumber"
              name="routingNumber"
              value={settings.routingNumber}
              onChange={handleChange}
              placeholder="Enter routing number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
            <Input
              id="swiftCode"
              name="swiftCode"
              value={settings.swiftCode}
              onChange={handleChange}
              placeholder="Enter SWIFT/BIC code"
            />
          </div>
        </div>

        <Button 
          className="mt-6"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettingsPanel;
