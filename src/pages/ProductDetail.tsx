import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDisplay from '@/components/ProductDisplay';
import ProductSpecs from '@/components/ProductSpecs';
import { stockItems, StockItem } from '@/data/stockItems';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import Title from '@/components/Title';

interface Params {
  id: string;
}

const ProductDetail = () => {
  const { id } = useParams<Params>();
  const [product, setProduct] = useState<StockItem | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = stockItems.find(item => item.id === parseInt(id, 10));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to a "not found" page or handle the error as needed
        navigate('/not-found');
      }
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Title title={product ? product.name : "Product Details"} />
      <Header />
      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProductDisplay product={product} />
              <div>
                <ProductSpecs product={product} />
                <div className="mt-6">
                  <Button onClick={handleAddToCart}>Add to Cart</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading product details...</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
