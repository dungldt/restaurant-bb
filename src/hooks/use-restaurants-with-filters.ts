import { useState, useMemo } from 'react';
import { type STORE_CATEGORY } from '@prisma/client';
import { useRestaurants } from './use-restaurants';
import { type Restaurant } from '~/types';

export interface UseRestaurantsWithFiltersReturn {
  restaurants: Restaurant[] | undefined;
  filteredRestaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
  isToggling: boolean;
  searchQuery: string;
  selectedCategory: STORE_CATEGORY | 'ALL';
  handleFavoriteToggle: (restaurantId: string, isFavorite: boolean) => Promise<void>;
  handleSearchChange: (query: string) => void;
  handleCategoryChange: (category: STORE_CATEGORY | 'ALL') => void;
  refetch: () => void;
}

/**
 * Enhanced hook that adds search and filter functionality to useRestaurants
 */
export const useRestaurantsWithFilters = (): UseRestaurantsWithFiltersReturn => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<STORE_CATEGORY | 'ALL'>('ALL');

  const {
    restaurants,
    isLoading,
    error,
    isToggling,
    handleFavoriteToggle,
    refetch
  } = useRestaurants();

  // Filter restaurants based on search query and selected category
  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return [];

    return restaurants.filter((restaurant) => {
      // Search filter - check name, description, and city
      const matchesSearch = searchQuery === '' || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'ALL' || 
        restaurant.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, selectedCategory]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: STORE_CATEGORY | 'ALL') => {
    setSelectedCategory(category);
  };

  return {
    restaurants,
    filteredRestaurants,
    isLoading,
    error,
    isToggling,
    searchQuery,
    selectedCategory,
    handleFavoriteToggle,
    handleSearchChange,
    handleCategoryChange,
    refetch,
  };
};
