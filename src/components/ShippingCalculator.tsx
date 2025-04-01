
import React, { useState } from 'react';
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
    // In a real app, this would calculate shipping based on location
    // For now, we'll just set a fixed amount
    if (onUpdateShipping) {
      onUpdateShipping(25);
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
          <label className="block text-sm mb-1">Country / region</label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hk">Hong Kong</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Region <span className="text-red-500">*</span>
          </label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hk-island">Hong Kong Island</SelectItem>
              <SelectItem value="kowloon">Kowloon</SelectItem>
              <SelectItem value="new-territories">New Territories</SelectItem>
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
