// favoritesEndpoints.js
import { api } from  './api';

export const favoritesEndpoints = (builder) => ({
    getFavorites: builder.query({
      query: () => '/api/ProductsFavourites/get',
      providesTags: (result) =>
        result
          ? [{ type: 'Favorite', id: 'LIST' }]
          : [{ type: 'Favorite', id: 'LIST' }],
    }),
    sendFavorites: builder.mutation({
      query: (productId) => ({
        url: '/api/ProductsFavourites/set',
        method: 'POST',
        body: { id: productId },
      }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
    removeFromFavorites: builder.mutation({
      query: (productId) => ({
        url: '/api/ProductsFavourites/delete',
        method: 'POST',
        body: { id: productId },
      }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
  });
  
  // Export hooks for favorites endpoints
  export const {
    useGetFavoritesQuery,
    useSendFavoritesMutation,
    useRemoveFromFavoritesMutation,
  } = api.injectEndpoints({ endpoints: favoritesEndpoints });