import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const restaurantRouter = createTRPCRouter({
  getRestaurants: publicProcedure.query(async ({ ctx }) => {
    const restaurants = await ctx.db.restaurant.findMany({
      include: {
        favorites: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });

    // Transform the data to match the expected format with isFavorite
    // Using a mock userId for now
    const mockUserId = 'mock-user-id';
    
    return restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      desc: restaurant.description || '',
      rating: restaurant.rating,
      rating_count: restaurant.ratingCount,
      category: restaurant.category,
      city: restaurant.city.toLowerCase(),
      location: restaurant.location,
      price_range: restaurant.priceRange,
      images: restaurant.images,
      featured: restaurant.featured,
      isFavorite: restaurant.favorites.some(fav => fav.userId === mockUserId),
    }));
  }),

  addFavorite: publicProcedure
    .input(z.object({ 
      restaurantId: z.string() 
    }))
    .mutation(async ({ input, ctx }) => {
      // Using a mock userId for now
      const mockUserId = 'mock-user-id';
      
      // First, ensure the user exists (create if not)
      await ctx.db.user.upsert({
        where: { id: mockUserId },
        update: {},
        create: {
          id: mockUserId,
          email: 'mock@example.com',
          name: 'Mock User',
        },
      });

      // Create the favorite relationship
      const favorite = await ctx.db.favorite.upsert({
        where: {
          userId_restaurantId: {
            userId: mockUserId,
            restaurantId: input.restaurantId,
          },
        },
        update: {},
        create: {
          userId: mockUserId,
          restaurantId: input.restaurantId,
        },
        include: {
          restaurant: true,
        },
      });

      return {
        success: true,
        favorite,
      };
    }),

  removeFavorite: publicProcedure
    .input(z.object({ 
      restaurantId: z.string() 
    }))
    .mutation(async ({ input, ctx }) => {
      // Using a mock userId for now
      const mockUserId = 'mock-user-id';
      
      await ctx.db.favorite.deleteMany({
        where: {
          userId: mockUserId,
          restaurantId: input.restaurantId,
        },
      });

      return {
        success: true,
      };
    }),
});
