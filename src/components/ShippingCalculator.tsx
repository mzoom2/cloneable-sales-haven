
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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

interface CountryData {
  code: string;
  name: string;
  regions: { code: string; name: string }[];
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onUpdateShipping }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [availableRegions, setAvailableRegions] = useState<{ code: string; name: string }[]>([]);

  // Define countries and their regions
  const countries: CountryData[] = [
    {
      code: 'us',
      name: 'United States',
      regions: [
        { code: 'al', name: 'Alabama' },
        { code: 'ak', name: 'Alaska' },
        { code: 'az', name: 'Arizona' },
        { code: 'ca', name: 'California' },
        { code: 'co', name: 'Colorado' },
        { code: 'fl', name: 'Florida' },
        { code: 'ga', name: 'Georgia' },
        { code: 'hi', name: 'Hawaii' },
        { code: 'ny', name: 'New York' },
        { code: 'tx', name: 'Texas' },
      ]
    },
    {
      code: 'ca',
      name: 'Canada',
      regions: [
        { code: 'ab', name: 'Alberta' },
        { code: 'bc', name: 'British Columbia' },
        { code: 'mb', name: 'Manitoba' },
        { code: 'nb', name: 'New Brunswick' },
        { code: 'on', name: 'Ontario' },
        { code: 'qc', name: 'Quebec' },
      ]
    },
    {
      code: 'uk',
      name: 'United Kingdom',
      regions: [
        { code: 'eng', name: 'England' },
        { code: 'sct', name: 'Scotland' },
        { code: 'wls', name: 'Wales' },
        { code: 'nir', name: 'Northern Ireland' },
      ]
    },
    {
      code: 'au',
      name: 'Australia',
      regions: [
        { code: 'nsw', name: 'New South Wales' },
        { code: 'qld', name: 'Queensland' },
        { code: 'sa', name: 'South Australia' },
        { code: 'tas', name: 'Tasmania' },
        { code: 'vic', name: 'Victoria' },
        { code: 'wa', name: 'Western Australia' },
      ]
    },
    {
      code: 'hk',
      name: 'Hong Kong',
      regions: [
        { code: 'hk-island', name: 'Hong Kong Island' },
        { code: 'kowloon', name: 'Kowloon' },
        { code: 'new-territories', name: 'New Territories' },
      ]
    },
    {
      code: 'cn',
      name: 'China',
      regions: [
        { code: 'bj', name: 'Beijing' },
        { code: 'sh', name: 'Shanghai' },
        { code: 'gz', name: 'Guangzhou' },
        { code: 'sz', name: 'Shenzhen' },
      ]
    },
    {
      code: 'jp',
      name: 'Japan',
      regions: [
        { code: 'tokyo', name: 'Tokyo' },
        { code: 'osaka', name: 'Osaka' },
        { code: 'kyoto', name: 'Kyoto' },
        { code: 'hokkaido', name: 'Hokkaido' },
      ]
    },
    {
      code: 'de',
      name: 'Germany',
      regions: [
        { code: 'berlin', name: 'Berlin' },
        { code: 'bayern', name: 'Bavaria' },
        { code: 'hamburg', name: 'Hamburg' },
        { code: 'hessen', name: 'Hesse' },
      ]
    },
    {
      code: 'fr',
      name: 'France',
      regions: [
        { code: 'paris', name: 'Paris' },
        { code: 'provence', name: 'Provence' },
        { code: 'normandy', name: 'Normandy' },
        { code: 'brittany', name: 'Brittany' },
      ]
    },
    {
      code: 'br',
      name: 'Brazil',
      regions: [
        { code: 'sp', name: 'São Paulo' },
        { code: 'rj', name: 'Rio de Janeiro' },
        { code: 'ba', name: 'Bahia' },
        { code: 'mg', name: 'Minas Gerais' },
      ]
    },
    {
      code: 'za',
      name: 'South Africa',
      regions: [
        { code: 'gauteng', name: 'Gauteng' },
        { code: 'western-cape', name: 'Western Cape' },
        { code: 'kzn', name: 'KwaZulu-Natal' },
        { code: 'eastern-cape', name: 'Eastern Cape' },
      ]
    },
    {
      code: 'ng',
      name: 'Nigeria',
      regions: [
        { code: 'lagos', name: 'Lagos' },
        { code: 'abuja', name: 'Abuja' },
        { code: 'kano', name: 'Kano' },
        { code: 'ibadan', name: 'Ibadan' },
      ]
    },
  ];

  // Update available regions when country changes
  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find(c => c.code === country);
      if (selectedCountry) {
        setAvailableRegions(selectedCountry.regions);
        setRegion(''); // Reset region when country changes
      }
    } else {
      setAvailableRegions([]);
      setRegion('');
    }
  }, [country]);

  const handleUpdate = () => {
    if (!country || !region || !town) {
      toast({
        title: "Incomplete address",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Calculate shipping cost based on country and region
    // In a real app, this would be more dynamic based on various factors
    const baseRate = 15; // Base shipping rate
    let countryMultiplier = 1;
    
    // Apply different rates based on country
    switch(country) {
      case 'us':
        countryMultiplier = 1;
        break;
      case 'ca':
        countryMultiplier = 1.2;
        break;
      case 'uk':
        countryMultiplier = 1.5;
        break;
      case 'au':
        countryMultiplier = 2;
        break;
      case 'hk':
        countryMultiplier = 1.8;
        break;
      case 'cn':
        countryMultiplier = 1.7;
        break;
      case 'jp':
        countryMultiplier = 1.9;
        break;
      case 'de':
      case 'fr':
        countryMultiplier = 1.6;
        break;
      case 'br':
        countryMultiplier = 1.8;
        break;
      case 'za':
      case 'ng':
        countryMultiplier = 2.2;
        break;
      default:
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
          <label className="block text-sm mb-1">
            Country / region <span className="text-red-500">*</span>
          </label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Region <span className="text-red-500">*</span>
          </label>
          <Select value={region} onValueChange={setRegion} disabled={!country}>
            <SelectTrigger>
              <SelectValue placeholder={country ? "Select region" : "Select country first"} />
            </SelectTrigger>
            <SelectContent>
              {availableRegions.map((r) => (
                <SelectItem key={r.code} value={r.code}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Town / District <span className="text-red-500">*</span>
          </label>
          <Input
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="Enter town or district"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Postcode / ZIP (optional)</label>
          <Input
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
