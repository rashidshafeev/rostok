// src/redux/api/favoritesEndpoints.js
import { api } from './api';

export const favoritesEndpoints = (builder) => ({
  getFavorites: builder.query({
    query: () => '/api/ProductsFavourites/get',
    providesTags: [{ type: 'Favorite', id: 'LIST' }],
  }),
  sendFavorites: builder.mutation({
    query: (data) => ({
      url: '/api/ProductsFavourites/set',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: [{ type: 'Favorite', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
  removeFromFavorites: builder.mutation({
    query: (productId) => ({
      url: '/api/ProductsFavourites/delete',
      method: 'POST',
      body: { id: productId },
    }),
    invalidatesTags: [{ type: 'Favorite', id: 'LIST' }, { type: 'User', id: 'DATA' }],
  }),
});

export const {
  useGetFavoritesQuery,
  useSendFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = api.injectEndpoints({ endpoints: favoritesEndpoints });
