import { type STORE_CATEGORY } from '@prisma/client';

export interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantFeatured {
  text: string;
  icon: string;
}

export interface Restaurant {
  id: string;
  name: string;
  desc: string;
  rating: number;
  rating_count: number;
  category: STORE_CATEGORY;
  city: string;
  location: string | null;
  price_range: string;
  images: string[];
  featured: RestaurantFeatured | null;
  isFavorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface FavoriteToggleInput {
  restaurantId: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type LoadingState = 'idle' | 'loading' | 'error' | 'success';

// UI Component Props
export interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavoriteToggle: (restaurantId: string, isFavorite: boolean) => Promise<void>;
  isLoading: boolean;
}

export interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export interface LoadingSpinnerProps {
  message?: string;
}
