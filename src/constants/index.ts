import { STORE_CATEGORY } from '@prisma/client';

// Mock user ID for development - should be replaced with actual auth
export const MOCK_USER_ID = 'mock-user-id';
export const MOCK_USER_EMAIL = 'mock@example.com';
export const MOCK_USER_NAME = 'Mock User';

// UI Messages
export const UI_MESSAGES = {
  LOADING_RESTAURANTS: 'Loading restaurants...',
  ERROR_LOADING_RESTAURANTS: 'Error loading restaurants',
  ERROR_TOGGLING_FAVORITE: 'Error toggling favorite',
  RESTAURANT_ADDED_TO_FAVORITES: 'Restaurant added to favorites',
  RESTAURANT_REMOVED_FROM_FAVORITES: 'Restaurant removed from favorites',
} as const;

// Category display names
export const textByStoreCategory: Record<STORE_CATEGORY, string> = {
  [STORE_CATEGORY.SUSHI]: 'Sushi & Seafood',
  [STORE_CATEGORY.UNAGI]: 'Eel',
  [STORE_CATEGORY.TEMPURA]: 'Tempura',
  [STORE_CATEGORY.TONKATSU]: 'Tonkatsu & Kushikatsu',
  [STORE_CATEGORY.YAKITORI]: 'Yakitori & Skewers',
  [STORE_CATEGORY.SUKIYAKI]: 'Sukiyaki & Shabu-shabu',
  [STORE_CATEGORY.SOBA]: 'Soba & Udon',
  [STORE_CATEGORY.RAMEN]: 'Ramen & Tsukemen',
  [STORE_CATEGORY.YAKISOBA]: 'Yakisoba',
  [STORE_CATEGORY.OKONOMIYAKI]: 'Okonomiyaki & Takoyaki',
  [STORE_CATEGORY.DONBURI]: 'Rice Bowls',
  [STORE_CATEGORY.ODEN]: 'Oden',
  [STORE_CATEGORY.KAISEKI]: 'Kaiseki & Traditional Japanese Cuisine',
  [STORE_CATEGORY.HAMBAGU]: 'Hamburg Steak & Omurice',
  [STORE_CATEGORY.TEPPANYAKI]: 'Steak & Teppanyaki',
  [STORE_CATEGORY.CURRY]: 'Curry',
  [STORE_CATEGORY.YAKINIKU]: 'Yakiniku & Horumon',
  [STORE_CATEGORY.NABE]: 'Hot Pot',
  [STORE_CATEGORY.CAFE]: 'Cafe & Desserts',
  [STORE_CATEGORY.IZAKAYA]: 'Izakaya & Bars',
  [STORE_CATEGORY.OTHER]: 'Other Japanese Foods',
} as const;

// Keep old name for backward compatibility, but deprecated
/** @deprecated Use textByStoreCategory instead */
export const CATEGORY_DISPLAY_NAMES = textByStoreCategory;

// Helper functions for category management
export const getAllCategories = (): STORE_CATEGORY[] => {
  return Object.keys(textByStoreCategory) as STORE_CATEGORY[];
};

export const getCategoryDisplayName = (category: STORE_CATEGORY): string => {
  return textByStoreCategory[category];
};

// Filter categories for the UI (ordered by popularity/importance)
export const getFilterCategories = (): Array<{ key: STORE_CATEGORY | 'ALL'; label: string }> => {
  return [
    { key: 'ALL', label: 'Entire' },
    { key: 'RAMEN', label: textByStoreCategory.RAMEN },
    { key: 'TONKATSU', label: textByStoreCategory.TONKATSU },
    { key: 'SOBA', label: textByStoreCategory.SOBA },
    { key: 'OKONOMIYAKI', label: textByStoreCategory.OKONOMIYAKI },
    { key: 'SUKIYAKI', label: textByStoreCategory.SUKIYAKI },
    { key: 'TEMPURA', label: textByStoreCategory.TEMPURA },
    { key: 'UNAGI', label: textByStoreCategory.UNAGI },
    { key: 'YAKITORI', label: textByStoreCategory.YAKITORI },
    { key: 'SUSHI', label: textByStoreCategory.SUSHI },
    { key: 'TEPPANYAKI', label: textByStoreCategory.TEPPANYAKI },
    { key: 'YAKINIKU', label: textByStoreCategory.YAKINIKU },
    { key: 'CURRY', label: textByStoreCategory.CURRY },
    { key: 'DONBURI', label: textByStoreCategory.DONBURI },
    { key: 'NABE', label: textByStoreCategory.NABE },
    { key: 'CAFE', label: textByStoreCategory.CAFE },
    { key: 'IZAKAYA', label: textByStoreCategory.IZAKAYA },
    { key: 'KAISEKI', label: textByStoreCategory.KAISEKI },
    { key: 'HAMBAGU', label: textByStoreCategory.HAMBAGU },
    { key: 'YAKISOBA', label: textByStoreCategory.YAKISOBA },
    { key: 'ODEN', label: textByStoreCategory.ODEN },
    { key: 'OTHER', label: textByStoreCategory.OTHER },
  ];
};

// CSS Classes for reusability
export const CSS_CLASSES = {
  CARD: 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200',
  CARD_IMAGE: 'w-full h-48 object-cover',
  CARD_CONTENT: 'p-4',
  BUTTON_FAVORITE: 'p-2 rounded-full transition-colors duration-200',
  BUTTON_FAVORITE_OVERLAY: 'absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-40 backdrop-blur-sm transition-all duration-200 hover:bg-opacity-20 shadow-sm',
  BUTTON_FAVORITE_ACTIVE: 'text-red-500',
  BUTTON_FAVORITE_INACTIVE: 'text-white',
  BADGE_CATEGORY: 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium',
  BADGE_FEATURED: 'mt-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded',
  BADGE_FEATURED_NEW: 'inline-flex items-center text-orange-600 text-xs px-0 py-1 rounded-sm font-normal',
  GRID: 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  CONTAINER: 'max-w-7xl mx-auto p-6',
  SEARCH_INPUT: 'w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:none focus:border-transparent shadow-lg',
  FILTER_BUTTON: 'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
  FILTER_BUTTON_ACTIVE: 'bg-gray-300 text-gray-500',
  FILTER_BUTTON_INACTIVE: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700',
} as const;
