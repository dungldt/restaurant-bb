import React from 'react';
import { type STORE_CATEGORY } from '@prisma/client';
import { getFilterCategories } from '~/constants';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: STORE_CATEGORY | 'ALL';
  onCategoryChange: (category: STORE_CATEGORY | 'ALL') => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = getFilterCategories();

  return (
    <div className="mb-8">
      {/* Search Box */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for the name of the restaurant"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:none focus:border-transparent shadow-lg"
        />
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                selectedCategory === category.key
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              } whitespace-nowrap flex-shrink-0`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
