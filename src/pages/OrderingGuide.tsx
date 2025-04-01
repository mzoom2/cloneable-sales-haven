
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  X 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderingGuide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAccordion, setActiveAccordion] = useState("device-info");
  const [deviceType, setDeviceType] = useState("");
  
  const handleAccordionChange = (value: string) => {
    setActiveAccordion(value);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7]">
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#333]">Order Repair Guide</h1>
        
        {/* Search bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search for devices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 bg-white rounded-full shadow-sm"
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Step navigation */}
          <div className="md:w-1/3">
            <Card className="p-4 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-[#333]">Repair Process</h3>
              
              <div className="space-y-3">
                <div 
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${activeAccordion === "device-info" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => handleAccordionChange("device-info")}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">1</div>
                  <div>
                    <p className="font-medium text-[#333]">Device Information</p>
                    <p className="text-sm text-gray-500">Select your device type</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${activeAccordion === "issue" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => handleAccordionChange("issue")}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3">2</div>
                  <div>
                    <p className="font-medium text-[#333]">Issue Description</p>
                    <p className="text-sm text-gray-500">Describe the problem</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${activeAccordion === "services" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => handleAccordionChange("services")}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3">3</div>
                  <div>
                    <p className="font-medium text-[#333]">Service Selection</p>
                    <p className="text-sm text-gray-500">Choose repair services</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${activeAccordion === "details" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => handleAccordionChange("details")}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3">4</div>
                  <div>
                    <p className="font-medium text-[#333]">Contact Details</p>
                    <p className="text-sm text-gray-500">Your information</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${activeAccordion === "review" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => handleAccordionChange("review")}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3">5</div>
                  <div>
                    <p className="font-medium text-[#333]">Review & Submit</p>
                    <p className="text-sm text-gray-500">Verify order details</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right side - Active step content */}
          <div className="md:w-2/3">
            <Card className="p-6 bg-white shadow-sm">
              {activeAccordion === "device-info" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-[#333]">Step 1: Device Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="device-type" className="text-sm font-medium mb-1 block">Device Type</Label>
                      <Select value={deviceType} onValueChange={setDeviceType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smartphone">Smartphone</SelectItem>
                          <SelectItem value="tablet">Tablet</SelectItem>
                          <SelectItem value="laptop">Laptop</SelectItem>
                          <SelectItem value="desktop">Desktop</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {deviceType === "smartphone" && (
                      <>
                        <div>
                          <Label htmlFor="brand" className="text-sm font-medium mb-1 block">Brand</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="samsung">Samsung</SelectItem>
                              <SelectItem value="google">Google</SelectItem>
                              <SelectItem value="oneplus">OnePlus</SelectItem>
                              <SelectItem value="xiaomi">Xiaomi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="model" className="text-sm font-medium mb-1 block">Model</Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="iphone15">iPhone 15</SelectItem>
                              <SelectItem value="iphone14">iPhone 14</SelectItem>
                              <SelectItem value="iphone13">iPhone 13</SelectItem>
                              <SelectItem value="iphone12">iPhone 12</SelectItem>
                              <SelectItem value="iphonese">iPhone SE</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline">Back</Button>
                      <Button onClick={() => handleAccordionChange("issue")}>Next</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAccordion === "issue" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-[#333]">Step 2: Issue Description</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium mb-3">What issues are you experiencing?</p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="screen" />
                          <Label htmlFor="screen" className="text-sm text-gray-700">Screen damage (cracks, lines, display issues)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="battery" />
                          <Label htmlFor="battery" className="text-sm text-gray-700">Battery problems (poor life, won't charge)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="water" />
                          <Label htmlFor="water" className="text-sm text-gray-700">Water damage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="camera" />
                          <Label htmlFor="camera" className="text-sm text-gray-700">Camera not working</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="power" />
                          <Label htmlFor="power" className="text-sm text-gray-700">Won't power on</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="charging" />
                          <Label htmlFor="charging" className="text-sm text-gray-700">Charging port issues</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="other" />
                          <Label htmlFor="other" className="text-sm text-gray-700">Other</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => handleAccordionChange("device-info")}>Back</Button>
                      <Button onClick={() => handleAccordionChange("services")}>Next</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAccordion === "services" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-[#333]">Step 3: Service Selection</h2>
                  
                  <div className="space-y-6">
                    <div className="divide-y">
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-medium">Screen Replacement</p>
                          <p className="text-sm text-gray-500">Replace damaged screen with new one</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold mr-4">$89.99</span>
                          <Checkbox id="service-screen" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-medium">Battery Replacement</p>
                          <p className="text-sm text-gray-500">Install new battery</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold mr-4">$49.99</span>
                          <Checkbox id="service-battery" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-medium">Water Damage Repair</p>
                          <p className="text-sm text-gray-500">Clean and repair internal components</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold mr-4">$79.99</span>
                          <Checkbox id="service-water" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-medium">Camera Repair</p>
                          <p className="text-sm text-gray-500">Fix or replace camera module</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold mr-4">$59.99</span>
                          <Checkbox id="service-camera" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-medium">Diagnostic Service</p>
                          <p className="text-sm text-gray-500">Complete device diagnostic</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold mr-4">$29.99</span>
                          <Checkbox id="service-diagnostic" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => handleAccordionChange("issue")}>Back</Button>
                      <Button onClick={() => handleAccordionChange("details")}>Next</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAccordion === "details" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-[#333]">Step 4: Contact Details</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium mb-1 block">First Name</Label>
                        <Input id="firstName" placeholder="First name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium mb-1 block">Last Name</Label>
                        <Input id="lastName" placeholder="Last name" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium mb-1 block">Email Address</Label>
                      <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium mb-1 block">Phone Number</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>
                    
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium mb-1 block">Address</Label>
                      <Input id="address" placeholder="Street address" />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="city" className="text-sm font-medium mb-1 block">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium mb-1 block">State</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zip" className="text-sm font-medium mb-1 block">ZIP Code</Label>
                        <Input id="zip" placeholder="ZIP" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => handleAccordionChange("services")}>Back</Button>
                      <Button onClick={() => handleAccordionChange("review")}>Next</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAccordion === "review" && (
                <div>
                  <h2 className="text-xl font-bold mb-6 text-[#333]">Step 5: Review & Submit</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Device:</span>
                          <span>iPhone 13 Pro</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Issues:</span>
                          <span>Screen damage, Battery problems</span>
                        </div>
                        <div className="pt-2 border-t">
                          <h4 className="font-medium mb-2">Selected Services:</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Screen Replacement</span>
                              <span>$89.99</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Battery Replacement</span>
                              <span>$49.99</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>$139.98</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span>John Doe</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span>john.doe@example.com</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span>(123) 456-7890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Address:</span>
                          <span>123 Main St, San Francisco, CA 94103</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">I agree to the terms and conditions</Label>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => handleAccordionChange("details")}>Back</Button>
                      <Button className="bg-green-600 hover:bg-green-700">Submit Order</Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default OrderingGuide;
