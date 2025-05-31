import React from 'react';
import { type RestaurantCardProps } from '~/types';
import {
  formatCity,
  getPrimaryImage,
  isFeaturedRestaurant,
  getFeaturedText,
  formatCategory
} from '~/utils/formatters';
import { renderIcon } from '~/utils/icon-mapper';
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

  // Function to render icon based on icon name from data
  const renderFeaturedIcon = (iconName: string) => {
    return renderIcon(iconName, {
      className: "w-3 h-3 mr-1 text-orange-500",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5
    });
  };

  return (
    <div className={CSS_CLASSES.CARD}>
      {/* Image Container with Favorite Button */}
      <div className="relative">
        {primaryImage && (
          <img
            src={primaryImage}
            alt={restaurant.name}
            className={CSS_CLASSES.CARD_IMAGE}
          />
        )}
        {/* Favorite Button on Top Right */}
        <button
          onClick={handleFavoriteClick}
          className={`${CSS_CLASSES.BUTTON_FAVORITE_OVERLAY} ${
            restaurant.isFavorite
              ? CSS_CLASSES.BUTTON_FAVORITE_ACTIVE
              : CSS_CLASSES.BUTTON_FAVORITE_INACTIVE
          }`}
          disabled={isLoading}
          aria-label={restaurant.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {restaurant.isFavorite ? (
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      <div className={CSS_CLASSES.CARD_CONTENT}>
        {/* Featured Badge */}
        {hasFeatured && (
          <div className="mb-2">
            <div className={CSS_CLASSES.BADGE_FEATURED_NEW}>
              {restaurant.featured?.icon && renderFeaturedIcon(restaurant.featured.icon)}
              <span>{featuredText}</span>
            </div>
          </div>
        )}
        
        {/* Restaurant Name and Rating Row */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold text-gray-900 flex-1 mr-2">{restaurant.name}</h3>
          <div className="flex items-center text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-normal text-gray-900">{restaurant.rating}</span>
            <span className="text-gray-500 ml-1">({restaurant.rating_count})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.desc}</p>
        
        {/* Location, Category, and Price Range */}
        <div className="text-xs text-gray-500 mb-2">
          <span>{formatCity(restaurant.city)}</span>
          <span className="mx-1">·</span>
          <span>{formatCategory(restaurant.category)}</span>
          <span className="mx-1">·</span>
          <span>{restaurant.price_range}</span>
        </div>
      </div>
    </div>
  );
};
