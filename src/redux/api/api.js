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
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => `api/Products/item?id=${id}`,
      staleTime: 60000,
    }),
    getCategoryTree: builder.query({
      query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
      keepUnusedDataFor: 5,
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
    setCart: builder.mutation({
      query: (cart) => ({
        url: '/api/Products/setCart',
        method: 'POST',
        body: cart,
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
  useSetCartMutation,
} = api;
