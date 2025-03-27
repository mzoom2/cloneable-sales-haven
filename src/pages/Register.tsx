
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
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
  userName: z.string().min(2, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });
  
  const onSubmit = (data: FormValues) => {
    console.log(data);
    
    // Save user data to local storage
    // Omit confirmPassword and agreeTerms as they're not needed for storage
    const { confirmPassword, agreeTerms, ...userData } = data;
    
    // Save user with required fields
    saveUser({
      ...userData,
      email: userData.email,
      password: userData.password,
      // Add default values for required fields in User interface
      businessName: userData.userName,
      phoneNumber: "",
      country: "",
      salesRep: "No / Cannot Remember",
      customsClearance: "Yes, I am able to handle customs clearance.",
      buyingInterest: "",
    });
    
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
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
      <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="First Name" 
                        className="border border-gray-300" 
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
                    <FormLabel className="text-gray-600">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Last Name" 
                        className="border border-gray-300" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">User Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="User Name" 
                        className="border border-gray-300" 
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
                    <FormLabel className="text-gray-600">E-Mail</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="E-Mail" 
                        className="border border-gray-300" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Password" 
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
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Password confirmation</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Password Confirmation" 
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
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        By signing up, I agree with the website's <Link to="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-base py-5"
              >
                Register
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>
                </p>
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
