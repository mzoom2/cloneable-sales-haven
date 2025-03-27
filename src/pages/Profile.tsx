
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCurrentUser } from "@/utils/localStorageUtils";
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
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    registrationDate: "March 27, 2025 2:22 pm",
    phoneNumber: "-",
    occupation: "-",
    biography: "-",
    initials: "",
  });
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/account');
      return;
    }
    
    // In a real app, fetch user details from API
    // For now, we'll use mock data
    setUser({
      firstName: "Adebayo",
      lastName: "Musturpha",
      email: "mzoomolabewazz@gmail.com",
      username: "mzoomolabewagmailcomzz",
      registrationDate: "March 27, 2025 2:22 pm",
      phoneNumber: "-",
      occupation: "-",
      biography: "-",
      initials: "AM",
    });
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
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
                <Link to="/dashboard" className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-3 font-medium">
                  <BookOpen size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-3 text-white bg-blue-600 rounded-md px-4 py-3 font-medium">
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
            
            {/* Main profile content */}
            <div className="md:w-3/4">
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>
              
              <div className="bg-white rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 p-6">
                  <div>
                    <p className="text-gray-500 mb-1">Registration Date</p>
                    <p className="font-medium">{user.registrationDate}</p>
                  </div>
                  
                  <div className="md:col-span-2 border-t pt-4 mt-2"></div>
                  
                  <div>
                    <p className="text-gray-500 mb-1">First Name</p>
                    <p className="font-medium">{user.firstName}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 mb-1">Last Name</p>
                    <p className="font-medium">{user.lastName}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 mb-1">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 mb-1">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">{user.phoneNumber}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 mb-1">Skill/Occupation</p>
                    <p className="font-medium">{user.occupation}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-gray-500 mb-1">Biography</p>
                    <p className="font-medium">{user.biography}</p>
                  </div>
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

export default Profile;
