
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

// Store users in local storage
export const saveUser = (userData: Partial<User> & { email: string; password: string }): void => {
  // Get existing users or initialize empty array
  const existingUsers = getUsers();
  
  // Check if user with this email already exists
  const userExists = existingUsers.some(user => user.email === userData.email);
  
  // Ensure all required fields are present before saving
  const userToSave: User = {
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    businessName: userData.businessName || '',
    email: userData.email,
    phoneNumber: userData.phoneNumber || '',
    whatsappNumber: userData.whatsappNumber,
    country: userData.country || '',
    password: userData.password,
    salesRep: userData.salesRep || 'No / Cannot Remember',
    customsClearance: userData.customsClearance || 'Yes, I am able to handle customs clearance.',
    buyingInterest: userData.buyingInterest || '',
  };
  
  if (userExists) {
    // Update existing user
    const updatedUsers = existingUsers.map(user => 
      user.email === userData.email ? userToSave : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  } else {
    // Add new user
    existingUsers.push(userToSave);
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }
};

// Get all users from local storage
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
};

// Validate login credentials
export const validateLogin = (email: string, password: string): boolean => {
  const users = getUsers();
  return users.some(user => user.email === email && user.password === password);
};

// Get user by email
export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Save current logged in user
export const setCurrentUser = (email: string): void => {
  localStorage.setItem('currentUser', email);
};

// Get current logged in user
export const getCurrentUser = (): User | null => {
  const currentUserEmail = localStorage.getItem('currentUser');
  if (!currentUserEmail) return null;
  
  return getUserByEmail(currentUserEmail) || null;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};
