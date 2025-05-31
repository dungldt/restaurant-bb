import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { MOCK_USER_ID, MOCK_USER_EMAIL, MOCK_USER_NAME } from '~/constants';

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
      isFavorite: restaurant.favorites.some(fav => fav.userId === MOCK_USER_ID),
    }));
  }),

  addFavorite: publicProcedure
    .input(z.object({ 
      restaurantId: z.string() 
    }))
    .mutation(async ({ input, ctx }) => {
      // First, ensure the user exists (create if not)
      await ctx.db.user.upsert({
        where: { id: MOCK_USER_ID },
        update: {},
        create: {
          id: MOCK_USER_ID,
          email: MOCK_USER_EMAIL,
          name: MOCK_USER_NAME,
        },
      });

      // Create the favorite relationship
      const favorite = await ctx.db.favorite.upsert({
        where: {
          userId_restaurantId: {
            userId: MOCK_USER_ID,
            restaurantId: input.restaurantId,
          },
        },
        update: {},
        create: {
          userId: MOCK_USER_ID,
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
      await ctx.db.favorite.deleteMany({
        where: {
          userId: MOCK_USER_ID,
          restaurantId: input.restaurantId,
        },
      });

      return {
        success: true,
      };
    }),
});
