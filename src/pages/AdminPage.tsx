import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCurrentUser } from '@/utils/localStorageUtils';
import Title from '@/components/Title';

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
      setIsAdmin(true);
      // Fetch admin data
      fetchAdminData();
    } else {
      // Redirect non-admin users
      navigate('/');
    }
  }, [navigate]);

  const fetchAdminData = () => {
    // Mock data - in a real app, this would be API calls
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'agent' },
      { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    ]);

    setOrders([
      { id: 'ORD-001', customer: 'John Doe', total: '$1,299.99', status: 'Completed', date: '2023-05-15' },
      { id: 'ORD-002', customer: 'Jane Smith', total: '$899.50', status: 'Processing', date: '2023-05-16' },
      { id: 'ORD-003', customer: 'Mike Johnson', total: '$2,499.00', status: 'Pending', date: '2023-05-17' },
    ]);

    setProducts([
      { id: 'PRD-001', name: 'iPhone 13 Pro', stock: 25, price: '$999.99' },
      { id: 'PRD-002', name: 'Samsung Galaxy S22', stock: 18, price: '$899.99' },
      { id: 'PRD-003', name: 'Google Pixel 6', stock: 12, price: '$799.99' },
    ]);
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Title title="Admin Dashboard" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Admin Dashboard" />
      <div className="bg-[#0c0027] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Site
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold">{users.length}</h2>
            <p>Total Users</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold">{orders.length}</h2>
            <p>Total Orders</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold">{products.length}</h2>
            <p>Products</p>
          </div>
        </div>

        <Tabs defaultValue="users">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Management</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search users..." className="max-w-xs" />
                  <Button>Add User</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Order Management</h2>
                <Input placeholder="Search orders..." className="max-w-xs" />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Product Management</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search products..." className="max-w-xs" />
                  <Button>Add Product</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-gray-100 p-4 text-center text-gray-600 mt-auto">
        <p>© 2023 UE EPHONE Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
