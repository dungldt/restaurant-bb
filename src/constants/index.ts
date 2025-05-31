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
  CARD: 'bg-white rounded-lg shadow-md overflow-hidden',
  CARD_IMAGE: 'w-full h-48 object-cover',
  CARD_CONTENT: 'p-4',
  BUTTON_FAVORITE: 'p-2 rounded-full transition-colors duration-200',
  BUTTON_FAVORITE_ACTIVE: 'text-red-500 hover:bg-red-50',
  BUTTON_FAVORITE_INACTIVE: 'text-gray-400 hover:bg-gray-50',
  BADGE_CATEGORY: 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded',
  BADGE_FEATURED: 'mt-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded',
  GRID: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
  CONTAINER: 'max-w-4xl mx-auto p-6',
} as const;
