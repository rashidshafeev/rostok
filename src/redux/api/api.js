import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bot-adash.host2bot.ru/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (id) => `api/Products/item?id=${id}`,
    }),
    getCategoryTree: builder.query({
      query: (id) => `api/Products/categoryTree?category_id=${id || ''}`,
    }),
    getProductsByCategory: builder.query({
      query: (id) => `api/Products/variantsByCategory?parent_category=${id}`,
    }),
    getCitiesAndRegions: builder.query({
      query: () => '/api/Location/full',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategoryQuery,
  useGetCitiesAndRegionsQuery,
} = api;
