
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { toast } from '@/hooks/use-toast';

interface ShippingCalculatorProps {
  onUpdateShipping?: (amount: number) => void;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onUpdateShipping }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');

  const handleUpdate = () => {
    if (!country || !region || !town) {
      toast({
        title: "Incomplete address",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Calculate shipping cost based on country
    // In a real app, this would be more dynamic based on various factors
    const baseRate = 15; // Base shipping rate
    let countryMultiplier = 1;
    
    // Simple mapping of country codes to multipliers
    const countryMultipliers: Record<string, number> = {
      'us': 1,
      'ca': 1.2,
      'uk': 1.5,
      'au': 2,
      'hk': 1.8,
      'cn': 1.7,
      'jp': 1.9,
      'de': 1.6,
      'fr': 1.6,
      'br': 1.8,
      'za': 2.2,
      'ng': 2.2
    };
    
    // Try to match the entered country to known country codes
    const lowerCountry = country.toLowerCase();
    const matchedCountry = Object.keys(countryMultipliers).find(code => 
      lowerCountry.includes(code) || 
      lowerCountry.includes(getCountryName(code).toLowerCase())
    );
    
    if (matchedCountry) {
      countryMultiplier = countryMultipliers[matchedCountry];
    } else {
      countryMultiplier = 2.5; // Higher rate for other countries
    }
    
    const shippingCost = Math.round(baseRate * countryMultiplier);
    
    if (onUpdateShipping) {
      onUpdateShipping(shippingCost);
      toast({
        title: "Shipping updated",
        description: `Shipping cost: $${shippingCost.toFixed(2)}`
      });
    }
  };

  // Function to get full country name from code
  const getCountryName = (code: string): string => {
    const countryNames: Record<string, string> = {
      'us': 'United States',
      'ca': 'Canada',
      'uk': 'United Kingdom',
      'au': 'Australia',
      'hk': 'Hong Kong',
      'cn': 'China',
      'jp': 'Japan',
      'de': 'Germany',
      'fr': 'France',
      'br': 'Brazil',
      'za': 'South Africa',
      'ng': 'Nigeria'
    };
    
    return countryNames[code] || code.toUpperCase();
  };

  return (
    <Collapsible 
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <div className="flex justify-between py-2">
        <span>Shipping</span>
        <div className="text-right">
          {!isOpen && (
            <p className="text-sm">Enter your address to view shipping options.</p>
          )}
          <CollapsibleTrigger asChild>
            <Button variant="link" className="text-sm p-0 h-auto text-blue-600 flex items-center">
              Calculate shipping
              <Truck size={16} className="ml-1" />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="space-y-4 pt-2">
        <div>
          <Label htmlFor="country" className="block text-sm mb-1">
            Country / region <span className="text-red-500">*</span>
          </Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
          />
        </div>

        <div>
          <Label htmlFor="region" className="block text-sm mb-1">
            Region <span className="text-red-500">*</span>
          </Label>
          <Input
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Enter state/province/region"
          />
        </div>

        <div>
          <Label htmlFor="town" className="block text-sm mb-1">
            Town / District <span className="text-red-500">*</span>
          </Label>
          <Input
            id="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="Enter town or district"
          />
        </div>

        <div>
          <Label htmlFor="zipCode" className="block text-sm mb-1">
            Postcode / ZIP (optional)
          </Label>
          <Input
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter postcode or ZIP"
          />
        </div>

        <Button 
          className="w-full mt-2 bg-purple-600 hover:bg-purple-700" 
          onClick={handleUpdate}
        >
          Update
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ShippingCalculator;
