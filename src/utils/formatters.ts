import { type Restaurant, type RestaurantFeatured } from '~/types';
import { CATEGORY_DISPLAY_NAMES } from '~/constants';

/**
 * Formats the restaurant category for display
 */
export const formatCategory = (category: Restaurant['category']): string => {
  return CATEGORY_DISPLAY_NAMES[category] || category;
};

/**
 * Formats the rating display with star emoji
 */
export const formatRating = (rating: number, ratingCount: number): string => {
  return `⭐ ${rating.toFixed(1)} (${ratingCount.toLocaleString()})`;
};

/**
 * Checks if a restaurant has a featured badge
 */
export const isFeaturedRestaurant = (featured: RestaurantFeatured | null): boolean => {
  return featured !== null && typeof featured === 'object' && !!featured.text;
};

/**
 * Gets the featured text for display
 */
export const getFeaturedText = (featured: RestaurantFeatured | null): string => {
  if (!isFeaturedRestaurant(featured)) return '';
  return featured!.text;
};

/**
 * Formats price range for display
 */
export const formatPriceRange = (priceRange: string): string => {
  // Convert "3~5" to "¥3,000~¥5,000" or similar formatting
  const parts = priceRange.split('~');
  if (parts.length === 2) {
    const [min, max] = parts;
    return `¥${min}k~¥${max}k`;
  }
  return priceRange;
};

/**
 * Gets the primary image URL for a restaurant
 */
export const getPrimaryImage = (images: string[]): string | null => {
  return images.length > 0 ? images[0] : null;
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format city name for display (capitalize first letter)
 */
export const formatCity = (city: string): string => {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};
