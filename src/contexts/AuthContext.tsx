
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '@/utils/localStorageUtils';

// Define the User type based on what's in localStorageUtils
interface User {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  country: string;
  password: string;
  salesRep: 'Jared' | 'Ben' | 'No / Cannot Remember';
  customsClearance: 'Yes, I am able to handle customs clearance.' | 'No, I need you to handle customs clearance and I am willing to pay a little extra.';
  buyingInterest: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in on mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // This would typically be an API call
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === email) {
      setUser(currentUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
