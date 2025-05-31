import React from 'react';
import { type RestaurantCardProps } from '~/types';
import {
  formatRating,
  formatCity,
  getPrimaryImage,
  isFeaturedRestaurant,
  getFeaturedText,
  formatCategory
} from '~/utils/formatters';
import { CSS_CLASSES } from '~/constants';

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant, 
  onFavoriteToggle, 
  isLoading 
}) => {
  const primaryImage = getPrimaryImage(restaurant.images);
  const hasFeatured = isFeaturedRestaurant(restaurant.featured);
  const featuredText = getFeaturedText(restaurant.featured);

  const handleFavoriteClick = async () => {
    await onFavoriteToggle(restaurant.id, restaurant.isFavorite);
  };

  return (
    <div className={CSS_CLASSES.CARD}>
      {primaryImage && (
        <img
          src={primaryImage}
          alt={restaurant.name}
          className={CSS_CLASSES.CARD_IMAGE}
        />
      )}
      <div className={CSS_CLASSES.CARD_CONTENT}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <button
            onClick={handleFavoriteClick}
            className={`${CSS_CLASSES.BUTTON_FAVORITE} ${
              restaurant.isFavorite 
                ? CSS_CLASSES.BUTTON_FAVORITE_ACTIVE
                : CSS_CLASSES.BUTTON_FAVORITE_INACTIVE
            }`}
            disabled={isLoading}
            aria-label={restaurant.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ❤️
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{restaurant.desc}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{formatRating(restaurant.rating, restaurant.rating_count)}</span>
          <span>{restaurant.price_range}</span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className={CSS_CLASSES.BADGE_CATEGORY}>
            {formatCategory(restaurant.category)}
          </span>
          <span className="text-xs text-gray-500">{formatCity(restaurant.city)}</span>
        </div>
        
        {hasFeatured && (
          <div className={CSS_CLASSES.BADGE_FEATURED}>
            {featuredText}
          </div>
        )}
      </div>
    </div>
  );
};
