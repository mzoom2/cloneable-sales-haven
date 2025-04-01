
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { PaymentMethod, paymentOptions, getPaymentDetails, createOrder, createPayment, confirmPayment } from '@/services/PaymentService';
import { 
  ArrowRight, 
  Check, 
  Copy, 
  ExternalLink,
  Loader2
} from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  
  const totalAmount = getTotalPrice();
  
  // Create order on component mount
  useEffect(() => {
    const createNewOrder = async () => {
      if (!user?.id || cartItems.length === 0) {
        navigate('/cart');
        return;
      }
      
      setIsCreatingOrder(true);
      try {
        const result = await createOrder(cartItems, user.id, totalAmount);
        setOrderId(result.order_id);
      } catch (error) {
        console.error('Failed to create order:', error);
        toast({
          title: 'Error',
          description: 'Failed to create your order. Please try again.',
          variant: 'destructive'
        });
        navigate('/cart');
      } finally {
        setIsCreatingOrder(false);
      }
    };
    
    createNewOrder();
  }, []);
  
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };
  
  const handleProceedToPayment = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      const result = await createPayment(orderId, selectedPaymentMethod, totalAmount);
      setPaymentId(result.id);
    } catch (error) {
      console.error('Failed to create payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to process payment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConfirmPayment = async () => {
    if (!paymentId) return;
    
    setIsConfirmingPayment(true);
    try {
      const result = await confirmPayment(paymentId);
      setPaymentConfirmed(true);
      setTrackingNumber(result.tracking_number);
      clearCart();
      
      toast({
        title: 'Payment Confirmed',
        description: 'Your payment has been confirmed successfully.',
      });
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to confirm payment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsConfirmingPayment(false);
    }
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied',
        description: 'Information copied to clipboard',
      });
    });
  };

  // Render payment details based on selected method
  const renderPaymentDetails = () => {
    const details = getPaymentDetails(selectedPaymentMethod);
    
    switch (selectedPaymentMethod) {
      case 'bank_transfer':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Bank Name</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.bank_transfer?.bankName}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.bank_transfer?.bankName || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Account Number</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.bank_transfer?.accountNumber}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.bank_transfer?.accountNumber || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Account Name</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.bank_transfer?.accountName}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.bank_transfer?.accountName || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Routing Number</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.bank_transfer?.routingNumber}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.bank_transfer?.routingNumber || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Swift Code</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.bank_transfer?.swiftCode}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.bank_transfer?.swiftCode || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'western_union':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Recipient Name</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.western_union?.recipientName}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.western_union?.recipientName || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">City</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.western_union?.city}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.western_union?.city || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Country</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.western_union?.country}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.western_union?.country || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>Please visit a Western Union location or use their website to send the payment. Keep the MTCN (tracking number) for reference.</p>
            </div>
          </div>
        );
        
      case 'bitcoin':
      case 'usdt':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Address</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md overflow-auto">
                <p className="text-xs md:text-sm break-all">{details.crypto?.address}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2 flex-shrink-0"
                  onClick={() => handleCopyToClipboard(details.crypto?.address || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Network</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.crypto?.network}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.crypto?.network || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>Please send exactly {totalAmount.toFixed(2)} USD worth of {selectedPaymentMethod === 'bitcoin' ? 'Bitcoin' : 'USDT'} to the address above.</p>
            </div>
          </div>
        );
        
      case 'paypal':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">PayPal Email</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.paypal?.email}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.paypal?.email || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>Please send {totalAmount.toFixed(2)} USD to the PayPal email above. Include your order ID ({orderId}) in the payment note.</p>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => window.open('https://www.paypal.com', '_blank')}>
              Go to PayPal <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        );
        
      case 'ria':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Recipient Name</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.ria?.recipientName}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.ria?.recipientName || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Address</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.ria?.address}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.ria?.address || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>Please visit a RIA Money Transfer location to send the payment. Keep the reference number for confirmation.</p>
            </div>
          </div>
        );
        
      case 'fps':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Phone Number (FPS ID)</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.fps?.phoneNumber}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.fps?.phoneNumber || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Account Name</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <p>{details.fps?.accountName}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleCopyToClipboard(details.fps?.accountName || '')}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>Please use your banking app to send the payment via FPS to the phone number above. Include your order ID ({orderId}) in the payment reference.</p>
            </div>
          </div>
        );
        
      case 'alipay':
      case 'wechat':
        const qrDetails = selectedPaymentMethod === 'alipay' ? details.alipay : details.wechat;
        return (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="border rounded-md p-4 bg-white w-64 h-64 flex items-center justify-center">
                <p className="text-gray-500">QR Code Placeholder</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>
                Please scan the QR code above with your {selectedPaymentMethod === 'alipay' ? 'Alipay' : 'WeChat'} app to make the payment.
              </p>
            </div>
          </div>
        );
        
      case 'apple_pay':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
              <p>Apple Pay is currently supported only on iOS devices. Please use one of our other payment methods.</p>
            </div>
            
            <Button disabled className="w-full">
              Apple Pay Not Available
            </Button>
          </div>
        );
        
      default:
        return (
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
            <p>Please select a payment method to continue.</p>
          </div>
        );
    }
  };
  
  if (isCreatingOrder) {
    return (
      <>
        <Header />
        <div className="container max-w-4xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
            <h1 className="text-2xl font-bold">Creating your order...</h1>
            <p className="text-gray-500 mt-2">Please wait while we prepare your order.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (paymentConfirmed) {
    return (
      <>
        <Header />
        <div className="container max-w-4xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Confirmed!</h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Your payment has been successfully processed. You can now track your order using the tracking number below.
            </p>
            
            {trackingNumber && (
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">Tracking Number</p>
                <div className="flex items-center justify-center">
                  <div className="bg-gray-100 px-6 py-3 rounded-md font-mono text-lg">
                    {trackingNumber}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2"
                    onClick={() => handleCopyToClipboard(trackingNumber)}
                  >
                    <Copy size={18} />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700" 
                onClick={() => navigate(`/tracking-details/${trackingNumber}`)}
              >
                Track Your Order <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/shop-list')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>
                  Choose how you would like to pay for your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!paymentId ? (
                  <Tabs defaultValue="bank_transfer" className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                      <TabsTrigger value="bank_transfer">Bank</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      <TabsTrigger value="mobile">Mobile</TabsTrigger>
                      <TabsTrigger value="transfer">Transfer</TabsTrigger>
                      <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="bank_transfer" className="space-y-4">
                      {paymentOptions
                        .filter(option => ['bank_transfer', 'fps'].includes(option.id))
                        .map(option => (
                          <div 
                            key={option.id} 
                            className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${selectedPaymentMethod === option.id ? 'border-indigo-500 bg-indigo-50' : ''}`}
                            onClick={() => handlePaymentMethodSelect(option.id)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === option.id ? 'border-indigo-600' : 'border-gray-400'}`}>
                                {selectedPaymentMethod === option.id && (
                                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="crypto" className="space-y-4">
                      {paymentOptions
                        .filter(option => ['bitcoin', 'usdt'].includes(option.id))
                        .map(option => (
                          <div 
                            key={option.id} 
                            className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${selectedPaymentMethod === option.id ? 'border-indigo-500 bg-indigo-50' : ''}`}
                            onClick={() => handlePaymentMethodSelect(option.id)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === option.id ? 'border-indigo-600' : 'border-gray-400'}`}>
                                {selectedPaymentMethod === option.id && (
                                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="mobile" className="space-y-4">
                      {paymentOptions
                        .filter(option => ['alipay', 'wechat', 'apple_pay'].includes(option.id))
                        .map(option => (
                          <div 
                            key={option.id} 
                            className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${selectedPaymentMethod === option.id ? 'border-indigo-500 bg-indigo-50' : ''}`}
                            onClick={() => handlePaymentMethodSelect(option.id)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === option.id ? 'border-indigo-600' : 'border-gray-400'}`}>
                                {selectedPaymentMethod === option.id && (
                                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="transfer" className="space-y-4">
                      {paymentOptions
                        .filter(option => ['western_union', 'ria'].includes(option.id))
                        .map(option => (
                          <div 
                            key={option.id} 
                            className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${selectedPaymentMethod === option.id ? 'border-indigo-500 bg-indigo-50' : ''}`}
                            onClick={() => handlePaymentMethodSelect(option.id)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === option.id ? 'border-indigo-600' : 'border-gray-400'}`}>
                                {selectedPaymentMethod === option.id && (
                                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="other" className="space-y-4">
                      {paymentOptions
                        .filter(option => ['paypal'].includes(option.id))
                        .map(option => (
                          <div 
                            key={option.id} 
                            className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${selectedPaymentMethod === option.id ? 'border-indigo-500 bg-indigo-50' : ''}`}
                            onClick={() => handlePaymentMethodSelect(option.id)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === option.id ? 'border-indigo-600' : 'border-gray-400'}`}>
                                {selectedPaymentMethod === option.id && (
                                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        <Check size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Payment Method Selected</h3>
                        <p className="text-gray-500">
                          {paymentOptions.find(option => option.id === selectedPaymentMethod)?.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium text-lg mb-4">Payment Instructions</h3>
                      {renderPaymentDetails()}
                    </div>
                    
                    <div className="border-t pt-6">
                      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
                        <p>After making the payment, click the "I've Made the Payment" button below to confirm.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                {!paymentId ? (
                  <>
                    <Button 
                      className="w-full sm:w-auto" 
                      onClick={handleProceedToPayment}
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
                      Proceed to Payment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto" 
                      onClick={() => navigate('/cart')}
                    >
                      Return to Cart
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleConfirmPayment}
                    disabled={isConfirmingPayment}
                  >
                    {isConfirmingPayment && <Loader2 size={16} className="mr-2 animate-spin" />}
                    I've Made the Payment
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-sm">
                        {item.name} <span className="text-gray-500">x{item.quantity}</span>
                      </span>
                      <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
