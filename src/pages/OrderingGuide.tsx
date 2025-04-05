import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Title from '@/components/Title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, HelpCircle, ShoppingCart } from 'lucide-react';

const OrderingGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Ordering Guide" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Ordering Guide</h1>
          
          <Tabs defaultValue="new-customers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="new-customers">New Customers</TabsTrigger>
              <TabsTrigger value="existing-customers">Existing Customers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-customers">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to UEEphone!</CardTitle>
                  <CardDescription>
                    Follow these simple steps to place your first order with us
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Create an Account</h3>
                        <p className="text-gray-600 mb-3">
                          Start by creating a free account to access our wholesale prices and place orders.
                        </p>
                        <Button asChild>
                          <Link to="/register">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Browse Our Stock List</h3>
                        <p className="text-gray-600 mb-3">
                          Explore our extensive inventory of used and refurbished phones. Filter by model, grade, and price.
                        </p>
                        <Button asChild variant="outline">
                          <Link to="/shop-list">View Stock List <ShoppingCart className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Add Items to Cart</h3>
                        <p className="text-gray-600">
                          Select the items you want to purchase and add them to your cart. You can review your selections before checkout.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Complete Checkout</h3>
                        <p className="text-gray-600">
                          Provide your shipping information and select your preferred payment method. We accept bank transfers, PayPal, and credit cards.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Track Your Order</h3>
                        <p className="text-gray-600 mb-3">
                          Once your order is confirmed, you'll receive a tracking number to monitor your shipment.
                        </p>
                        <Button asChild variant="outline">
                          <Link to="/track">Track Orders <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="existing-customers">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back!</CardTitle>
                  <CardDescription>
                    Quick guide for our returning customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Log In to Your Account</h3>
                        <p className="text-gray-600 mb-3">
                          Access your account to view your order history, saved addresses, and personalized pricing.
                        </p>
                        <Button asChild>
                          <Link to="/login">Log In <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Check Latest Stock</h3>
                        <p className="text-gray-600 mb-3">
                          We update our inventory daily. Check the latest arrivals and best deals.
                        </p>
                        <Button asChild variant="outline">
                          <Link to="/shop-list">View Stock List <ShoppingCart className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Reorder Previous Items</h3>
                        <p className="text-gray-600">
                          Quickly reorder items from your previous purchases through your order history.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Check for Special Offers</h3>
                        <p className="text-gray-600 mb-3">
                          As a returning customer, you may be eligible for special discounts and promotions.
                        </p>
                        <Button asChild variant="outline">
                          <Link to="/offers">View Offers <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept bank transfers, PayPal, and major credit cards. For large orders, we may offer additional payment options. Please contact our customer service for more information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Domestic orders typically arrive within 2-3 business days. International shipping times vary by location, usually between 5-10 business days. All orders include tracking information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for most items. Products must be returned in their original condition. Please check our <Link to="/return-policy" className="text-blue-600 hover:underline">Return Policy</Link> page for detailed information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I check the status of my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by logging into your account and viewing your order history, or by using the tracking number provided in your shipping confirmation email on our <Link to="/track" className="text-blue-600 hover:underline">Order Tracking</Link> page.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What does the grading system mean?</AccordionTrigger>
                <AccordionContent>
                  We use a standard grading system to describe the condition of our products:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><span className="font-semibold">Grade A:</span> Excellent condition with minimal signs of use</li>
                    <li><span className="font-semibold">Grade B:</span> Good condition with some visible signs of use</li>
                    <li><span className="font-semibold">Grade C:</span> Fair condition with noticeable wear</li>
                    <li><span className="font-semibold">Grade D:</span> Functional but with significant cosmetic damage</li>
                  </ul>
                  For more details, visit our <Link to="/grading-scale" className="text-blue-600 hover:underline">Grading Scale</Link> page.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="mt-12 bg-indigo-50 p-6 rounded-lg flex gap-6 items-center">
            <div className="text-indigo-600">
              <HelpCircle size={48} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Need Additional Help?</h3>
              <p className="text-gray-700 mb-4">
                Our customer support team is available to assist you with any questions or concerns.
              </p>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderingGuide;
