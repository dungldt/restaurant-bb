import React from 'react';
import { type STORE_CATEGORY } from '@prisma/client';
import { getFilterCategories, CSS_CLASSES } from '~/constants';

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
          className={CSS_CLASSES.SEARCH_INPUT}
        />
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={`${CSS_CLASSES.FILTER_BUTTON} ${
                selectedCategory === category.key
                  ? CSS_CLASSES.FILTER_BUTTON_ACTIVE
                  : CSS_CLASSES.FILTER_BUTTON_INACTIVE
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
