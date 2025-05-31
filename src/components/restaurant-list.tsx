'use client';

import React from 'react';
import { ErrorDisplay, LoadingSpinner, RestaurantCard, SearchAndFilter } from '~/components/ui';
import { useRestaurantsWithFilters } from '~/hooks/use-restaurants-with-filters';
import { UI_MESSAGES } from '~/constants';
import { type Restaurant } from '~/types';

export function RestaurantList() {
  const {
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
    getRestaurantToggleState
  } = useRestaurantsWithFilters();

  // Handle favorite click for individual restaurant
  const handleRestaurantFavoriteClick = (restaurant: Restaurant) => async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await handleFavoriteToggle(restaurant.id, restaurant.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message={UI_MESSAGES.LOADING_RESTAURANTS} />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={`${UI_MESSAGES.ERROR_LOADING_RESTAURANTS}: ${error}`}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Restaurants</h1>
      </div>
      
      {/* Search and Filter Section */}
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Results Section */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          {searchQuery || selectedCategory !== 'ALL'
            ? 'No restaurants found matching your criteria.'
            : 'No restaurants found.'}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant: Restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onFavoriteClick={handleRestaurantFavoriteClick(restaurant)}
              isToggling={getRestaurantToggleState(restaurant.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
