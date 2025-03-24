
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Define form schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  username: z.string().min(3, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    // For now, just navigate to the shop list page
    navigate("/shop-list");
  };
  
  // Password match check
  const passwordsMatch = form.watch("password") === form.watch("confirmPassword") && 
                         form.watch("confirmPassword") !== "";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Register</span>
          </div>
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
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your first name" 
                        className="bg-slate-50" 
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your last name" 
                        className="bg-slate-50" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Choose a username" 
                        className="bg-slate-50" 
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
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="bg-slate-50" 
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
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a password" 
                          className="bg-slate-50 pr-10" 
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
                    <FormLabel>Password confirmation</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm your password" 
                          className="bg-slate-50 pr-10" 
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
              
              <div className="text-sm text-gray-600">
                By signing up, I agree with the website's <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Register
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
