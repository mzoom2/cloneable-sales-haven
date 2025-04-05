import React, { useState } from 'react';
import { Search, ChevronDown, Filter, Clock, Star, CirclePlay } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const videoData = [
  {
    id: 1,
    title: "Client Case",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    rating: 4.5,
    reviews: 2,
    lessons: 0,
    level: "Intermediate",
    provider: "Uephone"
  },
  {
    id: 2,
    title: "Unpacking Video",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    rating: 5.0,
    reviews: 5,
    lessons: 0,
    level: "Intermediate",
    provider: "Uephone"
  },
  {
    id: 3,
    title: "Product Guide",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    rating: 5.0,
    reviews: 5,
    lessons: 0,
    level: "Intermediate",
    provider: "Uephone"
  }
];

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleLevelChange = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const handlePriceChange = (price: string) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(p => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedPrices([]);
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-[#f9f9fb] py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <a href="/" className="text-gray-600 hover:text-primary">Home</a>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-800 font-medium">Course</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64">
            <div className="space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox
                      id="client-case"
                      checked={selectedCategories.includes('Client Case')}
                      onCheckedChange={() => handleCategoryChange('Client Case')}
                      className="mr-2"
                    />
                    <label htmlFor="client-case" className="text-sm cursor-pointer">Client Case</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="product-guide"
                      checked={selectedCategories.includes('Product Guide')}
                      onCheckedChange={() => handleCategoryChange('Product Guide')}
                      className="mr-2"
                    />
                    <label htmlFor="product-guide" className="text-sm cursor-pointer">Product Guide</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="unpacking-video"
                      checked={selectedCategories.includes('Unpacking Video')}
                      onCheckedChange={() => handleCategoryChange('Unpacking Video')}
                      className="mr-2"
                    />
                    <label htmlFor="unpacking-video" className="text-sm cursor-pointer">Unpacking Video</label>
                  </div>
                </div>
              </div>
              
              {/* Levels */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Levels</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox
                      id="all-levels"
                      checked={selectedLevels.includes('All Levels')}
                      onCheckedChange={() => handleLevelChange('All Levels')}
                      className="mr-2"
                    />
                    <label htmlFor="all-levels" className="text-sm cursor-pointer">All Levels</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="beginner"
                      checked={selectedLevels.includes('Beginner')}
                      onCheckedChange={() => handleLevelChange('Beginner')}
                      className="mr-2"
                    />
                    <label htmlFor="beginner" className="text-sm cursor-pointer">Beginner</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="intermediate"
                      checked={selectedLevels.includes('Intermediate')}
                      onCheckedChange={() => handleLevelChange('Intermediate')}
                      className="mr-2"
                    />
                    <label htmlFor="intermediate" className="text-sm cursor-pointer">Intermediate</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="expert"
                      checked={selectedLevels.includes('Expert')}
                      onCheckedChange={() => handleLevelChange('Expert')}
                      className="mr-2"
                    />
                    <label htmlFor="expert" className="text-sm cursor-pointer">Expert</label>
                  </div>
                </div>
              </div>
              
              {/* Prices */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Prices</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox
                      id="free"
                      checked={selectedPrices.includes('Free')}
                      onCheckedChange={() => handlePriceChange('Free')}
                      className="mr-2"
                    />
                    <label htmlFor="free" className="text-sm cursor-pointer">Free</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="paid"
                      checked={selectedPrices.includes('Paid')}
                      onCheckedChange={() => handlePriceChange('Paid')}
                      className="mr-2"
                    />
                    <label htmlFor="paid" className="text-sm cursor-pointer">Paid</label>
                  </div>
                </div>
              </div>
              
              {/* Clear filters button */}
              <Button 
                variant="outline" 
                className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 w-full"
                onClick={clearAllFilters}
              >
                <span className="text-red-500">×</span>
                Clear All Filters
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <span className="text-sm font-medium">{videoData.length} Courses</span>
                <div className="flex-1 sm:flex-none">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Release Date (newest first)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Release Date (newest first)</SelectItem>
                      <SelectItem value="oldest">Release Date (oldest first)</SelectItem>
                      <SelectItem value="rating">Rating (highest first)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoData.map((video) => (
                <div key={video.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={video.image} 
                      alt={video.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-2 cursor-pointer hover:bg-black/70 transition-colors">
                        <CirclePlay className="text-white" size={40} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <span className="font-semibold text-amber-500 mr-1">{video.rating}</span>
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${i < Math.floor(video.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} ${
                              i === Math.floor(video.rating) && video.rating % 1 > 0 ? 'text-amber-500 fill-amber-500' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm ml-1">({video.reviews})</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    
                    {/* Details */}
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <div className="flex items-center mr-4">
                        <span>{video.lessons} Lessons</span>
                      </div>
                      <div className="flex items-center">
                        <span>{video.level}</span>
                      </div>
                    </div>
                    
                    {/* Provider */}
                    <div className="flex items-center mt-3 pt-3 border-t">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs mr-2">U</div>
                      <span className="text-sm">{video.provider}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Videos;
