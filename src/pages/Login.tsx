import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { authenticateUser } from '@/utils/localStorageUtils';
import Title from '@/components/Title';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email format.",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Password validation
    if (!password || password.length < 6) {
      toast({
        title: "Invalid password.",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate authentication (replace with actual authentication logic)
      const isAuthenticated = await authenticateUser(email, password);

      if (isAuthenticated) {
        toast({
          title: "Login successful!",
          description: "You are now logged in.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed.",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error.",
        description: "An error occurred during login. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Login" />
      <Header />

      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>•</span>
            <span className="font-medium text-gray-800">Login</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 text-white">
                  Login
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link to="/register" className="text-sm text-gray-600 hover:text-gray-800">
                  Don't have an account? Register
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
