import { type STORE_CATEGORY } from '@prisma/client';

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
export const CATEGORY_DISPLAY_NAMES: Record<STORE_CATEGORY, string> = {
  SUSHI: 'Sushi',
  UNAGI: 'Unagi',
  TEMPURA: 'Tempura',
  TONKATSU: 'Tonkatsu',
  YAKITORI: 'Yakitori',
  SUKIYAKI: 'Sukiyaki',
  SOBA: 'Soba',
  RAMEN: 'Ramen',
  YAKISOBA: 'Yakisoba',
  OKONOMIYAKI: 'Okonomiyaki',
  DONBURI: 'Donburi',
  ODEN: 'Oden',
  KAISEKI: 'Kaiseki',
  HAMBAGU: 'Hambagu',
  TEPPANYAKI: 'Teppanyaki',
  CURRY: 'Curry',
  YAKINIKU: 'Yakiniku',
  NABE: 'Nabe',
  CAFE: 'Cafe',
  IZAKAYA: 'Izakaya',
  OTHER: 'Other',
} as const;

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
  GRID: 'grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  CONTAINER: 'max-w-7xl mx-auto p-6',
} as const;
