
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
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderingGuide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-[#f9f9fb] py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <a href="/" className="text-gray-600 hover:text-primary">Home</a>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-800 font-medium">Ordering Guide</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">UE Ordering Guide</h1>
        
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Find order guide..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Accordion sections */}
        <Accordion type="single" collapsible className="space-y-4">
          {/* Section 1 */}
          <AccordionItem value="section-1" className="border rounded-lg overflow-hidden bg-white">
            <AccordionTrigger className="px-6 py-4 bg-[#0c0027] text-white hover:no-underline hover:bg-[#1a0046] transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">1. Select Device Model</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand" className="block mb-2">Brand</Label>
                    <Select defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="oneplus">OnePlus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="model" className="block mb-2">Model</Label>
                    <Select defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iphone15">iPhone 15</SelectItem>
                        <SelectItem value="iphone14">iPhone 14</SelectItem>
                        <SelectItem value="s23">Galaxy S23</SelectItem>
                        <SelectItem value="pixel7">Pixel 7</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="px-8 bg-green-500 hover:bg-green-600">Next</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Section 2 */}
          <AccordionItem value="section-2" className="border rounded-lg overflow-hidden bg-white">
            <AccordionTrigger className="px-6 py-4 bg-[#0c0027] text-white hover:no-underline hover:bg-[#1a0046] transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">2. Specify Device Condition</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Screen Condition</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">No cracks or major scratches</span>
                      <Switch id="screen-good" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minor scratches (visible when screen is off)</span>
                      <Switch id="screen-scratches" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cracked screen</span>
                      <Switch id="screen-cracked" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Battery Health</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Excellent (90-100%)</span>
                      <Switch id="battery-excellent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Good (70-89%)</span>
                      <Switch id="battery-good" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Poor (below 70%)</span>
                      <Switch id="battery-poor" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Functional Issues</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Touch response issues</span>
                      <Switch id="touch-issues" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Camera not working properly</span>
                      <Switch id="camera-issues" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Speaker/microphone issues</span>
                      <Switch id="audio-issues" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="px-4 mr-2">Back</Button>
                  <Button className="px-8 bg-green-500 hover:bg-green-600">Next</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Section 3 */}
          <AccordionItem value="section-3" className="border rounded-lg overflow-hidden bg-white">
            <AccordionTrigger className="px-6 py-4 bg-[#0c0027] text-white hover:no-underline hover:bg-[#1a0046] transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">3. Choose Services Required</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-1/2">Service</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Select</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Screen Replacement</TableCell>
                      <TableCell>$129.99</TableCell>
                      <TableCell className="text-right">
                        <Switch id="service-screen" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Battery Replacement</TableCell>
                      <TableCell>$69.99</TableCell>
                      <TableCell className="text-right">
                        <Switch id="service-battery" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Diagnostics & Testing</TableCell>
                      <TableCell>$29.99</TableCell>
                      <TableCell className="text-right">
                        <Switch id="service-diagnostics" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Water Damage Repair</TableCell>
                      <TableCell>$89.99</TableCell>
                      <TableCell className="text-right">
                        <Switch id="service-water" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Camera Replacement</TableCell>
                      <TableCell>$79.99</TableCell>
                      <TableCell className="text-right">
                        <Switch id="service-camera" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="px-4 mr-2">Back</Button>
                  <Button className="px-8 bg-green-500 hover:bg-green-600">Next</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Section 4 */}
          <AccordionItem value="section-4" className="border rounded-lg overflow-hidden bg-white">
            <AccordionTrigger className="px-6 py-4 bg-[#0c0027] text-white hover:no-underline hover:bg-[#1a0046] transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">4. Contact Information</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="block mb-2">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block mb-2">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="block mb-2">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block mb-2">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address" className="block mb-2">Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="block mb-2">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="block mb-2">State/Province</Label>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
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
                    <Label htmlFor="zip" className="block mb-2">Zip/Postal Code</Label>
                    <Input id="zip" placeholder="Zip code" />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="px-4 mr-2">Back</Button>
                  <Button className="px-8 bg-green-500 hover:bg-green-600">Next</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Section 5 */}
          <AccordionItem value="section-5" className="border rounded-lg overflow-hidden bg-white">
            <AccordionTrigger className="px-6 py-4 bg-[#0c0027] text-white hover:no-underline hover:bg-[#1a0046] transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">5. Review & Submit</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Device Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Brand:</div>
                    <div>Apple</div>
                    <div className="text-gray-600">Model:</div>
                    <div>iPhone 14 Pro</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Services Selected</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Screen Replacement</span>
                      <span>$129.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Battery Replacement</span>
                      <span>$69.99</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$199.98</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Name:</div>
                    <div>John Doe</div>
                    <div className="text-gray-600">Email:</div>
                    <div>john.doe@example.com</div>
                    <div className="text-gray-600">Phone:</div>
                    <div>(555) 123-4567</div>
                    <div className="text-gray-600">Address:</div>
                    <div>123 Main St, San Francisco, CA 94103</div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="px-4 mr-2">Back</Button>
                  <Button className="px-8 bg-red-600 hover:bg-red-700 text-white">Submit Order</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default OrderingGuide;
