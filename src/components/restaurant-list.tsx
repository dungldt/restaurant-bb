'use client';

import React from 'react';
import { ErrorDisplay, LoadingSpinner, RestaurantCard } from '~/components/ui';
import { useRestaurants } from '~/hooks/use-restaurants';
import { UI_MESSAGES, CSS_CLASSES } from '~/constants';
import { type Restaurant } from '~/types';

export function RestaurantList() {
  const {
    restaurants,
    isLoading,
    error,
    isToggling,
    handleFavoriteToggle,
    refetch
  } = useRestaurants();

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

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className={CSS_CLASSES.CONTAINER}>
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        <div className="text-center text-gray-500 py-8">
          No restaurants found.
        </div>
      </div>
    );
  }

  return (
    <div className={CSS_CLASSES.CONTAINER}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Restaurants</h1>
        <p className="text-gray-600">Discover amazing restaurants near you</p>
      </div>
      <div className={CSS_CLASSES.GRID}>
        {restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onFavoriteToggle={handleFavoriteToggle}
            isLoading={isToggling}
          />
        ))}
      </div>
    </div>
  );
}
