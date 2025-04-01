
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { 
  PaymentDetails, 
  getAllPaymentDetails, 
  updatePaymentDetails,
  paymentOptions 
} from '@/services/PaymentService';

const AdminSettingsPanel: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch payment details from the API
    const fetchPaymentDetails = async () => {
      try {
        const data = await getAllPaymentDetails();
        setPaymentDetails(data);
      } catch (error) {
        console.error('Failed to fetch payment details:', error);
        toast({
          title: "Error",
          description: "Failed to load payment details. Using default data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentDetails();
  }, []);

  const handleChange = (method: string, field: string, value: string) => {
    setPaymentDetails(prev => {
      const updated = { ...prev };
      
      // Handle nested objects based on method
      if (method === 'bank_transfer') {
        updated.bank_transfer = {
          ...updated.bank_transfer,
          [field]: value
        };
      } else if (method === 'western_union') {
        updated.western_union = {
          ...updated.western_union,
          [field]: value
        };
      } else if (method === 'crypto') {
        updated.crypto = {
          ...updated.crypto,
          [field]: value
        };
      } else if (method === 'paypal') {
        updated.paypal = {
          ...updated.paypal,
          [field]: value
        };
      } else if (method === 'ria') {
        updated.ria = {
          ...updated.ria,
          [field]: value
        };
      } else if (method === 'fps') {
        updated.fps = {
          ...updated.fps,
          [field]: value
        };
      } else if (method === 'alipay') {
        updated.alipay = {
          ...updated.alipay,
          [field]: value
        };
      } else if (method === 'wechat') {
        updated.wechat = {
          ...updated.wechat,
          [field]: value
        };
      }
      
      return updated;
    });
  };

  const handleSaveSettings = async () => {
    try {
      // Update settings via API
      await updatePaymentDetails(paymentDetails);
      
      toast({
        title: "Settings Saved",
        description: "Your payment settings have been updated successfully",
      });
    } catch (error) {
      console.error('Failed to update payment settings:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your settings.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
      <p className="text-gray-500 mb-6">Configure your payment method details</p>
      
      <Tabs defaultValue="bank_transfer" className="w-full">
        <TabsList className="mb-6 flex overflow-x-auto pb-2">
          <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
          <TabsTrigger value="western_union">Western Union</TabsTrigger>
          <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
          <TabsTrigger value="paypal">PayPal</TabsTrigger>
          <TabsTrigger value="ria">RIA</TabsTrigger>
          <TabsTrigger value="fps">FPS</TabsTrigger>
          <TabsTrigger value="qr">QR Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bank_transfer">
          <Card>
            <CardHeader>
              <CardTitle>Bank Transfer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={paymentDetails.bank_transfer?.bankName || ''}
                    onChange={(e) => handleChange('bank_transfer', 'bankName', e.target.value)}
                    placeholder="Enter bank name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    value={paymentDetails.bank_transfer?.accountName || ''}
                    onChange={(e) => handleChange('bank_transfer', 'accountName', e.target.value)}
                    placeholder="Enter account holder name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={paymentDetails.bank_transfer?.accountNumber || ''}
                    onChange={(e) => handleChange('bank_transfer', 'accountNumber', e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={paymentDetails.bank_transfer?.routingNumber || ''}
                    onChange={(e) => handleChange('bank_transfer', 'routingNumber', e.target.value)}
                    placeholder="Enter routing number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                  <Input
                    id="swiftCode"
                    value={paymentDetails.bank_transfer?.swiftCode || ''}
                    onChange={(e) => handleChange('bank_transfer', 'swiftCode', e.target.value)}
                    placeholder="Enter SWIFT/BIC code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="western_union">
          <Card>
            <CardHeader>
              <CardTitle>Western Union Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input
                    id="recipientName"
                    value={paymentDetails.western_union?.recipientName || ''}
                    onChange={(e) => handleChange('western_union', 'recipientName', e.target.value)}
                    placeholder="Enter recipient name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={paymentDetails.western_union?.city || ''}
                    onChange={(e) => handleChange('western_union', 'city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={paymentDetails.western_union?.country || ''}
                    onChange={(e) => handleChange('western_union', 'country', e.target.value)}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cryptoAddress">Wallet Address</Label>
                  <Input
                    id="cryptoAddress"
                    value={paymentDetails.crypto?.address || ''}
                    onChange={(e) => handleChange('crypto', 'address', e.target.value)}
                    placeholder="Enter cryptocurrency wallet address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cryptoNetwork">Network</Label>
                  <Input
                    id="cryptoNetwork"
                    value={paymentDetails.crypto?.network || ''}
                    onChange={(e) => handleChange('crypto', 'network', e.target.value)}
                    placeholder="Enter network (Bitcoin/Ethereum/etc.)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="paypal">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">PayPal Email</Label>
                  <Input
                    id="paypalEmail"
                    value={paymentDetails.paypal?.email || ''}
                    onChange={(e) => handleChange('paypal', 'email', e.target.value)}
                    placeholder="Enter PayPal email address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ria">
          <Card>
            <CardHeader>
              <CardTitle>RIA Money Transfer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="riaRecipientName">Recipient Name</Label>
                  <Input
                    id="riaRecipientName"
                    value={paymentDetails.ria?.recipientName || ''}
                    onChange={(e) => handleChange('ria', 'recipientName', e.target.value)}
                    placeholder="Enter recipient name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riaAddress">Address</Label>
                  <Input
                    id="riaAddress"
                    value={paymentDetails.ria?.address || ''}
                    onChange={(e) => handleChange('ria', 'address', e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fps">
          <Card>
            <CardHeader>
              <CardTitle>Faster Payment System (FPS) Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fpsPhoneNumber">Phone Number (FPS ID)</Label>
                  <Input
                    id="fpsPhoneNumber"
                    value={paymentDetails.fps?.phoneNumber || ''}
                    onChange={(e) => handleChange('fps', 'phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fpsAccountName">Account Name</Label>
                  <Input
                    id="fpsAccountName"
                    value={paymentDetails.fps?.accountName || ''}
                    onChange={(e) => handleChange('fps', 'accountName', e.target.value)}
                    placeholder="Enter account name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qr">
          <Card>
            <CardHeader>
              <CardTitle>QR Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="alipayQrCode">Alipay QR Code URL</Label>
                  <Input
                    id="alipayQrCode"
                    value={paymentDetails.alipay?.qrCodeUrl || ''}
                    onChange={(e) => handleChange('alipay', 'qrCodeUrl', e.target.value)}
                    placeholder="Enter Alipay QR code URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wechatQrCode">WeChat Pay QR Code URL</Label>
                  <Input
                    id="wechatQrCode"
                    value={paymentDetails.wechat?.qrCodeUrl || ''}
                    onChange={(e) => handleChange('wechat', 'qrCodeUrl', e.target.value)}
                    placeholder="Enter WeChat Pay QR code URL"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="mt-6"
        onClick={handleSaveSettings}
      >
        <Save className="h-4 w-4 mr-2" />
        Save Payment Settings
      </Button>
    </div>
  );
};

export default AdminSettingsPanel;
