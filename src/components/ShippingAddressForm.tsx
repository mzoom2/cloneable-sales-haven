
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';

export interface ShippingAddress {
  country: string;
  region: string;
  town: string;
  zipCode: string;
  streetAddress: string;
}

interface ShippingAddressFormProps {
  onAddressSubmit: (address: ShippingAddress) => void;
  buttonText?: string;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ 
  onAddressSubmit, 
  buttonText = "Save Address" 
}) => {
  const [address, setAddress] = useState<ShippingAddress>({
    country: '',
    region: '',
    town: '',
    zipCode: '',
    streetAddress: ''
  });

  // Load previously saved shipping address if available
  useEffect(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setAddress({
          country: parsedAddress.country || '',
          region: parsedAddress.region || '',
          town: parsedAddress.town || '',
          zipCode: parsedAddress.zipCode || '',
          streetAddress: parsedAddress.streetAddress || ''
        });
      } catch (error) {
        console.error('Failed to parse saved shipping address', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!address.country || !address.region || !address.town || !address.streetAddress) {
      toast({
        title: "Incomplete address",
        description: "Please fill in all required address fields",
        variant: "destructive"
      });
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(address));
    
    // Call the callback function
    onAddressSubmit(address);
    
    toast({
      title: "Address saved",
      description: "Your shipping address has been saved"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="streetAddress" className="block text-sm mb-1">
          Street Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleChange}
          placeholder="Enter your street address"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="country" className="block text-sm mb-1">
          Country / region <span className="text-red-500">*</span>
        </Label>
        <Input
          id="country"
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Enter country"
          required
        />
      </div>

      <div>
        <Label htmlFor="region" className="block text-sm mb-1">
          Region <span className="text-red-500">*</span>
        </Label>
        <Input
          id="region"
          name="region"
          value={address.region}
          onChange={handleChange}
          placeholder="Enter state/province/region"
          required
        />
      </div>

      <div>
        <Label htmlFor="town" className="block text-sm mb-1">
          Town / District <span className="text-red-500">*</span>
        </Label>
        <Input
          id="town"
          name="town"
          value={address.town}
          onChange={handleChange}
          placeholder="Enter town or district"
          required
        />
      </div>

      <div>
        <Label htmlFor="zipCode" className="block text-sm mb-1">
          Postcode / ZIP (optional)
        </Label>
        <Input
          id="zipCode"
          name="zipCode"
          value={address.zipCode}
          onChange={handleChange}
          placeholder="Enter postcode or ZIP"
        />
      </div>

      <Button 
        type="submit"
        className="w-full mt-2 bg-purple-600 hover:bg-purple-700" 
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default ShippingAddressForm;
