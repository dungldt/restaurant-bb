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


