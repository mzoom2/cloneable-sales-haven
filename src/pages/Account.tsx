import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCurrentUser, updateUserDetails } from '@/utils/localStorageUtils';
import { toast } from "@/hooks/use-toast";
import Title from '@/components/Title';

const Account = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setCountry(user.country || '');
      setZipCode(user.zipCode || '');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      zipCode,
    };
    updateUserDetails(updatedUser);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "User details updated successfully.",
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="My Account" />
      <Header />

      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">My Account</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>

            <div className="flex justify-between">
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-blue-500 text-white">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white"
                >
                  Edit Details
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
