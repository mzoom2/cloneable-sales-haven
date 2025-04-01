
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
import { stockItems, StockItem } from '@/data/stockItems';
import { toast } from '@/hooks/use-toast';
import { Save, X } from 'lucide-react';

const AdminStockList: React.FC = () => {
  // In a real app, this would fetch from your backend API
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the local stockItems data
    const storedItems = localStorage.getItem('adminStockItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(stockItems);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save changes to localStorage whenever items change
    if (!loading) {
      localStorage.setItem('adminStockItems', JSON.stringify(items));
    }
  }, [items, loading]);

  const handleEditClick = (item: StockItem) => {
    setEditingItem(item);
    setEditedPrice(item.price.toString());
    setEditedQuantity(item.quantity.toString());
    setIsDialogOpen(true);
  };

  const handleSaveChanges = () => {
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

    // Update the item in the list
    const updatedItems = items.map(item => 
      item.id === editingItem.id 
        ? { ...item, price: newPrice, quantity: newQuantity } 
        : item
    );

    setItems(updatedItems);
    setIsDialogOpen(false);
    
    toast({
      title: "Item Updated",
      description: `${editingItem.name} has been updated successfully`,
    });
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Stock Management</h2>
      <p className="text-gray-500 mb-6">Update prices and inventory for your products</p>
      
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
