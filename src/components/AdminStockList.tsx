import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StockItem, stockItems as sampleStockItems } from '@/data/stockItems';
import { toast } from '@/hooks/use-toast';
import { Save, X, Upload, RefreshCw, Plus } from 'lucide-react';
import { getStockItems, updateStockItem, importStockItems, addStockItem } from '@/services/AdminService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminStockList: React.FC = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [importing, setImporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // New state for add item dialog with predefined grade options
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemGrade, setNewItemGrade] = useState("A+/A");
  const [newItemLocation, setNewItemLocation] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getStockItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch stock items:', error);
      toast({
        title: "Error",
        description: "Failed to load stock items. Using cached data if available.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch stock items from the API
    fetchItems();
  }, []);

  const handleEditClick = (item: StockItem) => {
    setEditingItem(item);
    setEditedPrice(item.price.toString());
    setEditedQuantity(item.quantity.toString());
    setIsDialogOpen(true);
  };

  const handleImportStock = async () => {
    try {
      setImporting(true);
      await importStockItems(sampleStockItems);
      
      toast({
        title: "Import Successful",
        description: "Stock items have been imported from the frontend data.",
      });
      
      // Refresh the stock items
      await fetchItems();
    } catch (error) {
      console.error('Failed to import stock items:', error);
      toast({
        title: "Import Failed",
        description: "There was an error importing the stock items.",
        variant: "destructive"
      });
    } finally {
      setImporting(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Stock items have been refreshed from the database.",
    });
  };

  const handleSaveChanges = async () => {
    if (!editingItem) return;

    const newPrice = parseFloat(editedPrice);
    const newQuantity = parseInt(editedQuantity);

    if (isNaN(newPrice) || newPrice <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price greater than zero",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(newQuantity) || newQuantity < 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive"
      });
      return;
    }

    // Create updated item
    const updatedItem = { 
      ...editingItem,
      price: newPrice,
      quantity: newQuantity
    };
    
    try {
      // Update the item via API
      await updateStockItem(updatedItem);
      
      // Update local state
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItem.id ? updatedItem : item
        )
      );
      
      setIsDialogOpen(false);
      
      toast({
        title: "Item Updated",
        description: `${editingItem.name} has been updated successfully`,
      });
    } catch (error) {
      console.error('Failed to update item:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the item. Changes may not be saved to the server.",
        variant: "destructive"
      });
    }
  };

  // Updated handleAddItem function to use the correct grade type
  const handleAddItem = async () => {
    // Validate input
    const price = parseFloat(newItemPrice);
    const quantity = parseInt(newItemQuantity);

    if (!newItemName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid product name",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price greater than zero",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive"
      });
      return;
    }

    if (!newItemGrade) {
      toast({
        title: "Invalid Grade",
        description: "Please select a valid grade",
        variant: "destructive"
      });
      return;
    }

    if (!newItemLocation.trim()) {
      toast({
        title: "Invalid Location",
        description: "Please enter a valid location",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create new item object with the correct grade type
      const newItem = {
        name: newItemName,
        price: price,
        quantity: quantity,
        grade: newItemGrade,
        location: newItemLocation
      };

      // Add item via API
      const addedItem = await addStockItem(newItem);
      
      // Update local state
      setItems(prevItems => [...prevItems, addedItem]);
      
      // Reset form
      setNewItemName("");
      setNewItemPrice("");
      setNewItemQuantity("");
      setNewItemGrade("A+/A");
      setNewItemLocation("");
      
      // Close dialog
      setIsAddDialogOpen(false);
      
      toast({
        title: "Item Added",
        description: `${newItemName} has been added successfully`,
      });
    } catch (error) {
      console.error('Failed to add item:', error);
      toast({
        title: "Add Failed",
        description: "There was an error adding the item.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  // Update the Add Item Dialog to use Select for grade
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Stock Management</h2>
          <p className="text-gray-500">Update prices and inventory for your products</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>
      
      {items.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">No Stock Items Found</h3>
          <p className="text-sm text-yellow-600 mb-4">
            Your database is empty. You can import the stock items from the frontend data.
          </p>
          <Button 
            onClick={handleImportStock}
            disabled={importing}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            {importing ? 'Importing...' : 'Import Stock Items'}
          </Button>
        </div>
      )}
      
      {items.length > 0 && (
        <div className="rounded-md border mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="w-[100px] text-right">Price</TableHead>
                <TableHead className="w-[100px] text-right">Quantity</TableHead>
                <TableHead className="w-[100px] text-right">Grade</TableHead>
                <TableHead className="w-[100px] text-right">Location</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.grade}</TableCell>
                  <TableCell className="text-right">{item.location}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleEditClick(item)}
                      variant="outline" 
                      size="sm"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">Edit Product</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-2">{editingItem.name}</p>
                <p className="text-sm text-gray-500 mb-4">ID: {editingItem.id}</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <Input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  className="flex-1" 
                  onClick={handleSaveChanges}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">Add New Product</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min="0.01"
                step="0.01"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={newItemGrade} onValueChange={setNewItemGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+/A">A+/A</SelectItem>
                  <SelectItem value="A++">A++</SelectItem>
                  <SelectItem value="A/A">A/A</SelectItem>
                  <SelectItem value="AB">AB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newItemLocation}
                onChange={(e) => setNewItemLocation(e.target.value)}
                placeholder="Warehouse, Store, etc."
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                className="flex-1" 
                onClick={handleAddItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button 
                className="flex-1" 
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStockList;
