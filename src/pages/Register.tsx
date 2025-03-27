
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'personal';
  
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
  
  const { watch } = form;
  const password = useRef({});
  password.current = watch("password", "");
  
  // Check password strength
  useEffect(() => {
    const currentPassword = password.current as string;
    
    if (!currentPassword) {
      setPasswordStrength('');
      return;
    }
    
    const hasUppercase = /[A-Z]/.test(currentPassword);
    const hasLowercase = /[a-z]/.test(currentPassword);
    const hasNumber = /[0-9]/.test(currentPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(currentPassword);
    const isLongEnough = currentPassword.length >= 8;
    
    const strength = 
      (hasUppercase ? 1 : 0) + 
      (hasLowercase ? 1 : 0) + 
      (hasNumber ? 1 : 0) + 
      (hasSpecialChar ? 1 : 0) + 
      (isLongEnough ? 1 : 0);
    
    if (strength <= 2) setPasswordStrength('weak');
    else if (strength <= 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [watch]);
  
  const onSubmit = (data: FormValues) => {
    console.log(data);
    // In a real app, this would call an API to register the user
    navigate("/dashboard");
  };
  
  // Password match check
  const passwordsMatch = form.watch("password") === form.watch("confirmPassword") && 
                         form.watch("confirmPassword") !== "";
                         
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <Link to="/pre-register" className="hover:text-primary">Pre-Registration</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">Register</span>
          </div>
        </div>
      </div>
      
      {/* Currency selector - fixed to right side, positioned higher */}
      <div className="fixed right-0 top-1/4 z-40">
        <div className="flex flex-col">
          <button className="bg-blue-700 text-white py-2 px-4 font-medium">
            USD $
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 font-medium">
            EUR €
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
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
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
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
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your WhatsApp number (optional)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                          defaultValue=""
                        >
                          <option value="" disabled>Select country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            className="pr-10" 
                            {...field} 
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                      
                      {/* Password strength indicator */}
                      {passwordStrength && (
                        <div className="mt-2">
                          <div className="flex gap-1 h-1 mt-1 mb-1">
                            <div className={`h-full rounded-full flex-1 ${
                              passwordStrength === 'weak' ? 'bg-red-500' : 
                              passwordStrength === 'medium' ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}></div>
                            <div className={`h-full rounded-full flex-1 ${
                              passwordStrength === 'medium' || passwordStrength === 'strong' ? 
                              (passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') : 
                              'bg-gray-200'
                            }`}></div>
                            <div className={`h-full rounded-full flex-1 ${
                              passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                          </div>
                          <div className="text-right text-xs text-gray-500">
                            {passwordStrength === 'weak' ? 'Weak' : 
                             passwordStrength === 'medium' ? 'Medium' : 
                             'Strong'}
                          </div>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password *</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your password" 
                            className="pr-10" 
                            {...field} 
                          />
                        </FormControl>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {passwordsMatch && field.value && (
                            <Check size={18} className="text-green-500" />
                          )}
                          <button 
                            type="button"
                            className="text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <Eye size={18} />
                          </button>
                        </div>
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
                    <FormLabel>Have you spoken to a sales representative? *</FormLabel>
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
                    <FormLabel>
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
                    <FormLabel>What are you interested in buying from us? and how many pcs do you need? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us what you're looking for..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-gray-600">
                By signing up, I agree with the website's <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a>
              </div>
              
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
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
