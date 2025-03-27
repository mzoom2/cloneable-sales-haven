
import React from 'react';

const FilterSidebar = () => {
  return (
    <div className="pr-6">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Warehouse</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>HongKong (90)</span>
          </label>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>Cell Phone (67)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>Tablets (8)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
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
            <input type="checkbox" className="rounded border-gray-300" />
            <span>A/A- (94)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>A+/A (27)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>A++ (31)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>AB (8)</span>
          </label>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Manufacturer</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Apple (145)</span>
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
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
