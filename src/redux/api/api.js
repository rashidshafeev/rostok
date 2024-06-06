import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bot-adash.host2bot.ru/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => `api/Products/item?id=${id}`,
      staleTime: 60000,
    }),
    getCategoryTree: builder.query({
      query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
      staleTime: 60000,
    }),
    getProductsByCategory: builder.query({
      query: (params) => {
        const { categoryId, page } = params;
        return `api/Products/variants?page=${page}&category_id=${categoryId}`;
      },
      staleTime: 60000,
    }),
    getFiltersOfProducts: builder.query({
      query: (id) => `api/Products/filters/?category_id=${id || ''}`,
      staleTime: 60000,
    }),
    getCitiesAndRegions: builder.query({
      query: () => '/api/Location/full',
      staleTime: 60000,
    }),
    sendOrder: builder.mutation({
      query: (order) => ({
        url: '/api/Products/sendOrder',
        method: 'POST',
        body: order,
      }),
    }),
    getFavorites: builder.query({
      query: () => '/api/ProductsFavourites/get',
      providesTags: (result) =>
        result
          ? [{ type: 'Favorite', id: 'LIST' }]
          : [{ type: 'Favorite', id: 'LIST' }],
    }),
    setToFavorites: builder.mutation({
      query: (productId) => ({
        url: '/api/ProductsFavourites/set',
        method: 'POST',
        body: { id: productId },
      }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
    removeFromFavorites: builder.mutation({
      query: (productId) => {
        return {
          url: `/api/ProductsFavourites/delete`,
          method: 'POST',
          body: { id: productId },
        };
      },
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
    setCart: builder.mutation({
      query: (cart) => ({
        url: '/api/Products/setCart',
        method: 'POST',
        body: cart,
      }),
    }),
    getVariants: builder.mutation({
      query: (params) => ({
        url: '/api/Products/variants',
        method: 'POST',
        body: params, // Send parameters as the body of the POST request
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategoryQuery,
  useGetFiltersOfProductsQuery,
  useGetCitiesAndRegionsQuery,
  useSendOrderMutation,
  useGetFavoritesQuery,
  useSetToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useSetCartMutation,
  useGetVariantsMutation
} = api;
