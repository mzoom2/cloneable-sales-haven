import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StockItem, stockItems } from '@/data/stockItems';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addOffer } from '@/services/OfferService';
import { toast } from "@/hooks/use-toast";
import Title from '@/components/Title';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<StockItem | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      const foundProduct = stockItems.find(item => item.id === productId);
      setProduct(foundProduct);
    }
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) {
      toast({
        title: "Error",
        description: "Product not found.",
        variant: "destructive"
      });
      return;
    }
    
    if (!price) {
      toast({
        title: "Error",
        description: "Please enter your offered price.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      addOffer(product, quantity, price);
      toast({
        title: "Success",
        description: "Offer submitted successfully!",
      });
      // Clear the price input after successful submission
      setPrice('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit offer.",
        variant: "destructive"
      });
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p>Sorry, the product you are looking for could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Title title={`${product?.name || 'Product'} Details`} />
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img 
              src={product.images.main} 
              alt={product.name} 
              className="w-full rounded-lg shadow-md" 
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">Grade: {product.grade}</p>
            <p className="text-gray-600 mb-4">Location: {product.location}</p>
            <p className="text-gray-700 font-semibold mb-4">Price: ${product.price}</p>
            
            {/* Offer Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={handleQuantityChange} 
                  min="1" 
                  className="w-full" 
                />
              </div>
              
              <div>
                <Label htmlFor="price">Your Offer Price</Label>
                <Input 
                  type="number" 
                  id="price" 
                  value={price} 
                  onChange={handlePriceChange} 
                  placeholder="Enter your price" 
                  className="w-full" 
                />
              </div>
              
              <Button type="submit" className="bg-blue-600 text-white">
                Submit Offer
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
