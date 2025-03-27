import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { saveUser, setCurrentUser } from "@/utils/localStorageUtils";
import { useToast } from "@/components/ui/use-toast";

// Define form schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  businessName: z.string().min(2, 'Business name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  whatsappNumber: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  salesRep: z.enum(['Jared', 'Ben', 'No / Cannot Remember']),
  customsClearance: z.enum(['Yes, I am able to handle customs clearance.', 'No, I need you to handle customs clearance and I am willing to pay a little extra.']),
  buyingInterest: z.string().min(5, 'Please tell us what you are interested in'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'personal';
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
      country: "",
      password: "",
      confirmPassword: "",
      salesRep: "No / Cannot Remember",
      customsClearance: "Yes, I am able to handle customs clearance.",
      buyingInterest: "",
    },
  });
  
  const onSubmit = (data: FormValues) => {
    console.log(data);
    
    // Save user data to local storage
    // Omit confirmPassword as it's not needed for storage
    const { confirmPassword, ...userData } = data;
    saveUser(userData);
    
    // Set as current logged in user
    setCurrentUser(userData.email);
    
    // Show success message
    toast({
      title: "Registration successful!",
      description: "Your account has been created.",
      duration: 3000,
    });
    
    // Navigate to dashboard
    navigate("/dashboard");
  };
                         
  // Handle Previous button click
  const handlePrevious = () => {
    navigate("/pre-register");
  };
  
  // Countries list for dropdown
  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", 
    "Germany", "France", "Italy", "Spain", "Brazil", "Mexico", 
    "Japan", "China", "India", "Russia", "South Africa"
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">First Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="First Name" 
                          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Last Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Last Name" 
                          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Business Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Business Name" 
                          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Email" 
                          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Phone Number" 
                          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="WhatsApp Number" 
                          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Country *</FormLabel>
                    <div className="relative">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Password *</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="border-0 border-b border-gray-300 rounded-none px-0 py-2 pr-10 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                            {...field} 
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Confirm Password *</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm Password" 
                            className="border-0 border-b border-gray-300 rounded-none px-0 py-2 pr-10 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-gray-400" 
                            {...field} 
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="salesRep"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-600">Have you spoken to a sales representative? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Jared" id="Jared" />
                          <label htmlFor="Jared" className="text-sm font-normal cursor-pointer">Jared</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Ben" id="Ben" />
                          <label htmlFor="Ben" className="text-sm font-normal cursor-pointer">Ben</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No / Cannot Remember" id="NoRep" />
                          <label htmlFor="NoRep" className="text-sm font-normal cursor-pointer">No / Cannot Remember</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customsClearance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-600">
                      Do you have the ability to do customs clearance? (After the arrival of the goods in the country of destination, the customs clearance in the importing country needs to be completed by the buyer, e.g. import permit, documents required by customs and etc., including all customs duties and taxes) *
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value="Yes, I am able to handle customs clearance." 
                            id="yesClearance" 
                          />
                          <label htmlFor="yesClearance" className="text-sm font-normal cursor-pointer">
                            Yes, I am able to handle customs clearance.
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value="No, I need you to handle customs clearance and I am willing to pay a little extra." 
                            id="noClearance" 
                          />
                          <label htmlFor="noClearance" className="text-sm font-normal cursor-pointer">
                            No, I need you to handle customs clearance and I am willing to pay a little extra.
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="buyingInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">What are you interested in buying from us? and how many pcs do you need? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What are you interested in buying from us? and how many pcs do you need?"
                        className="min-h-[120px] border-gray-300"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  onClick={handlePrevious}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Previous
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-purple-700 hover:bg-purple-800"
                >
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Currency selector - fixed to right side */}
      <div className="fixed right-0 top-1/3 z-40">
        <div className="flex flex-col">
          <button className="bg-blue-700 text-white py-2 px-4 font-medium">
            USD $
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 font-medium">
            EUR €
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
