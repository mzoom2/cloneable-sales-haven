
import React, { useState } from 'react';

interface FilterOptions {
  category?: string;
  grade?: string;
  location?: string;
  model?: string;
}

interface FilterSidebarProps {
  updateFilters: (filters: FilterOptions) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ updateFilters }) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleGradeChange = (grade: string) => {
    const newFilters = { ...filters, grade };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleLocationChange = (location: string) => {
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  return (
    <div className="pr-6">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Warehouse</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleLocationChange('USA')}
              checked={filters.location === 'USA'} 
            />
            <span>HongKong (90)</span>
          </label>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300" 
              onChange={() => handleCategoryChange('iphone')}
              checked={filters.category === 'iphone'}
            />
            <span>Cell Phone (67)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleCategoryChange('ipad')} 
              checked={filters.category === 'ipad'}
            />
            <span>Tablets (8)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleCategoryChange('watch')}
              checked={filters.category === 'watch'} 
            />
            <span>Watches (15)</span>
          </label>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Lock Status</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>GSM Unlocked (75)</span>
          </label>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Grade</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleGradeChange('A')}
              checked={filters.grade === 'A'} 
            />
            <span>A/A- (94)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleGradeChange('A+')}
              checked={filters.grade === 'A+'} 
            />
            <span>A+/A (27)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleGradeChange('A++')}
              checked={filters.grade === 'A++'} 
            />
            <span>A++ (31)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={() => handleGradeChange('AB')}
              checked={filters.grade === 'AB'} 
            />
            <span>AB (8)</span>
          </label>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Manufacturer</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                onChange={() => handleCategoryChange('iphone')}
                checked={filters.category === 'iphone'} 
              />
              <span>Apple (145)</span>
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                onChange={() => handleCategoryChange('samsung')}
                checked={filters.category === 'samsung'} 
              />
              <span>Samsung (22)</span>
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
