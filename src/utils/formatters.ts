import { type Restaurant, type RestaurantFeatured } from '~/types';
import { textByStoreCategory } from '~/constants';

/**
 * Formats the restaurant category for display
 */
export const formatCategory = (category: Restaurant['category']): string => {
  return textByStoreCategory[category] || category;
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
 * Optimizes Unsplash URLs for better performance
 */
export const getPrimaryImage = (images: string[]): string | null => {
  if (images.length === 0) return null;
  
  const primaryImage = images[0];
  
  // Optimize Unsplash URLs for better performance
  if (primaryImage.includes('unsplash.com')) {
    // Add/modify Unsplash URL parameters for optimal loading
    const url = new URL(primaryImage);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', '800'); // Reasonable width for cards
    url.searchParams.set('h', '400'); // 2:1 aspect ratio
    url.searchParams.set('q', '80'); // Good quality/size balance
    return url.toString();
  }
  
  return primaryImage;
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Gets optimized image URLs for different screen sizes
 */
export const getOptimizedImageSrcSet = (imageUrl: string): string => {
  if (!imageUrl.includes('unsplash.com')) {
    return imageUrl;
  }

  const url = new URL(imageUrl);
  const sizes = [400, 600, 800, 1200];
  
  const srcSet = sizes.map(size => {
    const optimizedUrl = new URL(imageUrl);
    optimizedUrl.searchParams.set('auto', 'format');
    optimizedUrl.searchParams.set('fit', 'crop');
    optimizedUrl.searchParams.set('w', size.toString());
    optimizedUrl.searchParams.set('h', (size / 2).toString()); // 2:1 aspect ratio
    optimizedUrl.searchParams.set('q', '80');
    return `${optimizedUrl.toString()} ${size}w`;
  }).join(', ');

  return srcSet;
};

/**
 * Gets a placeholder image URL for loading states
 */
export const getImagePlaceholder = (width: number = 400, height: number = 200): string => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
        Loading...
      </text>
    </svg>`
  ).toString('base64')}`;
};
