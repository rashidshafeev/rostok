// src/redux/api/favoritesEndpoints.js
import { api } from '@/shared/api/api';

import type { GetFavoriteResponse } from './types';
import type { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';
import type { ProductListRequest } from '@/shared/types/ProductListRequest';

export const favoritesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<GetFavoriteResponse, void>({
      query: () => '/api/ProductsFavourites/get',
      providesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
    sendFavorites: builder.mutation<
      AdditionalServerResponseData,
      ProductListRequest
    >({
      query: (data) => ({
        url: '/api/ProductsFavourites/set',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Favorite', id: 'LIST' },
        { type: 'User', id: 'DATA' },
      ],
    }),
    removeFromFavorites: builder.mutation<
      AdditionalServerResponseData,
      ProductListRequest
    >({
      query: (data) => ({
        url: '/api/ProductsFavourites/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Favorite', id: 'LIST' },
        { type: 'User', id: 'DATA' },
      ],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useSendFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = favoritesEndpoints;
