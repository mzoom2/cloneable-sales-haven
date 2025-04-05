import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { registerUser } from '@/utils/localStorageUtils';
import Title from '@/components/Title';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Access the userType passed from the PreRegister page
  const userType = location.state?.userType;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setRegistrationError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setRegistrationError('Passwords do not match.');
      return;
    }

    if (!agreeToTerms) {
      setRegistrationError('You must agree to the terms and conditions.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegistrationError('Please enter a valid email address.');
      return;
    }
    
    // Validate password strength (example: at least 8 characters, one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setRegistrationError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    // Perform registration logic here (e.g., API call)
    const registrationSuccess = registerUser({
      firstName,
      lastName,
      email,
      password,
      userType: userType || 'personal' // Use the userType or default to 'personal'
    });

    if (registrationSuccess) {
      // Redirect to a success page or login page
      navigate('/login');
    } else {
      // Display an error message
      setRegistrationError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Register" />
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <Link to="/preregister" className="hover:text-primary">Pre-Registration</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">Register</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Create an Account
          </h1>
          
          {registrationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">{registrationError}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onCheckedChange={setAgreeToTerms}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
                </Label>
              </div>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Register
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Log in</Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
