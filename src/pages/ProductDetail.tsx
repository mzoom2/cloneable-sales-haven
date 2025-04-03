
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockItem } from "@/data/stockItems";
import { ShoppingCart, ChevronLeft, Box, Check, Info, Shield, Truck, Tag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from '@/contexts/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getStockItemById } from '@/services/StockService';
import { Badge } from "@/components/ui/badge";
import MakeOfferDialog from '@/components/MakeOfferDialog';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<StockItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice, convertPrice } = useCurrency();
  const navigate = useNavigate();

  // Mock images for demonstration
  const productImages = [
    "https://placehold.co/600x400?text=Main+Image",
    "https://placehold.co/600x400?text=Side+View",
    "https://placehold.co/600x400?text=Back+View",
    "https://placehold.co/600x400?text=Detail+View"
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const product = await getStockItemById(parseInt(id));
          if (product) {
            setItem(product);
          } else {
            toast({
              title: "Product not found",
              description: "This product could not be found.",
              variant: "destructive",
            });
            navigate('/shop-list');
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "There was a problem loading this product.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (item && quantity > 0) {
      addToCart(item, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${item.name} added to your cart`,
      });
    }
  };

  const handleOpenOfferDialog = () => {
    setOfferDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <a href="/shop-list" className="hover:text-primary">Stock List</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Product Details</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : item ? (
          <>
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2" 
                onClick={() => navigate('/shop-list')}
              >
                <ChevronLeft size={18} />
                Back to Stock List
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={productImages[activeImage]} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((img, index) => (
                    <div 
                      key={index} 
                      className={`aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer ${index === activeImage ? 'ring-2 ring-blue-600' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{item.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="font-medium">
                      {item.grade} Grade
                    </Badge>
                    {item.quantity > 0 ? (
                      <Badge className="bg-green-600">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(convertPrice(item.price))}
                </div>
                
                <div className="border-t border-b py-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-medium">{item.quantity} Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Warranty:</span>
                    <span className="font-medium">12 Months</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-l-md rounded-r-none h-12 w-12"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <div className="h-12 px-4 flex items-center justify-center border-y w-20 text-lg font-medium">
                      {quantity}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-r-md rounded-l-none h-12 w-12"
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="w-full h-12 text-lg"
                      onClick={handleAddToCart}
                      disabled={item.quantity === 0}
                    >
                      <ShoppingCart className="mr-2" /> Add to Cart
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full h-12 text-lg" 
                      onClick={handleOpenOfferDialog}
                    >
                      <Tag className="mr-2" /> Make Offer
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Shield className="text-green-600 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">12 Month Warranty</h4>
                      <p className="text-xs text-gray-500">Full coverage for peace of mind</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="text-green-600 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">Fast Shipping</h4>
                      <p className="text-xs text-gray-500">Express delivery available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Tabs defaultValue="details">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  <TabsTrigger value="details">Product Details</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="warranty">Warranty Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-semibold">About this item</h3>
                  <p>
                    This {item.name} is a high-quality refurbished device that has been thoroughly inspected, 
                    tested, and certified to function like new. With a grade of {item.grade}, 
                    you can expect excellent condition with minimal to no cosmetic imperfections.
                  </p>
                  <p>
                    Each device undergoes a rigorous 50-point inspection process to ensure everything 
                    works perfectly. Battery health is above 85% of original capacity, and all 
                    functionality has been verified by our certified technicians.
                  </p>
                  <p>
                    This device is fully unlocked and compatible with all carriers worldwide.
                  </p>
                </TabsContent>
                
                <TabsContent value="specs" className="space-y-4">
                  <h3 className="text-xl font-semibold">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Display</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Screen Size:</span>
                            <span>6.1 inches</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Resolution:</span>
                            <span>2532 x 1170 pixels</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Technology:</span>
                            <span>Super Retina XDR OLED</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Performance</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Processor:</span>
                            <span>A15 Bionic chip</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">RAM:</span>
                            <span>6GB</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Storage:</span>
                            <span>256GB</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Camera</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Main:</span>
                            <span>12MP Wide, 12MP Ultra Wide</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Front:</span>
                            <span>12MP TrueDepth</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Features:</span>
                            <span>Night mode, Deep Fusion</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Battery & Charging</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Capacity:</span>
                            <span>3240 mAh</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Fast Charging:</span>
                            <span>20W wired, 15W MagSafe</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Battery Health:</span>
                            <span>85%+ of original capacity</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="warranty" className="space-y-4">
                  <h3 className="text-xl font-semibold">Warranty Information</h3>
                  <p>
                    All our refurbished devices come with a 12-month warranty covering manufacturing defects 
                    and hardware failures. Our warranty ensures that you receive a quality product that 
                    functions as expected.
                  </p>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Check className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Hardware Failures</h4>
                        <p className="text-sm text-gray-600">
                          Covers any internal hardware failures that affect the functionality of the device.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Check className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Battery Issues</h4>
                        <p className="text-sm text-gray-600">
                          If battery health drops below 80% within the warranty period, we'll replace it.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Check className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">Display & Touch Functionality</h4>
                        <p className="text-sm text-gray-600">
                          Covers any display defects or touch response issues that weren't present at purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for could not be found.</p>
            <Button onClick={() => navigate('/shop-list')}>
              Return to Stock List
            </Button>
          </div>
        )}
      </div>

      {/* Offer Dialog */}
      {item && (
        <MakeOfferDialog 
          open={offerDialogOpen} 
          onOpenChange={setOfferDialogOpen} 
          stockItem={item}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
