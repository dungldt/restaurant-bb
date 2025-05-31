import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { api } from '~/utils/api';
import { type Restaurant, type RestaurantFeatured } from '~/types';
import { UI_MESSAGES } from '~/constants';
import { useToast } from '~/components/ui';

export interface UseRestaurantsReturn {
  restaurants: Restaurant[] | undefined;
  isLoading: boolean;
  error: string | null;
  isToggling: boolean;
  handleFavoriteToggle: (restaurantId: string, isFavorite: boolean) => Promise<void>;
  refetch: () => void;
  getRestaurantToggleState: (restaurantId: string) => boolean;
}

interface PendingToggle {
  restaurantId: string;
  targetState: boolean;
  timeoutId: NodeJS.Timeout;
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
  const { showToast } = useToast();
  const [optimisticFavorites, setOptimisticFavorites] = useState<Map<string, boolean>>(new Map());
  const [pendingToggles, setPendingToggles] = useState<Map<string, PendingToggle>>(new Map());
  const [togglingRestaurants, setTogglingRestaurants] = useState<Set<string>>(new Set());
  
  const debounceTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const {
    data: rawRestaurants,
    isLoading,
    error: queryError,
    refetch
  } = api.restaurant.getRestaurants.useQuery();

  // Transform the data to match our Restaurant type with optimistic updates
  const restaurants = useMemo(() => {
    if (!rawRestaurants) return undefined;
    const transformed = transformRestaurantData(rawRestaurants);
    
    // Apply optimistic updates
    return transformed.map(restaurant => {
      const optimisticState = optimisticFavorites.get(restaurant.id);
      return optimisticState !== undefined 
        ? { ...restaurant, isFavorite: optimisticState }
        : restaurant;
    });
  }, [rawRestaurants, optimisticFavorites]);

  // Convert tRPC error to string
  const error = queryError ? queryError.message : null;

  const addFavoriteMutation = api.restaurant.addFavorite.useMutation({
    onSuccess: (data, variables) => {
      // Remove optimistic state once confirmed
      setOptimisticFavorites(prev => {
        const next = new Map(prev);
        next.delete(variables.restaurantId);
        return next;
      });
      setTogglingRestaurants(prev => {
        const next = new Set(prev);
        next.delete(variables.restaurantId);
        return next;
      });
      showToast(UI_MESSAGES.RESTAURANT_ADDED_TO_FAVORITES, 'success', 2000);
      utils.restaurant.getRestaurants.invalidate();
    },
    onError: (error, variables) => {
      console.error(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, error);
      showToast(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, 'error', 3000);
      // Revert optimistic update on error
      setOptimisticFavorites(prev => {
        const next = new Map(prev);
        next.delete(variables.restaurantId);
        return next;
      });
      setTogglingRestaurants(prev => {
        const next = new Set(prev);
        next.delete(variables.restaurantId);
        return next;
      });
    },
  });

  const removeFavoriteMutation = api.restaurant.removeFavorite.useMutation({
    onSuccess: (data, variables) => {
      // Remove optimistic state once confirmed
      setOptimisticFavorites(prev => {
        const next = new Map(prev);
        next.delete(variables.restaurantId);
        return next;
      });
      setTogglingRestaurants(prev => {
        const next = new Set(prev);
        next.delete(variables.restaurantId);
        return next;
      });
      showToast(UI_MESSAGES.RESTAURANT_REMOVED_FROM_FAVORITES, 'success', 2000);
      utils.restaurant.getRestaurants.invalidate();
    },
    onError: (error, variables) => {
      console.error(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, error);
      showToast(UI_MESSAGES.ERROR_TOGGLING_FAVORITE, 'error', 3000);
      // Revert optimistic update on error
      setOptimisticFavorites(prev => {
        const next = new Map(prev);
        next.delete(variables.restaurantId);
        return next;
      });
      setTogglingRestaurants(prev => {
        const next = new Set(prev);
        next.delete(variables.restaurantId);
        return next;
      });
    },
  });

  const handleFavoriteToggle = useCallback(async (restaurantId: string, currentIsFavorite: boolean) => {
    const targetState = !currentIsFavorite;
    
    // Apply optimistic update immediately
    setOptimisticFavorites(prev => {
      const next = new Map(prev);
      next.set(restaurantId, targetState);
      return next;
    });

    // Clear any existing debounce timeout for this restaurant
    const existingTimeout = debounceTimeoutRef.current.get(restaurantId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set up debounced API call
    const timeoutId = setTimeout(async () => {
      setTogglingRestaurants(prev => new Set(prev).add(restaurantId));
      
      try {
        if (targetState) {
          await addFavoriteMutation.mutateAsync({ restaurantId });
        } else {
          await removeFavoriteMutation.mutateAsync({ restaurantId });
        }
      } catch (error) {
        // Error handling is done in mutation callbacks
        console.error('Toggle error:', error);
      }
      
      // Clean up timeout reference
      debounceTimeoutRef.current.delete(restaurantId);
    }, 500); // 500ms debounce

    // Store timeout reference
    debounceTimeoutRef.current.set(restaurantId, timeoutId);
  }, [addFavoriteMutation, removeFavoriteMutation]);

  // Helper function to check if a restaurant is currently being toggled
  const getRestaurantToggleState = useCallback((restaurantId: string): boolean => {
    return togglingRestaurants.has(restaurantId);
  }, [togglingRestaurants]);

  const isToggling = addFavoriteMutation.isPending || removeFavoriteMutation.isPending || togglingRestaurants.size > 0;

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      debounceTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
      debounceTimeoutRef.current.clear();
    };
  }, []);

  return {
    restaurants,
    isLoading,
    error,
    isToggling,
    handleFavoriteToggle,
    refetch: () => refetch(),
    getRestaurantToggleState,
  };
};
