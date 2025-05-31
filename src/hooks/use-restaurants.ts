import { useCallback, useMemo } from 'react';
import { api } from '~/utils/api';
import { type Restaurant, type RestaurantFeatured } from '~/types';
import { UI_MESSAGES } from '~/constants';

export interface UseRestaurantsReturn {
  restaurants: Restaurant[] | undefined;
  isLoading: boolean;
  error: string | null;
  isToggling: boolean;
  handleFavoriteToggle: (restaurantId: string, isFavorite: boolean) => Promise<void>;
  refetch: () => void;
}

/**
 * Transform raw restaurant data to proper Restaurant type
 */
const transformRestaurantData = (rawData: any[]): Restaurant[] => {
  return rawData.map((item) => ({
    id: item.id,
    name: item.name,
    desc: item.desc,
    rating: item.rating,
    rating_count: item.rating_count,
    category: item.category,
    city: item.city,
    location: item.location,
    price_range: item.price_range,
    images: item.images,
    featured: item.featured && typeof item.featured === 'object' && 'text' in item.featured 
      ? item.featured as RestaurantFeatured 
      : null,
    isFavorite: item.isFavorite,
  }));
};

export const useRestaurants = (): UseRestaurantsReturn => {
  const utils = api.useUtils();

  const {
    data: rawRestaurants,
    isLoading,
    error: queryError,
    refetch
  } = api.restaurant.getRestaurants.useQuery();

  // Transform the data to match our Restaurant type
  const restaurants = useMemo(() => {
    if (!rawRestaurants) return undefined;
    return transformRestaurantData(rawRestaurants);
  }, [rawRestaurants]);

  // Convert tRPC error to string
  const error = queryError ? queryError.message : null;
  const addFavoriteMutation = api.restaurant.addFavorite.useMutation({
    onSuccess: () => {
      utils.restaurant.getRestaurants.invalidate();
    },
    onError: (error) => {
      console.error(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, error);
    },
  });

  const removeFavoriteMutation = api.restaurant.removeFavorite.useMutation({
    onSuccess: () => {
      utils.restaurant.getRestaurants.invalidate();
    },
    onError: (error) => {
      console.error(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, error);
    },
  });

  const handleFavoriteToggle = useCallback(async (restaurantId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await removeFavoriteMutation.mutateAsync({ restaurantId });
      } else {
        await addFavoriteMutation.mutateAsync({ restaurantId });
      }
    } catch (error) {
      console.error(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, error);
      throw error;
    }
  }, [addFavoriteMutation, removeFavoriteMutation]);

  const isToggling = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  return {
    restaurants,
    isLoading,
    error,
    isToggling,
    handleFavoriteToggle,
    refetch: () => refetch(),
  };
};
