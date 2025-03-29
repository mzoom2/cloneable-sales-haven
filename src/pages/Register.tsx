import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { saveUser, setCurrentUser } from "@/utils/localStorageUtils";
import { useToast } from "@/components/ui/use-toast";

// List of countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", 
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
  "Venezuela", "Vietnam", "Yemen", "Zambia",  "Zimbabwe"
];

// Define form schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  businessName: z.string().min(2, 'Business name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(6, 'Phone number is required'),
  whatsappNumber: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  salesRep: z.enum(['Jared', 'Ben', 'No / Cannot Remember']),
  customsClearance: z.enum([
    'Yes, I am able to handle customs clearance.',
    'No, I need you to handle customs clearance and I am willing to pay a little extra.'
  ]),
  buyingInterest: z.string().min(2, 'Please tell us what you are interested in buying'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the user type from location state
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
  
  const onSubmit = (data: FormValues) => {
    // Save user data to local storage with type assertion to ensure email and password are provided
    saveUser({
      ...data,
      email: data.email,
      password: data.password,
    });
    
    // Set as current logged in user
    setCurrentUser(data.email);
    
    // Show success message instead of navigating
    setRegistrationSuccess(true);
    
    // Scroll to top to show the success message
    window.scrollTo(0, 0);
    
    // Show toast notification
    toast({
      title: "Registration successful!",
      description: "A website admin must approve your account before you can log in.",
      duration: 5000,
    });
  };
  
  const handlePrevious = () => {
    navigate('/pre-register');
  };
  
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
      
      {/* Currency selector - fixed to right side */}
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
        {registrationSuccess ? (
          <div className="max-w-2xl mx-auto">
            <Alert className="mb-8 bg-green-50 border-green-200">
              <AlertTitle className="text-xl font-semibold text-green-800">Account registration successful</AlertTitle>
              <AlertDescription className="text-green-700 mt-2">
                A website admin must approve your account before you can log in. You'll receive an email when your account is activated.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center mt-6">
              <Button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <h1 className="text-2xl font-bold text-center text-[#1a0050] mb-8">
              Register an Account
            </h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">First Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="First Name" 
                            className="border border-gray-300" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
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
                            className="border border-gray-300" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Business Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Business Name" 
                          className="border border-gray-300" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
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
                          placeholder="E.g. john@doe.com" 
                          className="border border-gray-300" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g. +1 300 400 5000" 
                            className="border border-gray-300" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
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
                            placeholder="E.g. +1 300 400 5000" 
                            className="border border-gray-300" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Country dropdown */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Country *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border border-gray-300">
                            <SelectValue placeholder="Select your country" />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Password Information */}
                <div className="grid md:grid-cols-2 gap-5">
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
                              placeholder="Enter your password" 
                              className="border border-gray-300 pr-10" 
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
                        <FormMessage />
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
                              placeholder="Confirm password" 
                              className="border border-gray-300 pr-10" 
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Sales Representative */}
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
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Jared" id="salesRep-jared" />
                            <Label htmlFor="salesRep-jared">Jared</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Ben" id="salesRep-ben" />
                            <Label htmlFor="salesRep-ben">Ben</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No / Cannot Remember" id="salesRep-none" />
                            <Label htmlFor="salesRep-none">No / Cannot Remember</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Customs Clearance */}
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
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes, I am able to handle customs clearance." id="customs-yes" />
                            <Label htmlFor="customs-yes">Yes, I am able to handle customs clearance.</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No, I need you to handle customs clearance and I am willing to pay a little extra." id="customs-no" />
                            <Label htmlFor="customs-no">No, I need you to handle customs clearance and I am willing to pay a little extra.</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Buying Interest */}
                <FormField
                  control={form.control}
                  name="buyingInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">What are you interested in buying from us? and how many pcs do you need? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[100px] border border-gray-300" 
                          placeholder="Tell us about your buying interests..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Form Navigation */}
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
