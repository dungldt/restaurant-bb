"use client";

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { type RestaurantCardProps } from '~/types';
import {
  getPrimaryImage,
  isFeaturedRestaurant,
  getFeaturedText,
  formatCategory
} from '~/utils/formatters';
import { renderIcon } from '~/utils/icon-mapper';
import { OptimizedImage } from './optimized-image';

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onFavoriteToggle,
  isLoading
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const primaryImage = getPrimaryImage(restaurant.images);
  const hasFeatured = isFeaturedRestaurant(restaurant.featured);
  const featuredText = getFeaturedText(restaurant.featured);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Immediate visual feedback
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    try {
      await onFavoriteToggle(restaurant.id, restaurant.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Image Container with Favorite Button */}
      <div className="relative">
        {primaryImage && (
          <OptimizedImage
            src={primaryImage}
            alt={restaurant.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {/* Favorite Button on Top Right */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-40 backdrop-blur-sm transition-all duration-200 hover:bg-opacity-60 hover:shadow-md shadow-sm focus:outline-none focus:none ${
            restaurant.isFavorite
              ? 'text-red-600'
              : 'text-white'
          } ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
          } transform transition-all duration-150 ease-in-out`}
          disabled={isLoading}
          aria-label={restaurant.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {restaurant.isFavorite ? (
            <Heart
              className={`w-4 h-4 text-red-600 transition-all duration-200`}
              fill="currentColor"
            />
          ) : (
            <Heart
              className={`w-4 h-4 transition-all duration-200`}
              fill="none"
            />
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      </div>

      <div className="p-4">
        {/* Featured Badge */}
        {hasFeatured && (
          <div className="mb-2">
            <div className="inline-flex items-center text-orange-600 text-xs px-0 py-1 rounded-sm font-normal">
              {restaurant.featured?.icon && renderFeaturedIcon(restaurant.featured.icon)}
              <span>{featuredText}</span>
            </div>
          </div>
        )}
        
        {/* Restaurant Name and Rating Row */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md text-gray-900 flex-1 mr-2">{restaurant.name}</h3>
          <div className="flex items-center text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-gray-500">{restaurant.rating}</span>
            <span className="text-gray-500 ml-1">({restaurant.rating_count})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{restaurant.desc}</p>
        
        {/* Location, Category, and Price Range */}
        <div className="text-sm text-gray-500 mb-2">
          <span className='uppercase'>{restaurant.city}</span>
          <span className="mx-1">·</span>
          <span>{formatCategory(restaurant.category)}</span>
          <span className="mx-1">·</span>
          <span>{restaurant.price_range}</span>
        </div>
      </div>
    </div>
  );
};
