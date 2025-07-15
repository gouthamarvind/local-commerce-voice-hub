
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  distance: number;
  onDistanceChange: (distance: number) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const availableTags = ['Fresh', 'Organic', 'Local', 'Offers', 'Handmade', 'Traditional', 'Pure'];

export const ProductFilters: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  distance,
  onDistanceChange,
  selectedTags,
  onTagsChange
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Distance Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Distance: {distance} km
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={distance}
          onChange={(e) => onDistanceChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Tags Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white p-6 rounded-lg shadow-md">
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFilterOpen(true)}
        className="md:hidden fixed bottom-20 left-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 shadow-lg z-40 transition-all duration-200"
        aria-label="Open filters"
      >
        <Filter className="w-6 h-6" />
      </button>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
