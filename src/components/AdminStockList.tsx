
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StockItem, stockItems as sampleStockItems } from '@/data/stockItems';
import { toast } from '@/hooks/use-toast';
import { Save, X, Upload, RefreshCw } from 'lucide-react';
import { getStockItems, updateStockItem, importStockItems } from '@/services/AdminService';

const AdminStockList: React.FC = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [importing, setImporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  if (loading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Stock Management</h2>
          <p className="text-gray-500">Update prices and inventory for your products</p>
        </div>
        
        <Button 
          onClick={handleRefresh}
          variant="outline" 
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
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
    </div>
  );
};

export default AdminStockList;
