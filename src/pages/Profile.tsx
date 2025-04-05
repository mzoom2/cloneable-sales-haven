import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCurrentUser, logoutUser } from '@/utils/localStorageUtils';
import Title from '@/components/Title';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username || '');
      setEmail(user.email || '');
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    navigate('/');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="My Profile" />
      <Header />

      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">My Profile</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white">
            Logout
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
