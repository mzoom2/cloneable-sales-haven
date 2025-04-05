
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StockItemCard from '@/components/StockItemCard';
import FilterSidebar from '@/components/FilterSidebar';
import { stockItems, StockItem } from '@/data/stockItems';
import { useSearchParams } from 'react-router-dom';
import Title from '@/components/Title';

type FilterOptions = {
  category?: string;
  grade?: string;
  location?: string;
  model?: string;
};

interface FilterSidebarProps {
  updateFilters: (newFilters: FilterOptions) => void;
}

const ShopList: React.FC = () => {
  const [filteredItems, setFilteredItems] = useState<StockItem[]>(stockItems);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filters: FilterOptions = {};
    const category = searchParams.get('category');
    const grade = searchParams.get('grade');
    const location = searchParams.get('location');
    const model = searchParams.get('model');

    if (category) filters.category = category;
    if (grade) filters.grade = grade;
    if (location) filters.location = location;
    if (model) filters.model = model;

    applyFilters(filters);
  }, [searchParams]);

  const applyFilters = (filters: FilterOptions) => {
    let newFilteredItems = stockItems;

    if (filters.category) {
      newFilteredItems = newFilteredItems.filter(item => 
        item.category && item.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    if (filters.grade) {
      newFilteredItems = newFilteredItems.filter(item => 
        item.grade && item.grade.toLowerCase().includes(filters.grade!.toLowerCase())
      );
    }

    if (filters.location) {
      newFilteredItems = newFilteredItems.filter(item => 
        item.location && item.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.model) {
      newFilteredItems = newFilteredItems.filter(item => 
        item.model && item.model.toLowerCase().includes(filters.model!.toLowerCase())
      );
    }

    setFilteredItems(newFilteredItems);
  };

  const updateFilters = (newFilters: FilterOptions) => {
    // Convert the FilterOptions object to a Record<string, string> for URLSearchParams
    const params: Record<string, string> = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Stock List" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex">
          <FilterSidebar updateFilters={updateFilters} />
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <StockItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopList;
