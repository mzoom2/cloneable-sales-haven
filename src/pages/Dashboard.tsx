
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  UserCircle,
  GraduationCap,
  Bookmark,
  Star,
  ShoppingBag,
  HelpCircle,
  Settings,
  LogOut,
  Trophy
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from '@/components/Title';

const Dashboard = () => {
  // Mock user data - in a real app this would come from authentication state
  const user = {
    firstName: "Adebayooo",
    lastName: "Musturphaaa",
    initials: "AM",
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Dashboard" />
      <Header />
      
      {/* Main content - starts after header height */}
      <div className="flex-grow pt-16">
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
        
        {/* User info section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-6 border-b pb-6">
            <Avatar className="h-24 w-24 bg-blue-500">
              <AvatarFallback className="text-3xl text-white">{user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-gray-600 text-lg">Hello,</p>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a0050]">
                {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            {/* Left sidebar navigation */}
            <div className="md:w-1/4">
              <nav className="space-y-1">
                <Link to="/dashboard" className="flex items-center gap-3 text-white bg-blue-600 rounded-md px-4 py-3 font-medium">
                  <BookOpen size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <UserCircle size={20} />
                  <span>My Profile</span>
                </Link>
                <Link to="/enrolled-courses" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <GraduationCap size={20} />
                  <span>Enrolled Courses</span>
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <Bookmark size={20} />
                  <span>Wishlist</span>
                </Link>
                <Link to="/reviews" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <Star size={20} />
                  <span>Reviews</span>
                </Link>
                <Link to="/quiz-attempts" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <span>My Quiz Attempts</span>
                </Link>
                <Link to="/order-history" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <ShoppingBag size={20} />
                  <span>Order History</span>
                </Link>
                <Link to="/questions" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <HelpCircle size={20} />
                  <span>Question & Answer</span>
                </Link>
                <Link to="/settings" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
                <Link to="/logout" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <LogOut size={20} />
                  <span>Logout</span>
                </Link>
              </nav>
            </div>
            
            {/* Main dashboard content */}
            <div className="md:w-3/4">
              {/* Profile photo reminder */}
              <div className="bg-white border rounded-lg p-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="12" y1="16" x2="12" y2="16" />
                    </svg>
                  </div>
                  <span>Set Your Profile Photo</span>
                </div>
                <Button variant="outline" className="bg-blue-50 hover:bg-blue-100">Click Here</Button>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
              
              {/* Courses statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <BookOpen size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">0</h3>
                  <p className="text-gray-600">Enrolled Courses</p>
                </div>
                
                <div className="border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">0</h3>
                  <p className="text-gray-600">Active Courses</p>
                </div>
                
                <div className="border rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Trophy size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">0</h3>
                  <p className="text-gray-600">Completed Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
