'use client';

import React from 'react';
import { ErrorDisplay, LoadingSpinner, RestaurantCard, SearchAndFilter } from '~/components/ui';
import { useRestaurantsWithFilters } from '~/hooks/use-restaurants-with-filters';
import { UI_MESSAGES, CSS_CLASSES } from '~/constants';
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
    refetch
  } = useRestaurantsWithFilters();

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
    <div className={CSS_CLASSES.CONTAINER}>
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
        <div className={CSS_CLASSES.GRID}>
          {filteredRestaurants.map((restaurant: Restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onFavoriteToggle={handleFavoriteToggle}
              isLoading={isToggling}
            />
          ))}
        </div>
      )}
    </div>
  );
}
