
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StockItem, stockItems as sampleStockItems } from '@/data/stockItems';
import { toast } from '@/hooks/use-toast';
import { Save, X, Upload, RefreshCw, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { getStockItems, updateStockItem, importStockItems, addStockItem, deleteStockItem } from '@/services/AdminService';
import { updateStockItemImages, updateStockItemDetails } from '@/services/StockService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploader from '@/components/ImageUploader';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileText } from 'lucide-react';

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

  // Image management state
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageItem, setImageItem] = useState<StockItem | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [detailImage, setDetailImage] = useState("");

  // State for delete confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<StockItem | null>(null);

  // New state for details dialog
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [detailsItem, setDetailsItem] = useState<StockItem | null>(null);
  
  // Form schema for product details
  const detailsFormSchema = z.object({
    productDetails: z.string().optional(),
    displaySpecs: z.string().optional(),
    performanceSpecs: z.string().optional(),
    cameraSpecs: z.string().optional(),
    batterySpecs: z.string().optional(),
    warrantyInfo: z.string().optional(),
  });

  // Initialize form
  const detailsForm = useForm<z.infer<typeof detailsFormSchema>>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      productDetails: "",
      displaySpecs: "",
      performanceSpecs: "",
      cameraSpecs: "",
      batterySpecs: "",
      warrantyInfo: "",
    },
  });

  // Handle details management click
  const handleDetailsClick = (item: StockItem) => {
    setDetailsItem(item);
    
    // Set form values from existing data
    detailsForm.reset({
      productDetails: item.productDetails || "",
      displaySpecs: item.specifications?.display || "",
      performanceSpecs: item.specifications?.performance || "",
      cameraSpecs: item.specifications?.camera || "",
      batterySpecs: item.specifications?.battery || "",
      warrantyInfo: item.warrantyInfo || "",
    });
    
    setIsDetailsDialogOpen(true);
  };

  // Handle save details
  const handleSaveDetails = async (values: z.infer<typeof detailsFormSchema>) => {
    if (!detailsItem) return;
    
    try {
      const details = {
        productDetails: values.productDetails,
        specifications: {
          display: values.displaySpecs,
          performance: values.performanceSpecs,
          camera: values.cameraSpecs,
          battery: values.batterySpecs,
        },
        warrantyInfo: values.warrantyInfo,
      };
      
      // Update the item details via API
      await updateStockItemDetails(detailsItem.id, details);
      
      // Update local state
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === detailsItem.id 
            ? { 
                ...item, 
                productDetails: values.productDetails,
                specifications: {
                  display: values.displaySpecs,
                  performance: values.performanceSpecs,
                  camera: values.cameraSpecs,
                  battery: values.batterySpecs,
                },
                warrantyInfo: values.warrantyInfo,
              } 
            : item
        )
      );
      
      setIsDetailsDialogOpen(false);
      
      toast({
        title: "Details Updated",
        description: `Details for ${detailsItem.name} have been updated successfully`,
      });
    } catch (error) {
      console.error('Failed to update item details:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the item details.",
        variant: "destructive"
      });
    }
  };

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

  // Handle image management click
  const handleImagesClick = (item: StockItem) => {
    setImageItem(item);
    setMainImage(item.images?.main || "");
    setFrontImage(item.images?.front || "");
    setBackImage(item.images?.back || "");
    setDetailImage(item.images?.detail || "");
    setIsImageDialogOpen(true);
  };

  // New function to handle delete click
  const handleDeleteClick = (item: StockItem) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  // New function to confirm deletion
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await deleteStockItem(itemToDelete.id);
      
      // Update local state
      setItems(prevItems => prevItems.filter(item => item.id !== itemToDelete.id));
      
      toast({
        title: "Item Deleted",
        description: `${itemToDelete.name} has been deleted successfully`,
      });
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the item.",
        variant: "destructive"
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
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

  const handleSaveImages = async () => {
    if (!imageItem) return;
    
    try {
      const images = {
        main: mainImage,
        front: frontImage || undefined,
        back: backImage || undefined,
        detail: detailImage || undefined
      };
      
      // Update the item images via API
      await updateStockItemImages(imageItem.id, images);
      
      // Update local state
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === imageItem.id 
            ? { ...item, images } 
            : item
        )
      );
      
      setIsImageDialogOpen(false);
      
      toast({
        title: "Images Updated",
        description: `Images for ${imageItem.name} have been updated successfully`,
      });
    } catch (error) {
      console.error('Failed to update item images:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the item images.",
        variant: "destructive"
      });
    }
  };

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
        location: newItemLocation,
        images: {
          main: ""
        }
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Stock Management</h2>
          <p className="text-gray-500">Update prices, inventory, and images for your products</p>
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
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {item.images?.main && (
                        <img 
                          src={item.images.main} 
                          alt={item.name} 
                          className="h-10 w-10 object-cover rounded-md"
                        />
                      )}
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.grade}</TableCell>
                  <TableCell className="text-right">{item.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditClick(item)}
                        variant="outline" 
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleImagesClick(item)}
                        variant="outline"
                        size="sm"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDetailsClick(item)}
                        variant="outline"
                        size="sm"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDeleteClick(item)}
                        variant="destructive" 
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

      {/* Image Management Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">Manage Product Images</DialogTitle>
          </DialogHeader>
          {imageItem && (
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-2">{imageItem.name}</p>
                <p className="text-sm text-gray-500 mb-4">ID: {imageItem.id}</p>
              </div>
              
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Images</TabsTrigger>
                  <TabsTrigger value="preview">Image Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUploader 
                      label="Main Image" 
                      imageUrl={mainImage} 
                      onChange={setMainImage}
                    />
                    
                    <ImageUploader 
                      label="Front View" 
                      imageUrl={frontImage} 
                      onChange={setFrontImage}
                    />
                    
                    <ImageUploader 
                      label="Back View" 
                      imageUrl={backImage} 
                      onChange={setBackImage}
                    />
                    
                    <ImageUploader 
                      label="Detail View" 
                      imageUrl={detailImage} 
                      onChange={setDetailImage}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="pt-4">
                  {(mainImage || frontImage || backImage || detailImage) ? (
                    <div className="grid grid-cols-2 gap-4">
                      {mainImage && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Main Image</p>
                          <div className="border rounded-md overflow-hidden bg-slate-100">
                            <img 
                              src={mainImage} 
                              alt="Main" 
                              className="w-full h-40 object-contain"
                            />
                          </div>
                        </div>
                      )}
                      
                      {frontImage && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Front View</p>
                          <div className="border rounded-md overflow-hidden bg-slate-100">
                            <img 
                              src={frontImage} 
                              alt="Front" 
                              className="w-full h-40 object-contain"
                            />
                          </div>
                        </div>
                      )}
                      
                      {backImage && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Back View</p>
                          <div className="border rounded-md overflow-hidden bg-slate-100">
                            <img 
                              src={backImage} 
                              alt="Back" 
                              className="w-full h-40 object-contain"
                            />
                          </div>
                        </div>
                      )}
                      
                      {detailImage && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Detail View</p>
                          <div className="border rounded-md overflow-hidden bg-slate-100">
                            <img 
                              src={detailImage} 
                              alt="Detail" 
                              className="w-full h-40 object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No images uploaded yet
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  className="flex-1" 
                  onClick={handleSaveImages}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Images
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => setIsImageDialogOpen(false)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {itemToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Product Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">Product Details & Specifications</DialogTitle>
          </DialogHeader>
          {detailsItem && (
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-2">{detailsItem.name}</p>
                <p className="text-sm text-gray-500 mb-4">ID: {detailsItem.id}</p>
              </div>
              
              <Form {...detailsForm}>
                <form onSubmit={detailsForm.handleSubmit(handleSaveDetails)} className="space-y-6">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Product Details</TabsTrigger>
                      <TabsTrigger value="specs">Specifications</TabsTrigger>
                      <TabsTrigger value="warranty">Warranty Info</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4 pt-4">
                      <FormField
                        control={detailsForm.control}
                        name="productDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter detailed product description..." 
                                className="min-h-[200px] p-3" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="specs" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={detailsForm.control}
                          name="displaySpecs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Specifications</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Screen size, resolution, etc..." 
                                  className="min-h-[120px] p-3" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={detailsForm.control}
                          name="performanceSpecs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Performance Specifications</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Processor, RAM, storage, etc..." 
                                  className="min-h-[120px] p-3" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={detailsForm.control}
                          name="cameraSpecs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Camera Specifications</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Megapixels, features, etc..." 
                                  className="min-h-[120px] p-3" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={detailsForm.control}
                          name="batterySpecs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Battery Specifications</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Battery capacity, charging features, etc..." 
                                  className="min-h-[120px] p-3" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="warranty" className="space-y-4 pt-4">
                      <FormField
                        control={detailsForm.control}
                        name="warrantyInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warranty Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Warranty details, coverage periods, etc..." 
                                className="min-h-[200px] p-3" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      type="submit"
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Details
                    </Button>
                    <Button 
                      type="button"
                      className="flex-1" 
                      variant="outline"
                      onClick={() => setIsDetailsDialogOpen(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStockList;
